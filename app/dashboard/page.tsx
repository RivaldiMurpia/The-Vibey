"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/contexts/auth-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { supabase } from "@/lib/supabase"
import { MessageSquare, TrendingUp, Users, Plus, Eye, Heart, Calendar } from "lucide-react"
import Link from "next/link"

interface DashboardStats {
  threads: number
  replies: number
  upvotes: number
  views: number
}

interface RecentThread {
  id: string
  title: string
  content: string
  upvotes: number
  reply_count: number
  created_at: string
}

export default function DashboardPage() {
  const { user, loading: authLoading } = useAuth()
  const [stats, setStats] = useState<DashboardStats>({
    threads: 0,
    replies: 0,
    upvotes: 0,
    views: 0,
  })
  const [recentThreads, setRecentThreads] = useState<RecentThread[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) {
      fetchDashboardData()
    }
  }, [user])

  const fetchDashboardData = async () => {
    if (!user) return

    try {
      // Fetch user stats
      const [threadsResult, repliesResult, votesResult] = await Promise.all([
        supabase.from("threads").select("id", { count: "exact" }).eq("author_id", user.id),
        supabase.from("replies").select("id", { count: "exact" }).eq("author_id", user.id),
        supabase.from("votes").select("id", { count: "exact" }).eq("user_id", user.id).eq("vote_type", "up"),
      ])

      setStats({
        threads: threadsResult.count || 0,
        replies: repliesResult.count || 0,
        upvotes: votesResult.count || 0,
        views: Math.floor(Math.random() * 1000), // Mock data
      })

      // Fetch recent threads
      const { data: threadsData } = await supabase
        .from("threads")
        .select("id, title, content, upvotes, reply_count, created_at")
        .eq("author_id", user.id)
        .order("created_at", { ascending: false })
        .limit(5)

      setRecentThreads(threadsData || [])
    } catch (error) {
      console.error("Error fetching dashboard data:", error)
    } finally {
      setLoading(false)
    }
  }

  if (authLoading || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="container py-8">
        <Card>
          <CardContent className="pt-6">
            <p>Please sign in to access your dashboard.</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container py-8">
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground">Welcome back, {user.user_metadata?.full_name || user.email}!</p>
          </div>
          <Button asChild>
            <Link href="/create">
              <Plus className="h-4 w-4 mr-2" />
              Create Thread
            </Link>
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Threads</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.threads}</div>
              <p className="text-xs text-muted-foreground">Threads you've created</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Replies</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.replies}</div>
              <p className="text-xs text-muted-foreground">Replies you've posted</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Upvotes Received</CardTitle>
              <Heart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.upvotes}</div>
              <p className="text-xs text-muted-foreground">Total upvotes on your content</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Profile Views</CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.views}</div>
              <p className="text-xs text-muted-foreground">People who viewed your profile</p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Recent Threads</CardTitle>
              <CardDescription>Your most recent thread posts</CardDescription>
            </CardHeader>
            <CardContent>
              {recentThreads.length > 0 ? (
                <div className="space-y-4">
                  {recentThreads.map((thread) => (
                    <div key={thread.id} className="border-b pb-4 last:border-b-0">
                      <Link href={`/thread/${thread.id}`} className="font-medium hover:underline">
                        {thread.title}
                      </Link>
                      <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{thread.content}</p>
                      <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Heart className="h-3 w-3" />
                          {thread.upvotes}
                        </span>
                        <span className="flex items-center gap-1">
                          <MessageSquare className="h-3 w-3" />
                          {thread.reply_count}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {new Date(thread.created_at).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No threads yet</p>
                  <p className="text-sm">Create your first thread to get started!</p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common actions you might want to take</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button asChild className="w-full justify-start">
                <Link href="/create">
                  <Plus className="h-4 w-4 mr-2" />
                  Create New Thread
                </Link>
              </Button>

              <Button variant="outline" asChild className="w-full justify-start bg-transparent">
                <Link href="/profile">
                  <Users className="h-4 w-4 mr-2" />
                  Edit Profile
                </Link>
              </Button>

              <Button variant="outline" asChild className="w-full justify-start bg-transparent">
                <Link href="/settings">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Account Settings
                </Link>
              </Button>

              <Button variant="outline" asChild className="w-full justify-start bg-transparent">
                <Link href="/categories">
                  <Eye className="h-4 w-4 mr-2" />
                  Browse Categories
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
