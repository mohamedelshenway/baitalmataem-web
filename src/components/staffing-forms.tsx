"use client";

import { useState, type FormEvent, type InputHTMLAttributes } from "react";
import { contentLocale, type Locale } from "@/i18n/config";
import { SAUDI_REGIONS } from "@/lib/constants";

type FormKind = "staffing" | "training" | "parttime";
const COPY = {
  ar: {
    tabs: { staffing: "نساعدك في التوظيف", training: "تدريب فريقك", parttime: "اعمل مع فريقنا بدوام جزئي" },
    desc: { staffing: "نوفر ونفرز أفضل الكفاءات المتخصصة في المطاعم والكافيهات والإعاشة من داخل المملكة وخارجها حسب احتياج منشأتك.", training: "حدد احتياج فريقك وسننسق برنامجًا عمليًا بالموقع أو عن بعد.", parttime: "انضم إلى شبكة فريق بيت المطاعم للعمل بدوام جزئي أو حسب المشروع في تخصصات المطاعم والكافيهات والإعاشة." },
    choose: "اختر", region: "المنطقة", place: "المحافظة / المدينة", sector: "مجال المنشأة", source: "مصدر العمالة", inside: "من داخل المملكة", outside: "من خارج المملكة",
    role: "الوظيفة أو التخصص", count: "العدد", salary: "الراتب التقريبي", hours: "ساعات العمل", housing: "السكن / الإعاشة إن وجدت", date: "تاريخ الاحتياج", phone: "رقم التواصل", notes: "ملاحظات",
    languages: "اللغات المطلوبة", name: "الاسم الكامل", experience: "سنوات الخبرة", availability: "الأيام والأوقات المتاحة", cv: "رابط السيرة الذاتية أو ملف الأعمال", restaurantType: "نوع المطعم",
    employeeCount: "عدد الموظفين", departments: "الأقسام المطلوب تدريبها", trainingType: "نوع التدريب", delivery: "طريقة التدريب", onSite: "بالموقع", remote: "عن بعد", submit: "إرسال الطلب", submitting: "جارٍ الإرسال...",
    success: "تم تسجيل طلبك بنجاح. سيتواصل معك فريق بيت المطاعم بعد المراجعة.", error: "تعذر إرسال الطلب. راجع البيانات وحاول مرة أخرى.", another: "إرسال طلب آخر",
    sectors: ["مطاعم", "كافيهات", "إعاشة"], languageOptions: ["العربية", "الإنجليزية", "الهندية", "الأردية", "البنغالية", "التركية", "الروسية", "أخرى"],
  },
  en: {
    tabs: { staffing: "Staffing support", training: "Train your team", parttime: "Join our team part-time" },
    desc: { staffing: "We source and screen restaurant, café and catering talent from inside and outside Saudi Arabia according to your requirements.", training: "Tell us what your team needs and we will coordinate a practical on-site or remote program.", parttime: "Join Bait Al Mataem's part-time and project-based talent network for restaurants, cafés and catering." },
    choose: "Choose", region: "Region", place: "Governorate / city", sector: "Business sector", source: "Worker source", inside: "Inside Saudi Arabia", outside: "Outside Saudi Arabia",
    role: "Required role or specialty", count: "Headcount", salary: "Approximate salary", hours: "Working hours", housing: "Housing / meals, if any", date: "Required date", phone: "Contact number", notes: "Notes",
    languages: "Required languages", name: "Full name", experience: "Years of experience", availability: "Available days and times", cv: "CV or portfolio link", restaurantType: "Restaurant type",
    employeeCount: "Number of employees", departments: "Departments to train", trainingType: "Training type", delivery: "Delivery method", onSite: "On site", remote: "Remote", submit: "Submit request", submitting: "Submitting...",
    success: "Your request has been recorded. Bait Al Mataem will contact you after review.", error: "The request could not be submitted. Check the details and try again.", another: "Send another request",
    sectors: ["Restaurants", "Cafés", "Catering"], languageOptions: ["Arabic", "English", "Hindi", "Urdu", "Bengali", "Turkish", "Russian", "Other"],
  },
} as const;

