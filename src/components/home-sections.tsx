import Image from "next/image";
import Link from "next/link";
import type { ReactElement } from "react";
import type { Dictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/config";
import type { BlogPost } from "@/lib/types";
import { SERVICES } from "@/lib/data/services";
import { Button, Card, SectionHeading, GoldDivider } from "@/components/ui";
import { Reveal } from "@/components/reveal";
import { QuickSearch } from "@/components/quick-search";
import { PostCard } from "@/components/post-card";
import { SOCIALS } from "@/lib/constants";
import { SAUDI_REGIONS } from "@/lib/saudi-regions";

// ---------------------------------------------------------------------------
// Hero — صورة خلفية كاملة العرض بتراكب داكن سينمائي، مع بحث سريع مدمج في الأسفل
// ---------------------------------------------------------------------------
export function Hero({ dict, locale, cities }: { dict: Dictionary; locale: Locale; cities: string[] }) {
  return (
    <section className="relative">
      <div className="relative flex min-h-[82vh] items-center overflow-hidden bg-ink-950 sm:min-h-[88vh]">
        <Image
          src="/images/editorial/restaurant-interior-lg.webp"
          alt={dict.home.imageAlts.hero}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/70 to-ink-950/30" />
        <div className="absolute inset-0 bg-gradient-to-l from-ink-950/40 via-transparent to-transparent" />

        <div className="container-page relative py-24 text-center sm:py-28">
          <p className="eyebrow mb-5 text-gold-500">{dict.home.heroKicker}</p>
          <h1 className="mx-auto max-w-3xl text-3xl font-bold leading-tight text-white sm:text-5xl" style={{ textWrap: "balance" }}>
            {dict.home.heroTitle}
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-white/75 sm:text-lg">{dict.home.heroSubtitle}</p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <Button href={`/${locale}/marketplace`} variant="primary" arrow>
              {dict.home.heroCta1}
            </Button>
            <Button href={`/${locale}/marketplace/new`} variant="light">
              {dict.home.heroCta2}
            </Button>
            <Button href={`/${locale}/contact`} variant="goldDark">
              {dict.home.heroCta3}
            </Button>
          </div>
        </div>
      </div>

      <QuickSearch dict={dict} locale={locale} cities={cities} />
      <div className="h-10 sm:h-12" />
    </section>
  );
}

// ---------------------------------------------------------------------------
// شريط ثقة رفيع مباشرة بعد الـHero
// ---------------------------------------------------------------------------
export function TrustStrip({ dict }: { dict: Dictionary }) {
  return (
    <section className="border-b border-ink-900/5 bg-white py-8">
      <div className="container-page flex flex-col items-center gap-1.5 text-center">
        <p className="text-base font-bold text-ink-900 sm:text-lg">{dict.home.trustStripTitle}</p>
        <p className="max-w-2xl text-sm text-ink-600">{dict.home.trustStripSubtitle}</p>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// "كيف يمكن لبيت المطاعم مساعدتك؟" — Bento Grid غير متماثل بدل 5 كروت متساوية
// ---------------------------------------------------------------------------
const smallIcons: Record<string, ReactElement> = {
  feasibility: <path d="M9 3v4M15 3v4M4 8h16M5 6h14a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1Zm3 8h8m-8 4h5" />,
  develop: <path d="M3 17l6-6 4 4 8-8M21 3h-6v6" />,
  consult: <path d="M12 3a9 9 0 1 0 9 9c0-1.5-.3-2.9-.9-4.2M12 3v9l6 3" />,
};

export function HowWeHelp({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const small = [
    { key: "feasibility", label: dict.home.how.feasibility, href: "/services/feasibility-study" },
    { key: "develop", label: dict.home.how.develop, href: "/services/restaurant-development" },
    { key: "consult", label: dict.home.how.consult, href: "/contact" },
  ];

  return (
    <section className="py-16 sm:py-20">
      <div className="container-page">
        <SectionHeading title={dict.home.how.title} subtitle={dict.home.how.subtitle} align="center" />
        <div className="grid gap-5 lg:grid-cols-3 lg:grid-rows-2">
          <Reveal className="lg:col-span-2 lg:row-span-2">
            <Link href={`/${locale}/marketplace`} className="focus-ring group block h-full">
              <Card className="relative flex h-full min-h-[280px] flex-col justify-end overflow-hidden p-0">
                <div className="img-zoom absolute inset-0">
                  <Image
                    src="/images/editorial/feasibility-analysis-lg.webp"
                    alt={dict.home.imageAlts.investment}
                    fill
                    sizes="(min-width: 1024px) 60vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-ink-950/90 via-ink-950/35 to-transparent" />
                <div className="relative p-7 sm:p-9">
                  <h3 className="mb-2 text-xl font-bold text-white sm:text-2xl">{dict.home.how.opportunityTitle}</h3>
                  <p className="cta-arrow inline-flex items-center gap-1.5 text-sm font-semibold text-gold-400">
                    {dict.home.how.opportunityCta}
                    <span data-arrow aria-hidden>←</span>
                  </p>
                </div>
              </Card>
            </Link>
          </Reveal>

          <Reveal delay={80}>
            <Link href={`/${locale}/marketplace/new`} className="focus-ring group block h-full">
              <Card className="relative flex h-full min-h-[280px] flex-col justify-end overflow-hidden p-0">
                <div className="img-zoom absolute inset-0">
                  <Image
                    src="/images/editorial/restaurant-interior-lg.webp"
                    alt={dict.home.imageAlts.hero}
                    fill
                    sizes="(min-width: 1024px) 30vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-ink-950/90 via-ink-950/40 to-transparent" />
                <div className="relative p-6">
                  <h3 className="mb-2 text-lg font-bold text-white">{dict.home.how.listTitle}</h3>
                  <p className="mb-3 text-xs leading-6 text-white/75">{dict.home.how.listDesc}</p>
                  <p className="cta-arrow inline-flex items-center gap-1.5 text-sm font-semibold text-gold-400">
                    {dict.home.how.listCta}
                    <span data-arrow aria-hidden>←</span>
                  </p>
                </div>
              </Card>
            </Link>
          </Reveal>

          <Reveal delay={140}>
            <div className="grid h-full gap-5 sm:grid-cols-3 lg:grid-cols-1">
              {small.map((item) => (
                <Link key={item.key} href={`/${locale}${item.href}`} className="focus-ring block h-full">
                  <Card className="flex h-full flex-col items-start gap-3 p-5">
                    <span className="flex h-10 w-10 items-center justify-center rounded-btn bg-sand-100 text-ember-700">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                        {smallIcons[item.key]}
                      </svg>
                    </span>
                    <h3 className="text-sm font-bold leading-6 text-ink-900">{item.label}</h3>
                  </Card>
                </Link>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// "لماذا بيت المطاعم" — قسم داكن، نص + 4 نقاط بلمسات ذهبية
// ---------------------------------------------------------------------------
export function WhySection({ dict }: { dict: Dictionary }) {
  const points = [dict.home.why.point1, dict.home.why.point2, dict.home.why.point3, dict.home.why.point4];
  return (
    <section className="bg-ink-950 py-16 text-white sm:py-20">
      <div className="container-page grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
        <Reveal>
          <GoldDivider className="mb-5" />
          <h2 className="text-2xl font-bold leading-snug sm:text-3xl" style={{ textWrap: "balance" }}>
            {dict.home.why.title}
          </h2>
          <p className="mt-4 max-w-md leading-7 text-white/65">{dict.home.why.desc}</p>
        </Reveal>
        <Reveal delay={100}>
          <div className="grid gap-4 sm:grid-cols-2">
            {points.map((p, i) => (
              <div key={p} className="rounded-card border border-white/10 bg-white/[0.03] p-5">
                <span className="mb-3 flex h-8 w-8 items-center justify-center rounded-btn bg-gold-500/15 text-sm font-bold text-gold-500">
                  {i + 1}
                </span>
                <p className="text-sm font-semibold leading-6 text-white/90">{p}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// "خبرات متخصصة تعمل كفريق واحد" — بدون أسماء وهمية، ينتهي بالإدارة التنفيذية فقط
// ---------------------------------------------------------------------------
export function TeamSection({ dict }: { dict: Dictionary }) {
  return (
    <section className="py-16 sm:py-20">
      <div className="container-page grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:gap-16">
        <Reveal>
          <div className="img-zoom relative aspect-[4/3] w-full overflow-hidden rounded-cardLg bg-ink-100">
            <Image
              src="/images/editorial/operations-team-lg.webp"
              alt={dict.home.imageAlts.operationsTeam}
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover"
              style={{ objectPosition: "center 58%" }}
            />
            <p className="absolute inset-x-3 bottom-3 rounded-btn bg-ink-950/75 px-3 py-2 text-[11px] leading-5 text-white/85 backdrop-blur-sm">
              {dict.home.team.photoNote}
            </p>
          </div>
        </Reveal>
        <Reveal delay={80}>
          <SectionHeading title={dict.home.team.title} />
          <p className="-mt-4 mb-6 max-w-xl leading-7 text-ink-600">{dict.home.team.text}</p>
          <div className="mb-8 flex flex-wrap gap-2">
            {dict.home.team.areas.map((a: string) => (
              <span key={a} className="rounded-btn border border-sand-200 bg-sand-50 px-3 py-1.5 text-xs font-semibold text-ink-700">
                {a}
              </span>
            ))}
          </div>
          <GoldDivider className="mb-5" />
          <div className="flex items-center gap-4">
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-gold-500/40 bg-ink-950 text-sm font-bold text-gold-400">
              {getInitials(dict.home.team.execName)}
            </span>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wide text-gold-700">{dict.home.team.execLabel}</p>
              <p className="text-base font-bold text-ink-900">{dict.home.team.execName}</p>
              <p className="text-sm text-ink-600">{dict.home.team.execTitle}</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "";
  const first = parts[0][0] || "";
  const last = parts[parts.length - 1][0] || "";
  return parts.length > 1 ? `${first}.${last}.` : first;
}

// ---------------------------------------------------------------------------
// خدمات بيت المطاعم — خدمتان مميزتان كبيرتان + شبكة أصغر لبقية الخدمات
// ---------------------------------------------------------------------------
const SMALL_SERVICE_SLUGS = ["restaurant-valuation", "cost-profitability", "menu-development", "restaurant-marketing"];

export function ServicesSection({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const smallServices = SMALL_SERVICE_SLUGS.map((slug) => SERVICES.find((s) => s.slug === slug)).filter(
    (s): s is NonNullable<typeof s> => Boolean(s)
  );

  return (
    <section className="bg-sand-50 py-16 sm:py-20">
      <div className="container-page">
        <SectionHeading title={dict.home.servicesTitle} subtitle={dict.home.servicesSubtitle} align="center" />

        <div className="grid gap-5 sm:grid-cols-2">
          <Reveal>
            <Link href={`/${locale}/services/restaurant-setup`} className="focus-ring group block h-full">
              <Card className="relative flex h-full min-h-[260px] flex-col justify-end overflow-hidden p-0">
                <div className="img-zoom absolute inset-0">
                  <Image
                    src="/images/editorial/restaurant-equipment-lg.webp"
                    alt={dict.home.imageAlts.equipment}
                    fill
                    sizes="(min-width: 640px) 45vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-ink-950/88 via-ink-950/30 to-transparent" />
                <div className="relative p-7">
                  <h3 className="mb-2 text-lg font-bold text-white sm:text-xl">{dict.home.servicesFeatured1Title}</h3>
                  <p className="mb-3 max-w-sm text-sm leading-6 text-white/75">{dict.home.servicesFeatured1Desc}</p>
                  <p className="cta-arrow inline-flex items-center gap-1.5 text-sm font-semibold text-gold-400">
                    {dict.common.learnMore}
                    <span data-arrow aria-hidden>←</span>
                  </p>
                </div>
              </Card>
            </Link>
          </Reveal>

          <Reveal delay={80}>
            <Link href={`/${locale}/services/restaurant-operations`} className="focus-ring group block h-full">
              <Card className="relative flex h-full min-h-[260px] flex-col justify-end overflow-hidden p-0">
                <div className="img-zoom absolute inset-0">
                  <Image
                    src="/images/editorial/operations-team-lg.webp"
                    alt={dict.home.imageAlts.operationsTeam}
                    fill
                    sizes="(min-width: 640px) 45vw, 100vw"
                    className="object-cover"
                    style={{ objectPosition: "center 58%" }}
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-ink-950/88 via-ink-950/30 to-transparent" />
                <div className="relative p-7">
                  <h3 className="mb-2 text-lg font-bold text-white sm:text-xl">{dict.home.servicesFeatured2Title}</h3>
                  <p className="mb-3 max-w-sm text-sm leading-6 text-white/75">{dict.home.servicesFeatured2Desc}</p>
                  <p className="cta-arrow inline-flex items-center gap-1.5 text-sm font-semibold text-gold-400">
                    {dict.common.learnMore}
                    <span data-arrow aria-hidden>←</span>
                  </p>
                </div>
              </Card>
            </Link>
          </Reveal>
        </div>

        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {smallServices.map((s, i) => {
            const item = dict.services.list[s.slug as keyof typeof dict.services.list];
            return (
              <Reveal key={s.slug} delay={i * 60}>
                <Link href={`/${locale}/services/${s.slug}`} className="focus-ring block h-full">
                  <Card className="flex h-full flex-col p-5">
                    <h3 className="mb-2 text-sm font-bold leading-6 text-ink-900">{item.title}</h3>
                    <p className="mb-4 flex-1 text-xs leading-6 text-ink-600">{item.short}</p>
                    <span className="cta-arrow inline-flex items-center gap-1 text-xs font-semibold text-ember-600">
                      {dict.common.learnMore}
                      <span data-arrow aria-hidden>←</span>
                    </span>
                  </Card>
                </Link>
              </Reveal>
            );
          })}
        </div>

        <div className="mt-10 text-center">
          <Button href={`/${locale}/services`} variant="outline" arrow>
            {dict.common.viewAll}
          </Button>
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// قسم المستثمر — خلفية داكنة، 3 خطوات، CTA أساسي وثانوي
// ---------------------------------------------------------------------------
export function InvestorSection({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const steps = [
    { n: "1", label: dict.home.investor.step1 },
    { n: "2", label: dict.home.investor.step2 },
    { n: "3", label: dict.home.investor.step3 },
  ];
  return (
    <section className="relative overflow-hidden bg-ember-800 py-16 text-white sm:py-20">
      <Image
        src="/images/editorial/management-meeting-lg.webp"
        alt={dict.home.imageAlts.investment}
        fill
        sizes="100vw"
        className="object-cover opacity-25 mix-blend-luminosity"
      />
      <div className="absolute inset-0 bg-gradient-to-l from-ember-900/95 via-ember-800/90 to-ink-950/90" />
      <div className="container-page relative text-center">
        <h2 className="mx-auto max-w-2xl text-2xl font-bold sm:text-3xl" style={{ textWrap: "balance" }}>
          {dict.home.investor.title}
        </h2>
        <p className="mx-auto mt-3 max-w-xl leading-7 text-white/80">{dict.home.investor.subtitle}</p>

        <div className="mx-auto mt-10 grid max-w-3xl gap-5 sm:grid-cols-3">
          {steps.map((s) => (
            <div key={s.n} className="rounded-card border border-white/15 bg-white/[0.06] p-6">
              <span className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-btn bg-gold-500 text-sm font-bold text-ink-950">
                {s.n}
              </span>
              <p className="text-sm font-semibold leading-6">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Button href={`/${locale}/contact`} variant="light">
            {dict.home.investor.cta}
          </Button>
          <Button href={`/${locale}/marketplace`} variant="ghostDark">
            {dict.home.investor.secondaryCta}
          </Button>
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// "اعرض فرصتك" — دعوة لأصحاب المطاعم والمواقع
// ---------------------------------------------------------------------------
export function ListYourOpportunitySection({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const benefits = [dict.home.listYours.benefit1, dict.home.listYours.benefit2, dict.home.listYours.benefit3];
  return (
    <section className="py-16 sm:py-20">
      <div className="container-page">
        <Card className="grid gap-8 overflow-hidden p-8 sm:p-12 lg:grid-cols-[1.3fr_1fr] lg:items-center">
          <div>
            <h2 className="text-2xl font-bold text-ink-900 sm:text-3xl" style={{ textWrap: "balance" }}>
              {dict.home.listYours.title}
            </h2>
            <p className="mt-3 max-w-xl leading-7 text-ink-600">{dict.home.listYours.subtitle}</p>
            <ul className="mt-6 flex flex-col gap-2.5">
              {benefits.map((b) => (
                <li key={b} className="flex items-center gap-2.5 text-sm font-medium text-ink-800">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold-500/20 text-[11px] font-bold text-gold-700">✓</span>
                  {b}
                </li>
              ))}
            </ul>
          </div>
          <div className="relative min-h-[240px] overflow-hidden rounded-cardLg">
            <Image
              src="/images/editorial/restaurant-interior-lg.webp"
              alt={dict.home.imageAlts.hero}
              fill
              sizes="(min-width: 1024px) 35vw, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-transparent to-transparent" />
            <div className="absolute inset-x-5 bottom-5">
              <Button href={`/${locale}/marketplace/new`} variant="light" arrow className="w-full justify-center sm:w-auto">
                {dict.home.listYours.cta}
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// المدونة — مقال مميز + مقالات أصغر بجواره
// ---------------------------------------------------------------------------
export function BlogSection({
  dict,
  locale,
  posts,
  images,
}: {
  dict: Dictionary;
  locale: Locale;
  posts: BlogPost[];
  images: string[];
}) {
  const [featured, ...rest] = posts;
  if (!featured) return null;

  return (
    <section className="bg-sand-50 py-16 sm:py-20">
      <div className="container-page">
        <SectionHeading eyebrow={dict.home.blogTitle} title={dict.home.blogHeadline} subtitle={dict.home.blogSubtitle} align="center" />
        <div className="grid gap-5 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <PostCard post={featured} dict={dict} locale={locale} image={images[0]} featured />
          </div>
          <div className="grid gap-5 lg:col-span-2">
            {rest.map((p, i) => (
              <PostCard key={p.slug} post={p} dict={dict} locale={locale} image={images[i + 1]} />
            ))}
          </div>
        </div>
        <div className="mt-10 text-center">
          <Button href={`/${locale}/blog`} variant="outline" arrow>
            {dict.home.blogCta}
          </Button>
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// التوظيف والتدريب — مدخل رئيسي واحد بخدمتين واضحتين، وتفاصيله في الصفحة المستقلة
// ---------------------------------------------------------------------------
export function StaffingTrainingSection({ locale }: { locale: Locale }) {
  const copy = locale === "ar" ? {
    kicker: "نساعدك في التوظيف والتدريب",
    title: "أفضل العمالة لقطاع المطاعم والكافيهات والإعاشة",
    text: "ترشيح وفرز كفاءات من داخل المملكة وخارجها، مع تدريب عملي للتشغيل. ويمكن للمتخصصين الانضمام إلى فريق بيت المطاعم بدوام جزئي أو حسب المشروع.",
    staffing: "اطلب موظفين",
    training: "اطلب تدريب فريقك",
    parttime: "اعمل معنا بدوام جزئي",
    alt: "فريق مطعم يتلقى تدريبًا عمليًا داخل المطبخ",
  } : {
    kicker: "Staffing and training support",
    title: "Specialist talent for restaurants, cafés and catering",
    text: "Source and screen talent from inside and outside Saudi Arabia, train your team, or join Bait Al Mataem part-time or by project.",
    staffing: "Request staff",
    training: "Request team training",
    parttime: "Join us part-time",
    alt: "Restaurant team receiving practical kitchen training",
  };

  return (
    <section className="py-16 sm:py-20">
      <div className="container-page grid overflow-hidden rounded-cardLg bg-ink-950 text-white shadow-cardHover lg:grid-cols-[1.05fr_0.95fr] lg:items-stretch">
        <div className="flex flex-col justify-center p-7 sm:p-12">
          <p className="eyebrow mb-3 text-gold-500">{copy.kicker}</p>
          <h2 className="max-w-xl text-2xl font-bold leading-tight sm:text-4xl">{copy.title}</h2>
          <p className="mt-5 max-w-xl leading-8 text-white/70">{copy.text}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href={`/${locale}/staffing-training#request-forms`} variant="primary" arrow>{copy.staffing}</Button>
            <Button href={`/${locale}/staffing-training#request-forms`} variant="ghostDark">{copy.training}</Button>
            <Button href={`/${locale}/staffing-training#request-forms`} variant="ghostDark">{copy.parttime}</Button>
          </div>
        </div>
        <div className="relative min-h-[320px] lg:min-h-[440px]">
          <Image src="/images/editorial/operations-team-lg.webp" alt={copy.alt} fill sizes="(min-width: 1024px) 48vw, 100vw" className="object-cover" style={{ objectPosition: "center 58%" }} />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-950/35 to-transparent lg:bg-gradient-to-r" />
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// التغطية الوطنية — توضيح النطاق دون اختلاق فرص غير موجودة
// ---------------------------------------------------------------------------
export function CoverageSection({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  return (
    <section className="relative overflow-hidden bg-ink-950 py-16 text-white sm:py-20">
      <Image
        src="/images/editorial/restaurant-interior-lg.webp"
        alt={dict.home.imageAlts.hero}
        fill
        sizes="100vw"
        className="object-cover opacity-20"
      />
      <div className="absolute inset-0 bg-gradient-to-l from-ink-950 via-ink-950/95 to-ember-950/85" />
      <div className="container-page relative text-center">
        <p className="eyebrow mb-3 text-gold-500">{dict.home.coverage.kicker}</p>
        <h2 className="mx-auto max-w-3xl text-2xl font-bold sm:text-3xl">{dict.home.coverage.title}</h2>
        <p className="mx-auto mt-4 max-w-2xl leading-7 text-white/70">{dict.home.coverage.subtitle}</p>
        <div className="mx-auto mt-8 flex max-w-4xl flex-wrap justify-center gap-2">
          {SAUDI_REGIONS.map((region) => (
            <span key={region.name} className="rounded-btn border border-white/15 bg-white/[0.06] px-3 py-1.5 text-xs font-semibold text-white/85">
              {region.name}
            </span>
          ))}
        </div>
        <p className="mx-auto mt-6 max-w-2xl text-xs leading-6 text-white/55">{dict.home.coverage.note}</p>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// الفيديو — رابط رسمي فقط، بدون اختلاق فيديوهات أو صور مصغرة
// ---------------------------------------------------------------------------
export function VideoSection({ dict }: { dict: Dictionary }) {
  return (
    <section className="py-16 sm:py-20">
      <div className="container-page">
        <Card className="grid overflow-hidden p-0 lg:grid-cols-2 lg:items-stretch">
          <div className="relative min-h-[300px] bg-ink-950">
            <Image
              src="/images/editorial/restaurant-marketing-lg.webp"
              alt={dict.home.video.imageAlt}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-ink-950/25" />
            <span className="absolute inset-0 m-auto flex h-16 w-16 items-center justify-center rounded-full border border-white/30 bg-ember-600 text-2xl text-white shadow-cardHover" aria-hidden>▶</span>
          </div>
          <div className="flex flex-col justify-center p-8 sm:p-12">
            <p className="eyebrow mb-3 text-ember-700">{dict.home.video.kicker}</p>
            <h2 className="text-2xl font-bold text-ink-900 sm:text-3xl">{dict.home.video.title}</h2>
            <p className="mt-4 leading-7 text-ink-600">{dict.home.video.subtitle}</p>
            <div className="mt-7">
              <a href={SOCIALS.youtube} target="_blank" rel="noopener noreferrer" className="focus-ring inline-flex rounded-btn bg-ember-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-ember-700">
                {dict.home.video.cta}
              </a>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// شركاء النجاح — دعوة لشبكة المتخصصين، دون عرض أشخاص غير معتمدين
// ---------------------------------------------------------------------------
export function PartnersSection({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  return (
    <section className="bg-sand-50 py-16 sm:py-20">
      <div className="container-page grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:gap-16">
        <div className="relative aspect-[4/3] overflow-hidden rounded-cardLg bg-ink-100">
          <Image
            src="/images/editorial/operations-team-lg.webp"
            alt={dict.home.imageAlts.operationsTeam}
            fill
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="object-cover"
            style={{ objectPosition: "center 58%" }}
          />
          <p className="absolute inset-x-3 bottom-3 rounded-btn bg-ink-950/75 px-3 py-2 text-[11px] leading-5 text-white/85 backdrop-blur-sm">
            {dict.home.team.photoNote}
          </p>
        </div>
        <div>
          <p className="eyebrow mb-3 text-ember-700">{dict.home.partners.kicker}</p>
          <h2 className="text-2xl font-bold text-ink-900 sm:text-3xl">{dict.home.partners.title}</h2>
          <p className="mt-4 max-w-xl leading-7 text-ink-600">{dict.home.partners.subtitle}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {dict.home.partners.modes.map((mode: string) => (
              <span key={mode} className="rounded-btn border border-sand-200 bg-white px-3 py-1.5 text-xs font-semibold text-ink-700">{mode}</span>
            ))}
          </div>
          <div className="mt-7">
            <Button href={`/${locale}/partners`} variant="primary" arrow>{dict.home.partners.cta}</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
