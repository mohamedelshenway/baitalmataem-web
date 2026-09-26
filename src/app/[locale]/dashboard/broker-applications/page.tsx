import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { BROKER_APPLICATION_STATUS, BROKER_TYPES, specialtyLabel } from "@/lib/broker-applications";
import ApplicationActions, { type BrokerApplicationRow } from "./application-actions";

type Row = BrokerApplicationRow & {
  email: string | null;
  broker_type: string;
  experience_years: number | null;
  notes: string | null;
  created_at: string;
};

export default async function BrokerApplicationsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect(`/${locale}/dashboard/login`);

  const { data, error } = await supabase
    .from("broker_applications")
    .select(
      "id, full_name, phone, email, city, coverage_areas, broker_type, office_name, specialties, experience_years, fal_license, notes, status, converted_to_broker_id, created_at",
    )
    .order("created_at", { ascending: false });
  const apps = (data ?? []) as Row[];

  const waLink = (phone: string) => `https://wa.me/${phone.replace(/^0/, "966").replace(/\D/g, "")}`;

  return (
    <div className="min-h-screen bg-[#f8f5ef]" dir="rtl">
      <header className="border-b border-black/5 bg-white">
        <div className="mx-auto max-w-5xl px-6 py-4">
          <Link href={`/${locale}/dashboard`} className="text-sm text-[#151515]/60 hover:text-[#8b1e24]">
            ← رجوع للوحة التحكم
          </Link>
          <h1 className="mt-1 font-bold text-[#151515]">طلبات انضمام الوسطاء</h1>
          <p className="mt-0.5 text-sm text-[#151515]/60">
            الطلبات المرسلة من صفحة &quot;انضم كوسيط&quot; (
            <a href={`/${locale}/join-broker`} target="_blank" className="underline">
              فتح الصفحة
            </a>
            ). الاعتماد بيضيف الوسيط لقائمة الوسطاء الداخلية.
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-5xl space-y-4 px-6 py-8">
        {error && (
          <p className="rounded-lg bg-[#8b1e24]/5 px-4 py-3 text-sm text-[#8b1e24]">حصل خطأ في تحميل الطلبات: {error.message}</p>
        )}
        {!error && apps.length === 0 && (
          <p className="rounded-2xl border border-black/5 bg-white p-6 text-center text-sm text-[#151515]/60">لا توجد طلبات بعد.</p>
        )}

        {apps.map((a) => (
          <div key={a.id} className="space-y-3 rounded-2xl border border-black/5 bg-white p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h2 className="font-bold text-[#151515]">
                  {a.full_name}
                  <span className="mr-2 rounded-full bg-[#c8a45d]/15 px-2 py-0.5 text-xs font-normal text-[#151515]/70">
                    {BROKER_APPLICATION_STATUS[a.status] ?? a.status}
                  </span>
                </h2>
                <p className="mt-0.5 text-sm text-[#151515]/60">
                  {BROKER_TYPES.find((t) => t.value === a.broker_type)?.label}
                  {a.office_name ? ` — ${a.office_name}` : ""} · {a.city}
                  {a.coverage_areas ? ` (${a.coverage_areas})` : ""}
                </p>
              </div>
              <p className="text-xs text-[#151515]/50">{new Date(a.created_at).toLocaleString("ar-SA")}</p>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {a.specialties.map((s) => (
                <span key={s} className="rounded-full bg-[#151515]/5 px-2 py-0.5 text-xs text-[#151515]/70">
                  {specialtyLabel(s)}
                </span>
              ))}
            </div>

            <div className="grid gap-1 text-sm text-[#151515]/80 sm:grid-cols-2">
              <p>
                الجوال:{" "}
                <a href={waLink(a.phone)} target="_blank" className="text-[#8b1e24] underline" dir="ltr">
                  {a.phone}
                </a>
              </p>
              {a.email && <p>الإيميل: <span dir="ltr">{a.email}</span></p>}
              <p>سنوات الخبرة: {a.experience_years ?? "—"}</p>
              <p>ترخيص فال: {a.fal_license ?? "غير مذكور"}</p>
            </div>
            {a.notes && <p className="whitespace-pre-line rounded-lg bg-[#f8f5ef] p-3 text-sm text-[#151515]/80">{a.notes}</p>}

            <ApplicationActions app={a} locale={locale} />
          </div>
        ))}
      </main>
    </div>
  );
}
