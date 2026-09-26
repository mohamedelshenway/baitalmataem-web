export const locales = ["ar", "en", "tr", "ru", "ur", "hi", "bn"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "ar";

// اللغات اللي الموقع مترجم لها فعليًا وتتعرض لجوجل (sitemap + hreflang + index).
// الهندي والبنغالي مترجم منهم أجزاء بسيطة بس والباقي بيطلع إنجليزي — لو اتأرشفوا جوجل هيشوف
// مئات الصفحات المكررة. الصفحات دي شغالة للزوار، لكن بتاخد noindex وcanonical على الإنجليزي
// لحد ما الترجمة تكمل، ووقتها تتضاف هنا.
export const indexableLocales: readonly Locale[] = ["ar", "en", "tr", "ru", "ur"];

export const localeMeta: Record<Locale, { dir: "rtl" | "ltr"; label: string; htmlLang: string }> = {
  ar: { dir: "rtl", label: "العربية", htmlLang: "ar" },
  en: { dir: "ltr", label: "English", htmlLang: "en" },
  tr: { dir: "ltr", label: "Türkçe", htmlLang: "tr" },
  ru: { dir: "ltr", label: "Русский", htmlLang: "ru" },
  ur: { dir: "rtl", label: "اردو", htmlLang: "ur" },
  hi: { dir: "ltr", label: "हिन्दी", htmlLang: "hi" },
  bn: { dir: "ltr", label: "বাংলা", htmlLang: "bn" },
};

export type ContentLocale = "ar" | "en";
export const contentLocale = (locale: Locale): ContentLocale => locale === "ar" ? "ar" : "en";
export const localize = <T>(value: { ar: T; en: T }, locale: Locale): T => value[contentLocale(locale)];

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}
