"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function AddBrokerForm() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const supabase = createClient();
    const { error: insertError } = await supabase.from("brokers").insert({
      full_name: fullName,
      phone,
      address: address || null,
      notes: notes || null,
    });

    setLoading(false);

    if (insertError) {
      setError("فشل حفظ الوسيط");
      return;
    }

    setFullName("");
    setPhone("");
    setAddress("");
    setNotes("");
    setOpen(false);
    router.refresh();
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="bg-[#8b1e24] text-white rounded-lg px-4 py-2 text-sm font-medium hover:bg-[#6f1720] transition"
      >
        + إضافة وسيط جديد
      </button>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl border border-black/5 p-5 space-y-3"
    >
      <h2 className="font-bold text-[#151515]">إضافة وسيط جديد</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <input
          required
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          placeholder="الاسم الكامل"
          className="rounded-lg border border-black/10 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#8b1e24]/30"
        />
        <input
          required
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="رقم الهاتف"
          className="rounded-lg border border-black/10 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#8b1e24]/30"
        />
        <input
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="العنوان (اختياري)"
          className="rounded-lg border border-black/10 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#8b1e24]/30 sm:col-span-2"
        />
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="ملاحظات (اختياري)"
          rows={2}
          className="rounded-lg border border-black/10 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#8b1e24]/30 sm:col-span-2"
        />
      </div>

      {error && <p className="text-sm text-[#8b1e24]">{error}</p>}

      <div className="flex gap-2">
        <button
          type="submit"
          disabled={loading}
          className="bg-[#8b1e24] text-white rounded-lg px-4 py-2 text-sm font-medium hover:bg-[#6f1720] transition disabled:opacity-60"
        >
          {loading ? "جارٍ الحفظ..." : "حفظ"}
        </button>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="text-sm text-[#151515]/60 hover:text-[#151515] px-4 py-2"
        >
          إلغاء
        </button>
      </div>
    </form>
  );
}
