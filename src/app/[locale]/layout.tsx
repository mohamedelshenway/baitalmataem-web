import type { Metadata } from "next";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { IBM_Plex_Sans_Arabic, IBM_Plex_Sans } from "next/font/google";
import { locales, localeMeta, isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { LanguageBanner } from "@/components/language-banner";
import { SITE } from "@/lib/constants";
import { organizationJsonLd } from "@/lib/seo";
import { pickText } from "@/lib/i18n-text";
import "../globals.css";

// هذا هو الـ Root Layout الفعلي للموقع (يحتوي html/body) — لا يوجد app/layout.tsx منفصل
// لأن بنية اللغة [locale] هي الجذر نفسه، وهذا هو النمط المعتمد للـ i18n بدون مكتبات خارجية.

// IBM Plex Sans Arabic + شقيقتها اللاتينية IBM Plex Sans — عائلة خط واحدة مصممة معًا أصلًا،
// تُحمَّل ذاتيًا عبر next/font/google (بدون طلبات خارجية وقت التشغيل، وبدون Layout Shift).
const plexArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-arabic",
  display: "swap",
});
// latin-ext يغطي حروف التركية الإضافية (ç ş ğ ı İ ö ü)، وcyrillic يغطي الروسية —
// أُضيفا هنا مع إضافة لغتي التركية والروسية للموقع.
const plexLatin = IBM_Plex_Sans({
  subsets: ["latin", "latin-ext", "cyrillic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-latin",
  display: "swap",
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  if (!isLocale(params.locale)) return {};
  const dict = await getDictionary(params.locale);
  return {
    metadataBase: new URL(SITE.url),
    title: { default: SITE.legalName, template: `%s | ${SITE.name.ar}` },
    description: pickText(SITE.tagline, params.locale),
    icons: { icon: "/favicon.svg" },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { locale: string };
}) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale as Locale;
  const dict = await getDictionary(locale);
  const meta = localeMeta[locale];

  return (
    <html lang={meta.htmlLang} dir={meta.dir} className={`${plexArabic.variable} ${plexLatin.variable}`}>
      <body>
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd()) }}
        />
        <LanguageBanner
          locale={locale}
          message={dict.languageBanner.message}
          switchLabel={dict.languageBanner.switch}
          stayLabel={dict.languageBanner.stay}
        />
        <SiteHeader dict={dict} locale={locale} />
        <main>{children}</main>
        <SiteFooter dict={dict} locale={locale} />
      </body>
    </html>
  );
}
