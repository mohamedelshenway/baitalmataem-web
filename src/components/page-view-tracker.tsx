"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { getAttributionSource } from "@/lib/attribution";

/**
 * يسجّل كل زيارة صفحة في جدول page_views عشان نقدر نعرف عدد الزوار ومصدرهم
 * (جوجل، واتساب، مباشر...) من داخل لوحة التحكم. بيتجاهل صفحات لوحة التحكم
 * نفسها عشان زيارات الفريق ما تتحسبش كزوار حقيقيين.
 */
export function PageViewTracker({ locale }: { locale: string }) {
    const pathname = usePathname();

  useEffect(() => {
        if (!pathname || pathname.includes("/dashboard") || pathname.includes("/admin")) return;

                const supabase = createClient();
        const source = getAttributionSource();

                supabase
          .from("page_views")
          .insert({ path: pathname, locale, source })
          .then(({ error }) => {
                    if (error) console.error("page_views insert failed:", error.message);
          });
  }, [pathname, locale]);

  return null;
}
