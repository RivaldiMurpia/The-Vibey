"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import type { User, Session, AuthError } from "@supabase/supabase-js"
import { supabase } from "@/lib/supabase"

interface Profile {
  id: string
  username: string | null
  full_name: string | null
  avatar_url: string | null
  bio: string | null
  website: string | null // (Meskipun tidak ada di tabel Anda, saya biarkan untuk fleksibilitas)
  created_at: string
  updated_at: string
}

interface AuthContextType {
  user: User | null
  profile: Profile | null
  session: Session | null
  loading: boolean
  signOut: () => Promise<void>
  signInWithProvider: (provider: "google" | "github") => Promise<{ error: AuthError | null }>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getInitialSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      setSession(session)
      setUser(session?.user ?? null)
      if (session?.user) {
        await fetchProfile(session.user.id)
      }
      setLoading(false)
    }

    getInitialSession()

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session)
        const currentUser = session?.user ?? null
        setUser(currentUser)

        if (currentUser) {
          await fetchProfile(currentUser.id)
        } else {
          setProfile(null)
        }
      }
    )

    return () => {
      authListener.subscription.unsubscribe()
    }
  }, [])
  
  // --- INI BAGIAN PERBAIKANNYA ---
  useEffect(() => {
    if (user?.id) {
        // Buat channel Supabase untuk mendengarkan perubahan pada tabel 'profiles'
        const channel = supabase
            .channel(`realtime:profiles:${user.id}`)
            .on(
                'postgres_changes',
                {
                    event: 'UPDATE',
                    schema: 'public',
                    table: 'profiles',
                    filter: `id=eq.${user.id}`,
                },
                (payload) => {
                    // Saat ada update, ambil data baru dan update state 'profile'
                    setProfile(payload.new as Profile);
                    toast({
                        title: "Profile Synced",
                        description: "Your profile has been updated in real-time.",
                    });
                }
            )
            .subscribe();

        // Jangan lupa untuk unsubscribe saat komponen di-unmount
        return () => {
            supabase.removeChannel(channel);
        };
    }
  }, [user]);
  // --- AKHIR DARI BAGIAN PERBAIKAN ---

  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase.from("profiles").select("*").eq("id", userId).single()
      if (error && error.code !== "PGRST116") throw error
      setProfile(data)
    } catch (error) {
      console.error("Error fetching profile:", error)
    }
  }

  const signOut = async () => {
    await supabase.auth.signOut()
  }

  const signInWithProvider = async (provider: "google" | "github") => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    })
    return { error }
  }

  const value = { user, profile, session, loading, signOut, signInWithProvider }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
