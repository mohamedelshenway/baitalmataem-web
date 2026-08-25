import { NextResponse } from "next/server";

/**
 * Route Handler مبدئي لنموذج التواصل. لا يوجد بعد مزود بريد إلكتروني (مثل Resend) أو CRM موصول،
 * لذلك لا تُرسل الرسالة فعليًا ولا تُخزَّن — هذا حتى ربط قناة تواصل حقيقية (بريد أو Webhook أو CRM).
 */
export async function POST(request: Request) {
  try {
    const form = await request.formData();
    const name = form.get("name");
    const phone = form.get("phone");
    const message = form.get("message");

    if (!name || !phone || !message) {
      return NextResponse.json({ ok: false, error: "missing_required_fields" }, { status: 400 });
    }

    // TODO(المرحلة القادمة): إرسال بريد فعلي أو إدراج Lead في CRM بيت المطاعم.
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_form_data" }, { status: 400 });
  }
}
