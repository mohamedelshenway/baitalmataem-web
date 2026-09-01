import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import StatusSelect from "./status-select";

const statusLabels: Record<string, string> = {
  draft: "مسودة",
  pending_review: "بانتظار المراجعة",
  published: "منشورة",
  paused: "متوقفة مؤقتًا",
  closed: "مغلقة",
};

export default async function ListingsPage({
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

  const { data: listings, error } = await supabase
    .from("listings")
    .select("id, title, city, activity_type, status, asking_price, created_at")
    .order("created_at", { ascending: false });

  return (
    <div className="min-h-screen bg-[#f8f5ef]" dir="rtl">
      <header className="bg-white border-b border-black/5">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <Link
              href={`/${locale}/dashboard`}
              className="text-sm text-[#151515]/60 hover:text-[#8b1e24]"
            >
              ← رجوع للوحة التحكم
            </Link>
            <h1 className="font-bold text-[#151515] mt-1">إدارة الفرص</h1>
          </div>
          <Link
            href={`/${locale}/dashboard/listings/new`}
            className="bg-[#8b1e24] text-white rounded-lg px-4 py-2 text-sm font-medium hover:bg-[#6f1720] transition"
          >
            + إضافة فرصة جديدة
          </Link>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-8">
        {error && (
          <p className="text-sm text-[#8b1e24] bg-[#8b1e24]/5 rounded-lg px-4 py-3 mb-4">
            حصل خطأ في تحميل الفرص: {error.message}
          </p>
        )}

        {!error && (!listings || listings.length === 0) && (
          <p className="text-sm text-[#151515]/60 bg-white rounded-2xl border border-black/5 p-6 text-center">
            لا توجد فرص مضافة بعد.
          </p>
        )}

        {listings && listings.length > 0 && (
          <div className="bg-white rounded-2xl border border-black/5 overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#151515]/5 text-[#151515]/70 text-right">
                  <th className="px-4 py-3 font-medium">العنوان</th>
                  <th className="px-4 py-3 font-medium">المدينة</th>
                  <th className="px-4 py-3 font-medium">النشاط</th>
                  <th className="px-4 py-3 font-medium">السعر المطلوب</th>
                  <th className="px-4 py-3 font-medium">الحالة</th>
                </tr>
              </thead>
              <tbody>
                {listings.map((listing) => (
                  <tr key={listing.id} className="border-t border-black/5">
                    <td className="px-4 py-3 text-[#151515]">
                      {listing.title}
                    </td>
                    <td className="px-4 py-3 text-[#151515]/70">
                      {listing.city}
                    </td>
                    <td className="px-4 py-3 text-[#151515]/70">
                      {listing.activity_type}
                    </td>
                    <td className="px-4 py-3 text-[#151515]/70">
                      {listing.asking_price
                        ? `${listing.asking_price.toLocaleString("ar-SA")} ر.س`
                        : "—"}
                    </td>
                    <td className="px-4 py-3">
                      <StatusSelect
                        listingId={listing.id}
                        currentStatus={listing.status}
                        statusLabels={statusLabels}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}
