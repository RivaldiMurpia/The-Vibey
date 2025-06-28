import { cn } from "@/lib/utils"

interface LogoProps {
  size?: "sm" | "md" | "lg" | "xl"
  showText?: boolean
  className?: string
}

const sizeMap = {
  sm: { svg: 24, text: "text-lg" },
  md: { svg: 32, text: "text-xl" },
  lg: { svg: 48, text: "text-2xl" },
  xl: { svg: 64, text: "text-3xl" },
}

export function Logo({ size = "md", showText = false, className }: LogoProps) {
  const { svg: svgSize, text: textSize } = sizeMap[size]

  return (
    <div className={cn("flex items-center space-x-3", className)}>
      <svg width={svgSize} height={svgSize} viewBox="0 0 100 100" className="flex-shrink-0">
        {/* V Shape */}
        <polygon points="50,90 10,10 35,10 50,55 65,10 90,10" className="fill-gray-900" />
        {/* Spark */}
        <path d="M 90 5 L 95 10 L 90 15 L 85 10 Z" className="fill-lime-500" />
      </svg>
      {showText && <span className={cn("font-bold text-gray-900", textSize)}>The Vibey</span>}
    </div>
  )
}
