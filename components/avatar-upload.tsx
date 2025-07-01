"use client"

import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Upload, X, Check, AlertCircle } from "lucide-react"
import { uploadAvatar } from "@/lib/storage"
import { useAuth } from "@/contexts/auth-context"
import { toast } from "@/hooks/use-toast"

interface AvatarUploadProps {
  currentAvatarUrl?: string | null
  onUploadComplete?: (url: string) => void
}

export function AvatarUpload({ currentAvatarUrl, onUploadComplete }: AvatarUploadProps) {
  const { user } = useAuth()
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [preview, setPreview] = useState<string | null>(null)
  const [uploadStatus, setUploadStatus] = useState<"idle" | "success" | "error">("idle")

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (!user || acceptedFiles.length === 0) return

      const file = acceptedFiles[0]

      // Create preview
      const previewUrl = URL.createObjectURL(file)
      setPreview(previewUrl)

      setUploading(true)
      setProgress(0)
      setUploadStatus("idle")

      // Simulate progress
      const progressInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval)
            return 90
          }
          return prev + 10
        })
      }, 100)

      try {
        const result = await uploadAvatar(file, user.id)

        clearInterval(progressInterval)
        setProgress(100)

        if (result.error) {
          setUploadStatus("error")
          toast({
            title: "Upload Failed",
            description: result.error,
            variant: "destructive",
          })
        } else if (result.url) {
          setUploadStatus("success")
          toast({
            title: "Avatar Updated",
            description: "Your profile picture has been updated successfully.",
          })
          onUploadComplete?.(result.url)
        }
      } catch (error) {
        clearInterval(progressInterval)
        setUploadStatus("error")
        toast({
          title: "Upload Failed",
          description: "An unexpected error occurred. Please try again.",
          variant: "destructive",
        })
      } finally {
        setUploading(false)
        setTimeout(() => {
          setProgress(0)
          setUploadStatus("idle")
          setPreview(null)
          URL.revokeObjectURL(previewUrl)
        }, 2000)
      }
    },
    [user, onUploadComplete],
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".webp", ".gif"],
    },
    maxSize: 5 * 1024 * 1024, // 5MB
    multiple: false,
    disabled: uploading,
  })

  const clearPreview = () => {
    if (preview) {
      URL.revokeObjectURL(preview)
      setPreview(null)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-4">
        <Avatar className="h-20 w-20">
          <AvatarImage src={preview || currentAvatarUrl || undefined} />
          <AvatarFallback className="text-lg">{user?.email?.charAt(0).toUpperCase()}</AvatarFallback>
        </Avatar>

        <div className="flex-1">
          <h3 className="text-sm font-medium">Profile Picture</h3>
          <p className="text-xs text-muted-foreground">
            Upload a new avatar. Max size 5MB. Supports JPEG, PNG, WebP, and GIF.
          </p>
        </div>
      </div>

      <Card className="border-dashed">
        <CardContent className="p-6">
          <div
            {...getRootProps()}
            className={`
              cursor-pointer rounded-lg border-2 border-dashed p-6 text-center transition-colors
              ${isDragActive ? "border-primary bg-primary/5" : "border-muted-foreground/25"}
              ${uploading ? "cursor-not-allowed opacity-50" : "hover:border-primary hover:bg-primary/5"}
            `}
          >
            <input {...getInputProps()} />

            <div className="flex flex-col items-center space-y-2">
              {uploadStatus === "success" ? (
                <Check className="h-8 w-8 text-green-500" />
              ) : uploadStatus === "error" ? (
                <AlertCircle className="h-8 w-8 text-red-500" />
              ) : (
                <Upload className="h-8 w-8 text-muted-foreground" />
              )}

              <div className="text-sm">
                {uploading ? (
                  <span>Uploading...</span>
                ) : isDragActive ? (
                  <span>Drop the image here</span>
                ) : uploadStatus === "success" ? (
                  <span className="text-green-600">Upload successful!</span>
                ) : uploadStatus === "error" ? (
                  <span className="text-red-600">Upload failed</span>
                ) : (
                  <span>
                    <strong>Click to upload</strong> or drag and drop
                  </span>
                )}
              </div>

              {!uploading && uploadStatus === "idle" && (
                <p className="text-xs text-muted-foreground">JPEG, PNG, WebP or GIF (max 5MB)</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {uploading && (
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span>Uploading...</span>
            <span>{progress}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      )}

      {preview && !uploading && (
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Preview ready</span>
          <Button variant="ghost" size="sm" onClick={clearPreview}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  )
}
