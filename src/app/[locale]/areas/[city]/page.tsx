import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { locales, isLocale, localize, type Locale } from "@/i18n/config";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { SITE, whatsappLink, mailtoLink, HAS_WHATSAPP } from "@/lib/constants";
import { FOCUS_CITIES, getFocusCity } from "@/lib/data/focus-cities";
import { Button, Card, GoldDivider } from "@/components/ui";

export function generateStaticParams() {
  return locales.flatMap((locale) => FOCUS_CITIES.map((c) => ({ locale, city: c.slug })));
}

export async function generateMetadata({ params }: { params: { locale: string; city: string } }): Promise<Metadata> {
  if (!isLocale(params.locale)) return {};
  const city = getFocusCity(params.city);
  if (!city) return {};
  const ar = params.locale === "ar";
  return buildMetadata({
    title: ar ? `تأسيس وتشغيل وتقييم المطاعم في ${city.nameAr}` : `Restaurant setup, operations and valuation in ${city.nameEn}`,
    description: ar
      ? `بيت المطاعم يخدم أصحاب المطاعم والمستثمرين في ${city.nameAr}: دراسات جدوى، تقييم مطاعم قبل الشراء أو التقبيل، تشغيل وتطوير، وتسويق.`
      : `Bait Al Mataem serves restaurant owners and investors in ${city.nameEn}: feasibility studies, valuation before purchase or takeover, operations, development and marketing.`,
    locale: params.locale,
    path: `/areas/${city.slug}`,
    keywords: ar ? city.keywordsAr : undefined,
    availableLocales: ["ar", "en"],
  });
}

export default function AreaPage({ params }: { params: { locale: string; city: string } }) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale as Locale;
  const city = getFocusCity(params.city);
  if (!city) notFound();
  const ar = locale === "ar";
  const name = ar ? city.nameAr : city.nameEn;
  const points = ar ? city.pointsAr : city.pointsEn;
  const msg = ar
    ? `مرحبًا، أرغب في الاستفسار عن خدمات بيت المطاعم في ${city.nameAr}`
    : `Hello, I'd like to ask about Bait Al Mataem's services in ${city.nameEn}`;
  const contactHref = (HAS_WHATSAPP && whatsappLink(msg)) || mailtoLink(msg);
  const others = FOCUS_CITIES.filter((c) => c.slug !== city.slug);

  const breadcrumb = breadcrumbJsonLd([
    { name: ar ? "الرئيسية" : "Home", url: `${SITE.url}/${locale}` },
    { name, url: `${SITE.url}/${locale}/areas/${city.slug}` },
  ]);

  return (
    <section className="py-12 sm:py-14">
      <div className="container-page">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
        <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
          <div>
            <p className="eyebrow mb-3">{ar ? "مناطق خدمتنا" : "Where we work"}</p>
            <h1 className="mb-4 text-2xl font-bold leading-tight text-ink-900 sm:text-3xl">
              {ar ? `المطاعم في ${name}: تأسيس وتشغيل وتقييم` : `Restaurants in ${name}: setup, operations and valuation`}
            </h1>
            <p className="mb-6 text-lg leading-8 text-ink-600">{ar ? city.taglineAr : city.taglineEn}</p>
            <GoldDivider className="mb-6" />
            <div className="prose-article">
              <p>{ar ? city.introAr : city.introEn}</p>
              <h2>{ar ? `ماذا نقدم في ${name}` : `What we do in ${name}`}</h2>
              <ul>
                {points.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
              <p>
                {ar
                  ? "كل رقم في دراسة الجدوى أو تقييم الفرصة يُبنى على بيانات فعلية من المشروع نفسه، وأي افتراض نستخدمه نوضحه بشكل منفصل ليتم التحقق منه قبل القرار."
                  : "Every figure in a feasibility study or valuation is built on the project's actual data, and any assumption we use is shown separately so it can be verified before you decide."}
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href={contactHref} variant="primary" target="_blank" arrow>
                {ar ? "تواصل معنا واتساب" : "Message us on WhatsApp"}
              </Button>
              <Button href={`/${locale}/marketplace?city=${encodeURIComponent(city.marketCity)}`} variant="outline">
                {ar ? `فرص المطاعم في ${name}` : `Opportunities in ${name}`}
              </Button>
              <Button href={`/${locale}/marketplace/new`} variant="outline">
                {ar ? "اعرض فرصتك" : "List your opportunity"}
              </Button>
            </div>
          </div>

          <aside className="h-fit lg:sticky lg:top-24">
            <Card className="p-6">
              <h2 className="mb-4 text-sm font-bold text-ink-900">{ar ? "مدن أخرى نخدمها" : "Other cities we serve"}</h2>
              <ul className="space-y-3">
                {others.map((c) => (
                  <li key={c.slug} className="border-b border-sand-100 pb-3 last:border-0 last:pb-0">
                    <Link href={`/${locale}/areas/${c.slug}`} className="focus-ring text-sm font-semibold text-ink-800 hover:text-ember-600">
                      {localize({ ar: c.nameAr, en: c.nameEn }, locale)}
                    </Link>
                  </li>
                ))}
              </ul>
            </Card>
          </aside>
        </div>
      </div>
    </section>
  );
}
