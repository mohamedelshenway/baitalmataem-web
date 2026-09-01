import type { Metadata } from "next";
import { SITE, SOCIALS } from "@/lib/constants";
import type { Locale } from "@/i18n/config";
import { locales } from "@/i18n/config";

/**
 * أداة موحّدة لبناء Metadata لكل صفحة: عنوان، وصف، Canonical، hreflang، وOpen Graph.
 * الهدف: كل صفحة تُبنى بنفس الأساس التقني للسيو بدل تكرار الإعداد يدويًا في كل ملف.
 */
export function buildMetadata({
  title,
  description,
  locale,
  path, // المسار بدون بادئة اللغة، مثال: "/services/feasibility-study" أو "/" للرئيسية
  keywords,
  ogImagePath = "/placeholders/og-default.svg",
  noIndex = false,
}: {
  title: string;
  description: string;
  locale: Locale;
  path: string;
  keywords?: string[];
  ogImagePath?: string;
  noIndex?: boolean;
}): Metadata {
  const cleanPath = path === "/" ? "" : path;
  const languages: Record<string, string> = {};
  for (const l of locales) {
    languages[l] = `${SITE.url}/${l}${cleanPath}`;
  }
  languages["x-default"] = `${SITE.url}/${locales[0]}${cleanPath}`;

  const canonical = `${SITE.url}/${locale}${cleanPath}`;
  const fullTitle = path === "/" ? title : `${title} | ${SITE.name.ar} — ${SITE.name.en}`;

  return {
    title: fullTitle,
    description,
    keywords,
    alternates: {
      canonical,
      languages,
    },
    robots: noIndex ? { index: false, follow: false } : { index: true, follow: true },
    openGraph: {
      title: fullTitle,
      description,
      url: canonical,
      siteName: SITE.legalName,
      locale: locale === "ar" ? "ar_SA" : "en_US",
      type: "website",
      images: [{ url: `${SITE.url}${ogImagePath}` }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [`${SITE.url}${ogImagePath}`],
    },
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE.legalName,
    url: SITE.url,
    description: SITE.tagline.ar,
    areaServed: ["Saudi Arabia"],
    // مصدر واحد للحقيقة: نفس الروابط المعتمدة في src/lib/constants.ts، بدل تكرارها هنا يدويًا
    sameAs: [SOCIALS.facebook, SOCIALS.instagram, SOCIALS.youtube, SOCIALS.snapchat, SOCIALS.x],
  };
}

export function breadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function articleJsonLd({
  title,
  description,
  url,
  datePublished,
  author,
}: {
  title: string;
  description: string;
  url: string;
  datePublished: string;
  author: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description,
    url,
    datePublished,
    author: { "@type": "Organization", name: author },
    publisher: { "@type": "Organization", name: SITE.legalName },
  };
}

export function listingJsonLd({
  name,
  description,
  url,
  priceSAR,
  city,
  image,
}: {
  name: string;
  description: string;
  url: string;
  priceSAR?: number;
  city: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name,
    description,
    url,
    image: image ? [image] : undefined,
    brand: { "@type": "Organization", name: SITE.legalName },
    areaServed: city,
    ...(priceSAR
      ? {
          offers: {
            "@type": "Offer",
            priceCurrency: "SAR",
            price: priceSAR,
            availability: "https://schema.org/InStock",
          },
        }
      : {}),
  };
}
