// أيقونات ومكوّن حسابات بيت المطاعم الرسمية المؤكَّدة — يُستخدم في الهيدر وصفحة التواصل معًا
// حتى لا تتكرر نفس الروابط أو رسومات SVG في أكثر من مكان
import { SOCIALS } from "@/lib/constants";

export const SOCIAL_ICON_LINKS = [
  { key: "facebook", label: "Facebook" },
  { key: "instagram", label: "Instagram" },
  { key: "tiktok", label: "TikTok" },
  { key: "youtube", label: "YouTube" },
  { key: "snapchat", label: "Snapchat" },
  { key: "x", label: "X" },
] as const;

export type SocialPlatform = (typeof SOCIAL_ICON_LINKS)[number]["key"];

export function SocialIcon({ platform }: { platform: SocialPlatform }) {
  switch (platform) {
    case "facebook":
      return (
        <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M22 12.06C22 6.51 17.52 2 12 2S2 6.51 2 12.06c0 5 3.66 9.15 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.51 1.49-3.9 3.77-3.9 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.44 2.91h-2.34V22c4.78-.79 8.44-4.94 8.44-9.94Z" />
        </svg>
      );
    case "instagram":
      return (
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.3" cy="6.7" r="1.1" fill="currentColor" stroke="none" />
        </svg>
      );
    case "tiktok":
      return (
        <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M16.6 5.82c-.9-.79-1.47-1.93-1.54-3.2h-3.09v13.84a2.59 2.59 0 0 1-2.59 2.5c-1.43 0-2.6-1.16-2.6-2.6 0-1.72 1.67-3.02 3.38-2.48V10.7c-3.45-.46-6.48 2.22-6.48 5.64 0 3.33 2.77 5.7 5.7 5.7 3.14 0 5.69-2.55 5.69-5.7V9.01c1.24.88 2.75 1.4 4.3 1.4V7.3c-.99 0-1.94-.31-2.71-.9a4.6 4.6 0 0 1-.06-.58Z" />
        </svg>
      );
    case "youtube":
      return (
        <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M21.6 7.2s-.21-1.5-.86-2.16c-.82-.87-1.74-.87-2.16-.92C15.6 4 12 4 12 4h-.01s-3.6 0-6.58.12c-.42.05-1.34.05-2.16.92-.65.66-.86 2.16-.86 2.16S2.18 8.94 2.18 10.68v1.62c0 1.74.2 3.48.2 3.48s.21 1.5.86 2.16c.82.87 1.9.84 2.38.94 1.72.16 7.38.21 7.38.21s3.6-.01 6.58-.13c.42-.06 1.34-.06 2.16-.93.65-.66.86-2.16.86-2.16s.2-1.74.2-3.48v-1.62c0-1.74-.2-3.48-.2-3.48ZM9.98 14.6V8.9l5.4 2.86-5.4 2.85Z" />
        </svg>
      );
    case "snapchat":
      return (
        <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M12 2.6c-3.2 0-5.1 2.3-5.1 5.42 0 .55.03 1.23.09 1.8-.5.3-1.28.35-1.62.35a.72.72 0 0 0-.72.71c0 .46.32.75.85 1.03.3.16.62.29.62.29s-.09.56-.32.96c-.33.56-1.02.94-1.02.94a.5.5 0 0 0-.26.55c.05.26.27.43.51.48.44.08.96.09 1.27.29.19.13.22.37.29.66.13.55.31 1.28 1.18 1.52.56.15 1.03-.02 1.46-.19.45-.18.85-.32 1.3-.02.46.31.99.79 2.3.79s1.84-.48 2.3-.79c.45-.3.85-.16 1.3.02.43.17.9.34 1.46.19.87-.24 1.05-.97 1.18-1.52.07-.29.1-.53.29-.66.31-.2.83-.21 1.27-.29.24-.05.46-.22.51-.48a.5.5 0 0 0-.26-.55s-.69-.38-1.02-.94c-.23-.4-.32-.96-.32-.96s.32-.13.62-.29c.53-.28.85-.57.85-1.03a.72.72 0 0 0-.72-.71c-.34 0-1.12-.05-1.62-.35.06-.57.09-1.25.09-1.8 0-3.12-1.9-5.42-5.1-5.42Z" />
        </svg>
      );
    case "x":
      return (
        <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M17.53 3H21l-7.19 8.21L22 21h-6.59l-5.16-6.32L4.47 21H1l7.69-8.79L2 3h6.76l4.67 5.78L17.53 3Zm-1.16 16.2h1.83L7.72 4.7H5.76l10.61 14.5Z" />
        </svg>
      );
  }
}

export function SocialIconRow({
  className = "",
  linkClassName = "focus-ring text-ink-500 transition-colors hover:text-ember-600",
}: {
  className?: string;
  linkClassName?: string;
}) {
  return (
    <div className={className}>
      {SOCIAL_ICON_LINKS.map((s) => (
        <a
          key={s.key}
          href={SOCIALS[s.key]}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={s.label}
          className={linkClassName}
        >
          <SocialIcon platform={s.key} />
        </a>
      ))}
    </div>
  );
}
