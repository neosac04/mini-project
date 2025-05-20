import type React from "react"
import { redirect } from "next/navigation"
import { createServerSupabaseClient } from "@/lib/supabase/server"
import { DashboardSidebar } from "@/components/dashboard/sidebar"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createServerSupabaseClient()

  if (!supabase) {
    console.error('Failed to initialize Supabase client')
    redirect('/error')
  }

  // Check if user is authenticated
  const { data: { session } } = await supabase.auth.getSession()

  if (!session) {
    redirect("/")
  }

  // Get user profile
  const { data: profile, error } = await supabase
    .from("user_profiles")
    .select("*")
    .eq("id", session.user.id)
    .single()

  if (error) {
    console.error('Error fetching user profile:', error)
    redirect('/error')
  }

  // If user is not onboarded, redirect to questionnaire
  if (!profile || !profile.is_onboarded) {
    redirect("/onboarding")
  }

  return (
    <div className="flex min-h-screen">
      <DashboardSidebar user={profile} />
      <main className="flex-1 p-6 overflow-auto">{children}</main>
    </div>
  )
}
