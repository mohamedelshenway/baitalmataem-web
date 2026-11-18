import type { MetadataRoute } from "next";
import { SITE } from "@/lib/constants";

// مساعدات وبحث الذكاء الاصطناعي: مسموح لها صراحةً بقراءة المحتوى العام للموقع (نفس قواعد الاستبعاد بالأسفل)،
// عشان بيت المطاعم يظهر كمصدر في إجابات ChatGPT وClaude وPerplexity وGemini وغيرها.
const AI_CRAWLERS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
  "Bingbot",
];

const DISALLOW = ["/*/admin", "/*/dashboard", "/*/marketplace/new", "/*/thank-you", "/api/", "/kitchen"];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: AI_CRAWLERS, allow: "/", disallow: DISALLOW },
      {
        userAgent: "*",
        allow: "/",
        // "/dashboard" هي لوحة الإدارة الفعلية المحمية بتسجيل دخول (Supabase) — كانت مفقودة من هنا رغم
        // إضافة "/admin" (صفحة معاينة قديمة مش مستخدمة فعليًا). لازم تُستبعد من الزحف والفهرسة زيها بالظبط.
        // "/thank-you" صفحة تحويل مخصصة لتتبع Conversion في Google Ads فقط بعد نجاح نموذج التواصل —
        // لا يجب فهرستها أو الوصول لها ضمن التصفح الطبيعي.
        disallow: DISALLOW,
      },
    ],
    sitemap: `${SITE.url}/sitemap.xml`,
  };
}
