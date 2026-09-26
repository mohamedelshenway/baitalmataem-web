"use client";

import { useState, type ReactNode } from "react";
import { BROKER_SPECIALTIES, BROKER_TYPES } from "@/lib/broker-applications";

function Field({ label, hint, children }: { label: string; hint?: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-semibold text-ink-900">{label}</span>
      {children}
      {hint && <span className="mt-1 block text-xs text-ink-500">{hint}</span>}
    </label>
  );
}

// أرقام الجوال السعودية: 05xxxxxxxx أو 9665xxxxxxxx أو +9665xxxxxxxx
function normalizeSaudiMobile(input: string): string | null {
  // تحويل الأرقام العربية (٠-٩) والفارسية (۰-۹) لأرقام إنجليزية قبل الفحص
  const latin = input.replace(/[٠-٩]/g, (d) => String(d.charCodeAt(0) - 0x0660)).replace(/[۰-۹]/g, (d) => String(d.charCodeAt(0) - 0x06f0));
  const digits = latin.replace(/[^\d]/g, "");
  if (/^05\d{8}$/.test(digits)) return digits;
  if (/^9665\d{8}$/.test(digits)) return `0${digits.slice(3)}`;
  if (/^5\d{8}$/.test(digits)) return `0${digits}`;
  return null;
}

