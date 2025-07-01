"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Search,
  Filter,
  Calendar,
  Eye,
  Heart,
  MessageCircle,
  BookOpen,
  Users,
  TrendingUp,
  Clock,
  Tag,
} from "lucide-react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"

// Mock search results data
const searchResults = {
  posts: [
    {
      id: 1,
      type: "post",
      title: "My Latest React Dashboard Design",
      excerpt: "Built a comprehensive admin dashboard using React, TypeScript, and Tailwind CSS...",
      author: {
        name: "Andi Pratama",
        username: "andipratama",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      category: "showcase",
      tags: ["React", "TypeScript", "Dashboard"],
      stats: { views: 1240, likes: 89, comments: 23 },
      createdAt: "2024-01-15",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 2,
      type: "post",
      title: "Need Feedback on My Portfolio Website",
      excerpt: "Just finished my personal portfolio website. Would love to get some constructive criticism...",
      author: {
        name: "Sarah Wijaya",
        username: "sarahw",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      category: "designcrit",
      tags: ["Portfolio", "Web Design", "CSS"],
      stats: { views: 856, likes: 45, comments: 18 },
      createdAt: "2024-01-14",
      image: "/placeholder.svg?height=200&width=300",
    },
  ],
  articles: [
    {
      id: 1,
      type: "article",
      title: "The Future of Web Development: Trends to Watch in 2024",
      excerpt: "Explore the latest trends shaping the web development landscape...",
      author: {
        name: "Andi Pratama",
        username: "andipratama",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      category: "Technology",
      tags: ["Web Development", "AI", "Trends"],
      stats: { views: 2340, likes: 156, comments: 23 },
      publishedAt: "2024-01-15",
      readTime: 8,
      image: "/placeholder.svg?height=200&width=300",
    },
  ],
  users: [
    {
      id: 1,
      type: "user",
      name: "Andi Pratama",
      username: "andipratama",
      bio: "Senior Full-Stack Developer passionate about React and TypeScript",
      avatar: "/placeholder.svg?height=60&width=60",
      stats: { posts: 24, followers: 156, following: 89 },
      verified: true,
      skills: ["React", "TypeScript", "Node.js"],
    },
    {
      id: 2,
      type: "user",
      name: "Sarah Wijaya",
      username: "sarahw",
      bio: "UI/UX Designer & Frontend Developer",
      avatar: "/placeholder.svg?height=60&width=60",
      stats: { posts: 18, followers: 98, following: 67 },
      verified: false,
      skills: ["UI/UX", "Figma", "React"],
    },
  ],
}

export default function SearchPage() {
  const searchParams = useSearchParams()
  const initialQuery = searchParams.get("q") || ""

  const [searchQuery, setSearchQuery] = useState(initialQuery)
  const [activeTab, setActiveTab] = useState("all")
  const [sortBy, setSortBy] = useState("relevance")
  const [filterBy, setFilterBy] = useState("all")
  const [results, setResults] = useState(searchResults)
  const [loading, setLoading] = useState(false)

  // Simulate search
  useEffect(() => {
    if (searchQuery) {
      setLoading(true)
      // Simulate API call
      setTimeout(() => {
        setLoading(false)
      }, 1000)
    }
  }, [searchQuery, sortBy, filterBy])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Trigger search
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }

  const totalResults = results.posts.length + results.articles.length + results.users.length

  const ResultCard = ({ item, type }: { item: any; type: string }) => {
    if (type === "user") {
      return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} whileHover={{ y: -5 }}>
          <Link href={`/profile/${item.username}`}>
            <Card className="p-6 hover:shadow-lg transition-all duration-300">
              <div className="flex items-center gap-4">
                <Avatar className="w-16 h-16">
                  <AvatarImage src={item.avatar || "/placeholder.svg"} />
                  <AvatarFallback>{item.name[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">{item.name}</h3>
                    {item.verified && (
                      <Badge variant="secondary" className="text-xs">
                        Verified
                      </Badge>
                    )}
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">@{item.username}</p>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">{item.bio}</p>

                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                    <span>{item.stats.posts} posts</span>
                    <span>{item.stats.followers} followers</span>
                    <span>{item.stats.following} following</span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {item.skills.slice(0, 3).map((skill: string) => (
                      <Badge key={skill} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </Link>
        </motion.div>
      )
    }

    const isArticle = type === "article"
    const linkHref = isArticle ? `/blog/${item.id}` : `/thread/${item.id}`

    return (
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} whileHover={{ y: -5 }}>
        <Link href={linkHref}>
          <Card className="hover:shadow-lg transition-all duration-300 overflow-hidden">
            <div className="flex">
              <div className="flex-shrink-0 w-32 h-32">
                <img src={item.image || "/placeholder.svg"} alt={item.title} className="w-full h-full object-cover" />
              </div>
              <CardContent className="flex-1 p-6">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="outline" className="text-xs">
                    {isArticle ? item.category : item.category}
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    {isArticle ? "Article" : "Discussion"}
                  </Badge>
                </div>

                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 hover:text-lime-600 transition-colors line-clamp-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">{item.excerpt}</p>

                <div className="flex items-center gap-3 mb-4">
                  <Avatar className="w-6 h-6">
                    <AvatarImage src={item.author.avatar || "/placeholder.svg"} />
                    <AvatarFallback>{item.author.name[0]}</AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">{item.author.name}</span>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <Calendar className="w-3 h-3" />
                    {new Date(item.createdAt || item.publishedAt).toLocaleDateString()}
                  </div>
                  {isArticle && (
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <Clock className="w-3 h-3" />
                      {item.readTime} min read
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      {item.stats.views.toLocaleString()}
                    </div>
                    <div className="flex items-center gap-1">
                      <Heart className="w-4 h-4" />
                      {item.stats.likes}
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageCircle className="w-4 h-4" />
                      {item.stats.comments}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {item.tags.slice(0, 2).map((tag: string) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </div>
          </Card>
        </Link>
      </motion.div>
    )
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header />

      {/* Search Header */}
      <section className="py-12 bg-gray-50 dark:bg-gray-800/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 text-center">
              Search Results
            </h1>

            {/* Search Form */}
            <form onSubmit={handleSearch} className="relative mb-8">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
              <Input
                type="text"
                placeholder="Search for posts, articles, users..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-4 text-lg w-full"
              />
              <Button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-lime-600 to-green-600 text-white"
              >
                Search
              </Button>
            </form>

            {/* Search Stats */}
            {searchQuery && (
              <div className="text-center text-gray-600 dark:text-gray-300">
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-lime-600 border-t-transparent rounded-full animate-spin" />
                    Searching...
                  </div>
                ) : (
                  <p>
                    Found <span className="font-semibold text-gray-900 dark:text-white">{totalResults}</span> results
                    for "<span className="font-semibold text-lime-600">{searchQuery}</span>"
                  </p>
                )}
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Search Results */}
      {searchQuery && !loading && (
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              {/* Filters */}
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="relevance">Relevance</SelectItem>
                      <SelectItem value="latest">Latest</SelectItem>
                      <SelectItem value="popular">Most Popular</SelectItem>
                      <SelectItem value="discussed">Most Discussed</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={filterBy} onValueChange={setFilterBy}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Filter by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Time</SelectItem>
                      <SelectItem value="week">This Week</SelectItem>
                      <SelectItem value="month">This Month</SelectItem>
                      <SelectItem value="year">This Year</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                  <Filter className="w-4 h-4" />
                  {totalResults} results
                </div>
              </div>

              {/* Results Tabs */}
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-4 mb-8">
                  <TabsTrigger value="all" className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4" />
                    All ({totalResults})
                  </TabsTrigger>
                  <TabsTrigger value="posts" className="flex items-center gap-2">
                    <MessageCircle className="w-4 h-4" />
                    Posts ({results.posts.length})
                  </TabsTrigger>
                  <TabsTrigger value="articles" className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4" />
                    Articles ({results.articles.length})
                  </TabsTrigger>
                  <TabsTrigger value="users" className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    Users ({results.users.length})
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="all" className="space-y-6">
                  <AnimatePresence>
                    {results.posts.map((post) => (
                      <ResultCard key={`post-${post.id}`} item={post} type="post" />
                    ))}
                    {results.articles.map((article) => (
                      <ResultCard key={`article-${article.id}`} item={article} type="article" />
                    ))}
                    {results.users.map((user) => (
                      <ResultCard key={`user-${user.id}`} item={user} type="user" />
                    ))}
                  </AnimatePresence>
                </TabsContent>

                <TabsContent value="posts" className="space-y-6">
                  <AnimatePresence>
                    {results.posts.map((post) => (
                      <ResultCard key={`post-${post.id}`} item={post} type="post" />
                    ))}
                  </AnimatePresence>
                </TabsContent>

                <TabsContent value="articles" className="space-y-6">
                  <AnimatePresence>
                    {results.articles.map((article) => (
                      <ResultCard key={`article-${article.id}`} item={article} type="article" />
                    ))}
                  </AnimatePresence>
                </TabsContent>

                <TabsContent value="users" className="space-y-6">
                  <AnimatePresence>
                    {results.users.map((user) => (
                      <ResultCard key={`user-${user.id}`} item={user} type="user" />
                    ))}
                  </AnimatePresence>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </section>
      )}

      {/* No Results */}
      {searchQuery && !loading && totalResults === 0 && (
        <section className="py-20">
          <div className="container mx-auto px-4 text-center">
            <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} className="max-w-md mx-auto">
              <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">No results found</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-8">
                We couldn't find anything matching "{searchQuery}". Try different keywords or browse our categories.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button onClick={() => setSearchQuery("")} variant="outline">
                  Clear Search
                </Button>
                <Link href="/">
                  <Button className="bg-gradient-to-r from-lime-600 to-green-600 text-white">Browse Categories</Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Empty State */}
      {!searchQuery && (
        <section className="py-20">
          <div className="container mx-auto px-4 text-center">
            <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} className="max-w-md mx-auto">
              <div className="w-24 h-24 bg-gradient-to-r from-lime-100 to-green-100 dark:from-lime-900/20 dark:to-green-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-12 h-12 text-lime-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Start Your Search</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-8">
                Search for posts, articles, users, or any topic you're interested in. Our community has tons of valuable
                content waiting to be discovered.
              </p>

              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900 dark:text-white">Popular searches:</h4>
                <div className="flex flex-wrap gap-2 justify-center">
                  {["React", "TypeScript", "Next.js", "UI/UX", "Career", "Portfolio"].map((term) => (
                    <motion.button
                      key={term}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSearchQuery(term)}
                      className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full hover:bg-lime-100 hover:text-lime-700 dark:hover:bg-lime-900/20 dark:hover:text-lime-400 transition-all duration-200"
                    >
                      <Tag className="w-3 h-3 mr-1 inline" />
                      {term}
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}
    </div>
  )
}
