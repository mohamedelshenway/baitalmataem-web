"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { locales, type Locale } from "@/i18n/config";

/**
 * بانر اقتراح لغة بديلة بناءً على لغة المتصفح — اقتراح فقط، لا تحويل إجباري أبدًا.
 * يظهر مرة واحدة، وإذا أغلقه الزائر لا يظهر له مرة أخرى (يُحفظ محليًا في متصفحه فقط).
 */
export function LanguageBanner({
  locale,
  message,
  switchLabel,
  stayLabel,
}: {
  locale: Locale;
  message: string;
  switchLabel: string;
  stayLabel: string;
}) {
  const [visible, setVisible] = useState(false);
  const pathname = usePathname();
  const pathWithoutLocale = pathname?.replace(new RegExp(`^/(${locales.join("|")})`), "") || "";
  const targetLocale: Locale = locale === "ar" ? "en" : "ar";

  useEffect(() => {
    try {
      const dismissed = window.localStorage.getItem("bam_lang_banner_dismissed");
      if (dismissed) return;
      const browserLang = window.navigator.language?.slice(0, 2).toLowerCase();
      if (browserLang && browserLang !== locale && (browserLang === "ar" || browserLang === "en")) {
        setVisible(true);
      }
    } catch {
      // localStorage غير متاح (وضع خاص مثلًا) — لا داعي لإظهار البانر
    }
  }, [locale]);

  function dismiss() {
    setVisible(false);
    try {
      window.localStorage.setItem("bam_lang_banner_dismissed", "1");
    } catch {
      // تجاهل — تفضيل غير حرج
    }
  }

  if (!visible) return null;

  return (
    <div className="bg-ink-950 text-white">
      <div className="container-page flex flex-wrap items-center justify-between gap-3 py-2.5 text-sm">
        <p className="font-medium">{message}</p>
        <div className="flex items-center gap-3">
          <Link
            href={`/${targetLocale}${pathWithoutLocale}`}
            onClick={dismiss}
            className="focus-ring rounded-btn bg-white px-4 py-1.5 font-semibold text-ink-950"
          >
            {switchLabel}
          </Link>
          <button type="button" onClick={dismiss} className="focus-ring font-semibold text-white/70 hover:text-white">
            {stayLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
