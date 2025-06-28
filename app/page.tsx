import { Suspense } from "react"
import { Header } from "@/components/header"
import { ThreadList } from "@/components/thread-list"
import { Sidebar } from "@/components/sidebar"
import { Logo } from "@/components/logo"
import { supabase } from "@/lib/supabase"

async function getThreads() {
  try {
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
  } catch (error) {
    console.error("Error fetching threads:", error)
    return []
  }
}

async function getCategories() {
  try {
    const { data: categories, error } = await supabase.from("categories").select("*").order("name")

    if (error) {
      console.error("Error fetching categories:", error)
      return []
    }

    return categories || []
  } catch (error) {
    console.error("Error fetching categories:", error)
    return []
  }
}

export default async function HomePage() {
  const [threads, categories] = await Promise.all([getThreads(), getCategories()])

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-12 text-center">
          <Logo size="xl" showText={true} className="justify-center mb-6" />
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Code Is A Vibe</h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Platform komunitas untuk para Vibe Coder Indonesia berbagi karya, berdiskusi teknis, dan mengasah selera
            desain.
          </p>
          <div className="flex justify-center space-x-4">
            <a
              href="/auth/signup"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Join The Community
            </a>
            <a
              href="/auth/signin"
              className="border border-gray-300 hover:border-gray-400 text-gray-700 px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Sign In
            </a>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <Suspense fallback={<div className="text-center py-8">Loading threads...</div>}>
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
