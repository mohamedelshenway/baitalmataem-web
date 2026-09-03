"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export type SubmissionRawData = {
  kind?: string;
  region?: string;
  city?: string;
  area?: string | null;
  activityType?: string | null;
  priceSAR?: string | null;
  rentSAR?: string | null;
  sizeSqm?: string | null;
  seatingCapacity?: string | null;
  description?: string | null;
  equipmentSummary?: string | null;
  contactName?: string;
  contactPhone?: string;
  contactCity?: string | null;
  photoCount?: number;
  videoCount?: number;
  photoUrls?: string[];
  videoUrls?: string[];
};

export const KIND_LABELS: Record<string, string> = {
  restaurant_taqbeel: "مطعم للتقبيل",
  restaurant_sale: "مطعم للبيع",
  lease_unit: "محل / موقع للإيجار",
  investment_opportunity: "فرصة استثمارية",
  seeking_investor: "مطعم يبحث عن مستثمر",
  operating_partner_needed: "مشروع يحتاج شريك تشغيل",
  site_for_restaurant: "موقع مناسب لنشاط مطاعم",
};

function toNumberOrNull(v: string | null | undefined): number | null {
  if (!v) return null;
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
}

export default function SubmissionActions({
  submissionId,
  rawData,
  currentStatus,
}: {
  submissionId: string;
  rawData: SubmissionRawData;
  currentStatus: string;
}) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [noteOpen, setNoteOpen] = useState(false);
  const [note, setNote] = useState("");

  async function approve() {
    setBusy(true);
    setError(null);
    const supabase = createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    const activityLabel =
      rawData.activityType || KIND_LABELS[rawData.kind ?? ""] || "فرصة";
    const title = rawData.city
      ? `${activityLabel} في ${rawData.city}`
      : activityLabel;

    const descriptionParts = [
      rawData.description ?? null,
      rawData.equipmentSummary ? `المعدات: ${rawData.equipmentSummary}` : null,
      rawData.seatingCapacity
        ? `عدد المقاعد: ${rawData.seatingCapacity}`
        : null,
      rawData.region ? `المنطقة: ${rawData.region}` : null,
    ].filter((p): p is string => Boolean(p));

    const { data: inserted, error: insertError } = await supabase
      .from("listings")
      .insert({
        title,
        city: rawData.city ?? "",
        district: rawData.area ?? null,
        kind: rawData.kind ?? null,
        activity_type: activityLabel,
        area_sqm: toNumberOrNull(rawData.sizeSqm),
        monthly_rent: toNumberOrNull(rawData.rentSAR),
        asking_price: toNumberOrNull(rawData.priceSAR),
        description: descriptionParts.length
          ? descriptionParts.join(" — ")
          : null,
        images: rawData.photoUrls?.length ? rawData.photoUrls : null,
        status: "pending_review",
        is_verified: false,
        submitted_by_name: rawData.contactName ?? null,
        submitted_by_phone: rawData.contactPhone ?? null,
        created_by: user?.id ?? null,
      })
      .select("id")
      .single();

    if (insertError || !inserted) {
      setError(insertError?.message ?? "تعذر إنشاء الفرصة، حاول مرة أخرى");
      setBusy(false);
      return;
    }

    const { error: updateError } = await supabase
      .from("listing_submissions")
      .update({ status: "approved", converted_to_listing_id: inserted.id })
      .eq("id", submissionId);

    setBusy(false);
    if (updateError) {
      setError(updateError.message);
      return;
    }
    router.refresh();
  }

  async function reject() {
    setBusy(true);
    setError(null);
    const supabase = createClient();
    const { error: updateError } = await supabase
      .from("listing_submissions")
      .update({ status: "rejected" })
      .eq("id", submissionId);
    setBusy(false);
    if (updateError) {
      setError(updateError.message);
      return;
    }
    router.refresh();
  }

  async function requestChanges() {
    if (!note.trim()) {
      setError("اكتب ملاحظة توضح المطلوب تعديله قبل الإرسال");
      return;
    }
    setBusy(true);
    setError(null);
    const supabase = createClient();
    const { error: updateError } = await supabase
      .from("listing_submissions")
      .update({ status: "changes_requested", admin_note: note.trim() })
      .eq("id", submissionId);
    setBusy(false);
    if (updateError) {
      setError(updateError.message);
      return;
    }
    setNoteOpen(false);
    setNote("");
    router.refresh();
  }

  if (currentStatus === "approved") {
    return (
      <span className="text-xs text-green-700 font-medium bg-green-50 rounded-lg px-3 py-1.5">
        تم القبول وتحويلها لفرصة
      </span>
    );
  }
  if (currentStatus === "rejected") {
    return (
      <span className="text-xs text-[#8b1e24] font-medium bg-[#8b1e24]/5 rounded-lg px-3 py-1.5">
        مرفوضة
      </span>
    );
  }

  return (
    <div className="space-y-2">
      {error && <p className="text-xs text-[#8b1e24]">{error}</p>}
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={approve}
          disabled={busy}
          className="bg-[#8b1e24] text-white rounded-lg px-3 py-1.5 text-xs font-medium hover:bg-[#6f1720] transition disabled:opacity-60"
        >
          قبول وتحويل لفرصة
        </button>
        <button
          type="button"
          onClick={() => setNoteOpen((v) => !v)}
          disabled={busy}
          className="bg-[#c8a45d]/10 text-[#8b1e24] rounded-lg px-3 py-1.5 text-xs font-medium hover:bg-[#c8a45d]/20 transition"
        >
          طلب تعديل
        </button>
        <button
          type="button"
          onClick={reject}
          disabled={busy}
          className="bg-black/5 text-[#151515]/70 rounded-lg px-3 py-1.5 text-xs font-medium hover:bg-black/10 transition"
        >
          رفض
        </button>
      </div>
      {noteOpen && (
        <div className="flex gap-2 items-start">
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            rows={2}
            placeholder="اكتب توضيح للمطلوب تعديله عشان يوصل للمرسل..."
            className="flex-1 rounded-lg border border-black/10 px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-[#8b1e24]/30"
          />
          <button
            type="button"
            onClick={requestChanges}
            disabled={busy}
            className="bg-[#151515] text-white rounded-lg px-3 py-2 text-xs font-medium hover:bg-black transition disabled:opacity-60"
          >
            إرسال
          </button>
        </div>
      )}
    </div>
  );
}
