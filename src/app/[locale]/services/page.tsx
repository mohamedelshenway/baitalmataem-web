import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { SITE } from "@/lib/constants";
import { SERVICES } from "@/lib/data/services";
import { Card, SectionHeading, GoldDivider } from "@/components/ui";
import { Reveal } from "@/components/reveal";

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  if (!isLocale(params.locale)) return {};
  const dict = await getDictionary(params.locale);
  return buildMetadata({
    title: dict.services.pageTitle,
    description: dict.services.pageSubtitle,
    locale: params.locale,
    path: "/services",
  });
}

export default async function ServicesPage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale as Locale;
  const dict = await getDictionary(locale);

  const breadcrumb = breadcrumbJsonLd([
    { name: dict.nav.home, url: `${SITE.url}/${locale}` },
    { name: dict.nav.services, url: `${SITE.url}/${locale}/services` },
  ]);

  return (
    <section className="py-12 sm:py-14">
      <div className="container-page">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
        <SectionHeading title={dict.services.pageTitle} subtitle={dict.services.pageSubtitle} />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, i) => {
            const item = dict.services.list[s.slug as keyof typeof dict.services.list];
            return (
              <Reveal key={s.slug} delay={(i % 3) * 60}>
                <Card className="flex h-full flex-col overflow-hidden p-0">
                  <div className="img-zoom relative aspect-[16/10] w-full bg-ink-100">
                    <Image
                      src={s.image}
                      alt={item.title}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover"
                      style={{ objectPosition: s.imagePosition }}
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <h2 className="mb-2 text-lg font-bold text-ink-900">{item.title}</h2>
                    <p className="mb-5 flex-1 text-sm leading-7 text-ink-600">{item.short}</p>
                    <GoldDivider className="mb-4" />
                    <Link
                      href={`/${locale}/services/${s.slug}`}
                      className="cta-arrow focus-ring inline-flex items-center gap-1.5 text-sm font-semibold text-ember-600"
                    >
                      {dict.common.learnMore}
                      <span data-arrow aria-hidden>←</span>
                    </Link>
                  </div>
                </Card>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
