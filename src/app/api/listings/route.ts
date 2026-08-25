import { NextResponse } from "next/server";

/**
 * Route Handler مبدئي لاستقبال نموذج "اعرض فرصتك".
 *
 * حالة هذا الـ Endpoint في المرحلة الحالية (MVP): يستقبل البيانات ويتحقق من الحقول الأساسية،
 * لكنه لا يحفظها في قاعدة بيانات فعلية بعد — لا توجد قاعدة بيانات موصولة حتى الآن (راجع docs/SUPABASE_SETUP.md).
 * الخطوة التالية: ربطه بجدول listings في Supabase بحيث يُنشأ السجل بحالة moderation = "pending"
 * تلقائيًا، مطابقةً لقاعدة عدم النشر المباشر المعتمدة في بيت المطاعم.
 *
 * لهذا السبب لا يعتمد عليه أي رقم أو إحصائية حقيقية حاليًا، وأي بيانات تُرسل عبره لا تُخزَّن.
 */
export async function POST(request: Request) {
  try {
    const form = await request.formData();

    const kind = form.get("kind");
    const city = form.get("city");
    const area = form.get("area");
    const contactName = form.get("contactName");
    const contactPhone = form.get("contactPhone");

    if (!kind || !city || !area || !contactName || !contactPhone) {
      return NextResponse.json({ ok: false, error: "missing_required_fields" }, { status: 400 });
    }

    const photoCount = form.getAll("photos").length;
    const videoCount = form.getAll("videos").length;

    // TODO(المرحلة القادمة): رفع الصور/الفيديو إلى Supabase Storage، وإدراج سجل في جدول listings
    // بحالة moderation_status = 'pending'، ثم إشعار لوحة الإدارة بوجود فرصة جديدة تنتظر المراجعة.

    return NextResponse.json({
      ok: true,
      status: "pending_review",
      note: "تم الاستلام في بيئة المعاينة الحالية (لا يوجد تخزين فعلي بعد). سيتم حفظ الفرصة فعليًا بعد ربط قاعدة البيانات.",
      received: { kind, city, area, photoCount, videoCount },
    });
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_form_data" }, { status: 400 });
  }
}
