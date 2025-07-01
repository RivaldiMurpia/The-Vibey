"use client"

import { useEffect, useState } from "react"
import { useParams, useSearchParams } from "next/navigation"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Search,
  Grid,
  List,
  Heart,
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
  Users,
} from "lucide-react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { useAuth } from "@/contexts/auth-context"

// Mock data for demonstration
const categoryData = {
  showcase: {
    title: "Showcase",
    description: "Pamerkan karya terbaikmu dengan bangga dan dapatkan apresiasi dari komunitas",
    icon: Palette,
    gradient: "from-pink-500 to-rose-500",
    bgGradient: "from-pink-50 to-rose-50 dark:from-pink-950/20 dark:to-rose-950/20",
    color: "pink",
  },
  designcrit: {
    title: "DesignCrit",
    description: "Kritik konstruktif untuk growth yang maksimal dari expert designer",
    icon: MessageCircle,
    gradient: "from-blue-500 to-cyan-500",
    bgGradient: "from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20",
    color: "blue",
  },
  techstack: {
    title: "TechStack",
    description: "Diskusi mendalam tentang teknologi terdepan dan best practices",
    icon: Code2,
    gradient: "from-green-500 to-emerald-500",
    bgGradient: "from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20",
    color: "green",
  },
  ngopi: {
    title: "Ngopi",
    description: "Obrolan santai sambil ngoding bareng dalam suasana yang friendly",
    icon: Coffee,
    gradient: "from-orange-500 to-amber-500",
    bgGradient: "from-orange-50 to-amber-50 dark:from-orange-950/20 dark:to-amber-950/20",
    color: "orange",
  },
}

// Mock posts data
const mockPosts = [
  {
    id: 1,
    title: "My Latest React Dashboard Design",
    excerpt:
      "Built a comprehensive admin dashboard using React, TypeScript, and Tailwind CSS. Looking for feedback on the UX flow and visual hierarchy.",
    author: {
      name: "Andi Pratama",
      username: "andipratama",
      avatar: "/placeholder.svg?height=40&width=40",
      verified: true,
    },
    category: "showcase",
    tags: ["React", "TypeScript", "Dashboard", "UI/UX"],
    stats: {
      views: 1240,
      likes: 89,
      comments: 23,
    },
    createdAt: "2024-01-15",
    featured: true,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 2,
    title: "Need Feedback on My Portfolio Website",
    excerpt:
      "Just finished my personal portfolio website. Would love to get some constructive criticism on the design and user experience.",
    author: {
      name: "Sarah Wijaya",
      username: "sarahw",
      avatar: "/placeholder.svg?height=40&width=40",
      verified: false,
    },
    category: "designcrit",
    tags: ["Portfolio", "Web Design", "CSS", "Animation"],
    stats: {
      views: 856,
      likes: 45,
      comments: 18,
    },
    createdAt: "2024-01-14",
    featured: false,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 3,
    title: "Next.js 14 vs Remix: Performance Comparison",
    excerpt:
      "Deep dive into the performance differences between Next.js 14 and Remix. Sharing my benchmarks and real-world testing results.",
    author: {
      name: "Budi Santoso",
      username: "budisan",
      avatar: "/placeholder.svg?height=40&width=40",
      verified: true,
    },
    category: "techstack",
    tags: ["Next.js", "Remix", "Performance", "Benchmarks"],
    stats: {
      views: 2100,
      likes: 156,
      comments: 42,
    },
    createdAt: "2024-01-13",
    featured: true,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 4,
    title: "Coffee Chat: Remote Work Tips for Developers",
    excerpt:
      "Let's discuss our favorite remote work setups, productivity tips, and how to maintain work-life balance as developers.",
    author: {
      name: "Maya Sari",
      username: "mayasari",
      avatar: "/placeholder.svg?height=40&width=40",
      verified: false,
    },
    category: "ngopi",
    tags: ["Remote Work", "Productivity", "Work-Life Balance"],
    stats: {
      views: 678,
      likes: 34,
      comments: 28,
    },
    createdAt: "2024-01-12",
    featured: false,
    image: "/placeholder.svg?height=200&width=300",
  },
]

