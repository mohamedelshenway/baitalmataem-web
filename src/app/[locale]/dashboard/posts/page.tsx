import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import PublishToggle from "./publish-toggle";

export default async function PostsPage({
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

  const { data: posts, error } = await supabase
    .from("posts")
    .select("id, title, slug, is_published, created_at")
    .order("created_at", { ascending: false });

  return (
    <div className="min-h-screen bg-[#f8f5ef]" dir="rtl">
      <header className="bg-white border-b border-black/5">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <Link href={`/${locale}/dashboard`} className="text-sm text-[#151515]/60 hover:text-[#8b1e24]">
              ← رجوع للوحة التحكم
            </Link>
            <h1 className="font-bold text-[#151515] mt-1">إدارة المقالات</h1>
          </div>
          <Link
            href={`/${locale}/dashboard/posts/new`}
            className="bg-[#8b1e24] text-white rounded-lg px-4 py-2 text-sm font-medium hover:bg-[#6f1720] transition"
          >
            + مقال جديد
          </Link>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-8">
        {error && (
          <p className="text-sm text-[#8b1e24] bg-[#8b1e24]/5 rounded-lg px-4 py-3 mb-4">
            حصل خطأ في تحميل المقالات: {error.message}
          </p>
        )}

        {!error && (!posts || posts.length === 0) && (
          <p className="text-sm text-[#151515]/60 bg-white rounded-2xl border border-black/5 p-6 text-center">
            لا توجد مقالات مضافة بعد.
          </p>
        )}

        {posts && posts.length > 0 && (
          <div className="space-y-3">
            {posts.map((post) => (
              <div
                key={post.id}
                className="bg-white rounded-2xl border border-black/5 p-5 flex items-center justify-between gap-4"
              >
                <div>
                  <p className="font-medium text-[#151515]">{post.title}</p>
                  <p className="text-sm text-[#151515]/60">/{post.slug}</p>
                </div>
                <PublishToggle postId={post.id} isPublished={post.is_published} />
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
