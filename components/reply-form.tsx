"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RichTextEditor } from "@/components/rich-text-editor"
import { useAuth } from "@/contexts/auth-context"
import { supabase } from "@/lib/supabase"
import { useRouter } from "next/navigation"

interface ReplyFormProps {
  threadId: string
  parentId?: string
  onReplyAdded?: () => void
  onCancel?: () => void
}

export function ReplyForm({ threadId, parentId, onReplyAdded, onCancel }: ReplyFormProps) {
  const [content, setContent] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const { user, profile } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user || !profile) {
      router.push("/auth/signin")
      return
    }

    setLoading(true)
    setError("")

    try {
      const { error } = await supabase.from("replies").insert({
        content,
        author_id: user.id,
        thread_id: threadId,
        parent_id: parentId || null,
      })

      if (error) throw error

      setContent("")
      if (onReplyAdded) {
        onReplyAdded()
      } else {
        router.refresh()
      }
    } catch (error: any) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  if (!user) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <p className="text-gray-600 mb-4">Sign in to join the discussion</p>
          <Button asChild className="bg-blue-600 hover:bg-blue-700">
            <a href="/auth/signin">Sign In</a>
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{parentId ? "Reply to comment" : "Add a reply"}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <RichTextEditor value={content} onChange={setContent} placeholder="What are your thoughts?" />

          {error && <div className="text-sm text-red-600 bg-red-50 p-3 rounded-md">{error}</div>}

          <div className="flex justify-end space-x-2">
            {onCancel && (
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancel
              </Button>
            )}
            <Button type="submit" disabled={loading || !content.trim()} className="bg-blue-600 hover:bg-blue-700">
              {loading ? "Posting..." : "Post Reply"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
