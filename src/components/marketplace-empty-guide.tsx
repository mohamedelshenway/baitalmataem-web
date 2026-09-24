import type { Locale } from "@/i18n/config";
import { Button } from "@/components/ui";

// محتوى إرشادي يظهر في سوق الفرص لما مفيش ولا فرصة منشورة.
// الهدف: الصفحة ما تبقاش فاضية (جوجل كان بيصنّفها Soft 404) وتشرح للزائر
// إزاي يعرض فرصته أو يستفيد من خدمات التقييم والوساطة.

type Copy = {
  title: string;
  intro: string;
  typesTitle: string;
  types: { name: string; text: string }[];
  stepsTitle: string;
  steps: string[];
  faqTitle: string;
  faq: { q: string; a: string }[];
  ctaSubmit: string;
  ctaValuation: string;
  ctaBrokerage: string;
  ctaContact: string;
};

const COPY: Record<Locale, Copy> = {
  ar: {
    title: "كيف يعمل سوق الفرص في بيت المطاعم؟",
    intro:
      "سوق الفرص منصة من بيت المطاعم لعرض المطاعم المتاحة للتقبيل أو البيع، والمحلات والمواقع المناسبة للمطاعم، وفرص الاستثمار والشراكة في قطاع المطاعم بالمملكة. نراجع كل فرصة قبل نشرها، ونساعد البائع والمشتري على اتخاذ قرار مبني على أرقام حقيقية.",
    typesTitle: "أنواع الفرص التي نعرضها",
    types: [
      { name: "مطاعم للتقبيل أو البيع", text: "مطاعم قائمة يرغب أصحابها في التنازل عنها أو بيعها بالكامل، مع توضيح حالة التشغيل والمعدات والعقد." },
      { name: "محلات ومواقع للإيجار", text: "مواقع تجارية مناسبة لنشاط المطاعم والكافيهات في مختلف المدن." },
      { name: "فرص استثمار وشراكة", text: "مطاعم تبحث عن مستثمر أو شريك تشغيل، ومشاريع جديدة تحتاج تمويلًا أو إدارة." },
    ],
    stepsTitle: "خطوات عرض فرصتك",
    steps: [
      "أرسل بيانات الفرصة من نموذج «اعرض فرصتك».",
      "يراجع فريق بيت المطاعم البيانات ويتواصل معك لاستكمال التفاصيل.",
      "ننشر الفرصة في السوق ونسوّق لها للمستثمرين وأصحاب المطاعم المهتمين.",
      "نربطك بالجادّين ونساعدك في التفاوض والتقييم حتى إتمام الصفقة.",
    ],
    faqTitle: "أسئلة شائعة",
    faq: [
      { q: "هل تتم مراجعة الفرص قبل نشرها؟", a: "نعم، كل فرصة تمر بمراجعة من فريق بيت المطاعم قبل ظهورها في السوق للتأكد من وضوح بياناتها." },
      { q: "أريد شراء أو تقبيل مطعم، كيف أتأكد أن السعر مناسب؟", a: "نقدم خدمة تقييم المطاعم قبل الشراء أو التقبيل، وتشمل تحليل المبيعات والتكاليف والموقع والعقد والمخاطر." },
      { q: "لا أجد فرصة مناسبة الآن، ماذا أفعل؟", a: "تواصل معنا وحدد نوع النشاط والمدينة والميزانية، وسنبلغك عند توفر فرصة مطابقة." },
    ],
    ctaSubmit: "اعرض فرصتك",
    ctaValuation: "تقييم مطعم قبل الشراء",
    ctaBrokerage: "خدمة الوساطة في بيع المطاعم",
    ctaContact: "أخبرنا بالفرصة التي تبحث عنها",
  },
  en: {
    title: "How the Bait Al Mataem opportunities marketplace works",
    intro:
      "The marketplace is where Bait Al Mataem lists restaurants available for takeover or sale, commercial units suited to restaurants, and investment and partnership opportunities in the Saudi food sector. Every listing is reviewed before publishing, and we help both sides make decisions based on real numbers.",
    typesTitle: "Types of opportunities we list",
    types: [
      { name: "Restaurants for takeover or sale", text: "Operating restaurants whose owners want to transfer or sell them, with clear details on operations, equipment and lease." },
      { name: "Units for lease", text: "Commercial locations suited to restaurants and cafés across Saudi cities." },
      { name: "Investment and partnership", text: "Restaurants looking for an investor or operating partner, and new concepts that need funding or management." },
    ],
    stepsTitle: "How to list your opportunity",
    steps: [
      "Submit the details through the “List your opportunity” form.",
      "Our team reviews the information and contacts you to complete the details.",
      "We publish the opportunity and market it to interested investors and restaurant owners.",
      "We connect you with serious buyers and support valuation and negotiation until the deal closes.",
    ],
    faqTitle: "Frequently asked questions",
    faq: [
      { q: "Are listings reviewed before they go live?", a: "Yes. Every opportunity is reviewed by the Bait Al Mataem team before it appears in the marketplace." },
      { q: "I want to buy or take over a restaurant. How do I know the price is fair?", a: "Our restaurant valuation service analyses sales, costs, location, lease terms and risks before you commit." },
      { q: "There is nothing suitable right now. What should I do?", a: "Contact us with the activity, city and budget you have in mind and we will let you know when a matching opportunity is available." },
    ],
    ctaSubmit: "List your opportunity",
    ctaValuation: "Restaurant valuation before buying",
    ctaBrokerage: "Restaurant brokerage service",
    ctaContact: "Tell us what you are looking for",
  },
  tr: {
    title: "Bait Al Mataem fırsat pazarı nasıl çalışır?",
    intro:
      "Fırsat pazarı; Suudi Arabistan'da devren veya satılık restoranları, restoranlara uygun kiralık dükkânları ve yiyecek-içecek sektöründeki yatırım ve ortaklık fırsatlarını yayınladığımız platformdur. Her ilan yayından önce incelenir ve iki tarafın da gerçek rakamlara dayalı karar vermesine yardımcı oluruz.",
    typesTitle: "Yayınladığımız fırsat türleri",
    types: [
      { name: "Devren veya satılık restoranlar", text: "Sahiplerinin devretmek ya da satmak istediği faal restoranlar; işletme durumu, ekipman ve kira sözleşmesi bilgileriyle." },
      { name: "Kiralık dükkânlar", text: "Suudi şehirlerinde restoran ve kafe için uygun ticari lokasyonlar." },
      { name: "Yatırım ve ortaklık", text: "Yatırımcı veya işletme ortağı arayan restoranlar ile finansman ya da yönetim ihtiyacı olan yeni projeler." },
    ],
    stepsTitle: "Fırsatınızı nasıl listelersiniz?",
    steps: [
      "Bilgileri “Fırsatınızı listeleyin” formu üzerinden gönderin.",
      "Ekibimiz bilgileri inceler ve detayları tamamlamak için sizinle iletişime geçer.",
      "Fırsatı yayınlar ve ilgili yatırımcılara ve restoran sahiplerine tanıtırız.",
      "Sizi ciddi alıcılarla buluşturur, anlaşma tamamlanana kadar değerleme ve pazarlıkta destek oluruz.",
    ],
    faqTitle: "Sık sorulan sorular",
    faq: [
      { q: "İlanlar yayından önce inceleniyor mu?", a: "Evet. Her fırsat, pazarda görünmeden önce Bait Al Mataem ekibi tarafından incelenir." },
      { q: "Bir restoran almak veya devralmak istiyorum. Fiyatın uygun olduğunu nasıl anlarım?", a: "Restoran değerleme hizmetimiz; satışları, maliyetleri, konumu, kira koşullarını ve riskleri analiz eder." },
      { q: "Şu anda uygun bir fırsat yok. Ne yapmalıyım?", a: "Aradığınız faaliyet türünü, şehri ve bütçeyi bize iletin; uygun bir fırsat çıktığında sizi bilgilendirelim." },
    ],
    ctaSubmit: "Fırsatınızı listeleyin",
    ctaValuation: "Satın almadan önce restoran değerlemesi",
    ctaBrokerage: "Restoran aracılık hizmeti",
    ctaContact: "Aradığınız fırsatı bize anlatın",
  },
  ru: {
    title: "Как работает маркетплейс возможностей Bait Al Mataem",
    intro:
      "Маркетплейс — это площадка Bait Al Mataem, где мы публикуем рестораны на продажу или передачу бизнеса, коммерческие помещения под рестораны, а также инвестиционные и партнёрские возможности в ресторанном секторе Саудовской Аравии. Каждое объявление проходит проверку перед публикацией, и мы помогаем обеим сторонам принимать решения на основе реальных цифр.",
    typesTitle: "Какие возможности мы публикуем",
    types: [
      { name: "Рестораны на продажу или передачу", text: "Действующие рестораны, владельцы которых хотят передать или продать бизнес, с описанием состояния работы, оборудования и аренды." },
      { name: "Помещения в аренду", text: "Коммерческие помещения, подходящие для ресторанов и кафе в городах Саудовской Аравии." },
      { name: "Инвестиции и партнёрство", text: "Рестораны, которые ищут инвестора или операционного партнёра, и новые проекты, которым нужно финансирование или управление." },
    ],
    stepsTitle: "Как разместить свою возможность",
    steps: [
      "Отправьте данные через форму «Разместить возможность».",
      "Наша команда проверит информацию и свяжется с вами для уточнения деталей.",
      "Мы опубликуем предложение и продвинем его среди заинтересованных инвесторов и рестораторов.",
      "Мы сведём вас с серьёзными покупателями и поможем с оценкой и переговорами до закрытия сделки.",
    ],
    faqTitle: "Частые вопросы",
    faq: [
      { q: "Проверяются ли объявления перед публикацией?", a: "Да. Каждая возможность проверяется командой Bait Al Mataem до появления на маркетплейсе." },
      { q: "Я хочу купить ресторан. Как понять, что цена справедливая?", a: "Наша услуга оценки ресторанов анализирует продажи, затраты, локацию, условия аренды и риски до принятия решения." },
      { q: "Сейчас нет подходящего предложения. Что делать?", a: "Сообщите нам вид деятельности, город и бюджет — мы сообщим, когда появится подходящая возможность." },
    ],
    ctaSubmit: "Разместить возможность",
    ctaValuation: "Оценка ресторана перед покупкой",
    ctaBrokerage: "Брокерские услуги по продаже ресторанов",
    ctaContact: "Расскажите, что вы ищете",
  },
  ur: {
    title: "بیت المطاعم کا مواقع مارکیٹ پلیس کیسے کام کرتا ہے؟",
    intro:
      "مواقع مارکیٹ پلیس بیت المطاعم کا پلیٹ فارم ہے جہاں سعودی عرب میں منتقلی یا فروخت کے لیے دستیاب ریستوران، ریستوران کے لیے موزوں کرائے کی دکانیں، اور ریستوران کے شعبے میں سرمایہ کاری اور شراکت کے مواقع پیش کیے جاتے ہیں۔ ہر موقع شائع ہونے سے پہلے جانچا جاتا ہے، اور ہم دونوں فریقوں کو حقیقی اعداد و شمار کی بنیاد پر فیصلہ کرنے میں مدد دیتے ہیں۔",
    typesTitle: "ہم کن مواقع کو پیش کرتے ہیں",
    types: [
      { name: "منتقلی یا فروخت کے لیے ریستوران", text: "چلتے ہوئے ریستوران جن کے مالکان انہیں منتقل یا فروخت کرنا چاہتے ہیں، آپریشن، سامان اور کرایہ نامے کی تفصیل کے ساتھ۔" },
      { name: "کرائے کی دکانیں", text: "سعودی شہروں میں ریستوران اور کیفے کے لیے موزوں تجارتی مقامات۔" },
      { name: "سرمایہ کاری اور شراکت", text: "وہ ریستوران جو سرمایہ کار یا آپریٹنگ پارٹنر تلاش کر رہے ہیں، اور نئے منصوبے جنہیں فنڈنگ یا انتظام کی ضرورت ہے۔" },
    ],
    stepsTitle: "اپنا موقع کیسے پیش کریں",
    steps: [
      "«اپنا موقع پیش کریں» فارم کے ذریعے تفصیلات بھیجیں۔",
      "ہماری ٹیم معلومات کا جائزہ لے کر تفصیلات مکمل کرنے کے لیے آپ سے رابطہ کرے گی۔",
      "ہم موقع شائع کر کے دلچسپی رکھنے والے سرمایہ کاروں اور ریستوران مالکان تک پہنچاتے ہیں۔",
      "ہم آپ کو سنجیدہ خریداروں سے ملاتے ہیں اور سودا مکمل ہونے تک تشخیص اور مذاکرات میں مدد کرتے ہیں۔",
    ],
    faqTitle: "عام سوالات",
    faq: [
      { q: "کیا مواقع شائع ہونے سے پہلے جانچے جاتے ہیں؟", a: "جی ہاں، ہر موقع مارکیٹ پلیس میں آنے سے پہلے بیت المطاعم کی ٹیم جانچتی ہے۔" },
      { q: "میں ریستوران خریدنا چاہتا ہوں، کیسے یقین کروں کہ قیمت مناسب ہے؟", a: "ہماری ریستوران ویلیوایشن سروس فروخت، اخراجات، مقام، کرایہ نامے اور خطرات کا تجزیہ کرتی ہے۔" },
      { q: "ابھی کوئی مناسب موقع نہیں، کیا کروں؟", a: "ہمیں کاروبار کی قسم، شہر اور بجٹ بتائیں، مناسب موقع دستیاب ہوتے ہی ہم آپ کو اطلاع دیں گے۔" },
    ],
    ctaSubmit: "اپنا موقع پیش کریں",
    ctaValuation: "خریدنے سے پہلے ریستوران کی تشخیص",
    ctaBrokerage: "ریستوران بروکریج سروس",
    ctaContact: "ہمیں بتائیں آپ کیا تلاش کر رہے ہیں",
  },
};

