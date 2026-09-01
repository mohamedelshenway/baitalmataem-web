import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import NewListingForm from "./new-listing-form";

export default async function NewListingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect(`/${locale}/dashboard/login`);
  }

  return (
    <div className="min-h-screen bg-[#f8f5ef]" dir="rtl">
      <header className="bg-white border-b border-black/5">
        <div className="max-w-3xl mx-auto px-6 py-4">
          <Link
            href={`/${locale}/dashboard/listings`}
            className="text-sm text-[#151515]/60 hover:text-[#8b1e24]"
          >
            ← رجوع لإدارة الفرص
          </Link>
          <h1 className="font-bold text-[#151515] mt-1">إضافة فرصة جديدة</h1>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-8">
        <NewListingForm />
      </main>
    </div>
  );
}
