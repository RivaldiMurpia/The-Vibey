"use client"

import Link from "next/link"
import { formatDistanceToNow } from "date-fns"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { VoteButtons } from "@/components/vote-buttons"
import { MessageCircle } from "lucide-react"
import { motion } from "framer-motion"

interface Thread {
  id: string
  title: string
  content: string
  upvotes: number
  downvotes: number
  reply_count: number
  created_at: string
  profiles: {
    username: string
    avatar_url: string | null
  }
  categories: {
    name: string
    slug: string
    color: string
  }
}

interface ThreadListProps {
  threads: Thread[]
}

export function ThreadList({ threads }: ThreadListProps) {
  if (threads.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No threads yet. Be the first to create one!</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {threads.map((thread, index) => (
        <motion.div
          key={thread.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          className="bg-white rounded-lg border border-gray-200 hover:border-gray-300 transition-colors"
        >
          <div className="p-6">
            <div className="flex space-x-4">
              <VoteButtons
                threadId={thread.id}
                initialUpvotes={thread.upvotes}
                initialDownvotes={thread.downvotes}
                className="flex-shrink-0"
              />

              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-2">
                  <Badge
                    variant="secondary"
                    className="text-xs"
                    style={{ backgroundColor: `${thread.categories.color}20`, color: thread.categories.color }}
                  >
                    #{thread.categories.name}
                  </Badge>
                  <span className="text-gray-400">•</span>
                  <div className="flex items-center space-x-2">
                    <Avatar className="h-5 w-5">
                      <AvatarImage src={thread.profiles.avatar_url || ""} />
                      <AvatarFallback className="text-xs">
                        {thread.profiles.username.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-gray-600">u/{thread.profiles.username}</span>
                  </div>
                  <span className="text-gray-400">•</span>
                  <span className="text-sm text-gray-500">
                    {formatDistanceToNow(new Date(thread.created_at), { addSuffix: true })}
                  </span>
                </div>

                <Link href={`/thread/${thread.id}`} className="group">
                  <h2 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors mb-2">
                    {thread.title}
                  </h2>
                </Link>

                <p className="text-gray-600 text-sm line-clamp-2 mb-3">{thread.content.substring(0, 200)}...</p>

                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <Link
                    href={`/thread/${thread.id}`}
                    className="flex items-center space-x-1 hover:text-blue-600 transition-colors"
                  >
                    <MessageCircle className="h-4 w-4" />
                    <span>{thread.reply_count} replies</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
