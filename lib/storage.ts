import { supabase } from "./supabase"

export interface UploadResult {
  url: string | null
  error: string | null
}

export async function uploadAvatar(file: File, userId: string): Promise<UploadResult> {
  try {
    // Validate file type
    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"]
    if (!allowedTypes.includes(file.type)) {
      return { url: null, error: "Invalid file type. Please upload a JPEG, PNG, WebP, or GIF image." }
    }

    // Validate file size (5MB limit)
    const maxSize = 5 * 1024 * 1024 // 5MB in bytes
    if (file.size > maxSize) {
      return { url: null, error: "File size too large. Please upload an image smaller than 5MB." }
    }

    // Generate unique filename
    const fileExt = file.name.split(".").pop()
    const fileName = `${userId}/${Date.now()}.${fileExt}`

    // Delete existing avatar if it exists
    await deleteExistingAvatar(userId)

    // Upload new avatar
    const { data, error } = await supabase.storage.from("avatars").upload(fileName, file, {
      cacheControl: "3600",
      upsert: false,
    })

    if (error) {
      console.error("Upload error:", error)
      return { url: null, error: "Failed to upload image. Please try again." }
    }

    // Get public URL
    const {
      data: { publicUrl },
    } = supabase.storage.from("avatars").getPublicUrl(data.path)

    return { url: publicUrl, error: null }
  } catch (error) {
    console.error("Upload error:", error)
    return { url: null, error: "An unexpected error occurred. Please try again." }
  }
}

export async function deleteExistingAvatar(userId: string): Promise<void> {
  try {
    // List all files in the user's folder
    const { data: files, error } = await supabase.storage.from("avatars").list(userId)

    if (error || !files) {
      return // No existing files or error listing
    }

    // Delete all existing files
    const filePaths = files.map((file) => `${userId}/${file.name}`)
    if (filePaths.length > 0) {
      await supabase.storage.from("avatars").remove(filePaths)
    }
  } catch (error) {
    console.error("Error deleting existing avatar:", error)
    // Don't throw error, just log it
  }
}

export async function getAvatarUrl(userId: string): Promise<string | null> {
  try {
    const { data: files, error } = await supabase.storage.from("avatars").list(userId)

    if (error || !files || files.length === 0) {
      return null
    }

    // Get the most recent file
    const latestFile = files.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())[0]

    const {
      data: { publicUrl },
    } = supabase.storage.from("avatars").getPublicUrl(`${userId}/${latestFile.name}`)

    return publicUrl
  } catch (error) {
    console.error("Error getting avatar URL:", error)
    return null
  }
}
