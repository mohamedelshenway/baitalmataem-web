import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { locales, isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { buildMetadata, breadcrumbJsonLd, listingJsonLd } from "@/lib/seo";
import { SITE, whatsappLink, mailtoLink, HAS_WHATSAPP } from "@/lib/constants";
import { LISTINGS, getSimilarListings } from "@/lib/data/listings";
import { resolveListing, getPublishedListings } from "@/lib/data/live-listings";
import { Badge, Button, Card, SectionHeading } from "@/components/ui";
import { ListingGallery } from "@/components/listing-gallery";
import { ListingCard } from "@/components/listing-card";
import { Reveal } from "@/components/reveal";
import { pickText } from "@/lib/i18n-text";

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    LISTINGS.filter((l) => l.moderation === "approved").map((l) => ({ locale, slug: l.slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string; slug: string };
}): Promise<Metadata> {
  if (!isLocale(params.locale)) return {};
  const resolved = await resolveListing(params.slug);
  if (!resolved || resolved.listing.moderation !== "approved") return {};
  const listing = resolved.listing;
  const dict = await getDictionary(params.locale);
  return buildMetadata({
    title: pickText(listing.title, params.locale),
    description: pickText(listing.summary, params.locale),
    locale: params.locale,
    path: `/marketplace/${params.slug}`,
    keywords: [dict.marketplace.kinds[listing.kind], pickText(listing.city, params.locale), pickText(listing.activityType, params.locale)],
  });
}

export default async function ListingDetailPage({ params }: { params: { locale: string; slug: string } }) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale as Locale;
  const resolved = await resolveListing(params.slug);
  if (!resolved || resolved.listing.moderation !== "approved") notFound();
  const { listing, source } = resolved;
  const dict = await getDictionary(locale);
  const similarPool = source === "live" ? await getPublishedListings() : LISTINGS;
  const similar = getSimilarListings(listing, similarPool);

  const viewingMessage = `مرحبًا، أرغب في طلب معاينة للفرصة: ${listing.title.ar} (${listing.slug})`;
  const evaluateMessage = `مرحبًا، أرغب في طلب تقييم للفرصة: ${listing.title.ar} (${listing.slug})`;
  const contactMessage = `مرحبًا، لدي استفسار عن الفرصة: ${listing.title.ar} (${listing.slug})`;

  const viewingHref = (HAS_WHATSAPP && whatsappLink(viewingMessage)) || mailtoLink(listing.title.ar);
  const evaluateHref = (HAS_WHATSAPP && whatsappLink(evaluateMessage)) || mailtoLink(listing.title.ar);
  const contactHref = (HAS_WHATSAPP && whatsappLink(contactMessage)) || mailtoLink(listing.title.ar);

  const cover = listing.media.find((m) => m.isCover) || listing.media[0];
  const breadcrumb = breadcrumbJsonLd([
    { name: dict.nav.home, url: `${SITE.url}/${locale}` },
    { name: dict.nav.marketplace, url: `${SITE.url}/${locale}/marketplace` },
    { name: pickText(listing.title, locale), url: `${SITE.url}/${locale}/marketplace/${listing.slug}` },
  ]);
  const productLd = listingJsonLd({
    name: pickText(listing.title, locale),
    description: pickText(listing.summary, locale),
    url: `${SITE.url}/${locale}/marketplace/${listing.slug}`,
    priceSAR: listing.priceSAR,
    city: pickText(listing.city, locale),
    // صور الفرص الحقيقية روابطها كاملة أصلًا (Supabase Storage)، أما الصور التجريبية فمسارات محلية
    image: cover ? (cover.url.startsWith("http") ? cover.url : `${SITE.url}${cover.url}`) : undefined,
  });

  const specRows: { label: string; value: string }[] = [
    { label: dict.listing.specs.activityType, value: pickText(listing.activityType, locale) },
    { label: dict.listing.specs.dealType, value: dict.marketplace.kinds[listing.kind] },
    { label: dict.listing.specs.price, value: listing.priceSAR ? `${listing.priceSAR.toLocaleString()} SAR` : dict.common.priceOnRequest },
    ...(listing.rentSAR ? [{ label: dict.listing.specs.rent, value: `${listing.rentSAR.toLocaleString()} SAR` }] : []),
    { label: dict.listing.specs.size, value: listing.sizeSqm ? `${listing.sizeSqm} m²` : "—" },
    { label: dict.listing.specs.city, value: pickText(listing.city, locale) },
    { label: dict.listing.specs.area, value: pickText(listing.area, locale) },
    { label: dict.listing.specs.operatingState, value: dict.listing.operatingStates[listing.operatingState] },
    ...(listing.openings ? [{ label: dict.listing.specs.openings, value: String(listing.openings) }] : []),
    ...(listing.seatingCapacity ? [{ label: dict.listing.specs.seating, value: String(listing.seatingCapacity) }] : []),
    ...(listing.equipmentSummary ? [{ label: dict.listing.specs.equipment, value: pickText(listing.equipmentSummary, locale) }] : []),
    ...(listing.kitchenSummary ? [{ label: dict.listing.specs.kitchen, value: pickText(listing.kitchenSummary, locale) }] : []),
    ...(listing.parkingAvailable !== undefined
      ? [{ label: dict.listing.specs.parking, value: listing.parkingAvailable ? dict.listing.specs.parkingYes : dict.listing.specs.parkingNo }]
      : []),
  ];

  return (
    <section className="pb-24 pt-10 lg:pb-10">
      <div className="container-page">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productLd) }} />

        <div className="mb-5 flex flex-wrap items-center gap-2">
          <Badge tone="dark">{dict.marketplace.kinds[listing.kind]}</Badge>
          <Badge tone="ember">{dict.marketplace.status[listing.status]}</Badge>
        </div>

        <div className="grid gap-10 lg:grid-cols-[1fr_360px]">
          <div>
            <h1 className="mb-4 text-2xl font-bold leading-tight text-ink-900 sm:text-3xl">{pickText(listing.title, locale)}</h1>
            <ListingGallery media={listing.media} title={pickText(listing.title, locale)} />

            <div className="mt-8 rounded-card border border-gold-500/30 bg-gold-300/25 p-4 text-sm leading-7 text-ink-800">
              {dict.listing.locationNotice}
            </div>

            <div className="mt-8">
              <h2 className="mb-3 text-lg font-bold text-ink-900">{dict.listing.descriptionTitle}</h2>
              <p className="leading-8 text-ink-700">{pickText(listing.description, locale)}</p>
            </div>

            {listing.features.length > 0 && (
              <div className="mt-8">
                <h2 className="mb-3 text-lg font-bold text-ink-900">{dict.listing.featuresTitle}</h2>
                <ul className="grid gap-2.5 sm:grid-cols-2">
                  {listing.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-ink-700">
                      <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-ember-600" />
                      {pickText(f, locale)}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mt-8">
              <h2 className="mb-3 text-lg font-bold text-ink-900">{dict.listing.specs.title}</h2>
              <div className="overflow-hidden rounded-card border border-sand-200">
                <table className="w-full text-sm">
                  <tbody>
                    {specRows.map((row) => (
                      <tr key={row.label} className="border-b border-sand-100 last:border-0">
                        <th className="w-1/3 bg-sand-50 p-3 text-start font-semibold text-ink-900">{row.label}</th>
                        <td className="p-3 text-ink-700">{row.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* الشريط الجانبي — سطح المكتب فقط، يتحول لشريط سفلي ثابت على الجوال */}
          <aside className="hidden h-fit space-y-3 lg:sticky lg:top-24 lg:block">
            <Card className="p-5">
              <p className="mb-4 text-xs font-semibold text-ink-500">{dict.listing.views.replace("{count}", String(listing.views))}</p>
              <div className="flex flex-col gap-2.5">
                <a href={viewingHref} target="_blank" rel="noopener noreferrer" className="focus-ring rounded-btn bg-ember-600 px-5 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-ember-700">
                  {dict.listing.ctaViewing}
                </a>
                <a href={contactHref} target="_blank" rel="noopener noreferrer" className="focus-ring rounded-btn border border-ink-900/15 px-5 py-3 text-center text-sm font-semibold text-ink-800 hover:bg-sand-50">
                  {dict.listing.ctaContact}
                </a>
                <a href={evaluateHref} target="_blank" rel="noopener noreferrer" className="focus-ring rounded-btn px-5 py-3 text-center text-sm font-semibold text-gold-700 hover:bg-sand-50">
                  {dict.listing.ctaEvaluate}
                </a>
              </div>
            </Card>
          </aside>
        </div>

        {similar.length > 0 && (
          <div className="mt-16">
            <SectionHeading title={dict.listing.similarTitle} />
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {similar.map((l, i) => (
                <Reveal key={l.slug} delay={i * 60}>
                  <ListingCard listing={l} dict={dict} locale={locale} />
                </Reveal>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* شريط CTA ثابت أسفل الشاشة على الجوال فقط */}
      <div className="fixed inset-x-0 bottom-0 z-30 flex gap-2 border-t border-sand-200 bg-white/95 p-3 shadow-cardHover backdrop-blur lg:hidden">
        <a
          href={viewingHref}
          target="_blank"
          rel="noopener noreferrer"
          className="focus-ring flex-1 rounded-btn bg-ember-600 px-4 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-ember-700"
        >
          {dict.listing.ctaViewing}
        </a>
        <a
          href={contactHref}
          target="_blank"
          rel="noopener noreferrer"
          className="focus-ring flex-1 rounded-btn border border-ink-900/15 px-4 py-3 text-center text-sm font-semibold text-ink-800"
        >
          {dict.listing.ctaContact}
        </a>
      </div>
    </section>
  );
}
