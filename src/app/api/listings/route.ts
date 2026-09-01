import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

/**
* Route Handler لاستقبال نموذج "اعرض فرصتك".
*
* يستقبل البيانات، يتحقق من الحقول الأساسية، ثم يُدرج سجلًا في جدول listing_submissions
* بحالة "new" — لا يُنشئ فرصة منشورة مباشرة أبدًا (قاعدة عدم النشر المباشر المعتمدة في بيت المطاعم).
* يظهر السجل بعدها في لوحة التحكم (رسائل/فرص بانتظار المراجعة) ليقرر الفريق تحويله لسجل listings فعلي.
*
* ملاحظة: رفع الصور/الفيديو الفعلي لـ Supabase Storage ليس ضمن هذا الإصلاح — لا يزال معاينة محلية في
* المتصفح فقط كما هو حاليًا؛ هذا الـ Endpoint يسجّل عدد الملفات المرفقة فقط ضمن raw_data.
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

const rawData = {
kind: String(kind),
city: String(city),
area: String(area),
activityType: form.get("activityType") ? String(form.get("activityType")) : null,
priceSAR: form.get("priceSAR") ? String(form.get("priceSAR")) : null,
rentSAR: form.get("rentSAR") ? String(form.get("rentSAR")) : null,
sizeSqm: form.get("sizeSqm") ? String(form.get("sizeSqm")) : null,
seatingCapacity: form.get("seatingCapacity") ? String(form.get("seatingCapacity")) : null,
description: form.get("description") ? String(form.get("description")) : null,
equipmentSummary: form.get("equipmentSummary") ? String(form.get("equipmentSummary")) : null,
contactName: String(contactName),
contactPhone: String(contactPhone),
contactCity: form.get("contactCity") ? String(form.get("contactCity")) : null,
photoCount,
videoCount,
};

const supabase = await createClient();
const { error } = await supabase.from("listing_submissions").insert({
raw_data: rawData,
status: "new",
});

if (error) {
console.error("[api/listings] فشل حفظ الطلب في listing_submissions:", error.message);
return NextResponse.json({ ok: false, error: "storage_failed" }, { status: 500 });
}

return NextResponse.json({
ok: true,
status: "pending_review",
received: { kind, city, area, photoCount, videoCount },
});
} catch {
return NextResponse.json({ ok: false, error: "invalid_form_data" }, { status: 400 });
}
}
