import { createServerClient as createSupabaseServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"

type CookieOptions = {
  name: string
  value: string
  httpOnly?: boolean
  path?: string
  secure?: boolean
  sameSite?: 'lax' | 'strict' | 'none'
  maxAge?: number
  expires?: Date
}

type CookieMethods = {
  get: (name: string) => Promise<string | undefined>
  set: (name: string, value: string, options?: Partial<CookieOptions>) => Promise<void>
  remove: (name: string, options?: Partial<CookieOptions>) => Promise<void>
}

export async function createServerSupabaseClient() {
  try {
    const cookieStore = cookies()
    
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseAnonKey) {
      console.error('Missing Supabase environment variables')
      return null
    }

    // Create a simple cookie handler that works with Next.js 13+
    const cookieHandler: CookieMethods = {
      get: async (name) => {
        return (await cookieStore).get(name)?.value
      },
      set: async (name, value, options = {}) => {
        try {
          // In Next.js 13+, we can't modify cookies in layout or page components
          // This will only work in Server Actions or Route Handlers
          ;(await cookieStore).set({ name, value, ...options } as any)
        } catch (error) {
          console.warn('Could not set cookie (this is expected in some contexts):', error)
        }
      },
      remove: async (name, options = {}) => {
        try {
          ;(await cookieStore).set({ name, value: '', ...options } as any)
        } catch (error) {
          console.warn('Could not remove cookie (this is expected in some contexts):', error)
        }
      },
    }

    return createSupabaseServerClient(supabaseUrl, supabaseAnonKey, {
      cookies: {
        get: (name) => cookieHandler.get(name).then(value => value || ''),
        set: (name, value, options) => cookieHandler.set(name, value, options as any),
        remove: (name, options) => cookieHandler.remove(name, options as any),
      },
    })
  } catch (error) {
    console.error('Error creating Supabase client:', error)
    return null
  }
}
