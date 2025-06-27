"use client"

import { formatDistanceToNow } from "date-fns"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { VoteButtons } from "@/components/vote-buttons"
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
    full_name: string | null
  }
  categories: {
    name: string
    slug: string
    color: string
  }
}

interface ThreadViewProps {
  thread: Thread
}

export function ThreadView({ thread }: ThreadViewProps) {
  const formatContent = (content: string) => {
    // Simple markdown to HTML conversion
    return content
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.*?)\*/g, "<em>$1</em>")
      .replace(/`(.*?)`/g, '<code class="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono">$1</code>')
      .replace(
        /```(\w+)?\n([\s\S]*?)```/g,
        '<pre class="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto my-4"><code>$2</code></pre>',
      )
      .replace(
        /\[([^\]]+)\]$$([^)]+)$$/g,
        '<a href="$2" class="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">$1</a>',
      )
      .replace(/\n/g, "<br>")
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      <Card>
        <CardContent className="p-6">
          <div className="flex space-x-4">
            <VoteButtons
              threadId={thread.id}
              initialUpvotes={thread.upvotes}
              initialDownvotes={thread.downvotes}
              className="flex-shrink-0"
            />

            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2 mb-3">
                <Badge
                  variant="secondary"
                  className="text-sm"
                  style={{ backgroundColor: `${thread.categories.color}20`, color: thread.categories.color }}
                >
                  #{thread.categories.name}
                </Badge>
                <span className="text-gray-400">•</span>
                <div className="flex items-center space-x-2">
                  <Avatar className="h-6 w-6">
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

              <h1 className="text-2xl font-bold text-gray-900 mb-4">{thread.title}</h1>

              <div
                className="prose prose-sm max-w-none text-gray-700"
                dangerouslySetInnerHTML={{ __html: formatContent(thread.content) }}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
