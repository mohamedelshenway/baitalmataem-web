// مدن التركيز الأساسية لبيت المطاعم: مكة المكرمة، جدة، الطائف (بهذا الترتيب).
// المحتوى هنا إرشادي عام عن طبيعة السوق في كل مدينة، ولا يحتوي أي أرقام أو إحصائيات؛
// أي رقم فعلي يُحسب لكل مشروع على حدة في دراسة الجدوى أو تقييم الفرصة.

export type FocusCity = {
  slug: "makkah" | "jeddah" | "taif";
  nameAr: string;
  nameEn: string;
  /** القيمة المخزنة في الفرص (listings.city) لاستخدامها في فلتر سوق الفرص */
  marketCity: string;
  taglineAr: string;
  taglineEn: string;
  introAr: string;
  introEn: string;
  pointsAr: string[];
  pointsEn: string[];
  keywordsAr: string[];
};

export const FOCUS_CITIES: FocusCity[] = [
  {
    slug: "makkah",
    nameAr: "مكة المكرمة",
    nameEn: "Makkah",
    marketCity: "مكة المكرمة",
    taglineAr: "سوق موسمي خاص يحتاج قراءة دقيقة للأرقام",
    taglineEn: "A seasonal, highly specific market that demands careful numbers",
    introAr:
      "سوق المطاعم في مكة المكرمة له طبيعة مختلفة عن باقي المدن: حركة زوار ومعتمرين وحجاج، وتفاوت واضح بين مواسم الذروة والأيام العادية. لذلك دراسة الجدوى وتقييم أي مطعم قائم هنا لازم يفصل بين مبيعات الموسم ومبيعات باقي السنة قبل أي قرار شراء أو تقبيل.",
    introEn:
      "Makkah's restaurant market behaves differently from other cities: visitor, Umrah and Hajj traffic, with a clear gap between peak seasons and ordinary days. Any feasibility study or valuation here should separate seasonal sales from year-round sales before a buy or takeover decision.",
    pointsAr: [
      "تقييم مطعم قبل الشراء أو التقبيل بمبيعات موسمية وغير موسمية منفصلة",
      "اختيار الموقع حسب حركة الزوار وسكان الحي ووصول المشاة والسيارات",
      "ضبط تكلفة الطعام والعمالة في فترات الذروة والهدوء",
      "تطوير المطاعم متوسطة الأداء وتحسين الربحية والتشغيل اليومي",
    ],
    pointsEn: [
      "Valuing a restaurant before purchase or takeover with seasonal and off-season sales separated",
      "Site selection by visitor flow, resident base, and foot/vehicle access",
      "Controlling food and labor cost across peak and quiet periods",
      "Turning around average performers and improving day-to-day operations",
    ],
    keywordsAr: ["مطاعم للتقبيل في مكة", "دراسة جدوى مطعم في مكة", "استشاري مطاعم في مكة", "شراء مطعم في مكة المكرمة"],
  },
  {
    slug: "jeddah",
    nameAr: "جدة",
    nameEn: "Jeddah",
    marketCity: "جدة",
    taglineAr: "سوق كبير وتنافسي يحتاج تميّزًا وانضباطًا في التكاليف",
    taglineEn: "A large, competitive market that rewards differentiation and cost discipline",
    introAr:
      "جدة من أكبر أسواق المطاعم في المملكة وأكثرها تنافسًا، بتنوع واسع في الأحياء والأذواق والتطبيقات والكورنيش والمجمعات. النجاح هنا يعتمد على اختيار الحي والنشاط المناسبين، وعلى انضباط التكاليف أمام منافسة قوية وإيجارات متفاوتة بحسب الموقع.",
    introEn:
      "Jeddah is one of the largest and most competitive restaurant markets in the Kingdom, with wide variety across districts, tastes, delivery apps, the Corniche and malls. Success depends on choosing the right district and concept and keeping costs disciplined against strong competition and location-driven rents.",
    pointsAr: [
      "دراسة جدوى مطعم أو كافيه في جدة بأرقام واقعية وسيناريوهات متحفظة ومتوقعة ومتفائلة",
      "تحليل المنافسين والإيجار قبل اختيار الحي والمساحة",
      "تقييم فرص التقبيل والاستحواذ بالأرقام الفعلية وليس بكلام البائع",
      "رفع المبيعات من الكاشير والتطبيقات والتسويق المحلي",
    ],
    pointsEn: [
      "Feasibility studies for restaurants and cafés in Jeddah with conservative, expected and optimistic scenarios",
      "Competitor and rent analysis before choosing the district and size",
      "Evaluating takeover and acquisition opportunities on actual figures, not the seller's claims",
      "Growing sales through the POS, delivery apps and local marketing",
    ],
    keywordsAr: ["مطاعم للتقبيل في جدة", "دراسة جدوى مطعم في جدة", "استشاري مطاعم في جدة", "بيع مطعم في جدة"],
  },
  {
    slug: "taif",
    nameAr: "الطائف",
    nameEn: "Taif",
    marketCity: "الطائف",
    taglineAr: "مدينة سياحية بمواسم قوية وفرص للمشاريع الغذائية",
    taglineEn: "A tourist city with strong seasons and room for food projects",
    introAr:
      "الطائف مدينة سياحية تنشط فيها الحركة في مواسم الصيف والإجازات، وفيها مجال لمطاعم وكافيهات ومشاريع غذائية بفكرة واضحة وموقع مدروس. المهم هنا ألا يُبنى القرار على أرقام موسم الذروة وحده، بل على تشغيل مستقر يتحمل الفترات الهادئة.",
    introEn:
      "Taif is a tourist city that becomes busy in summer and holiday seasons, with room for restaurants, cafés and food projects built on a clear concept and a well-studied site. The key is not to base the decision on peak-season figures alone, but on stable operations that survive quiet periods.",
    pointsAr: [
      "دراسة جدوى مطعم أو كافيه في الطائف بحساب الموسم وغير الموسم",
      "اختيار الموقع المناسب للسياح والسكان",
      "تأسيس المطعم من الفكرة حتى الافتتاح",
      "تشغيل وإدارة المشروع بنظام واضح لا يعتمد على شخص واحد",
    ],
    pointsEn: [
      "Feasibility studies in Taif that account for peak and off-peak periods",
      "Choosing a site that works for both tourists and residents",
      "Setting up the restaurant from idea to opening",
      "Running the project on a clear system that does not depend on one person",
    ],
    keywordsAr: ["مطاعم للتقبيل في الطائف", "دراسة جدوى مطعم في الطائف", "استشاري مطاعم في الطائف", "افتتاح مطعم في الطائف"],
  },
];

export function getFocusCity(slug: string): FocusCity | undefined {
  return FOCUS_CITIES.find((c) => c.slug === slug);
}
