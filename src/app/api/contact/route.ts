import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

/**
 * Route Handler لنموذج "تواصل معنا". يُدرج كل رسالة في جدول contact_submissions بحالة "new"
 * لتظهر فورًا في لوحة التحكم (رسائل العملاء). لا يوجد بعد مزود بريد إلكتروني (مثل Resend) أو
 * إشعار فوري منفصل — هذا لاحقًا حسب الحاجة، والقناة الأساسية الآن هي لوحة التحكم نفسها.
 */
export async function POST(request: Request) {
try {
const form = await request.formData();
const name = form.get("name");
const phone = form.get("phone");
const message = form.get("message");
const email = form.get("email");
const serviceInterested = form.get("service") ?? form.get("serviceInterested");

if (!name || !phone || !message) {
return NextResponse.json({ ok: false, error: "missing_required_fields" }, { status: 400 });
}

const supabase = await createClient();
const { error } = await supabase.from("contact_submissions").insert({
name: String(name),
phone: String(phone),
message: String(message),
email: email ? String(email) : null,
service_interested: serviceInterested ? String(serviceInterested) : null,
status: "new",
});

if (error) {
console.error("[api/contact] فشل حفظ الرسالة في contact_submissions:", error.message);
return NextResponse.json({ ok: false, error: "storage_failed" }, { status: 500 });
}

return NextResponse.json({ ok: true });
} catch {
return NextResponse.json({ ok: false, error: "invalid_form_data" }, { status: 400 });
}
}
