/**
 * تتبّع مصدر الزائر (attribution) بشكل بسيط من طرف العميل فقط — بدون أي أدوات تحليلات خارجية.
 *
 * الفكرة: أول مرة يفتح فيها الزائر الموقع في الجلسة، نلتقط "أول لمسة" (first touch):
 * إما UTM params (utm_source/utm_medium/utm_campaign) لو وصل من إعلان أو رابط حملة،
 * أو نطاق المُحيل (document.referrer) لو وصل من جوجل/انستجرام/تويتر... إلخ،
 * أو "direct" لو دخل الرابط مباشرة أو من تطبيق لا يرسل referrer.
 *
 * نخزّنها في sessionStorage عشان تفضل ثابتة طول الجلسة حتى لو الزائر تنقّل بين صفحات
 * تانية بدون UTM params، فلما يملأ نموذج تواصل أو يعرض فرصة نعرف مصدره الحقيقي الأول
 * مش آخر صفحة داخلية زارها.
 */

const STORAGE_KEY = "bam_source";

function hostnameOf(url: string): string | null {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return null;
  }
}

function computeSource(): string {
  if (typeof window === "undefined") return "direct";

  const params = new URLSearchParams(window.location.search);
  const utmSource = params.get("utm_source");
  const utmMedium = params.get("utm_medium");
  const utmCampaign = params.get("utm_campaign");
  const ref = params.get("ref");

  if (utmSource) {
    const parts = [utmSource, utmMedium, utmCampaign].filter(Boolean);
    return `utm:${parts.join("/")}`;
  }

  if (ref) return `ref:${ref}`;

  const referrer = document.referrer;
  if (referrer) {
    const refHost = hostnameOf(referrer);
    const currentHost = window.location.hostname;
    if (refHost && refHost !== currentHost) {
      return `referrer:${refHost}`;
    }
  }

  return "direct";
}

/** يرجّع مصدر أول لمسة للزائر في الجلسة الحالية، ويخزّنه أول مرة فقط. */
export function getAttributionSource(): string {
  if (typeof window === "undefined") return "direct";
  try {
    const stored = window.sessionStorage.getItem(STORAGE_KEY);
    if (stored) return stored;
    const computed = computeSource();
    window.sessionStorage.setItem(STORAGE_KEY, computed);
    return computed;
  } catch {
    // sessionStorage ممكن يكون غير متاح (وضع خاص مثلًا) — نرجع القيمة المحسوبة بدون تخزين
    return computeSource();
  }
}