export function StaffingForms({ locale, initial = "staffing" }: { locale: Locale; initial?: FormKind }) {
  const language = contentLocale(locale);
  const copy = COPY[language];
  const [kind, setKind] = useState<FormKind>(initial);
  const [regionIndex, setRegionIndex] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "done" | "error">("idle");
  const places = regionIndex === "" ? [] : SAUDI_REGIONS[Number(regionIndex)].places;

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setStatus("submitting");
    const form = new FormData(event.currentTarget);
    const data = Object.fromEntries(form.entries()) as Record<string, FormDataEntryValue | string[]>;
    data.languages = form.getAll("languages").map(String);
    const params = new URLSearchParams(window.location.search);
    const utm = Object.fromEntries([...params.entries()].filter(([key]) => key.startsWith("utm_")));
    try {
      const response = await fetch("/api/leads", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ type: kind, source: params.get("utm_source") || "website", page: window.location.pathname, service: "staffing-training", locale, contactPhone: String(data.phone || ""), data, utm }) });
      if (!response.ok) throw new Error("submit_failed");
      setStatus("done"); setRegionIndex(""); event.currentTarget.reset();
    } catch { setStatus("error"); }
  }

  const locationFields = <>
    <label className="block text-sm font-semibold text-ink-800">{copy.region}<select name="region" required value={regionIndex} onChange={(e) => setRegionIndex(e.target.value)} className="input-field mt-1.5"><option value="" disabled>{copy.choose}</option>{SAUDI_REGIONS.map((region, index) => <option key={region.name.en} value={index}>{region.name[language]}</option>)}</select></label>
    <SelectField name="city" label={copy.place} options={places.map((place) => place[language])} placeholder={copy.choose} disabled={!places.length} />
  </>;

  return <div id="request-forms" className="rounded-cardLg border border-sand-200 bg-white p-4 shadow-card sm:p-7">
    <div className="mb-6 grid gap-2 rounded-btn bg-sand-50 p-1 sm:grid-cols-3" role="tablist">{(["staffing", "training", "parttime"] as FormKind[]).map((tab) => <button key={tab} type="button" role="tab" aria-selected={kind === tab} onClick={() => { setKind(tab); setStatus("idle"); setRegionIndex(""); }} className={`focus-ring rounded-btn px-3 py-3 text-sm font-bold ${kind === tab ? "bg-ember-600 text-white shadow-subtle" : "text-ink-700"}`}>{copy.tabs[tab]}</button>)}</div>
    <h2 className="text-xl font-bold text-ink-950">{copy.tabs[kind]}</h2><p className="mt-2 text-sm leading-7 text-ink-600">{copy.desc[kind]}</p>
    {status === "done" ? <div className="mt-6 rounded-card border border-emerald-200 bg-emerald-50 p-5 text-sm font-semibold leading-7 text-emerald-900" role="status">{copy.success}<button type="button" onClick={() => setStatus("idle")} className="focus-ring mt-3 block text-ember-700 underline">{copy.another}</button></div> :
      <form onSubmit={submit} className="mt-6 grid gap-4 sm:grid-cols-2"><input name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
        {kind === "staffing" && <>{locationFields}<SelectField name="sector" label={copy.sector} options={copy.sectors} placeholder={copy.choose} /><SelectField name="workerSource" label={copy.source} options={[copy.inside, copy.outside]} placeholder={copy.choose} /><TextField name="job" label={copy.role} /><TextField name="count" label={copy.count} type="number" min="1" /><LanguageChoices title={copy.languages} options={copy.languageOptions} /><TextField name="salary" label={copy.salary} inputMode="numeric" required={false} /><TextField name="hours" label={copy.hours} /><TextField name="housing" label={copy.housing} required={false} /><TextField name="date" label={copy.date} type="date" /><TextField name="phone" label={copy.phone} type="tel" pattern="[+0-9 ()-]{8,21}" /><TextAreaField name="notes" label={copy.notes} required={false} /></>}
        {kind === "training" && <>{locationFields}<SelectField name="sector" label={copy.sector} options={copy.sectors} placeholder={copy.choose} /><TextField name="restaurantType" label={copy.restaurantType} /><TextField name="employeeCount" label={copy.employeeCount} type="number" min="1" /><TextField name="departments" label={copy.departments} /><TextField name="trainingType" label={copy.trainingType} /><SelectField name="delivery" label={copy.delivery} options={[copy.onSite, copy.remote]} placeholder={copy.choose} /><TextField name="date" label={copy.date} type="date" /><TextField name="phone" label={copy.phone} type="tel" pattern="[+0-9 ()-]{8,21}" /></>}
        {kind === "parttime" && <><TextField name="name" label={copy.name} />{locationFields}<SelectField name="sector" label={copy.sector} options={copy.sectors} placeholder={copy.choose} /><TextField name="specialty" label={copy.role} /><TextField name="experience" label={copy.experience} type="number" min="0" /><LanguageChoices title={copy.languages} options={copy.languageOptions} /><TextField name="availability" label={copy.availability} /><TextField name="cv" label={copy.cv} type="url" required={false} /><TextField name="phone" label={copy.phone} type="tel" pattern="[+0-9 ()-]{8,21}" /><TextAreaField name="notes" label={copy.notes} required={false} /></>}
        {status === "error" && <p className="text-sm font-semibold text-ember-700 sm:col-span-2" role="alert">{copy.error}</p>}<div className="sm:col-span-2"><button type="submit" disabled={status === "submitting"} className="focus-ring w-full rounded-btn bg-ember-600 px-6 py-3.5 text-sm font-bold text-white hover:bg-ember-700 disabled:opacity-60 sm:w-auto">{status === "submitting" ? copy.submitting : copy.submit}</button></div>
      </form>}
  </div>;
}

function LanguageChoices({ title, options }: { title: string; options: readonly string[] }) { return <fieldset className="sm:col-span-2"><legend className="text-sm font-semibold text-ink-800">{title}</legend><div className="mt-2 flex flex-wrap gap-2">{options.map((option) => <label key={option} className="flex cursor-pointer items-center gap-2 rounded-btn border border-sand-200 px-3 py-2 text-sm text-ink-700"><input type="checkbox" name="languages" value={option} className="accent-ember-600" />{option}</label>)}</div></fieldset>; }
function TextField({ name, label, required = true, ...props }: { name: string; label: string; required?: boolean } & InputHTMLAttributes<HTMLInputElement>) { return <label className="block text-sm font-semibold text-ink-800">{label}<input name={name} required={required} className="input-field mt-1.5" {...props} /></label>; }
function SelectField({ name, label, options, placeholder, disabled = false }: { name: string; label: string; options: readonly string[]; placeholder: string; disabled?: boolean }) { return <label className="block text-sm font-semibold text-ink-800">{label}<select name={name} required defaultValue="" disabled={disabled} className="input-field mt-1.5 disabled:cursor-not-allowed disabled:opacity-50"><option value="" disabled>{placeholder}</option>{options.map((option) => <option key={option} value={option}>{option}</option>)}</select></label>; }
function TextAreaField({ name, label, required = true }: { name: string; label: string; required?: boolean }) { return <label className="block text-sm font-semibold text-ink-800 sm:col-span-2">{label}<textarea name={name} required={required} rows={4} className="input-field mt-1.5" /></label>; }
