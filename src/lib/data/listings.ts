import type { Listing } from "@/lib/types";

// تنبيه مهم: كل الفرص أدناه بيانات تجريبية (isSample: true) لأغراض عرض التصميم والوظائف فقط.
// لا تمثل مطاعم أو عقارات أو مستثمرين حقيقيين، ويجب استبدالها ببيانات حقيقية بعد ربط قاعدة البيانات
// ودخول أول الفرص الفعلية عبر نموذج "اعرض فرصتك" وموافقة الإدارة عليها.
// ممنوع استبدال هذه الرسومات بصور ستوك؛ صور الفرص المنشورة تأتي حصريًا من صاحب الإعلان.

function img(n: number, alt: string): Listing["media"][number] {
  return { id: `img-${n}`, type: "image", url: `/placeholders/listing-${n}.svg`, alt, isCover: false };
}

export const LISTINGS: Listing[] = [
  {
    slug: "sample-restaurant-taqbeel-jeddah-01",
    kind: "restaurant_taqbeel",
    status: "available",
    moderation: "approved",
    title: { ar: "[مثال] مطعم مأكولات بحرية للتقبيل — حي تجريبي بجدة", en: "[Sample] Seafood restaurant for takeover — sample district, Jeddah" },
    summary: {
      ar: "مطعم مأكولات بحرية يعمل حاليًا، تجهيزات كاملة، فرصة تقبيل بموقع تجاري نشط. بيانات تجريبية للعرض فقط.",
      en: "An operating seafood restaurant with full fit-out, a takeover opportunity on an active commercial street. Sample data for preview only.",
    },
    description: {
      ar: "فرصة تقبيل مطعم مأكولات بحرية يعمل حاليًا بشكل يومي، ضمن موقع تجاري نشط في جدة. هذا نص تجريبي يوضح شكل الوصف الكامل الذي سيظهر لكل فرصة حقيقية بعد جمع البيانات والتحقق منها، بما يشمل تاريخ التشغيل وسبب التقبيل وحالة العقد.",
      en: "A takeover opportunity for a seafood restaurant currently operating daily on an active commercial street in Jeddah. This is sample copy illustrating the full description format that will appear for each real, verified listing, including operating history, reason for takeover, and lease status.",
    },
    city: { ar: "جدة", en: "Jeddah" },
    area: { ar: "حي تجريبي — شمال جدة", en: "Sample district — North Jeddah" },
    activityType: { ar: "مأكولات بحرية", en: "Seafood" },
    priceSAR: 450000,
    rentSAR: 18000,
    sizeSqm: 220,
    seatingCapacity: 60,
    openings: 2,
    operatingState: "operating",
    equipmentSummary: { ar: "مطبخ مجهز بالكامل، ثلاجات ومجمدات تجارية، هود مركزي", en: "Fully equipped kitchen, commercial fridges/freezers, central hood" },
    kitchenSummary: { ar: "مطبخ إنتاج كامل مع منطقة تحضير منفصلة", en: "Full production kitchen with a separate prep area" },
    parkingAvailable: true,
    features: [
      { ar: "موقع بواجهة تجارية مباشرة", en: "Direct commercial frontage" },
      { ar: "عقد إيجار ساري لمدة تتجاوز عامين", en: "Lease with over two years remaining" },
      { ar: "قاعدة عملاء قائمة على تطبيقات التوصيل", en: "Existing delivery-app customer base" },
    ],
    media: [img(1, "صورة تجريبية لواجهة المطعم"), img(2, "صورة تجريبية للصالة الداخلية"), img(3, "صورة تجريبية للمطبخ")],
    isSample: true,
    views: 128,
    createdAt: "2026-08-10",
  },
  {
    slug: "sample-restaurant-sale-makkah-01",
    kind: "restaurant_sale",
    status: "negotiating",
    moderation: "approved",
    title: { ar: "[مثال] مطعم مشويات للبيع — حي تجريبي بمكة المكرمة", en: "[Sample] Grill restaurant for sale — sample district, Makkah" },
    summary: {
      ar: "مشروع مشويات قائم، فرصة بيع كاملة تشمل المعدات والديكور. بيانات تجريبية للعرض فقط.",
      en: "An operating grill restaurant, a full sale including equipment and fit-out. Sample data for preview only.",
    },
    description: {
      ar: "نص وصف تجريبي لفرصة بيع مطعم مشويات قائم في مكة المكرمة، يوضح طريقة عرض تفاصيل النشاط والمعدات والديكور والوضع التشغيلي الحالي بعد التحقق من البيانات الفعلية.",
      en: "Sample description text for an operating grill restaurant for sale in Makkah, illustrating how activity, equipment, fit-out and current operating status will be presented once real data is verified.",
    },
    city: { ar: "مكة المكرمة", en: "Makkah" },
    area: { ar: "حي تجريبي — العزيزية", en: "Sample district — Al Aziziyah" },
    activityType: { ar: "مشويات", en: "Grill" },
    priceSAR: 620000,
    rentSAR: 24000,
    sizeSqm: 300,
    seatingCapacity: 90,
    openings: 3,
    operatingState: "operating",
    equipmentSummary: { ar: "فرن مشويات تجاري، شواية فحم، ثلاجات عرض", en: "Commercial grill oven, charcoal grill, display fridges" },
    kitchenSummary: { ar: "مطبخ إنتاج ومنطقة شواء منفصلة", en: "Production kitchen with a separate grilling area" },
    parkingAvailable: true,
    features: [
      { ar: "قريب من مسار حركة مشاة كثيفة", en: "Near a high foot-traffic route" },
      { ar: "ديكور حديث تم تجديده خلال العامين الماضيين", en: "Modern fit-out renovated within the last two years" },
    ],
    media: [img(4, "صورة تجريبية لواجهة المطعم"), img(1, "صورة تجريبية للصالة")],
    isSample: true,
    views: 94,
    createdAt: "2026-08-05",
  },
  {
    slug: "sample-lease-unit-jeddah-01",
    kind: "lease_unit",
    status: "available",
    moderation: "approved",
    title: { ar: "[مثال] محل تجاري للإيجار يصلح لنشاط مطاعم — جدة", en: "[Sample] Commercial unit for lease, suited to F&B — Jeddah" },
    summary: {
      ar: "محل بواجهة تجارية واسعة ومساحة مناسبة لمطعم متوسط الحجم. بيانات تجريبية للعرض فقط.",
      en: "A unit with a wide commercial frontage, sized for a mid-size restaurant. Sample data for preview only.",
    },
    description: {
      ar: "نص تجريبي يوضح شكل عرض محل تجاري للإيجار يصلح لنشاط مطاعم، يشمل لاحقًا تفاصيل التهوية وإمكانية تركيب الهود والاشتراطات النظامية بعد التحقق منها.",
      en: "Sample text illustrating how a commercial unit for lease suited to F&B will be presented, later including ventilation, hood installation feasibility, and regulatory requirements once verified.",
    },
    city: { ar: "جدة", en: "Jeddah" },
    area: { ar: "حي تجريبي — شارع تجاري رئيسي", en: "Sample district — main commercial street" },
    activityType: { ar: "مناسب لأي نشاط مطاعم", en: "Suited to any F&B activity" },
    rentSAR: 15000,
    sizeSqm: 180,
    openings: 2,
    operatingState: "not_applicable",
    parkingAvailable: true,
    features: [
      { ar: "إمكانية تركيب هود مركزي", en: "Central hood installation possible" },
      { ar: "واجهة زجاجية كاملة", en: "Full glass frontage" },
    ],
    media: [img(5, "صورة تجريبية لواجهة المحل")],
    isSample: true,
    views: 61,
    createdAt: "2026-08-14",
  },
  {
    slug: "sample-investment-opportunity-jeddah-01",
    kind: "investment_opportunity",
    status: "available",
    moderation: "approved",
    title: { ar: "[مثال] فرصة استثمارية — مشروع مقاهي متعدد الفروع", en: "[Sample] Investment opportunity — multi-branch café concept" },
    summary: {
      ar: "مفهوم مقهى جاهز للتوسع يبحث عن شريك استثمار للتوسع في جدة. بيانات تجريبية للعرض فقط.",
      en: "A ready-to-scale café concept seeking an investment partner to expand in Jeddah. Sample data for preview only.",
    },
    description: {
      ar: "نص وصف تجريبي لفرصة استثمارية في التوسع، يوضح شكل عرض حجم الاستثمار المطلوب والعائد المتوقع (بعد بناء دراسة جدوى فعلية) وشروط الشراكة.",
      en: "Sample description for an expansion investment opportunity, illustrating how required investment size, expected return (once a real feasibility study exists), and partnership terms will be presented.",
    },
    city: { ar: "جدة", en: "Jeddah" },
    area: { ar: "عدة أحياء — حسب خطة التوسع", en: "Multiple districts — per expansion plan" },
    activityType: { ar: "مقاهي", en: "Café" },
    sizeSqm: 90,
    operatingState: "operating",
    features: [
      { ar: "علامة تجارية قائمة بفرعين ناجحين", en: "Existing brand with two successful branches" },
      { ar: "يبحث عن شريك تمويل للتوسع لا شريك تشغيل", en: "Seeking a financing partner, not an operating partner" },
    ],
    media: [img(2, "صورة تجريبية لأحد الفروع")],
    isSample: true,
    views: 203,
    createdAt: "2026-07-28",
  },
  {
    slug: "sample-seeking-investor-makkah-01",
    kind: "seeking_investor",
    status: "available",
    moderation: "approved",
    title: { ar: "[مثال] مطعم قائم يبحث عن مستثمر — مكة المكرمة", en: "[Sample] Operating restaurant seeking an investor — Makkah" },
    summary: {
      ar: "مطعم مأكولات شعبية يعمل حاليًا ويبحث عن مستثمر لدعم التوسع. بيانات تجريبية للعرض فقط.",
      en: "An operating traditional-cuisine restaurant seeking an investor to support expansion. Sample data for preview only.",
    },
    description: {
      ar: "نص تجريبي لفرصة مطعم قائم يبحث عن مستثمر، يوضح شكل عرض نسبة الشراكة المقترحة وحجم الاستثمار المطلوب بعد التحقق من الأرقام الفعلية.",
      en: "Sample text for an operating restaurant seeking an investor, illustrating how the proposed equity split and required investment size will be presented once real figures are verified.",
    },
    city: { ar: "مكة المكرمة", en: "Makkah" },
    area: { ar: "حي تجريبي — قريب من المسجد الحرام", en: "Sample district — near Al-Masjid Al-Haram" },
    activityType: { ar: "مأكولات شعبية", en: "Traditional cuisine" },
    sizeSqm: 150,
    seatingCapacity: 45,
    operatingState: "operating",
    parkingAvailable: false,
    features: [
      { ar: "موقع قريب من حركة الحجاج والمعتمرين", en: "Close to pilgrim and visitor foot traffic" },
    ],
    media: [img(3, "صورة تجريبية للمطعم")],
    isSample: true,
    views: 77,
    createdAt: "2026-08-02",
  },
  {
    slug: "sample-site-for-restaurant-jeddah-01",
    kind: "site_for_restaurant",
    status: "available",
    moderation: "approved",
    title: { ar: "[مثال] موقع تجاري مناسب لمطعم — كورنيش جدة", en: "[Sample] Commercial site suited for a restaurant — Jeddah Corniche" },
    summary: {
      ar: "أرض/محل بموقع مطل على حركة كثيفة، مناسب لمشروع مطعم بمساحة كبيرة. بيانات تجريبية للعرض فقط.",
      en: "A plot/unit overlooking high foot traffic, suited to a large-format restaurant concept. Sample data for preview only.",
    },
    description: {
      ar: "نص تجريبي يوضح شكل عرض موقع تجاري مناسب لمشروع مطعم جديد، يشمل لاحقًا تفاصيل الاشتراطات البلدية وقابلية الموقع للنشاط بعد التحقق منها.",
      en: "Sample text illustrating how a commercial site suited to a new restaurant concept will be presented, later including municipal requirements and site suitability once verified.",
    },
    city: { ar: "جدة", en: "Jeddah" },
    area: { ar: "منطقة الكورنيش (عام)", en: "Corniche area (general)" },
    activityType: { ar: "مناسب لمطعم كبير أو مطل بحري", en: "Suited to a large-format or waterfront restaurant" },
    rentSAR: 45000,
    sizeSqm: 500,
    operatingState: "not_applicable",
    parkingAvailable: true,
    features: [
      { ar: "إطلالة بحرية مباشرة", en: "Direct sea view" },
      { ar: "حركة مشاة وسيارات عالية طوال الأسبوع", en: "High foot and vehicle traffic all week" },
    ],
    media: [img(6, "صورة تجريبية للموقع")],
    isSample: true,
    views: 156,
    createdAt: "2026-08-18",
  },
  {
    slug: "sample-pending-review-jeddah-01",
    kind: "restaurant_sale",
    status: "available",
    moderation: "pending",
    title: { ar: "[مثال] مطعم إيطالي للبيع — بانتظار المراجعة", en: "[Sample] Italian restaurant for sale — pending review" },
    summary: {
      ar: "فرصة أُرسلت للتو عبر نموذج \"اعرض فرصتك\" ولم تتم مراجعتها من فريق بيت المطاعم بعد. بيانات تجريبية لمعاينة لوحة الإدارة فقط.",
      en: "A listing just submitted via the \"List your opportunity\" form, not yet reviewed by the Bait Al Mataem team. Sample data for admin-panel preview only.",
    },
    description: {
      ar: "نص تجريبي يوضح شكل فرصة بحالة قيد المراجعة كما تظهر في لوحة الإدارة قبل الموافقة عليها أو رفضها أو طلب تعديل.",
      en: "Sample text illustrating a listing in pending-review status as it appears in the admin panel before approval, rejection, or a change request.",
    },
    city: { ar: "جدة", en: "Jeddah" },
    area: { ar: "حي تجريبي — وسط جدة", en: "Sample district — central Jeddah" },
    activityType: { ar: "إيطالي", en: "Italian" },
    priceSAR: 380000,
    rentSAR: 16000,
    sizeSqm: 160,
    seatingCapacity: 40,
    openings: 1,
    operatingState: "operating",
    parkingAvailable: false,
    features: [{ ar: "بيانات مرسلة من المستخدم مباشرة، بانتظار التحقق", en: "Submitted directly by the user, awaiting verification" }],
    media: [img(3, "صورة تجريبية بانتظار المراجعة")],
    isSample: true,
    views: 0,
    createdAt: "2026-08-21",
  },
  {
    slug: "sample-pending-review-makkah-01",
    kind: "lease_unit",
    status: "available",
    moderation: "pending",
    title: { ar: "[مثال] محل للإيجار بمكة — بانتظار المراجعة", en: "[Sample] Unit for lease in Makkah — pending review" },
    summary: {
      ar: "فرصة عقارية أُرسلت حديثًا وتنتظر مراجعة الإدارة. بيانات تجريبية لمعاينة لوحة الإدارة فقط.",
      en: "A property listing recently submitted and awaiting admin review. Sample data for admin-panel preview only.",
    },
    description: {
      ar: "نص تجريبي لفرصة عقارية بحالة قيد المراجعة، لتوضيح تجربة استخدام لوحة الإدارة قبل ربطها بقاعدة بيانات فعلية.",
      en: "Sample text for a property listing in pending-review status, illustrating the admin panel experience before it is wired to a real database.",
    },
    city: { ar: "مكة المكرمة", en: "Makkah" },
    area: { ar: "حي تجريبي — العوالي", en: "Sample district — Al Awali" },
    activityType: { ar: "مناسب لأي نشاط مطاعم", en: "Suited to any F&B activity" },
    rentSAR: 12000,
    sizeSqm: 130,
    operatingState: "not_applicable",
    parkingAvailable: true,
    features: [{ ar: "بيانات مرسلة من المستخدم مباشرة، بانتظار التحقق", en: "Submitted directly by the user, awaiting verification" }],
    media: [img(5, "صورة تجريبية بانتظار المراجعة")],
    isSample: true,
    views: 0,
    createdAt: "2026-08-22",
  },
];

export function getListingBySlug(slug: string): Listing | undefined {
  return LISTINGS.find((l) => l.slug === slug);
}

export function getSimilarListings(current: Listing, max = 3): Listing[] {
  return LISTINGS.filter(
    (l) => l.slug !== current.slug && (l.kind === current.kind || l.city.ar === current.city.ar)
  ).slice(0, max);
}
