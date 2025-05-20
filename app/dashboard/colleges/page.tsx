import { createServerSupabaseClient } from "@/lib/supabase/server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"
import Link from "next/link"

export default async function CollegesPage() {
  const supabase = createServerSupabaseClient()

  // Get colleges
  const { data: colleges } = await supabase.from("colleges").select("*").order("ranking", { ascending: true })

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">College Recommendations</h1>

      {colleges && colleges.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2">
          {colleges.map((college) => (
            <Card key={college.id}>
              <CardHeader>
                <CardTitle>{college.name}</CardTitle>
                <CardDescription>{college.location}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-sm">{college.description}</p>

                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <p className="font-medium">Ranking</p>
                      <p>#{college.ranking}</p>
                    </div>
                    <div>
                      <p className="font-medium">Acceptance Rate</p>
                      <p>{college.acceptance_rate}%</p>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <p className="font-medium text-sm">Fields of Study</p>
                    <div className="flex flex-wrap gap-1">
                      {college.fields_of_study.map((field) => (
                        <span
                          key={field}
                          className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold"
                        >
                          {field}
                        </span>
                      ))}
                    </div>
                  </div>

                  <Button asChild variant="outline" size="sm" className="w-full">
                    <a href={college.website_url} target="_blank" rel="noopener noreferrer">
                      Visit Website
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
            <CardTitle>No Recommendations Yet</CardTitle>
            <CardDescription>We're still working on finding the perfect colleges for you.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Check back soon or update your profile to get more tailored recommendations.
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
