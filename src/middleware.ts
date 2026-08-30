import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { locales, defaultLocale } from "@/i18n/config";

export const config = {
    // مطابق كل المسارات ما عدا ملفات Next الداخلية والـ public وAPI وأيقونات
    matcher: ["/((?!_next|api|favicon.ico|placeholders|.*\\.\\w+$).*)"],
};

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

  // 1) إعادة توجيه اللغة (منطق موجود مسبقًا لا يتم المساس به)
  const pathnameHasLocale = locales.some(
        (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
      );

  if (!pathnameHasLocale) {
        // لا نحدد لغة المستخدم هنا ونجبره عليها — نوجّه فقط للغة الافتراضية
      // (واقتراح اللغة البديلة يظهر كبانر قابل للتجاهل من داخل الصفحة - LanguageSuggestionBanner).
      const url = request.nextUrl.clone();
        url.pathname = `/${defaultLocale}${pathname}`;
        return NextResponse.redirect(url);
  }

  // 2) تجديد جلسة Supabase لأي طلب (ضروري للحفاظ على تسجيل الدخول فعّالاً)
  let response = NextResponse.next({ request });

  const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
            cookies: {
                      getAll() {
                                  return request.cookies.getAll();
                      },
                      setAll(cookiesToSet) {
                                  cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
                                  response = NextResponse.next({ request });
                                  cookiesToSet.forEach(({ name, value, options }) =>
                                                response.cookies.set(name, value, options)
                                                                 );
                      },
            },
    }
      );

  const {
        data: { user },
  } = await supabase.auth.getUser();

  // 3) حماية مسارات لوحة التحكم لأي لغة
  const isDashboardRoute = locales.some((locale) =>
        pathname.startsWith(`/${locale}/dashboard`)
                                          );
    const isLoginRoute = locales.some((locale) =>
          pathname.startsWith(`/${locale}/dashboard/login`)
                                        );

  if (isDashboardRoute && !isLoginRoute && !user) {
        const currentLocale = locales.find(
                (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
              );
        const url = request.nextUrl.clone();
        url.pathname = `/${currentLocale}/dashboard/login`;
        url.searchParams.set("redirectTo", pathname);
        return NextResponse.redirect(url);
  }

  return response;
}
