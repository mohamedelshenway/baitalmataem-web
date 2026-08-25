import Image from "next/image";
import Link from "next/link";
import type { Dictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/config";
import type { Listing } from "@/lib/types";
import { Badge, Card } from "@/components/ui";

// كارت الفرصة الجديد: الصورة هي العنصر المهيمن، والنص أسفلها في حده الأدنى —
// عنوان، موقع ومساحة، سعر/إيجار، ثم CTA واحد واضح. يطابق منطق منصات العقار والاستثمار
// بدل شكل "بطاقة منتج" العام القديم.
export function ListingCard({ listing, dict, locale }: { listing: Listing; dict: Dictionary; locale: Locale }) {
  const cover = listing.media.find((m) => m.isCover) || listing.media[0];
  const priceLabel = listing.priceSAR
    ? `${listing.priceSAR.toLocaleString(locale === "ar" ? "ar-SA" : "en-US")} ${locale === "ar" ? "ريال" : "SAR"}`
    : dict.common.priceOnRequest;

  return (
    <Link href={`/${locale}/marketplace/${listing.slug}`} className="focus-ring group block">
      <Card className="overflow-hidden p-0">
        <div className="img-zoom relative aspect-[5/4] w-full overflow-hidden bg-ink-100">
          {cover && (
            <Image src={cover.url} alt={cover.alt} fill sizes="(min-width: 1024px) 33vw, 100vw" className="object-cover" />
          )}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-950/55 via-transparent to-transparent" />
          <div className="absolute inset-x-3 top-3 flex items-start justify-between gap-2">
            <Badge tone="dark">{dict.marketplace.kinds[listing.kind]}</Badge>
            <Badge tone="ember">{dict.marketplace.status[listing.status]}</Badge>
          </div>
        </div>
        <div className="p-5">
          <h3 className="mb-2 line-clamp-2 text-[15px] font-bold leading-6 text-ink-900">{listing.title[locale]}</h3>
          <p className="mb-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-ink-600">
            <span>📍 {listing.city[locale]} — {listing.area[locale]}</span>
            {listing.sizeSqm && <span>↔ {listing.sizeSqm} {locale === "ar" ? "م²" : "sqm"}</span>}
          </p>
          <div className="flex items-end justify-between gap-2 border-t border-sand-200 pt-3">
            <div>
              <p className="text-base font-bold text-ember-700">{priceLabel}</p>
              {listing.rentSAR && (
                <p className="mt-0.5 text-xs text-ink-600">
                  {dict.listing.specs.rent}: {listing.rentSAR.toLocaleString(locale === "ar" ? "ar-SA" : "en-US")} {locale === "ar" ? "ريال" : "SAR"}
                </p>
              )}
            </div>
            <span className="cta-arrow inline-flex items-center gap-1 text-xs font-semibold text-ember-600">
              {dict.listing.ctaViewDetails}
              <span data-arrow aria-hidden>←</span>
            </span>
          </div>
        </div>
      </Card>
    </Link>
  );
}
