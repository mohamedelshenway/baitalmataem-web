import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import NewPostForm from "./new-post-form";

export default async function NewPostPage({
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
          <Link href={`/${locale}/dashboard/posts`} className="text-sm text-[#151515]/60 hover:text-[#8b1e24]">
            ← رجوع لإدارة المقالات
          </Link>
          <h1 className="font-bold text-[#151515] mt-1">مقال جديد</h1>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-8">
        <NewPostForm />
      </main>
    </div>
  );
}
