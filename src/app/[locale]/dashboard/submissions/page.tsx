import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import SubmissionStatusSelect from "./submission-status-select";

const statusLabels: Record<string, string> = {
  new: "جديد",
  contacted: "تم التواصل",
  qualified: "مؤهل",
  proposal: "تم العرض",
  won: "تم الإغلاق",
  lost: "خسر",
};

const kindLabels: Record<string, string> = {
  restaurant_sale: "بيع مطعم",
  restaurant_taqbeel: "تقبيل مطعم",
  property: "عقار تجاري",
};

export default async function SubmissionsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect(`/${locale}/dashboard/login`);
  }

  const { data: submissions, error } = await supabase
    .from("listing_submissions")
    .select("id, raw_data, status, source, created_at")
    .order("created_at", { ascending: false });

  return (
    <div className="min-h-screen bg-[#f8f5ef]" dir="rtl">
      <header className="bg-white border-b border-black/5">
        <div className="max-w-5xl mx-auto px-6 py-4">
          <Link href={`/${locale}/dashboard`} className="text-sm text-[#151515]/60 hover:text-[#8b1e24]">
            ← رجوع للوحة التحكم
          </Link>
          <h1 className="font-bold text-[#151515] mt-1">طلبات &quot;اعرض فرصتك&quot;</h1>
          <p className="text-sm text-[#151515]/60 mt-0.5">
            طلبات وصلت من نموذج عرض الفرصة في الموقع، وبانتظار المراجعة والتواصل مع العميل
          </p>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-8 space-y-4">
        {error && (
          <p className="text-sm text-[#8b1e24] bg-[#8b1e24]/5 rounded-lg px-4 py-3">
            حصل خطأ في تحميل الطلبات: {error.message}
          </p>
        )}

        {!error && (!submissions || submissions.length === 0) && (
          <p className="text-sm text-[#151515]/60 bg-white rounded-2xl border border-black/5 p-6 text-center">
            لا توجد طلبات جديدة بعد.
          </p>
        )}

        {submissions?.map((sub) => {
          const data = (sub.raw_data ?? {}) as Record<string, unknown>;
          const kind = String(data.kind ?? "");
          const city = String(data.city ?? "");
          const area = String(data.area ?? "");
          const activityType = String(data.activityType ?? "");
          const contactName = String(data.contactName ?? "");
          const contactPhone = String(data.contactPhone ?? "");
          const contactCity = String(data.contactCity ?? "");
          const priceSAR = data.priceSAR ? String(data.priceSAR) : null;
          const rentSAR = data.rentSAR ? String(data.rentSAR) : null;
          const description = data.description ? String(data.description) : null;
          const photoUrls = Array.isArray(data.photoUrls) ? (data.photoUrls as string[]) : [];

          const waNumber = contactPhone.replace(/^0/, "966").replace(/\D/g, "");

          return (
            <div key={sub.id} className="bg-white rounded-2xl border border-black/5 p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-[#151515]">{contactName || "بدون اسم"}</p>
                    <span className="text-xs bg-[#8b1e24]/10 text-[#8b1e24] rounded-full px-2 py-0.5">
                      {kindLabels[kind] ?? kind}
                    </span>
                  </div>
                  <p className="text-sm text-[#151515]/60 mt-1">
                    {contactPhone || "—"} · {contactCity || city || "—"}
                  </p>
                  {activityType && (
                    <p className="text-xs text-[#151515]/50 mt-1">النشاط: {activityType}</p>
                  )}
                  <p className="text-xs text-[#151515]/50 mt-1">
                    {[city, area].filter(Boolean).join(" — ")}
                    {priceSAR && ` · السعر المطلوب: ${Number(priceSAR).toLocaleString("ar-SA")} ر.س`}
                    {rentSAR && ` · الإيجار: ${Number(rentSAR).toLocaleString("ar-SA")} ر.س`}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-2 shrink-0">
                  <SubmissionStatusSelect
                    submissionId={sub.id}
                    currentStatus={sub.status}
                    statusLabels={statusLabels}
                  />
                  {waNumber && (
                    <a
                      href={`https://wa.me/${waNumber}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs bg-[#25D366]/10 text-[#128C4A] rounded-lg px-3 py-1.5 hover:bg-[#25D366]/20 transition"
                    >
                      واتساب
                    </a>
                  )}
                </div>
              </div>

              {description && (
                <p className="text-sm text-[#151515]/80 mt-3 bg-[#f8f5ef] rounded-lg p-3">
                  {description}
                </p>
              )}

              {photoUrls.length > 0 && (
                <div className="flex gap-2 mt-3 overflow-x-auto">
                  {photoUrls.map((url) => (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      key={url}
                      src={url}
                      alt=""
                      className="h-20 w-20 rounded-lg object-cover border border-black/5 shrink-0"
                    />
                  ))}
                </div>
              )}

              <p className="text-xs text-[#151515]/40 mt-2">
                {new Date(sub.created_at).toLocaleString("ar-SA")}
                {sub.source ? ` · المصدر: ${sub.source}` : ""}
              </p>
            </div>
          );
        })}
      </main>
    </div>
  );
}
