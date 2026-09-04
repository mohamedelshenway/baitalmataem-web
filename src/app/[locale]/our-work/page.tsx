import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { SITE } from "@/lib/constants";
import { SERVICES } from "@/lib/data/services";
import { Card, SectionHeading, GoldDivider, Button } from "@/components/ui";
import { Reveal } from "@/components/reveal";

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  if (!isLocale(params.locale)) return {};
  const dict = await getDictionary(params.locale);
  return buildMetadata({
    title: dict.ourWork.title,
    description: dict.ourWork.subtitle,
    locale: params.locale,
    path: "/our-work",
  });
}

export default async function OurWorkPage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale as Locale;
  const dict = await getDictionary(locale);
  const { ourWork } = dict;

  const breadcrumb = breadcrumbJsonLd([
    { name: dict.nav.home, url: `${SITE.url}/${locale}` },
    { name: dict.nav.ourWork, url: `${SITE.url}/${locale}/our-work` },
  ]);

  return (
    <section className="py-12 sm:py-14">
      <div className="container-page">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />

        <div className="max-w-3xl">
          <p className="eyebrow mb-3">{ourWork.kicker}</p>
          <h1 className="mb-4 text-2xl font-bold leading-tight text-ink-900 sm:text-3xl">{ourWork.title}</h1>
          <p className="text-lg leading-8 text-ink-600">{ourWork.subtitle}</p>
        </div>

        {/* من نحن */}
        <div className="mt-12 max-w-3xl">
          <h2 className="mb-5 text-xl font-bold text-ink-900">{ourWork.whoTitle}</h2>
          <div className="space-y-4 leading-8 text-ink-700">
            {ourWork.whoBody.map((p: string, i: number) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          <div className="mt-6">
            <Button href={`/${locale}/about`} variant="outline" arrow>
              {dict.nav.about}
            </Button>
          </div>
        </div>

        <GoldDivider className="my-14" />

        {/* ماذا نقدّم */}
        <SectionHeading title={ourWork.whatTitle} subtitle={ourWork.whatSubtitle} />
        <div className="grid gap-5 lg:grid-cols-3">
          {ourWork.pillars.map((pillar, i) => (
            <Reveal key={pillar.title} delay={i * 80}>
              <Card className="flex h-full flex-col p-6">
                <span className="mb-4 flex h-9 w-9 items-center justify-center rounded-btn bg-gold-500/15 text-sm font-bold text-gold-700">
                  {i + 1}
                </span>
                <h3 className="mb-2 text-lg font-bold text-ink-900">{pillar.title}</h3>
                <p className="mb-5 flex-1 text-sm leading-7 text-ink-600">{pillar.text}</p>
                <GoldDivider className="mb-4" />
                <ul className="flex flex-col gap-2">
                  {pillar.services.map((slug) => {
                    const item = dict.services.list[slug as keyof typeof dict.services.list];
                    if (!item) return null;
                    return (
                      <li key={slug}>
                        <Link
                          href={`/${locale}/services/${slug}`}
                          className="focus-ring inline-flex items-center gap-1.5 text-sm font-semibold text-ember-600 hover:text-ember-700"
                        >
                          {item.title}
                          <span aria-hidden>←</span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </Card>
            </Reveal>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Button href={`/${locale}/services`} variant="outline" arrow>
            {dict.common.viewAll}
          </Button>
        </div>

        {/* دعوة للتواصل */}
        <div className="mt-16">
          <Card className="flex flex-col items-start justify-between gap-5 p-6 sm:flex-row sm:items-center sm:p-8">
            <div>
              <h2 className="text-lg font-bold text-ink-900">{ourWork.ctaTitle}</h2>
              <p className="mt-1 text-sm leading-7 text-ink-600">{ourWork.ctaText}</p>
            </div>
            <Button href={`/${locale}/contact`} variant="primary" arrow className="shrink-0">
              {dict.nav.consultCta}
            </Button>
          </Card>
        </div>
      </div>
    </section>
  );
}

// أنواع pillars/services موجودة ضمن نوع Dictionary المستنتج تلقائيًا من ملفات JSON، لا حاجة لتعريفها هنا يدويًا.
