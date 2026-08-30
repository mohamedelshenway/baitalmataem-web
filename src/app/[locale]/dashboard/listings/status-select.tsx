"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function StatusSelect({
  listingId,
  currentStatus,
  statusLabels,
}: {
  listingId: string;
  currentStatus: string;
  statusLabels: Record<string, string>;
}) {
  const router = useRouter();
  const [status, setStatus] = useState(currentStatus);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  async function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const newStatus = e.target.value;
    const previousStatus = status;
    setStatus(newStatus);
    setError(null);

    const supabase = createClient();
    const { error: updateError } = await supabase
      .from("listings")
      .update({ status: newStatus, updated_at: new Date().toISOString() })
      .eq("id", listingId);

    if (updateError) {
      setStatus(previousStatus);
      setError("فشل التحديث");
      return;
    }

    startTransition(() => {
      router.refresh();
    });
  }

  return (
    <div>
      <select
        value={status}
        onChange={handleChange}
        disabled={isPending}
        className="text-sm border border-black/10 rounded-lg px-2 py-1.5 bg-white focus:outline-none focus:ring-2 focus:ring-[#8b1e24]/30 disabled:opacity-60"
      >
        {Object.entries(statusLabels).map(([value, label]) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
      {error && <p className="text-xs text-[#8b1e24] mt-1">{error}</p>}
    </div>
  );
}
