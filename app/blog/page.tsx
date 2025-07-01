"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Search,
  Calendar,
  Clock,
  Eye,
  Heart,
  MessageCircle,
  BookOpen,
  TrendingUp,
  ChevronLeft,
  ChevronRight,
  Tag,
  User,
  ArrowRight,
} from "lucide-react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"

// Mock blog data
const blogPosts = [
  {
    id: 1,
    title: "The Future of Web Development: Trends to Watch in 2024",
    excerpt:
      "Explore the latest trends shaping the web development landscape, from AI integration to new frameworks and tools that are revolutionizing how we build applications.",
    content: "Full article content here...",
    author: {
      name: "Andi Pratama",
      username: "andipratama",
      avatar: "/placeholder.svg?height=40&width=40",
      bio: "Senior Full-Stack Developer",
    },
    category: "Technology",
    tags: ["Web Development", "AI", "Trends", "2024"],
    publishedAt: "2024-01-15",
    readTime: 8,
    stats: {
      views: 2340,
      likes: 156,
      comments: 23,
    },
    featured: true,
    image: "/placeholder.svg?height=300&width=500",
  },
  {
    id: 2,
    title: "Building Scalable React Applications: Best Practices Guide",
    excerpt:
      "Learn how to structure and build React applications that can scale from small projects to enterprise-level solutions with proper architecture and patterns.",
    content: "Full article content here...",
    author: {
      name: "Sarah Wijaya",
      username: "sarahw",
      avatar: "/placeholder.svg?height=40&width=40",
      bio: "React Specialist & UI/UX Designer",
    },
    category: "Tutorial",
    tags: ["React", "JavaScript", "Architecture", "Best Practices"],
    publishedAt: "2024-01-12",
    readTime: 12,
    stats: {
      views: 1890,
      likes: 134,
      comments: 18,
    },
    featured: false,
    image: "/placeholder.svg?height=300&width=500",
  },
  {
    id: 3,
    title: "The Art of Code Review: Building Better Software Together",
    excerpt:
      "Discover effective code review strategies that improve code quality, foster team collaboration, and accelerate learning within development teams.",
    content: "Full article content here...",
    author: {
      name: "Budi Santoso",
      username: "budisan",
      avatar: "/placeholder.svg?height=40&width=40",
      bio: "Tech Lead & Mentor",
    },
    category: "Best Practices",
    tags: ["Code Review", "Team Work", "Quality", "Collaboration"],
    publishedAt: "2024-01-10",
    readTime: 6,
    stats: {
      views: 1456,
      likes: 89,
      comments: 15,
    },
    featured: true,
    image: "/placeholder.svg?height=300&width=500",
  },
  {
    id: 4,
    title: "From Junior to Senior: A Developer's Growth Journey",
    excerpt:
      "Personal insights and practical advice on navigating the path from junior to senior developer, including skills to develop and mindset shifts to embrace.",
    content: "Full article content here...",
    author: {
      name: "Maya Sari",
      username: "mayasari",
      avatar: "/placeholder.svg?height=40&width=40",
      bio: "Senior Developer & Career Coach",
    },
    category: "Career",
    tags: ["Career Growth", "Skills", "Leadership", "Mentorship"],
    publishedAt: "2024-01-08",
    readTime: 10,
    stats: {
      views: 3210,
      likes: 245,
      comments: 42,
    },
    featured: false,
    image: "/placeholder.svg?height=300&width=500",
  },
  {
    id: 5,
    title: "Mastering TypeScript: Advanced Patterns and Techniques",
    excerpt:
      "Deep dive into advanced TypeScript patterns, utility types, and techniques that will elevate your type-safe development to the next level.",
    content: "Full article content here...",
    author: {
      name: "Andi Pratama",
      username: "andipratama",
      avatar: "/placeholder.svg?height=40&width=40",
      bio: "Senior Full-Stack Developer",
    },
    category: "Tutorial",
    tags: ["TypeScript", "Advanced", "Patterns", "Type Safety"],
    publishedAt: "2024-01-05",
    readTime: 15,
    stats: {
      views: 1678,
      likes: 112,
      comments: 28,
    },
    featured: false,
    image: "/placeholder.svg?height=300&width=500",
  },
]

