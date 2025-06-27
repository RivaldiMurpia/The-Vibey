"use client"

import { useState } from "react"
import { formatDistanceToNow } from "date-fns"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { VoteButtons } from "@/components/vote-buttons"
import { ReplyForm } from "@/components/reply-form"
import { MessageCircle } from "lucide-react"
import { motion } from "framer-motion"

interface Reply {
  id: string
  content: string
  upvotes: number
  downvotes: number
  created_at: string
  profiles: {
    username: string
    avatar_url: string | null
    full_name: string | null
  }
}

interface ReplyListProps {
  replies: Reply[]
  threadId: string
}

export function ReplyList({ replies, threadId }: ReplyListProps) {
  const [replyingTo, setReplyingTo] = useState<string | null>(null)

  const formatContent = (content: string) => {
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

  if (replies.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No replies yet. Be the first to comment!</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-900">
        {replies.length} {replies.length === 1 ? "Reply" : "Replies"}
      </h2>

      {replies.map((reply, index) => (
        <motion.div
          key={reply.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <Card>
            <CardContent className="p-6">
              <div className="flex space-x-4">
                <VoteButtons
                  replyId={reply.id}
                  initialUpvotes={reply.upvotes}
                  initialDownvotes={reply.downvotes}
                  className="flex-shrink-0"
                />

                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-3">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={reply.profiles.avatar_url || ""} />
                      <AvatarFallback className="text-xs">
                        {reply.profiles.username.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium text-gray-900">u/{reply.profiles.username}</span>
                    <span className="text-gray-400">•</span>
                    <span className="text-sm text-gray-500">
                      {formatDistanceToNow(new Date(reply.created_at), { addSuffix: true })}
                    </span>
                  </div>

                  <div
                    className="prose prose-sm max-w-none text-gray-700 mb-3"
                    dangerouslySetInnerHTML={{ __html: formatContent(reply.content) }}
                  />

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setReplyingTo(replyingTo === reply.id ? null : reply.id)}
                    className="text-gray-500 hover:text-blue-600"
                  >
                    <MessageCircle className="h-4 w-4 mr-1" />
                    Reply
                  </Button>

                  {replyingTo === reply.id && (
                    <div className="mt-4">
                      <ReplyForm
                        threadId={threadId}
                        parentId={reply.id}
                        onReplyAdded={() => setReplyingTo(null)}
                        onCancel={() => setReplyingTo(null)}
                      />
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}
