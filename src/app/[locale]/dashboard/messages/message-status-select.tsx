"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function MessageStatusSelect({
  submissionId,
  currentStatus,
  statusLabels,
}: {
  submissionId: string;
  currentStatus: string;
  statusLabels: Record<string, string>;
}) {
  const router = useRouter();
  const [status, setStatus] = useState(currentStatus);
  const [, startTransition] = useTransition();

  async function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const newStatus = e.target.value;
    const previousStatus = status;
    setStatus(newStatus);

    const supabase = createClient();
    const { error } = await supabase
      .from("contact_submissions")
      .update({ status: newStatus })
      .eq("id", submissionId);

    if (error) {
      setStatus(previousStatus);
      return;
    }

    startTransition(() => {
      router.refresh();
    });
  }

  return (
    <select
      value={status}
      onChange={handleChange}
      className="text-sm border border-black/10 rounded-lg px-2 py-1.5 bg-white focus:outline-none focus:ring-2 focus:ring-[#8b1e24]/30 shrink-0"
    >
      {Object.entries(statusLabels).map(([value, label]) => (
        <option key={value} value={value}>
          {label}
        </option>
      ))}
    </select>
  );
}
