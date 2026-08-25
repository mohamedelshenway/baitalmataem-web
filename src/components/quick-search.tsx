"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { Dictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/config";
import type { ListingKind } from "@/lib/types";

const QUICK_KINDS: ListingKind[] = ["restaurant_taqbeel", "restaurant_sale", "lease_unit", "investment_opportunity"];

// بحث سريع مدمج أسفل الـHero — نموذج فعلي (وليس شكليًا) يوجّه لصفحة سوق الفرص بمعاملات البحث نفسها
// التي تدعمها الصفحة (kind, city) بالإضافة لمعامل نشاط نصي بسيط (activity).
export function QuickSearch({ dict, locale, cities }: { dict: Dictionary; locale: Locale; cities: string[] }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [kind, setKind] = useState("");
  const [city, setCity] = useState("");
  const [activity, setActivity] = useState("");

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (kind) params.set("kind", kind);
    if (city) params.set("city", city);
    if (activity.trim()) params.set("activity", activity.trim());
    router.push(`/${locale}/marketplace${params.toString() ? `?${params.toString()}` : ""}`);
  }

  const fields = (
    <>
      <div className="flex-1">
        <label className="mb-1.5 block text-xs font-semibold text-ink-600">{dict.home.search.label}</label>
        <select
          value={kind}
          onChange={(e) => setKind(e.target.value)}
          className="focus-ring w-full rounded-btn border border-sand-200 bg-white px-3 py-2.5 text-sm text-ink-900"
        >
          <option value="">{dict.home.marketplaceTabAll}</option>
          {QUICK_KINDS.map((k) => (
            <option key={k} value={k}>
              {dict.marketplace.kinds[k]}
            </option>
          ))}
        </select>
      </div>
      <div className="flex-1">
        <label className="mb-1.5 block text-xs font-semibold text-ink-600">{dict.home.search.city}</label>
        <select
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="focus-ring w-full rounded-btn border border-sand-200 bg-white px-3 py-2.5 text-sm text-ink-900"
        >
          <option value="">{dict.home.search.allCities}</option>
          {cities.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>
      <div className="flex-1">
        <label className="mb-1.5 block text-xs font-semibold text-ink-600">{dict.home.search.activity}</label>
        <input
          value={activity}
          onChange={(e) => setActivity(e.target.value)}
          placeholder={dict.home.search.activityPlaceholder}
          className="focus-ring w-full rounded-btn border border-sand-200 bg-white px-3 py-2.5 text-sm text-ink-900"
        />
      </div>
      <button
        type="submit"
        className="focus-ring rounded-btn bg-ember-600 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-ember-700 sm:self-end"
      >
        {dict.home.search.button}
      </button>
    </>
  );

  return (
    <div className="relative z-10 mx-auto -mt-10 w-full max-w-4xl px-4 sm:-mt-12">
      {/* الجوال: زر يفتح لوحة البحث بدل نموذج كامل مزدحم */}
      <div className="sm:hidden">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="focus-ring flex w-full items-center justify-center gap-2 rounded-card bg-white px-5 py-4 text-sm font-semibold text-ink-900 shadow-cardHover"
        >
          🔍 {dict.home.search.mobileTrigger}
        </button>
        {open && (
          <form onSubmit={submit} className="mt-2 flex flex-col gap-3 rounded-card border border-sand-200 bg-white p-4 shadow-cardHover">
            {fields}
          </form>
        )}
      </div>

      {/* سطح المكتب: كارت أبيض عريض بظل خفيف جدًا */}
      <form onSubmit={submit} className="hidden items-end gap-3 rounded-card bg-white p-4 shadow-cardHover sm:flex">
        {fields}
      </form>
    </div>
  );
}
