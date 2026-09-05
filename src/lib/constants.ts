export const SITE = {
  name: { ar: "بيت المطاعم", en: "Bait Al Mataem" },
  legalName: "بيت المطاعم | Bait Al Mataem",
  domain: "baitalmataem.com",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://baitalmataem.com",
  tagline: {
    ar: "منصة سعودية متخصصة في تأسيس وتشغيل وتطوير وتقييم وبيع وشراء المطاعم",
    en: "A specialized Saudi platform for restaurant setup, operations, feasibility, and brokerage",
    tr: "Restoran kuruluşu, işletmesi, geliştirilmesi, değerlemesi ile alım satımında uzman bir Suudi platformu",
    ru: "Саудовская платформа, специализирующаяся на открытии, управлении, развитии, оценке и купле-продаже ресторанов",
    ur: "ریستوران کے قیام، آپریشن، ترقی، تشخیص اور خرید و فروخت میں مہارت رکھنے والا سعودی پلیٹ فارم",
  },
  // مبني في المرحلة الحالية على جدة ومكة المكرمة، قابل للتوسع لاحقًا
  focusCities: { ar: ["جدة", "مكة المكرمة"], en: ["Jeddah", "Makkah"] },
};

// حسابات بيت المطاعم الرقمية الرسمية المعتمدة — لا تُستبدل إلا بتأكيد صريح من محمد الشناوي
export const SOCIALS = {
  facebook: "https://www.facebook.com/baitalmataem", // بحاجة لتأكيد الرابط المباشر
  instagram: "https://instagram.com/baitalmataem",
  youtube: "https://youtube.com/@baitalmataem", // بحاجة لتأكيد الرابط المباشر
  snapchat: "https://www.snapchat.com/add/baitalmataem",
  x: "https://x.com/baitalmataem",
  email: "baitalmataem@gmail.com",
};

// رقم واتساب بيت المطاعم الرسمي: 966552396676 (ثابت كقيمة افتراضية، ويمكن تجاوزه عبر متغير البيئة NEXT_PUBLIC_WHATSAPP_NUMBER عند الحاجة)
export const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "966552396676";
export const HAS_WHATSAPP = Boolean(WHATSAPP_NUMBER);

export function whatsappLink(message: string) {
  if (!WHATSAPP_NUMBER) return null;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function mailtoLink(subject: string) {
  return `mailto:${SOCIALS.email}?subject=${encodeURIComponent(subject)}`;
}
