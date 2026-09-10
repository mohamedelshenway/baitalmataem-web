import type { Metadata } from "next";
import { SITE, SOCIALS, WHATSAPP_NUMBER, HAS_WHATSAPP } from "@/lib/constants";
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
  // صيغة PNG وليست SVG عمدًا — منصات المشاركة الاجتماعية (X وواتساب ولينكدإن) غالبًا
  // لا تعرض صور OG بصيغة SVG بشكل صحيح، فكانت معاينة روابط الموقع بتطلع بلا صورة
  ogImagePath = "/placeholders/og-default.png",
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
    // شعار حقيقي مأخوذ من نفس رمز الهوية البصرية المستخدم في الهيدر (BrandMark)، مُصدَّر PNG
    // لأن جوجل لا يقبل صيغة SVG في حقل logo ضمن بيانات Organization المنظّمة
    logo: `${SITE.url}/images/logo-512.png`,
    description: SITE.tagline.ar,
    // رقم واتساب بيت المطاعم الرسمي المعتمد (نفس المصدر في src/lib/constants.ts)
    ...(HAS_WHATSAPP ? { telephone: `+${WHATSAPP_NUMBER}` } : {}),
    // مدينتا التركيز الفعليتان حاليًا (نفس مصدر SITE.focusCities)، مع إبقاء السعودية ككل كنطاق أعم
    // لأن النشاط قابل للتوسع لمدن أخرى لاحقًا
    areaServed: [
      ...SITE.focusCities.en.map((city) => ({ "@type": "City", name: city })),
      { "@type": "Country", name: "Saudi Arabia" },
    ],
    // مصدر واحد للحقيقة: نفس الروابط المعتمدة في src/lib/constants.ts، بدل تكرارها هنا يدويًا
    sameAs: [SOCIALS.facebook, SOCIALS.instagram, SOCIALS.tiktok, SOCIALS.youtube, SOCIALS.snapchat, SOCIALS.x],
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
    // Brand لازم يكون @type: "Brand" مش "Organization" — ده اللي كانت Google Search Console
    // بترصده كـ"نوع كائن غير صالح" في حقل brand لبيانات المنتج المنظّمة.
    brand: { "@type": "Brand", name: SITE.legalName },
    areaServed: city,
    ...(priceSAR
      ? {
          offers: {
            "@type": "Offer",
            priceCurrency: "SAR",
            price: priceSAR,
            availability: "https://schema.org/InStock",
            // فرص السوق عندنا (مطاعم للبيع أو التقبيل) مش منتجات بتتشحن — التسليم استلام محلي
            // في السعودية فقط، فبنوضّح كده صراحة بدل ما نسيب الحقل فاضي (كان بيتسجّل كتحذير غير ملحّ
            // في Google Search Console: "shippingDetails" مفقود من "offers").
            shippingDetails: {
              "@type": "OfferShippingDetails",
              shippingRate: {
                "@type": "MonetaryAmount",
                value: "0",
                currency: "SAR",
              },
              shippingDestination: {
                "@type": "DefinedRegion",
                addressCountry: "SA",
              },
              deliveryTime: {
                "@type": "ShippingDeliveryTime",
                handlingTime: {
                  "@type": "QuantitativeValue",
                  minValue: 0,
                  maxValue: 0,
                  unitCode: "DAY",
                },
              },
            },
            // بيع أو تقبيل مطعم عملية نهائية بعد التعاقد — مفيش "استرجاع" بالمعنى التجاري المعتاد،
            // فبنصرّح بده صراحة بدل ما يفضل الحقل ناقص (تحذير غير ملحّ تاني من Search Console:
            // "hasMerchantReturnPolicy" مفقود من "offers").
            hasMerchantReturnPolicy: {
              "@type": "MerchantReturnPolicy",
              applicableCountry: "SA",
              returnPolicyCategory: "https://schema.org/MerchantReturnNotPermitted",
            },
          },
        }
      : {}),
  };
}
