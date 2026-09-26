"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export const LEAD_STATUS_LABELS: Record<string, string> = {
  New: "جديد",
  Contacted: "تم التواصل",
  Qualified: "مؤهل",
  Proposal: "تم إرسال عرض",
  Won: "تم الإغلاق",
  Lost: "لم يكتمل",
};

export default function LeadStatusSelect({ id, current }: { id: string; current: string }) {
  const router = useRouter();
  const [status, setStatus] = useState(current);
  const [error, setError] = useState(false);

  async function change(next: string) {
    const prev = status;
    setStatus(next);
    setError(false);
    const { error: e } = await createClient()
      .from("leads")
      .update({ status: next, updated_at: new Date().toISOString() })
      .eq("id", id);
    if (e) {
      setStatus(prev);
      setError(true);
      return;
    }
    router.refresh();
  }

  return (
    <div>
      <select
        value={status}
        onChange={(e) => change(e.target.value)}
        className="rounded-lg border border-black/10 bg-white px-2 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-[#8b1e24]/30"
      >
        {Object.entries(LEAD_STATUS_LABELS).map(([v, l]) => (
          <option key={v} value={v}>
            {l}
          </option>
        ))}
      </select>
      {error && <p className="mt-1 text-xs text-[#8b1e24]">فشل التحديث</p>}
    </div>
  );
}
