"use client";

import { useState } from "react";
import type { Dictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/config";
import type { BlogPost } from "@/lib/types";
import { PostCard } from "@/components/post-card";
import { Reveal } from "@/components/reveal";
import { pickText } from "@/lib/i18n-text";

// شبكة المدونة الكاملة: تصنيفات مبنية على بيانات المقالات الفعلية (وليست تصنيفات وهمية بلا محتوى)،
// مع مقال مميز أكبر ثم باقي المقالات في شبكة أصغر — نفس منطق معاينة المدونة في الرئيسية.
export function BlogList({ dict, locale, posts, images }: { dict: Dictionary; locale: Locale; posts: BlogPost[]; images: string[] }) {
  const categories = Array.from(new Set(posts.map((p) => pickText(p.category, locale))));
  const [active, setActive] = useState<string | "all">("all");

  const filtered = active === "all" ? posts : posts.filter((p) => pickText(p.category, locale) === active);
  const [featured, ...rest] = filtered;

  return (
    <div>
      {categories.length > 1 && (
        <div className="mb-8 flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setActive("all")}
            className={`focus-ring rounded-btn px-4 py-2 text-sm font-semibold transition-colors ${
              active === "all" ? "bg-ink-950 text-white" : "bg-sand-100 text-ink-700 hover:text-ink-950"
            }`}
          >
            {dict.home.marketplaceTabAll}
          </button>
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setActive(c)}
              className={`focus-ring rounded-btn px-4 py-2 text-sm font-semibold transition-colors ${
                active === c ? "bg-ink-950 text-white" : "bg-sand-100 text-ink-700 hover:text-ink-950"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      )}

      {!featured ? (
        <p className="py-10 text-center text-sm text-ink-600">{dict.marketplace.noResults}</p>
      ) : (
        <div className="grid gap-5 lg:grid-cols-5">
          <Reveal className="lg:col-span-3">
            <PostCard post={featured} dict={dict} locale={locale} image={images[posts.indexOf(featured) % images.length]} featured />
          </Reveal>
          <div className="grid gap-5 lg:col-span-2">
            {rest.map((p, i) => (
              <Reveal key={p.slug} delay={(i + 1) * 60}>
                <PostCard post={p} dict={dict} locale={locale} image={images[posts.indexOf(p) % images.length]} />
              </Reveal>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
