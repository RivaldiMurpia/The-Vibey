import { notFound } from "next/navigation"
import { Header } from "@/components/header"
import { ThreadView } from "@/components/thread-view"
import { ReplyList } from "@/components/reply-list"
import { ReplyForm } from "@/components/reply-form"
import { supabase } from "@/lib/supabase"

async function getThread(id: string) {
  const { data: thread, error } = await supabase
    .from("threads")
    .select(`
      *,
      profiles:author_id (username, avatar_url, full_name),
      categories (name, slug, color)
    `)
    .eq("id", id)
    .single()

  if (error) {
    return null
  }

  return thread
}

async function getReplies(threadId: string) {
  const { data: replies, error } = await supabase
    .from("replies")
    .select(`
      *,
      profiles:author_id (username, avatar_url, full_name)
    `)
    .eq("thread_id", threadId)
    .is("parent_id", null)
    .order("created_at", { ascending: true })

  if (error) {
    console.error("Error fetching replies:", error)
    return []
  }

  return replies || []
}

export default async function ThreadPage({ params }: { params: { id: string } }) {
  const [thread, replies] = await Promise.all([getThread(params.id), getReplies(params.id)])

  if (!thread) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          <ThreadView thread={thread} />
          <ReplyForm threadId={params.id} />
          <ReplyList replies={replies} threadId={params.id} />
        </div>
      </main>
    </div>
  )
}
