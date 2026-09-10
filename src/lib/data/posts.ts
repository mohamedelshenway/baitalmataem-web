import type { BlogPost } from "@/lib/types";

// مقالان تأسيسيان حقيقيان (لا محتوى تجريبي أو مُخترع من ناحية المعلومات المهنية)، لبدء المدونة والـSEO.
// المزيد يُضاف تباعًا من لوحة الإدارة بعد ربطها بقاعدة البيانات.

export const POSTS: BlogPost[] = [
  {
    slug: "how-to-evaluate-a-restaurant-before-buying",
    title: {
      ar: "كيف تقيّم مطعمًا قبل الشراء أو التقبيل: الأسئلة التي يجب أن تسألها قبل الأرقام",
      en: "How to Evaluate a Restaurant Before Buying or Taking It Over",
    },
    excerpt: {
      ar: "قبل ما تسأل عن السعر، اسأل عن الأرقام اللي بتثبت السعر. دليل عملي لتقييم فرصة شراء أو تقبيل مطعم قائم.",
      en: "Before you ask about the price, ask about the numbers that justify it. A practical guide to evaluating a restaurant takeover or purchase.",
    },
    category: { ar: "الاستثمار وتقييم الفرص", en: "Investment & Valuation" },
    tags: ["تقييم مطعم قبل الشراء", "شراء مطعم", "تقبيل مطعم"],
    author: "بيت المطاعم",
    publishedAt: "2026-08-18",
    readingMinutes: 6,
    relatedServiceSlug: "restaurant-valuation",
    content: {
      ar: `أكتر غلطة بيقع فيها مستثمر جديد في قطاع المطاعم إنه بيشتري "قصة" مش مشروع. صاحب المطعم بيحكيله عن أيام الزحمة، وعن المطبخ اللي "بيصرف عليه فلوس كتير"، وعن قاعدة عملاء "مبسوطة جدًا"، والمستثمر بيقرر بناءً على الإحساس ده بدل الأرقام.

## ابدأ من المبيعات، مش من السعر

أول سؤال مفروض تسأله مش "السعر كام؟"، السؤال هو: "إزاي أتأكد من المبيعات الحقيقية؟". اطلب كشوف نقاط البيع (POS) لعدة أشهر، مش شهر واحد بس، وشوف فواتير تطبيقات التوصيل لو موجودة. لو المالك رافض يوريك البيانات دي أو بيقولك "ثق فيا"، ده في حد ذاته إجابة.

## فرّق بين قيمة الأصول وقيمة المشروع

المعدات والديكور ليهم قيمة، لكن دي مش نفسها قيمة المشروع ككل. مشروع بيحقق أرباح ثابتة وعنده عقد إيجار قوي وقاعدة عملاء حقيقية يستاهل سعر أعلى من نفس المعدات في محل تاني مقفول. اسأل نفسك: هل أنا بادفع في المعدات، ولا في القدرة على توليد دخل؟

## متوسط الفاتورة وعدد الفواتير

معادلة بسيطة لكن مهمة جدًا: متوسط الفاتورة = إجمالي المبيعات ÷ عدد الفواتير. لو المالك بيديك رقم مبيعات كبير لكن مش قادر يوريك عدد الفواتير أو متوسط الفاتورة، فيه حاجة ناقصة في الصورة.

## متجاهلش الإيجار والالتزامات

عقد الإيجار مش تفصيلة صغيرة. اعرف مدة العقد المتبقية، الزيادة السنوية، وهل فيه التزامات أو ديون هتنتقل معاك (فواتير كهرباء، موردين، عمال). مشروع بيبان رخيص ممكن يبقى غالي جدًا لو معاه التزامات مخفية.

## السؤال الأهم: ليه بيبيع؟

سبب البيع أو التقبيل بيقولك حاجات كتير. أحيانًا السبب بريء تمامًا (المالك عنده مشاريع تانية أو عايز يسيّل استثمار)، وأحيانًا السبب بيكون إشارة تحذير (مبيعات بتتراجع، مشاكل مع الملاك، أو منافسة قوية جديدة).

## القرار مش لازم يكون نعم أو لأ بس

بعد ما تجمع الأرقام دي، مش شرط تقرر تشتري أو ترفض على طول. ممكن يكون القرار الصح هو "شراء بعد تفاوض" على السعر أو الشروط، أو "محتاج بيانات إضافية" قبل أي التزام. الهدف إنك تاخد قرار مبني على أرقام حقيقية، مش على حماس لحظة المعاينة.`,
      en: `The most common mistake a first-time restaurant investor makes is buying a "story" instead of a business. The owner talks about the busy days, the kitchen they "spent a fortune on," and a customer base that's "very happy" — and the investor decides based on that feeling instead of the numbers.

## Start from sales, not the price

The first question isn't "what's the price?" — it's "how do I verify the real sales?" Ask for POS records covering several months, not just one, and check delivery-app invoices if available. If the owner refuses to share this data or just says "trust me," that refusal is itself an answer.

## Separate asset value from business value

Equipment and fit-out have value, but that's not the same as the value of the business as a whole. A restaurant with steady profits, a strong lease, and a real customer base deserves a higher price than the same equipment sitting in a closed unit elsewhere. Ask yourself: am I paying for equipment, or for the ability to generate income?

## Average check and transaction count

A simple but important formula: average check = total sales ÷ number of transactions. If the owner gives you a large sales figure but can't show you the transaction count or average check, something is missing from the picture.

## Don't ignore rent and liabilities

The lease isn't a minor detail. Know the remaining term, the annual increase, and whether any liabilities or debts (utility bills, suppliers, staff dues) transfer with the business. A restaurant that looks cheap can turn out to be expensive once hidden liabilities surface.

## The most important question: why are they selling?

The reason for the sale or takeover tells you a lot. Sometimes it's entirely innocent (the owner has other projects, or wants to liquidate an investment), and sometimes it's a warning sign (declining sales, landlord disputes, or new strong competition).

## The decision doesn't have to be a simple yes or no

Once you've gathered this data, you don't necessarily have to decide to buy or walk away immediately. The right call might be "buy after negotiation" on price or terms, or "needs more data" before any commitment. The goal is a decision grounded in real numbers, not the enthusiasm of a single site visit.`,
    },
  },
  {
    slug: "food-cost-why-it-creeps-up-without-noticing",
    title: {
      ar: "Food Cost: ليه بيرتفع من غير ما تحس، وإزاي تضبطه",
      en: "Food Cost: Why It Creeps Up Without You Noticing",
    },
    excerpt: {
      ar: "مبيعاتك زي ما هي، لكن أرباحك بتقل. غالبًا Food Cost بيرتفع من مصادر مش بتتابعها يوميًا.",
      en: "Your sales look the same, but profit is shrinking. Food cost usually creeps up from sources you're not tracking day to day.",
    },
    category: { ar: "الأرقام والربحية", en: "Numbers & Profitability" },
    tags: ["Food Cost", "ربحية المطاعم", "إدارة الهدر"],
    author: "بيت المطاعم",
    publishedAt: "2026-08-12",
    readingMinutes: 5,
    relatedServiceSlug: "cost-profitability",
    content: {
      ar: `صاحب مطعم بيقولك "مبيعاتي زي ما هي من 3 شهور، بس الأرباح بتقل". المشكلة في الغالب مش في المبيعات، المشكلة في تكلفة الطعام (Food Cost) اللي بترتفع من غير ما حد ياخد باله.

## المعادلة الأساسية

Food Cost % = تكلفة المواد المستخدمة ÷ مبيعات الطعام × 100. المشكلة إن كتير من أصحاب المطاعم بيحسبوها بس من قيمة المشتريات الشهرية، من غير ما ياخدوا في الاعتبار الفرق في المخزون. الطريقة الأدق:

COGS = مخزون أول المدة + المشتريات − مخزون آخر المدة

لو معملتش جرد دوري، الرقم اللي قدامك مش حقيقي.

## فين بيضيع الفلوس بالظبط؟

فيه خمس نقط بيحصل فيها التسرب غالبًا:

- الهدر في التحضير: حصص أكبر من الوصفة القياسية، أو تقطيع غير مدروس.
- سوء التخزين: مواد بتتلف قبل استخدامها بسبب تخزين غلط أو ترتيب أولويات خاطئ (FIFO مش متبع).
- ضعف الجرد: من غير جرد أسبوعي أو شهري منتظم، مستحيل تعرف فين المشكلة بالظبط.
- التسعير القديم: سعر المورد ارتفع من 3 شهور وإنت لسه مسعّر الصنف بنفس السعر القديم.
- عدم الالتزام بالوصفة: كل شيف أو طباخ بيحط "على مزاجه" بدل وزن ثابت لكل صنف.

## الحل مش "قلل الكمية"

كتير من أصحاب المطاعم أول رد فعل بيكون تقليل حجم الحصة، وده بيأثر على تجربة العميل من غير ما يحل المشكلة الحقيقية. الحل الصح يبدأ بجرد دقيق يحدد فين التسرب بالظبط، قبل ما تاخد أي قرار على المنيو أو الأسعار.

## اربطها بالـPrime Cost

Food Cost لوحدها مش كل الصورة. لازم تشوفها مع Labor Cost مع بعض:

Prime Cost = Food Cost + Labor Cost

النسبة دي بتديك صورة أوضح عن صحة التشغيل ككل، مش بس تكلفة الأكل. مطعم ممكن يكون Food Cost عنده كويس لكن Labor Cost عالي جدًا، وده برضو بياكل من الربح.

## ابدأ بالقياس قبل التغيير

قبل ما تغيّر أي حاجة في المشتريات أو المنيو أو الأسعار، اعمل جرد دقيق واحسب Food Cost الحقيقي بمعادلة COGS. من غير الرقم ده، أي قرار هتاخده هيبقى تخمين.`,
      en: `A restaurant owner tells you: "my sales have been flat for three months, but profit keeps shrinking." The problem is usually not sales — it's food cost creeping up unnoticed.

## The basic formula

Food Cost % = cost of goods used ÷ food sales × 100. The issue is that many owners calculate this from monthly purchases alone, without accounting for inventory changes. The more accurate way:

COGS = beginning inventory + purchases − ending inventory

Without regular stock counts, the number in front of you isn't real.

## Where does the money actually leak?

Five common leak points:

- Prep waste: portions larger than the standard recipe, or careless cutting.
- Poor storage: ingredients spoiling before use due to wrong storage or no FIFO discipline.
- Weak inventory control: without regular weekly or monthly counts, it's impossible to pinpoint the problem.
- Stale pricing: your supplier raised prices three months ago and you're still pricing the dish at the old cost.
- Recipe drift: every cook plating "by feel" instead of a fixed weight per dish.

## The fix isn't "shrink the portion"

Many owners' first reaction is to cut portion size, which hurts the customer experience without solving the real problem. The right fix starts with an accurate inventory count that pinpoints exactly where the leak is, before touching the menu or prices.

## Pair it with Prime Cost

Food cost alone isn't the whole picture. Look at it together with labor cost:

Prime Cost = Food Cost + Labor Cost

This ratio gives a clearer read on overall operational health, not just food spend. A restaurant can have healthy food cost but very high labor cost — and that eats into profit just as much.

## Measure before you change anything

Before adjusting purchasing, the menu, or prices, run an accurate count and calculate real food cost using the COGS formula. Without that number, every decision you make is a guess.`,
    },
  },
  {
    slug: "restaurant-licensing-steps-saudi-arabia",
    title: {
      ar: "تراخيص فتح مطعم في السعودية: الجهات والخطوات قبل ما توقّع عقد الإيجار",
      en: "Restaurant Licensing in Saudi Arabia: The Authorities and Steps Before You Sign a Lease",
    },
    excerpt: {
      ar: "كتير من المشاريع بتوقّع عقد الإيجار الأول، وبعدين تكتشف إن التصميم مش مطابق لاشتراطات البلدية. إليك الترتيب الصح للجهات والخطوات.",
      en: "Many projects sign the lease first, then discover the layout doesn't meet municipal requirements. Here's the right order for authorities and steps.",
    },
    category: { ar: "التأسيس والتراخيص", en: "Setup & Licensing" },
    tags: ["تراخيص مطعم", "فتح مطعم في السعودية", "رخصة بلدية مطعم", "تأسيس مطاعم"],
    author: "بيت المطاعم",
    publishedAt: "2026-09-10",
    readingMinutes: 7,
    relatedServiceSlug: "restaurant-setup",
    content: {
      ar: `أكتر غلطة بنشوفها في مشاريع بتبدأ، إن صاحب المشروع بيوقّع عقد إيجار المكان الأول، وبعدين يبدأ يسأل عن التراخيص. النتيجة غالبًا: تصميم لازم يتعدل، مصاريف ديكور تتعمل مرتين، وشهور بتضيع قبل ما الرخصة توصل. الترتيب الصح هو العكس تمامًا: تعرف الاشتراطات الأول، وبعدين توقّع.

## الجهات اللي هتتعامل معاها بالترتيب

- الأمانة أو البلدية (عبر منصة بلدي): هي الجهة المحورية اللي بتصدر رخصة النشاط التجاري الغذائي، وبتتحقق من مطابقة الموقع لاستخدام الأرض والمخطط المعماري المعتمد.
- الهيئة العامة للغذاء والدواء (SFDA): بتضع الاشتراطات الصحية لتداول الغذاء وسلامته، وبتراقب طريقة التخزين والتحضير ومنع التلوث.
- الدفاع المدني: بيصدر شهادة السلامة بعد ما يتأكد من أنظمة الإطفاء والإنذار ومخارج الطوارئ في المكان.

## الخطوات الأساسية بالترتيب

1. إصدار السجل التجاري للنشاط الغذائي
2. تقديم طلب الرخصة عبر منصة "بلدي"
3. إرفاق عقد الإيجار أو الملكية والمخطط المعماري المعتمد
4. استيفاء الاشتراطات الفنية (التهوية، فصل المطبخ، التخزين)
5. الحصول على شهادة السلامة من الدفاع المدني
6. اجتياز الزيارة الميدانية والتفتيش الصحي
7. سداد الرسوم واستلام الرخصة إلكترونيًا

هنا لازم نوضح نقطة مهمة: الرسوم والمدة الزمنية الفعلية لكل خطوة بتختلف حسب المدينة وحجم المشروع ونوع النشاط، فمينفعش حد يديك رقم ثابت من غير ما يشوف حالتك بالتحديد — أي رقم عام هتقابله في مكان تاني اعتبره تقدير مبدئي مش التزام.

## الاشتراطات الفنية اللي بتوقف مشاريع كتير

المشكلة غالبًا مش في الخطوات نفسها، المشكلة في تفاصيل فنية بتتكشف متأخر:

- فصل المطبخ عن صالة الجمهور ودورات المياه بشكل كامل.
- نظام تهوية وشفط مناسب للأبخرة والدهون، مش أي شفاط عادي.
- تخزين منفصل: ثلاجات ترفع الطعام عن الأرض، وفصل واضح بين النيء والمطهي.
- شهادات صحية سارية لكل العاملين في التعامل مع الطعام.
- أنظمة إطفاء وإنذار ومخارج طوارئ واضحة ومطابقة للمخطط المعتمد.

لو المكان اتصمم واتنفذ قبل ما الاشتراطات دي تتأكد، الحل غالبًا بيكون إعادة تنفيذ جزء من الديكور — وده أغلى بكتير من تعديل رسمة قبل التنفيذ.

## ليه الترتيب الزمني مهم زي الإجراءات نفسها

مش بس "إيه الخطوات"، لكن "إمتى تعملها". لو وقّعت الإيجار قبل ما تتأكد إن المكان أصلًا يصلح لنشاط غذائي حسب استخدام الأرض، ممكن تكتشف إن المبنى مش مؤهل من الأساس. ولو بدأت التنفيذ قبل اعتماد المخطط من البلدية، بتخاطر إنك تنفذ حاجة تحتاج تتغير بعدين. الترتيب الصح: تأكد من صلاحية الموقع → اعتمد المخطط → بعدين نفّذ.

## هنا بالظبط بيبقى دور دراسة الجدوى والاستشاري

مش كل صاحب مشروع لازم يبقى خبير تراخيص، لكن لازم يكون معاه حد بيعرف الترتيب ده قبل ما يلتزم بأي عقد. دراسة الجدوى الصح بتشمل مراجعة الموقع من ناحية الاشتراطات مش بس من ناحية الجدوى المالية، وده اللي بيفرق بين مشروع بيتأخر شهور بسبب تفصيلة كان ممكن تتلاحظ بدري، ومشروع بيفتح في الميعاد المتوقع.`,
      en: `The most common mistake we see in new projects: the owner signs the lease first, then starts asking about licensing. The usual result is a layout that needs rework, fit-out costs paid twice, and months lost before the license arrives. The right order is the exact opposite: know the requirements first, then sign.

## The authorities you'll deal with, in order

- The municipality (via the "Balady" platform): the central authority that issues the food business license and verifies the site matches the approved land use and architectural plan.
- The Saudi Food and Drug Authority (SFDA): sets the health requirements for food handling and safety, and oversees storage, preparation, and contamination prevention.
- Civil Defense: issues the safety certificate after verifying fire suppression, alarm systems, and emergency exits.

## The basic steps, in order

1. Issue a commercial registration for the food business activity
2. Submit the license application through the "Balady" platform
3. Attach the lease or ownership contract and the approved architectural plan
4. Meet the technical requirements (ventilation, kitchen separation, storage)
5. Obtain the safety certificate from Civil Defense
6. Pass the site visit and health inspection
7. Pay the fees and receive the license electronically

One important note: actual fees and timelines for each step vary by city, project size, and activity type, so no one can give you a fixed number without reviewing your specific case — treat any general figure you come across as a rough starting estimate, not a commitment.

## The technical requirements that stall many projects

The problem is usually not the steps themselves — it's technical details that surface too late:

- Full separation of the kitchen from the dining area and restrooms.
- Proper ventilation and extraction for smoke and grease, not just any standard fan.
- Separate storage: refrigeration raised off the floor, with a clear separation between raw and cooked food.
- Valid health certificates for everyone handling food.
- Fire suppression, alarm systems, and clearly marked emergency exits matching the approved plan.

If the space was designed and built before these requirements were confirmed, the fix is usually redoing part of the fit-out — far more expensive than adjusting a drawing before construction.

## Why timing matters as much as the steps themselves

It's not just "what are the steps" — it's "when do you do them." If you sign the lease before confirming the location is even zoned for a food business, you may discover the building isn't eligible at all. If you start construction before the municipality approves the plan, you risk building something that needs to change later. The right order: confirm site eligibility → get the plan approved → then build.

## This is exactly where a feasibility study and an advisor earn their keep

Not every owner needs to become a licensing expert, but every owner needs someone who knows this sequence before committing to any contract. A proper feasibility study reviews the site against these requirements, not just its financial viability — and that's the difference between a project delayed months by something that could have been caught early, and one that opens on schedule.`,
    },
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return POSTS.find((p) => p.slug === slug);
}
