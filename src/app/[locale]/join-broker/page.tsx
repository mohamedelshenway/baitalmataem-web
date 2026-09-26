import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { SITE, HAS_WHATSAPP, whatsappLink } from "@/lib/constants";
import { Button, GoldDivider } from "@/components/ui";
import BrokerForm from "./broker-form";

// الصفحة بالعربي بس حاليًا (الجمهور المستهدف وسطاء داخل المملكة)، فالنسخ التانية
// بتاخد noindex وcanonical على النسخة العربية بدل ما تبقى صفحات مكررة.
const AVAILABLE: readonly Locale[] = ["ar"];

const TITLE = "انضم كوسيط متعاون مع بيت المطاعم";
const DESCRIPTION =
  "سجّل كوسيط متعاون مع بيت المطاعم في بيع وتقبيل المطاعم وتأجير المحلات التجارية في السعودية. نسوّق فرصك باحتراف، ونؤهل المشترين، ونتابع الصفقة حتى الإغلاق.";

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  if (!isLocale(params.locale)) return {};
  return buildMetadata({
    title: TITLE,
    description: DESCRIPTION,
    locale: params.locale,
    path: "/join-broker",
    availableLocales: AVAILABLE,
    keywords: ["وسيط مطاعم", "وسيط عقاري", "تقبيل مطاعم", "العمل كوسيط", "شراكة وساطة", "بيت المطاعم"],
  });
}

const BENEFITS = [
  {
    title: "تسويق احترافي لفرصك",
    body: "نعرض الفرصة في سوق الفرص وعلى منصات بيت المطاعم بمعلومات منظمة تجذب المشتري المناسب، باسم بيت المطاعم.",
  },
  {
    title: "مشترون ومستثمرون مؤهلون",
    body: "نتواصل مع قاعدة عملاء من أصحاب المطاعم والمستثمرين، ونتحقق من جدية العميل وميزانيته قبل ترتيب أي معاينة.",
  },
  {
    title: "إدارة الصفقة حتى الإغلاق",
    body: "نتولى التنسيق والتفاوض والمتابعة، ويمكن للمشتري طلب تقييم مستقل للفرصة، ما يرفع الثقة ويسرّع القرار.",
  },
  {
    title: "اتفاق واضح ومكتوب",
    body: "نصيبك من العمولة يُتفق عليه كتابيًا قبل العمل على أي صفقة، حتى لا يكون هناك خلاف عند الإغلاق.",
  },
];

const AUDIENCE = [
  { title: "وسيط فرد", body: "تعرف مطاعم أو محلات معروضة في حيّك أو مدينتك، وتبحث عن جهة تسوّقها باحتراف." },
  { title: "مكتب عقاري", body: "لديك محلات ومواقع تجارية مناسبة للمطاعم والكافيهات، وتريد الوصول لمستأجرين ومستثمرين من القطاع." },
  { title: "صاحب علاقات في القطاع", body: "تعمل في قطاع المطاعم (موردين، تجهيزات، تشغيل) وتصلك فرص بيع أو تقبيل أو مستثمرون يبحثون." },
];

const FAQ = [
  {
    q: "هل التسجيل مجاني؟",
    a: "نعم، التسجيل مجاني ولا يترتب عليه أي التزام. بعد التسجيل نتواصل معك للتعارف والاتفاق على آلية العمل قبل أي تعاون فعلي.",
  },
  {
    q: "كيف تُحسب عمولتي؟",
    a: "نصيب الوسيط يُتفق عليه كتابيًا مع بيت المطاعم قبل العمل على أي صفقة، ويعتمد على طبيعة الصفقة ودورك فيها (جلب البائع، أو المشتري، أو الاثنين). لا نبدأ العمل على فرصة قبل وضوح هذا الاتفاق.",
  },
  {
    q: "هل تظهر بياناتي أو اسمي على الموقع؟",
    a: "لا. بيانات الوسطاء داخلية فقط، والفرص تُعرض على الموقع باسم بيت المطاعم، ويكون التواصل مع العملاء من خلالنا.",
  },
  {
    q: "هل أحتاج ترخيص فال؟",
    a: "الوساطة العقارية في المملكة تخضع لتنظيم الهيئة العامة للعقار. إن كان لديك ترخيص فال فأضف رقمه في النموذج، وسنوضح لك عند التواصل ما يلزم حسب نوع الفرص التي تعمل عليها.",
  },
  {
    q: "هل يمكنني العمل في أكثر من مدينة؟",
    a: "نعم. حدّد في النموذج مدينتك والمناطق التي تغطيها، ويمكنك إضافة أي مناطق أخرى تعمل بها.",
  },
  {
    q: "ماذا يحدث بعد إرسال الطلب؟",
    a: "يراجع فريق بيت المطاعم بياناتك، ثم نتواصل معك عبر الجوال أو واتساب لترتيب مكالمة تعارف والاتفاق على آلية العمل.",
  },
];

