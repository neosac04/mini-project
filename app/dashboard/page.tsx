import { createServerSupabaseClient } from "@/lib/supabase/server"
import { ProfileCard } from "@/components/dashboard/profile-card"
import { redirect } from "next/navigation"

export default async function DashboardPage() {
  const supabase = await createServerSupabaseClient()

  const { data: { session } } = await supabase.auth.getSession()
  
  if (!session) {
    redirect('/')
  }

  // Get user profile
  const { data: profile } = await supabase
    .from("user_profiles")
    .select("*")
    .eq("id", session.user.id)
    .single()

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      <div className="grid gap-6">
        <ProfileCard user={profile} />
      </div>
    </div>
  )
}
