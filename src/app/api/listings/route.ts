import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

/**
 * Route Handler لاستقبال نموذج "اعرض فرصتك".
 *
 * يستقبل البيانات والملفات، يرفع الصور والفيديوهات فعليًا لباكت Supabase Storage
 * (listing-media/submissions/{id}/...)، ثم يُدرج سجلًا في جدول listing_submissions
 * بحالة "new" مع روابط الملفات المرفوعة — لا يُنشئ فرصة منشورة مباشرة أبدًا (قاعدة عدم
 * النشر المباشر المعتمدة في بيت المطاعم). يظهر السجل بعدها في لوحة التحكم ليقرر الفريق
 * تحويله لسجل listings فعلي.
 */

const MAX_PHOTOS = 10;
const MAX_VIDEOS = 2;

function extensionFromFile(file: File): string {
  const fromName = file.name.split(".").pop();
  if (fromName && fromName.length <= 5 && /^[a-zA-Z0-9]+$/.test(fromName)) {
    return fromName.toLowerCase();
  }
  const fromType = file.type.split("/").pop();
  return fromType ? fromType.toLowerCase() : "bin";
}

async function uploadFiles(
  supabase: Awaited<ReturnType<typeof createClient>>,
  submissionId: string,
  kind: "photo" | "video",
  files: File[],
): Promise<string[]> {
  const urls: string[] = [];
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    if (!file || file.size === 0) continue;
    const ext = extensionFromFile(file);
    const path = `submissions/${submissionId}/${kind}-${i + 1}.${ext}`;
    const { error: uploadError } = await supabase.storage
      .from("listing-media")
      .upload(path, file, {
        contentType: file.type || undefined,
        upsert: false,
      });
    if (uploadError) {
      console.error(
        `[api/listings] فشل رفع ${kind} رقم ${i + 1}:`,
        uploadError.message,
      );
      continue;
    }
    const { data: publicUrlData } = supabase.storage
      .from("listing-media")
      .getPublicUrl(path);
    urls.push(publicUrlData.publicUrl);
  }
  return urls;
}

export async function POST(request: Request) {
  try {
    const form = await request.formData();

    const kind = form.get("kind");
    const region = form.get("region");
    const city = form.get("city");
    const area = form.get("area");
    const contactName = form.get("contactName");
    const contactPhone = form.get("contactPhone");

    if (!kind || !region || !city || !contactName || !contactPhone) {
      return NextResponse.json(
        { ok: false, error: "missing_required_fields" },
        { status: 400 },
      );
    }

    const photoFiles = form
      .getAll("photos")
      .filter((f): f is File => f instanceof File)
      .slice(0, MAX_PHOTOS);
    const videoFiles = form
      .getAll("videos")
      .filter((f): f is File => f instanceof File)
      .slice(0, MAX_VIDEOS);

    const supabase = await createClient();

    // نولّد معرّف الطلب مقدمًا عشان نستخدمه كاسم مجلد الوسائط، ونمرره صراحة لصف listing_submissions
    // بحيث يبقى نفس المعرّف في الاتنين (يسهّل تتبع الملفات لاحقًا)
    const submissionId = crypto.randomUUID();

    const [photoUrls, videoUrls] = await Promise.all([
      uploadFiles(supabase, submissionId, "photo", photoFiles),
      uploadFiles(supabase, submissionId, "video", videoFiles),
    ]);

    const rawData = {
      kind: String(kind),
      region: String(region),
      city: String(city),
      area: area ? String(area) : null,
      activityType: form.get("activityType")
        ? String(form.get("activityType"))
        : null,
      priceSAR: form.get("priceSAR") ? String(form.get("priceSAR")) : null,
      rentSAR: form.get("rentSAR") ? String(form.get("rentSAR")) : null,
      sizeSqm: form.get("sizeSqm") ? String(form.get("sizeSqm")) : null,
      seatingCapacity: form.get("seatingCapacity")
        ? String(form.get("seatingCapacity"))
        : null,
      description: form.get("description")
        ? String(form.get("description"))
        : null,
      equipmentSummary: form.get("equipmentSummary")
        ? String(form.get("equipmentSummary"))
        : null,
      contactName: String(contactName),
      contactPhone: String(contactPhone),
      contactCity: form.get("contactCity")
        ? String(form.get("contactCity"))
        : null,
      photoCount: photoFiles.length,
      videoCount: videoFiles.length,
      photoUrls,
      videoUrls,
    };

    const { error } = await supabase.from("listing_submissions").insert({
      id: submissionId,
      raw_data: rawData,
      status: "new",
    });

    if (error) {
      console.error(
        "[api/listings] فشل حفظ الطلب في listing_submissions:",
        error.message,
      );
      return NextResponse.json(
        { ok: false, error: "storage_failed" },
        { status: 500 },
      );
    }

    return NextResponse.json({
      ok: true,
      status: "pending_review",
      received: {
        kind,
        region,
        city,
        area,
        photoCount: photoUrls.length,
        videoCount: videoUrls.length,
      },
    });
  } catch {
    return NextResponse.json(
      { ok: false, error: "invalid_form_data" },
      { status: 400 },
    );
  }
}
