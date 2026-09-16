import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import RegistrationStatusSelect from "./registration-status-select";

const statusLabels: Record<string, string> = {
  new: "جديد",
  contacted: "تم التواصل",
  qualified: "مؤهل",
  proposal: "تم العرض",
  won: "تم الإغلاق",
  lost: "خسر",
};

const customerTypeLabels: Record<string, string> = {
  restaurant_owner: "صاحب مطعم",
  cafe_owner: "صاحب كافيه",
  investor_real_estate: "مستثمر عقاري",
  other: "أخرى",
};

export default async function CustomerRegistrationsPage({
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

  const { data: registrations, error } = await supabase
    .from("customer_registrations")
    .select("id, full_name, phone, city, customer_type, profession, status, created_at")
    .order("created_at", { ascending: false });

  const waLink = (phone: string) => {
    const n = phone.replace(/^0/, "966").replace(/\D/g, "");
    return `https://wa.me/${n}`;
  };

  return (
    <div className="min-h-screen bg-[#f8f5ef]" dir="rtl">
      <header className="bg-white border-b border-black/5">
        <div className="max-w-5xl mx-auto px-6 py-4">
          <Link href={`/${locale}/dashboard`} className="text-sm text-[#151515]/60 hover:text-[#8b1e24]">
            ← رجوع للوحة التحكم
          </Link>
          <h1 className="font-bold text-[#151515] mt-1">تسجيلات العملاء</h1>
          <p className="text-sm text-[#151515]/60 mt-0.5">
            بيانات العملاء الذين سجلوا من صفحة &quot;سجل بياناتك&quot;
          </p>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-8">
        {error && (
          <p className="text-sm text-[#8b1e24] bg-[#8b1e24]/5 rounded-lg px-4 py-3 mb-4">
            حصل خطأ في تحميل التسجيلات: {error.message}
          </p>
        )}

        {!error && (!registrations || registrations.length === 0) && (
          <p className="text-sm text-[#151515]/60 bg-white rounded-2xl border border-black/5 p-6 text-center">
            لا توجد تسجيلات بعد.
          </p>
        )}

        {registrations && registrations.length > 0 && (
          <div className="bg-white rounded-2xl border border-black/5 overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#151515]/5 text-[#151515]/70 text-right">
                  <th className="px-4 py-3 font-medium">الاسم</th>
                  <th className="px-4 py-3 font-medium">الهاتف</th>
                  <th className="px-4 py-3 font-medium">المدينة</th>
                  <th className="px-4 py-3 font-medium">التصنيف</th>
                  <th className="px-4 py-3 font-medium">الوظيفة</th>
                  <th className="px-4 py-3 font-medium">الحالة</th>
                  <th className="px-4 py-3 font-medium"></th>
                </tr>
              </thead>
              <tbody>
                {registrations.map((reg) => (
                  <tr key={reg.id} className="border-t border-black/5">
                    <td className="px-4 py-3 text-[#151515]">{reg.full_name}</td>
                    <td className="px-4 py-3 text-[#151515]/70">{reg.phone}</td>
                    <td className="px-4 py-3 text-[#151515]/70">{reg.city ?? "—"}</td>
                    <td className="px-4 py-3 text-[#151515]/70">
                      {customerTypeLabels[reg.customer_type] ?? reg.customer_type}
                    </td>
                    <td className="px-4 py-3 text-[#151515]/70">{reg.profession ?? "—"}</td>
                    <td className="px-4 py-3">
                      <RegistrationStatusSelect
                        registrationId={reg.id}
                        currentStatus={reg.status}
                        statusLabels={statusLabels}
                      />
                    </td>
                    <td className="px-4 py-3">
                      <a
                        href={waLink(reg.phone)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs bg-[#25D366]/10 text-[#128C4A] rounded-lg px-3 py-1.5 hover:bg-[#25D366]/20 transition whitespace-nowrap"
                      >
                        واتساب
                      </a>
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
