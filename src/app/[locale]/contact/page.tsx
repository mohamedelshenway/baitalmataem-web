import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { buildMetadata } from "@/lib/seo";
import { SOCIALS, WHATSAPP_NUMBER, HAS_WHATSAPP, whatsappLink } from "@/lib/constants";
import { Card, GoldDivider } from "@/components/ui";
import { ContactForm } from "@/components/contact-form";

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  if (!isLocale(params.locale)) return {};
  const dict = await getDictionary(params.locale);
  return buildMetadata({
    title: dict.contact.title,
    description: dict.contact.subtitle,
    locale: params.locale,
    path: "/contact",
  });
}

export default async function ContactPage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale as Locale;
  const dict = await getDictionary(locale);

  return (
    <section className="py-12 sm:py-14">
      <div className="container-page max-w-3xl">
        <h1 className="mb-2 text-2xl font-bold text-ink-900 sm:text-3xl">{dict.contact.title}</h1>
        <p className="mb-8 text-ink-600">{dict.contact.subtitle}</p>
        <GoldDivider className="mb-8" />

        <div className="mb-10 grid gap-4 sm:grid-cols-2">
          <Card className="p-6">
            <h2 className="mb-2 text-sm font-bold text-ink-900">{dict.contact.whatsappTitle}</h2>
            {HAS_WHATSAPP ? (
              <a href={whatsappLink("مرحبًا بيت المطاعم") || "#"} target="_blank" rel="noopener noreferrer" className="focus-ring font-semibold text-ember-600 hover:underline">
                {WHATSAPP_NUMBER}
              </a>
            ) : (
              <p className="text-sm text-ink-500">{"سيُضاف رقم واتساب بيت المطاعم قريبًا"}</p>
            )}
          </Card>
          <Card className="p-6">
            <h2 className="mb-2 text-sm font-bold text-ink-900">{dict.contact.emailTitle}</h2>
            <a href={`mailto:${SOCIALS.email}`} className="focus-ring font-semibold text-ember-600 hover:underline">
              {SOCIALS.email}
            </a>
          </Card>
        </div>

        <Card className="p-6">
          <h2 className="mb-5 text-sm font-bold text-ink-900">{dict.contact.formTitle}</h2>
          <ContactForm
            labels={{
              name: dict.contact.formName,
              phone: dict.contact.formPhone,
              message: dict.contact.formMessage,
              submit: dict.contact.formSubmit,
              success: dict.contact.formSuccess,
              error: dict.contact.formError,
              mvpNotice: dict.contact.formMvpNotice,
              mvpCta: dict.common.contactNow,
            }}
          />
        </Card>
      </div>
    </section>
  );
}
