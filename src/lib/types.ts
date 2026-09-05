// نص متعدد اللغات: العربية والإنجليزية إلزاميتان (كل المحتوى الحالي مُعد بهما)،
// أما التركية والروسية والأردية فاختيارية — إذا لم تُترجم قطعة محتوى معيّنة (مثل فرصة
// أو مقال بعينه) لهذه اللغات، تُستخدم دالة pickText (في src/lib/i18n-text.ts) لعرض
// الإنجليزية كبديل ثم العربية، بدل كسر الصفحة أو إجبارنا على اختلاق ترجمات غير موجودة.
export interface LocalizedText {
  ar: string;
  en: string;
  tr?: string;
  ru?: string;
  ur?: string;
}

export interface LocalizedTextList {
  ar: string[];
  en: string[];
  tr?: string[];
  ru?: string[];
  ur?: string[];
}

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
  title: LocalizedText;
  summary: LocalizedText;
  description: LocalizedText;
  city: LocalizedText;
  area: LocalizedText; // المنطقة/الحي العام فقط، بدون موقع دقيق
  activityType: LocalizedText;
  priceSAR?: number; // سعر البيع/التقبيل التقريبي، اختياري
  rentSAR?: number; // الإيجار الشهري إن وجد
  sizeSqm?: number;
  seatingCapacity?: number;
  openings?: number; // عدد الفتحات
  operatingState: OperatingState;
  equipmentSummary?: LocalizedText;
  kitchenSummary?: LocalizedText;
  parkingAvailable?: boolean;
  features: LocalizedText[];
  media: ListingMedia[];
  isSample: boolean; // true لبيانات العرض التجريبية فقط — false لأي فرصة حقيقية جاية من قاعدة البيانات
  views: number;
  createdAt: string;
}

export interface Service {
  slug: string;
  title: LocalizedText;
  shortDescription: LocalizedText;
  body: LocalizedTextList; // فقرات
  ctaLabel: LocalizedText;
  metaTitle: LocalizedText;
  metaDescription: LocalizedText;
  keywords: string[];
}

export interface BlogPost {
  slug: string;
  title: LocalizedText;
  excerpt: LocalizedText;
  category: LocalizedText;
  tags: string[];
  author: string;
  publishedAt: string;
  readingMinutes: number;
  relatedServiceSlug?: string;
  content: LocalizedText; // Markdown-lite: نص عادي مقسم بأسطر فارغة + عناوين تبدأ بـ ##
}
