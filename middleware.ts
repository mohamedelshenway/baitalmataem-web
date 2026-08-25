import { NextRequest, NextResponse } from "next/server";
import { locales, defaultLocale } from "@/i18n/config";

export const config = {
  // استثناء ملفات Next الداخلية وملفات public والـ API من إعادة توجيه اللغة
  matcher: ["/((?!_next|api|favicon.ico|placeholders|.*\\.\\w+$).*)"],
};

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const pathnameHasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );
  if (pathnameHasLocale) return;

  // لا نخمّن لغة المستخدم هنا ونجبره عليها — نوجّه فقط للغة الافتراضية،
  // واقتراح اللغة البديلة يظهر كبانر قابل للتجاهل من داخل الصفحة (LanguageSuggestionBanner).
  const url = request.nextUrl.clone();
  url.pathname = `/${defaultLocale}${pathname}`;
  return NextResponse.redirect(url);
}
