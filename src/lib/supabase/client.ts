import { createBrowserClient } from '@supabase/ssr'

// عميل Supabase للاستخدام في مكونات المتصفح (Client Components)
// يستخدم الـ anon key الآمن للعرض في المتصفح فقط
export function createClient() {
    return createBrowserClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL!,
          process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
        )
}
