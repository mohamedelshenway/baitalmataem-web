import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

function bucketSource(source: string): { key: string; label: string } {
  const s = source || "direct";
  if (s.startsWith("utm:")) {
    const src = (s.slice(4).split("/")[0] || "").toLowerCase();
    if (src.includes("whatsapp")) return { key: "whatsapp", label: "واتساب (لينك مخصص)" };
    if (src.includes("instagram")) return { key: "instagram", label: "انستقرام" };
    if (src.includes("facebook")) return { key: "facebook", label: "فيسبوك" };
    if (src.includes("tiktok")) return { key: "tiktok", label: "تيك توك" };
    if (src.includes("google")) return { key: "google_ads", label: "إعلانات جوجل" };
    return { key: `utm_${src || "other"}`, label: `حملة: ${src || s}` };
  }
  if (s.startsWith("referrer:")) {
    const host = s.slice(9).toLowerCase();
    if (host.includes("google")) return { key: "google", label: "جوجل (بحث)" };
    if (host.includes("instagram")) return { key: "instagram", label: "انستقرام" };
    if (host.includes("facebook") || host.includes("fb.com")) return { key: "facebook", label: "فيسبوك" };
    if (host.includes("tiktok")) return { key: "tiktok", label: "تيك توك" };
    if (host.includes("twitter") || host.includes("x.com")) return { key: "x", label: "منصة X" };
    if (host.includes("whatsapp") || host.includes("wa.me")) return { key: "whatsapp", label: "واتساب" };
    if (host.includes("bing")) return { key: "bing", label: "Bing (بحث)" };
    return { key: `ref_${host}`, label: host };
  }
  if (s === "direct") return { key: "direct", label: "مباشر (لينك بدون مصدر، زي واتساب بدون تتبّع)" };
  return { key: "other", label: s };
}

export default async function VisitsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const supabase = await createClient();

const {
  data: { user },
} = await supabase.auth.getUser();

if (!user) {
  redirect(`/${locale}/dashboard/login`);
}

const now = new Date();
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString();
  const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString();
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000).toISOString();

const [
  { count: todayCount },
  { count: weekCount },
  { count: monthCount },
  { data: monthRows, error: monthError },
  ] = await Promise.all([
  supabase.from("page_views").select("*", { count: "exact", head: true }).gte("created_at", startOfToday),
  supabase.from("page_views").select("*", { count: "exact", head: true }).gte("created_at", sevenDaysAgo),
  supabase.from("page_views").select("*", { count: "exact", head: true }).gte("created_at", thirtyDaysAgo),
  supabase.from("page_views").select("source").gte("created_at", thirtyDaysAgo).limit(20000),
  ]);

const buckets = new Map<string, { label: string; count: number }>();
  for (const row of monthRows ?? []) {
    const { key, label } = bucketSource(row.source ?? "direct");
    const existing = buckets.get(key);
    if (existing) {
      existing.count += 1;
    } else {
      buckets.set(key, { label, count: 1 });
    }
  }
  const breakdown = Array.from(buckets.values()).sort((a, b) => b.count - a.count);
  const totalForPercentage = breakdown.reduce((sum, b) => sum + b.count, 0) || 1;

const cards = [
  { label: "زيارات اليوم", value: todayCount ?? 0, color: "#8b1e24" },
  { label: "زيارات آخر 7 أيام", value: weekCount ?? 0, color: "#c8a45d" },
  { label: "زيارات آخر 30 يوم", value: monthCount ?? 0, color: "#151515" },
  ];

return (

  return (
  <div className="min-h-screen bg-[#f8f5ef]" dir="rtl">
  <header className="bg-white border-b border-black/5">
  <div className="max-w-5xl mx-auto px-6 py-4">
  <Link href={`/${locale}/dashboard`} className="text-sm text-[#151515]/60 hover:text-[#8b1e24]">
  ← رجوع للوحة التحكم
  </Link>
  <h1 className="font-bold text-[#151515] mt-1">إحصائيات الزيارات</h1>
  <p className="text-sm text-[#151515]/60 mt-1">
  عدد زوار الموقع ومصدرهم — جوجل، واتساب، سوشيال ميديا، أو مباشر
  </p>
  </div>
  </header>
  
  <main className="max-w-5xl mx-auto px-6 py-8 space-y-8">
    {monthError && (
    <p className="text-sm text-[#8b1e24] bg-[#8b1e24]/5 rounded-lg px-4 py-3">
    حصل خطأ في تحميل بيانات الزيارات: {monthError.message}
    </p>
    )}
  
  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
    {cards.map((card) => (
    <div key={card.label} className="bg-white rounded-2xl border border-black/5 p-5">
    <p className="text-2xl font-bold" style={{ color: card.color }}>
      {card.value}
    </p>
    <p className="text-sm text-[#151515]/70 mt-1">{card.label}</p>
    </div>
    ))}
  </div>
  
  <div>
  <h2 className="font-bold text-[#151515] mb-3">مصادر الزوار (آخر 30 يوم)</h2>
  
    {breakdown.length === 0 && (
    <p className="text-sm text-[#151515]/60 bg-white rounded-2xl border border-black/5 p-6 text-center">
    لسه مفيش زيارات مسجّلة. التسجيل بدأ تلقائيًا مع آخر تحديث للموقع.
    </p>
    )}
  
    {breakdown.length > 0 && (
    <div className="bg-white rounded-2xl border border-black/5 divide-y divide-black/5">
      {breakdown.map((b) => (
      <div key={b.label} className="flex items-center justify-between gap-4 p-4">
      <span className="text-sm text-[#151515]">{b.label}</span>
      <span className="text-sm text-[#151515]/60">
        {b.count} زيارة · {Math.round((b.count / totalForPercentage) * 100)}%
      </span>
      </div>
      ))}
    </div>
    )}
  
  <p className="text-xs text-[#151515]/40 mt-3 leading-6">
  "مباشر" معناه الزائر دخل الرابط من غير ما المتصفح يبعت مصدر — ده بيشمل غالبية زيارات واتساب لو اتبعت اللينك العادي. عشان تشوف زيارات واتساب بوضوح، استخدم رابط baitalmataem.com/wa بدل اللينك العادي في الحالة والرسائل والبروفايل.
  </p>
  </div>
  </main>
  </div>
  );
}
