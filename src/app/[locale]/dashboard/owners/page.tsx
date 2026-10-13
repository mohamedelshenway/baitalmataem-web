import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { toWhatsAppNumber, type SubmissionStatus } from "@/lib/submission-notify";
import NotifyButton, { EmailNotifyButton } from "./notify-button";

const KIND_LABELS: Record<string, string> = {
  restaurant_taqbeel: "مطعم للتقبيل",
  restaurant_sale: "مطعم للبيع",
  lease_unit: "محل / موقع للإيجار",
  investment_opportunity: "فرصة استثمارية",
  seeking_investor: "مطعم يبحث عن مستثمر",
  operating_partner_needed: "مشروع يحتاج شريك تشغيل",
  site_for_restaurant: "موقع مناسب لنشاط مطاعم",
};

const STATUS_LABELS: Record<string, { label: string; cls: string }> = {
  new: { label: "جديد", cls: "bg-[#c8a45d]/15 text-[#8a6a1f]" },
  approved: { label: "مقبول", cls: "bg-green-50 text-green-700" },
  changes_requested: { label: "طلب تعديل", cls: "bg-blue-50 text-blue-700" },
  rejected: { label: "مرفوض", cls: "bg-[#8b1e24]/10 text-[#8b1e24]" },
};

const LISTING_STATUS: Record<string, string> = {
  draft: "مسودة",
  pending_review: "بانتظار النشر",
  published: "منشورة",
  paused: "متوقفة",
  closed: "مغلقة",
};

type Raw = {
  kind?: string;
  city?: string;
  area?: string | null;
  region?: string;
  activityType?: string | null;
  priceSAR?: string | null;
  rentSAR?: string | null;
  description?: string | null;
  contactName?: string;
  contactPhone?: string;
  contactCity?: string | null;
  contactEmail?: string | null;
};

