import { Suspense } from "react"
import { Header } from "@/components/header"
import { ThreadList } from "@/components/thread-list"
import { Sidebar } from "@/components/sidebar"
import { supabase } from "@/lib/supabase"

async function getThreads() {
  const { data: threads, error } = await supabase
    .from("threads")
    .select(`
      *,
      profiles:author_id (username, avatar_url),
      categories (name, slug, color)
    `)
    .order("created_at", { ascending: false })
    .limit(20)

  if (error) {
    console.error("Error fetching threads:", error)
    return []
  }

  return threads || []
}

async function getCategories() {
  const { data: categories, error } = await supabase.from("categories").select("*").order("name")

  if (error) {
    console.error("Error fetching categories:", error)
    return []
  }

  return categories || []
}

export default async function HomePage() {
  const [threads, categories] = await Promise.all([getThreads(), getCategories()])

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <Suspense fallback={<div>Loading threads...</div>}>
              <ThreadList threads={threads} />
            </Suspense>
          </div>

          <div className="lg:col-span-1">
            <Sidebar categories={categories} />
          </div>
        </div>
      </main>
    </div>
  )
}
