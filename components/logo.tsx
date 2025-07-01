import { cn } from "@/lib/utils"

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
    <div className={cn("flex items-center gap-2", className)}>
      <svg width="100" height="100" viewBox="0 0 100 100" className={sizeClasses[size]}>
        {/* V Shape */}
        <polygon points="50,90 10,10 35,10 50,55 65,10 90,10" className="fill-gray-900 dark:fill-white" />
        {/* Spark */}
        <path d="M 90 5 L 95 10 L 90 15 L 85 10 Z" className="fill-lime-500" />
      </svg>
      {showText && (
        <span className={cn("font-bold text-gray-900 dark:text-white", textSizeClasses[size])}>The Vibey</span>
      )}
    </div>
  )
}
