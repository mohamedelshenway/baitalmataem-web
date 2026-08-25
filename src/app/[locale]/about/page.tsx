import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { buildMetadata } from "@/lib/seo";
import { SITE } from "@/lib/constants";
import { Button, GoldDivider } from "@/components/ui";

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  if (!isLocale(params.locale)) return {};
  const dict = await getDictionary(params.locale);
  return buildMetadata({
    title: dict.about.title,
    description: SITE.tagline[params.locale],
    locale: params.locale,
    path: "/about",
  });
}

export default async function AboutPage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale as Locale;
  const dict = await getDictionary(locale);

  return (
    <section className="py-12 sm:py-14">
      <div className="container-page max-w-3xl">
        <p className="eyebrow mb-3">{dict.common.siteName}</p>
        <h1 className="mb-6 text-2xl font-bold leading-tight text-ink-900 sm:text-3xl">{dict.about.title}</h1>
        <div className="space-y-5 text-lg leading-8 text-ink-700">
          {dict.about.body.map((p: string, i: number) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        <div className="mt-10">
          <Button href={`/${locale}/contact`} variant="primary" arrow>
            {dict.nav.contact}
          </Button>
        </div>

        {/* الإدارة التنفيذية — الشخص الوحيد المذكور بالاسم، بدون فرق وهمية أو صور غير موجودة */}
        <div className="mt-16 border-t border-sand-200 pt-10">
          <p className="eyebrow mb-3">{dict.home.team.execLabel}</p>
          <h2 className="mb-6 text-xl font-bold text-ink-900">{dict.home.team.title}</h2>
          <p className="mb-8 max-w-xl leading-7 text-ink-600">{dict.home.team.text}</p>
          <div className="mb-8 flex flex-wrap gap-2">
            {dict.home.team.areas.map((a: string) => (
              <span key={a} className="rounded-btn border border-sand-200 bg-sand-50 px-3 py-1.5 text-xs font-semibold text-ink-700">
                {a}
              </span>
            ))}
          </div>
          <GoldDivider className="mb-6" />
          <div className="flex items-center gap-4 rounded-card border border-sand-200 bg-white p-5 shadow-subtle">
            <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-gold-500/40 bg-ink-950 text-base font-bold text-gold-400">
              {execInitials(dict.home.team.execName)}
            </span>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wide text-gold-700">{dict.home.team.execLabel}</p>
              <p className="text-lg font-bold text-ink-900">{dict.home.team.execName}</p>
              <p className="text-sm text-ink-600">{dict.home.team.execTitle}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function execInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "";
  const first = parts[0][0] || "";
  const last = parts[parts.length - 1][0] || "";
  return parts.length > 1 ? `${first}.${last}.` : first;
}
