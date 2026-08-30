import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

// عميل Supabase للاستخدام في Server Components و API Routes
// يتعامل مع الـ cookies عشان يعرف هوية المستخدم المسجل دخول
export async function createClient() {
    const cookieStore = await cookies()

  return createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
            cookies: {
                      getAll() {
                                  return cookieStore.getAll()
                      },
                      setAll(cookiesToSet) {
                                  try {
                                                cookiesToSet.forEach(({ name, value, options }) =>
                                                                cookieStore.set(name, value, options)
                                                                                 )
                                  } catch {
                                                // يحصل لما يتم استدعاء الدالة من Server Component
                                    // ممكن تجاهله لو في middleware بيجدد الـ session
                                  }
                      },
            },
    }
      )
}
