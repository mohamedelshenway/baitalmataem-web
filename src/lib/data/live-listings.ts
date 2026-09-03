import { createClient } from "@/lib/supabase/server";
import type { Listing, ListingKind, ListingMedia } from "@/lib/types";
import { LISTINGS, getListingBySlug } from "@/lib/data/listings";

// أنواع الفرص المعروفة في الموقع (تطابق ListingKind في src/lib/types.ts).
// أي قيمة في عمود kind خارج القائمة دي (سجل قديم أو مُدخل يدويًا بشكل خاطئ) بترجع "restaurant_taqbeel"
// كقيمة احتياطية بس عشان الصفحة متطلعش فاضية أو تكسر — مش ادّعاء إن ده نوعها الحقيقي.
const KNOWN_KINDS: ListingKind[] = [
  "restaurant_taqbeel",
  "restaurant_sale",
  "lease_unit",
  "investment_opportunity",
  "seeking_investor",
  "operating_partner_needed",
  "site_for_restaurant",
];

type DbListingRow = {
  id: string;
  title: string | null;
  city: string | null;
  district: string | null;
  activity_type: string | null;
  kind: string | null;
  area_sqm: number | null;
  monthly_rent: number | null;
  asking_price: number | null;
  description: string | null;
  images: string[] | null;
  status: string;
  views_count: number | null;
  created_at: string;
};

const SELECT_COLUMNS =
  "id, title, city, district, activity_type, kind, area_sqm, monthly_rent, asking_price, description, images, status, views_count, created_at";

function summarize(text: string | null, max = 160): string {
  if (!text) return "";
  const trimmed = text.trim();
  return trimmed.length > max ? `${trimmed.slice(0, max - 1)}…` : trimmed;
}

// جدول listings الفعلي بيحفظ حالة تشغيلية/إدارية (draft/pending_review/published/paused/closed)،
// أما Listing.status فهو حالة تسويقية تظهر للمستثمر المتصفح (متاح/تحت التفاوض/محجوز/تمت الصفقة/غير متاح).
// المفهومان مختلفان ومفيش عمود مباشر للتاني، فبنعمل أقرب تحويل ممكن بدون اختراع معلومة غير موجودة.
function mapStatus(dbStatus: string): Listing["status"] {
  if (dbStatus === "paused") return "unavailable";
  if (dbStatus === "closed") return "closed";
  return "available"; // published أو أي حالة نشطة تانية
}

function mapMedia(images: string[] | null): ListingMedia[] {
  if (!images || images.length === 0) return [];
  return images.map((url, i) => ({
    id: `db-${i}`,
    type: /\.(mp4|mov|webm)(\?|$)/i.test(url) ? "video" : "image",
    url,
    alt: "",
    isCover: i === 0,
  }));
}

function mapDbListingToListing(row: DbListingRow): Listing {
  const kind: ListingKind =
    row.kind && (KNOWN_KINDS as string[]).includes(row.kind)
      ? (row.kind as ListingKind)
      : "restaurant_taqbeel";
  const bilingual = (text: string) => ({ ar: text, en: text });

  return {
    slug: row.id,
    kind,
    status: mapStatus(row.status),
    moderation: "approved",
    title: bilingual(row.title ?? "فرصة بدون عنوان"),
    summary: bilingual(summarize(row.description ?? null) || (row.activity_type ?? "")),
    description: bilingual(row.description ?? ""),
    city: bilingual(row.city ?? ""),
    area: bilingual(row.district ?? ""),
    activityType: bilingual(row.activity_type ?? "—"),
    priceSAR: row.asking_price ?? undefined,
    rentSAR: row.monthly_rent ?? undefined,
    sizeSqm: row.area_sqm ?? undefined,
    // بيانات تشغيلية تفصيلية (حالة التشغيل، المعدات، المطبخ، المواقف) مش متاحة في نموذج
    // الإدخال الحالي — بنسيبها "لا ينطبق"/فاضية بدل ما نخترعها.
    operatingState: "not_applicable",
    features: [],
    media: mapMedia(row.images),
    isSample: false,
    views: row.views_count ?? 0,
    createdAt: row.created_at,
  };
}

/** كل الفرص الحقيقية المنشورة فعليًا للجمهور (status = published)، الأحدث أولًا. */
export async function getPublishedListings(): Promise<Listing[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("listings")
    .select(SELECT_COLUMNS)
    .eq("status", "published")
    .order("created_at", { ascending: false });

  if (error || !data) {
    if (error) {
      console.error("[live-listings] فشل تحميل الفرص المنشورة:", error.message);
    }
    return [];
  }

  return data.map((row) => mapDbListingToListing(row as DbListingRow));
}

async function getPublishedListingById(id: string): Promise<Listing | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("listings")
    .select(SELECT_COLUMNS)
    .eq("id", id)
    .eq("status", "published")
    .maybeSingle();

  if (error || !data) return null;
  return mapDbListingToListing(data as DbListingRow);
}

/**
 * يبحث عن فرصة بالـ slug: أولًا في بيانات العرض التجريبية (مطابقة فورية بدون استعلام)،
 * ولو مالقاش، يجرب كفرصة حقيقية (id في قاعدة البيانات). كده روابط الفرص التجريبية القديمة
 * تفضل شغالة زي ما هي، وروابط الفرص الحقيقية الجديدة (اللي شكل الـ slug بتاعها = id) تشتغل كمان.
 */
export async function resolveListing(
  slugOrId: string,
): Promise<{ listing: Listing; source: "sample" | "live" } | null> {
  const sample = getListingBySlug(slugOrId);
  if (sample) return { listing: sample, source: "sample" };

  const live = await getPublishedListingById(slugOrId);
  if (live) return { listing: live, source: "live" };

  return null;
}

/** الفرص التجريبية المعتمدة (moderation === "approved")، تُستخدم كاحتياطي لما لا توجد فرص حقيقية منشورة بعد. */
export function getSampleApprovedListings(): Listing[] {
  return LISTINGS.filter((l) => l.moderation === "approved");
}
