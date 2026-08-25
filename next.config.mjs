/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
    // الصور المؤقتة (Placeholders) كلها SVG محلية من إنشائنا (public/placeholders)، بدون أي محتوى تفاعلي —
    // لازم تفعيل هذا صراحة لأن Next.js يمنع تحسين SVG افتراضيًا لأسباب أمنية عامة.
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
