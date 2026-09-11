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
  {
    slug: "restaurant-feasibility-study-saudi-arabia",
    title: {
      ar: "دراسة جدوى مطعم في السعودية: الأرقام اللي لازم تعرفها قبل ما تستثمر",
      en: "Restaurant Feasibility Study in Saudi Arabia: The Numbers You Need Before You Invest",
    },
    excerpt: {
      ar: "دراسة الجدوى مش ورقة شكلية للبنك أو الشريك، هي اللي بتفرق بين مشروع بيتفتح على أرقام حقيقية ومشروع بيتفتح على أمل.",
      en: "A feasibility study isn't a formality for the bank or a partner — it's what separates a project built on real numbers from one built on hope.",
    },
    category: { ar: "دراسات الجدوى والتخطيط الاستثماري", en: "Feasibility Studies & Investment Planning" },
    tags: ["دراسة جدوى مطعم", "تكلفة فتح مطعم في السعودية", "نقطة التعادل مطعم", "دراسة جدوى مشروع مطعم"],
    author: "بيت المطاعم",
    publishedAt: "2026-09-11",
    readingMinutes: 8,
    relatedServiceSlug: "feasibility-study",
    content: {
      ar: `أكتر مشروع بيتعثر مش لأنه فكرة وحشة، لكن لأن صاحبه فتحه على إحساس "المكان هيعجب الناس" من غير ما يشوف الأرقام قبل ما يوقّع أي عقد. دراسة الجدوى مش ورقة شكلية بتتعمل عشان تقدمها للبنك أو الشريك، هي الأداة اللي بتفرق بين مشروع بيتفتح على أساس صلب، ومشروع بيتفتح على أمل.

## إيه اللي المفروض دراسة الجدوى تجاوبك عليه

دراسة جدوى المطعم الصح مش بس "هل الفكرة كويسة؟"، لازم تجاوبك بالتفصيل على:

- هل الموقع ده فعلاً بيجيب العدد الكافي من الزباين للنشاط ده تحديدًا؟
- إيه حجم الاستثمار المطلوب فعليًا، مش تقدير عام من غير تفاصيل؟
- إمتى المشروع هيوصل لنقطة التعادل، وإمتى هيبدأ يرجّع رأس المال؟
- إيه أكبر المخاطر اللي ممكن تأثر على الأرقام دي (منافسة، إيجار، تكلفة تشغيل)؟

لو دراسة الجدوى مجاوبتش على الأسئلة دي بالتحديد، يبقى في الغالب ورقة عامة مش أداة قرار حقيقية.

## عناصر دراسة الجدوى الأساسية

- تحليل السوق والمنافسين: مين اللي بيخدم نفس الشريحة في نفس المنطقة، وإيه نقاط قوته وضعفه.
- تحليل الموقع: الحركة المارة، سهولة الوصول، التوافق بين طبيعة المنطقة ونوع النشاط.
- التكلفة الاستثمارية: كل بند من الإيجار والتجهيزات للديكور والتراخيص ورأس المال العامل.
- توقعات الإيرادات: مبنية على متوسط فاتورة واقعي وعدد زباين متوقع، مش رقم متفائل بدون أساس.
- التكاليف التشغيلية الشهرية: Food Cost، Labor Cost، إيجار، مرافق، تسويق.
- نقطة التعادل والتدفق النقدي: إمتى المشروع هيغطي مصاريفه، وإمتى هيبدأ يحقق ربح فعلي.
- تحليل المخاطر: إيه السيناريوهات اللي ممكن تقلب الأرقام (زيادة إيجار، منافس جديد، تأخر ترخيص).

## تكلفة تأسيس مطعم في السعودية: أرقام تقريبية

الأرقام دي تقديرية وبتختلف بشكل كبير حسب المدينة والحي وحجم المطعم ونوع النشاط، وده لازم يتوضح من الأول عشان محدش يتعامل معاها كسعر ثابت:

- مطعم صغير: استثمار إجمالي يتراوح تقريبًا بين 80,000 و250,000 ريال.
- مطعم متوسط الحجم: يتراوح تقريبًا بين 250,000 و800,000 ريال.
- مطعم كبير أو بمفهوم متكامل: ممكن يتخطى 800,000 وحتى 3,000,000 ريال أو أكتر.

جوه الرقم ده بتدخل بنود زي الإيجار السنوي، تجهيزات المطبخ، الديكور والتشطيب، نظام نقاط البيع (POS)، ورأس المال العامل لأول 3-6 شهور تشغيل. أي رقم عام بتشوفه في مقال أو منشور اعتبره نقطة بداية للنقاش، مش ميزانية نهائية لمشروعك.

## نقطة التعادل: الرقم اللي المفروض تعرفه قبل التوقيع

نقطة التعادل هي حجم المبيعات اللي عنده المشروع بيغطي مصاريفه بالظبط، من غير ربح ولا خسارة. المعادلة المبسطة:

نقطة التعادل (بالمبيعات) = المصاريف الثابتة ÷ (1 − نسبة التكلفة المتغيرة من المبيعات)

المصاريف الثابتة بتشمل الإيجار والرواتب الأساسية والالتزامات الشهرية الثابتة، والتكلفة المتغيرة بتشمل Food Cost بشكل أساسي. لو محسوبتش الرقم ده قبل الفتح، هتكتشفه بالتجربة بعد ما تكون وقّعت عقد إيجار وبدأت تصرف.

## العائد على الاستثمار: توقع واقعي مش رقم متفائل

كتير من المستثمرين بيدخلوا المشروع وهما متوقعين استرداد رأس المال في أقل من سنة، وده غالبًا توقع متفائل أكتر من اللازم لقطاع المطاعم. الفترة الواقعية بتختلف بشكل كبير حسب حجم الاستثمار والموقع ونوع النشاط، وأي رقم محدد من غير ما يتبني على دراسة فعلية لمشروعك يفضل تقدير عام مش التزام.

## غلطات شائعة بتشوّه دراسة الجدوى

- تفاؤل زيادة في توقعات المبيعات، من غير ما تتبني على بيانات موقع فعلية أو منافسين حقيقيين.
- تجاهل موسمية الطلب (رمضان، الصيف، المواسم) وتأثيرها على التدفق النقدي الشهري.
- عدم احتساب رأس المال العامل الكافي لأول شهور التشغيل، قبل ما المبيعات تستقر.
- الاعتماد على متوسطات عامة من الإنترنت بدل زيارة الموقع فعليًا وجمع بيانات حقيقية عنه.
- معاملة الدراسة كخطوة تتعمل مرة واحدة وتتنسى، من غير مراجعة لما تتغير الظروف (إيجار، تضخم، منافسة جديدة).

## هنا بالظبط بيبقى دور دراسة الجدوى الاحترافية

الفرق بين دراسة جدوى حقيقية ومستند شكلي هو مصدر الأرقام: هل مبنية على بيانات موقع فعلية وتحليل سوق حقيقي، ولا مبنية على افتراضات عامة معمّمة على أي مطعم في أي مكان؟ دراسة الجدوى الصح بتوضح كل افتراض لوحده، وبتفرّق بين الرقم المؤكد والرقم التقديري، عشان القرار اللي هتاخده يكون مبني على فهم حقيقي للمخاطر والفرصة، مش على تفاؤل لحظة البداية.`,
      en: `The most common reason a restaurant project stumbles isn't a bad idea — it's opening on the feeling that "people will love this place" without looking at the numbers before signing anything. A feasibility study isn't a formality you produce for a bank or a partner; it's the tool that separates a project built on solid ground from one built on hope.

## What a feasibility study should actually answer

A proper restaurant feasibility study doesn't just ask "is this a good idea?" It should answer, in detail:

- Does this specific location actually bring enough of the right customers for this specific concept?
- What's the real investment required — not a vague estimate without a breakdown?
- When will the project reach break-even, and when does it start paying back the capital?
- What are the biggest risks that could shift these numbers (competition, rent, operating costs)?

If a feasibility study doesn't answer these specific questions, it's usually a generic document, not a real decision-making tool.

## The core components of a feasibility study

- Market and competitor analysis: who's serving the same segment in the same area, and their strengths and weaknesses.
- Location analysis: foot traffic, accessibility, and how well the area fits the concept.
- Investment cost: every line item — rent, fit-out, licensing, and working capital.
- Revenue projections: built on a realistic average check and expected customer count, not an optimistic number with no basis.
- Monthly operating costs: food cost, labor cost, rent, utilities, marketing.
- Break-even point and cash flow: when the project covers its expenses, and when it starts generating real profit.
- Risk analysis: scenarios that could shift the numbers (rent increases, new competitors, licensing delays).

## The cost of opening a restaurant in Saudi Arabia: rough figures

These figures are estimates and vary significantly by city, district, restaurant size, and concept — that needs to be clear upfront so no one treats them as a fixed price:

- Small restaurant: total investment roughly SAR 80,000-250,000.
- Medium-sized restaurant: roughly SAR 250,000-800,000.
- Large restaurant or a full concept: can exceed SAR 800,000, reaching SAR 3,000,000 or more.

Inside that figure sit line items like annual rent, kitchen equipment, fit-out and finishing, a POS system, and working capital for the first 3-6 months of operation. Treat any general figure you come across as a starting point for discussion, not a final budget for your project.

## Break-even: the number you need before you sign

The break-even point is the sales volume at which the business covers its expenses exactly — no profit, no loss. The simplified formula:

Break-even (in sales) = fixed costs ÷ (1 − variable cost ratio of sales)

Fixed costs include rent, base salaries, and fixed monthly obligations; variable cost is mainly food cost. If you don't calculate this before opening, you'll discover it the hard way — after you've signed the lease and started spending.

## Return on investment: a realistic expectation, not an optimistic number

Many investors go in expecting to recover their capital in under a year, which is usually too optimistic for the restaurant sector. The realistic payback period varies significantly by investment size, location, and concept, and any specific number not grounded in an actual study of your project should be treated as a general estimate, not a commitment.

## Common mistakes that distort a feasibility study

- Overly optimistic sales projections not grounded in real location data or actual competitors.
- Ignoring demand seasonality (Ramadan, summer, holidays) and its effect on monthly cash flow.
- Not budgeting enough working capital for the first months of operation, before sales stabilize.
- Relying on generic averages from the internet instead of actually visiting the site and gathering real data.
- Treating the study as a one-time exercise instead of revisiting it when conditions change (rent, inflation, new competition).

## This is exactly where a professional feasibility study earns its value

The difference between a real feasibility study and a formality document is the source of the numbers: is it built on actual site data and real market analysis, or on generic assumptions applied to any restaurant anywhere? A proper feasibility study states every assumption separately, and distinguishes between confirmed figures and estimates — so the decision you make is grounded in a real understanding of the risk and the opportunity, not the optimism of day one.`,
    },
  },
  {
    slug: "restaurant-taqbeel-vs-purchase-saudi-arabia",
    title: {
      ar: "تقبيل مطعم في السعودية: إيه الفرق عن الشراء وإزاي تقيّم العرض؟",
      en: "Restaurant Business Transfer (Taqbeel) in Saudi Arabia: How It Differs From Buying, and How to Evaluate an Offer",
    },
    excerpt: {
      ar: "كتير من المستثمرين بيتعاملوا مع عرض التقبيل بنفس منطق شراء مطعم بالظبط، وده غلط ممكن يكلفهم فلوس ومشاكل قانونية.",
      en: "Many investors treat a taqbeel offer with the exact same logic as buying a restaurant outright — a mistake that can cost money and create legal problems.",
    },
    category: { ar: "الاستثمار وتقييم الفرص", en: "Investment & Valuation" },
    tags: ["تقبيل مطعم", "تقبيل محل تجاري", "شراء مطعم أو تقبيله", "نقل نشاط تجاري"],
    author: "بيت المطاعم",
    publishedAt: "2026-09-12",
    readingMinutes: 7,
    relatedServiceSlug: "restaurant-brokerage",
    content: {
      ar: `"عقد التقبيل" ده مصطلح إنت هتقابله كتير في سوق المطاعم السعودي، خصوصًا في المواقع المميزة اللي عليها طلب عالي. لكن كتير من المستثمرين الجدد بيتعاملوا مع عرض تقبيل بنفس منطق شراء مطعم بالظبط، وده غلط ممكن يكلفهم فلوس ومشاكل قانونية.

## التقبيل مش بيع: إيه الفرق بالظبط

البيع بينقل ملكية الأصل (العقار أو المنشأة) بالكامل للمشتري. التقبيل مختلف: هو عقد بين المؤجر والمستأجر بيمنح المستأجر حق الانتفاع بالعقار لممارسة نشاط تجاري معين، من غير ما تنتقل ملكية العقار نفسه. يعني عمليًا إنت بتدفع عشان "حق تشغيل النشاط في المكان ده"، مش عشان تمتلك المبنى.

## إيه اللي إنت بتدفع فيه فعليًا لما تقبّل مطعم؟

- حق الانتفاع بموقع العقد الحالي، خصوصًا لو الموقع مميز وصعب تلاقي عقد بنفس الشروط من جديد.
- المعدات والتجهيزات القائمة فعلًا في المكان.
- الرخص والتصاريح القائمة، لو قابلة للتحويل باسمك.
- قاعدة عملاء وسمعة تجارية قائمة، لو النشاط شغال أصلًا وله تاريخ في المكان.

## أسئلة لازم تسألها قبل ما توافق على أي عرض تقبيل

- هل عقد الإيجار الأصلي بيسمح بالتنازل أو التأجير من الباطن؟
- كام سنة باقية فعليًا في العقد، ومش بس في الوعد الشفهي؟
- الرخص والتصاريح (البلدية، الدفاع المدني، الهيئة العامة للغذاء والدواء) قابلة للتحويل باسمك، ولا لازم تستخرجها من جديد؟
- فيه التزامات مالية أو ديون هتنتقل معاك (فواتير، موردين، مستحقات عمال)؟
- المالك موافق كتابيًا على التقبيل، ولا الاتفاق شفهي بينك وبين المستأجر الحالي بس؟

## التوثيق الرسمي: منصة إيجار

عقود التقبيل والتأجير التجاري في السعودية بتتوثق عادة عبر منصة "إيجار" الإلكترونية: تسجيل بيانات الطرفين والعقار والمدة والقيمة المالية، وسداد رسوم توثيق (تختلف حسب مدة العقد ونوعه، فتأكد من الرقم الفعلي من المنصة مباشرة وقت التنفيذ). العقد الموثق إلكترونيًا بيبقى وثيقة رسمية قابلة للتنفيذ، وده بيحميك أكتر بكتير من اتفاق شفهي أو ورقة غير موثقة.

## متجاهلش تقييم النشاط نفسه، مش بس العقد

عرض التقبيل مهما كان شكله قانوني وسليم، لازم يتقيّم زي أي فرصة استثمارية تانية: المبيعات الحقيقية للنشاط الحالي (لو موجود)، متوسط الفاتورة، الالتزامات القائمة، وسبب رغبة الطرف التاني في التنازل عن العقد. عقد تقبيل نظيف قانونيًا لنشاط بيخسر مش صفقة كويسة.

## هنا بيبقى دور استشاري متخصص

الفرق بين عرض تقبيل يبان مغري وعرض فيه مخاطر مخفية غالبًا مش واضح من أول قراءة. مراجعة العقد والنشاط مع بعض، من الناحية القانونية والتشغيلية والمالية، هي اللي بتفرق بين قرار مبني على فهم كامل وقرار مبني على ثقة بس.`,
      en: `"Taqbeel" (business/lease transfer) is a term you'll run into often in the Saudi restaurant market, especially in prime locations with high demand. But many new investors treat a taqbeel offer with the exact same logic as buying a restaurant outright — a mistake that can cost money and create legal problems.

## Taqbeel isn't a sale: the real difference

A sale transfers full ownership of the asset (the property or the business) to the buyer. Taqbeel is different: it's a contract between the landlord and tenant that grants the tenant the right to use the property for a specific commercial activity, without transferring ownership of the property itself. In practice, you're paying for "the right to operate the business at this location," not to own the building.

## What are you actually paying for when you take over (taqbeel) a restaurant?

- The right to use the current lease's location, especially valuable if the site is prime and hard to replicate under similar terms.
- Equipment and fit-out already in place.
- Existing licenses and permits, if they're transferable to your name.
- An existing customer base and reputation, if the business is already operating and has a track record at the location.

## Questions to ask before agreeing to any taqbeel offer

- Does the original lease allow assignment or subletting?
- How many years are actually left on the lease — not just what you were told verbally?
- Are the licenses and permits (municipality, civil defense, the food and drug authority) transferable to your name, or do you need to reapply from scratch?
- Are there financial liabilities or debts that transfer with the business (bills, suppliers, staff dues)?
- Has the landlord approved the transfer in writing, or is it just a verbal agreement with the current tenant?

## Official documentation: the Ejar platform

Commercial lease and taqbeel contracts in Saudi Arabia are typically documented through the "Ejar" electronic platform: registering both parties' details, the property, the term, and the financial value, then paying a documentation fee (this varies by contract term and type, so confirm the actual figure directly on the platform at the time). An electronically documented contract becomes an official, enforceable document — far more protective than a verbal agreement or an undocumented paper.

## Don't skip evaluating the business itself, not just the contract

However clean and legally sound a taqbeel offer looks, it needs to be evaluated like any other investment opportunity: the current business's real sales (if it's operating), average check, existing liabilities, and the real reason the other party wants to give up the lease. A legally clean taqbeel contract for a losing business isn't a good deal.

## This is exactly where a specialized advisor earns their keep

The difference between a taqbeel offer that looks attractive and one with hidden risk usually isn't obvious on a first read. Reviewing the contract and the business together — legally, operationally, and financially — is what separates a decision built on full understanding from one built on trust alone.`,
    },
  },
  {
    slug: "restaurant-labor-cost-how-to-control-it",
    title: {
      ar: "تكلفة العمالة في المطاعم: إزاي تحسب Labor Cost وتضبطه من غير ما تضر التشغيل",
      en: "Restaurant Labor Cost: How to Calculate It and Control It Without Hurting Operations",
    },
    excerpt: {
      ar: "بعد Food Cost، أكبر بند بياكل من هامش الربح هو تكلفة العمالة. كتير من أصحاب المطاعم بيراقبوا تكلفة الطعام وبينسوا العمالة.",
      en: "After food cost, the biggest line item eating into profit margin is labor cost. Many owners watch food cost closely and forget about labor.",
    },
    category: { ar: "الأرقام والربحية", en: "Numbers & Profitability" },
    tags: ["Labor Cost", "تكلفة العمالة في المطاعم", "Prime Cost", "جدولة الموظفين"],
    author: "بيت المطاعم",
    publishedAt: "2026-09-13",
    readingMinutes: 7,
    relatedServiceSlug: "cost-profitability",
    content: {
      ar: `بعد Food Cost، أكبر بند بياكل من هامش ربح المطعم هو تكلفة العمالة (Labor Cost). المشكلة إن كتير من أصحاب المطاعم بيراقبوا تكلفة الطعام بعناية، وبينسوا إن تكلفة العمالة ممكن تكون أخطر لو اتسابت من غير ضبط.

## المعادلة الأساسية

Labor Cost % = إجمالي تكلفة العمالة (رواتب + تأمينات + بدلات) ÷ إجمالي المبيعات × 100

لو صرفت 15,000 ريال على العمالة في أسبوع حقق فيه المطعم 50,000 ريال مبيعات، نسبة Labor Cost عندك 30%.

## إيه المعدل الطبيعي؟

- مطاعم الوجبات السريعة: حوالي 25% غالبًا، بسبب سرعة الخدمة وتعدد المهام على نفس الموظف.
- مطاعم الخدمة الكاملة (Casual Dining): من 25% إلى 30% تقريبًا، حسب تعقيد المنيو.
- مطاعم الفاين داين: ممكن تتخطى 30-35%، بسبب التخصص العالي المطلوب في الطاقم.

الأرقام دي مؤشرات عامة من السوق العالمي، مش معيار ثابت لازم كل مطعم سعودي يلتزم بيه بالحرف. الأهم إنك تقيس رقمك الفعلي وتقارنه بأداء مطعمك على مدار الوقت، مش بس برقم عام من الإنترنت.

## عوامل بتأثر على Labor Cost في السياق السعودي

- نظام التأمينات الاجتماعية (GOSI) وتكلفته على صاحب العمل.
- برنامج نطاقات ونسب التوطين المطلوبة حسب نشاط المطعم وحجمه.
- بدل ساعات العمل الإضافية والورديات المنقسمة في أوقات الذروة (الغداء والعشاء).
- معدل دوران الموظفين المرتفع في القطاع، وتكلفة التوظيف والتدريب المتكرر.

## فين بيحصل الهدر من غير ما حد ياخد باله؟

- جدولة عدد موظفين زيادة عن الحاجة في أوقات الهدوء.
- عدم ربط عدد الموظفين بالوردية بحجم المبيعات المتوقع لنفس اليوم.
- الاعتماد على العمل الإضافي بدل جدولة أدق من الأول.
- عدم قياس إنتاجية الموظف (المبيعات مقابل كل ساعة عمل).

## اربطها دايمًا بـ Prime Cost

Prime Cost = Food Cost + Labor Cost. زي ما أوضحنا قبل كده في مقال Food Cost، النسبتين لازم يتقاسوا مع بعض مش كل واحدة لوحدها، عشان تاخد صورة حقيقية عن صحة التشغيل. مطعم ممكن يكون عنده Food Cost كويس، لكن Labor Cost عالي بيبلع الفرق كله.

## الحل مش تقليل عدد الموظفين على العمياني

تقليل العمالة من غير جدولة مدروسة بيأثر على سرعة الخدمة وتجربة العميل، وده ممكن يكلفك أكتر من التوفير اللي هتحققه. الحل الصح يبدأ بقياس دقيق: كام ساعة عمل فعلية مقابل كام مبيعات في نفس الفترة، وبعدين تبني الجدولة على الرقم ده مش على العادة أو التخمين.`,
      en: `After food cost, the biggest line item eating into a restaurant's profit margin is labor cost. The problem is that many owners watch food cost closely while forgetting that labor cost can be even more damaging if left unmanaged.

## The basic formula

Labor Cost % = total labor cost (wages + insurance + allowances) ÷ total sales × 100

If you spent SAR 15,000 on labor during a week when the restaurant brought in SAR 50,000 in sales, your labor cost percentage is 30%.

## What's a healthy range?

- Quick-service restaurants: around 25%, mainly due to faster service and staff covering multiple roles.
- Full-service (casual dining) restaurants: roughly 25-30%, depending on menu complexity.
- Fine dining restaurants: can exceed 30-35%, due to the higher specialization required from staff.

These figures are general benchmarks from the global market, not a fixed standard every Saudi restaurant must match exactly. What matters most is measuring your own actual number and tracking it over time, not just comparing yourself to a generic figure from the internet.

## Factors that affect labor cost in the Saudi context

- The social insurance system (GOSI) and its cost to the employer.
- The Nitaqat program and the localization (Saudization) ratios required based on the restaurant's activity and size.
- Overtime pay and split shifts during peak hours (lunch and dinner).
- The sector's high staff turnover rate, and the recurring cost of hiring and training.

## Where does the waste happen without anyone noticing?

- Scheduling more staff than needed during slow periods.
- Not matching shift staffing levels to that day's expected sales volume.
- Relying on overtime instead of more accurate scheduling from the start.
- Not measuring employee productivity (sales per labor hour).

## Always pair it with Prime Cost

Prime Cost = Food Cost + Labor Cost. As covered in our food cost article, the two ratios need to be looked at together, not separately, to get a real read on operational health. A restaurant can have a healthy food cost but a high labor cost that swallows the difference entirely.

## The fix isn't cutting staff blindly

Cutting labor without deliberate scheduling hurts service speed and customer experience, which can cost more than the savings achieved. The right fix starts with accurate measurement: actual labor hours against actual sales for the same period, then building the schedule on that number instead of habit or guesswork.`,
    },
  },
  {
    slug: "struggling-restaurant-turnaround-saudi-arabia",
    title: {
      ar: "مطعمك بيخسر؟ خطوات عملية لتشخيص المشكلة وبداية التعافي",
      en: "Is Your Restaurant Losing Money? Practical Steps to Diagnose the Problem and Start a Turnaround",
    },
    excerpt: {
      ar: "مطعم بيخسر مش معناه إنه لازم يقفل. غالبًا فيه سبب محدد بيسحب الأرباح لتحت، والمشكلة إنك بتحس بالخسارة قبل ما تعرف مصدرها.",
      en: "A restaurant losing money doesn't have to mean it's headed for closure. Usually there's a specific cause dragging profit down — the problem is feeling the loss before knowing its source.",
    },
    category: { ar: "تطوير وإدارة المطاعم", en: "Restaurant Turnaround & Management" },
    tags: ["مطعم يخسر", "تطوير المطاعم المتعثرة", "إنقاذ مطعم", "إعادة هيكلة مطعم"],
    author: "بيت المطاعم",
    publishedAt: "2026-09-14",
    readingMinutes: 8,
    relatedServiceSlug: "restaurant-development",
    content: {
      ar: `مطعم بيخسر مش معناه إنه لازم يقفل. غالبًا فيه سبب أو اتنين محدد بيسحب الأرباح لتحت، والمشكلة إن أصحاب المطاعم بيحسوا بالخسارة قبل ما يعرفوا مصدرها بالظبط.

## قبل أي قرار: افصل بين العرض والسبب

انخفاض المبيعات عرض، مش سبب. السبب ممكن يكون منافس جديد قريب، أو تراجع في جودة الأكل، أو خدمة بطيئة، أو تسعير غلط، أو ببساطة موقع مبقاش مناسب للسوق اللي حواليه. من غير ما تحدد السبب الحقيقي، أي قرار هتاخده هيبقى تخمين.

## نقط التشخيص اللي لازم تبدأ بيها

- مراجعة Food Cost وLabor Cost الفعليين مقابل المعدل الطبيعي، وتحديد هل فيه هدر أو تسرب مش متابَع.
- مراجعة الإيرادات حسب الوقت (غداء أو عشاء) واليوم، عشان تعرف فين الضعف بالظبط.
- مراجعة التقييمات على جوجل وتطبيقات التوصيل، الخدمة غالبًا أكتر كلمة بتتكرر في الشكاوى، مش الأكل.
- مراجعة دوران الموظفين ونسبة التدريب، معدل دوران مرتفع بيأثر على جودة الخدمة قبل ما يأثر على أي رقم مالي.

## علامات تحذير لازم تاخدها بجدية

- تكلفة الطعام بترتفع من غير أي تعديل في المنيو أو الأسعار.
- مخزون بيختفي من غير تفسير واضح.
- عملاء بيرجعوا أقل من قبل بشكل ملحوظ.
- الإدارة مش شايفة الأرقام أسبوعيًا، وبتكتشف المشكلة في نهاية الشهر بس.

## التعافي بيبدأ بقرارات صغيرة قبل الكبيرة

قبل ما تفكر في تغيير كامل للمنيو أو إعادة تصميم المكان، وهي قرارات مكلفة، ابدأ بالحاجات اللي مش محتاجة استثمار كبير: ضبط الجدولة، مراجعة ربحية كل صنف في المنيو، وتدريب سريع للطاقم على نقاط الخدمة الأساسية.

## إمتى القرار يبقى إعادة هيكلة كاملة؟

لو المشكلة مش في التفاصيل التشغيلية لكن في المفهوم نفسه، الموقع مش مناسب، أو المنيو مش بيلاقي طلب حقيقي في المنطقة، فالحل مش تحسينات صغيرة. لازم إعادة نظر في المفهوم ككل، وده قرار لازم ياخده صاحب المشروع بعد تشخيص دقيق، مش بناءً على إحساس.

## هنا بيبقى دور التشخيص الاحترافي

الفرق بين مطعم بيتعافى ومطعم بيقفل غالبًا هو سرعة اكتشاف المشكلة الحقيقية. كل يوم بيعدي من غير تشخيص دقيق هو يوم بيكبّر الخسارة، وتشخيص خارجي محايد بيشوف حاجات كتير صاحب المطعم مبقاش شايفها من كتر قربه من المشكلة.`,
      en: `A restaurant losing money doesn't have to mean it's headed for closure. Usually there's one or two specific causes dragging profit down — the problem is owners feel the loss before they know exactly where it's coming from.

## Before any decision: separate the symptom from the cause

Declining sales is a symptom, not a cause. The cause could be a new nearby competitor, a drop in food quality, slow service, wrong pricing, or simply a location that no longer fits the market around it. Without pinning down the real cause, every decision you make is a guess.

## Where diagnosis should start

- Review actual food cost and labor cost against healthy benchmarks, and identify any untracked waste or leakage.
- Review revenue by time (lunch or dinner) and day, to pinpoint exactly where the weakness is.
- Review reviews on Google and delivery apps — service is usually the most repeated word in complaints, not food.
- Review staff turnover and training levels — high turnover hurts service quality before it shows up in any financial number.

## Warning signs to take seriously

- Food cost rising with no corresponding change to the menu or prices.
- Inventory disappearing with no clear explanation.
- Customers visibly returning less often than before.
- Management not looking at the numbers weekly, only discovering the problem at month's end.

## Recovery starts with small decisions before big ones

Before considering a full menu overhaul or redesigning the space — both expensive decisions — start with what doesn't require major investment: tightening scheduling, reviewing the profitability of each menu item, and quick staff training on core service points.

## When does the right call become a full restructuring?

If the problem isn't in the operational details but in the concept itself — the location no longer fits, or the menu doesn't match real demand in the area — small improvements aren't the fix. The whole concept needs to be reconsidered, and that's a decision the owner should make after an accurate diagnosis, not a feeling.

## This is exactly where professional diagnosis earns its value

The difference between a restaurant that recovers and one that closes usually comes down to how fast the real problem is found. Every day that passes without an accurate diagnosis is a day that grows the loss — and an outside, neutral diagnosis often sees things the owner has stopped seeing, simply from being too close to the problem.`,
    },
  },
  {
    slug: "restaurant-customer-experience-why-it-matters",
    title: {
      ar: "تجربة العميل في المطاعم: ليه بترجّع الزباين أكتر من طعم الأكل نفسه",
      en: "Restaurant Customer Experience: Why It Brings Customers Back More Than the Food Itself",
    },
    excerpt: {
      ar: "تفتكر السبب الأول اللي بيخلي عميل يرجع لمطعم تاني هو طعم الأكل؟ في الغالب لأ. تجربة الخدمة بتفرق أكتر مما بتتخيل.",
      en: "Think the number one reason a customer comes back to a restaurant is the taste of the food? Usually not. The service experience matters more than you'd expect.",
    },
    category: { ar: "تجربة العميل وجودة الخدمة", en: "Customer Experience & Service Quality" },
    tags: ["تجربة العميل في المطاعم", "جودة الخدمة", "ولاء العملاء", "تقييمات جوجل للمطاعم"],
    author: "بيت المطاعم",
    publishedAt: "2026-09-15",
    readingMinutes: 7,
    relatedServiceSlug: "restaurant-operations",
    content: {
      ar: `تفتكر السبب الأول اللي بيخلي عميل يرجع لمطعم تاني هو طعم الأكل؟ في الغالب لأ. تجربة الخدمة بتفرق أكتر مما بتتخيل، وغالبًا بتبقى السبب الحقيقي وراء رجوع العميل أو عدم رجوعه تاني.

## إيه اللي بيفرق فعليًا في تجربة العميل؟

- سرعة الاستقبال والجلوس من أول لحظة يدخل فيها العميل.
- دقة الطلب ومطابقته لما اتطلب فعليًا، من غير أخطاء متكررة.
- سرعة تقديم الطلب بما يتناسب مع نوع المطعم، سريع لكن مش على حساب الجودة.
- تعامل الطاقم مع العميل، خصوصًا في التعامل مع أي مشكلة أو شكوى.

## ليه رأي العميل الواحد بقى بيوصل لناس كتير

دراسات دولية بتشاور إن أغلب الزباين بيقروا التقييمات على الإنترنت قبل ما يختاروا مطعم، وإن كلمة "الخدمة" من أكتر الكلمات اللي بتتكرر في التقييمات السلبية، مش الأكل نفسه. وتجربة سلبية واحدة كفيلة إنها تخلي نسبة كبيرة من العملاء ميرجعوش تاني، حتى لو كان الأكل كويس.

## الشكوى مش نهاية العالم، لو اتعاملت معاها صح

إزاي بتتعامل مع الشكوى بيفرق أكتر من حصول الشكوى نفسها. اعتراف سريع بالمشكلة، حل عملي، ومتابعة بعدين، ده غالبًا بيحول عميل غضبان لعميل بيرجع تاني ويكون أكتر ولاءً من عميل ماحصلش معاه أي مشكلة من الأساس.

## تفاصيل صغيرة بتعمل فرق كبير

- تذكر اسم العميل المتكرر أو طلبه المعتاد.
- إضافة بسيطة مجانية في مناسبة معينة.
- سؤال بسيط عن رأي العميل قبل ما يمشي، بدل ما تنتظر يكتب تقييم سلبي على الإنترنت.

## قياس تجربة العميل مش حاجة تحس بيها بس

زي أي رقم تاني في التشغيل، تجربة العميل لازم تتقاس: متابعة تقييمات جوجل وتطبيقات التوصيل بشكل دوري، مراجعة شكاوى الطاقم المتكررة مش بس الشكاوى الرسمية، وقياس نسبة العملاء اللي بيرجعوا خلال فترة زمنية محددة.

## الخدمة جزء من الهوية، مش تفصيلة إضافية

في سوق فيه منافسة كبيرة زي قطاع المطاعم في السعودية، الأكل الكويس بقى شرط أساسي مش ميزة تنافسية. اللي بيفرق فعليًا بين مطعم وتاني بقى غالبًا هو تجربة الزيارة ككل، من أول لحظة دخول للحظة الخروج.`,
      en: `Think the number one reason a customer comes back to a restaurant is the taste of the food? Usually not. The service experience matters more than you'd expect, and it's often the real reason a customer returns — or doesn't.

## What actually shapes the customer experience?

- How quickly guests are greeted and seated from the moment they walk in.
- Order accuracy — matching what was actually ordered, without repeated mistakes.
- How quickly the order arrives, in a way that fits the restaurant's concept: fast, but not at the expense of quality.
- How staff handle the customer, especially when handling any problem or complaint.

## Why one customer's opinion now reaches so many others

International studies suggest most diners read online reviews before choosing a restaurant, and that "service" is one of the most repeated words in negative reviews — not the food itself. A single negative experience is often enough to keep a large share of customers from returning, even when the food was good.

## A complaint isn't the end of the world, if handled right

How you handle a complaint matters more than the complaint happening in the first place. A quick acknowledgment of the problem, a practical fix, and a follow-up usually turns an upset customer into a returning one — often more loyal than a customer who never had a problem at all.

## Small details that make a big difference

- Remembering a repeat customer's name or usual order.
- A small complimentary addition for a particular occasion.
- Asking a simple question about the customer's experience before they leave, instead of waiting for them to post a negative review online.

## Measuring customer experience isn't just a feeling

Like any other operational number, customer experience needs to be measured: tracking Google and delivery-app reviews regularly, reviewing recurring staff complaints — not just formal ones — and measuring the share of customers who return within a defined period.

## Service is part of the identity, not an extra detail

In a market as competitive as Saudi Arabia's restaurant sector, good food has become a baseline requirement, not a competitive edge. What actually differentiates one restaurant from another is usually the whole visit experience, from the moment a guest walks in to the moment they leave.`,
    },
  },
  {
    slug: "restaurant-digital-marketing-saudi-arabia",
    title: {
      ar: "التسويق الإلكتروني للمطاعم في السعودية: من فين تبدأ فعليًا؟",
      en: "Digital Marketing for Restaurants in Saudi Arabia: Where Do You Actually Start?",
    },
    excerpt: {
      ar: "كتير من أصحاب المطاعم بيدخلوا يجربوا كل حاجة مرة واحدة من غير خطة، والنتيجة ميزانية بتتصرف من غير رجوع واضح.",
      en: "Many owners jump into trying every channel at once with no plan — the result is a budget spent with no clear return.",
    },
    category: { ar: "التسويق الإلكتروني", en: "Digital Marketing" },
    tags: ["تسويق مطاعم", "التسويق الإلكتروني للمطاعم", "جوجل بزنس بروفايل للمطاعم", "سوشيال ميديا للمطاعم"],
    author: "بيت المطاعم",
    publishedAt: "2026-09-16",
    readingMinutes: 8,
    relatedServiceSlug: "restaurant-marketing",
    content: {
      ar: `كتير من أصحاب المطاعم بيسألوا "أبدأ بإيه في التسويق؟" وبيدخلوا يجربوا كل حاجة مرة واحدة من غير خطة، والنتيجة ميزانية بتتصرف من غير رجوع واضح. التسويق الإلكتروني للمطاعم مش سباق إعلانات، هو ترتيب أولويات.

## الخطوة الأولى: ملفك على جوجل قبل أي حاجة تانية

قبل ما تفكر في إعلانات مدفوعة، لازم ملفك على خرائط جوجل (Google Business Profile) يكون جاهز ودقيق: العنوان صحيح، أوقات العمل محدثة، صور حقيقية للمكان والأكل، ورد على التقييمات الإيجابية والسلبية على حد سواء. أغلب اللي بيدوروا على "مطعم قريب مني" بيشوفوا الخرائط قبل أي منصة تانية.

## السوشيال ميديا: مش كل منصة بنفس الأهمية

- واتساب للتواصل المباشر مع العملاء، الحجوزات، وتأكيد الطلبات.
- سناب شات وانستجرام لمحتوى بصري قصير بيعرض الأكل والأجواء.
- تيك توك ويوتيوب شورتس لمحتوى خلف الكواليس والتحضير، وده نوع محتوى بيحقق تفاعل عالي في قطاع المطاعم تحديدًا.

مش شرط تكون موجود بقوة في كل منصة من الأول، الأهم إنك تختار المنصة اللي جمهورك فعلًا موجود فيها وتنتظم عليها، بدل ما تتوزع على الكل بشكل سطحي.

## تطبيقات التوصيل جزء من التسويق، مش بس قناة بيع

ترتيبك وتقييمك على تطبيقات التوصيل بيأثر على ظهورك للعملاء الجدد، مش بس على المبيعات المباشرة من التطبيق نفسه. صور المنتج وسرعة الاستجابة للطلبات بيأثروا على ترتيبك داخل التطبيق زيه زي أي قناة تسويقية تانية.

## المؤثرين: اختيار صح أهم من عدد المتابعين

التعاون مع مؤثر صغير أو متوسط بجمهور حقيقي ومهتم بالطعام غالبًا بيجيب نتيجة أفضل من مؤثر بمتابعين كتير لكن جمهور عام مش مهتم بالضرورة بالمطاعم. اسأل عن نسبة التفاعل الحقيقي قبل عدد المتابعين.

## الإعلانات المدفوعة: تيجي بعد الأساسيات مش قبلها

إعلانات جوجل أو السوشيال ميديا من غير ملف جوجل بزنس مضبوط أو حضور سوشيال بسيط هتجيب زوار لصفحة مش جاهزة تقنعهم، وده بيضيع الميزانية من غير فايدة حقيقية. الترتيب الصح: الأساسيات الأول، وبعدين الإعلانات لتضخيم اللي شغال أصلًا.

## قيس، متفترضش

تابع من فين بييجي العميل فعليًا: جوجل، سوشيال ميديا، تطبيق توصيل، ولا توصية شخصية، قبل ما تزوّد ميزانية أي قناة. القرار التسويقي الصح مبني على رقم حقيقي، مش على إحساس إن منصة معينة "شغالة أكتر" من غيرها.`,
      en: `Many restaurant owners ask "where do I start with marketing?" and jump into trying everything at once with no plan — the result is a budget spent with no clear return. Digital marketing for restaurants isn't an advertising race, it's about setting priorities.

## Step one: your Google profile before anything else

Before thinking about paid ads, your Google Business Profile needs to be ready and accurate: correct address, updated hours, real photos of the place and the food, and replies to reviews — both positive and negative. Most people searching "restaurant near me" check Maps before any other platform.

## Social media: not every platform matters equally

- WhatsApp for direct customer communication, reservations, and order confirmations.
- Snapchat and Instagram for short visual content showing the food and atmosphere.
- TikTok and YouTube Shorts for behind-the-scenes and preparation content — a format that drives particularly high engagement in the restaurant sector.

You don't need a strong presence on every platform from day one. What matters more is picking the platform where your audience actually is and staying consistent on it, rather than spreading thin across all of them.

## Delivery apps are part of marketing, not just a sales channel

Your ranking and rating on delivery apps affect your visibility to new customers, not just direct sales through the app itself. Product photos and response speed to orders affect your in-app ranking just like any other marketing channel.

## Influencers: the right choice matters more than follower count

Working with a small or mid-sized influencer with a real, food-interested audience usually delivers better results than a big-name influencer with a large but generic audience not necessarily interested in restaurants. Ask about real engagement rate before follower count.

## Paid ads come after the basics, not before them

Google or social media ads without a properly set-up Google Business Profile or a basic social presence will send visitors to a page that isn't ready to convert them — wasting budget with no real return. The right order: basics first, then ads to amplify what's already working.

## Measure, don't assume

Track where customers are actually coming from — Google, social media, a delivery app, or a personal recommendation — before increasing any channel's budget. The right marketing decision is grounded in a real number, not a feeling that a certain platform is "working better."`,
    },
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return POSTS.find((p) => p.slug === slug);
}
