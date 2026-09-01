import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { SITE, whatsappLink, mailtoLink, HAS_WHATSAPP } from "@/lib/constants";
import { Button, GoldDivider } from "@/components/ui";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  if (!isLocale(params.locale)) return {};
  const dict = await getDictionary(params.locale);
  return buildMetadata({
    title: dict.joinUs.pageTitle,
    description: dict.joinUs.pageSubtitle,
    locale: params.locale,
    path: "/join-us",
  });
}

export default async function JoinUsPage({
  params,
}: {
  params: { locale: string };
}) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale as Locale;
  const dict = await getDictionary(locale);

  const breadcrumb = breadcrumbJsonLd([
    { name: dict.nav.home, url: `${SITE.url}/${locale}` },
    { name: dict.joinUs.pageTitle, url: `${SITE.url}/${locale}/join-us` },
  ]);

  const contactHref =
    (HAS_WHATSAPP &&
      whatsappLink(`مرحبًا، أرغب في الاستفسار عن العمل مع بيت المطاعم`)) ||
    mailtoLink(dict.joinUs.pageTitle);

  return (
    <section className="py-12 sm:py-14">
      <div className="container-page max-w-3xl">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
        />
        <p className="eyebrow mb-3">{dict.common.siteName}</p>
        <h1 className="mb-4 text-2xl font-bold leading-tight text-ink-900 sm:text-3xl">
          {dict.joinUs.pageTitle}
        </h1>
        <p className="mb-8 text-lg leading-8 text-ink-600">
          {dict.joinUs.pageSubtitle}
        </p>

        <div className="relative mb-10 aspect-[16/9] overflow-hidden rounded-cardLg bg-ink-100 shadow-card">
          <Image
            src="/images/editorial/management-meeting-lg.webp"
            alt={dict.home.imageAlts.investment}
            fill
            priority
            sizes="(min-width: 768px) 768px, 100vw"
            className="object-cover"
          />
        </div>

        <div className="space-y-4 rounded-cardLg border border-sand-200 bg-white p-6 shadow-subtle sm:p-8">
          <h2 className="text-xl font-bold text-ink-900">
            {dict.joinUs.partTime.title}
          </h2>
          <div className="space-y-4 text-base leading-7 text-ink-700">
            {dict.joinUs.partTime.body.map((p: string, i: number) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          <Button href={contactHref} variant="outline" target="_blank" arrow>
            {dict.joinUs.partTime.cta}
          </Button>
        </div>

        <GoldDivider className="my-10" />

        <div className="space-y-4 rounded-cardLg border border-sand-200 bg-white p-6 shadow-subtle sm:p-8">
          <h2 className="text-xl font-bold text-ink-900">
            {dict.joinUs.referral.title}
          </h2>
          <div className="space-y-4 text-base leading-7 text-ink-700">
            {dict.joinUs.referral.body.map((p: string, i: number) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          <p className="rounded-card border border-gold-500/30 bg-gold-300/25 p-4 text-sm leading-7 text-ink-800">
            {dict.joinUs.referral.note}
          </p>
          <div className="flex flex-wrap gap-3">
            <Button href={`/${locale}/marketplace/new`} variant="primary" arrow>
              {dict.joinUs.referral.cta}
            </Button>
            <Button href={contactHref} variant="outline" target="_blank">
              {dict.nav.contact}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
