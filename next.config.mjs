/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
    // الصور المؤقتة (Placeholders) كلها SVG محلية من إنشائنا (public/placeholders)، بدون أي محتوى تفاعلي —
    // لازم تفعيل هذا صراحة لأن Next.js يمنع تحسين SVG افتراضيًا لأسباب أمنية عامة.
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    // صور فرص السوق الحقيقية بتتخزن على Supabase Storage (باكت listing-media العام)
    // بدل الـ SVG المحلية التجريبية — لازم نسمح لـ next/image بالدومين ده صراحة.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cyegaaxqbpccqwidqjmw.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
  // ترويسات أمان أساسية آمنة (لا تؤثر على التصميم ولا الوظائف)
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
        ],
      },
    ];
  },
  async redirects() {
    return [
      // تطبيق المطبخ (لو كالوري) ملف ثابت في public/kitchen — اللينك القصير /kitchen يروح له مباشرة مع الحفاظ على ?u=&l=
      { source: "/kitchen", destination: "/kitchen/index.html", permanent: false },
      { source: "/:locale(ar|en|tr|ru|ur)/kitchen", destination: "/kitchen/index.html", permanent: false },
      // دمجنا صفحة "أعمالنا" داخل "من نحن" — تحويل دائم (308) للحفاظ على قيمة SEO
      {
        source: "/:locale(ar|en|tr|ru|ur)/our-work",
        destination: "/:locale/about",
        permanent: true,
      },
      // لينك واتساب قصير يستخدمه محمد في الحالة والرسائل بدل اللينك العادي — بيوصل الزائر للرئيسية مع UTM يوضح إنه جاي من واتساب في تقرير الزيارات
      {
        source: "/wa",
        destination: "/ar?utm_source=whatsapp&utm_medium=social&utm_campaign=direct_share",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
