"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { BROKER_APPLICATION_STATUS } from "@/lib/broker-applications";

export type BrokerApplicationRow = {
  id: string;
  full_name: string;
  phone: string;
  city: string;
  coverage_areas: string | null;
  office_name: string | null;
  fal_license: string | null;
  specialties: string[];
  status: string;
  converted_to_broker_id: string | null;
};

export default function ApplicationActions({ app, locale }: { app: BrokerApplicationRow; locale: string }) {
  const router = useRouter();
  const [status, setStatus] = useState(app.status);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function changeStatus(newStatus: string) {
    const prev = status;
    setStatus(newStatus);
    setError(null);
    const supabase = createClient();
    const { error: e } = await supabase.from("broker_applications").update({ status: newStatus }).eq("id", app.id);
    if (e) {
      setStatus(prev);
      setError("فشل التحديث");
      return;
    }
    router.refresh();
  }

  // اعتماد الطلب = إنشاء سجل في جدول الوسطاء الداخلي وربطه بالطلب
  async function approve() {
    setBusy(true);
    setError(null);
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const address = [app.city, app.coverage_areas].filter(Boolean).join(" — ");
    const notes = [
      app.office_name ? `المكتب: ${app.office_name}` : null,
      app.fal_license ? `ترخيص فال: ${app.fal_license}` : null,
      "مضاف من طلب انضمام عبر الموقع",
    ]
      .filter(Boolean)
      .join(" — ");

    const { data: broker, error: insertError } = await supabase
      .from("brokers")
      .insert({ full_name: app.full_name, phone: app.phone, address, notes, created_by: user?.id ?? null })
      .select("id")
      .single();

    if (insertError || !broker) {
      setError(insertError?.message ?? "تعذر إضافة الوسيط");
      setBusy(false);
      return;
    }

    const { error: updateError } = await supabase
      .from("broker_applications")
      .update({ status: "approved", converted_to_broker_id: broker.id })
      .eq("id", app.id);

    setBusy(false);
    if (updateError) {
      setError(updateError.message);
      return;
    }
    setStatus("approved");
    router.refresh();
  }

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap items-center gap-2">
        {app.converted_to_broker_id ? (
          <a
            href={`/${locale}/dashboard/brokers/${app.converted_to_broker_id}`}
            className="rounded-lg bg-[#8b1e24]/10 px-3 py-1.5 text-xs font-medium text-[#8b1e24]"
          >
            معتمد — عرض ملف الوسيط ←
          </a>
        ) : (
          <button
            type="button"
            onClick={approve}
            disabled={busy}
            className="rounded-lg bg-[#8b1e24] px-3 py-1.5 text-xs font-medium text-white transition hover:bg-[#6f1720] disabled:opacity-60"
          >
            {busy ? "جارٍ الاعتماد..." : "اعتماد وإضافة للوسطاء"}
          </button>
        )}
        <select
          value={status}
          onChange={(e) => changeStatus(e.target.value)}
          disabled={busy}
          className="rounded-lg border border-black/10 bg-white px-2 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-[#8b1e24]/30"
        >
          {Object.entries(BROKER_APPLICATION_STATUS).map(([v, l]) => (
            <option key={v} value={v}>
              {l}
            </option>
          ))}
        </select>
      </div>
      {error && <p className="text-xs text-[#8b1e24]">{error}</p>}
    </div>
  );
}
