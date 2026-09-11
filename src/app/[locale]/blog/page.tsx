import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { SITE } from "@/lib/constants";
import { POSTS } from "@/lib/data/posts";
import { SectionHeading } from "@/components/ui";
import { BlogList } from "@/components/blog-list";

// ترتيب الصور لازم يطابق ترتيب المقالات بعد الترتيب حسب الأحدث أولًا (posts أدناه) — نفس صورة
// كل مقال المستخدمة في صفحته التفصيلية (POST_IMAGES في blog/[slug]/page.tsx)
const IMAGES = [
  "/images/editorial/restaurant-marketing-lg.webp",
  "/images/editorial/catering-service-lg.webp",
  "/images/editorial/commercial-kitchen-lg.webp",
  "/images/editorial/operations-team-lg.webp",
  "/images/editorial/restaurant-interior-lg.webp",
  "/images/editorial/management-meeting-lg.webp",
  "/images/editorial/restaurant-interior-lg.webp",
  "/images/editorial/feasibility-analysis-lg.webp",
  "/images/editorial/restaurant-equipment-lg.webp",
];

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  if (!isLocale(params.locale)) return {};
  const dict = await getDictionary(params.locale);
  return buildMetadata({
    title: dict.blog.pageTitle,
    description: dict.blog.pageSubtitle,
    locale: params.locale,
    path: "/blog",
  });
}

export default async function BlogPage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale as Locale;
  const dict = await getDictionary(locale);
  const posts = [...POSTS].sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));

  const breadcrumb = breadcrumbJsonLd([
    { name: dict.nav.home, url: `${SITE.url}/${locale}` },
    { name: dict.nav.blog, url: `${SITE.url}/${locale}/blog` },
  ]);

  return (
    <section className="py-12 sm:py-14">
      <div className="container-page">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
        <SectionHeading level="h1" eyebrow={dict.home.blogTitle} title={dict.blog.pageTitle} subtitle={dict.blog.pageSubtitle} />
        <BlogList dict={dict} locale={locale} posts={posts} images={IMAGES} />
      </div>
    </section>
  );
}
