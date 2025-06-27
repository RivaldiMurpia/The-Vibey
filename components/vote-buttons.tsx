"use client"

import { useState, useEffect } from "react"
import { ChevronUp, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/contexts/auth-context"
import { supabase } from "@/lib/supabase"
import { motion } from "framer-motion"

interface VoteButtonsProps {
  threadId?: string
  replyId?: string
  initialUpvotes: number
  initialDownvotes: number
  className?: string
}

export function VoteButtons({ threadId, replyId, initialUpvotes, initialDownvotes, className = "" }: VoteButtonsProps) {
  const { user } = useAuth()
  const [upvotes, setUpvotes] = useState(initialUpvotes)
  const [downvotes, setDownvotes] = useState(initialDownvotes)
  const [userVote, setUserVote] = useState<"up" | "down" | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (user) {
      fetchUserVote()
    }
  }, [user, threadId, replyId])

  const fetchUserVote = async () => {
    if (!user) return

    try {
      const query = supabase.from("votes").select("vote_type").eq("user_id", user.id)

      if (threadId) {
        query.eq("thread_id", threadId)
      } else if (replyId) {
        query.eq("reply_id", replyId)
      }

      const { data } = await query.single()
      setUserVote(data?.vote_type || null)
    } catch (error) {
      // No vote found, which is fine
    }
  }

  const handleVote = async (voteType: "up" | "down") => {
    if (!user || loading) return

    setLoading(true)
    try {
      // If clicking the same vote, remove it
      if (userVote === voteType) {
        await removeVote()
        return
      }

      // Insert or update vote
      const voteData = {
        user_id: user.id,
        vote_type: voteType,
        ...(threadId ? { thread_id: threadId } : { reply_id: replyId }),
      }

      const { error } = await supabase.from("votes").upsert(voteData)

      if (error) throw error

      // Update local state
      if (userVote === null) {
        // New vote
        if (voteType === "up") {
          setUpvotes((prev) => prev + 1)
        } else {
          setDownvotes((prev) => prev + 1)
        }
      } else {
        // Changing vote
        if (userVote === "up" && voteType === "down") {
          setUpvotes((prev) => prev - 1)
          setDownvotes((prev) => prev + 1)
        } else if (userVote === "down" && voteType === "up") {
          setDownvotes((prev) => prev - 1)
          setUpvotes((prev) => prev + 1)
        }
      }

      setUserVote(voteType)

      // Update thread/reply vote counts
      if (threadId) {
        await supabase
          .from("threads")
          .update({
            upvotes:
              voteType === "up"
                ? upvotes + (userVote === null ? 1 : userVote === "down" ? 2 : 0)
                : upvotes - (userVote === "up" ? 1 : 0),
            downvotes:
              voteType === "down"
                ? downvotes + (userVote === null ? 1 : userVote === "up" ? 2 : 0)
                : downvotes - (userVote === "down" ? 1 : 0),
          })
          .eq("id", threadId)
      } else if (replyId) {
        await supabase
          .from("replies")
          .update({
            upvotes:
              voteType === "up"
                ? upvotes + (userVote === null ? 1 : userVote === "down" ? 2 : 0)
                : upvotes - (userVote === "up" ? 1 : 0),
            downvotes:
              voteType === "down"
                ? downvotes + (userVote === null ? 1 : userVote === "up" ? 2 : 0)
                : downvotes - (userVote === "down" ? 1 : 0),
          })
          .eq("id", replyId)
      }
    } catch (error) {
      console.error("Error voting:", error)
    } finally {
      setLoading(false)
    }
  }

  const removeVote = async () => {
    if (!user) return

    try {
      const query = supabase.from("votes").delete().eq("user_id", user.id)

      if (threadId) {
        query.eq("thread_id", threadId)
      } else if (replyId) {
        query.eq("reply_id", replyId)
      }

      const { error } = await query

      if (error) throw error

      // Update local state
      if (userVote === "up") {
        setUpvotes((prev) => prev - 1)
      } else if (userVote === "down") {
        setDownvotes((prev) => prev - 1)
      }

      setUserVote(null)

      // Update thread/reply vote counts
      if (threadId) {
        await supabase
          .from("threads")
          .update({
            upvotes: userVote === "up" ? upvotes - 1 : upvotes,
            downvotes: userVote === "down" ? downvotes - 1 : downvotes,
          })
          .eq("id", threadId)
      } else if (replyId) {
        await supabase
          .from("replies")
          .update({
            upvotes: userVote === "up" ? upvotes - 1 : upvotes,
            downvotes: userVote === "down" ? downvotes - 1 : downvotes,
          })
          .eq("id", replyId)
      }
    } catch (error) {
      console.error("Error removing vote:", error)
    }
  }

  const score = upvotes - downvotes

  return (
    <div className={`flex flex-col items-center space-y-1 ${className}`}>
      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => handleVote("up")}
          disabled={!user || loading}
          className={`h-8 w-8 p-0 ${
            userVote === "up"
              ? "text-blue-600 bg-blue-50 hover:bg-blue-100"
              : "text-gray-400 hover:text-blue-600 hover:bg-blue-50"
          }`}
        >
          <ChevronUp className="h-4 w-4" />
        </Button>
      </motion.div>

      <span
        className={`text-sm font-medium ${score > 0 ? "text-blue-600" : score < 0 ? "text-red-500" : "text-gray-500"}`}
      >
        {score}
      </span>

      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => handleVote("down")}
          disabled={!user || loading}
          className={`h-8 w-8 p-0 ${
            userVote === "down"
              ? "text-red-500 bg-red-50 hover:bg-red-100"
              : "text-gray-400 hover:text-red-500 hover:bg-red-50"
          }`}
        >
          <ChevronDown className="h-4 w-4" />
        </Button>
      </motion.div>
    </div>
  )
}
