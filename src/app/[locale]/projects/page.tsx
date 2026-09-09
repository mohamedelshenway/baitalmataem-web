import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { SITE } from "@/lib/constants";
import { PROJECTS } from "@/lib/data/projects";
import { Card, Badge, GoldDivider, Button } from "@/components/ui";
import { Reveal } from "@/components/reveal";
import { pickText, pickTextList } from "@/lib/i18n-text";

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  if (!isLocale(params.locale)) return {};
  const dict = await getDictionary(params.locale);
  return buildMetadata({
    title: dict.projects.pageTitle,
    description: dict.projects.pageSubtitle,
    locale: params.locale,
    path: "/projects",
  });
}

export default async function ProjectsPage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale as Locale;
  const dict = await getDictionary(locale);

  const breadcrumb = breadcrumbJsonLd([
    { name: dict.nav.home, url: `${SITE.url}/${locale}` },
    { name: dict.nav.projects, url: `${SITE.url}/${locale}/projects` },
  ]);

  return (
    <section className="py-12 sm:py-14">
      <div className="container-page">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />

        <p className="eyebrow mb-3">{dict.common.siteName}</p>
        <h1 className="mb-3 text-2xl font-bold leading-tight text-ink-900 sm:text-3xl">{dict.projects.pageTitle}</h1>
        <p className="mb-10 max-w-2xl leading-7 text-ink-600">{dict.projects.pageSubtitle}</p>

        <div className="flex flex-col gap-6">
          {PROJECTS.map((project, i) => (
            <Reveal key={project.slug} delay={i * 80}>
              <Card className="p-6 sm:p-8">
                <div className="mb-4 flex flex-wrap items-center gap-2">
                  <Badge tone="gold">{pickText(project.serviceCategory, locale)}</Badge>
                  <Badge tone="sand">{pickText(project.location, locale)}</Badge>
                </div>

                <h2 className="mb-3 text-xl font-bold leading-tight text-ink-900">{pickText(project.title, locale)}</h2>

                <p className="mb-2 text-sm font-semibold text-ember-600">
                  {dict.projects.partnerLabel}: <span className="text-ink-800">{project.partnerName}</span>
                </p>

                <p className="mb-6 leading-7 text-ink-600">{pickText(project.summary, locale)}</p>

                <GoldDivider className="mb-5" />

                <h3 className="mb-3 text-sm font-bold text-ink-900">{dict.projects.scopeTitle}</h3>
                <ul className="grid gap-2.5 sm:grid-cols-2">
                  {pickTextList(project.scope, locale).map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm leading-6 text-ink-700">
                      <span className="mt-0.5 text-gold-600" aria-hidden>
                        ✓
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </Reveal>
          ))}
        </div>

        <div className="mt-14">
          <Card className="flex flex-col items-start justify-between gap-5 p-6 sm:flex-row sm:items-center sm:p-8">
            <div>
              <h2 className="text-lg font-bold text-ink-900">{dict.projects.ctaTitle}</h2>
              <p className="mt-1 text-sm leading-7 text-ink-600">{dict.projects.ctaText}</p>
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
