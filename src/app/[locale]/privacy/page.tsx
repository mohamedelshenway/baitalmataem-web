import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { buildMetadata } from "@/lib/seo";
import { Container, GoldDivider } from "@/components/ui";

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  if (!isLocale(params.locale)) return {};
  const dict = await getDictionary(params.locale);
  return buildMetadata({
    title: dict.legal.privacyTitle,
    description: dict.legal.privacyIntro,
    locale: params.locale,
    path: "/privacy",
    noIndex: true,
  });
}

export default async function PrivacyPage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale as Locale;
  const dict = await getDictionary(locale);

  return (
    <section className="py-16">
      <Container className="max-w-3xl">
        <p className="eyebrow mb-3">{dict.common.siteName}</p>
        <h1 className="text-2xl font-bold text-ink-900 sm:text-3xl">{dict.legal.privacyTitle}</h1>
        <GoldDivider className="my-6" />
        <p className="mb-6 rounded-card border border-gold-500/30 bg-gold-300/25 px-4 py-3 text-sm font-medium leading-7 text-ink-800">
          {dict.legal.privacyIntro}
        </p>
        <div className="space-y-5 text-[15px] leading-8 text-ink-700">
          {dict.legal.privacyBody.map((p: string, i: number) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </Container>
    </section>
  );
}
