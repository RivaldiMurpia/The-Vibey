"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Users, MessageSquare, TrendingUp, Plus } from "lucide-react"
import { supabase } from "@/lib/supabase"
import { useAuth } from "@/contexts/auth-context"

interface Category {
  id: string
  name: string
  slug: string
  description: string | null
  color: string
  thread_count?: number
}

interface SidebarProps {
  categories?: Category[]
}

export function Sidebar({ categories: initialCategories }: SidebarProps) {
  const [categories, setCategories] = useState<Category[]>(initialCategories || [])
  const [stats, setStats] = useState({
    totalThreads: 0,
    totalUsers: 0,
    activeToday: 0,
  })
  const [loading, setLoading] = useState(!initialCategories)
  const { user } = useAuth()

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch categories if not provided
        if (!initialCategories) {
          const { data: categoriesData, error: categoriesError } = await supabase
            .from("categories")
            .select(`
              *,
              threads(count)
            `)
            .order("name")

          if (categoriesError) {
            console.error("Error fetching categories:", categoriesError)
          } else {
            const categoriesWithCount =
              categoriesData?.map((cat) => ({
                ...cat,
                thread_count: cat.threads?.[0]?.count || 0,
              })) || []
            setCategories(categoriesWithCount)
          }
        }

        // Fetch stats
        const [threadsResult, usersResult] = await Promise.all([
          supabase.from("threads").select("id", { count: "exact", head: true }),
          supabase.from("profiles").select("id", { count: "exact", head: true }),
        ])

        setStats({
          totalThreads: threadsResult.count || 0,
          totalUsers: usersResult.count || 0,
          activeToday: Math.floor(Math.random() * 50) + 10, // Mock data for now
        })
      } catch (error) {
        console.error("Error fetching sidebar data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [initialCategories])

  const defaultCategories = [
    {
      id: "1",
      name: "Showcase",
      slug: "showcase",
      description: "Pamer karya terbaikmu",
      color: "#3B82F6",
      thread_count: 42,
    },
    {
      id: "2",
      name: "DesignCrit",
      slug: "designcrit",
      description: "Feedback untuk UI/UX",
      color: "#8B5CF6",
      thread_count: 28,
    },
    {
      id: "3",
      name: "TechStack",
      slug: "techstack",
      description: "Diskusi tools & framework",
      color: "#10B981",
      thread_count: 35,
    },
    {
      id: "4",
      name: "Ngopi",
      slug: "ngopi",
      description: "Obrolan santai developer",
      color: "#F59E0B",
      thread_count: 67,
    },
  ]

  const displayCategories = categories.length > 0 ? categories : defaultCategories

  if (loading) {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <div className="h-5 bg-gray-200 rounded animate-pulse"></div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-4 bg-gray-200 rounded animate-pulse"></div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Quick Actions */}
      {user && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Link href="/create">
              <Button className="w-full bg-lime-600 hover:bg-lime-700">
                <Plus className="w-4 h-4 mr-2" />
                New Thread
              </Button>
            </Link>
          </CardContent>
        </Card>
      )}

      {/* Categories */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Categories</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {displayCategories.map((category) => (
            <Link
              key={category.id}
              href={`/category/${category.slug}`}
              className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group"
            >
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: category.color }} />
                <div>
                  <div className="font-medium text-sm group-hover:text-lime-600 transition-colors">
                    #{category.name}
                  </div>
                  {category.description && (
                    <div className="text-xs text-gray-500 dark:text-gray-400">{category.description}</div>
                  )}
                </div>
              </div>
              <Badge variant="secondary" className="text-xs">
                {category.thread_count || 0}
              </Badge>
            </Link>
          ))}
        </CardContent>
      </Card>

      {/* Community Stats */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Community Stats</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-3">
            <MessageSquare className="w-5 h-5 text-blue-500" />
            <div>
              <div className="font-semibold">{stats.totalThreads}</div>
              <div className="text-sm text-gray-500">Total Threads</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Users className="w-5 h-5 text-green-500" />
            <div>
              <div className="font-semibold">{stats.totalUsers}</div>
              <div className="text-sm text-gray-500">Members</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <TrendingUp className="w-5 h-5 text-orange-500" />
            <div>
              <div className="font-semibold">{stats.activeToday}</div>
              <div className="text-sm text-gray-500">Active Today</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* About */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">About The Vibey</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            Platform komunitas untuk para Vibe Coder Indonesia. Tempat berbagi karya, berdiskusi teknis, dan mengasah
            selera desain dengan sesama developer yang peduli pada kualitas dan estetika.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
