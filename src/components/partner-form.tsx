"use client";

import { useState, type FormEvent, type InputHTMLAttributes } from "react";
import { contentLocale, type Locale } from "@/i18n/config";
import { SAUDI_REGIONS } from "@/lib/constants";

export function PartnerForm({ locale, modes }: { locale: Locale; modes: string[] }) {
  const ar = locale === "ar";
  const language = contentLocale(locale);
  const [regionIndex, setRegionIndex] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    const form = new FormData(event.currentTarget);
    const data = { ...Object.fromEntries(form.entries()), languages: form.getAll("languages").map(String) } as Record<string, FormDataEntryValue | string[]>;
    try {
      const response = await fetch("/api/leads", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ type: "partner", source: "success-partners", page: window.location.pathname, service: "partners", locale, contactPhone: String(data.phone || ""), data }) });
      if (!response.ok) throw new Error("failed");
      setStatus("done");
      event.currentTarget.reset();
    } catch { setStatus("error"); }
  }
  if (status === "done") return <p role="status" className="mt-6 rounded-card border border-emerald-200 bg-emerald-50 p-5 text-sm font-semibold text-emerald-900">{ar ? "تم تسجيل طلبك بسرية للمراجعة." : "Your private application has been logged for review."}</p>;
  return <form onSubmit={submit} className="mt-6 grid gap-4 sm:grid-cols-2">
    <input name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
    <Field name="name" label={ar ? "الاسم" : "Name"} />
    <label className="text-sm font-semibold text-ink-800">{ar ? "المنطقة" : "Region"}<select name="region" required value={regionIndex} onChange={(e) => setRegionIndex(e.target.value)} className="input-field mt-1.5"><option value="" disabled>{ar ? "اختر" : "Choose"}</option>{SAUDI_REGIONS.map((region, index) => <option key={region.name.en} value={index}>{region.name[language]}</option>)}</select></label>
    <label className="text-sm font-semibold text-ink-800">{ar ? "المحافظة / المدينة" : "Governorate / city"}<select name="city" required defaultValue="" disabled={regionIndex === ""} className="input-field mt-1.5 disabled:opacity-50"><option value="" disabled>{ar ? "اختر" : "Choose"}</option>{regionIndex !== "" && SAUDI_REGIONS[Number(regionIndex)].places.map((place) => <option key={place.en} value={place[language]}>{place[language]}</option>)}</select></label>
    <Field name="specialty" label={ar ? "التخصص" : "Specialty"} />
    <Field name="experienceYears" label={ar ? "سنوات الخبرة" : "Years of experience"} type="number" min="0" />
    <Field name="phone" label={ar ? "رقم التواصل" : "Contact number"} type="tel" pattern="[+0-9 ()-]{8,21}" />
    <label className="text-sm font-semibold text-ink-800">{ar ? "نوع التعاون" : "Collaboration type"}<select name="cooperation" required defaultValue="" className="input-field mt-1.5"><option value="" disabled>{ar ? "اختر" : "Choose"}</option>{modes.map((mode) => <option key={mode}>{mode}</option>)}</select></label>
    <Field name="cvUrl" label={ar ? "رابط السيرة الذاتية" : "CV link"} type="url" required={false} />
    <Field name="portfolioUrl" label={ar ? "رابط نماذج الأعمال" : "Portfolio link"} type="url" required={false} />
    <fieldset className="sm:col-span-2"><legend className="text-sm font-semibold text-ink-800">{ar ? "اللغات" : "Languages"}</legend><div className="mt-2 flex flex-wrap gap-2">{(ar ? ["العربية", "الإنجليزية", "الهندية", "الأردية", "البنغالية", "التركية", "الروسية"] : ["Arabic", "English", "Hindi", "Urdu", "Bengali", "Turkish", "Russian"]).map((item) => <label key={item} className="flex items-center gap-2 rounded-btn border border-sand-200 px-3 py-2 text-sm"><input type="checkbox" name="languages" value={item} className="accent-ember-600" />{item}</label>)}</div></fieldset>
    {status === "error" && <p role="alert" className="text-sm font-semibold text-ember-700 sm:col-span-2">{ar ? "تعذر إرسال الطلب." : "Could not submit the application."}</p>}
    <button disabled={status === "sending"} className="focus-ring rounded-btn bg-ember-600 px-6 py-3 text-sm font-bold text-white hover:bg-ember-700 disabled:opacity-60 sm:col-span-2 sm:w-fit">{status === "sending" ? (ar ? "جارٍ الإرسال..." : "Submitting...") : (ar ? "إرسال طلب الانضمام" : "Submit application")}</button>
  </form>;
}

function Field({ name, label, required = true, ...props }: { name: string; label: string; required?: boolean } & InputHTMLAttributes<HTMLInputElement>) {
  return <label className="text-sm font-semibold text-ink-800">{label}<input name={name} required={required} className="input-field mt-1.5" {...props} /></label>;
}
