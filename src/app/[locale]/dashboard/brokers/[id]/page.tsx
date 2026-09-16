import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

const statusLabels: Record<string, string> = {
  draft: "مسودة",
  pending_review: "بانتظار المراجعة",
  published: "منشورة",
  paused: "متوقفة مؤقتًا",
  closed: "مغلقة",
};

export default async function BrokerProfilePage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect(`/${locale}/dashboard/login`);
  }

  const { data: broker } = await supabase
    .from("brokers")
    .select("id, full_name, phone, address, notes, is_active, created_at")
    .eq("id", id)
    .single();

  if (!broker) {
    notFound();
  }

  const { data: listings } = await supabase
    .from("listings")
    .select("id, title, city, status, asking_price, created_at")
    .eq("broker_id", id)
    .order("created_at", { ascending: false });

  return (
    <div className="min-h-screen bg-[#f8f5ef]" dir="rtl">
      <header className="bg-white border-b border-black/5">
        <div className="max-w-5xl mx-auto px-6 py-4">
          <Link href={`/${locale}/dashboard/brokers`} className="text-sm text-[#151515]/60 hover:text-[#8b1e24]">
            ← رجوع لقائمة الوسطاء
          </Link>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-8 space-y-6">
        <div className="bg-white rounded-2xl border border-black/5 p-6">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold text-[#151515]">{broker.full_name}</h1>
            <span
              className={`text-xs rounded-full px-2 py-0.5 ${
                broker.is_active ? "bg-emerald-100 text-emerald-700" : "bg-[#151515]/10 text-[#151515]/60"
              }`}
            >
              {broker.is_active ? "نشط" : "غير نشط"}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 text-sm">
            <div>
              <p className="text-[#151515]/50">رقم الهاتف</p>
              <p className="text-[#151515] font-medium mt-0.5">{broker.phone}</p>
            </div>
            <div>
              <p className="text-[#151515]/50">العنوان</p>
              <p className="text-[#151515] font-medium mt-0.5">{broker.address ?? "—"}</p>
            </div>
          </div>

          {broker.notes && (
            <div className="mt-4 text-sm">
              <p className="text-[#151515]/50">ملاحظات</p>
              <p className="text-[#151515] mt-0.5">{broker.notes}</p>
            </div>
          )}

          <p className="text-xs text-[#151515]/40 mt-4">
            مسجل منذ {new Date(broker.created_at).toLocaleDateString("ar-SA")}
          </p>
        </div>

        <div>
          <h2 className="font-bold text-[#151515] mb-3">
            الفرص المسندة له ({listings?.length ?? 0})
          </h2>

          {(!listings || listings.length === 0) && (
            <p className="text-sm text-[#151515]/60 bg-white rounded-2xl border border-black/5 p-6 text-center">
              لا توجد فرص مسندة لهذا الوسيط بعد.
            </p>
          )}

          {listings && listings.length > 0 && (
            <div className="bg-white rounded-2xl border border-black/5 overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[#151515]/5 text-[#151515]/70 text-right">
                    <th className="px-4 py-3 font-medium">العنوان</th>
                    <th className="px-4 py-3 font-medium">المدينة</th>
                    <th className="px-4 py-3 font-medium">السعر المطلوب</th>
                    <th className="px-4 py-3 font-medium">الحالة</th>
                  </tr>
                </thead>
                <tbody>
                  {listings.map((listing) => (
                    <tr key={listing.id} className="border-t border-black/5">
                      <td className="px-4 py-3 text-[#151515]">{listing.title}</td>
                      <td className="px-4 py-3 text-[#151515]/70">{listing.city}</td>
                      <td className="px-4 py-3 text-[#151515]/70">
                        {listing.asking_price ? `${listing.asking_price.toLocaleString("ar-SA")} ر.س` : "—"}
                      </td>
                      <td className="px-4 py-3 text-[#151515]/70">
                        {statusLabels[listing.status] ?? listing.status}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
