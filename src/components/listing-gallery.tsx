"use client";

import Image from "next/image";
import { useState } from "react";
import type { ListingMedia } from "@/lib/types";

export function ListingGallery({ media, title }: { media: ListingMedia[]; title: string }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = media[activeIndex] ?? media[0];

  if (!active) return null;

  return (
    <div>
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-cardLg bg-ink-100">
        <Image src={active.url} alt={active.alt} fill priority sizes="(min-width: 1024px) 60vw, 100vw" className="object-cover" />
      </div>
      {media.length > 1 && (
        <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
          {media.map((m, i) => (
            <button
              key={m.id}
              type="button"
              onClick={() => setActiveIndex(i)}
              aria-label={`${title} ${i + 1}`}
              className={`focus-ring relative h-16 w-24 flex-shrink-0 overflow-hidden rounded-btn border-2 transition-colors ${
                i === activeIndex ? "border-ember-600" : "border-transparent hover:border-sand-300"
              }`}
            >
              <Image src={m.url} alt={m.alt} fill sizes="100px" className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
