import "server-only";

const buckets = new Map<string, { count: number; resetAt: number }>();

export function allowRequest(request: Request, scope: string, limit = 6, windowMs = 60_000) {
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const key = `${scope}:${forwarded || request.headers.get("x-real-ip") || "local"}`;
  const now = Date.now();
  const current = buckets.get(key);
  if (!current || current.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }
  current.count += 1;
  return current.count <= limit;
}

export function isLikelySpam(values: Array<unknown>) {
  const combined = values.map((value) => String(value || "")).join(" ").toLowerCase();
  const links = combined.match(/https?:\/\//g)?.length || 0;
  return links > 3 || /(casino|crypto giveaway|viagra|seo backlinks)/i.test(combined);
}
