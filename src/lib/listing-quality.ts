import type { Listing } from "@/lib/types";

export function calculateListingQuality(listing: Listing) {
  const checks = [
    listing.media.filter((media) => media.type === "image").length >= 3,
    listing.description.ar.trim().length >= 120,
    Boolean(listing.priceSAR),
    Boolean(listing.sizeSqm),
    Boolean(listing.rentSAR),
    Boolean(listing.city.ar && listing.area.ar),
    Boolean(listing.equipmentSummary),
    listing.features.length >= 3,
    Boolean(listing.updatedAt || listing.createdAt),
    Boolean(listing.contactPhoneVerified),
  ];
  return Math.round((checks.filter(Boolean).length / checks.length) * 100);
}
