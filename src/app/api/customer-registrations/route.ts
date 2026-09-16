import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

/**
 * Route Handler لاستقبال استمارة "سجل بياناتك".
 * يدرج سجلًا في جدول customer_registrations — بيانات داخلية،
 * يراجعها الفريق من لوحة التحكم.
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();

    const fullName = body.fullName;
    const phone = body.phone;
    const city = body.city;
    const customerType = body.customerType;
    const profession = body.profession;

    if (!fullName || !phone || !customerType) {
      return NextResponse.json(
        { ok: false, error: "missing_required_fields" },
        { status: 400 },
      );
    }

    const validTypes = ["restaurant_owner", "cafe_owner", "investor_real_estate", "other"];
    if (!validTypes.includes(customerType)) {
      return NextResponse.json(
        { ok: false, error: "invalid_customer_type" },
        { status: 400 },
      );
    }

    const supabase = await createClient();

    const { error } = await supabase.from("customer_registrations").insert({
      full_name: String(fullName),
      phone: String(phone),
      city: city ? String(city) : null,
      customer_type: customerType,
      profession: profession ? String(profession) : null,
    });

    if (error) {
      console.error("[api/customer-registrations] فشل الحفظ:", error.message);
      return NextResponse.json({ ok: false, error: "storage_failed" }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[api/customer-registrations] خطأ غير متوقع:", err);
    return NextResponse.json({ ok: false, error: "unexpected_error" }, { status: 500 });
  }
}
