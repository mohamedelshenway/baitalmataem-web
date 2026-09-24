import type { MetadataRoute } from "next";
import { locales } from "@/i18n/config";
import { SITE } from "@/lib/constants";
import { SERVICES } from "@/lib/data/services";
import { getPublishedListings } from "@/lib/data/live-listings";
import { POSTS } from "@/lib/data/posts";
import { postLocales } from "@/lib/post-locales";
import type { Locale } from "@/i18n/config";

// خريطة موقع واحدة تغطي كل اللغات لكل مسار (alternates.languages) بدل خريطة منفصلة لكل لغة،
// وهو أسلوب مدعوم بالكامل من جوجل ويكفي في هذه المرحلة (MVP) بدل بناء ملفات sitemap متعددة.
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // ملاحظة: "/marketplace/new" و"/admin" مستثناة عمدًا — كلاهما noIndex في generateMetadata
  // ومحجوبتان في robots.ts، فلا يصح إدراجهما في خريطة الموقع لتفادي إشارات متضاربة لمحركات search.
  // "/join-us" كانت صفحة حقيقية وقابلة للفهرسة (مفيش noIndex عليها) لكنها كانت ناقصة من هنا سهوًا
  const staticPaths = ["", "/services", "/projects", "/marketplace", "/blog", "/about", "/contact", "/join-us"];
  const servicePaths = SERVICES.map((s) => `/services/${s.slug}`);
  // فرص حقيقية منشورة فقط — لا بيانات تجريبية في خريطة الموقع أبدًا.
  const liveListings = await getPublishedListings();
  const listingPaths = liveListings.map((l) => `/marketplace/${l.slug}`);
  type Entry = { path: string; langs: readonly Locale[]; lastModified: string };
  // تاريخ آخر تعديل كان ثابت على 2026-08-22 لكل الصفحات، حتى المقالات اللي اتنشرت بعده بشهر.
  // دلوقتي: المقال بتاريخ نشره، وباقي الصفحات بتاريخ آخر build.
  const buildDate = new Date().toISOString().slice(0, 10);
  const entries: Entry[] = [
    ...[...staticPaths, ...servicePaths, ...listingPaths].map((path) => ({
      path,
      langs: locales,
      lastModified: buildDate,
    })),
    // المقال يدخل الخريطة بس باللغات المترجم لها فعليًا — مش نسخ fallback إنجليزي تحت /tr و/ru و/ur
    ...POSTS.map((p) => ({ path: `/blog/${p.slug}`, langs: postLocales(p), lastModified: p.publishedAt })),
  ];

  return entries.flatMap(({ path, langs, lastModified }) =>
    langs.map((locale) => ({
      url: `${SITE.url}/${locale}${path}`,
      lastModified,
      changeFrequency: path === "" ? "daily" : "weekly",
      priority: path === "" ? 1 : 0.7,
      alternates: {
        languages: Object.fromEntries(langs.map((l) => [l, `${SITE.url}/${l}${path}`])),
      },
    }))
  );
}
