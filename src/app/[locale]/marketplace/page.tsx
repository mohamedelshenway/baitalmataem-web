import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { buildMetadata } from "@/lib/seo";
import { getPublishedListings, getSampleApprovedListings } from "@/lib/data/live-listings";
import type { ListingKind } from "@/lib/types";
import { Button, SampleDataNotice, SectionHeading } from "@/components/ui";
import { ListingCard } from "@/components/listing-card";
import { Reveal } from "@/components/reveal";

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  if (!isLocale(params.locale)) return {};
  const dict = await getDictionary(params.locale);
  return buildMetadata({
    title: dict.marketplace.pageTitle,
    description: dict.marketplace.pageSubtitle,
    locale: params.locale,
    path: "/marketplace",
  });
}

export default async function MarketplacePage({
  params,
  searchParams,
}: {
  params: { locale: string };
  searchParams: { city?: string; kind?: string; minPrice?: string; maxPrice?: string; minSize?: string; activity?: string };
}) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale as Locale;
  const dict = await getDictionary(locale);

  // نعرض الفرص الحقيقية المنشورة فعليًا لما توجد؛ ولو لسه معندناش فرص حقيقية، نرجع للبيانات
  // التجريبية مؤقتًا (مع تنبيه واضح) بدل ما تظهر الصفحة فاضية تمامًا.
  const liveListings = await getPublishedListings();
  const showSampleNotice = liveListings.length === 0;
  const approved = liveListings.length > 0 ? liveListings : getSampleApprovedListings();
  const cities = Array.from(new Set(approved.map((l) => l.city.ar)));
  const kinds = Object.keys(dict.marketplace.kinds) as ListingKind[];

  const filtered = approved.filter((l) => {
    if (searchParams.city && l.city.ar !== searchParams.city) return false;
    if (searchParams.kind && l.kind !== searchParams.kind) return false;
    if (searchParams.minPrice && (!l.priceSAR || l.priceSAR < Number(searchParams.minPrice))) return false;
    if (searchParams.maxPrice && (!l.priceSAR || l.priceSAR > Number(searchParams.maxPrice))) return false;
    if (searchParams.minSize && (!l.sizeSqm || l.sizeSqm < Number(searchParams.minSize))) return false;
    // بحث نصي بسيط عن النشاط (يغذّيه أيضًا البحث السريع في الـHero) — يطابق العربي أو الإنجليزي
    if (searchParams.activity) {
      const q = searchParams.activity.trim().toLowerCase();
      const hay = `${l.activityType.ar} ${l.activityType.en}`.toLowerCase();
      if (q && !hay.includes(q)) return false;
    }
    return true;
  });

  return (
    <section className="py-12 sm:py-14">
      <div className="container-page">
        <SectionHeading title={dict.marketplace.pageTitle} subtitle={dict.marketplace.pageSubtitle} />
        {showSampleNotice && <SampleDataNotice text={dict.common.sampleDataNotice} />}

        <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm font-semibold text-ink-600">
            {dict.marketplace.filters.resultsCount.replace("{count}", String(filtered.length))}
          </p>
          <Button href={`/${locale}/marketplace/new`} variant="primary" arrow>
            {dict.marketplace.addListingCta}
          </Button>
        </div>

        <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
          {/* فلاتر بدون JavaScript: نموذج GET بسيط يعيد بناء رابط الصفحة بمعاملات البحث */}
          <form method="get" className="h-fit rounded-card border border-sand-200 bg-white p-5 shadow-subtle">
            <h2 className="mb-4 text-sm font-bold text-ink-900">{dict.marketplace.filters.title}</h2>

            <label className="mb-1.5 block text-xs font-semibold text-ink-600">{dict.marketplace.filters.city}</label>
            <select name="city" defaultValue={searchParams.city || ""} className="input-field mb-4">
              <option value="">{dict.marketplace.filters.allCities}</option>
              {cities.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>

            <label className="mb-1.5 block text-xs font-semibold text-ink-600">{dict.marketplace.filters.kind}</label>
            <select name="kind" defaultValue={searchParams.kind || ""} className="input-field mb-4">
              <option value="">{dict.marketplace.filters.allKinds}</option>
              {kinds.map((k) => (
                <option key={k} value={k}>
                  {dict.marketplace.kinds[k]}
                </option>
              ))}
            </select>

            <label className="mb-1.5 block text-xs font-semibold text-ink-600">{dict.marketplace.filters.priceRange}</label>
            <div className="mb-4 flex items-center gap-2">
              <input
                type="number"
                name="minPrice"
                placeholder={dict.marketplace.filters.minPrice}
                defaultValue={searchParams.minPrice || ""}
                className="input-field"
              />
              <input
                type="number"
                name="maxPrice"
                placeholder={dict.marketplace.filters.maxPrice}
                defaultValue={searchParams.maxPrice || ""}
                className="input-field"
              />
            </div>

            <label className="mb-1.5 block text-xs font-semibold text-ink-600">{dict.marketplace.filters.minSize}</label>
            <input type="number" name="minSize" defaultValue={searchParams.minSize || ""} className="input-field mb-5" />

            <div className="flex gap-2">
              <button type="submit" className="focus-ring flex-1 rounded-btn bg-ember-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-ember-700">
                {dict.marketplace.filters.title}
              </button>
              <a href={`/${locale}/marketplace`} className="focus-ring rounded-btn border border-sand-200 px-4 py-2.5 text-sm font-semibold text-ink-800 hover:bg-sand-50">
                {dict.marketplace.filters.reset}
              </a>
            </div>
          </form>

          <div>
            {filtered.length === 0 ? (
              <div className="rounded-card border border-sand-200 bg-white p-10 text-center text-ink-600">
                {dict.marketplace.noResults}
              </div>
            ) : (
              <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {filtered.map((l, i) => (
                  <Reveal key={l.slug} delay={(i % 3) * 60}>
                    <ListingCard listing={l} dict={dict} locale={locale} />
                  </Reveal>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
