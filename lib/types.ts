export type UserProfile = {
  id: string
  first_name: string
  last_name: string
  age: number
  years_of_experience: number
  education_level: string
  field_of_study: string
  interests: string[]
  is_onboarded: boolean
  created_at: string
  updated_at: string
}

export type College = {
  id: string
  name: string
  location: string
  description: string
  website_url: string
  ranking: number
  acceptance_rate: number
  fields_of_study: string[]
}

export type Course = {
  id: string
  title: string
  provider: string
  description: string
  url: string
  duration: string
  difficulty_level: string
  tags: string[]
}

export type ResumeTemplate = {
  id: string
  name: string
  description: string
  template_data: any
}

export type UserResume = {
  id: string
  user_id: string
  template_id: string
  resume_data: any
}