const STEPS = [
  "سجّل بياناتك عبر النموذج أدناه.",
  "نتواصل معك لمكالمة تعارف ونتفق على آلية العمل والعمولة.",
  "ترسل الفرص أو العملاء المتاحين لديك، ونراجعها قبل التسويق.",
  "نسوّق وندير الصفقة معك حتى الإغلاق، وتستلم نصيبك حسب الاتفاق.",
];

export default async function JoinBrokerPage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale as Locale;
  const dict = await getDictionary(locale);

  const breadcrumb = breadcrumbJsonLd([
    { name: dict.nav.home, url: `${SITE.url}/${locale}` },
    { name: dict.joinUs.pageTitle, url: `${SITE.url}/${locale}/join-us` },
    { name: TITLE, url: `${SITE.url}/${locale}/join-broker` },
  ]);

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const waHref = HAS_WHATSAPP ? whatsappLink("مرحبًا، أرغب في الاستفسار عن الانضمام كوسيط متعاون مع بيت المطاعم") : null;

  return (
    <section className="py-12 sm:py-14" dir="rtl" lang="ar">
      <div className="container-page max-w-3xl">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
        <p className="eyebrow mb-3">بيت المطاعم | شبكة الوسطاء</p>
        <h1 className="mb-4 text-2xl font-bold leading-tight text-ink-900 sm:text-3xl">{TITLE}</h1>
        <p className="mb-6 text-lg leading-8 text-ink-600">
          لديك مطاعم معروضة للبيع أو التقبيل، أو محلات تجارية للإيجار، أو علاقات مع مستثمرين؟
          انضم إلى شبكة الوسطاء المتعاونين مع بيت المطاعم، ودعنا نعمل معًا على إتمام صفقات أكثر وبجودة أعلى.
        </p>
        <div className="mb-12 flex flex-wrap gap-3">
          <Button href="#broker-form" variant="primary" arrow>
            سجّل الآن
          </Button>
          {waHref && (
            <Button href={waHref} variant="outline" target="_blank">
              استفسر عبر واتساب
            </Button>
          )}
        </div>

        <h2 className="mb-4 text-xl font-bold text-ink-900">لمن هذه الشراكة؟</h2>
        <div className="mb-12 grid gap-4 sm:grid-cols-3">
          {AUDIENCE.map((a) => (
            <div key={a.title} className="rounded-card border border-sand-200 bg-sand-50 p-5">
              <h3 className="mb-2 font-bold text-ink-900">{a.title}</h3>
              <p className="text-sm leading-7 text-ink-600">{a.body}</p>
            </div>
          ))}
        </div>

        <h2 className="mb-4 text-xl font-bold text-ink-900">ماذا يقدم لك بيت المطاعم؟</h2>

        <div className="mb-10 grid gap-4 sm:grid-cols-2">
          {BENEFITS.map((b) => (
            <div key={b.title} className="rounded-card border border-sand-200 bg-white p-5 shadow-subtle">
              <h3 className="mb-2 font-bold text-ink-900">{b.title}</h3>
              <p className="text-sm leading-7 text-ink-600">{b.body}</p>
            </div>
          ))}
        </div>

        <h2 className="mb-4 text-xl font-bold text-ink-900">كيف نعمل معًا؟</h2>
        <ol className="mb-10 space-y-3">
          {STEPS.map((s, i) => (
            <li key={i} className="flex items-start gap-3 text-ink-700">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-ember-600 text-sm font-bold text-white">
                {i + 1}
              </span>
              <span className="pt-0.5 leading-7">{s}</span>
            </li>
          ))}
        </ol>

        <GoldDivider className="my-10" />

        <div id="broker-form" className="scroll-mt-24">
          <h2 className="mb-2 text-xl font-bold text-ink-900">نموذج التسجيل</h2>
          <p className="mb-6 text-sm text-ink-600">الحقول المعلّمة بـ * مطلوبة. بياناتك لا تُنشر على الموقع وتُستخدم للتواصل معك فقط.</p>
          <BrokerForm whatsappHref={waHref} />
        </div>

        <GoldDivider className="my-12" />

        <h2 className="mb-4 text-xl font-bold text-ink-900">أسئلة شائعة</h2>
        <div className="space-y-3">
          {FAQ.map((f) => (
            <details key={f.q} className="group rounded-card border border-sand-200 bg-white p-5 shadow-subtle">
              <summary className="cursor-pointer list-none font-semibold text-ink-900 marker:hidden">
                <span className="flex items-center justify-between gap-3">
                  {f.q}
                  <span aria-hidden className="text-ember-600 transition group-open:rotate-45">+</span>
                </span>
              </summary>
              <p className="mt-3 leading-7 text-ink-600">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
