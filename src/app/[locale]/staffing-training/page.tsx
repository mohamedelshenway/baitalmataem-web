import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { contentLocale, isLocale, type Locale } from "@/i18n/config";
import { buildMetadata, breadcrumbJsonLd, serviceJsonLd } from "@/lib/seo";
import { SITE } from "@/lib/constants";
import { StaffingForms } from "@/components/staffing-forms";

const CONTENT = {
  ar: {
    title: "نساعدك في التوظيف والتدريب للمطاعم والكافيهات والإعاشة",
    description: "ترشيح وفرز أفضل العمالة المتخصصة من داخل المملكة وخارجها، مع تدريب فرق التشغيل وخدمة العملاء وسلامة الغذاء.",
    kicker: "فريق أقوى، تشغيل أضبط",
    intro: "من تحديد الاحتياج والوصف الوظيفي إلى الفرز والمقابلات الأولية لمرشحين من داخل المملكة وخارجها، ومن تهيئة الموظف الجديد إلى تدريب الفريق على معايير التشغيل اليومية.",
    staffTitle: "الوظائف التي نساعدك في ترشيحها",
    staff: ["عمالة مطاعم وكافيهات", "فرق إعاشة", "شيفات وباريستا", "كاشير وويتر", "استيوارد", "مشرفون", "مديرو تشغيل"],
    hiringTitle: "دعم التوظيف",
    hiring: ["فرز المتقدمين", "مقابلات أولية", "تقييم الخبرات", "تجهيز الوصف الوظيفي", "ترتيب قائمة مرشحين مناسبة للاحتياج"],
    trainingTitle: "برامج التدريب",
    training: ["التشغيل اليومي", "خدمة العملاء", "النظافة", "سلامة الغذاء", "الجرد والهدر", "الكاشير والمبيعات", "خطط تهيئة الموظف الجديد"],
    processTitle: "كيف تبدأ؟",
    process: ["أرسل احتياجك من النموذج", "نراجع النشاط والوظائف أو نطاق التدريب", "ننسق التنفيذ مع فريقنا وشركاء النجاح المعتمدين", "تتابع حالة الطلب كـLead حتى الإغلاق"],
    partnerTitle: "تنفيذ بخبرات متخصصة",
    partnerText: "نربط الاحتياج عند الحاجة بمتخصصين تمت مراجعتهم ضمن شبكة شركاء النجاح، ولا يُعرض أي شخص كشريك معتمد قبل الموافقة عليه.",
    partnerCta: "تعرف على شركاء النجاح",
    staffingCta: "اطلب موظفين",
    trainingCta: "اطلب تدريب فريقك",
    parttimeCta: "اعمل مع فريقنا بدوام جزئي",
  },
  en: {
    title: "Restaurant staffing and team training",
    description: "Restaurant candidate sourcing, screening, onboarding and practical operations training across Saudi Arabia.",
    kicker: "Stronger teams, better operations",
    intro: "From workforce planning and job descriptions to initial interviews, onboarding plans and practical daily operations training.",
    staffTitle: "Roles we help source",
    staff: ["Restaurant crew", "Chefs", "Cashiers", "Waiters", "Stewards", "Supervisors", "Restaurant managers"],
    hiringTitle: "Recruitment support",
    hiring: ["Candidate screening", "Initial interviews", "Experience assessment", "Job descriptions", "Shortlists aligned to the requirement"],
    trainingTitle: "Training programs",
    training: ["Daily operations", "Customer service", "Hygiene", "Food safety", "Inventory and waste", "Cashier and sales", "New-hire onboarding plans"],
    processTitle: "How it works",
    process: ["Send the request form", "We review the concept and staffing or training scope", "We coordinate delivery with our team and approved success partners", "The request is tracked as a lead through completion"],
    partnerTitle: "Delivery by relevant specialists",
    partnerText: "When needed, we match the requirement with reviewed specialists in our Success Partners network. Nobody is presented as approved before review.",
    partnerCta: "Explore Success Partners",
    staffingCta: "Request staff",
    trainingCta: "Request team training",
    parttimeCta: "Join our team part-time",
  },
} as const;

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  if (!isLocale(params.locale)) return {};
  const copy = CONTENT[contentLocale(params.locale)];
  return buildMetadata({
    title: copy.title,
    description: copy.description,
    locale: params.locale,
    path: "/staffing-training",
    keywords: params.locale === "ar"
      ? ["توظيف مطاعم", "تدريب موظفي المطاعم", "شيفات", "كاشير مطاعم", "تدريب سلامة الغذاء", "مدير مطعم"]
      : ["restaurant staffing Saudi Arabia", "restaurant team training", "chef recruitment"],
    ogImagePath: "/images/editorial/operations-team-lg.webp",
  });
}

