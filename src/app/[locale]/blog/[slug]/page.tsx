import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { locales, isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { buildMetadata, breadcrumbJsonLd, articleJsonLd } from "@/lib/seo";
import { SITE } from "@/lib/constants";
import { POSTS, getPostBySlug } from "@/lib/data/posts";
import { LISTINGS } from "@/lib/data/listings";
import { getServiceMeta } from "@/lib/data/services";
import { parseContent } from "@/lib/format-content";
import { Badge, Button, GoldDivider } from "@/components/ui";
import { ListingCard } from "@/components/listing-card";

const POST_IMAGES: Record<string, string> = {
  "how-to-evaluate-a-restaurant-before-buying": "/images/editorial/feasibility-analysis-lg.webp",
  "food-cost-why-it-creeps-up-without-noticing": "/images/editorial/restaurant-equipment-lg.webp",
};

export function generateStaticParams() {
  return locales.flatMap((locale) => POSTS.map((p) => ({ locale, slug: p.slug })));
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string; slug: string };
}): Promise<Metadata> {
  if (!isLocale(params.locale)) return {};
  const post = getPostBySlug(params.slug);
  if (!post) return {};
  const postImage = POST_IMAGES[post.slug];
  return buildMetadata({
    title: post.title[params.locale],
    description: post.excerpt[params.locale],
    locale: params.locale,
    path: `/blog/${params.slug}`,
    keywords: post.tags,
    ogImagePath: postImage,
  });
}

export default async function BlogPostPage({ params }: { params: { locale: string; slug: string } }) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale as Locale;
  const post = getPostBySlug(params.slug);
  if (!post) notFound();
  const postImage = POST_IMAGES[post.slug];
  const dict = await getDictionary(locale);
  const blocks = parseContent(post.content[locale]);

  const relatedService = post.relatedServiceSlug ? getServiceMeta(post.relatedServiceSlug) : undefined;
  const relatedServiceItem =
    relatedService && dict.services.list[relatedService.slug as keyof typeof dict.services.list];
  const relatedListings = LISTINGS.filter(
    (l) => l.moderation === "approved" && (!relatedService || l.kind === "restaurant_taqbeel" || l.kind === "restaurant_sale")
  ).slice(0, 2);

  const breadcrumb = breadcrumbJsonLd([
    { name: dict.nav.home, url: `${SITE.url}/${locale}` },
    { name: dict.nav.blog, url: `${SITE.url}/${locale}/blog` },
    { name: post.title[locale], url: `${SITE.url}/${locale}/blog/${post.slug}` },
  ]);
  const articleLd = articleJsonLd({
    title: post.title[locale],
    description: post.excerpt[locale],
    url: `${SITE.url}/${locale}/blog/${post.slug}`,
    datePublished: post.publishedAt,
    author: post.author,
  });

  return (
    <article className="py-12 sm:py-14">
      <div className="container-page max-w-3xl">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />

        <Link href={`/${locale}/blog`} className="cta-arrow focus-ring mb-6 inline-flex items-center gap-1.5 text-sm font-semibold text-ink-600 hover:text-ember-600">
          <span data-arrow aria-hidden>←</span>
          {dict.nav.blog}
        </Link>

        <div className="mb-4 flex flex-wrap items-center gap-2">
          <Badge tone="dark">{post.category[locale]}</Badge>
          <span className="text-xs font-semibold text-ink-500">
            {dict.blog.minutesRead.replace("{count}", String(post.readingMinutes))}
          </span>
        </div>
        <h1 className="mb-4 text-2xl font-bold leading-tight text-ink-900 sm:text-4xl">{post.title[locale]}</h1>
        <p className="mb-8 text-lg leading-8 text-ink-600">{post.excerpt[locale]}</p>
        {postImage && (
          <div className="relative mb-8 aspect-[16/9] overflow-hidden rounded-cardLg bg-ink-100 shadow-card">
            <Image
              src={postImage}
              alt={post.title[locale]}
              fill
              priority
              sizes="(min-width: 768px) 768px, 100vw"
              className="object-cover"
            />
          </div>
        )}
        <GoldDivider className="mb-8" />

        <div className="prose-article">
          {blocks.map((block, i) => {
            if (block.type === "h2") return <h2 key={i}>{block.text}</h2>;
            if (block.type === "ul")
              return (
                <ul key={i}>
                  {block.items.map((item, j) => (
                    <li key={j}>{item}</li>
                  ))}
                </ul>
              );
            return <p key={i}>{block.text}</p>;
          })}
        </div>

        {relatedServiceItem && relatedService && (
          <div className="mt-10 rounded-card border border-sand-200 bg-sand-50 p-6">
            <p className="eyebrow mb-2">{dict.blog.relatedServiceCta}</p>
            <h3 className="mb-3 text-lg font-bold text-ink-900">{relatedServiceItem.title}</h3>
            <Button href={`/${locale}/services/${relatedService.slug}`} variant="primary" arrow>
              {dict.common.learnMore}
            </Button>
          </div>
        )}

        {relatedListings.length > 0 && (
          <div className="mt-14">
            <h2 className="mb-5 text-lg font-bold text-ink-900">{dict.blog.relatedListingsTitle}</h2>
            <div className="grid gap-5 sm:grid-cols-2">
              {relatedListings.map((l) => (
                <ListingCard key={l.slug} listing={l} dict={dict} locale={locale} />
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
