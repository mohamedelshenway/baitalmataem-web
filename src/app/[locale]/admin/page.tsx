import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { buildMetadata } from "@/lib/seo";
import { LISTINGS } from "@/lib/data/listings";

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  if (!isLocale(params.locale)) return {};
  const dict = await getDictionary(params.locale);
  return buildMetadata({
    title: dict.admin.title,
    description: dict.admin.previewNotice,
    locale: params.locale,
    path: "/admin",
    noIndex: true, // لوحة إدارة — يجب ألا تُفهرس نهائيًا، وستُحمى لاحقًا بتسجيل دخول فعلي
  });
}

export default async function AdminPreviewPage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale as Locale;
  const dict = await getDictionary(locale);

  const pending = LISTINGS.filter((l) => l.moderation === "pending");
  const stats = [
    { label: dict.admin.pendingTitle, value: pending.length },
    { label: "إجمالي الفرص المنشورة", value: LISTINGS.filter((l) => l.moderation === "approved").length },
    { label: "إجمالي المشاهدات (تجريبي)", value: LISTINGS.reduce((sum, l) => sum + l.views, 0) },
  ];

  return (
    <section className="py-12 sm:py-14">
      <div className="container-page">
        <h1 className="mb-4 text-2xl font-bold text-ink-900">{dict.admin.title}</h1>
        <div className="mb-8 rounded-card border border-gold-500/30 bg-gold-300/25 p-4 text-sm leading-7 text-ink-800">
          {dict.admin.previewNotice}
        </div>

        <div className="mb-10 grid gap-4 sm:grid-cols-3">
          {stats.map((s) => (
            <div key={s.label} className="rounded-card border border-sand-200 bg-white p-5 shadow-subtle">
              <p className="text-2xl font-bold text-ink-900">{s.value}</p>
              <p className="mt-1 text-xs font-semibold text-ink-500">{s.label}</p>
            </div>
          ))}
        </div>

        <h2 className="mb-4 text-lg font-bold text-ink-900">{dict.admin.pendingTitle}</h2>
        <div className="overflow-x-auto rounded-card border border-sand-200">
          <table className="w-full min-w-[640px] text-sm">
            <thead>
              <tr className="bg-sand-50 text-start">
                <th className="p-3 text-start font-semibold text-ink-900">{dict.admin.columns.title}</th>
                <th className="p-3 text-start font-semibold text-ink-900">{dict.admin.columns.city}</th>
                <th className="p-3 text-start font-semibold text-ink-900">{dict.admin.columns.kind}</th>
                <th className="p-3 text-start font-semibold text-ink-900">{dict.admin.columns.submitted}</th>
                <th className="p-3 text-start font-semibold text-ink-900">{dict.admin.columns.actions}</th>
              </tr>
            </thead>
            <tbody>
              {pending.map((l) => (
                <tr key={l.slug} className="border-t border-sand-100">
                  <td className="p-3 font-semibold text-ink-900">{l.title[locale]}</td>
                  <td className="p-3 text-ink-600">{l.city[locale]}</td>
                  <td className="p-3 text-ink-600">{dict.marketplace.kinds[l.kind]}</td>
                  <td className="p-3 text-ink-600">{l.createdAt}</td>
                  <td className="p-3">
                    <div className="flex flex-wrap gap-2">
                      <button disabled className="cursor-not-allowed rounded-btn bg-ember-600/35 px-3 py-1.5 text-xs font-semibold text-white">
                        {dict.admin.approve}
                      </button>
                      <button disabled className="cursor-not-allowed rounded-btn bg-ink-900/20 px-3 py-1.5 text-xs font-semibold text-white">
                        {dict.admin.reject}
                      </button>
                      <button disabled className="cursor-not-allowed rounded-btn border border-sand-300 px-3 py-1.5 text-xs font-semibold text-ink-500">
                        {dict.admin.requestChanges}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {pending.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-6 text-center text-ink-500">
                    —
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
