"use client"
import Link from "next/link"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { MessageSquare, Clock } from "lucide-react"
import { VoteButtons } from "./vote-buttons"
import { formatDistanceToNow } from "date-fns"

interface Thread {
  id: string
  title: string
  content: string
  author_id: string
  category_id: string
  upvotes: number
  downvotes: number
  reply_count: number
  created_at: string
  updated_at: string
  profiles?: {
    username: string
    avatar_url: string | null
    full_name: string | null
  }
  categories?: {
    name: string
    color: string
    slug: string
  }
}

interface ThreadListProps {
  threads: Thread[]
  loading?: boolean
}

export function ThreadList({ threads, loading = false }: ThreadListProps) {
  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader className="pb-3">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (threads.length === 0) {
    return (
      <Card className="text-center py-12">
        <CardContent>
          <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No discussions yet</h3>
          <p className="text-gray-600 mb-4">Be the first to start a conversation in this community!</p>
          <Link href="/create">
            <Button className="bg-lime-600 hover:bg-lime-700">Start a Discussion</Button>
          </Link>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {threads.map((thread) => (
        <Card key={thread.id} className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-3">
            <div className="flex items-start gap-3">
              {/* Author Avatar */}
              <Avatar className="w-10 h-10">
                <AvatarImage src={thread.profiles?.avatar_url || undefined} />
                <AvatarFallback className="bg-lime-100 text-lime-700">
                  {thread.profiles?.username?.[0]?.toUpperCase() ||
                    thread.profiles?.full_name?.[0]?.toUpperCase() ||
                    "U"}
                </AvatarFallback>
              </Avatar>

              {/* Thread Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-medium text-gray-900">
                    {thread.profiles?.full_name || thread.profiles?.username || "Anonymous"}
                  </span>
                  <span className="text-sm text-gray-500">•</span>
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <Clock className="w-3 h-3" />
                    {formatDistanceToNow(new Date(thread.created_at), { addSuffix: true })}
                  </div>
                </div>

                {/* Category Badge */}
                {thread.categories && (
                  <Link href={`/category/${thread.categories.slug}`}>
                    <Badge
                      variant="secondary"
                      className="text-xs mb-2 hover:bg-gray-200 transition-colors"
                      style={{
                        backgroundColor: `${thread.categories.color}20`,
                        color: thread.categories.color,
                        borderColor: `${thread.categories.color}40`,
                      }}
                    >
                      #{thread.categories.name}
                    </Badge>
                  </Link>
                )}

                {/* Thread Title */}
                <Link href={`/thread/${thread.id}`}>
                  <h3 className="text-lg font-semibold text-gray-900 hover:text-lime-600 transition-colors line-clamp-2">
                    {thread.title}
                  </h3>
                </Link>
              </div>
            </div>
          </CardHeader>

          <CardContent className="pt-0">
            {/* Thread Content Preview */}
            <Link href={`/thread/${thread.id}`}>
              <div className="text-gray-600 text-sm line-clamp-3 mb-4 hover:text-gray-800 transition-colors">
                {thread.content.replace(/<[^>]*>/g, "").substring(0, 200)}
                {thread.content.length > 200 && "..."}
              </div>
            </Link>

            {/* Thread Actions */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                {/* Vote Buttons */}
                <VoteButtons
                  threadId={thread.id}
                  initialUpvotes={thread.upvotes}
                  initialDownvotes={thread.downvotes}
                  size="sm"
                />

                {/* Reply Count */}
                <Link href={`/thread/${thread.id}`}>
                  <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-700">
                    <MessageSquare className="w-4 h-4 mr-1" />
                    {thread.reply_count} {thread.reply_count === 1 ? "reply" : "replies"}
                  </Button>
                </Link>
              </div>

              {/* Read More */}
              <Link href={`/thread/${thread.id}`}>
                <Button variant="ghost" size="sm" className="text-lime-600 hover:text-lime-700">
                  Read more
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
