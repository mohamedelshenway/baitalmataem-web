"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import type { Dictionary } from "@/i18n/get-dictionary";
import { locales, localeMeta, type Locale } from "@/i18n/config";

export function SiteHeader({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // المسار بدون بادئة اللغة الحالية، لاستخدامه عند التبديل بين ar/en على نفس الصفحة
  const pathWithoutLocale = pathname?.replace(new RegExp(`^/(${locales.join("|")})`), "") || "";

  const navItems: { href: string; label: string }[] = [
    { href: "/", label: dict.nav.home },
    { href: "/services", label: dict.nav.services },
    { href: "/marketplace", label: dict.nav.marketplace },
    { href: "/blog", label: dict.nav.blog },
    { href: "/about", label: dict.nav.about },
    { href: "/contact", label: dict.nav.contact },
  ];

  return (
    <header
      className={`sticky top-0 z-40 border-b transition-all duration-300 ${
        scrolled ? "border-sand-200 bg-white/95 shadow-subtle backdrop-blur" : "border-transparent bg-sand-50/90 backdrop-blur"
      }`}
    >
      <div className="container-page flex h-[72px] items-center justify-between gap-4">
        <Link href={`/${locale}`} className="focus-ring flex flex-col leading-none">
          <span className="text-[19px] font-bold tracking-tight text-ink-950">{dict.common.siteName}</span>
          <span className="mt-0.5 text-[10px] font-semibold tracking-[0.22em] text-gold-600">BAIT AL MATAEM</span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => {
            const href = `/${locale}${item.href === "/" ? "" : item.href}`;
            const active = pathname === href;
            return (
              <Link
                key={item.href}
                href={href}
                className={`focus-ring rounded-btn px-3 py-2 text-sm font-medium transition-colors ${
                  active ? "text-ember-600" : "text-ink-700 hover:text-ink-950"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <LanguageSwitcher locale={locale} pathWithoutLocale={pathWithoutLocale} />
          <Link
            href={`/${locale}/contact`}
            className="focus-ring hidden rounded-btn px-3 py-2 text-sm font-semibold text-ink-700 hover:text-ember-600 xl:inline-flex"
          >
            {dict.nav.consultCta}
          </Link>
          <Link
            href={`/${locale}/marketplace/new`}
            className="focus-ring hidden rounded-btn bg-ember-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-ember-700 sm:inline-flex"
          >
            {dict.nav.addListing}
          </Link>
          <button
            type="button"
            aria-label="menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="focus-ring inline-flex h-10 w-10 items-center justify-center rounded-btn border border-ink-900/10 lg:hidden"
          >
            <span className="sr-only">menu</span>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
              <path d="M2 5h16M2 10h16M2 15h16" stroke="#151515" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-sand-200 bg-white lg:hidden">
          <nav className="container-page flex flex-col gap-1 py-3">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={`/${locale}${item.href === "/" ? "" : item.href}`}
                onClick={() => setOpen(false)}
                className="focus-ring rounded-btn px-3 py-2.5 text-sm font-medium text-ink-800 hover:bg-sand-50"
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-2 flex flex-col gap-2">
              <Link
                href={`/${locale}/marketplace/new`}
                onClick={() => setOpen(false)}
                className="focus-ring rounded-btn bg-ember-600 px-5 py-2.5 text-center text-sm font-semibold text-white"
              >
                {dict.nav.addListing}
              </Link>
              <Link
                href={`/${locale}/contact`}
                onClick={() => setOpen(false)}
                className="focus-ring rounded-btn border border-ink-900/15 px-5 py-2.5 text-center text-sm font-semibold text-ink-800"
              >
                {dict.nav.consultCta}
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

function LanguageSwitcher({ locale, pathWithoutLocale }: { locale: Locale; pathWithoutLocale: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="focus-ring flex h-10 items-center gap-1 rounded-btn border border-ink-900/10 px-3 text-sm font-medium text-ink-900"
      >
        {localeMeta[locale].label}
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
          <path d="M2 4l4 4 4-4" stroke="#151515" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {open && (
        <div className="absolute end-0 top-12 z-50 w-32 overflow-hidden rounded-card border border-sand-200 bg-white py-1 shadow-cardHover">
          {locales.map((l) => (
            <Link
              key={l}
              href={`/${l}${pathWithoutLocale}`}
              onClick={() => setOpen(false)}
              className={`block px-4 py-2 text-sm font-medium hover:bg-sand-50 ${l === locale ? "text-ember-600" : "text-ink-700"}`}
            >
              {localeMeta[l].label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
