"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "@/components/ui/use-toast"

const EDUCATION_LEVELS = ["High School", "Associate Degree", "Bachelor's Degree", "Master's Degree", "PhD", "Other"]

const FIELDS_OF_STUDY = ["Computer Science", "Engineering", "Business", "Arts", "Medicine", "Law", "Education", "Other"]

const INTERESTS = [
  "Programming",
  "Data Science",
  "Web Development",
  "Mobile Development",
  "UI/UX Design",
  "Artificial Intelligence",
  "Machine Learning",
  "Cybersecurity",
  "Cloud Computing",
  "Blockchain",
  "Game Development",
  "IoT",
]

export function QuestionnaireForm({ userId }: { userId: string }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    age: "",
    years_of_experience: "",
    education_level: "",
    field_of_study: "",
    interests: [] as string[],
  })

  const handleInterestChange = (interest: string, checked: boolean) => {
    if (checked) {
      setFormData({
        ...formData,
        interests: [...formData.interests, interest],
      })
    } else {
      setFormData({
        ...formData,
        interests: formData.interests.filter((i) => i !== interest),
      })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const { error } = await supabase.from("user_profiles").upsert({
        id: userId,
        first_name: formData.first_name,
        last_name: formData.last_name,
        age: Number.parseInt(formData.age),
        years_of_experience: Number.parseInt(formData.years_of_experience),
        education_level: formData.education_level,
        field_of_study: formData.field_of_study,
        interests: formData.interests,
        is_onboarded: true,
        updated_at: new Date().toISOString(),
      })

      if (error) throw error

      toast({
        title: "Profile updated",
        description: "Your profile has been successfully updated.",
      })

      router.push("/dashboard")
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "An error occurred while updating your profile.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Welcome! Tell us about yourself</CardTitle>
        <CardDescription>This information helps us personalize your educational pathway</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="first_name">First Name</Label>
              <Input
                id="first_name"
                value={formData.first_name}
                onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="last_name">Last Name</Label>
              <Input
                id="last_name"
                value={formData.last_name}
                onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="age">Age</Label>
              <Input
                id="age"
                type="number"
                value={formData.age}
                onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="years_of_experience">Years of Experience</Label>
              <Input
                id="years_of_experience"
                type="number"
                value={formData.years_of_experience}
                onChange={(e) => setFormData({ ...formData, years_of_experience: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="education_level">Education Level</Label>
            <Select
              value={formData.education_level}
              onValueChange={(value) => setFormData({ ...formData, education_level: value })}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Select your education level" />
              </SelectTrigger>
              <SelectContent>
                {EDUCATION_LEVELS.map((level) => (
                  <SelectItem key={level} value={level}>
                    {level}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="field_of_study">Field of Study</Label>
            <Select
              value={formData.field_of_study}
              onValueChange={(value) => setFormData({ ...formData, field_of_study: value })}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Select your field of study" />
              </SelectTrigger>
              <SelectContent>
                {FIELDS_OF_STUDY.map((field) => (
                  <SelectItem key={field} value={field}>
                    {field}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Fields of Interest</Label>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {INTERESTS.map((interest) => (
                <div key={interest} className="flex items-center space-x-2">
                  <Checkbox
                    id={`interest-${interest}`}
                    checked={formData.interests.includes(interest)}
                    onCheckedChange={(checked) => handleInterestChange(interest, checked as boolean)}
                  />
                  <Label htmlFor={`interest-${interest}`}>{interest}</Label>
                </div>
              ))}
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Submitting..." : "Submit"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
