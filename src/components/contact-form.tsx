"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { getAttributionSource } from "@/lib/attribution";

export function ContactForm({
  locale,
  labels,
}: {
  locale: string;
  labels: {
    name: string;
    phone: string;
    message: string;
    submit: string;
    error: string;
  };
}) {
  const router = useRouter();
  const [status, setStatus] = useState<"idle" | "submitting" | "error">("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    const form = new FormData(e.currentTarget);
    form.set("source", getAttributionSource());
    try {
      const res = await fetch("/api/contact", { method: "POST", body: form });
      if (!res.ok) throw new Error("failed");
      // التحويل لصفحة الشكر يحصل فقط بعد نجاح الحفظ الفعلي في الخادم (res.ok) — الصفحة دي
      // مخصصة لتتبع Conversion في Google Ads، فمهم إن التحويل ميحصلش أبدًا عند فشل الإرسال
      router.push(`/${locale}/thank-you`);
    } catch {
      setStatus("error");
    }
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
