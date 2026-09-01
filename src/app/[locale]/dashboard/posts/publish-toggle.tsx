"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function PublishToggle({
  postId,
  isPublished,
}: {
  postId: string;
  isPublished: boolean;
}) {
  const router = useRouter();
  const [published, setPublished] = useState(isPublished);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  async function handleToggle() {
    const next = !published;
    setPublished(next);
    setError(null);

    const supabase = createClient();
    const { error: updateError } = await supabase
      .from("posts")
      .update({ is_published: next, updated_at: new Date().toISOString() })
      .eq("id", postId);

    if (updateError) {
      setPublished(!next);
      setError("فشل التحديث");
      return;
    }

    startTransition(() => {
      router.refresh();
    });
  }

  return (
    <div className="flex flex-col items-end gap-1">
      <button
        onClick={handleToggle}
        disabled={isPending}
        className={`text-sm rounded-lg px-3 py-1.5 font-medium transition disabled:opacity-60 ${
          published
            ? "bg-[#151515]/5 text-[#151515] hover:bg-[#151515]/10"
            : "bg-[#8b1e24] text-white hover:bg-[#6f1720]"
        }`}
      >
        {published ? "منشور — إلغاء النشر" : "غير منشور — نشر الآن"}
      </button>
      {error && <p className="text-xs text-[#8b1e24]">{error}</p>}
    </div>
  );
}
