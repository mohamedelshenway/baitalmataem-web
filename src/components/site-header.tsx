"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import type { Dictionary } from "@/i18n/get-dictionary";
import { locales, localeMeta, type Locale } from "@/i18n/config";
import { BrandMark } from "@/components/brand-mark";
import { SERVICES } from "@/lib/data/services";
import { SocialIconRow } from "@/components/social-icons";

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
    { href: "/projects", label: dict.nav.projects },
    { href: "/marketplace", label: dict.nav.marketplace },
    { href: "/blog", label: dict.nav.blog },
    { href: "/about", label: dict.nav.about },
    { href: "/contact", label: dict.nav.contact },
  ];

  const servicesActive = pathname?.startsWith(`/${locale}/services`) ?? false;

  return (
    <header
      className={`sticky top-0 z-40 border-b transition-all duration-300 ${
        scrolled ? "border-sand-200 bg-white/95 shadow-subtle backdrop-blur" : "border-transparent bg-sand-50/90 backdrop-blur"
      }`}
    >
      <div className="container-page flex h-[72px] items-center justify-between gap-4">
        <Link href={`/${locale}`} className="focus-ring flex items-center gap-2.5">
          <BrandMark className="h-9 w-9 shrink-0" />
          <span className="flex flex-col leading-none">
            <span className="text-[19px] font-bold tracking-tight text-ink-950">{dict.common.siteName}</span>
            <span className="mt-0.5 text-[10px] font-semibold tracking-[0.22em] text-gold-600">BAIT AL MATAEM</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          <Link
            href={`/${locale}`}
            className={`focus-ring rounded-btn px-3 py-2 text-sm font-medium transition-colors ${
              pathname === `/${locale}` ? "text-ember-600" : "text-ink-700 hover:text-ink-950"
            }`}
          >
            {dict.nav.home}
          </Link>

          <ServicesMenu dict={dict} locale={locale} active={servicesActive} />

          {navItems.slice(1).map((item) => {
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
          <SocialIconRow className="me-1 hidden items-center gap-3 xl:flex" />
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
            <Link
              href={`/${locale}`}
              onClick={() => setOpen(false)}
              className="focus-ring rounded-btn px-3 py-2.5 text-sm font-medium text-ink-800 hover:bg-sand-50"
            >
              {dict.nav.home}
            </Link>

            <MobileServicesDisclosure dict={dict} locale={locale} onNavigate={() => setOpen(false)} />

            {navItems.slice(1).map((item) => (
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
            <SocialIconRow className="mt-4 flex items-center justify-center gap-5 border-t border-sand-200 pt-4" />
          </nav>
        </div>
      )}
    </header>
  );
}

function ServicesMenu({ dict, locale, active }: { dict: Dictionary; locale: Locale; active: boolean }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className={`focus-ring flex items-center gap-1 rounded-btn px-3 py-2 text-sm font-medium transition-colors ${
          active ? "text-ember-600" : "text-ink-700 hover:text-ink-950"
        }`}
      >
        {dict.nav.services}
        <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden className={`transition-transform ${open ? "rotate-180" : ""}`}>
          <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        <div className="absolute start-0 top-11 z-50 w-[560px] rounded-card border border-sand-200 bg-white p-4 shadow-cardHover">
          <div className="grid grid-cols-2 gap-1">
            {SERVICES.map((s) => {
              const item = dict.services.list[s.slug as keyof typeof dict.services.list];
              if (!item) return null;
              return (
                <Link
                  key={s.slug}
                  href={`/${locale}/services/${s.slug}`}
                  onClick={() => setOpen(false)}
                  className="focus-ring rounded-btn px-3 py-2.5 text-sm font-medium text-ink-700 transition-colors hover:bg-sand-50 hover:text-ember-600"
                >
                  {item.title}
                </Link>
              );
            })}
          </div>
          <div className="mt-2 border-t border-sand-100 pt-3">
            <Link
              href={`/${locale}/services`}
              onClick={() => setOpen(false)}
              className="focus-ring block rounded-btn px-3 py-2 text-sm font-semibold text-ember-600 hover:text-ember-700"
            >
              {dict.common.viewAll} ←
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

function MobileServicesDisclosure({ dict, locale, onNavigate }: { dict: Dictionary; locale: Locale; onNavigate: () => void }) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="focus-ring flex w-full items-center justify-between rounded-btn px-3 py-2.5 text-sm font-medium text-ink-800 hover:bg-sand-50"
      >
        {dict.nav.services}
        <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden className={`transition-transform ${open ? "rotate-180" : ""}`}>
          <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {open && (
        <div className="flex flex-col gap-0.5 ps-4">
          {SERVICES.map((s) => {
            const item = dict.services.list[s.slug as keyof typeof dict.services.list];
            if (!item) return null;
            return (
              <Link
                key={s.slug}
                href={`/${locale}/services/${s.slug}`}
                onClick={onNavigate}
                className="focus-ring rounded-btn px-3 py-2 text-sm text-ink-600 hover:bg-sand-50 hover:text-ember-600"
              >
                {item.title}
              </Link>
            );
          })}
          <Link
            href={`/${locale}/services`}
            onClick={onNavigate}
            className="focus-ring rounded-btn px-3 py-2 text-sm font-semibold text-ember-600 hover:text-ember-700"
          >
            {dict.common.viewAll} ←
          </Link>
        </div>
      )}
    </div>
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
