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

  const now = new Date();
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString();
  const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString();
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000).toISOString();
  const head = { count: "exact", head: true } as const;

  const [
    { count: visitsToday },
    { count: visits7 },
    { count: visits30 },
    { count: newSubmissions },
    { count: totalOwners },
    { count: needNotify },
    { count: publishedListings },
    { count: newMessages },
    { count: newRegistrations },
    { count: newBrokerApplications },
    { count: newLeads },
  ] = await Promise.all([
    supabase.from("page_views").select("*", head).gte("created_at", startOfToday),
    supabase.from("page_views").select("*", head).gte("created_at", sevenDaysAgo),
    supabase.from("page_views").select("*", head).gte("created_at", thirtyDaysAgo),
    supabase.from("listing_submissions").select("*", head).eq("status", "new"),
    supabase.from("listing_submissions").select("*", head),
    supabase.from("listing_submissions").select("*", head).neq("status", "new").is("notified_at", null),
    supabase.from("listings").select("*", head).eq("status", "published"),
    supabase.from("contact_submissions").select("*", head).eq("status", "new"),
    supabase.from("customer_registrations").select("*", head).eq("status", "new"),
    supabase.from("broker_applications").select("*", head).eq("status", "new"),
    supabase.from("leads").select("*", head).eq("status", "New"),
  ]);

  const visitorCards = [
    { label: "زيارات اليوم", value: visitsToday ?? 0, color: "#8b1e24" },
    { label: "آخر 7 أيام", value: visits7 ?? 0, color: "#c8a45d" },
    { label: "آخر 30 يوم", value: visits30 ?? 0, color: "#151515" },
  ];

  // الأزرار الأساسية — اللي بتستخدمها كل يوم
  const mainLinks = [
    {
      href: `/${locale}/dashboard/owners`,
      title: "سجل عارضي الفرص",
      desc: "كل من عرض محله للتقبيل أو البيع أو الإيجار — بياناتهم محفوظة دائمًا",
      badge: needNotify,
      badgeHint: "محتاج إشعار",
    },
    {
      href: `/${locale}/dashboard/listings/submissions`,
      title: "طلبات جديدة للمراجعة",
      desc: "اقبل أو ارفض أو اطلب تعديل — وبلّغ العارض بواتساب بضغطة",
      badge: newSubmissions,
      badgeHint: "جديد",
    },
    {
      href: `/${locale}/dashboard/listings`,
      title: "إدارة الفرص",
      desc: `الفرص المنشورة (${publishedListings ?? 0}) — تعديل الحالة ونشر الجديد`,
    },
    {
      href: `/${locale}/dashboard/messages`,
      title: "رسائل العملاء",
      desc: "رسائل \"تواصل معنا\"",
      badge: newMessages,
      badgeHint: "جديد",
    },
  ];

  const moreLinks = [
    {
      href: `/${locale}/dashboard/customer-registrations`,
      title: "تسجيلات العملاء",
      desc: "عملاء سجلوا من صفحة \"سجل بياناتك\"",
      badge: newRegistrations,
    },
    {
      href: `/${locale}/dashboard/brokers`,
      title: "الوسطاء",
      desc: "بيانات داخلية للوسطاء وفرصهم — لا تظهر للعامة",
    },
    {
      href: `/${locale}/dashboard/broker-applications`,
      title: "طلبات انضمام الوسطاء",
      desc: "مراجعة واعتماد الوسطاء الجدد",
      badge: newBrokerApplications,
    },
    {
      href: `/${locale}/dashboard/leads`,
      title: "طلبات التوظيف والتدريب",
      desc: "الموظفين والتدريب والدوام الجزئي وشركاء النجاح",
      badge: newLeads,
    },
    {
      href: `/${locale}/dashboard/visits`,
      title: "تفاصيل الزيارات",
      desc: "مصادر الزوار: جوجل، واتساب، سوشيال ميديا",
    },
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

      <main className="max-w-5xl mx-auto px-6 py-8 space-y-8">
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-bold text-[#151515]">زوار الموقع</h2>
            <a href={`/${locale}/dashboard/visits`} className="text-sm text-[#8b1e24] hover:underline">
              التفاصيل والمصادر ←
            </a>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {visitorCards.map((card) => (
              <div key={card.label} className="bg-white rounded-2xl border border-black/5 p-5">
                <p className="text-3xl font-bold" style={{ color: card.color }}>
                  {card.value.toLocaleString("ar-SA")}
                </p>
                <p className="text-sm text-[#151515]/70 mt-1">{card.label}</p>
              </div>
            ))}
          </div>
          <p className="text-xs text-[#151515]/40 mt-2">
            العدد = مرات فتح صفحات الموقع (مش أشخاص مختلفين). إجمالي عارضي الفرص المسجلين: {(totalOwners ?? 0).toLocaleString("ar-SA")}
          </p>
        </section>

        <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {mainLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="block bg-white rounded-2xl border border-black/5 p-6 hover:border-[#8b1e24]/30 transition"
            >
              <h2 className="font-bold text-[#151515] mb-1 text-lg">
                {link.title}
                {Boolean(link.badge) && (
                  <span className="mr-2 text-xs bg-[#8b1e24] text-white rounded-full px-2 py-0.5">
                    {link.badge} {link.badgeHint}
                  </span>
                )}
              </h2>
              <p className="text-sm text-[#151515]/60">{link.desc}</p>
            </a>
          ))}
        </section>

        <details className="group">
          <summary className="cursor-pointer text-sm font-medium text-[#151515]/70 mb-3">
            أقسام أخرى ({moreLinks.length})
          </summary>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-3">
            {moreLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="block bg-white rounded-2xl border border-black/5 p-5 hover:border-[#8b1e24]/30 transition"
              >
                <h3 className="font-bold text-[#151515] mb-1">
                  {link.title}
                  {Boolean(link.badge) && (
                    <span className="mr-2 text-xs bg-[#8b1e24] text-white rounded-full px-2 py-0.5">
                      {link.badge}
                    </span>
                  )}
                </h3>
                <p className="text-sm text-[#151515]/60">{link.desc}</p>
              </a>
            ))}
          </div>
        </details>
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
