"use client";

import { useState } from "react";
import type { Dictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/config";
import type { Listing, ListingKind } from "@/lib/types";
import { Button, SectionHeading } from "@/components/ui";
import { ListingCard } from "@/components/listing-card";
import { Reveal } from "@/components/reveal";

const TABS: ListingKind[] = ["restaurant_taqbeel", "restaurant_sale", "lease_unit", "investment_opportunity"];

export function MarketplacePreview({
  dict,
  locale,
  listings,
}: {
  dict: Dictionary;
  locale: Locale;
  listings: Listing[];
}) {
  const [tab, setTab] = useState<"all" | ListingKind>("all");
  const featured = listings.filter((listing) => listing.featured).slice(0, 2);
  const latest = listings.filter((listing) => !listing.featured);
  const filtered = (tab === "all" ? latest : latest.filter((l) => l.kind === tab)).slice(0, 3);

  return (
    <section className="bg-sand-50 py-16 sm:py-20">
      <div className="container-page">
        <SectionHeading eyebrow={dict.home.marketplaceKicker} title={dict.home.listingsTitle} subtitle={dict.home.listingsSubtitle} align="center" />

        {featured.length > 0 && (
          <div className="mb-12">
            <div className="mb-5 flex items-center justify-between gap-3">
              <h3 className="text-lg font-bold text-ink-950">{locale === "ar" ? "الفرص المميزة" : "Featured opportunities"}</h3>
              <span className="rounded-full bg-gold-500/15 px-3 py-1 text-xs font-bold text-gold-700">{locale === "ar" ? "مختارة" : "Selected"}</span>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              {featured.map((listing, index) => <Reveal key={listing.slug} delay={index * 60}><ListingCard listing={listing} dict={dict} locale={locale} /></Reveal>)}
            </div>
          </div>
        )}

        <h3 className="mb-5 text-center text-lg font-bold text-ink-950">{locale === "ar" ? "أحدث الفرص" : "Latest opportunities"}</h3>

        <div className="mb-8 flex flex-wrap items-center justify-center gap-2">
          <button
            type="button"
            onClick={() => setTab("all")}
            className={`focus-ring rounded-btn px-4 py-2 text-sm font-semibold transition-colors ${
              tab === "all" ? "bg-ink-950 text-white" : "bg-white text-ink-700 hover:text-ink-950"
            }`}
          >
            {dict.home.marketplaceTabAll}
          </button>
          {TABS.map((k) => (
            <button
              key={k}
              type="button"
              onClick={() => setTab(k)}
              className={`focus-ring rounded-btn px-4 py-2 text-sm font-semibold transition-colors ${
                tab === k ? "bg-ink-950 text-white" : "bg-white text-ink-700 hover:text-ink-950"
              }`}
            >
              {dict.marketplace.kinds[k]}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <p className="py-10 text-center text-sm text-ink-600">{dict.marketplace.noResults}</p>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((l, i) => (
              <Reveal key={l.slug} delay={i * 60}>
                <ListingCard listing={l} dict={dict} locale={locale} />
              </Reveal>
            ))}
          </div>
        )}

        <div className="mt-10 text-center">
          <Button href={`/${locale}/marketplace`} variant="outline" arrow>
            {dict.home.listingsCta}
          </Button>
        </div>
      </div>
    </section>
  );
}
