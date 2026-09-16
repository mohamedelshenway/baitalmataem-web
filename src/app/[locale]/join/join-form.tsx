"use client";

import { useState } from "react";

const customerTypes: { value: string; label: string }[] = [
  { value: "restaurant_owner", label: "صاحب مطعم" },
  { value: "cafe_owner", label: "صاحب كافيه" },
  { value: "investor_real_estate", label: "مستثمر مهتم بالاستثمار في العقارات" },
  { value: "other", label: "أخرى" },
];

export default function JoinForm() {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [customerType, setCustomerType] = useState("");
  const [profession, setProfession] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/customer-registrations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, phone, city, customerType, profession }),
      });

      if (!res.ok) throw new Error("submit_failed");

      setSubmitted(true);
    } catch {
      setError("حصل خطأ، جرب مرة أخرى أو تواصل معنا مباشرة");
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div className="bg-white rounded-2xl border border-black/5 p-8 text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#8b1e24]/10 text-2xl text-[#8b1e24]">
          ✓
        </div>
        <h2 className="text-lg font-bold text-[#151515] mb-2">تم استلام بياناتك</h2>
        <p className="text-sm text-[#151515]/60">سنتواصل معك قريبًا بما يناسب احتياجك</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-black/5 p-6 space-y-5">
      <div>
        <label className="block text-sm font-medium text-[#151515] mb-1">الاسم الكامل</label>
        <input
          required
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="w-full rounded-lg border border-black/10 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#8b1e24]/30"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-[#151515] mb-1">رقم الهاتف</label>
        <input
          required
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="05xxxxxxxx"
          className="w-full rounded-lg border border-black/10 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#8b1e24]/30"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-[#151515] mb-1">المدينة</label>
        <input
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="w-full rounded-lg border border-black/10 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#8b1e24]/30"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-[#151515] mb-2">أنت تحديدًا؟</label>
        <div className="space-y-2">
          {customerTypes.map((type) => (
            <label
              key={type.value}
              className="flex items-center gap-2 rounded-lg border border-black/10 px-3 py-2 text-sm cursor-pointer hover:border-[#8b1e24]/30"
            >
              <input
                type="radio"
                name="customerType"
                value={type.value}
                required
                checked={customerType === type.value}
                onChange={(e) => setCustomerType(e.target.value)}
                className="accent-[#8b1e24]"
              />
              {type.label}
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-[#151515] mb-1">
          وظيفتك <span className="text-[#151515]/40">(اختياري)</span>
        </label>
        <input
          value={profession}
          onChange={(e) => setProfession(e.target.value)}
          className="w-full rounded-lg border border-black/10 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#8b1e24]/30"
        />
      </div>

      {error && (
        <p className="text-sm text-[#8b1e24] bg-[#8b1e24]/5 rounded-lg px-3 py-2">{error}</p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-[#8b1e24] text-white rounded-lg py-2.5 text-sm font-medium hover:bg-[#6f1720] transition disabled:opacity-60"
      >
        {loading ? "جارٍ الإرسال..." : "إرسال"}
      </button>
    </form>
  );
}
