import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import SignOutButton from "./sign-out-button";

export default async function DashboardHomePage({
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

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, role")
    .eq("id", user.id)
    .single();

  const [
    { count: publishedListings },
    { count: pendingListings },
    { count: newSubmissions },
    { count: newMessages },
    { count: publishedPosts },
  ] = await Promise.all([
    supabase.from("listings").select("*", { count: "exact", head: true }).eq("status", "published"),
    supabase.from("listings").select("*", { count: "exact", head: true }).eq("status", "pending_review"),
    supabase.from("listing_submissions").select("*", { count: "exact", head: true }).eq("status", "new"),
    supabase.from("contact_submissions").select("*", { count: "exact", head: true }).eq("status", "new"),
    supabase.from("posts").select("*", { count: "exact", head: true }).eq("is_published", true),
  ]);

  const cards = [
    { label: "الفرص المنشورة", value: publishedListings ?? 0, color: "#8b1e24" },
    { label: "فرص بانتظار المراجعة", value: pendingListings ?? 0, color: "#c8a45d" },
    { label: "طلبات \"اعرض فرصتك\" جديدة", value: newSubmissions ?? 0, color: "#c8a45d" },
    { label: "رسائل تواصل جديدة", value: newMessages ?? 0, color: "#8b1e24" },
    { label: "المقالات المنشورة", value: publishedPosts ?? 0, color: "#151515" },
  ];

  return (
    <div className="min-h-screen bg-[#f8f5ef]" dir="rtl">
      <header className="bg-white border-b border-black/5">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="font-bold text-[#151515]">بيت المطاعم — لوحة التحكم</h1>
            <p className="text-sm text-[#151515]/60">
              {profile?.full_name ?? user.email} · {roleLabel(profile?.role)}
            </p>
          </div>
          <SignOutButton locale={locale} />
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-10">
          {cards.map((card) => (
            <div key={card.label} className="bg-white rounded-2xl border border-black/5 p-5">
              <p className="text-2xl font-bold" style={{ color: card.color }}>
                {card.value}
              </p>
              <p className="text-sm text-[#151515]/70 mt-1">{card.label}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <a
            href={`/${locale}/dashboard/listings`}
            className="block bg-white rounded-2xl border border-black/5 p-6 hover:border-[#8b1e24]/30 transition"
          >
            <h2 className="font-bold text-[#151515] mb-1">إدارة الفرص</h2>
            <p className="text-sm text-[#151515]/60">
              مراجعة الفرص المعروضة، تعديل حالتها، ونشر الجديد منها
            </p>
          </a>

          <a
            href={`/${locale}/dashboard/messages`}
            className="block bg-white rounded-2xl border border-black/5 p-6 hover:border-[#8b1e24]/30 transition"
          >
            <h2 className="font-bold text-[#151515] mb-1">رسائل العملاء</h2>
            <p className="text-sm text-[#151515]/60">
              متابعة رسائل التواصل وطلبات عرض الفرص من العملاء
            </p>
          </a>
        </div>
      </main>
    </div>
  );
}

function roleLabel(role?: string) {
  switch (role) {
    case "admin":
      return "أدمن";
    case "editor":
      return "محرر";
    case "support":
      return "دعم فني";
    default:
      return "";
  }
}
