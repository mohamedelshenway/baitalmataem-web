# نشر baitalmataem.com — خطوات دقيقة (GitHub → Vercel → الدومين)

هذا الملف مخصص للنشر الفعلي بعد التأكد من أن المشروع يعمل محليًا بدون أخطاء (`npm install && npm run dev`). لا تنتقل لهذه الخطوات قبل ذلك.

## الخطوة 1 — رفع المشروع على GitHub

```bash
cd baitalmataem-web
git init
git add .
git commit -m "النسخة الأولى (MVP) لموقع baitalmataem.com"
```

أنشئ مستودعًا جديدًا فارغًا على GitHub (بدون README أو .gitignore — المشروع فيه `.gitignore` بالفعل)، ثم:

```bash
git remote add origin https://github.com/<اسم-المستخدم>/baitalmataem-web.git
git branch -M main
git push -u origin main
```

تأكد أن ملف `.env.local` (إن أنشأته محليًا) **غير مرفوع** — `.gitignore` يستثنيه بالفعل، لكن تحقق يدويًا بـ `git status` قبل أول Push لتفادي رفع أي مفتاح حقيقي بالخطأ.

## الخطوة 2 — الاستيراد إلى Vercel

1. سجّل دخول على [vercel.com](https://vercel.com) (يفضّل بنفس حساب GitHub لسهولة الربط).
2. **Add New → Project**، ثم اختر مستودع `baitalmataem-web` من القائمة.
3. Vercel يكتشف Next.js تلقائيًا — لا تغيّر أي إعداد Build (الإعدادات الافتراضية: Build Command = `next build`، Output = تلقائي، Install Command = `npm install`) — هذا المشروع لا يحتاج أي تخصيص هنا.
4. **لا تضغط Deploy فورًا** — أضف متغيرات البيئة أولًا (الخطوة التالية)، لأن بعضها (`NEXT_PUBLIC_*`) يُبنى داخل الكود وقت الـ Build نفسه.

## الخطوة 3 — متغيرات البيئة (Environment Variables)

في شاشة إعداد المشروع (أو لاحقًا من **Settings → Environment Variables**)، أضف حسب `.env.example`:

| المتغير | مطلوب الآن؟ | ملاحظة |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | نعم | `https://baitalmataem.com` |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | مُوصى به | بصيغة دولية بدون + أو صفر، مثال: `9665XXXXXXXX`. بدونه تختفي أزرار واتساب المباشرة تلقائيًا في الموقع وتُستبدل بالبريد الإلكتروني (سلوك مقصود، راجع `src/lib/constants.ts`) |
| `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY` / `SUPABASE_SERVICE_ROLE_KEY` | لا، ليس الآن | تُضاف في المرحلة الثانية فقط (راجع `docs/SUPABASE_SETUP.md`) — لا تضع فيها قيمًا وهمية |
| `NEXT_PUBLIC_GA4_MEASUREMENT_ID` / `NEXT_PUBLIC_GSC_VERIFICATION` / `NEXT_PUBLIC_CLARITY_PROJECT_ID` | اختياري | أضفها فقط بعد إنشاء الحسابات الفعلية على Google Analytics / Search Console / Clarity |

**قاعدة صارمة**: لا تضع أي قيمة placeholder أو مفتاح تجريبي مكانها — اترك المتغير فارغًا أو لا تُنشئه أصلًا حتى تحصل على القيمة الحقيقية.

اضغط **Deploy**.

## الخطوة 4 — التحقق بعد أول نشر

Vercel يعطيك رابطًا مؤقتًا مثل `baitalmataem-web.vercel.app`. افتحه وتأكد يدويًا من:
- تحميل الصفحة الرئيسية على `/ar` و `/en` بدون خطأ 500.
- عمل التنقل بين الصفحات (الخدمات، سوق الفرص، المدونة، اعرض فرصتك، تواصل معنا).
- ظهور الصور Placeholder بشكل صحيح (لا صور مكسورة).
- عمل نموذج «اعرض فرصتك» حتى شاشة النجاح، وظهور تنبيه الـMVP الأصفر بها (هذا متوقع ومقصود قبل ربط Supabase).

## الخطوة 5 — ربط دومين baitalmataem.com

1. من مشروعك في Vercel: **Settings → Domains → Add**، واكتب `baitalmataem.com`.
2. Vercel سيقترح عليك إضافة `www.baitalmataem.com` أيضًا — وافق على ذلك (يُفضَّل توجيه أحدهما للآخر تلقائيًا).
3. Vercel سيعرض لك سجلات DNS مطلوبة **خاصة بحسابك أنت** — أدخلها في لوحة تحكم الدومين لدى الجهة المسجّل عندها `baitalmataem.com` (مثل الجهة السعودية للسجل SaudiNIC أو أي Registrar آخر):
   - **للدومين الأساسي (Apex) `baitalmataem.com`**: سجل **A** يشير عادة إلى `76.76.21.21` — لكن اعتمد دائمًا على القيمة المعروضة فعليًا في لوحة Vercel وقت الإضافة، فهي قد تختلف حسب الحساب.
   - **للنطاق الفرعي `www.baitalmataem.com`**: سجل **CNAME** بقيمة فريدة يعرضها لك Vercel لكل مشروع (مثل `xxxxxxxxxxxx.vercel-dns-XXX.com`) — انسخها كما هي من لوحتك، لا تستخدم قيمة عامة من مصدر آخر.
4. انتظر انتشار DNS (عادة دقائق، وأحيانًا حتى 24-48 ساعة حسب مزوّد الدومين). Vercel يحدّث حالة الدومين تلقائيًا من "Invalid Configuration" إلى "Valid Configuration" فور اكتشاف السجلات الصحيحة.
5. Vercel يصدر شهادة SSL (HTTPS) تلقائيًا بعد التحقق — لا حاجة لأي إجراء يدوي إضافي.

## بعد النشر: SEO

بمجرد أن يعمل `https://baitalmataem.com` فعليًا:
1. أضف الموقع في **Google Search Console** (Domain property أو URL prefix)، وتحقق من الملكية (عبر `NEXT_PUBLIC_GSC_VERIFICATION` أو DNS TXT حسب ما يعرضه Google).
2. أرسل خريطة الموقع: `https://baitalmataem.com/sitemap.xml`.
3. تأكد أن `https://baitalmataem.com/robots.txt` يظهر بشكل صحيح ويشير لخريطة الموقع.

## ما بعد ذلك

لا تربط Supabase أو تنتقل للمرحلة الثانية إلا بعد التأكد أن كل ما سبق يعمل فعليًا على الدومين الحقيقي. الخطة الكاملة للمرحلة الثانية موجودة في `docs/SUPABASE_SETUP.md`.
