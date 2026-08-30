"use client";

import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function SignOutButton({ locale }: { locale: string }) {
  const router = useRouter();

  async function handleSignOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push(`/${locale}/dashboard/login`);
    router.refresh();
  }

  return (
    <button
      onClick={handleSignOut}
      className="text-sm text-[#151515]/70 hover:text-[#8b1e24] transition"
    >
      تسجيل الخروج
    </button>
  );
}
