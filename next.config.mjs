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
  async redirects() {
    return [
      // دمجنا صفحة "أعمالنا" داخل "من نحن" — تحويل دائم (308) للحفاظ على قيمة SEO
      {
        source: "/:locale(ar|en|tr|ru|ur)/our-work",
        destination: "/:locale/about",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
