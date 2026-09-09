import type { MetadataRoute } from "next";
import { SITE } from "@/lib/constants";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // "/dashboard" هي لوحة الإدارة الفعلية المحمية بتسجيل دخول (Supabase) — كانت مفقودة من هنا رغم
        // إضافة "/admin" (صفحة معاينة قديمة مش مستخدمة فعليًا). لازم تُستبعد من الزحف والفهرسة زيها بالظبط.
        disallow: ["/*/admin", "/*/dashboard", "/*/marketplace/new", "/api/"],
      },
    ],
    sitemap: `${SITE.url}/sitemap.xml`,
  };
}
