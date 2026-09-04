export const locales = ["ar", "en", "tr", "ru", "ur"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "ar";

export const localeMeta: Record<Locale, { dir: "rtl" | "ltr"; label: string; htmlLang: string }> = {
  ar: { dir: "rtl", label: "العربية", htmlLang: "ar" },
  en: { dir: "ltr", label: "English", htmlLang: "en" },
  tr: { dir: "ltr", label: "Türkçe", htmlLang: "tr" },
  ru: { dir: "ltr", label: "Русский", htmlLang: "ru" },
  ur: { dir: "rtl", label: "اردو", htmlLang: "ur" },
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}
