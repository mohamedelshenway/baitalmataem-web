import type { LocalizedText, LocalizedTextList } from "@/lib/types";

// مشاريع تسليم حقيقية نفّذها بيت المطاعم بالتعاون مع شركاء فعليين — لا بيانات تجريبية أو مُختلقة.
// المزيد يُضاف تباعًا كل ما توفّرت تفاصيل مشروع جديد وموافقة على نشره.
export interface DeliveryProject {
  slug: string;
  partnerName: string; // اسم الشريك/العلامة التجارية كما هو، بدون ترجمة
  title: LocalizedText;
  summary: LocalizedText;
  scope: LocalizedTextList; // نطاق دور بيت المطاعم في المشروع
  location: LocalizedText;
  serviceCategory: LocalizedText;
}

export const PROJECTS: DeliveryProject[] = [
  {
    slug: "mzfood-leo-cllores-hajj-umrah-catering",
    partnerName: "MZfood — Leo Cllores",
    title: {
      ar: "تأسيس وتشغيل موقع إعاشة لمعتمري وحجاج روسيا والشيشان بالتعاون مع MZfood",
      en: "Setting Up and Operating a Catering Site for Russian & Chechen Umrah and Hajj Pilgrims with MZfood",
    },
    summary: {
      ar: "بالتعاون مع شركة MZfood العاملة في قطاع الأغذية والمشروبات، وصاحبة سلسلة مطاعم Leo Cllores في الإمارات والسعودية، تولّى بيت المطاعم كاستشاري متكامل تأسيس وتشغيل موقع لتقديم خدمة الإعاشة للمعتمرين وحجاج روسيا والشيشان.",
      en: "In partnership with MZfood — a food & beverage company that operates the Leo Cllores restaurant chain in the UAE and Saudi Arabia — Bait Al Mataem acted as the full consulting partner for setting up and operating a site providing catering (i'ashah) services to Umrah performers and Hajj pilgrims from Russia and Chechnya.",
    },
    scope: {
      ar: [
        "اختيار وتأجير الموقع المناسب لطبيعة الخدمة",
        "تجهيز الموقع تجهيزًا كاملاً للتشغيل",
        "توظيف الفريق التشغيلي اللازم",
        "تنفيذ خطة التسويق المطلوبة للمشروع",
        "متابعة النتائج التشغيلية بشكل مستمر",
      ],
      en: [
        "Selecting and leasing a site suited to the service",
        "Fully equipping the site for operation",
        "Hiring the operating team",
        "Executing the marketing plan the project needed",
        "Ongoing monitoring of operational results",
      ],
    },
    location: { ar: "المملكة العربية السعودية", en: "Saudi Arabia" },
    serviceCategory: {
      ar: "تأسيس وتشغيل مواقع الإعاشة الجماعية",
      en: "Setting up and operating group catering sites",
    },
  },
];