export default function CategoryPage() {
  const params = useParams()
  const searchParams = useSearchParams()
  const { user } = useAuth()

  const [posts, setPosts] = useState(mockPosts)
  const [filteredPosts, setFilteredPosts] = useState(mockPosts)
  const [viewMode, setViewMode] = useState("grid")
  const [sortBy, setSortBy] = useState("latest")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTags, setSelectedTags] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(false)

  const postsPerPage = 12
  const slug = params.slug as string
  const category = categoryData[slug as keyof typeof categoryData]

  // Filter posts by category
  useEffect(() => {
    const categoryPosts = mockPosts.filter((post) => post.category === slug)
    setPosts(categoryPosts)
    setFilteredPosts(categoryPosts)
  }, [slug])

  // Apply filters and search
  useEffect(() => {
    let filtered = posts

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (post) =>
          post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())),
      )
    }

    // Tag filter
    if (selectedTags.length > 0) {
      filtered = filtered.filter((post) => selectedTags.some((tag) => post.tags.includes(tag)))
    }

    // Sort
    switch (sortBy) {
      case "popular":
        filtered.sort((a, b) => b.stats.likes - a.stats.likes)
        break
      case "discussed":
        filtered.sort((a, b) => b.stats.comments - a.stats.comments)
        break
      case "views":
        filtered.sort((a, b) => b.stats.views - a.stats.views)
        break
      default:
        filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    }

    setFilteredPosts(filtered)
    setCurrentPage(1)
  }, [posts, searchQuery, selectedTags, sortBy])

  // Get all unique tags
  const allTags = Array.from(new Set(posts.flatMap((post) => post.tags)))

  // Pagination
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage)
  const startIndex = (currentPage - 1) * postsPerPage
  const currentPosts = filteredPosts.slice(startIndex, startIndex + postsPerPage)

  if (!category) {
    return <div>Category not found</div>
  }

  const CategoryIcon = category.icon

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />

      {/* Category Hero Section */}
      <section className={`relative py-20 bg-gradient-to-br ${category.bgGradient} overflow-hidden`}>
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-0 w-full h-full">
            <motion.div
              animate={{
                backgroundPosition: ["0% 0%", "100% 100%"],
              }}
              transition={{
                duration: 20,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
                ease: "linear",
              }}
              className="w-full h-full"
              style={{
                backgroundImage: `radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.1) 0%, transparent 50%)`,
                backgroundSize: "100% 100%",
              }}
            />
          </div>
        </div>

        <div className="relative container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-gradient-to-r from-white to-gray-100 dark:from-gray-800 dark:to-gray-700 mb-8 shadow-2xl"
            >
              <CategoryIcon className={`w-12 h-12 text-${category.color}-600`} />
            </motion.div>

            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">{category.title}</h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">{category.description}</p>

            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <Badge variant="secondary" className="px-4 py-2">
                <Eye className="w-4 h-4 mr-2" />
                {filteredPosts.reduce((sum, post) => sum + post.stats.views, 0).toLocaleString()} views
              </Badge>
              <Badge variant="secondary" className="px-4 py-2">
                <MessageCircle className="w-4 h-4 mr-2" />
                {filteredPosts.length} discussions
              </Badge>
              <Badge variant="secondary" className="px-4 py-2">
                <Users className="w-4 h-4 mr-2" />
                {new Set(filteredPosts.map((post) => post.author.username)).size} contributors
              </Badge>
            </div>

            {user && (
              <Link href="/create">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    size="lg"
                    className={`bg-gradient-to-r ${category.gradient} text-white px-8 py-4 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300`}
                  >
                    <Plus className="w-5 h-5 mr-2" />
                    Start New Discussion
                  </Button>
                </motion.div>
              </Link>
            )}
          </motion.div>
        </div>
      </section>

      {/* Filters and Search */}
      <section className="py-8 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search discussions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Filters */}
            <div className="flex items-center gap-4">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="latest">Latest</SelectItem>
                  <SelectItem value="popular">Most Popular</SelectItem>
                  <SelectItem value="discussed">Most Discussed</SelectItem>
                  <SelectItem value="views">Most Viewed</SelectItem>
                </SelectContent>
              </Select>

              <div className="flex items-center gap-2">
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Tags Filter */}
          {allTags.length > 0 && (
            <div className="mt-6">
              <div className="flex flex-wrap gap-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300 mr-2">Filter by tags:</span>
                {allTags.slice(0, 10).map((tag) => (
                  <motion.button
                    key={tag}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      if (selectedTags.includes(tag)) {
                        setSelectedTags(selectedTags.filter((t) => t !== tag))
                      } else {
                        setSelectedTags([...selectedTags, tag])
                      }
                    }}
                    className={`px-3 py-1 rounded-full text-sm transition-all duration-200 ${
                      selectedTags.includes(tag)
                        ? `bg-gradient-to-r ${category.gradient} text-white`
                        : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                    }`}
                  >
                    {tag}
                  </motion.button>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Posts Grid/List */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <Card key={i} className="animate-pulse">
                  <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded-t-lg" />
                  <CardContent className="p-6">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2" />
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4" />
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : currentPosts.length === 0 ? (
            <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} className="text-center py-20">
              <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">No discussions found</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-8">
                Try adjusting your search or filters to find what you're looking for.
              </p>
              {user && (
                <Link href="/create">
                  <Button className={`bg-gradient-to-r ${category.gradient} text-white`}>
                    <Plus className="w-4 h-4 mr-2" />
                    Start the First Discussion
                  </Button>
                </Link>
              )}
            </motion.div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={`${viewMode}-${currentPage}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" : "space-y-6"}
              >
                {currentPosts.map((post, index) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                  >
                    <Link href={`/thread/${post.id}`}>
                      <Card className="h-full hover:shadow-xl transition-all duration-300 overflow-hidden group">
                        {viewMode === "grid" && (
                          <div className="relative h-48 overflow-hidden">
                            <img
                              src={post.image || "/placeholder.svg"}
                              alt={post.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            {post.featured && (
                              <Badge className="absolute top-3 left-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
                                <Star className="w-3 h-3 mr-1" />
                                Featured
                              </Badge>
                            )}
                          </div>
                        )}

                        <CardContent className={`p-6 ${viewMode === "list" ? "flex items-center gap-6" : ""}`}>
                          {viewMode === "list" && (
                            <div className="flex-shrink-0">
                              <img
                                src={post.image || "/placeholder.svg"}
                                alt={post.title}
                                className="w-24 h-24 object-cover rounded-lg"
                              />
                            </div>
                          )}

                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-3">
                              <Avatar className="w-8 h-8">
                                <AvatarImage src={post.author.avatar || "/placeholder.svg"} />
                                <AvatarFallback>{post.author.name[0]}</AvatarFallback>
                              </Avatar>
                              <div className="flex-1">
                                <div className="flex items-center gap-2">
                                  <span className="font-medium text-sm text-gray-900 dark:text-white">
                                    {post.author.name}
                                  </span>
                                  {post.author.verified && (
                                    <Badge variant="secondary" className="text-xs">
                                      Verified
                                    </Badge>
                                  )}
                                </div>
                                <div className="flex items-center gap-2 text-xs text-gray-500">
                                  <Calendar className="w-3 h-3" />
                                  {new Date(post.createdAt).toLocaleDateString()}
                                </div>
                              </div>
                            </div>

                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-lime-600 transition-colors">
                              {post.title}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">{post.excerpt}</p>

                            <div className="flex flex-wrap gap-2 mb-4">
                              {post.tags.slice(0, 3).map((tag) => (
                                <Badge key={tag} variant="outline" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>

                            <div className="flex items-center justify-between text-sm text-gray-500">
                              <div className="flex items-center gap-4">
                                <div className="flex items-center gap-1">
                                  <Eye className="w-4 h-4" />
                                  {post.stats.views.toLocaleString()}
                                </div>
                                <div className="flex items-center gap-1">
                                  <Heart className="w-4 h-4" />
                                  {post.stats.likes}
                                </div>
                                <div className="flex items-center gap-1">
                                  <MessageCircle className="w-4 h-4" />
                                  {post.stats.comments}
                                </div>
                              </div>
                              {post.featured && viewMode === "list" && (
                                <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
                                  <Star className="w-3 h-3 mr-1" />
                                  Featured
                                </Badge>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex items-center justify-center gap-2 mt-12"
            >
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>

              {[...Array(Math.min(5, totalPages))].map((_, i) => {
                const pageNum = Math.max(1, Math.min(totalPages - 4, currentPage - 2)) + i
                return (
                  <Button
                    key={pageNum}
                    variant={currentPage === pageNum ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentPage(pageNum)}
                    className={currentPage === pageNum ? `bg-gradient-to-r ${category.gradient} text-white` : ""}
                  >
                    {pageNum}
                  </Button>
                )
              })}

              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  )
}
