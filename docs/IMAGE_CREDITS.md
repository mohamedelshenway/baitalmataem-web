# مصادر الصور وترخيصها

آخر مراجعة: 30 أغسطس 2026

تُستخدم الصور التالية في الأقسام التعريفية والخدمية فقط. لا تُستخدم أيٌّ منها كصورة لإعلان في سوق فرص التقبيل؛ صور الإعلانات يجب أن تأتي حصريًا من صاحب الإعلان وتخضع للمراجعة قبل النشر.

## الترخيص

- المصدر: [Pexels](https://www.pexels.com/)
- الترخيص: [Pexels License](https://www.pexels.com/license/)
- يسمح الترخيص بالاستخدام المجاني التجاري وغير التجاري والتعديل دون اشتراط نسب الصورة، مع منع الإيحاء بتأييد الأشخاص أو العلامات الظاهرة للمنتج أو الخدمة. أضفنا النسب هنا للشفافية وسهولة المراجعة.
- صور الأشخاص مُعرّفة داخل الواجهة على أنها صور توضيحية مرخصة، ولا تمثل موظفي أو شركاء بيت المطاعم.

## الصور المستخدمة

| الملف/الموضوع | المصوّر | صفحة المصدر | الاستخدام داخل الموقع |
|---|---|---|---|
| `restaurant-interior` — مطعم حديث | Sonny Sixteen | [Pexels #29222614](https://www.pexels.com/photo/modern-empty-restaurant-interior-with-dim-lighting-29222614/) | Hero، الوساطة وفرص الاستثمار التعريفية |
| `commercial-kitchen` — مطبخ تجاري | Bruno Makori | [Pexels #28704740](https://www.pexels.com/photo/commercial-kitchen-with-stainless-steel-equipment-28704740/) | تطوير المطاعم وإدارة الهدر |
| `operations-team` — فريق تشغيل | KÜBRA TOKUR | [Pexels #15441279](https://www.pexels.com/photo/people-working-in-restaurant-kitchen-15441279/) | التشغيل والإدارة وقسم الخبرات (صورة توضيحية) |
| `management-meeting` — إدارة وتحليل | Vlada Karpovich | [Pexels #7433838](https://www.pexels.com/photo/people-having-a-meeting-7433838/) | التقييم والاستشارات |
| `restaurant-equipment` — تجهيزات | Skylar Kang | [Pexels #6375558](https://www.pexels.com/photo/a-stainless-table-in-the-kitchen-6375558/) | تأسيس وتجهيز المطاعم ومحتوى التكاليف |
| `feasibility-analysis` — استثمار وجدوى | Felicity Tai | [Pexels #7964426](https://www.pexels.com/photo/woman-working-on-business-analytics-7964426/) | دراسات الجدوى وتحليل الاستثمار |
| `catering-service` — إعاشة وتقديم طعام | Natalia S | [Pexels #24863057](https://www.pexels.com/photo/food-in-serving-dishes-on-a-banquet-table-24863057/) | تطوير المنيو وخدمات الإعاشة المرتبطة |
| `restaurant-marketing` — تسويق | Darlene Alderson | [Pexels #7970812](https://www.pexels.com/photo/close-up-shot-of-a-laptop-beside-paper-documents-7970812/) | التسويق للمطاعم |

## التحسين التقني

- الملفات الأصلية محفوظة في `public/images/editorial/source/` للمراجعة وإثبات المصدر.
- النسخ المستخدمة في الواجهة موجودة في `public/images/editorial/` بصيغتي WebP وAVIF.
- لكل صورة مقاسان: `lg` ‏(1600×1000) و`md` ‏(960×600).
- `next/image` يولّد `srcset` متجاوبًا، ويضيف التحميل الكسول تلقائيًا للصور خارج الشاشة. صورة الـHero فقط تحمل بأولوية لأنها عنصر LCP.
- إعداد `images.formats` في `next.config.mjs` يفضّل AVIF ثم WebP للمتصفح الداعم.
- يمكن إعادة توليد المشتقات عبر `scripts/optimize-editorial-images.py`.
