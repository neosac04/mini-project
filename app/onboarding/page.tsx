import { redirect } from "next/navigation"
import { createServerSupabaseClient } from "@/lib/supabase/server"
import { QuestionnaireForm } from "@/components/questionnaire/questionnaire-form"

export default async function OnboardingPage() {
  const supabase = createServerSupabaseClient()

  // Check if user is authenticated
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect("/")
  }

  // Check if user is already onboarded
  const { data: profile } = await supabase
    .from("user_profiles")
    .select("is_onboarded")
    .eq("id", session.user.id)
    .single()

  if (profile?.is_onboarded) {
    redirect("/dashboard")
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <QuestionnaireForm userId={session.user.id} />
    </main>
  )
}
