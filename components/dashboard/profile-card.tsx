import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { UserProfile } from "@/lib/types"
import Link from "next/link"
import { MapPin } from "lucide-react"

interface ProfileCardProps {
  user: UserProfile
}

export function ProfileCard({ user }: ProfileCardProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Your Profile</CardTitle>
        <CardDescription>Your personal and educational information</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-1">
          <h3 className="text-sm font-medium text-muted-foreground">Personal Information</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium">Name</p>
              <p>
                {user.first_name} {user.last_name}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium">Age</p>
              <p>{user.age}</p>
            </div>
          </div>
        </div>

        <div className="space-y-1">
          <h3 className="text-sm font-medium text-muted-foreground">Educational Background</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium">Education Level</p>
              <p>{user.education_level}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Field of Study</p>
              <p>{user.field_of_study}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Years of Experience</p>
              <p>{user.years_of_experience}</p>
            </div>
          </div>
        </div>

        <div className="space-y-1">
          <h3 className="text-sm font-medium text-muted-foreground">Interests</h3>
          <div className="flex flex-wrap gap-2">
            {user.interests.map((interest) => (
              <span
                key={interest}
                className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold"
              >
                {interest}
              </span>
            ))}
          </div>
        </div>

        <div className="flex justify-center pt-4">
          <Button asChild>
            <Link href="/dashboard/roadmap">
              <MapPin className="mr-2 h-4 w-4" />
              Build Roadmap
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
