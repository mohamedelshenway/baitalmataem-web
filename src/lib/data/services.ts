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
    | "marketing";
  featured: boolean; // يظهر في معاينة الصفحة الرئيسية
}

export const SERVICES: ServiceMeta[] = [
  { slug: "feasibility-study", icon: "feasibility", featured: true },
  { slug: "restaurant-valuation", icon: "valuation", featured: true },
  { slug: "restaurant-brokerage", icon: "brokerage", featured: true },
  { slug: "restaurant-consulting", icon: "consulting", featured: true },
  { slug: "restaurant-setup", icon: "setup", featured: false },
  { slug: "restaurant-operations", icon: "operations", featured: false },
  { slug: "restaurant-development", icon: "development", featured: false },
  { slug: "cost-profitability", icon: "cost", featured: false },
  { slug: "waste-management", icon: "waste", featured: false },
  { slug: "menu-development", icon: "menu", featured: false },
  { slug: "restaurant-marketing", icon: "marketing", featured: false },
];

export function getServiceMeta(slug: string): ServiceMeta | undefined {
  return SERVICES.find((s) => s.slug === slug);
}
