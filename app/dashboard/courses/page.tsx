import { createServerSupabaseClient } from "@/lib/supabase/server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"
import Link from "next/link"

export default async function CoursesPage() {
  const supabase = createServerSupabaseClient()

  // Get courses
  const { data: courses } = await supabase.from("courses").select("*")

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Course Suggestions</h1>

      {courses && courses.length > 0 ? (
        <div className="grid gap-6">
          {courses.map((course) => (
            <Card key={course.id}>
              <CardHeader>
                <CardTitle>{course.title}</CardTitle>
                <CardDescription>Provider: {course.provider}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-sm">{course.description}</p>

                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <p className="font-medium">Duration</p>
                      <p>{course.duration}</p>
                    </div>
                    <div>
                      <p className="font-medium">Difficulty</p>
                      <p>{course.difficulty_level}</p>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <p className="font-medium text-sm">Tags</p>
                    <div className="flex flex-wrap gap-1">
                      {course.tags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <Button asChild variant="outline" size="sm" className="w-full">
                    <a href={course.url} target="_blank" rel="noopener noreferrer">
                      Go to Course
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>No Course Suggestions Yet</CardTitle>
            <CardDescription>We're still working on finding the perfect courses for you.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Check back soon or update your profile to get more tailored suggestions.
            </p>
            <Button asChild>
              <Link href="/dashboard">Back to Dashboard</Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
