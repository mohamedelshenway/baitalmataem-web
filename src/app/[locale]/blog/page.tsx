import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { buildMetadata } from "@/lib/seo";
import { POSTS } from "@/lib/data/posts";
import { SectionHeading } from "@/components/ui";
import { BlogList } from "@/components/blog-list";

const IMAGES = [
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

  return (
    <section className="py-12 sm:py-14">
      <div className="container-page">
        <SectionHeading eyebrow={dict.home.blogTitle} title={dict.blog.pageTitle} subtitle={dict.blog.pageSubtitle} />
        <BlogList dict={dict} locale={locale} posts={posts} images={IMAGES} />
      </div>
    </section>
  );
}
