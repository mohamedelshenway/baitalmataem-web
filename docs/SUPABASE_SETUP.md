# خطة ربط قاعدة البيانات (Supabase) — المرحلة القادمة

هذا الملف يوثّق الخطوة التقنية التالية بعد المراجعة البصرية للنسخة الحالية: ربط الموقع بقاعدة بيانات حقيقية بدل بيانات `src/lib/data/*.ts` الثابتة.

## لماذا Supabase؟

اقتراح الاستراتيجية الأصلي كان "Supabase أو ما يشابهه دون تعقيد تقني لا يحتاجه الـ MVP". Supabase مناسب لأنه يوفر معًا: قاعدة بيانات Postgres، تخزين ملفات (للصور والفيديو)، ونظام مصادقة (لاحقًا لحسابات المستخدمين ولوحة الإدارة) — بدون حاجة لتشغيل خوادم منفصلة.

## الجداول المقترحة (تصميم أولي، قابل للتعديل)

### `listings`
يقابل حرفيًا واجهة `Listing` في `src/lib/types.ts`: slug, kind, status, moderation_status, title_ar, title_en, summary_ar, summary_en, description_ar, description_en, city_ar, city_en, area_ar, area_en, activity_type_ar, activity_type_en, price_sar, rent_sar, size_sqm, seating_capacity, openings, operating_state, equipment_summary_ar/en, kitchen_summary_ar/en, parking_available, views, created_at, submitted_by_name, submitted_by_phone, submitted_by_city, internal_notes (نص حر يظهر للإدارة فقط، غير معروض في الواجهة العامة — تلبية لمتطلب "ملاحظات داخلية").

**قاعدة أساسية غير قابلة للتفاوض**: أي سجل جديد يُنشأ بواسطة نموذج "اعرض فرصتك" يجب أن يبدأ دائمًا بـ `moderation_status = 'pending'`. لا يوجد مسار برمجي ينشر مباشرة.

### `listing_media`
listing_id (foreign key), type (image/video), storage_path (في Supabase Storage)، is_cover, duration_seconds (للفيديو، يُتحقق أنه ≤ 30 عند الرفع أيضًا من طرف الخادم لا الواجهة فقط)، sort_order.

### `leads`
id, source_type (contact_form / listing_viewing_request / listing_contact / listing_evaluation_request / newsletter لاحقًا)، source_listing_id (nullable)، name, phone, city, message, funnel_stage (استفسار / تم التواصل / معاينة / تفاوض / إغلاق — مطابقة لمراحل CRM في وثيقة الاستراتيجية)، created_at.

### `blog_posts`
slug, title_ar/en, excerpt_ar/en, content_ar/en (Markdown أو HTML مبسّط)، category_ar/en, tags (array)، author, published_at, status (draft/published)، related_service_slug, featured_image_path, meta_title_ar/en, meta_description_ar/en.

### `services`
اختياري في هذه المرحلة — المحتوى الحالي مُدار عبر ملفات الترجمة لأنه شبه ثابت (11 خدمة فقط). يُنقل لقاعدة بيانات فقط إذا احتجتم تعديله بشكل متكرر من لوحة الإدارة دون نشر كود جديد.

## خطوات الربط (بالترتيب)

1. إنشاء مشروع Supabase وربط متغيرات البيئة في `.env` (القيم موجودة فارغة بالفعل في `.env.example`).
2. إنشاء الجداول أعلاه عبر SQL Editor أو Supabase CLI migrations.
3. تفعيل Row Level Security (RLS): القراءة العامة مسموحة فقط للسجلات بحالة `moderation_status = 'approved'` (للفرص) أو `status = 'published'` (للمقالات). الكتابة والتعديل محصورة على مستخدم لوحة الإدارة بعد ربط المصادقة.
4. استبدال المصفوفات الثابتة في `src/lib/data/listings.ts` و `src/lib/data/posts.ts` باستدعاءات فعلية لـ Supabase (`@supabase/supabase-js` أو `@supabase/ssr` لأنماط Server Components في Next.js).
5. تحديث `src/app/api/listings/route.ts` ليكتب فعليًا في جدول `listings` (وليس فقط يستقبل البيانات دون تخزين كما هو الحال الآن).
6. رفع الصور/الفيديو إلى Supabase Storage بدل `URL.createObjectURL` المستخدم حاليًا للمعاينة المحلية فقط في المتصفح.
7. بناء تسجيل دخول فعلي للوحة الإدارة (Supabase Auth) بدل أزرار المعاينة غير الفعّالة الحالية في `/admin`.
8. ربط لوحة الإدارة بعمليات فعلية: موافقة/رفض/طلب تعديل تُحدّث `moderation_status` مباشرة في قاعدة البيانات.

## ما لا يجب فعله في هذه المرحلة

عدم إضافة تعقيد غير ضروري: لا حاجة لخادم منفصل، لا حاجة لـ ORM ثقيل، ولا حاجة لبناء نظام صلاحيات متعدد المستويات قبل وجود أكثر من مستخدم إداري واحد فعليًا.
