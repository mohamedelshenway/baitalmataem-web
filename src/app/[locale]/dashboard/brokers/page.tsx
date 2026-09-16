import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import AddBrokerForm from "./add-broker-form";

export default async function BrokersPage({
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
    .select("role")
    .eq("id", user.id)
    .single();

  const isAdmin = profile?.role === "admin";

  const { data: brokers, error } = await supabase
    .from("brokers")
    .select("id, full_name, phone, address, is_active, created_at")
    .order("created_at", { ascending: false });

  return (
    <div className="min-h-screen bg-[#f8f5ef]" dir="rtl">
      <header className="bg-white border-b border-black/5">
        <div className="max-w-5xl mx-auto px-6 py-4">
          <Link href={`/${locale}/dashboard`} className="text-sm text-[#151515]/60 hover:text-[#8b1e24]">
            ← رجوع للوحة التحكم
          </Link>
          <h1 className="font-bold text-[#151515] mt-1">الوسطاء</h1>
          <p className="text-sm text-[#151515]/60 mt-0.5">
            بيانات داخلية فقط — هوية الوسيط لا تظهر أبدًا في الموقع العام، كل الفرص تُعرض باسم بيت المطاعم
          </p>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-8 space-y-6">
        {isAdmin && <AddBrokerForm />}

        {error && (
          <p className="text-sm text-[#8b1e24] bg-[#8b1e24]/5 rounded-lg px-4 py-3">
            حصل خطأ في تحميل الوسطاء: {error.message}
          </p>
        )}

        {!error && (!brokers || brokers.length === 0) && (
          <p className="text-sm text-[#151515]/60 bg-white rounded-2xl border border-black/5 p-6 text-center">
            لا يوجد وسطاء مسجلين بعد.
          </p>
        )}

        {brokers && brokers.length > 0 && (
          <div className="bg-white rounded-2xl border border-black/5 overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#151515]/5 text-[#151515]/70 text-right">
                  <th className="px-4 py-3 font-medium">الاسم</th>
                  <th className="px-4 py-3 font-medium">الهاتف</th>
                  <th className="px-4 py-3 font-medium">العنوان</th>
                  <th className="px-4 py-3 font-medium">الحالة</th>
                </tr>
              </thead>
              <tbody>
                {brokers.map((broker) => (
                  <tr key={broker.id} className="border-t border-black/5">
                    <td className="px-4 py-3">
                      <Link
                        href={`/${locale}/dashboard/brokers/${broker.id}`}
                        className="text-[#8b1e24] hover:underline font-medium"
                      >
                        {broker.full_name}
                      </Link>
                    </td>
                    <td className="px-4 py-3 text-[#151515]/70">{broker.phone}</td>
                    <td className="px-4 py-3 text-[#151515]/70">{broker.address ?? "—"}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`text-xs rounded-full px-2 py-0.5 ${
                          broker.is_active
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-[#151515]/10 text-[#151515]/60"
                        }`}
                      >
                        {broker.is_active ? "نشط" : "غير نشط"}
                      </span>
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
