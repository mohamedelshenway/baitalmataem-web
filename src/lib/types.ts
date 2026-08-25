export type ListingKind =
  | "restaurant_taqbeel" // مطعم للتقبيل
  | "restaurant_sale" // مطعم للبيع
  | "lease_unit" // محل / موقع للإيجار
  | "investment_opportunity" // فرصة استثمارية
  | "seeking_investor" // مطعم يبحث عن مستثمر
  | "operating_partner_needed" // مشروع يحتاج شريك تشغيل
  | "site_for_restaurant"; // موقع مناسب لنشاط مطاعم

export type ListingStatus =
  | "available" // متاح
  | "negotiating" // تحت التفاوض
  | "reserved" // محجوز
  | "closed" // تمت الصفقة
  | "unavailable"; // غير متاح

export type ModerationStatus = "pending" | "approved" | "changes_requested" | "rejected";

export type OperatingState = "operating" | "closed_temporarily" | "closed_permanently" | "not_applicable";

export interface ListingMedia {
  id: string;
  type: "image" | "video";
  url: string; // مسار محلي لصورة Placeholder أو رابط فعلي لاحقًا
  alt: string;
  isCover?: boolean;
  durationSeconds?: number; // للفيديو فقط، الحد الأقصى 30
}

export interface Listing {
  slug: string;
  kind: ListingKind;
  status: ListingStatus;
  moderation: ModerationStatus;
  title: { ar: string; en: string };
  summary: { ar: string; en: string };
  description: { ar: string; en: string };
  city: { ar: string; en: string };
  area: { ar: string; en: string }; // المنطقة/الحي العام فقط، بدون موقع دقيق
  activityType: { ar: string; en: string };
  priceSAR?: number; // سعر البيع/التقبيل التقريبي، اختياري
  rentSAR?: number; // الإيجار الشهري إن وجد
  sizeSqm?: number;
  seatingCapacity?: number;
  openings?: number; // عدد الفتحات
  operatingState: OperatingState;
  equipmentSummary?: { ar: string; en: string };
  kitchenSummary?: { ar: string; en: string };
  parkingAvailable?: boolean;
  features: { ar: string; en: string }[];
  media: ListingMedia[];
  isSample: true; // كل بيانات المرحلة الحالية تجريبية بوضوح — لا بيانات حقيقية بعد
  views: number;
  createdAt: string;
}

export interface Service {
  slug: string;
  title: { ar: string; en: string };
  shortDescription: { ar: string; en: string };
  body: { ar: string[]; en: string[] }; // فقرات
  ctaLabel: { ar: string; en: string };
  metaTitle: { ar: string; en: string };
  metaDescription: { ar: string; en: string };
  keywords: string[];
}

export interface BlogPost {
  slug: string;
  title: { ar: string; en: string };
  excerpt: { ar: string; en: string };
  category: { ar: string; en: string };
  tags: string[];
  author: string;
  publishedAt: string;
  readingMinutes: number;
  relatedServiceSlug?: string;
  content: { ar: string; en: string }; // Markdown-lite: نص عادي مقسم بأسطر فارغة + عناوين تبدأ بـ ##
}
