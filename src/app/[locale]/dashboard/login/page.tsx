"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams, useParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = useParams();
  const locale = params.locale as string;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const supabase = createClient();
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (signInError) {
      setError("الإيميل أو كلمة المرور غير صحيحة");
      return;
    }

    const redirectTo = searchParams.get("redirectTo") || `/${locale}/dashboard`;
    router.push(redirectTo);
    router.refresh();
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8f5ef] px-4" dir="rtl">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-sm border border-black/5 p-8">
        <div className="text-center mb-8">
          <h1 className="text-xl font-bold text-[#151515]">بيت المطاعم</h1>
          <p className="text-sm text-[#151515]/60 mt-1">لوحة التحكم — دخول الفريق</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#151515] mb-1">
              البريد الإلكتروني
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-black/10 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#8b1e24]/30"
              placeholder="you@baitalmataem.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#151515] mb-1">
              كلمة المرور
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-black/10 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#8b1e24]/30"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <p className="text-sm text-[#8b1e24] bg-[#8b1e24]/5 rounded-lg px-3 py-2">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#8b1e24] text-white rounded-lg py-2.5 text-sm font-medium hover:bg-[#6f1720] transition disabled:opacity-60"
          >
            {loading ? "جارٍ الدخول..." : "دخول"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}
