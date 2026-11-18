"use client";

import { usePathname } from "next/navigation";
import { HAS_WHATSAPP, whatsappLink } from "@/lib/constants";

// زر واتساب عائم ثابت — أقصر طريق من الزائر للتواصل (الواتساب هو القناة الأساسية للعملاء في السعودية).
// مخفي في لوحة التحكم وصفحة الإدارة.
export function WhatsAppFloat({ locale }: { locale: string }) {
  const pathname = usePathname() || "";
  if (!HAS_WHATSAPP) return null;
  if (pathname.includes("/dashboard") || pathname.includes("/admin")) return null;
  const ar = locale === "ar" || locale === "ur";
  const href = whatsappLink(ar ? "مرحبًا بيت المطاعم، أرغب في الاستفسار" : "Hello Bait Al Mataem, I'd like to ask about your services");
  if (!href) return null;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ar ? "تواصل معنا عبر واتساب" : "Chat with us on WhatsApp"}
      className="focus-ring fixed bottom-5 end-5 z-50 flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-sm font-semibold text-white shadow-lg transition-transform hover:scale-105"
    >
      <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true">
        <path d="M12.04 2a9.9 9.9 0 0 0-8.5 14.9L2 22l5.25-1.5A9.9 9.9 0 1 0 12.04 2Zm0 18.1a8.2 8.2 0 0 1-4.2-1.15l-.3-.18-3.1.88.9-3.02-.2-.31a8.2 8.2 0 1 1 6.9 3.78Zm4.5-6.14c-.25-.12-1.46-.72-1.69-.8-.23-.08-.39-.12-.56.12-.16.25-.64.8-.78.97-.14.16-.29.18-.54.06a6.7 6.7 0 0 1-1.97-1.22 7.4 7.4 0 0 1-1.36-1.69c-.14-.25-.02-.38.1-.5.11-.11.25-.29.37-.43.12-.14.16-.25.25-.41.08-.16.04-.31-.02-.43-.06-.12-.56-1.35-.77-1.85-.2-.48-.4-.42-.56-.43h-.48a.92.92 0 0 0-.67.31 2.8 2.8 0 0 0-.87 2.08c0 1.23.9 2.42 1.02 2.58.12.16 1.76 2.7 4.27 3.78.6.26 1.07.41 1.43.53.6.19 1.15.16 1.58.1.48-.07 1.46-.6 1.67-1.17.2-.58.2-1.07.14-1.17-.06-.1-.22-.16-.47-.28Z" />
      </svg>
      <span className="hidden sm:inline">{ar ? "تواصل واتساب" : "WhatsApp"}</span>
    </a>
  );
}
