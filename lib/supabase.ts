import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase environment variables")
}

// Create a singleton instance
let supabaseInstance: ReturnType<typeof createClient> | null = null

export const supabase = (() => {
  if (!supabaseInstance) {
    supabaseInstance = createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true,
        storage: typeof window !== "undefined" ? window.localStorage : undefined,
      },
    })
  }
  return supabaseInstance
})()

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          username: string
          full_name: string | null
          avatar_url: string | null
          bio: string | null
          github_username: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          username: string
          full_name?: string | null
          avatar_url?: string | null
          bio?: string | null
          github_username?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          username?: string
          full_name?: string | null
          avatar_url?: string | null
          bio?: string | null
          github_username?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      categories: {
        Row: {
          id: string
          name: string
          slug: string
          description: string | null
          color: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          description?: string | null
          color?: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          description?: string | null
          color?: string
          created_at?: string
        }
      }
      threads: {
        Row: {
          id: string
          title: string
          content: string
          author_id: string
          category_id: string
          upvotes: number
          downvotes: number
          reply_count: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          content: string
          author_id: string
          category_id: string
          upvotes?: number
          downvotes?: number
          reply_count?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          content?: string
          author_id?: string
          category_id?: string
          upvotes?: number
          downvotes?: number
          reply_count?: number
          created_at?: string
          updated_at?: string
        }
      }
      replies: {
        Row: {
          id: string
          content: string
          author_id: string
          thread_id: string
          parent_id: string | null
          upvotes: number
          downvotes: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          content: string
          author_id: string
          thread_id: string
          parent_id?: string | null
          upvotes?: number
          downvotes?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          content?: string
          author_id?: string
          thread_id?: string
          parent_id?: string | null
          upvotes?: number
          downvotes?: number
          created_at?: string
          updated_at?: string
        }
      }
      votes: {
        Row: {
          id: string
          user_id: string
          thread_id: string | null
          reply_id: string | null
          vote_type: "up" | "down"
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          thread_id?: string | null
          reply_id?: string | null
          vote_type: "up" | "down"
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          thread_id?: string | null
          reply_id?: string | null
          vote_type?: "up" | "down"
          created_at?: string
        }
      }
    }
  }
}
