import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { createServerSupabaseClient } from "@/lib/supabase/server"

export default async function ResumePage() {
  const supabase = createServerSupabaseClient()

  // Get resume templates
  const { data: templates } = await supabase.from("resume_templates").select("*")

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Resume Builder</h1>

      {templates && templates.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2">
          {templates.map((template) => (
            <Card key={template.id}>
              <CardHeader>
                <CardTitle>{template.name}</CardTitle>
                <CardDescription>{template.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-muted rounded-md mb-4 flex items-center justify-center">
                  <p className="text-sm text-muted-foreground">Template Preview</p>
                </div>
                <Button className="w-full">Use This Template</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Resume Builder Coming Soon</CardTitle>
            <CardDescription>We're still working on our resume builder feature.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Check back soon to create professional resumes tailored to your skills and experience.
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
