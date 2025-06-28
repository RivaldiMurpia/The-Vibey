"use client"

import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { VoteButtons } from "@/components/vote-buttons"
import { MessageCircle, Clock } from "lucide-react"
import { motion } from "framer-motion"

interface Thread {
  id: string
  title: string
  content: string
  category: string
  author_id: string
  created_at: string
  profiles?: {
    username: string
    avatar_url?: string
  }
  categories?: {
    name: string
    slug: string
    color: string
  }
}

interface ThreadListProps {
  threads: Thread[]
}

export function ThreadList({ threads }: ThreadListProps) {
  if (!threads || threads.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-gray-900 mb-2">No threads yet</h3>
        <p className="text-gray-600 mb-6">Be the first to start a discussion!</p>
        <Link
          href="/create"
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Create Thread
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Latest Discussions</h2>
      {threads.map((thread, index) => (
        <motion.div
          key={thread.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex space-x-4">
                <VoteButtons threadId={thread.id} initialVotes={0} />

                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-2">
                    <Badge variant="secondary" className="bg-blue-100 text-blue-600">
                      #{thread.category}
                    </Badge>
                    <span className="text-sm text-gray-500">•</span>
                    <div className="flex items-center space-x-2">
                      <Avatar className="h-5 w-5">
                        <AvatarImage src={thread.profiles?.avatar_url || "/placeholder.svg"} />
                        <AvatarFallback className="text-xs">
                          {thread.profiles?.username?.[0]?.toUpperCase() || "A"}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm text-gray-600">{thread.profiles?.username || "Anonymous"}</span>
                    </div>
                    <span className="text-sm text-gray-500">•</span>
                    <div className="flex items-center space-x-1 text-sm text-gray-500">
                      <Clock className="h-3 w-3" />
                      <span>{new Date(thread.created_at).toLocaleDateString()}</span>
                    </div>
                  </div>

                  <Link href={`/thread/${thread.id}`} className="block group">
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors mb-2">
                      {thread.title}
                    </h3>
                    <p className="text-gray-600 line-clamp-2 mb-3">{thread.content.substring(0, 200)}...</p>
                  </Link>

                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <MessageCircle className="h-4 w-4" />
                      <span>0 replies</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}
