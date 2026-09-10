import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { buildMetadata } from "@/lib/seo";
import { HAS_WHATSAPP, whatsappLink } from "@/lib/constants";
import { Container, GoldDivider, Button } from "@/components/ui";

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  if (!isLocale(params.locale)) return {};
  const dict = await getDictionary(params.locale);
  return buildMetadata({
    title: dict.thankYou.title,
    description: dict.thankYou.subtitleMain,
    locale: params.locale,
    path: "/thank-you",
    // صفحة تحويل مخصصة لتتبع Conversion في Google Ads فقط — لا يجب فهرستها في محركات البحث،
    // ولا الوصول لها إلا بعد نجاح إرسال نموذج التواصل فعليًا (راجع ContactForm)
    noIndex: true,
  });
}

export default async function ThankYouPage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale as Locale;
  const dict = await getDictionary(locale);

  const whatsappHref = HAS_WHATSAPP
    ? whatsappLink("مرحبًا بيت المطاعم، تواصلت معاكم للتو عبر الموقع")
    : null;

  return (
    <section className="py-20 sm:py-28">
      <Container className="max-w-xl text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-ember-600/10 text-ember-600">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-ink-900 sm:text-3xl">{dict.thankYou.title}</h1>
        <GoldDivider className="mx-auto my-6" />
        <p className="text-lg font-semibold text-ink-800">{dict.thankYou.subtitleMain}</p>
        <p className="mt-3 leading-7 text-ink-600">{dict.thankYou.subtitleSecondary}</p>

        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button href={`/${locale}`} variant="primary">
            {dict.thankYou.backHome}
          </Button>
          {whatsappHref && (
            <Button href={whatsappHref} variant="outline" target="_blank">
              {dict.thankYou.whatsappCta}
            </Button>
          )}
        </div>
      </Container>
    </section>
  );
}
