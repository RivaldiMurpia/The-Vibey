import { ImageResponse } from "next/og"

export const runtime = "edge"

export const size = {
  width: 32,
  height: 32,
}

export const contentType = "image/png"

export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        background: "white",
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 100 100"
        style={{
          display: "block",
        }}
      >
        {/* V Shape */}
        <polygon points="50,90 10,10 35,10 50,55 65,10 90,10" fill="#111827" />
        {/* Spark */}
        <path d="M 90 5 L 95 10 L 90 15 L 85 10 Z" fill="#84cc16" />
      </svg>
    </div>,
    {
      ...size,
    },
  )
}
