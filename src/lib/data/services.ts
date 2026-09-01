// قائمة الخدمات: المفاتيح هنا يجب أن تطابق حرفيًا مفاتيح services.list في ملفي الترجمة
// src/i18n/dictionaries/ar.json و en.json — المحتوى النصي بالكامل موجود هناك حتى لا يتكرر بمكانين.

export interface ServiceMeta {
  slug: string;
  icon:
    | "setup"
    | "operations"
    | "development"
    | "feasibility"
    | "valuation"
    | "brokerage"
    | "consulting"
    | "cost"
    | "waste"
    | "menu"
    | "marketing"
    | "recruitment";
  featured: boolean; // يظهر في معاينة الصفحة الرئيسية
  image: string;
  imagePosition?: string;
}

export const SERVICES: ServiceMeta[] = [
  { slug: "feasibility-study", icon: "feasibility", featured: true, image: "/images/editorial/feasibility-analysis-lg.webp" },
  { slug: "restaurant-valuation", icon: "valuation", featured: true, image: "/images/editorial/management-meeting-lg.webp" },
  { slug: "restaurant-brokerage", icon: "brokerage", featured: true, image: "/images/editorial/restaurant-interior-lg.webp" },
  { slug: "restaurant-consulting", icon: "consulting", featured: true, image: "/images/editorial/management-meeting-lg.webp" },
  { slug: "restaurant-setup", icon: "setup", featured: false, image: "/images/editorial/restaurant-equipment-lg.webp" },
  { slug: "restaurant-operations", icon: "operations", featured: false, image: "/images/editorial/operations-team-lg.webp", imagePosition: "center 58%" },
  { slug: "restaurant-development", icon: "development", featured: false, image: "/images/editorial/commercial-kitchen-lg.webp" },
  { slug: "cost-profitability", icon: "cost", featured: false, image: "/images/editorial/feasibility-analysis-lg.webp" },
  { slug: "waste-management", icon: "waste", featured: false, image: "/images/editorial/commercial-kitchen-lg.webp" },
  { slug: "menu-development", icon: "menu", featured: false, image: "/images/editorial/catering-service-lg.webp" },
  { slug: "restaurant-marketing", icon: "marketing", featured: false, image: "/images/editorial/restaurant-marketing-lg.webp" },
  { slug: "staff-recruitment", icon: "recruitment", featured: false, image: "/images/editorial/operations-team-lg.webp", imagePosition: "center 58%" },
];

export function getServiceMeta(slug: string): ServiceMeta | undefined {
  return SERVICES.find((s) => s.slug === slug);
}
