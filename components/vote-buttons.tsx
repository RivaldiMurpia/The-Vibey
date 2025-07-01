"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ArrowUp, ArrowDown } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { supabase } from "@/lib/supabase"
import { cn } from "@/lib/utils"

interface VoteButtonsProps {
  threadId?: string
  replyId?: string
  initialUpvotes: number
  initialDownvotes: number
  size?: "sm" | "md" | "lg"
  className?: string
}

export function VoteButtons({
  threadId,
  replyId,
  initialUpvotes,
  initialDownvotes,
  size = "md",
  className,
}: VoteButtonsProps) {
  const [upvotes, setUpvotes] = useState(initialUpvotes)
  const [downvotes, setDownvotes] = useState(initialDownvotes)
  const [userVote, setUserVote] = useState<"up" | "down" | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const { user } = useAuth()

  const sizeClasses = {
    sm: "h-7 w-7",
    md: "h-8 w-8",
    lg: "h-10 w-10",
  }

  const iconSizeClasses = {
    sm: "w-3 h-3",
    md: "w-4 h-4",
    lg: "w-5 h-5",
  }

  // Fetch user's existing vote
  useEffect(() => {
    const fetchUserVote = async () => {
      if (!user) return

      try {
        const { data, error } = await supabase
          .from("votes")
          .select("vote_type")
          .eq("user_id", user.id)
          .eq(threadId ? "thread_id" : "reply_id", threadId || replyId)
          .maybeSingle()

        if (error) {
          console.error("Error fetching user vote:", error)
          return
        }

        if (data) {
          setUserVote(data.vote_type as "up" | "down")
        }
      } catch (error) {
        console.error("Error fetching user vote:", error)
      }
    }

    fetchUserVote()
  }, [user, threadId, replyId])

  const handleVote = async (voteType: "up" | "down") => {
    if (!user) {
      // Redirect to sign in
      window.location.href = `/auth/signin?redirectTo=${window.location.pathname}`
      return
    }

    if (isLoading) return

    setIsLoading(true)

    try {
      // Optimistic update
      const previousUpvotes = upvotes
      const previousDownvotes = downvotes
      const previousUserVote = userVote

      // Calculate new vote counts
      let newUpvotes = upvotes
      let newDownvotes = downvotes

      if (userVote === voteType) {
        // Remove vote
        if (voteType === "up") {
          newUpvotes -= 1
        } else {
          newDownvotes -= 1
        }
        setUserVote(null)
      } else {
        // Add or change vote
        if (userVote === "up") {
          newUpvotes -= 1
        } else if (userVote === "down") {
          newDownvotes -= 1
        }

        if (voteType === "up") {
          newUpvotes += 1
        } else {
          newDownvotes += 1
        }
        setUserVote(voteType)
      }

      setUpvotes(newUpvotes)
      setDownvotes(newDownvotes)

      // Make API call
      if (userVote === voteType) {
        // Remove vote
        const { error } = await supabase
          .from("votes")
          .delete()
          .eq("user_id", user.id)
          .eq(threadId ? "thread_id" : "reply_id", threadId || replyId)

        if (error) throw error
      } else {
        // Upsert vote
        const { error } = await supabase.from("votes").upsert(
          {
            user_id: user.id,
            thread_id: threadId || null,
            reply_id: replyId || null,
            vote_type: voteType,
          },
          {
            onConflict: threadId ? "user_id,thread_id" : "user_id,reply_id",
          },
        )

        if (error) throw error
      }

      // Update the thread/reply vote counts in the database
      const tableName = threadId ? "threads" : "replies"
      const idField = threadId ? "id" : "id"
      const idValue = threadId || replyId

      const { error: updateError } = await supabase
        .from(tableName)
        .update({
          upvotes: newUpvotes,
          downvotes: newDownvotes,
        })
        .eq(idField, idValue)

      if (updateError) {
        console.error("Error updating vote counts:", updateError)
        // Revert optimistic update
        setUpvotes(previousUpvotes)
        setDownvotes(previousDownvotes)
        setUserVote(previousUserVote)
      }
    } catch (error) {
      console.error("Error voting:", error)
      // Revert optimistic update
      setUpvotes(initialUpvotes)
      setDownvotes(initialDownvotes)
      setUserVote(null)
    } finally {
      setIsLoading(false)
    }
  }

  const score = upvotes - downvotes

  return (
    <div className={cn("flex items-center gap-1", className)}>
      {/* Upvote Button */}
      <Button
        variant="ghost"
        size="sm"
        className={cn(
          sizeClasses[size],
          "p-0",
          userVote === "up"
            ? "text-green-600 bg-green-50 hover:bg-green-100"
            : "text-gray-500 hover:text-green-600 hover:bg-green-50",
        )}
        onClick={() => handleVote("up")}
        disabled={isLoading}
      >
        <ArrowUp className={iconSizeClasses[size]} />
      </Button>

      {/* Score */}
      <span
        className={cn(
          "text-sm font-medium min-w-[2rem] text-center",
          score > 0 ? "text-green-600" : score < 0 ? "text-red-600" : "text-gray-500",
        )}
      >
        {score}
      </span>

      {/* Downvote Button */}
      <Button
        variant="ghost"
        size="sm"
        className={cn(
          sizeClasses[size],
          "p-0",
          userVote === "down"
            ? "text-red-600 bg-red-50 hover:bg-red-100"
            : "text-gray-500 hover:text-red-600 hover:bg-red-50",
        )}
        onClick={() => handleVote("down")}
        disabled={isLoading}
      >
        <ArrowDown className={iconSizeClasses[size]} />
      </Button>
    </div>
  )
}
