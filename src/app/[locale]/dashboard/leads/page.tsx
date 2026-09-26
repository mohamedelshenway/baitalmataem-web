import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { SAUDI_REGIONS } from "@/lib/saudi-regions";
import LeadStatusSelect, { LEAD_STATUS_LABELS } from "./lead-status-select";

// طلبات التوظيف والتدريب والدوام الجزئي وشركاء النجاح وبلاغات الفرص (جدول leads)
const TYPE_LABELS: Record<string, string> = {
  staffing: "طلب موظفين",
  training: "طلب تدريب فريق",
  parttime: "انضمام بدوام جزئي",
  partner: "شريك نجاح",
  contact: "تواصل / بلاغ",
  service: "طلب خدمة",
  listing: "فرصة",
};

const FIELD_LABELS: Record<string, string> = {
  name: "الاسم",
  region: "المنطقة",
  city: "المحافظة / المدينة",
  sector: "مجال المنشأة",
  workerSource: "مصدر العمالة",
  job: "الوظيفة",
  specialty: "التخصص",
  count: "العدد",
  salary: "الراتب التقريبي",
  hours: "ساعات العمل",
  housing: "السكن / الإعاشة",
  date: "تاريخ الاحتياج",
  languages: "اللغات",
  experience: "سنوات الخبرة",
  availability: "الأوقات المتاحة",
  cv: "السيرة الذاتية",
  restaurantType: "نوع المطعم",
  employeeCount: "عدد الموظفين",
  departments: "الأقسام",
  trainingType: "نوع التدريب",
  delivery: "طريقة التدريب",
  notes: "ملاحظات",
  listing: "الفرصة",
  reason: "السبب",
  company: "الشركة",
};

const HIDDEN_FIELDS = new Set(["phone", "website"]);

type LeadRow = {
  id: string;
  type: string;
  page: string;
  status: string;
  locale: string;
  contact_phone: string;
  data: Record<string, unknown>;
  created_at: string;
};

function displayValue(key: string, value: unknown): string {
  if (Array.isArray(value)) return value.join("، ");
  const text = String(value ?? "");
  // حقل المنطقة بيتبعت كرقم ترتيب المنطقة في القائمة
  if (key === "region" && /^\d+$/.test(text)) return SAUDI_REGIONS[Number(text)]?.name ?? text;
  return text;
}

export default async function LeadsPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams?: { type?: string };
}) {
  const { locale } = await params;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect(`/${locale}/dashboard/login`);

  const typeFilter = searchParams?.type && TYPE_LABELS[searchParams.type] ? searchParams.type : null;
  let query = supabase
    .from("leads")
    .select("id, type, page, status, locale, contact_phone, data, created_at")
    .order("created_at", { ascending: false })
    .limit(300);
  if (typeFilter) query = query.eq("type", typeFilter);
  const { data, error } = await query;
  const leads = (data ?? []) as LeadRow[];

  const waLink = (phone: string) => `https://wa.me/${phone.replace(/\D/g, "").replace(/^0/, "966")}`;

  return (
    <div className="min-h-screen bg-[#f8f5ef]" dir="rtl">
      <header className="border-b border-black/5 bg-white">
        <div className="mx-auto max-w-5xl px-6 py-4">
          <Link href={`/${locale}/dashboard`} className="text-sm text-[#151515]/60 hover:text-[#8b1e24]">
            ← رجوع للوحة التحكم
          </Link>
          <h1 className="mt-1 font-bold text-[#151515]">طلبات التوظيف والتدريب والشركاء</h1>
          <p className="mt-0.5 text-sm text-[#151515]/60">
            الطلبات المرسلة من صفحة التوظيف والتدريب، وشركاء النجاح، وبلاغات الفرص.
          </p>
          <div className="mt-3 flex flex-wrap gap-2 text-xs">
            <Link
              href={`/${locale}/dashboard/leads`}
              className={`rounded-full px-3 py-1 ${!typeFilter ? "bg-[#8b1e24] text-white" : "bg-[#151515]/5 text-[#151515]/70"}`}
            >
              الكل
            </Link>
            {Object.entries(TYPE_LABELS).map(([v, l]) => (
              <Link
                key={v}
                href={`/${locale}/dashboard/leads?type=${v}`}
                className={`rounded-full px-3 py-1 ${typeFilter === v ? "bg-[#8b1e24] text-white" : "bg-[#151515]/5 text-[#151515]/70"}`}
              >
                {l}
              </Link>
            ))}
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl space-y-4 px-6 py-8">
        {error && (
          <p className="rounded-lg bg-[#8b1e24]/5 px-4 py-3 text-sm text-[#8b1e24]">حصل خطأ في تحميل الطلبات: {error.message}</p>
        )}
        {!error && leads.length === 0 && (
          <p className="rounded-2xl border border-black/5 bg-white p-6 text-center text-sm text-[#151515]/60">لا توجد طلبات بعد.</p>
        )}

        {leads.map((lead) => {
          const fields = Object.entries(lead.data ?? {}).filter(
            ([k, v]) => !HIDDEN_FIELDS.has(k) && v !== "" && v != null && !(Array.isArray(v) && v.length === 0),
          );
          return (
            <div key={lead.id} className="space-y-3 rounded-2xl border border-black/5 bg-white p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h2 className="font-bold text-[#151515]">
                    {TYPE_LABELS[lead.type] ?? lead.type}
                    <span className="mr-2 rounded-full bg-[#c8a45d]/15 px-2 py-0.5 text-xs font-normal text-[#151515]/70">
                      {LEAD_STATUS_LABELS[lead.status] ?? lead.status}
                    </span>
                  </h2>
                  <p className="mt-0.5 text-sm">
                    <a href={waLink(lead.contact_phone)} target="_blank" className="text-[#8b1e24] underline" dir="ltr">
                      {lead.contact_phone}
                    </a>
                    <span className="mr-2 text-xs text-[#151515]/50">
                      من {lead.page} · {lead.locale}
                    </span>
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <p className="text-xs text-[#151515]/50">{new Date(lead.created_at).toLocaleString("ar-SA")}</p>
                  <LeadStatusSelect id={lead.id} current={lead.status} />
                </div>
              </div>
              {fields.length > 0 && (
                <dl className="grid gap-x-6 gap-y-1 text-sm sm:grid-cols-2">
                  {fields.map(([k, v]) => (
                    <div key={k} className="flex gap-2">
                      <dt className="shrink-0 text-[#151515]/50">{FIELD_LABELS[k] ?? k}:</dt>
                      <dd className="whitespace-pre-line text-[#151515]/85">{displayValue(k, v)}</dd>
                    </div>
                  ))}
                </dl>
              )}
            </div>
          );
        })}
      </main>
    </div>
  );
}
