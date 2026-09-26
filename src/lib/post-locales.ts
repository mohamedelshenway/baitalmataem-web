import type { BlogPost } from "@/lib/types";
import { indexableLocales, type Locale } from "@/i18n/config";

// اللغات اللي المقال مترجم لها فعليًا (محتوى المقال نفسه، مش بس العنوان).
// الترتيب بيتبع ترتيب لغات الموقع، فالعربي أول واحد دايمًا.
export function postLocales(post: BlogPost): Locale[] {
  return indexableLocales.filter((l) => Boolean(post.content[l]?.trim()));
}
