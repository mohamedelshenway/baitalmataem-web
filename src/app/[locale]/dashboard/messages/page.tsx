import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import MessageStatusSelect from "./message-status-select";

const statusLabels: Record<string, string> = {
  new: "جديدة",
  contacted: "تم التواصل",
  qualified: "مؤهلة",
  proposal: "تم العرض",
  won: "تم الإغلاق",
  lost: "خسرت",
};

export default async function MessagesPage({
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

  const { data: messages, error } = await supabase
    .from("contact_submissions")
    .select("id, name, phone, email, message, service_interested, status, created_at")
    .order("created_at", { ascending: false });

  return (
    <div className="min-h-screen bg-[#f8f5ef]" dir="rtl">
      <header className="bg-white border-b border-black/5">
        <div className="max-w-5xl mx-auto px-6 py-4">
          <Link href={`/${locale}/dashboard`} className="text-sm text-[#151515]/60 hover:text-[#8b1e24]">
            ← رجوع للوحة التحكم
          </Link>
          <h1 className="font-bold text-[#151515] mt-1">رسائل العملاء</h1>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-8 space-y-4">
        {error && (
          <p className="text-sm text-[#8b1e24] bg-[#8b1e24]/5 rounded-lg px-4 py-3">
            حصل خطأ في تحميل الرسائل: {error.message}
          </p>
        )}

        {!error && (!messages || messages.length === 0) && (
          <p className="text-sm text-[#151515]/60 bg-white rounded-2xl border border-black/5 p-6 text-center">
            لا توجد رسائل بعد.
          </p>
        )}

        {messages?.map((msg) => (
          <div key={msg.id} className="bg-white rounded-2xl border border-black/5 p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-medium text-[#151515]">{msg.name}</p>
                <p className="text-sm text-[#151515]/60">
                  {msg.phone ?? "—"} · {msg.email ?? "—"}
                </p>
                {msg.service_interested && (
                  <p className="text-xs text-[#8b1e24] mt-1">
                    الخدمة المطلوبة: {msg.service_interested}
                  </p>
                )}
              </div>
              <MessageStatusSelect
                submissionId={msg.id}
                currentStatus={msg.status}
                statusLabels={statusLabels}
              />
            </div>
            {msg.message && (
              <p className="text-sm text-[#151515]/80 mt-3 bg-[#f8f5ef] rounded-lg p-3">
                {msg.message}
              </p>
            )}
            <p className="text-xs text-[#151515]/40 mt-2">
              {new Date(msg.created_at).toLocaleString("ar-SA")}
            </p>
          </div>
        ))}
      </main>
    </div>
  );
}
