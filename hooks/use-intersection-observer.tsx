"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"

interface UseIntersectionObserverOptions extends IntersectionObserverInit {
  freezeOnceVisible?: boolean
}

export function useIntersectionObserver(
  options: UseIntersectionObserverOptions = {},
): [React.RefObject<HTMLDivElement>, boolean] {
  const { threshold = 0, root = null, rootMargin = "0%", freezeOnceVisible = false } = options

  const [isIntersecting, setIsIntersecting] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const node = ref?.current // DOM node

    if (!node || typeof IntersectionObserver !== "function") {
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isElementIntersecting = entry?.isIntersecting ?? false

        setIsIntersecting(isElementIntersecting)

        if (isElementIntersecting && freezeOnceVisible) {
          observer.unobserve(node)
        }
      },
      { threshold, root, rootMargin },
    )

    observer.observe(node)

    return () => {
      observer.disconnect()
    }
  }, [ref, threshold, root, rootMargin, freezeOnceVisible])

  return [ref, isIntersecting]
}
