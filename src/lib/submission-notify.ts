// أدوات إشعار أصحاب الفرص المرسلة عبر "اعرض فرصتك" (واتساب)

export type SubmissionStatus = "new" | "approved" | "changes_requested" | "rejected";

/** يحوّل أي رقم سعودي (05xxxxxxxx / 5xxxxxxxx / +966... / 00966...) لصيغة wa.me */
export function toWhatsAppNumber(phone: string | null | undefined): string {
  let d = (phone ?? "").replace(/\D/g, "");
  if (!d) return "";
  if (d.startsWith("00")) d = d.slice(2);
  if (d.startsWith("966")) return d;
  if (d.startsWith("0")) d = d.slice(1);
  return `966${d}`;
}

export function buildNotifyMessage(opts: {
  status: SubmissionStatus;
  name?: string | null;
  opportunity?: string | null;
  adminNote?: string | null;
}): string {
  const name = opts.name?.trim() || "";
  const hello = name ? `السلام عليكم ${name}،` : "السلام عليكم،";
  const what = opts.opportunity ? ` (${opts.opportunity})` : "";
  switch (opts.status) {
    case "approved":
      return `${hello}\nمعك فريق بيت المطاعم. يسعدنا إبلاغك بقبول طلب عرض فرصتك${what} لدينا، وجارٍ تجهيزها للنشر على المنصة. سنتواصل معك لاستكمال التفاصيل. شكرًا لثقتك بنا.`;
    case "changes_requested":
      return `${hello}\nمعك فريق بيت المطاعم. راجعنا طلب عرض فرصتك${what} ونحتاج بعض التعديلات قبل القبول${opts.adminNote ? `:\n${opts.adminNote}` : "."}\nبعد التعديل نكمل الإجراءات مباشرة. شكرًا لك.`;
    case "rejected":
      return `${hello}\nمعك فريق بيت المطاعم. نشكرك على عرض فرصتك${what} لدينا. بعد المراجعة لا نستطيع نشرها حاليًا، ويسعدنا تواصلك معنا مستقبلًا بأي فرصة أخرى.`;
    default:
      return `${hello}\nمعك فريق بيت المطاعم. وصلنا طلب عرض فرصتك${what} وهو قيد المراجعة، وسنوافيك بالنتيجة قريبًا.`;
  }
}

export function whatsAppUrl(phone: string | null | undefined, message: string): string {
  const n = toWhatsAppNumber(phone);
  return n ? `https://wa.me/${n}?text=${encodeURIComponent(message)}` : "";
}
