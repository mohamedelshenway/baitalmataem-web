import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { buildMetadata } from "@/lib/seo";
import { NewListingWizard } from "@/components/new-listing-wizard";

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  if (!isLocale(params.locale)) return {};
  const dict = await getDictionary(params.locale);
  return buildMetadata({
    title: dict.newListing.title,
    description: dict.newListing.subtitle,
    locale: params.locale,
    path: "/marketplace/new",
    noIndex: true, // نموذج إدخال بيانات — لا حاجة لفهرسته في محركات البحث
  });
}

export default async function NewListingPage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale as Locale;
  const dict = await getDictionary(locale);

  return (
    <section className="py-14">
      <div className="container-page">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <h1 className="mb-3 text-2xl font-bold text-ink-900 sm:text-3xl">{dict.newListing.title}</h1>
          <p className="text-ink-600">{dict.newListing.subtitle}</p>
        </div>
        <NewListingWizard dict={dict} locale={locale} />
      </div>
    </section>
  );
}
