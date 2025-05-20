import { redirect } from "next/navigation"
import { createServerSupabaseClient } from "@/lib/supabase/server"
import { AuthForm } from "@/components/auth/auth-form"
import { isSupabaseConfigured } from "@/lib/supabase/client"

export default async function Home() {
  try {
    const supabase = await createServerSupabaseClient()
    if (supabase) {
      const { data: { session } } = await supabase.auth.getSession()
      
      if (session) {
        redirect("/dashboard")
      }
    }
  } catch (error) {
    console.error("Error checking session:", error)
    // Continue to render the auth form even if there's an error
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="w-full max-w-md">
        {!isSupabaseConfigured() && (
          <div className="mb-4 p-4 bg-yellow-100 dark:bg-yellow-900 rounded-md text-yellow-800 dark:text-yellow-200">
            <h3 className="font-bold">Supabase Configuration Missing</h3>
            <p className="text-sm">
              Please set up your Supabase environment variables (NEXT_PUBLIC_SUPABASE_URL and
              NEXT_PUBLIC_SUPABASE_ANON_KEY).
            </p>
          </div>
        )}
        <AuthForm />
      </div>
    </main>
  )
}
