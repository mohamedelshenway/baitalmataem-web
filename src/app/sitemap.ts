import type { MetadataRoute } from "next";
import { locales } from "@/i18n/config";
import { SITE } from "@/lib/constants";
import { SERVICES } from "@/lib/data/services";
import { LISTINGS } from "@/lib/data/listings";
import { POSTS } from "@/lib/data/posts";

// خريطة موقع واحدة تغطي كل اللغات لكل مسار (alternates.languages) بدل خريطة منفصلة لكل لغة،
// وهو أسلوب مدعوم بالكامل من جوجل ويكفي في هذه المرحلة (MVP) بدل بناء ملفات sitemap متعددة.
export default function sitemap(): MetadataRoute.Sitemap {
  // ملاحظة: "/marketplace/new" و"/admin" مستثناة عمدًا — كلاهما noIndex في generateMetadata
  // ومحجوبتان في robots.ts، فلا يصح إدراجهما في خريطة الموقع لتفادي إشارات متضاربة لمحركات البحث.
  const staticPaths = ["", "/services", "/marketplace", "/blog", "/about", "/contact"];
  const servicePaths = SERVICES.map((s) => `/services/${s.slug}`);
  const listingPaths = LISTINGS.filter((l) => l.moderation === "approved").map((l) => `/marketplace/${l.slug}`);
  const postPaths = POSTS.map((p) => `/blog/${p.slug}`);

  const allPaths = [...staticPaths, ...servicePaths, ...listingPaths, ...postPaths];

  return allPaths.flatMap((path) =>
    locales.map((locale) => ({
      url: `${SITE.url}/${locale}${path}`,
      lastModified: "2026-08-22",
      changeFrequency: path === "" ? "daily" : "weekly",
      priority: path === "" ? 1 : 0.7,
      alternates: {
        languages: Object.fromEntries(locales.map((l) => [l, `${SITE.url}/${l}${path}`])),
      },
    }))
  );
}
