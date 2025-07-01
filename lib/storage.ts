import { supabase } from "./supabase"

export interface UploadResult {
  url: string | null
  error: string | null
}

export async function uploadAvatar(file: File, userId: string): Promise<UploadResult> {
  try {
    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"]
    if (!allowedTypes.includes(file.type)) {
      return { url: null, error: "Invalid file type. Please upload a JPEG, PNG, WebP, or GIF image." }
    }

    const maxSize = 5 * 1024 * 1024 // 5MB in bytes
    if (file.size > maxSize) {
      return { url: null, error: "File size too large. Please upload an image smaller than 5MB." }
    }

    const fileExt = file.name.split(".").pop()
    const fileName = `${userId}/${Date.now()}.${fileExt}`

    await deleteExistingAvatar(userId)

    const { data, error } = await supabase.storage.from("avatars").upload(fileName, file, {
      cacheControl: "3600",
      upsert: false,
    })

    if (error) {
      console.error("Upload error:", error)
      return { url: null, error: "Failed to upload image. Please try again." }
    }

    const { data: { publicUrl } } = supabase.storage.from("avatars").getPublicUrl(data.path)
    return { url: publicUrl, error: null }
  } catch (error) {
    console.error("Upload error:", error)
    return { url: null, error: "An unexpected error occurred. Please try again." }
  }
}

export async function deleteExistingAvatar(userId: string): Promise<boolean> {
  try {
    const { data: files, error: listError } = await supabase.storage.from("avatars").list(userId)

    if (listError) {
        console.error("Error listing files for deletion:", listError);
        return false;
    }
    
    if (!files || files.length === 0) {
      return true; // Tidak ada yang perlu dihapus, anggap sukses
    }

    const filePaths = files.map((file) => `${userId}/${file.name}`)
    const { error: removeError } = await supabase.storage.from("avatars").remove(filePaths)

    if(removeError) {
        console.error("Error deleting existing avatar:", removeError);
        return false;
    }

    return true;
  } catch (error) {
    console.error("Unexpected error in deleteExistingAvatar:", error)
    return false;
  }
}
