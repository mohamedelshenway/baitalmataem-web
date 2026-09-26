import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { BROKER_SPECIALTIES, BROKER_TYPES } from "@/lib/broker-applications";

/**
 * استقبال طلبات الانضمام كوسيط متعاون مع بيت المطاعم.
 * بيانات داخلية في جدول broker_applications — الزائر يرسل بس، والمراجعة من لوحة التحكم.
 */
const clean = (v: unknown, max: number): string | null => {
  if (typeof v !== "string") return null;
  const t = v.trim();
  return t ? t.slice(0, max) : null;
};

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // حقل مخفي لصد البوتات: الإنسان مش بيشوفه ولا بيملاه
    if (clean(body.website, 200)) return NextResponse.json({ ok: true });

    const fullName = clean(body.fullName, 120);
    const phone = clean(body.phone, 20)?.replace(/[^\d+]/g, "") ?? null;
    const city = clean(body.city, 80);
    const brokerType = clean(body.brokerType, 20);
    const specialties: string[] = Array.isArray(body.specialties)
      ? body.specialties.filter((s: unknown) => BROKER_SPECIALTIES.some((x) => x.value === s))
      : [];
    const yearsRaw = Number(body.experienceYears);
    const experienceYears =
      body.experienceYears === "" || body.experienceYears == null || !Number.isFinite(yearsRaw)
        ? null
        : Math.max(0, Math.min(60, Math.round(yearsRaw)));

    if (!fullName || !phone || phone.length < 8 || !city || !brokerType || body.agreedTerms !== true) {
      return NextResponse.json({ ok: false, error: "missing_required_fields" }, { status: 400 });
    }
    if (!BROKER_TYPES.some((t) => t.value === brokerType)) {
      return NextResponse.json({ ok: false, error: "invalid_broker_type" }, { status: 400 });
    }
    if (specialties.length === 0) {
      return NextResponse.json({ ok: false, error: "missing_specialties" }, { status: 400 });
    }

    const supabase = await createClient();
    const { error } = await supabase.from("broker_applications").insert({
      full_name: fullName,
      phone,
      email: clean(body.email, 160),
      city,
      coverage_areas: clean(body.coverageAreas, 300),
      specialties,
      experience_years: experienceYears,
      broker_type: brokerType,
      office_name: brokerType === "office" ? clean(body.officeName, 160) : null,
      fal_license: clean(body.falLicense, 40),
      notes: clean(body.notes, 1500),
      agreed_terms: true,
    });

    if (error) {
      console.error("[api/broker-applications] فشل الحفظ:", error.message);
      return NextResponse.json({ ok: false, error: "storage_failed" }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[api/broker-applications] خطأ غير متوقع:", err);
    return NextResponse.json({ ok: false, error: "unexpected_error" }, { status: 500 });
  }
}
