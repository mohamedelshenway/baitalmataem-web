import type { Metadata } from "next";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { buildMetadata } from "@/lib/seo";
import { getPublishedListings } from "@/lib/data/live-listings";
import { POSTS } from "@/lib/data/posts";
import { HOME_SEO_AR } from "@/lib/data/seo-overrides";
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
  // عنوان ووصف صفحة البحث (title/meta description) مختلفان عمدًا عن نص الواجهة الظاهر
  // (heroTitle/heroSubtitle) — نص الواجهة جملة تسويقية للزائر، بينما عنوان ووصف الميتا
  // مكتوبان للكلمات المفتاحية الفعلية اللي يبحث بيها العميل في جوجل. راجع seo-overrides.ts
  const seo = params.locale === "ar" ? HOME_SEO_AR : null;
  return buildMetadata({
    title: seo?.metaTitle ?? dict.home.heroTitle,
    description: seo?.metaDescription ?? dict.home.heroSubtitle,
    locale: params.locale,
    path: "/",
  });
}

export default async function HomePage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale as Locale;
  const dict = await getDictionary(locale);

  // نعرض الفرص الحقيقية المنشورة فقط — بدون أي رجوع لبيانات تجريبية، حتى لا تظهر فرصة
  // غير حقيقية للزائر على أنها فرصة فعلية. لو القائمة فاضية، الأقسام أدناه تتعامل مع
  // الحالة الفارغة بشكل واضح بدل عرض بيانات وهمية.
  const approvedListings = await getPublishedListings();
  const previewListings = approvedListings.slice(0, 6);
  const cities = Array.from(new Set(approvedListings.map((l) => l.city.ar)));

  const latestPosts = [...POSTS].sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));
  // ترتيب الصور هنا لازم يطابق ترتيب latestPosts (الأحدث أولًا) — نفس صورة كل مقال المستخدمة
  // في صفحته التفصيلية (POST_IMAGES في blog/[slug]/page.tsx) حتى لا تختلف الصورة بين المعاينة والصفحة.
  const postImages = [
    "/images/editorial/management-meeting-lg.webp",
    "/images/editorial/restaurant-interior-lg.webp",
    "/images/editorial/feasibility-analysis-lg.webp",
    "/images/editorial/restaurant-equipment-lg.webp",
  ];

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
