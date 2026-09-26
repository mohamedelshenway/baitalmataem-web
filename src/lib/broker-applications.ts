// ثوابت مشتركة بين صفحة تسجيل الوسطاء العامة، والـ API، ولوحة التحكم.
export const BROKER_SPECIALTIES: { value: string; label: string }[] = [
  { value: "restaurant_sale", label: "بيع وتقبيل المطاعم والكافيهات" },
  { value: "commercial_lease", label: "تأجير المحلات والمواقع التجارية" },
  { value: "real_estate_sale", label: "بيع وشراء العقارات" },
  { value: "investors", label: "عندي علاقات مع مستثمرين ومشترين" },
  { value: "food_projects", label: "مشاريع غذائية وتموينية" },
];

export const BROKER_TYPES: { value: string; label: string }[] = [
  { value: "individual", label: "وسيط فرد" },
  { value: "office", label: "مكتب عقاري / شركة وساطة" },
];

export const BROKER_APPLICATION_STATUS: Record<string, string> = {
  new: "جديد",
  contacted: "تم التواصل",
  approved: "معتمد كوسيط",
  rejected: "مرفوض",
};

export function specialtyLabel(value: string): string {
  return BROKER_SPECIALTIES.find((s) => s.value === value)?.label ?? value;
}
