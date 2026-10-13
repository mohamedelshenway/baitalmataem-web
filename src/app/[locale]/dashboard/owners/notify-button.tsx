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

/** إشعار بالإيميل: إرسال تلقائي لو الخدمة مفعّلة، وإلا يفتح رسالة جاهزة في برنامج الإيميل */
export function EmailNotifyButton({
  submissionId,
  status,
  name,
  email,
  opportunity,
  adminNote,
  notifiedAt,
}: {
  submissionId: string;
  status: SubmissionStatus;
  name?: string | null;
  email?: string | null;
  opportunity?: string | null;
  adminNote?: string | null;
  notifiedAt?: string | null;
}) {
  const router = useRouter();
  const [state, setState] = useState<"idle" | "busy" | "sent" | "fallback">(notifiedAt ? "sent" : "idle");
  if (!email || status === "new") return null;

  async function onClick() {
    setState("busy");
    try {
      const res = await fetch("/api/notify-submission", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ submissionId }),
      });
      if (res.ok) {
        setState("sent");
        router.refresh();
        return;
      }
    } catch {
      // نكمّل للبديل
    }
    const body = buildNotifyMessage({ status, name, opportunity, adminNote });
    window.open(`mailto:${email}?subject=${encodeURIComponent("بيت المطاعم — بخصوص فرصتك")}&body=${encodeURIComponent(body)}`);
    setState("fallback");
  }

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={state === "busy"}
      className="text-xs rounded-lg px-3 py-1.5 font-medium bg-[#151515]/90 text-white hover:bg-black transition disabled:opacity-60"
    >
      {state === "busy" ? "جارٍ الإرسال..." : state === "sent" ? "✓ تم إرسال إيميل — إعادة" : state === "fallback" ? "فُتحت الرسالة — إعادة" : "إيميل: إشعار"}
    </button>
  );
}