const linkClass =
  "inline-flex items-center rounded-full border border-sand-200 bg-white px-4 py-2.5 text-sm font-semibold text-ink-800 hover:bg-sand-50";

export function MarketplaceEmptyGuide({ locale }: { locale: Locale }) {
  const c = COPY[locale] ?? COPY.en;
  return (
    <div className="space-y-6">
      <div className="rounded-card border border-sand-200 bg-white p-6 sm:p-8">
        <h2 className="mb-3 text-xl font-bold text-ink-900">{c.title}</h2>
        <p className="leading-relaxed text-ink-600">{c.intro}</p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Button href={"/" + locale + "/marketplace/new"} variant="primary" arrow>
            {c.ctaSubmit}
          </Button>
          <a href={"/" + locale + "/contact"} className={linkClass}>
            {c.ctaContact}
          </a>
        </div>
      </div>

      <div className="rounded-card border border-sand-200 bg-white p-6 sm:p-8">
        <h2 className="mb-4 text-lg font-bold text-ink-900">{c.typesTitle}</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {c.types.map((t) => (
            <div key={t.name} className="rounded-card bg-sand-50 p-4">
              <h3 className="mb-1.5 text-sm font-bold text-ink-900">{t.name}</h3>
              <p className="text-sm leading-relaxed text-ink-600">{t.text}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-card border border-sand-200 bg-white p-6 sm:p-8">
        <h2 className="mb-4 text-lg font-bold text-ink-900">{c.stepsTitle}</h2>
        <ol className="list-inside list-decimal space-y-2 text-ink-600">
          {c.steps.map((s) => (
            <li key={s} className="leading-relaxed">
              {s}
            </li>
          ))}
        </ol>
        <div className="mt-5 flex flex-wrap gap-3">
          <a href={"/" + locale + "/services/restaurant-valuation"} className={linkClass}>
            {c.ctaValuation}
          </a>
          <a href={"/" + locale + "/services/restaurant-brokerage"} className={linkClass}>
            {c.ctaBrokerage}
          </a>
        </div>
      </div>

      <div className="rounded-card border border-sand-200 bg-white p-6 sm:p-8">
        <h2 className="mb-4 text-lg font-bold text-ink-900">{c.faqTitle}</h2>
        <div className="space-y-4">
          {c.faq.map((f) => (
            <div key={f.q}>
              <h3 className="mb-1 text-sm font-bold text-ink-900">{f.q}</h3>
              <p className="text-sm leading-relaxed text-ink-600">{f.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
