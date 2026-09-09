import type { LocalizedText } from "@/lib/types";

// نطاق خبرة بيت المطاعم كما هو معروض فعليًا في صفحة الخدمات (src/lib/data/services.ts) —
// مجرد إعادة تجميع لنفس الخدمات الحقيقية تحت محاور عامة، بدون أي أرقام أو ادعاءات غير مؤكدة.
export interface ExpertiseArea {
  title: LocalizedText;
  description: LocalizedText;
}

export const EXPERTISE_AREAS: ExpertiseArea[] = [
  {
    title: { ar: "التأسيس ودراسات الجدوى", en: "Setup & Feasibility Studies" },
    description: {
      ar: "دراسة الجدوى الاستثمارية والتشغيلية، واختيار الموقع، والتجهيز الكامل لبدء التشغيل.",
      en: "Investment and operational feasibility studies, site selection, and full setup for launch.",
    },
  },
  {
    title: { ar: "التشغيل والتطوير", en: "Operations & Development" },
    description: {
      ar: "أنظمة تشغيل واضحة، وخطط تطوير قابلة للقياس، وضبط التكاليف والهدر وتطوير المنيو.",
      en: "Clear operating systems, measurable development plans, cost and waste control, and menu development.",
    },
  },
  {
    title: { ar: "الاستثمار والتقييم والوساطة", en: "Investment, Valuation & Brokerage" },
    description: {
      ar: "تقييم المطاعم قبل الشراء أو الاستثمار، وإدارة عمليات البيع والشراء والتقبيل.",
      en: "Restaurant valuation before purchase or investment, and managing sale, purchase, and takeover deals.",
    },
  },
  {
    title: { ar: "التسويق والموارد البشرية", en: "Marketing & HR" },
    description: {
      ar: "التسويق الإلكتروني للمطاعم، وخدمات التوظيف واختيار فريق العمل المناسب.",
      en: "Digital marketing for restaurants, and recruitment services to select the right team.",
    },
  },
  {
    title: { ar: "الاستشارات المتكاملة", en: "Integrated Consulting" },
    description: {
      ar: "استشارات مرنة لأصحاب المطاعم والمستثمرين في أي قرار تشغيلي أو استثماري.",
      en: "Flexible consulting for restaurant owners and investors on any operational or investment decision.",
    },
  },
];
