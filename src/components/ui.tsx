import Link from "next/link";
import type { ReactNode } from "react";

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`container-page ${className}`}>{children}</div>;
}

const buttonBase =
  "focus-ring cta-arrow inline-flex items-center justify-center gap-2 rounded-btn px-6 py-3 text-sm font-semibold transition-colors duration-200";

const variants = {
  // Primary CTA — Deep Restaurant Red
  primary: "bg-ember-600 text-white hover:bg-ember-700",
  // Secondary CTA — outline على خلفية فاتحة
  outline: "border border-ink-900/15 text-ink-900 hover:border-ink-900/30 hover:bg-white",
  // CTA نصي بلمسة ذهبية — لخلفية فاتحة فقط (تباين ضعيف على خلفية داكنة)
  gold: "text-gold-700 hover:text-gold-600",
  // نفس فكرة "gold" لكن بدرجة ذهبية أفتح، مخصص لخلفية داكنة (مثال: الـHero)
  goldDark: "text-gold-400 hover:text-gold-300",
  // زر فاتح على خلفية داكنة
  light: "bg-white text-ink-950 hover:bg-sand-100",
  // زر شبح على خلفية داكنة
  ghostDark: "border border-white/25 text-white hover:bg-white/10",
};

export function Button({
  href,
  children,
  variant = "primary",
  className = "",
  target,
  arrow = false,
}: {
  href: string;
  children: ReactNode;
  variant?: keyof typeof variants;
  className?: string;
  target?: string;
  arrow?: boolean;
}) {
  return (
    <Link
      href={href}
      target={target}
      rel={target === "_blank" ? "noopener noreferrer" : undefined}
      className={`${buttonBase} ${variants[variant]} ${className}`}
    >
      {children}
      {arrow && (
        <span data-arrow aria-hidden>
          ←
        </span>
      )}
    </Link>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "start",
  tone = "light",
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "start" | "center";
  tone?: "light" | "dark";
}) {
  return (
    <div className={`mb-10 max-w-2xl ${align === "center" ? "mx-auto text-center" : "text-start"}`}>
      {eyebrow && (
        <p className={`eyebrow mb-3 ${tone === "dark" ? "text-gold-500" : ""}`}>{eyebrow}</p>
      )}
      <h2
        className={`text-2xl font-bold sm:text-3xl ${tone === "dark" ? "text-white" : "text-ink-900"}`}
        style={{ textWrap: "balance" }}
      >
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-3 leading-7 ${tone === "dark" ? "text-white/70" : "text-ink-600"}`}>{subtitle}</p>
      )}
    </div>
  );
}

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`rounded-card border border-sand-200 bg-white shadow-card transition-shadow duration-200 hover:shadow-cardHover ${className}`}>
      {children}
    </div>
  );
}

export function Badge({ children, tone = "ember" }: { children: ReactNode; tone?: "ember" | "sand" | "gold" | "dark" }) {
  const tones = {
    ember: "bg-white/95 text-ember-700",
    sand: "bg-sand-100 text-ink-800",
    gold: "bg-gold-500/15 text-gold-700",
    dark: "bg-ink-950/85 text-white",
  };
  return <span className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${tones[tone]}`}>{children}</span>;
}

export function SampleDataNotice({ text }: { text: string }) {
  return (
    <div className="mb-6 rounded-card border border-gold-500/30 bg-gold-300/25 px-4 py-3 text-sm font-medium text-ink-800">
      {text}
    </div>
  );
}

export function GoldDivider({ className = "" }: { className?: string }) {
  return <div className={`h-px w-12 bg-gold-500 ${className}`} aria-hidden />;
}
