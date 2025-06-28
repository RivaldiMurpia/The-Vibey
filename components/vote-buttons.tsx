"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronUp, ChevronDown } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { supabase } from "@/lib/supabase"

interface VoteButtonsProps {
  threadId: string
  initialVotes: number
}

export function VoteButtons({ threadId, initialVotes }: VoteButtonsProps) {
  const [votes, setVotes] = useState(initialVotes)
  const [userVote, setUserVote] = useState<"upvote" | "downvote" | null>(null)
  const { user } = useAuth()

  const handleVote = async (voteType: "upvote" | "downvote") => {
    if (!user) {
      // Redirect to sign in
      window.location.href = "/auth/signin"
      return
    }

    try {
      // Remove existing vote if same type
      if (userVote === voteType) {
        await supabase.from("thread_votes").delete().eq("thread_id", threadId).eq("user_id", user.id)

        setVotes(votes - (voteType === "upvote" ? 1 : -1))
        setUserVote(null)
        return
      }

      // Update or insert vote
      const { error } = await supabase.from("thread_votes").upsert({
        thread_id: threadId,
        user_id: user.id,
        vote_type: voteType,
      })

      if (error) throw error

      // Update local state
      const oldVoteValue = userVote === "upvote" ? 1 : userVote === "downvote" ? -1 : 0
      const newVoteValue = voteType === "upvote" ? 1 : -1
      setVotes(votes - oldVoteValue + newVoteValue)
      setUserVote(voteType)
    } catch (error) {
      console.error("Error voting:", error)
    }
  }

  return (
    <div className="flex flex-col items-center space-y-1">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => handleVote("upvote")}
        className={`h-8 w-8 p-0 ${userVote === "upvote" ? "text-blue-600 bg-blue-50" : "text-gray-500 hover:text-blue-600"}`}
      >
        <ChevronUp className="h-4 w-4" />
      </Button>

      <span
        className={`text-sm font-medium ${votes > 0 ? "text-blue-600" : votes < 0 ? "text-red-600" : "text-gray-500"}`}
      >
        {votes}
      </span>

      <Button
        variant="ghost"
        size="sm"
        onClick={() => handleVote("downvote")}
        className={`h-8 w-8 p-0 ${userVote === "downvote" ? "text-red-600 bg-red-50" : "text-gray-500 hover:text-red-600"}`}
      >
        <ChevronDown className="h-4 w-4" />
      </Button>
    </div>
  )
}
