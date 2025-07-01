import { cn } from "@/lib/utils"
import { Code2 } from "lucide-react"

interface LogoProps {
  size?: "sm" | "md" | "lg" | "xl"
  showText?: boolean
  className?: string
}

export function Logo({ size = "md", showText = false, className }: LogoProps) {
  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-8 h-8",
    lg: "w-12 h-12",
    xl: "w-16 h-16",
  }

  const textSizeClasses = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl",
    xl: "text-3xl",
  }

  return (
    <div className={cn("flex items-center justify-center gap-2", className)}>
      <div className={cn("bg-gradient-to-br from-lime-400 to-green-600 rounded-lg", sizeClasses[size])}>
        <Code2 className="w-5 h-5 text-white" />
      </div>
      {showText && (
        <span className={cn("font-bold text-gray-900 dark:text-white", textSizeClasses[size])}>The Vibey</span>
      )}
    </div>
  )
}
