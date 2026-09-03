"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { KIND_LABELS } from "../submissions/submission-actions";

const KIND_OPTIONS = Object.entries(KIND_LABELS) as [string, string][];

const INPUT_CLASS =
  "w-full rounded-lg border border-black/10 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#8b1e24]/30";

const statusOptions: { value: string; label: string }[] = [
  { value: "draft", label: "مسودة" },
  { value: "pending_review", label: "بانتظار المراجعة" },
  { value: "published", label: "منشورة" },
  { value: "paused", label: "متوقفة مؤقتًا" },
  { value: "closed", label: "مغلقة" },
];

export default function NewListingForm() {
  const router = useRouter();
  const params = useParams();
  const locale = params.locale as string;

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const form = new FormData(e.currentTarget);
    const numberOrNull = (key: string) => {
      const v = form.get(key);
      if (!v || String(v).trim() === "") return null;
      const n = Number(v);
      return Number.isFinite(n) ? n : null;
    };
    const textOrNull = (key: string) => {
      const v = form.get(key);
      return v && String(v).trim() !== "" ? String(v).trim() : null;
    };

    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { error: insertError } = await supabase.from("listings").insert({
      title: String(form.get("title") ?? "").trim(),
      city: textOrNull("city"),
      district: textOrNull("district"),
      kind: textOrNull("kind"),
      activity_type: textOrNull("activity_type"),
      area_sqm: numberOrNull("area_sqm"),
      monthly_rent: numberOrNull("monthly_rent"),
      asking_price: numberOrNull("asking_price"),
      monthly_sales: numberOrNull("monthly_sales"),
      reason_for_sale: textOrNull("reason_for_sale"),
      description: textOrNull("description"),
      status: String(form.get("status") ?? "draft"),
      is_verified: form.get("is_verified") === "on",
      submitted_by_name: textOrNull("submitted_by_name"),
      submitted_by_phone: textOrNull("submitted_by_phone"),
      submitted_by_email: textOrNull("submitted_by_email"),
      created_by: user?.id ?? null,
    });

    setSubmitting(false);

    if (insertError) {
      setError(insertError.message);
      return;
    }

    router.push(`/${locale}/dashboard/listings`);
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white rounded-2xl border border-black/5 p-6 space-y-4">
        <h2 className="font-bold text-[#151515]">البيانات الأساسية</h2>

        <Field label="عنوان الفرصة *">
          <input name="title" required className={INPUT_CLASS} />
        </Field>

        <Field label="نوع الفرصة *">
          <select name="kind" required defaultValue="" className={INPUT_CLASS}>
            <option value="" disabled>
              اختر نوع الفرصة
            </option>
            {KIND_OPTIONS.map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </Field>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="المدينة">
            <input name="city" className={INPUT_CLASS} />
          </Field>
          <Field label="الحي">
            <input name="district" className={INPUT_CLASS} />
          </Field>
        </div>

        <Field label="نوع النشاط">
          <input
            name="activity_type"
            placeholder="مثال: مطعم وجبات سريعة"
            className={INPUT_CLASS}
          />
        </Field>

        <Field label="الوصف">
          <textarea name="description" rows={4} className={INPUT_CLASS} />
        </Field>
      </div>

      <div className="bg-white rounded-2xl border border-black/5 p-6 space-y-4">
        <h2 className="font-bold text-[#151515]">الأرقام المالية</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="المساحة (م²)">
            <input
              name="area_sqm"
              type="number"
              step="0.01"
              className={INPUT_CLASS}
            />
          </Field>
          <Field label="الإيجار الشهري (ر.س)">
            <input
              name="monthly_rent"
              type="number"
              step="0.01"
              className={INPUT_CLASS}
            />
          </Field>
          <Field label="السعر المطلوب (ر.س)">
            <input
              name="asking_price"
              type="number"
              step="0.01"
              className={INPUT_CLASS}
            />
          </Field>
          <Field label="متوسط المبيعات الشهرية (ر.س)">
            <input
              name="monthly_sales"
              type="number"
              step="0.01"
              className={INPUT_CLASS}
            />
          </Field>
        </div>
        <Field label="سبب البيع/العرض">
          <input name="reason_for_sale" className={INPUT_CLASS} />
        </Field>
      </div>

      <div className="bg-white rounded-2xl border border-black/5 p-6 space-y-4">
        <h2 className="font-bold text-[#151515]">
          بيانات صاحب الفرصة (اختياري)
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Field label="الاسم">
            <input name="submitted_by_name" className={INPUT_CLASS} />
          </Field>
          <Field label="الجوال">
            <input name="submitted_by_phone" className={INPUT_CLASS} />
          </Field>
          <Field label="البريد الإلكتروني">
            <input
              name="submitted_by_email"
              type="email"
              className={INPUT_CLASS}
            />
          </Field>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-black/5 p-6 space-y-4">
        <h2 className="font-bold text-[#151515]">النشر</h2>
        <Field label="الحالة">
          <select name="status" defaultValue="draft" className={INPUT_CLASS}>
            {statusOptions.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </Field>
        <label className="flex items-center gap-2 text-sm text-[#151515]">
          <input type="checkbox" name="is_verified" className="rounded" />
          فرصة موثّقة (Verified)
        </label>
      </div>

      {error && (
        <p className="text-sm text-[#8b1e24] bg-[#8b1e24]/5 rounded-lg px-4 py-3">
          حصل خطأ أثناء الحفظ: {error}
        </p>
      )}

      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={submitting}
          className="bg-[#8b1e24] text-white rounded-lg px-6 py-2.5 text-sm font-medium hover:bg-[#6f1720] transition disabled:opacity-60"
        >
          {submitting ? "جارٍ الحفظ..." : "حفظ الفرصة"}
        </button>
      </div>
    </form>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-[#151515] mb-1">
        {label}
      </label>
      {children}
    </div>
  );
}