export default function StaffingTrainingPage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale as Locale;
  const copy = CONTENT[contentLocale(locale)];
  const url = `${SITE.url}/${locale}/staffing-training`;
  const breadcrumb = breadcrumbJsonLd([
    { name: locale === "ar" ? "الرئيسية" : "Home", url: `${SITE.url}/${locale}` },
    { name: copy.title, url },
  ]);
  const service = serviceJsonLd({ name: copy.title, description: copy.description, url, serviceType: [...copy.staff, ...copy.training] });

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(service) }} />
      <section className="relative overflow-hidden bg-ink-950 py-16 text-white sm:py-24">
        <Image src="/images/editorial/operations-team-lg.webp" alt={locale === "ar" ? "فريق مطعم أثناء تدريب التشغيل" : "Restaurant operations team training"} fill priority sizes="100vw" className="object-cover opacity-35" style={{ objectPosition: "center 58%" }} />
        <div className="absolute inset-0 bg-gradient-to-l from-ink-950 via-ink-950/90 to-ember-950/75" />
        <div className="container-page relative max-w-4xl">
          <p className="eyebrow mb-4 text-gold-500">{copy.kicker}</p>
          <h1 className="max-w-3xl text-3xl font-bold leading-tight sm:text-5xl">{copy.title}</h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-white/75 sm:text-lg">{copy.intro}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href="#request-forms" className="focus-ring rounded-btn bg-ember-600 px-6 py-3.5 text-center text-sm font-bold text-white hover:bg-ember-700">{copy.staffingCta}</a>
            <a href="#request-forms" className="focus-ring rounded-btn border border-white/25 bg-white/10 px-6 py-3.5 text-center text-sm font-bold text-white hover:bg-white/15">{copy.trainingCta}</a>
            <a href="#request-forms" className="focus-ring rounded-btn border border-gold-400/60 bg-gold-500 px-6 py-3.5 text-center text-sm font-bold text-ink-950 hover:bg-gold-400">{copy.parttimeCta}</a>
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-20">
        <div className="container-page grid gap-6 lg:grid-cols-3">
          <InfoCard title={copy.staffTitle} items={copy.staff} />
          <InfoCard title={copy.hiringTitle} items={copy.hiring} />
          <InfoCard title={copy.trainingTitle} items={copy.training} />
        </div>
      </section>

      <section className="bg-sand-50 py-14 sm:py-20">
        <div className="container-page grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <h2 className="text-2xl font-bold text-ink-950 sm:text-3xl">{copy.processTitle}</h2>
            <ol className="mt-7 space-y-4">
              {copy.process.map((step, index) => <li key={step} className="flex gap-3 text-sm leading-7 text-ink-700"><span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-ink-950 font-bold text-gold-400">{index + 1}</span><span>{step}</span></li>)}
            </ol>
            <div className="relative mt-8 aspect-[16/10] overflow-hidden rounded-cardLg">
              <Image src="/images/editorial/commercial-kitchen-lg.webp" alt={locale === "ar" ? "تدريب فريق مطبخ تجاري" : "Commercial kitchen team training"} fill sizes="(min-width: 1024px) 42vw, 100vw" className="object-cover" />
            </div>
          </div>
          <StaffingForms locale={locale} />
        </div>
      </section>

      <section className="py-14 sm:py-20">
        <div className="container-page grid overflow-hidden rounded-cardLg bg-ember-800 text-white lg:grid-cols-[1fr_0.75fr]">
          <div className="p-7 sm:p-12">
            <h2 className="text-2xl font-bold">{copy.partnerTitle}</h2>
            <p className="mt-4 max-w-2xl leading-8 text-white/75">{copy.partnerText}</p>
            <Link href={`/${locale}/partners`} className="focus-ring mt-7 inline-flex rounded-btn bg-gold-500 px-6 py-3 text-sm font-bold text-ink-950 hover:bg-gold-400">{copy.partnerCta}</Link>
          </div>
          <div className="relative min-h-[260px]">
            <Image src="/images/editorial/management-meeting-lg.webp" alt={locale === "ar" ? "مقابلة وتقييم مرشحين لقطاع المطاعم" : "Restaurant candidate assessment meeting"} fill sizes="(min-width: 1024px) 35vw, 100vw" className="object-cover" />
          </div>
        </div>
      </section>
    </>
  );
}

function InfoCard({ title, items }: { title: string; items: readonly string[] }) {
  return <article className="rounded-card border border-sand-200 bg-white p-6 shadow-subtle"><h2 className="text-lg font-bold text-ink-950">{title}</h2><ul className="mt-5 space-y-3">{items.map((item) => <li key={item} className="flex gap-2 text-sm leading-6 text-ink-700"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-ember-600" />{item}</li>)}</ul></article>;
}
