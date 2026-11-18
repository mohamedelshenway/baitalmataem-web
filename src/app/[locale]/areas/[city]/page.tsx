import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { locales, isLocale, localize, type Locale } from "@/i18n/config";
import { buildMetadata, breadcrumbJsonLd, faqJsonLd, serviceJsonLd } from "@/lib/seo";
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

  const faqs = ar
    ? [
        { q: `ما الخدمات التي يقدمها بيت المطاعم في ${name}؟`, a: `نقدم في ${name} تأسيس المطاعم، ودراسات الجدوى، وتقييم المطاعم قبل الشراء أو التقبيل، وتشغيل المطاعم وتطويرها، وضبط التكاليف، وتسويق المطاعم والفرص الاستثمارية.` },
        { q: `هل يمكن تقييم مطعم قائم في ${name} قبل شرائه أو تقبيله؟`, a: "نعم. نحلل المبيعات والتكاليف والإيجار ومدة العقد والالتزامات والمعدات بالأرقام الفعلية، وليس بكلام البائع وحده، ونفصل المبيعات الموسمية عن غيرها عند الحاجة." },
        { q: `كيف أعرض مطعمي أو محلي للبيع أو التقبيل في ${name}؟`, a: "من صفحة «اعرض فرصتك» في الموقع أو عبر واتساب. نراجع الطلب ونتواصل معك لاستكمال البيانات قبل نشر الفرصة." },
        { q: "هل تضمنون أرباحًا أو نتائج محددة؟", a: "لا. نقدم تحليلًا مبنيًا على الأرقام وتوصية مهنية واضحة، وأي توقعات تُعرض كتقديرات وافتراضات تحتاج تحققًا وليست نتائج مضمونة." },
      ]
    : [
        { q: `What services does Bait Al Mataem offer in ${name}?`, a: `In ${name} we offer restaurant setup, feasibility studies, valuation before purchase or takeover, restaurant operations and development, cost control, and marketing for restaurants and investment opportunities.` },
        { q: `Can an existing restaurant in ${name} be valued before buying or taking it over?`, a: "Yes. We analyze sales, costs, rent, lease term, liabilities and equipment using actual figures rather than the seller's claims alone, and separate seasonal sales where relevant." },
        { q: `How do I list my restaurant or unit for sale or takeover in ${name}?`, a: "Use the “List your opportunity” page on the website or message us on WhatsApp. We review the request and contact you to complete the details before publishing." },
        { q: "Do you guarantee profits or specific results?", a: "No. We provide number-based analysis and a clear professional recommendation; any projections are presented as estimates and assumptions to verify, not guaranteed results." },
      ];
  const service = serviceJsonLd({
    name: ar ? `خدمات المطاعم في ${name}` : `Restaurant services in ${name}`,
    description: ar ? city.introAr : city.introEn,
    url: `${SITE.url}/${locale}/areas/${city.slug}`,
    serviceType: ar
      ? ["تأسيس المطاعم", "دراسات الجدوى", "تقييم المطاعم", "تشغيل وتطوير المطاعم", "الوساطة في بيع وتقبيل المطاعم"]
      : ["Restaurant setup", "Feasibility studies", "Restaurant valuation", "Restaurant operations and development", "Restaurant brokerage"],
  });

  return (
    <section className="py-12 sm:py-14">
      <div className="container-page">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(service) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(faqs)) }} />
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
            <h2 className="mt-10 text-xl font-bold text-ink-900">{ar ? "أسئلة شائعة" : "Frequently asked questions"}</h2>
            <div className="mt-4 space-y-3">
              {faqs.map((f) => (
                <details key={f.q} className="rounded-card border border-sand-200 bg-white px-4 py-3">
                  <summary className="cursor-pointer text-sm font-semibold text-ink-900">{f.q}</summary>
                  <p className="mt-2 text-sm leading-7 text-ink-600">{f.a}</p>
                </details>
              ))}
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