const categories = ["All", "Technology", "Tutorial", "Best Practices", "Career", "Design"]
const popularTags = ["React", "TypeScript", "JavaScript", "Web Development", "Career Growth", "AI", "Best Practices"]

export default function BlogPage() {
  const [posts, setPosts] = useState(blogPosts)
  const [filteredPosts, setFilteredPosts] = useState(blogPosts)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedTag, setSelectedTag] = useState("")
  const [sortBy, setSortBy] = useState("latest")
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(false)

  const postsPerPage = 6

  // Apply filters and search
  useEffect(() => {
    let filtered = posts

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (post) =>
          post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
          post.author.name.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    // Category filter
    if (selectedCategory !== "All") {
      filtered = filtered.filter((post) => post.category === selectedCategory)
    }

    // Tag filter
    if (selectedTag) {
      filtered = filtered.filter((post) => post.tags.includes(selectedTag))
    }

    // Sort
    switch (sortBy) {
      case "popular":
        filtered.sort((a, b) => b.stats.views - a.stats.views)
        break
      case "liked":
        filtered.sort((a, b) => b.stats.likes - a.stats.likes)
        break
      case "discussed":
        filtered.sort((a, b) => b.stats.comments - a.stats.comments)
        break
      default:
        filtered.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    }

    setFilteredPosts(filtered)
    setCurrentPage(1)
  }, [posts, searchQuery, selectedCategory, selectedTag, sortBy])

  // Pagination
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage)
  const startIndex = (currentPage - 1) * postsPerPage
  const currentPosts = filteredPosts.slice(startIndex, startIndex + postsPerPage)
  const featuredPosts = filteredPosts.filter((post) => post.featured).slice(0, 3)

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header />

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-lime-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-lime-950/20" />

        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23000000' fillOpacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>

        <div className="relative container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.h1
              className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6"
              style={{
                background: "linear-gradient(45deg, #1f2937, #065f46, #84cc16, #1f2937)",
                backgroundSize: "300% 300%",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 4,
                repeat: Number.POSITIVE_INFINITY,
              }}
            >
              The Vibey Blog
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed"
            >
              Insights, tutorials, dan stories dari komunitas developer Indonesia terbaik. Temukan knowledge yang akan
              elevate your coding journey.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex flex-wrap justify-center gap-4"
            >
              <Badge variant="secondary" className="px-4 py-2 text-sm">
                <BookOpen className="w-4 h-4 mr-2" />
                {blogPosts.length} Articles
              </Badge>
              <Badge variant="secondary" className="px-4 py-2 text-sm">
                <User className="w-4 h-4 mr-2" />
                {new Set(blogPosts.map((post) => post.author.username)).size} Authors
              </Badge>
              <Badge variant="secondary" className="px-4 py-2 text-sm">
                <TrendingUp className="w-4 h-4 mr-2" />
                Weekly Updates
              </Badge>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <section className="py-16 bg-gray-50 dark:bg-gray-800/50">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Featured Articles</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Hand-picked articles yang wajib dibaca oleh setiap developer
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10 }}
                >
                  <Link href={`/blog/${post.id}`}>
                    <Card className="h-full hover:shadow-xl transition-all duration-300 overflow-hidden group">
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={post.image || "/placeholder.svg"}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <Badge className="absolute top-3 left-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
                          Featured
                        </Badge>
                        <div className="absolute top-3 right-3">
                          <Badge variant="secondary" className="bg-white/90 text-gray-700">
                            {post.category}
                          </Badge>
                        </div>
                      </div>

                      <CardContent className="p-6">
                        <div className="flex items-center gap-3 mb-4">
                          <Avatar className="w-8 h-8">
                            <AvatarImage src={post.author.avatar || "/placeholder.svg"} />
                            <AvatarFallback>{post.author.name[0]}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="font-medium text-sm text-gray-900 dark:text-white">{post.author.name}</div>
                            <div className="flex items-center gap-2 text-xs text-gray-500">
                              <Calendar className="w-3 h-3" />
                              {new Date(post.publishedAt).toLocaleDateString()}
                              <Clock className="w-3 h-3 ml-2" />
                              {post.readTime} min read
                            </div>
                          </div>
                        </div>

                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 group-hover:text-lime-600 transition-colors line-clamp-2">
                          {post.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">{post.excerpt}</p>

                        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
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
                        </div>

                        <div className="flex flex-wrap gap-2">
                          {post.tags.slice(0, 2).map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Filters and Search */}
      <section className="py-8 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between mb-6">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Filters */}
            <div className="flex items-center gap-4">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="latest">Latest</SelectItem>
                  <SelectItem value="popular">Most Popular</SelectItem>
                  <SelectItem value="liked">Most Liked</SelectItem>
                  <SelectItem value="discussed">Most Discussed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Popular Tags */}
          <div className="flex flex-wrap gap-2">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300 mr-2">Popular tags:</span>
            {popularTags.map((tag) => (
              <motion.button
                key={tag}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedTag(selectedTag === tag ? "" : tag)}
                className={`px-3 py-1 rounded-full text-sm transition-all duration-200 ${
                  selectedTag === tag
                    ? "bg-gradient-to-r from-lime-600 to-green-600 text-white"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                }`}
              >
                <Tag className="w-3 h-3 mr-1 inline" />
                {tag}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16">
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
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">No articles found</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-8">
                Try adjusting your search or filters to find what you're looking for.
              </p>
              <Button
                onClick={() => {
                  setSearchQuery("")
                  setSelectedCategory("All")
                  setSelectedTag("")
                }}
                className="bg-gradient-to-r from-lime-600 to-green-600 text-white"
              >
                Clear Filters
              </Button>
            </motion.div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={currentPage}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {currentPosts.map((post, index) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                  >
                    <Link href={`/blog/${post.id}`}>
                      <Card className="h-full hover:shadow-xl transition-all duration-300 overflow-hidden group">
                        <div className="relative h-48 overflow-hidden">
                          <img
                            src={post.image || "/placeholder.svg"}
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute top-3 right-3">
                            <Badge variant="secondary" className="bg-white/90 text-gray-700">
                              {post.category}
                            </Badge>
                          </div>
                        </div>

                        <CardContent className="p-6">
                          <div className="flex items-center gap-3 mb-4">
                            <Avatar className="w-8 h-8">
                              <AvatarImage src={post.author.avatar || "/placeholder.svg"} />
                              <AvatarFallback>{post.author.name[0]}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="font-medium text-sm text-gray-900 dark:text-white">
                                {post.author.name}
                              </div>
                              <div className="flex items-center gap-2 text-xs text-gray-500">
                                <Calendar className="w-3 h-3" />
                                {new Date(post.publishedAt).toLocaleDateString()}
                                <Clock className="w-3 h-3 ml-2" />
                                {post.readTime} min read
                              </div>
                            </div>
                          </div>

                          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 group-hover:text-lime-600 transition-colors line-clamp-2">
                            {post.title}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">{post.excerpt}</p>

                          <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
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
                          </div>

                          <div className="flex flex-wrap gap-2 mb-4">
                            {post.tags.slice(0, 3).map((tag) => (
                              <Badge key={tag} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>

                          <div className="flex items-center text-lime-600 group-hover:text-lime-700 font-medium text-sm">
                            Read More
                            <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
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
                    className={currentPage === pageNum ? "bg-gradient-to-r from-lime-600 to-green-600 text-white" : ""}
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
