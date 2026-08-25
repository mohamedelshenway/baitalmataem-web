import type { Metadata } from "next";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { buildMetadata } from "@/lib/seo";
import { LISTINGS } from "@/lib/data/listings";
import { POSTS } from "@/lib/data/posts";
import { notFound } from "next/navigation";
import {
  Hero,
  TrustStrip,
  HowWeHelp,
  WhySection,
  TeamSection,
  ServicesSection,
  InvestorSection,
  ListYourOpportunitySection,
  BlogSection,
} from "@/components/home-sections";
import { MarketplacePreview } from "@/components/marketplace-preview";

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  if (!isLocale(params.locale)) return {};
  const dict = await getDictionary(params.locale);
  return buildMetadata({
    title: dict.home.heroTitle,
    description: dict.home.heroSubtitle,
    locale: params.locale,
    path: "/",
  });
}

export default async function HomePage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale as Locale;
  const dict = await getDictionary(locale);

  const approvedListings = LISTINGS.filter((l) => l.moderation === "approved");
  const previewListings = approvedListings.slice(0, 6);
  const cities = Array.from(new Set(approvedListings.map((l) => l.city.ar)));

  const latestPosts = [...POSTS].sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));
  const postImages = ["/placeholders/blog-1.svg", "/placeholders/blog-2.svg"];

  return (
    <>
      <Hero dict={dict} locale={locale} cities={cities} />
      <TrustStrip dict={dict} />
      <HowWeHelp dict={dict} locale={locale} />
      <MarketplacePreview dict={dict} locale={locale} listings={previewListings} />
      <WhySection dict={dict} />
      <TeamSection dict={dict} />
      <ServicesSection dict={dict} locale={locale} />
      <InvestorSection dict={dict} locale={locale} />
      <ListYourOpportunitySection dict={dict} locale={locale} />
      <BlogSection dict={dict} locale={locale} posts={latestPosts} images={postImages} />
    </>
  );
}
