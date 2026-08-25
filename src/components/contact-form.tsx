"use client";

import { useState, type FormEvent } from "react";
import { HAS_WHATSAPP, whatsappLink, mailtoLink } from "@/lib/constants";

export function ContactForm({
  labels,
}: {
  labels: {
    name: string;
    phone: string;
    message: string;
    submit: string;
    success: string;
    error: string;
    mvpNotice: string;
    mvpCta: string;
  };
}) {
  const [status, setStatus] = useState<"idle" | "submitting" | "done" | "error">("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    const form = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/contact", { method: "POST", body: form });
      if (!res.ok) throw new Error("failed");
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    const confirmHref = (HAS_WHATSAPP && whatsappLink("مرحبًا، أرسلت للتو رسالة عبر نموذج التواصل بالموقع")) || mailtoLink("تأكيد استلام رسالة من نموذج التواصل");
    return (
      <div className="space-y-4">
        <div className="rounded-card border border-sand-200 bg-sand-50 p-6 text-center text-ink-900">{labels.success}</div>
        {/* لا يوجد بعد بريد إلكتروني أو CRM موصول فعليًا بهذا النموذج (راجع src/app/api/contact/route.ts) —
            تنبيه صريح ومقصود حتى لا يفترض الزائر وصول رسالته بشكل مؤكد قبل ربط قناة تواصل حقيقية. */}
        <div className="rounded-card border border-gold-500/30 bg-gold-300/25 p-5 text-sm leading-7 text-ink-800">
          <p className="mb-3">{labels.mvpNotice}</p>
          <a href={confirmHref} target="_blank" rel="noopener noreferrer" className="focus-ring inline-block rounded-btn bg-ember-600 px-5 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-ember-700">
            {labels.mvpCta}
          </a>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="mb-1.5 block text-sm font-semibold text-ink-900">{labels.name}</label>
        <input name="name" required className="input-field" />
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-semibold text-ink-900">{labels.phone}</label>
        <input name="phone" required className="input-field" />
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-semibold text-ink-900">{labels.message}</label>
        <textarea name="message" required rows={4} className="input-field" />
      </div>
      {status === "error" && <p className="text-sm font-semibold text-ember-700">{labels.error}</p>}
      <button
        type="submit"
        disabled={status === "submitting"}
        className="focus-ring rounded-btn bg-ember-600 px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-ember-700 disabled:opacity-60"
      >
        {labels.submit}
      </button>
    </form>
  );
}
