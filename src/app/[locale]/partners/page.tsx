import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { buildMetadata } from "@/lib/seo";
import { Card, SectionHeading } from "@/components/ui";
import { PartnerForm } from "@/components/partner-form";

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  if (!isLocale(params.locale)) return {};
  const dict = await getDictionary(params.locale);
  return buildMetadata({
    title: dict.partners.title,
    description: dict.partners.subtitle,
    locale: params.locale,
    path: "/partners",
  });
}

export default async function PartnersPage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale as Locale;
  const dict = await getDictionary(locale);

  return (
    <section className="py-12 sm:py-16">
      <div className="container-page">
        <SectionHeading title={dict.partners.title} subtitle={dict.partners.subtitle} />

        <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <div className="relative aspect-[4/3] overflow-hidden rounded-cardLg bg-ink-100">
            <Image
              src="/images/editorial/operations-team-lg.webp"
              alt={dict.home.imageAlts.operationsTeam}
              fill
              priority
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover"
              style={{ objectPosition: "center 58%" }}
            />
            <p className="absolute inset-x-3 bottom-3 rounded-btn bg-ink-950/75 px-3 py-2 text-[11px] leading-5 text-white/85 backdrop-blur-sm">{dict.home.team.photoNote}</p>
          </div>
          <div>
            <h2 className="text-xl font-bold text-ink-900">{dict.partners.howTitle}</h2>
            <p className="mt-3 leading-7 text-ink-600">{dict.partners.howText}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {dict.partners.modes.map((mode: string) => (
                <span key={mode} className="rounded-btn border border-sand-200 bg-sand-50 px-3 py-1.5 text-xs font-semibold text-ink-700">{mode}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12">
          <h2 className="mb-5 text-xl font-bold text-ink-900">{dict.partners.rolesTitle}</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {dict.partners.roles.map((role: string) => (
              <Card key={role} className="p-5 text-sm font-semibold text-ink-800">{role}</Card>
            ))}
          </div>
        </div>

        <Card className="mt-12 border-gold-500/30 bg-gold-300/20 p-7 sm:p-9">
          <h2 className="text-xl font-bold text-ink-900">{dict.partners.applyTitle}</h2>
          <p className="mt-3 max-w-3xl leading-7 text-ink-600">{dict.partners.applyText}</p>
          <PartnerForm locale={locale} modes={dict.partners.modes} />
          <p className="mt-4 text-xs leading-6 text-ink-500">{dict.partners.privacyNote}</p>
        </Card>
      </div>
    </section>
  );
}
