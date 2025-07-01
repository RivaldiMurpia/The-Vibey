"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { supabase } from "@/lib/supabase"
import { Github, Calendar, MessageSquare } from "lucide-react"

interface UserProfile {
  id: string
  username: string
  full_name: string | null
  avatar_url: string | null
  bio: string | null
  github_username: string | null
  created_at: string
}

interface UserStats {
  threads: number
  replies: number
  upvotes: number
}

export default function UserProfilePage() {
  const params = useParams()
  const username = params.username as string
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [stats, setStats] = useState<UserStats>({ threads: 0, replies: 0, upvotes: 0 })
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    if (username) {
      fetchUserProfile()
    }
  }, [username])

  const fetchUserProfile = async () => {
    try {
      // Fetch user profile
      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("*")
        .eq("username", username)
        .single()

      if (profileError) {
        if (profileError.code === "PGRST116") {
          setNotFound(true)
        }
        throw profileError
      }

      setProfile(profileData)

      // Fetch user stats
      const [threadsResult, repliesResult, votesResult] = await Promise.all([
        supabase.from("threads").select("id", { count: "exact" }).eq("author_id", profileData.id),
        supabase.from("replies").select("id", { count: "exact" }).eq("author_id", profileData.id),
        supabase.from("votes").select("id", { count: "exact" }).eq("user_id", profileData.id).eq("vote_type", "up"),
      ])

      setStats({
        threads: threadsResult.count || 0,
        replies: repliesResult.count || 0,
        upvotes: votesResult.count || 0,
      })
    } catch (error) {
      console.error("Error fetching user profile:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (notFound || !profile) {
    return (
      <div className="container py-8">
        <Card>
          <CardContent className="pt-6 text-center">
            <h1 className="text-2xl font-bold mb-2">User Not Found</h1>
            <p className="text-muted-foreground">The user @{username} could not be found.</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container py-8">
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Profile Sidebar */}
        <div className="lg:col-span-1">
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center space-y-4">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={profile.avatar_url || undefined} />
                  <AvatarFallback className="text-2xl">{profile.username.charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>

                <div className="text-center space-y-2">
                  <h1 className="text-2xl font-bold">{profile.full_name || profile.username}</h1>
                  <p className="text-muted-foreground">@{profile.username}</p>

                  {profile.bio && <p className="text-sm text-center">{profile.bio}</p>}
                </div>

                <div className="flex flex-wrap gap-2 justify-center">
                  {profile.github_username && (
                    <Button variant="outline" size="sm" asChild>
                      <a
                        href={`https://github.com/${profile.github_username}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Github className="h-4 w-4 mr-2" />
                        GitHub
                      </a>
                    </Button>
                  )}

                  <Button variant="outline" size="sm">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Message
                  </Button>
                </div>

                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4 mr-2" />
                  Joined {new Date(profile.created_at).toLocaleDateString()}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Stats Card */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold">{stats.threads}</div>
                  <div className="text-xs text-muted-foreground">Threads</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">{stats.replies}</div>
                  <div className="text-xs text-muted-foreground">Replies</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">{stats.upvotes}</div>
                  <div className="text-xs text-muted-foreground">Upvotes</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="threads" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="threads">Threads</TabsTrigger>
              <TabsTrigger value="replies">Replies</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
            </TabsList>

            <TabsContent value="threads" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Threads</CardTitle>
                  <CardDescription>Threads created by @{profile.username}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8 text-muted-foreground">
                    No threads found. This user hasn't created any threads yet.
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="replies" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Replies</CardTitle>
                  <CardDescription>Recent replies by @{profile.username}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8 text-muted-foreground">
                    No replies found. This user hasn't replied to any threads yet.
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="activity" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Recent activity by @{profile.username}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8 text-muted-foreground">No recent activity found.</div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
