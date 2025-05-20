import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"

export function createServerSupabaseClient() {
  const cookieStore = cookies()

  NEXT_PUBLIC_SUPABASE_URL=https://lpfznawizaugohscfxnq.supabase.co
  NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxwZnpuYXdpemF1Z29oc2NmeG5xIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY4OTQxNTAsImV4cCI6MjA2MjQ3MDE1MH0._5r2WlJqZd-RB1tPPETZlknaQ-liXerGV5n25Nqnn04  

  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn("Supabase environment variables are not set")
  }

  return createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value
      },
      set(name: string, value: string, options: any) {
        cookieStore.set({ name, value, ...options })
      },
      remove(name: string, options: any) {
        cookieStore.set({ name, value: "", ...options })
      },
    },
  })
}
