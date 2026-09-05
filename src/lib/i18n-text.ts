import type { Locale } from "@/i18n/config";
import type { LocalizedText, LocalizedTextList } from "@/lib/types";

// عرض نص متعدد اللغات حسب اللغة الحالية، مع رجوع تلقائي للإنجليزية ثم العربية
// لو القطعة (فرصة/مقال) لسه ما اتترجمتش للتركية أو الروسية أو الأردية.
// هذا أفضل من كسر الصفحة أو اختلاق ترجمة غير موجودة فعليًا.
export function pickText(text: LocalizedText, locale: Locale): string {
  return text[locale] ?? text.en ?? text.ar;
}

export function pickTextList(text: LocalizedTextList, locale: Locale): string[] {
  return text[locale] ?? text.en ?? text.ar;
}
