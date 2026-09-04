import Image from "next/image";
import Link from "next/link";
import type { Dictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/config";
import type { BlogPost } from "@/lib/types";
import { Card, Badge } from "@/components/ui";
import { pickText } from "@/lib/i18n-text";

export function PostCard({
  post,
  dict,
  locale,
  image,
  featured = false,
}: {
  post: BlogPost;
  dict: Dictionary;
  locale: Locale;
  image: string;
  featured?: boolean;
}) {
  return (
    <Link href={`/${locale}/blog/${post.slug}`} className="focus-ring group block h-full">
      <Card className="flex h-full flex-col overflow-hidden p-0">
        <div className={`img-zoom relative w-full overflow-hidden bg-ink-100 ${featured ? "aspect-[16/9]" : "aspect-[16/10]"}`}>
          <Image
            src={image}
            alt={pickText(post.title, locale)}
            fill
            sizes={featured ? "(min-width: 1024px) 60vw, 100vw" : "(min-width: 1024px) 33vw, 100vw"}
            className="object-cover"
          />
          <div className="absolute inset-x-3 top-3">
            <Badge tone="dark">{pickText(post.category, locale)}</Badge>
          </div>
        </div>
        <div className="flex flex-1 flex-col p-5">
          <h3 className={`mb-2 line-clamp-2 font-bold leading-6 text-ink-900 ${featured ? "text-xl" : "text-base"}`}>
            {pickText(post.title, locale)}
          </h3>
          <p className={`mb-4 flex-1 leading-7 text-ink-600 ${featured ? "line-clamp-3 text-sm" : "line-clamp-2 text-sm"}`}>
            {pickText(post.excerpt, locale)}
          </p>
          <p className="cta-arrow inline-flex items-center gap-1 text-xs font-semibold text-ink-500">
            {dict.blog.minutesRead.replace("{count}", String(post.readingMinutes))}
          </p>
        </div>
      </Card>
    </Link>
  );
}
