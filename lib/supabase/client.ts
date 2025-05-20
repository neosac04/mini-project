import { createClient } from "@supabase/supabase-js"

// Default to empty strings if environment variables are not available
// This prevents errors during build time
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""

// Create a single supabase client for browser
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Add a helper function to check if Supabase is properly configured
export function isSupabaseConfigured(): boolean {
  return Boolean(supabaseUrl && supabaseAnonKey)
}
