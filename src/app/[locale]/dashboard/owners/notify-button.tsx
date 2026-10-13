"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { buildNotifyMessage, whatsAppUrl, type SubmissionStatus } from "@/lib/submission-notify";

/** يفتح واتساب برسالة جاهزة بنتيجة الطلب ويسجّل إن صاحب الفرصة اتبلّغ */
export default function NotifyButton({
  submissionId,
  status,
  name,
  phone,
  opportunity,
  adminNote,
  notifiedAt,
}: {
  submissionId: string;
  status: SubmissionStatus;
  name?: string | null;
  phone?: string | null;
  opportunity?: string | null;
  adminNote?: string | null;
  notifiedAt?: string | null;
}) {
  const router = useRouter();
  const [done, setDone] = useState(Boolean(notifiedAt));
  const url = whatsAppUrl(phone, buildNotifyMessage({ status, name, opportunity, adminNote }));
  if (!url) return null;

  const label =
    status === "approved" ? "إشعار بالقبول" : status === "rejected" ? "إشعار بالرفض" : status === "changes_requested" ? "إرسال التعديل" : "رد أولي";

  async function onClick() {
    window.open(url, "_blank", "noopener,noreferrer");
    const supabase = createClient();
    const { error } = await supabase
      .from("listing_submissions")
      .update({ notified_at: new Date().toISOString() })
      .eq("id", submissionId);
    if (!error) {
      setDone(true);
      router.refresh();
    }
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={`text-xs rounded-lg px-3 py-1.5 font-medium transition ${
        done ? "bg-black/5 text-[#151515]/60 hover:bg-black/10" : "bg-[#25D366] text-white hover:bg-[#1da851]"
      }`}
    >
      {done ? "✓ تم الإشعار — إعادة" : `واتساب: ${label}`}
    </button>
  );
}