export default async function OwnersRegisterPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ status?: string; kind?: string; q?: string }>;
}) {
  const { locale } = await params;
  const { status = "all", kind = "all", q = "" } = await searchParams;
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect(`/${locale}/dashboard/login`);

  // السجل دايمًا بيعرض كل الطلبات بكل حالاتها — مفيش حاجة بتختفي بعد القبول أو الرفض
  const { data: rows, error } = await supabase
    .from("listing_submissions")
    .select(
      "id, raw_data, status, admin_note, source, created_at, decided_at, notified_at, converted_to_listing_id, listings:converted_to_listing_id(id, status, title)",
    )
    .order("created_at", { ascending: false });

  const all = (rows ?? []).map((r) => ({
    ...r,
    raw: (r.raw_data ?? {}) as Raw,
    listing: (Array.isArray(r.listings) ? r.listings[0] : r.listings) as
      | { id: string; status: string; title: string }
      | null,
  }));

  const count = (s: string) => all.filter((r) => r.status === s).length;
  const needNotify = all.filter((r) => r.status !== "new" && !r.notified_at).length;

  const needle = q.trim().toLowerCase();
  const list = all.filter((r) => {
    if (status !== "all" && r.status !== status) return false;
    if (kind !== "all" && r.raw.kind !== kind) return false;
    if (needle) {
      const hay = `${r.raw.contactName ?? ""} ${r.raw.contactPhone ?? ""} ${r.raw.city ?? ""} ${r.raw.activityType ?? ""}`.toLowerCase();
      if (!hay.includes(needle)) return false;
    }
    return true;
  });

  const href = (next: Partial<{ status: string; kind: string }>) => {
    const sp = new URLSearchParams();
    const s = next.status ?? status;
    const k = next.kind ?? kind;
    if (s !== "all") sp.set("status", s);
    if (k !== "all") sp.set("kind", k);
    if (q) sp.set("q", q);
    const qs = sp.toString();
    return `/${locale}/dashboard/owners${qs ? `?${qs}` : ""}`;
  };

  const tabs = [
    { key: "all", label: "الكل", n: all.length },
    { key: "new", label: "جديد", n: count("new") },
    { key: "approved", label: "مقبول", n: count("approved") },
    { key: "changes_requested", label: "طلب تعديل", n: count("changes_requested") },
    { key: "rejected", label: "مرفوض", n: count("rejected") },
  ];

  return (
    <div className="min-h-screen bg-[#f8f5ef]" dir="rtl">
      <header className="bg-white border-b border-black/5">
        <div className="max-w-5xl mx-auto px-6 py-4">
          <Link href={`/${locale}/dashboard`} className="text-sm text-[#151515]/60 hover:text-[#8b1e24]">
            ← رجوع للوحة التحكم
          </Link>
          <h1 className="font-bold text-[#151515] mt-1">سجل عارضي الفرص</h1>
          <p className="text-sm text-[#151515]/60 mt-1">
            كل من عرض محله أو فرصته (تقبيل، بيع، إيجار...) — بياناتهم محفوظة دائمًا وتفضل ظاهرة بعد القبول أو الرفض.
          </p>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-6 space-y-5">
        {error && (
          <p className="text-sm text-[#8b1e24] bg-[#8b1e24]/5 rounded-lg px-4 py-3">حصل خطأ في تحميل السجل: {error.message}</p>
        )}

        {needNotify > 0 && (
          <p className="text-sm bg-[#25D366]/10 text-[#128C4A] rounded-xl px-4 py-3">
            عندك {needNotify} عارض اتاخد قرار في طلبه ولسه ما اتبلّغش — اضغط زر واتساب الأخضر جنب اسمه.
          </p>
        )}

        <div className="flex flex-wrap gap-2">
          {tabs.map((t) => (
            <Link
              key={t.key}
              href={href({ status: t.key })}
              className={`rounded-full px-4 py-1.5 text-sm border transition ${
                status === t.key
                  ? "bg-[#8b1e24] text-white border-[#8b1e24]"
                  : "bg-white text-[#151515]/70 border-black/10 hover:border-[#8b1e24]/40"
              }`}
            >
              {t.label} <span className="opacity-70">({t.n})</span>
            </Link>
          ))}
        </div>

        <form className="flex flex-wrap gap-2" action={`/${locale}/dashboard/owners`}>
          {status !== "all" && <input type="hidden" name="status" value={status} />}
          <select
            name="kind"
            defaultValue={kind}
            className="rounded-lg border border-black/10 bg-white px-3 py-2 text-sm"
          >
            <option value="all">كل الأنواع</option>
            {Object.entries(KIND_LABELS).map(([k, l]) => (
              <option key={k} value={k}>
                {l}
              </option>
            ))}
          </select>
          <input
            name="q"
            defaultValue={q}
            placeholder="ابحث بالاسم أو الجوال أو المدينة"
            className="flex-1 min-w-[200px] rounded-lg border border-black/10 bg-white px-3 py-2 text-sm"
          />
          <button className="rounded-lg bg-[#151515] text-white px-4 py-2 text-sm">بحث</button>
        </form>

        {!error && list.length === 0 && (
          <p className="text-sm text-[#151515]/60 bg-white rounded-2xl border border-black/5 p-6 text-center">
            مفيش نتائج بالفلتر ده.
          </p>
        )}

        {list.map((r) => {
          const raw = r.raw;
          const st = STATUS_LABELS[r.status] ?? { label: r.status, cls: "bg-black/5 text-[#151515]/70" };
          const opportunity = [raw.activityType || KIND_LABELS[raw.kind ?? ""], raw.city].filter(Boolean).join(" – ");
          const phone = raw.contactPhone ?? "";
          const wa = toWhatsAppNumber(phone);
          return (
            <div key={r.id} className="bg-white rounded-2xl border border-black/5 p-5 space-y-3">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-bold text-[#151515]">{raw.contactName || "بدون اسم"}</p>
                    <span className={`text-xs rounded-full px-2 py-0.5 ${st.cls}`}>{st.label}</span>
                    <span className="text-xs bg-[#8b1e24]/10 text-[#8b1e24] rounded-full px-2 py-0.5">
                      {KIND_LABELS[raw.kind ?? ""] ?? (raw.kind || "—")}
                    </span>
                  </div>
                  <p className="text-sm text-[#151515]/70 mt-1" dir="ltr" style={{ textAlign: "right" }}>
                    {phone || "—"}
                  </p>
                  {raw.contactEmail && (
                    <p className="text-xs text-[#151515]/60 mt-0.5" dir="ltr" style={{ textAlign: "right" }}>
                      {raw.contactEmail}
                    </p>
                  )}
                  <p className="text-xs text-[#151515]/50 mt-1">
                    {[raw.region, raw.city, raw.area].filter(Boolean).join(" · ") || "—"}
                    {raw.activityType ? ` · ${raw.activityType}` : ""}
                    {raw.priceSAR ? ` · السعر: ${Number(raw.priceSAR).toLocaleString("ar-SA")} ر.س` : ""}
                    {raw.rentSAR ? ` · الإيجار: ${Number(raw.rentSAR).toLocaleString("ar-SA")} ر.س` : ""}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-2 shrink-0">
                  <NotifyButton
                    submissionId={r.id}
                    status={r.status as SubmissionStatus}
                    name={raw.contactName}
                    phone={phone}
                    opportunity={opportunity}
                    adminNote={r.admin_note}
                    notifiedAt={r.notified_at}
                  />
                  <EmailNotifyButton
                    submissionId={r.id}
                    status={r.status as SubmissionStatus}
                    name={raw.contactName}
                    email={raw.contactEmail}
                    opportunity={opportunity}
                    adminNote={r.admin_note}
                    notifiedAt={r.notified_at}
                  />
                  <div className="flex gap-2">
                    {wa && (
                      <a
                        href={`https://wa.me/${wa}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs bg-[#25D366]/10 text-[#128C4A] rounded-lg px-3 py-1.5 hover:bg-[#25D366]/20 transition"
                      >
                        محادثة
                      </a>
                    )}
                    {phone && (
                      <a href={`tel:+${wa}`} className="text-xs bg-black/5 text-[#151515]/70 rounded-lg px-3 py-1.5 hover:bg-black/10 transition">
                        اتصال
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {raw.description && (
                <p className="text-sm text-[#151515]/80 bg-[#f8f5ef] rounded-lg px-3 py-2">{raw.description}</p>
              )}
              {r.admin_note && (
                <p className="text-xs text-[#8a6a1f] bg-[#c8a45d]/10 rounded-lg px-3 py-2">ملاحظة الفريق: {r.admin_note}</p>
              )}

              <div className="flex flex-wrap items-center justify-between gap-2 border-t border-black/5 pt-3 text-xs text-[#151515]/50">
                <span>
                  وصل {new Date(r.created_at).toLocaleDateString("ar-SA")}
                  {r.decided_at ? ` · القرار ${new Date(r.decided_at).toLocaleDateString("ar-SA")}` : ""}
                  {r.notified_at ? ` · اتبلّغ ${new Date(r.notified_at).toLocaleDateString("ar-SA")}` : ""}
                  {r.source ? ` · المصدر: ${r.source}` : ""}
                </span>
                <span className="flex items-center gap-3">
                  {r.listing && (
                    <span>
                      الفرصة: {LISTING_STATUS[r.listing.status] ?? r.listing.status}
                    </span>
                  )}
                  {r.status === "new" || r.status === "changes_requested" ? (
                    <Link href={`/${locale}/dashboard/listings/submissions`} className="text-[#8b1e24] hover:underline">
                      مراجعة وقرار
                    </Link>
                  ) : null}
                </span>
              </div>
            </div>
          );
        })}
      </main>
    </div>
  );
}
