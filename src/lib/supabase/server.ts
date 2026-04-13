import { SUPABASE_API_KEY, SUPABASE_URL } from '@/config/appConfig'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextRequest } from 'next/server'

export async function createSupabaseServerClient() {
    const cookieStore = await cookies()

    return createServerClient(
        SUPABASE_URL,
        SUPABASE_API_KEY,
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
                        // The `setAll` method was called from a Server Component.
                        // This can be ignored if you have middleware refreshing
                        // user sessions.
                    }
                },
            },
        }
    )
}

export function createSupabaseServerClientForMiddleware(req: NextRequest) {
    return createServerClient(
        SUPABASE_URL,
        SUPABASE_API_KEY,
        {
            cookies: {
                get: (name: string) => {
                    return req.cookies.get(name)?.value
                }
            }
        }
    )
}