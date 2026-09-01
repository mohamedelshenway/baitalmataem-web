"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

const INPUT_CLASS =
  "w-full rounded-lg border border-black/10 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#8b1e24]/30";

function slugify(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^؀-ۿa-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export default function NewPostForm() {
  const router = useRouter();
  const params = useParams();
  const locale = params.locale as string;

  const [title, setTitle] = useState("");
  const [slugTouched, setSlugTouched] = useState(false);
  const [slug, setSlug] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const form = new FormData(e.currentTarget);
    const finalSlug = slug.trim() || slugify(title);

    if (!finalSlug) {
      setSubmitting(false);
      setError("لازم يكون فيه عنوان أو رابط (slug) صالح");
      return;
    }

    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { error: insertError } = await supabase.from("posts").insert({
      title: title.trim(),
      slug: finalSlug,
      excerpt: (form.get("excerpt") as string)?.trim() || null,
      content: (form.get("content") as string)?.trim() || null,
      cover_image: (form.get("cover_image") as string)?.trim() || null,
      is_published: form.get("is_published") === "on",
      created_by: user?.id ?? null,
    });

    setSubmitting(false);

    if (insertError) {
      setError(insertError.message);
      return;
    }

    router.push(`/${locale}/dashboard/posts`);
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white rounded-2xl border border-black/5 p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-[#151515] mb-1">العنوان *</label>
          <input
            name="title"
            required
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              if (!slugTouched) setSlug(slugify(e.target.value));
            }}
            className={INPUT_CLASS}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[#151515] mb-1">الرابط (slug) *</label>
          <input
            name="slug"
            required
            value={slug}
            onChange={(e) => {
              setSlugTouched(true);
              setSlug(e.target.value);
            }}
            dir="ltr"
            className={INPUT_CLASS}
          />
          <p className="text-xs text-[#151515]/50 mt-1">يتولّد تلقائيًا من العنوان، وتقدر تعدّله يدويًا.</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-[#151515] mb-1">مقتطف قصير</label>
          <textarea name="excerpt" rows={2} className={INPUT_CLASS} />
        </div>

        <div>
          <label className="block text-sm font-medium text-[#151515] mb-1">صورة الغلاف (رابط URL)</label>
          <input name="cover_image" dir="ltr" className={INPUT_CLASS} />
        </div>

        <div>
          <label className="block text-sm font-medium text-[#151515] mb-1">محتوى المقال</label>
          <textarea name="content" rows={12} className={INPUT_CLASS} />
        </div>

        <label className="flex items-center gap-2 text-sm text-[#151515]">
          <input type="checkbox" name="is_published" className="rounded" />
          انشر المقال فورًا
        </label>
      </div>

      {error && (
        <p className="text-sm text-[#8b1e24] bg-[#8b1e24]/5 rounded-lg px-4 py-3">
          حصل خطأ أثناء الحفظ: {error}
        </p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="bg-[#8b1e24] text-white rounded-lg px-6 py-2.5 text-sm font-medium hover:bg-[#6f1720] transition disabled:opacity-60"
      >
        {submitting ? "جارٍ الحفظ..." : "حفظ المقال"}
      </button>
    </form>
  );
}
