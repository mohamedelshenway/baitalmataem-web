import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { locales, isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { SITE, whatsappLink, mailtoLink, HAS_WHATSAPP } from "@/lib/constants";
import { SERVICES, getServiceMeta } from "@/lib/data/services";
import { Button, Card, GoldDivider } from "@/components/ui";

export function generateStaticParams() {
  return locales.flatMap((locale) => SERVICES.map((s) => ({ locale, slug: s.slug })));
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string; slug: string };
}): Promise<Metadata> {
  if (!isLocale(params.locale)) return {};
  const meta = getServiceMeta(params.slug);
  if (!meta) return {};
  const dict = await getDictionary(params.locale);
  const item = dict.services.list[params.slug as keyof typeof dict.services.list];
  if (!item) return {};
  return buildMetadata({
    title: item.title,
    description: item.short,
    locale: params.locale,
    path: `/services/${params.slug}`,
    keywords: item.keywords,
    ogImagePath: meta.image,
  });
}

export default async function ServiceDetailPage({ params }: { params: { locale: string; slug: string } }) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale as Locale;
  const meta = getServiceMeta(params.slug);
  if (!meta) notFound();
  const dict = await getDictionary(locale);
  const item = dict.services.list[params.slug as keyof typeof dict.services.list];
  if (!item) notFound();

  const others = SERVICES.filter((s) => s.slug !== params.slug).slice(0, 3);
  const contactHref: string =
    (HAS_WHATSAPP && whatsappLink(`مرحبًا، أرغب في الاستفسار عن خدمة: ${item.title}`)) || mailtoLink(item.title);

  const breadcrumb = breadcrumbJsonLd([
    { name: dict.nav.home, url: `${SITE.url}/${locale}` },
    { name: dict.nav.services, url: `${SITE.url}/${locale}/services` },
    { name: item.title, url: `${SITE.url}/${locale}/services/${params.slug}` },
  ]);

  return (
    <section className="py-12 sm:py-14">
      <div className="container-page">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
        <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
          <div>
            <p className="eyebrow mb-3">{dict.nav.services}</p>
            <h1 className="mb-4 text-2xl font-bold leading-tight text-ink-900 sm:text-3xl">{item.title}</h1>
            <p className="mb-8 text-lg leading-8 text-ink-600">{item.short}</p>
            <div className="relative mb-8 aspect-[16/9] overflow-hidden rounded-cardLg bg-ink-100 shadow-card">
              <Image
                src={meta.image}
                alt={item.title}
                fill
                priority
                sizes="(min-width: 1024px) 760px, 100vw"
                className="object-cover"
                style={{ objectPosition: meta.imagePosition }}
              />
            </div>
            <GoldDivider className="mb-8" />
            <div className="prose-article">
              {item.body.map((paragraph: string, i: number) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href={contactHref} variant="primary" target="_blank" arrow>
                {dict.services.ctaGeneric}
              </Button>
              <Button href={`/${locale}/marketplace`} variant="outline">
                {dict.nav.marketplace}
              </Button>
            </div>
          </div>

          <aside className="h-fit lg:sticky lg:top-24">
            <Card className="p-6">
              <h2 className="mb-4 text-sm font-bold text-ink-900">{dict.services.relatedTitle}</h2>
              <ul className="space-y-3">
                {others.map((s) => {
                  const relatedItem = dict.services.list[s.slug as keyof typeof dict.services.list];
                  return (
                    <li key={s.slug} className="border-b border-sand-100 pb-3 last:border-0 last:pb-0">
                      <Link
                        href={`/${locale}/services/${s.slug}`}
                        className="cta-arrow focus-ring inline-flex items-center gap-1.5 text-sm font-semibold text-ink-800 hover:text-ember-600"
                      >
                        {relatedItem.title}
                        <span data-arrow aria-hidden>←</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </Card>
          </aside>
        </div>
      </div>
    </section>
  );
}
