import Link from "next/link";
import type { ReactNode } from "react";
import type { Dictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/config";
import { SITE, SOCIALS, HAS_WHATSAPP, whatsappLink, mailtoLink } from "@/lib/constants";
import { SERVICES } from "@/lib/data/services";
import { POSTS } from "@/lib/data/posts";
import { GoldDivider } from "@/components/ui";
import { BrandMark } from "@/components/brand-mark";
import { pickText } from "@/lib/i18n-text";

const SOCIAL_LINKS = [
  { key: "instagram", label: "Instagram" },
  { key: "x", label: "X" },
  { key: "facebook", label: "Facebook" },
  { key: "youtube", label: "YouTube" },
  { key: "snapchat", label: "Snapchat" },
] as const;

export function SiteFooter({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const year = "2026"; // ثابت لتفادي استخدام Date.now() وقت البناء
  const featured = SERVICES.filter((s) => s.featured).slice(0, 4);
  const contactHref = (HAS_WHATSAPP && whatsappLink("مرحبًا بيت المطاعم")) || mailtoLink("استفسار من الموقع");

  return (
    <footer className="mt-24 bg-ink-950 text-white/80">
      <div className="container-page py-16">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_repeat(4,1fr)]">
          <div>
            <div className="flex items-center gap-3">
              <BrandMark className="h-10 w-10 shrink-0" tone="inverted" />
              <div className="flex flex-col leading-none">
                <span className="text-xl font-bold text-white">{dict.common.siteName}</span>
                <span className="mt-1 text-[10px] font-semibold tracking-[0.22em] text-gold-500">BAIT AL MATAEM</span>
              </div>
            </div>
            <GoldDivider className="my-4" />
            <p className="max-w-xs text-sm leading-7 text-white/60">{pickText(SITE.tagline, locale)}</p>
            <p className="mt-4 text-xs font-semibold text-gold-500/90">{dict.footer.focusNotice}</p>
          </div>

          <FooterCol title={dict.footer.servicesTitle}>
            {featured.map((s) => (
              <FooterLink key={s.slug} href={`/${locale}/services/${s.slug}`}>
                {dict.services.list[s.slug as keyof typeof dict.services.list].title}
              </FooterLink>
            ))}
            <FooterLink href={`/${locale}/services`} strong>
              {dict.common.viewAll}
            </FooterLink>
          </FooterCol>

          <FooterCol title={dict.nav.marketplace}>
            <FooterLink href={`/${locale}/marketplace`}>{dict.home.listingsCta}</FooterLink>
            <FooterLink href={`/${locale}/marketplace?kind=restaurant_taqbeel`}>{dict.marketplace.kinds.restaurant_taqbeel}</FooterLink>
            <FooterLink href={`/${locale}/marketplace?kind=restaurant_sale`}>{dict.marketplace.kinds.restaurant_sale}</FooterLink>
            <FooterLink href={`/${locale}/marketplace/new`} strong>
              {dict.nav.addListing}
            </FooterLink>
          </FooterCol>

          <FooterCol title={dict.nav.blog}>
            {POSTS.slice(0, 2).map((p) => (
              <FooterLink key={p.slug} href={`/${locale}/blog/${p.slug}`}>
                {pickText(p.title, locale)}
              </FooterLink>
            ))}
            <FooterLink href={`/${locale}/blog`} strong>
              {dict.common.viewAll}
            </FooterLink>
          </FooterCol>

          <FooterCol title={dict.nav.contact}>
            <FooterLink href={`/${locale}/contact`}>{dict.nav.contact}</FooterLink>
            <FooterLink href={`/${locale}/about`}>{dict.nav.about}</FooterLink>
            <FooterLink href={`/${locale}/our-work`}>{dict.nav.ourWork}</FooterLink>
            <FooterLink href={`/${locale}/join-us`}>{dict.joinUs.pageTitle}</FooterLink>
            <a href={contactHref} target="_blank" rel="noopener noreferrer" className="block text-sm text-white/60 hover:text-gold-500">
              {SOCIALS.email}
            </a>
          </FooterCol>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-6 border-t border-white/10 pt-8">
          <div className="flex flex-wrap items-center gap-5">
            {SOCIAL_LINKS.map((s) => (
              <a
                key={s.key}
                href={SOCIALS[s.key]}
                target="_blank"
                rel="noopener noreferrer"
                className="focus-ring text-xs font-semibold text-white/55 hover:text-gold-500"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 py-5">
        <div className="container-page flex flex-wrap items-center justify-between gap-3 text-xs text-white/40">
          <span>
            © {year} {SITE.legalName} — {dict.footer.rights}
          </span>
          <span className="flex items-center gap-4">
            <Link href={`/${locale}/privacy`} className="hover:text-white/70">
              {dict.footer.privacy}
            </Link>
            <Link href={`/${locale}/terms`} className="hover:text-white/70">
              {dict.footer.terms}
            </Link>
          </span>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <h3 className="mb-4 text-xs font-semibold uppercase tracking-wide text-white/45">{title}</h3>
      <div className="flex flex-col gap-2.5">{children}</div>
    </div>
  );
}

function FooterLink({ href, children, strong = false }: { href: string; children: ReactNode; strong?: boolean }) {
  return (
    <Link
      href={href}
      className={`block text-sm hover:text-gold-500 ${strong ? "font-semibold text-white/85" : "text-white/60"}`}
    >
      {children}
    </Link>
  );
}
