"use client";

import { useMemo, useRef, useState, type ReactNode } from "react";
import type { Dictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/config";
import type { ListingKind } from "@/lib/types";
import { HAS_WHATSAPP, whatsappLink, mailtoLink } from "@/lib/constants";
import { SAUDI_REGIONS, citiesForRegion } from "@/lib/saudi-regions";

type PhotoItem = { id: string; file: File; previewUrl: string };
type VideoItem = { id: string; file: File; previewUrl: string; durationSeconds: number };

const TOTAL_STEPS = 10;
const MAX_PHOTOS = 10;
const MAX_VIDEOS = 2;
const MAX_VIDEO_SECONDS = 30;

let idCounter = 0;
function nextId() {
  idCounter += 1;
  return `f-${idCounter}`;
}

export function NewListingWizard({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [kind, setKind] = useState<ListingKind | "">("");
  const [region, setRegion] = useState("");
  const [city, setCity] = useState("");
  const [area, setArea] = useState("");
  const [activityType, setActivityType] = useState("");
  const [priceSAR, setPriceSAR] = useState("");
  const [rentSAR, setRentSAR] = useState("");
  const [sizeSqm, setSizeSqm] = useState("");
  const [seatingCapacity, setSeatingCapacity] = useState("");
  const [description, setDescription] = useState("");
  const [equipmentSummary, setEquipmentSummary] = useState("");
  const [photos, setPhotos] = useState<PhotoItem[]>([]);
  const [coverId, setCoverId] = useState<string | null>(null);
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [videoWarning, setVideoWarning] = useState<string | null>(null);
  const [contactName, setContactName] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [contactCity, setContactCity] = useState("");

  const dragIndex = useRef<number | null>(null);

  const kindOptions = Object.keys(dict.marketplace.kinds) as ListingKind[];

  function goNext() {
    setStep((s) => Math.min(TOTAL_STEPS, s + 1));
  }
  function goBack() {
    setStep((s) => Math.max(1, s - 1));
  }

  function onPhotosSelected(files: FileList | null) {
    if (!files) return;
    const remaining = MAX_PHOTOS - photos.length;
    if (remaining <= 0) return;
    const toAdd = Array.from(files)
      .slice(0, remaining)
      .map((file) => ({ id: nextId(), file, previewUrl: URL.createObjectURL(file) }));
    setPhotos((prev) => {
      const next = [...prev, ...toAdd];
      if (!coverId && next[0]) setCoverId(next[0].id);
      return next;
    });
  }

  function removePhoto(id: string) {
    setPhotos((prev) => prev.filter((p) => p.id !== id));
    if (coverId === id) setCoverId(null);
  }

  function reorderPhotos(from: number, to: number) {
    setPhotos((prev) => {
      const next = [...prev];
      const [moved] = next.splice(from, 1);
      next.splice(to, 0, moved);
      return next;
    });
  }

  function onVideosSelected(files: FileList | null) {
    if (!files) return;
    setVideoWarning(null);
    const remaining = MAX_VIDEOS - videos.length;
    if (remaining <= 0) return;

    Array.from(files)
      .slice(0, remaining)
      .forEach((file) => {
        const url = URL.createObjectURL(file);
        const videoEl = document.createElement("video");
        videoEl.preload = "metadata";
        videoEl.src = url;
        videoEl.onloadedmetadata = () => {
          const duration = videoEl.duration;
          if (duration > MAX_VIDEO_SECONDS) {
            setVideoWarning(dict.newListing.videoTooLong);
            URL.revokeObjectURL(url);
            return;
          }
          setVideos((prev) =>
            prev.length >= MAX_VIDEOS ? prev : [...prev, { id: nextId(), file, previewUrl: url, durationSeconds: Math.round(duration) }]
          );
        };
      });
  }

  function removeVideo(id: string) {
    setVideos((prev) => prev.filter((v) => v.id !== id));
  }

  const stepValid = useMemo(() => {
    switch (step) {
      case 1:
        return Boolean(kind);
      case 2:
        return Boolean(region && city);
      case 3:
        return Boolean(activityType);
      case 4:
        return true; // السعر قد يكون "عند التواصل"
      case 5:
        return true; // المساحة وعدد المقاعد اختياريان — كثير من مقدمي الفرص ما يعرفوش الرقم الدقيق وقت التقديم
      case 6:
        return Boolean(description);
      case 7:
        return photos.length > 0;
      case 8:
        return true; // الفيديو اختياري
      case 9:
        return Boolean(contactName && contactPhone && contactCity);
      default:
        return true;
    }
  }, [step, kind, region, city, activityType, sizeSqm, description, photos.length, contactName, contactPhone, contactCity]);

  async function handleSubmit() {
    setSubmitting(true);
    setErrorMsg(null);
    try {
      const form = new FormData();
      form.append("kind", kind);
      form.append("region", region);
      form.append("city", city);
      form.append("area", area);
      form.append("activityType", activityType);
      form.append("priceSAR", priceSAR);
      form.append("rentSAR", rentSAR);
      form.append("sizeSqm", sizeSqm);
      form.append("seatingCapacity", seatingCapacity);
      form.append("description", description);
      form.append("equipmentSummary", equipmentSummary);
      form.append("contactName", contactName);
      form.append("contactPhone", contactPhone);
      form.append("contactCity", contactCity);
      form.append("coverId", coverId || "");
      photos.forEach((p) => form.append("photos", p.file, p.file.name));
      videos.forEach((v) => form.append("videos", v.file, v.file.name));

      const res = await fetch("/api/listings", { method: "POST", body: form });
      if (!res.ok) throw new Error("submit_failed");
      setSubmitted(true);
    } catch {
      setErrorMsg(dict.newListing.errorGeneric);
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    const confirmHref = (HAS_WHATSAPP && whatsappLink(`مرحبًا، أرسلت للتو فرصة عبر الموقع وأحب أتأكد إنها وصلتكم (${kind || "-"} — ${city})`)) ||
      mailtoLink("تأكيد استلام فرصة مُرسلة عبر الموقع");
    return (
      <div className="mx-auto max-w-lg space-y-4">
        <div className="rounded-card border border-sand-200 bg-white p-8 text-center shadow-subtle">
          <span className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-ember-600/10 text-2xl text-ember-600">✓</span>
          <h2 className="mb-2 text-xl font-bold text-ink-900">{dict.newListing.successTitle}</h2>
          <p className="text-ink-600">{dict.newListing.successBody}</p>
        </div>
        {/* بيانات هذا النموذج لا تُخزَّن بعد في قاعدة بيانات فعلية (المرحلة الحالية MVP قبل ربط Supabase) —
            هذا التنبيه صريح ومقصود حتى لا يفترض الزائر أن فرصته وصلت فعليًا لفريق بيت المطاعم دون تأكيد إضافي. */}
        <div className="rounded-card border border-gold-500/30 bg-gold-300/25 p-5 text-sm leading-7 text-ink-800">
          <p className="mb-3">{dict.newListing.mvpStorageNotice}</p>
          <a href={confirmHref} target="_blank" rel="noopener noreferrer" className="focus-ring inline-block rounded-btn bg-ember-600 px-5 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-ember-700">
            {dict.listing.ctaContact}
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl">
      {/* مؤشر الخطوات */}
      <div className="mb-3 flex flex-wrap items-center gap-1.5">
        {Array.from({ length: TOTAL_STEPS }, (_, i) => i + 1).map((n) => (
          <span
            key={n}
            className={`h-1.5 flex-1 rounded-full transition-colors ${n <= step ? "bg-ember-600" : "bg-sand-200"}`}
            aria-hidden
          />
        ))}
      </div>
      <p className="mb-7 text-sm font-semibold text-ink-500">
        <span className="text-ember-600">{step}/{TOTAL_STEPS}</span> — {dict.newListing.steps[String(step) as keyof typeof dict.newListing.steps]}
      </p>

      <div className="min-h-[300px]">
        {step === 1 && (
          <StepGrid>
            {kindOptions.map((k) => (
              <OptionCard key={k} selected={kind === k} label={dict.marketplace.kinds[k]} onClick={() => setKind(k)} />
            ))}
          </StepGrid>
        )}

        {step === 2 && (
          <div className="space-y-5">
            <Field label={dict.newListing.region}>
              <select
                value={region}
                onChange={(e) => {
                  setRegion(e.target.value);
                  setCity("");
                }}
                className="input-field"
              >
                <option value="">{dict.newListing.regionPlaceholder}</option>
                {SAUDI_REGIONS.map((r) => (
                  <option key={r.name} value={r.name}>
                    {r.name}
                  </option>
                ))}
              </select>
            </Field>
            <Field label={dict.newListing.city}>
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                disabled={!region}
                className="input-field disabled:cursor-not-allowed disabled:opacity-60"
              >
                <option value="">{region ? dict.newListing.cityPlaceholder : dict.newListing.cityPlaceholderNoRegion}</option>
                {citiesForRegion(region).map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </Field>
            <Field label={dict.newListing.district}>
              <input
                value={area}
                onChange={(e) => setArea(e.target.value)}
                className="input-field"
                placeholder={dict.newListing.districtPlaceholder}
              />
            </Field>
          </div>
        )}

        {step === 3 && (
          <Field label={dict.listing.specs.activityType}>
            <input
              value={activityType}
              onChange={(e) => setActivityType(e.target.value)}
              className="input-field"
              placeholder={dict.home.search.activityPlaceholder}
            />
          </Field>
        )}

        {step === 4 && (
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label={dict.listing.specs.price}>
              <input type="number" value={priceSAR} onChange={(e) => setPriceSAR(e.target.value)} className="input-field" placeholder={dict.common.priceOnRequest} />
            </Field>
            <Field label={dict.listing.specs.rent}>
              <input type="number" value={rentSAR} onChange={(e) => setRentSAR(e.target.value)} className="input-field" />
            </Field>
          </div>
        )}

        {step === 5 && (
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label={`${dict.listing.specs.size} (${dict.common.optional})`}>
              <input type="number" value={sizeSqm} onChange={(e) => setSizeSqm(e.target.value)} className="input-field" />
            </Field>
            <Field label={`${dict.listing.specs.seating} (${dict.common.optional})`}>
              <input type="number" value={seatingCapacity} onChange={(e) => setSeatingCapacity(e.target.value)} className="input-field" />
            </Field>
          </div>
        )}

        {step === 6 && (
          <div className="space-y-5">
            <Field label={`${dict.listing.descriptionTitle} *`}>
              <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={5} className="input-field" />
            </Field>
            <Field label={`${dict.listing.specs.equipment} (${dict.common.optional})`}>
              <textarea value={equipmentSummary} onChange={(e) => setEquipmentSummary(e.target.value)} rows={3} className="input-field" />
            </Field>
          </div>
        )}

        {step === 7 && (
          <div>
            <p className="mb-4 text-sm text-ink-600">{dict.newListing.photosHint}</p>
            <label className="focus-ring group mb-5 flex cursor-pointer flex-col items-center justify-center gap-2 rounded-card border-2 border-dashed border-sand-300 p-10 text-center transition-colors hover:border-ember-400 hover:bg-sand-50">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-sand-100 text-lg text-ember-600 group-hover:bg-ember-600/10">📷</span>
              <span className="text-sm font-semibold text-ink-800">
                {photos.length >= MAX_PHOTOS ? dict.newListing.maxPhotosReached : dict.newListing.choosePhotosPrompt}
              </span>
              <input
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                disabled={photos.length >= MAX_PHOTOS}
                onChange={(e) => onPhotosSelected(e.target.files)}
              />
            </label>
            <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
              {photos.map((p, i) => (
                <div
                  key={p.id}
                  draggable
                  onDragStart={() => (dragIndex.current = i)}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={() => {
                    if (dragIndex.current !== null && dragIndex.current !== i) reorderPhotos(dragIndex.current, i);
                    dragIndex.current = null;
                  }}
                  className="group relative aspect-square cursor-move overflow-hidden rounded-card border border-sand-200"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.previewUrl} alt="" className="h-full w-full object-cover" />
                  {coverId === p.id && (
                    <span className="absolute top-1.5 start-1.5 rounded-btn bg-ember-600 px-2 py-0.5 text-[10px] font-semibold text-white">
                      Cover
                    </span>
                  )}
                  <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-1 bg-ink-950/70 p-1.5 opacity-0 transition-opacity group-hover:opacity-100">
                    <button type="button" onClick={() => setCoverId(p.id)} className="focus-ring rounded px-1 text-[10px] font-semibold text-white">
                      {dict.newListing.setCover}
                    </button>
                    <button type="button" onClick={() => removePhoto(p.id)} className="focus-ring rounded px-1 text-[10px] font-semibold text-gold-300">
                      {dict.newListing.remove}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {step === 8 && (
          <div>
            <p className="mb-4 text-sm text-ink-600">{dict.newListing.videosHint}</p>
            <label className="focus-ring group mb-5 flex cursor-pointer flex-col items-center justify-center gap-2 rounded-card border-2 border-dashed border-sand-300 p-10 text-center transition-colors hover:border-ember-400 hover:bg-sand-50">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-sand-100 text-lg text-ember-600 group-hover:bg-ember-600/10">🎬</span>
              <span className="text-sm font-semibold text-ink-800">
                {videos.length >= MAX_VIDEOS ? dict.newListing.maxVideosReached : dict.newListing.chooseVideoPrompt}
              </span>
              <input
                type="file"
                accept="video/*"
                multiple
                className="hidden"
                disabled={videos.length >= MAX_VIDEOS}
                onChange={(e) => onVideosSelected(e.target.files)}
              />
            </label>
            {videoWarning && <p className="mb-3 text-sm font-semibold text-ember-700">{videoWarning}</p>}
            <div className="space-y-2">
              {videos.map((v) => (
                <div key={v.id} className="flex items-center justify-between rounded-card border border-sand-200 bg-white p-3 text-sm">
                  <span className="font-semibold text-ink-900">
                    {v.file.name} — {v.durationSeconds}s
                  </span>
                  <button type="button" onClick={() => removeVideo(v.id)} className="focus-ring font-semibold text-ember-700">
                    {dict.newListing.remove}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {step === 9 && (
          <div className="space-y-5">
            <Field label={`${dict.newListing.contactName} *`}>
              <input value={contactName} onChange={(e) => setContactName(e.target.value)} className="input-field" />
            </Field>
            <Field label={`${dict.newListing.contactPhone} *`}>
              <input value={contactPhone} onChange={(e) => setContactPhone(e.target.value)} className="input-field" placeholder="05xxxxxxxx" />
            </Field>
            <Field label={`${dict.newListing.contactCity} *`}>
              <input value={contactCity} onChange={(e) => setContactCity(e.target.value)} className="input-field" />
            </Field>
          </div>
        )}

        {step === 10 && (
          <div>
            <div className="mb-5 rounded-card border border-sand-200 bg-white p-5 text-sm shadow-subtle">
              <SummaryRow label={dict.marketplace.filters.kind} value={kind ? dict.marketplace.kinds[kind] : "—"} />
              <SummaryRow label={dict.newListing.region} value={region || "—"} />
              <SummaryRow label={dict.listing.specs.city} value={area ? `${city} — ${area}` : city} />
              <SummaryRow label={dict.listing.specs.activityType} value={activityType} />
              <SummaryRow label={dict.listing.specs.price} value={priceSAR || dict.common.priceOnRequest} />
              <SummaryRow label={dict.listing.specs.size} value={sizeSqm ? `${sizeSqm} m²` : "—"} />
              <SummaryRow label={dict.listing.gallery.photos} value={`${photos.length}`} />
              <SummaryRow label={dict.listing.gallery.videos} value={`${videos.length}`} />
              <SummaryRow label={dict.newListing.contactName} value={contactName} last />
            </div>
            <div className="rounded-card border border-gold-500/30 bg-gold-300/25 p-4 text-sm leading-7 text-ink-800">
              {dict.newListing.reviewNotice}
            </div>
            {errorMsg && <p className="mt-3 text-sm font-semibold text-ember-700">{errorMsg}</p>}
          </div>
        )}
      </div>

      <div className="mt-9 flex items-center justify-between">
        <button
          type="button"
          onClick={goBack}
          disabled={step === 1}
          className="focus-ring rounded-btn border border-ink-900/15 px-6 py-3 text-sm font-semibold text-ink-800 transition-opacity disabled:opacity-0"
        >
          {dict.newListing.back}
        </button>

        {step < TOTAL_STEPS ? (
          <button
            type="button"
            onClick={goNext}
            disabled={!stepValid}
            className="focus-ring rounded-btn bg-ember-600 px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-ember-700 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {dict.newListing.next}
          </button>
        ) : (
          <button
            type="button"
            onClick={handleSubmit}
            disabled={submitting}
            className="focus-ring rounded-btn bg-ember-600 px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-ember-700 disabled:opacity-60"
          >
            {submitting ? dict.newListing.submitting : dict.newListing.submit}
          </button>
        )}
      </div>
    </div>
  );
}

function StepGrid({ children }: { children: ReactNode }) {
  return <div className="grid gap-3 sm:grid-cols-2">{children}</div>;
}

function OptionCard({ selected, label, onClick }: { selected: boolean; label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`focus-ring flex items-center justify-between gap-2 rounded-card border-2 p-5 text-start text-sm font-semibold transition-colors ${
        selected ? "border-ember-600 bg-ember-600/5 text-ember-700" : "border-sand-200 text-ink-800 hover:border-sand-300"
      }`}
    >
      {label}
      {selected && <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-ember-600 text-[11px] text-white">✓</span>}
    </button>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-semibold text-ink-900">{label}</label>
      {children}
    </div>
  );
}

function SummaryRow({ label, value, last = false }: { label: string; value: string; last?: boolean }) {
  return (
    <div className={`flex justify-between gap-3 py-2 ${last ? "" : "border-b border-sand-100"}`}>
      <span className="font-semibold text-ink-500">{label}</span>
      <span className="font-semibold text-ink-900">{value || "—"}</span>
    </div>
  );
}
