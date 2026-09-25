"use client";

import { useEffect, useState, type FormEvent } from "react";
import type { Locale } from "@/i18n/config";

export function ListingActions({ slug, title, locale }: { slug: string; title: string; locale: Locale }) {
  const [favorite, setFavorite] = useState(false);
  const [reportOpen, setReportOpen] = useState(false);
  const [reportStatus, setReportStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const ar = locale === "ar";

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("baitalmataem:favorites") || "[]") as string[];
    setFavorite(saved.includes(slug));
  }, [slug]);

  function toggleFavorite() {
    const saved = new Set(JSON.parse(localStorage.getItem("baitalmataem:favorites") || "[]") as string[]);
    favorite ? saved.delete(slug) : saved.add(slug);
    localStorage.setItem("baitalmataem:favorites", JSON.stringify([...saved]));
    setFavorite(!favorite);
  }

  async function share() {
    const data = { title, text: title, url: window.location.href };
    if (navigator.share) await navigator.share(data).catch(() => undefined);
    else await navigator.clipboard.writeText(window.location.href);
  }

  async function report(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setReportStatus("sending");
    const form = new FormData(event.currentTarget);
    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "contact", source: "listing-report", page: window.location.pathname, service: "listing-report", locale,
          contactPhone: form.get("phone"), data: { listing: slug, reason: form.get("reason") },
        }),
      });
      if (!response.ok) throw new Error("failed");
      setReportStatus("done");
    } catch { setReportStatus("error"); }
  }

  return (
    <div className="mt-4">
      <div className="grid grid-cols-3 gap-2">
        <button type="button" onClick={toggleFavorite} aria-pressed={favorite} className="focus-ring rounded-btn border border-sand-200 px-2 py-2.5 text-xs font-semibold text-ink-700 hover:bg-sand-50">{favorite ? "♥" : "♡"} {ar ? "المفضلة" : "Save"}</button>
        <button type="button" onClick={share} className="focus-ring rounded-btn border border-sand-200 px-2 py-2.5 text-xs font-semibold text-ink-700 hover:bg-sand-50">↗ {ar ? "مشاركة" : "Share"}</button>
        <button type="button" onClick={() => setReportOpen((open) => !open)} className="focus-ring rounded-btn border border-sand-200 px-2 py-2.5 text-xs font-semibold text-ink-700 hover:bg-sand-50">⚑ {ar ? "إبلاغ" : "Report"}</button>
      </div>
      {reportOpen && (
        <form onSubmit={report} className="mt-3 space-y-3 rounded-card bg-sand-50 p-4">
          {reportStatus === "done" ? <p role="status" className="text-xs font-semibold text-emerald-800">{ar ? "تم تسجيل البلاغ للمراجعة." : "Report logged for review."}</p> : <>
            <input name="phone" type="tel" required pattern="[+0-9 ()-]{8,21}" placeholder={ar ? "رقم التواصل" : "Contact number"} className="input-field" />
            <textarea name="reason" required rows={3} placeholder={ar ? "سبب البلاغ" : "Reason for report"} className="input-field" />
            {reportStatus === "error" && <p className="text-xs font-semibold text-ember-700">{ar ? "تعذر إرسال البلاغ." : "Could not submit report."}</p>}
            <button disabled={reportStatus === "sending"} className="focus-ring w-full rounded-btn bg-ink-950 px-4 py-2.5 text-xs font-bold text-white disabled:opacity-60">{ar ? "إرسال البلاغ" : "Submit report"}</button>
          </>}
        </form>
      )}
    </div>
  );
}
