// app/category/[slug]/page.tsx

import { notFound } from "next/navigation"
import Link from "next/link"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  MessageCircle,
  Eye,
  Calendar,
  Star,
  ChevronLeft,
  ChevronRight,
  Plus,
  Code2,
  Palette,
  Coffee,
} from "lucide-react"
import { supabase } from "@/lib/supabase"
import { ThreadList } from "@/components/thread-list" // Kita akan gunakan komponen yang sudah ada

const categoryMeta = {
  showcase: {
    title: "Showcase",
    description: "Pamerkan karya terbaikmu dengan bangga dan dapatkan apresiasi dari komunitas.",
    icon: Palette,
    color: "pink",
  },
  designcrit: {
    title: "DesignCrit",
    description: "Kritik konstruktif untuk growth yang maksimal dari expert designer.",
    icon: MessageCircle,
    color: "blue",
  },
  techstack: {
    title: "TechStack",
    description: "Diskusi mendalam tentang teknologi terdepan dan best practices.",
    icon: Code2,
    color: "green",
  },
  ngopi: {
    title: "Ngopi",
    description: "Obrolan santai sambil ngoding bareng dalam suasana yang friendly.",
    icon: Coffee,
    color: "orange",
  },
}

async function getCategoryAndThreads(slug: string, page: number, sortBy: string) {
  // 1. Dapatkan info kategori
  const { data: category, error: categoryError } = await supabase
    .from("categories")
    .select("id, name, slug, description, color")
    .eq("slug", slug)
    .single()

  if (categoryError || !category) {
    return { category: null, threads: [], count: 0 }
  }

  // 2. Konfigurasi query untuk thread
  let query = supabase
    .from("threads")
    .select(
      `
      *,
      profiles (username, avatar_url, full_name),
      categories (name, slug, color)
    `,
      { count: "exact" },
    )
    .eq("category_id", category.id)

  // Sorting logic
  if (sortBy === "popular") {
    query = query.order("upvotes", { ascending: false })
  } else if (sortBy === "discussed") {
    query = query.order("reply_count", { ascending: false })
  } else {
    query = query.order("created_at", { ascending: false }) // Default: latest
  }

  // Pagination logic
  const itemsPerPage = 10
  const startIndex = (page - 1) * itemsPerPage
  query = query.range(startIndex, startIndex + itemsPerPage - 1)

  // 3. Eksekusi query threads
  const { data: threads, error: threadsError, count } = await query

  if (threadsError) {
    console.error("Error fetching threads:", threadsError)
    return { category, threads: [], count: 0 }
  }

  return { category, threads: threads || [], count: count || 0 }
}

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: { slug: string }
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const page = Number(searchParams.page) || 1
  const sortBy = String(searchParams.sort) || "latest"

  const { category, threads, count } = await getCategoryAndThreads(params.slug, page, sortBy)

  if (!category) {
    notFound()
  }

  const totalPages = Math.ceil(count / 10)
  const Icon = categoryMeta[category.slug as keyof typeof categoryMeta]?.icon || Code2

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />

      {/* Hero Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800/50">
        <div className="container mx-auto px-4 text-center">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-gradient-to-r from-white to-gray-100 dark:from-gray-800 dark:to-gray-700 mb-8 shadow-2xl">
              <Icon className={`w-12 h-12 text-${categoryMeta[category.slug as keyof typeof categoryMeta]?.color}-600`} />
            </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">{category.name}</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{category.description}</p>
        </div>
      </section>

      {/* Filter dan Konten */}
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Discussions</h2>
          <div className="flex items-center gap-4">
            <Link href={`/category/${params.slug}?sort=latest`}>
                <Button variant={sortBy === 'latest' ? 'default' : 'outline'}>Latest</Button>
            </Link>
            <Link href={`/category/${params.slug}?sort=popular`}>
                <Button variant={sortBy === 'popular' ? 'default' : 'outline'}>Popular</Button>
            </Link>
          </div>
        </div>

        {/* Gunakan komponen ThreadList yang sudah ada */}
        <ThreadList threads={threads} loading={false} />

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-8 space-x-2">
            <Link href={`/category/${params.slug}?page=${Math.max(1, page - 1)}&sort=${sortBy}`}>
              <Button variant="outline" disabled={page <= 1}>
                <ChevronLeft className="h-4 w-4" />
                Previous
              </Button>
            </Link>
            <span className="p-2 text-sm">
              Page {page} of {totalPages}
            </span>
            <Link href={`/category/${params.slug}?page=${Math.min(totalPages, page + 1)}&sort=${sortBy}`}>
              <Button variant="outline" disabled={page >= totalPages}>
                Next
                <ChevronRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        )}
      </main>
    </div>
  )
}
