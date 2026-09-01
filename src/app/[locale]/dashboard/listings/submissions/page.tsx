import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import SubmissionActions, {
  KIND_LABELS,
  type SubmissionRawData,
} from "./submission-actions";

const statusLabels: Record<string, string> = {
  new: "جديد — بانتظار المراجعة",
  approved: "مقبول",
  changes_requested: "طلب تعديل",
  rejected: "مرفوض",
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
    .select(
      "id, raw_data, status, admin_note, converted_to_listing_id, created_at",
    )
    .order("created_at", { ascending: false });

  return (
    <div className="min-h-screen bg-[#f8f5ef]" dir="rtl">
      <header className="bg-white border-b border-black/5">
        <div className="max-w-5xl mx-auto px-6 py-4">
          <Link
            href={`/${locale}/dashboard/listings`}
            className="text-sm text-[#151515]/60 hover:text-[#8b1e24]"
          >
            ← رجوع لإدارة الفرص
          </Link>
          <h1 className="font-bold text-[#151515] mt-1">
            طلبات &quot;اعرض فرصتك&quot;
          </h1>
          <p className="text-sm text-[#151515]/60 mt-1">
            الطلبات المرسلة من الزوار عبر نموذج &quot;اعرض فرصتك&quot; العام —
            قبول وتحويلها لفرصة منشورة، أو رفضها، أو طلب تعديل مع توضيح السبب.
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
            لا توجد طلبات مرسلة بعد.
          </p>
        )}

        {submissions?.map((s) => {
          const raw = (s.raw_data ?? {}) as SubmissionRawData;
          const activityLabel =
            raw.activityType || KIND_LABELS[raw.kind ?? ""] || "—";
          return (
            <div
              key={s.id}
              className="bg-white rounded-2xl border border-black/5 p-5 space-y-3"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-bold text-[#151515]">{activityLabel}</p>
                  <p className="text-sm text-[#151515]/60 mt-0.5">
                    {[raw.region, raw.city, raw.area]
                      .filter(Boolean)
                      .join(" · ") || "—"}
                  </p>
                </div>
                <span className="text-xs text-[#151515]/50 whitespace-nowrap">
                  {new Date(s.created_at).toLocaleDateString("ar-SA")}
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
                <Info
                  label="السعر المطلوب"
                  value={
                    raw.priceSAR
                      ? `${Number(raw.priceSAR).toLocaleString("ar-SA")} ر.س`
                      : "—"
                  }
                />
                <Info
                  label="الإيجار الشهري"
                  value={
                    raw.rentSAR
                      ? `${Number(raw.rentSAR).toLocaleString("ar-SA")} ر.س`
                      : "—"
                  }
                />
                <Info
                  label="المساحة"
                  value={raw.sizeSqm ? `${raw.sizeSqm} م²` : "—"}
                />
                <Info label="عدد المقاعد" value={raw.seatingCapacity ?? "—"} />
              </div>

              {raw.description && (
                <p className="text-sm text-[#151515]/80 bg-[#f8f5ef] rounded-lg px-3 py-2">
                  {raw.description}
                </p>
              )}
              {raw.equipmentSummary && (
                <p className="text-xs text-[#151515]/60">
                  المعدات: {raw.equipmentSummary}
                </p>
              )}

              <div className="text-xs text-[#151515]/60 border-t border-black/5 pt-3">
                <p>
                  التواصل: {raw.contactName ?? "—"} · {raw.contactPhone ?? "—"}
                  {raw.contactCity ? ` · ${raw.contactCity}` : ""}
                </p>
                <p className="mt-1">
                  {raw.photoCount ?? 0} صورة · {raw.videoCount ?? 0} فيديو مرفقة
                  (معاينة في المتصفح فقط حاليًا، غير مرفوعة على التخزين بعد)
                </p>
              </div>

              {s.admin_note && s.status === "changes_requested" && (
                <p className="text-xs text-[#c8a45d] bg-[#c8a45d]/10 rounded-lg px-3 py-2">
                  ملاحظتنا للمرسل: {s.admin_note}
                </p>
              )}

              <div className="flex items-center justify-between gap-4 border-t border-black/5 pt-3">
                <span className="text-xs font-medium text-[#151515]/70">
                  الحالة: {statusLabels[s.status] ?? s.status}
                </span>
                <SubmissionActions
                  submissionId={s.id}
                  rawData={raw}
                  currentStatus={s.status}
                />
              </div>
            </div>
          );
        })}
      </main>
    </div>
  );
}

function Info({ label, value }: { label: string; value: string | number }) {
  return (
    <div>
      <p className="text-[#151515]/50 text-xs">{label}</p>
      <p className="text-[#151515] font-medium">{value}</p>
    </div>
  );
}