export default function BrokerForm({ whatsappHref }: { whatsappHref?: string | null }) {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [coverageAreas, setCoverageAreas] = useState("");
  const [brokerType, setBrokerType] = useState("individual");
  const [officeName, setOfficeName] = useState("");
  const [specialties, setSpecialties] = useState<string[]>([]);
  const [experienceYears, setExperienceYears] = useState("");
  const [falLicense, setFalLicense] = useState("");
  const [notes, setNotes] = useState("");
  const [agreedTerms, setAgreedTerms] = useState(false);
  const [website, setWebsite] = useState(""); // honeypot
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  function toggleSpecialty(value: string) {
    setSpecialties((prev) => (prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    const normalizedPhone = normalizeSaudiMobile(phone);
    if (!normalizedPhone) {
      setError("اكتب رقم جوال سعودي صحيح، مثال: 0551234567");
      return;
    }
    if (specialties.length === 0) {
      setError("اختر مجال عمل واحد على الأقل.");
      return;
    }
    if (!agreedTerms) {
      setError("يلزم الموافقة على شروط التعاون قبل الإرسال.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/broker-applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName, phone: normalizedPhone, email, city, coverageAreas, brokerType, officeName,
          specialties, experienceYears, falLicense, notes, agreedTerms, website,
        }),
      });
      if (!res.ok) throw new Error("submit_failed");
      setSubmitted(true);
    } catch {
      setError("تعذّر إرسال الطلب. حاول مرة أخرى أو تواصل معنا عبر واتساب.");
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div className="rounded-cardLg border border-sand-200 bg-white p-8 text-center shadow-subtle">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-ember-600/10 text-2xl text-ember-600">
          ✓
        </div>
        <h2 className="mb-2 text-xl font-bold text-ink-900">تم استلام طلبك</h2>
        <p className="text-ink-600">
          سيراجع فريق بيت المطاعم بياناتك ويتواصل معك لترتيب مكالمة تعارف والاتفاق على آلية العمل.
        </p>
        {whatsappHref && (
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-block rounded-btn border border-ember-600 px-5 py-2.5 text-sm font-semibold text-ember-600 transition hover:bg-ember-600 hover:text-white"
          >
            تواصل معنا عبر واتساب
          </a>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 rounded-cardLg border border-sand-200 bg-white p-6 shadow-subtle sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="الاسم الكامل *">
          <input required value={fullName} onChange={(e) => setFullName(e.target.value)} className="input-field" autoComplete="name" />
        </Field>
        <Field label="رقم الجوال (واتساب) *">
          <input required type="tel" inputMode="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className="input-field" placeholder="05xxxxxxxx" autoComplete="tel" dir="ltr" />
        </Field>
        <Field label="البريد الإلكتروني">
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="input-field" autoComplete="email" dir="ltr" />
        </Field>
        <Field label="المدينة *">
          <input required value={city} onChange={(e) => setCity(e.target.value)} className="input-field" placeholder="مثال: الرياض" />
        </Field>
      </div>

      <Field label="الأحياء أو المناطق التي تغطيها" hint="مثال: شمال الرياض، حي الملقا والياسمين والنرجس">
        <input value={coverageAreas} onChange={(e) => setCoverageAreas(e.target.value)} className="input-field" />
      </Field>

      <div>
        <span className="mb-2 block text-sm font-semibold text-ink-900">صفتك *</span>
        <div className="grid gap-2 sm:grid-cols-2">
          {BROKER_TYPES.map((t) => (
            <label key={t.value} className="flex cursor-pointer items-center gap-2 rounded-card border border-sand-200 px-3 py-2.5 text-sm hover:border-ember-600/40">
              <input type="radio" name="brokerType" value={t.value} checked={brokerType === t.value} onChange={(e) => setBrokerType(e.target.value)} className="accent-ember-600" />
              {t.label}
            </label>
          ))}
        </div>
      </div>

      {brokerType === "office" && (
        <Field label="اسم المكتب أو الشركة">
          <input value={officeName} onChange={(e) => setOfficeName(e.target.value)} className="input-field" />
        </Field>
      )}

      <div>
        <span className="mb-2 block text-sm font-semibold text-ink-900">مجالات عملك * <span className="font-normal text-ink-500">(اختر كل ما ينطبق)</span></span>
        <div className="grid gap-2 sm:grid-cols-2">
          {BROKER_SPECIALTIES.map((s) => (
            <label key={s.value} className="flex cursor-pointer items-center gap-2 rounded-card border border-sand-200 px-3 py-2.5 text-sm hover:border-ember-600/40">
              <input type="checkbox" checked={specialties.includes(s.value)} onChange={() => toggleSpecialty(s.value)} className="accent-ember-600" />
              {s.label}
            </label>
          ))}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="سنوات الخبرة في الوساطة">
          <input type="number" min={0} max={60} value={experienceYears} onChange={(e) => setExperienceYears(e.target.value)} className="input-field" />
        </Field>
        <Field label="رقم ترخيص فال (إن وجد)" hint="ترخيص الوساطة العقارية من الهيئة العامة للعقار">
          <input value={falLicense} onChange={(e) => setFalLicense(e.target.value)} className="input-field" dir="ltr" />
        </Field>
      </div>

      <Field label="نبذة عنك أو عن فرص متاحة لديك حاليًا">
        <textarea rows={4} value={notes} onChange={(e) => setNotes(e.target.value)} className="input-field" placeholder="مثال: لدي 3 مطاعم للتقبيل في شمال الرياض، وعلاقات مع مستثمرين في قطاع الكافيهات" />
      </Field>

      {/* حقل مخفي لصد البوتات */}
      <input type="text" name="website" value={website} onChange={(e) => setWebsite(e.target.value)} tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />

      <label className="flex cursor-pointer items-start gap-3 rounded-card border border-gold-500/30 bg-gold-300/20 p-4 text-sm leading-7 text-ink-800">
        <input type="checkbox" checked={agreedTerms} onChange={(e) => setAgreedTerms(e.target.checked)} className="mt-1.5 accent-ember-600" />
        <span>
          أوافق على أن يكون التواصل مع العملاء بخصوص الفرص التي تُسوّق عبر بيت المطاعم من خلال بيت المطاعم،
          وأن أقدّم معلومات صحيحة عن الفرص والعملاء، وأن نصيبي من العمولة يُحدَّد باتفاق مكتوب مع بيت المطاعم قبل بدء العمل على أي صفقة.
        </span>
      </label>

      {error && <p className="rounded-card bg-ember-600/5 px-3 py-2 text-sm text-ember-600">{error}</p>}

      <button type="submit" disabled={loading} className="w-full rounded-btn bg-ember-600 py-3 font-semibold text-white transition hover:bg-ember-700 disabled:opacity-60">
        {loading ? "جارٍ الإرسال..." : "إرسال طلب الانضمام"}
      </button>
    </form>
  );
}
