"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { BookOpen, GraduationCap, FileText, User, LogOut, MapPin } from "lucide-react"
import { supabase } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import type { UserProfile } from "@/lib/types"

interface DashboardSidebarProps {
  user: UserProfile
}

export function DashboardSidebar({ user }: DashboardSidebarProps) {
  const pathname = usePathname()
  const router = useRouter()

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push("/")
  }

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="p-4">
          <h2 className="text-xl font-bold">Educational Pathway</h2>
          <p className="text-sm text-muted-foreground">
            Welcome, {user.first_name} {user.last_name}
          </p>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname === "/dashboard"}>
              <Link href="/dashboard">
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname === "/dashboard/colleges"}>
              <Link href="/dashboard/colleges">
                <GraduationCap className="mr-2 h-4 w-4" />
                <span>College Recommendations</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname === "/dashboard/courses"}>
              <Link href="/dashboard/courses">
                <BookOpen className="mr-2 h-4 w-4" />
                <span>Course Suggestions</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname === "/dashboard/resume"}>
              <Link href="/dashboard/resume">
                <FileText className="mr-2 h-4 w-4" />
                <span>Resume Builder</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname === "/dashboard/roadmap"}>
              <Link href="/dashboard/roadmap">
                <MapPin className="mr-2 h-4 w-4" />
                <span>Roadmap</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <div className="p-4">
          <Button variant="outline" className="w-full" onClick={handleSignOut}>
            <LogOut className="mr-2 h-4 w-4" />
            Sign Out
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
