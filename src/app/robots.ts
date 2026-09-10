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
        // "/thank-you" صفحة تحويل مخصصة لتتبع Conversion في Google Ads فقط بعد نجاح نموذج التواصل —
        // لا يجب فهرستها أو الوصول لها ضمن التصفح الطبيعي.
        disallow: ["/*/admin", "/*/dashboard", "/*/marketplace/new", "/*/thank-you", "/api/"],
      },
    ],
    sitemap: `${SITE.url}/sitemap.xml`,
  };
}
