"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Users,
  ArrowRight,
  Code2,
  Zap,
  Star,
  ChevronLeft,
  ChevronRight,
  Quote,
  TrendingUp,
  MessageSquare,
} from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/contexts/auth-context"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { useIntersectionObserver } from "@/hooks/use-intersection-observer"

// Custom hook for intersection observer
// function useIntersectionObserver(options = {}) {
//   const [isIntersecting, setIsIntersecting] = useState(false)
//   const ref = useRef(null)

//   useEffect(() => {
//     const observer = new IntersectionObserver(([entry]) => {
//       setIsIntersecting(entry.isIntersecting)
//     }, options)

//     if (ref.current) {
//       observer.observe(ref.current)
//     }

//     return () => observer.disconnect()
//   }, [options])

//   return [ref, isIntersecting]
// }

// Animated Counter Component
function AnimatedCounter({ end, duration = 2000, suffix = "" }) {
  const [count, setCount] = useState(0)
  const [ref, isInView] = useIntersectionObserver({ threshold: 0.3 })

  useEffect(() => {
    if (!isInView) return

    let startTime = null
    const startCount = 0

    const animate = (currentTime) => {
      if (startTime === null) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / duration, 1)

      setCount(Math.floor(progress * (end - startCount) + startCount))

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  }, [isInView, end, duration])

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  )
}

// Testimonial Carousel Component
function TestimonialCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [ref, isInView] = useIntersectionObserver({ threshold: 0.3 })

  const testimonials = [
    {
      name: "Andi Pratama",
      role: "Senior Frontend Developer",
      company: "Tokopedia",
      image: "/placeholder.svg?height=80&width=80",
      content:
        "The Vibey has completely transformed how I approach coding. The community feedback helped me level up my skills dramatically.",
      rating: 5,
    },
    {
      name: "Sarah Wijaya",
      role: "UI/UX Designer",
      company: "Gojek",
      image: "/placeholder.svg?height=80&width=80",
      content:
        "Amazing platform for getting constructive feedback. The design critiques here are top-notch and really helped improve my work.",
      rating: 5,
    },
    {
      name: "Budi Santoso",
      role: "Full Stack Developer",
      company: "Bukalapak",
      image: "/placeholder.svg?height=80&width=80",
      content:
        "Love the community vibe here. It's not just about code, it's about building something beautiful and meaningful together.",
      rating: 5,
    },
  ]

  useEffect(() => {
    if (!isInView) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isInView, testimonials.length])

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <div ref={ref} className="relative max-w-4xl mx-auto">
      <div className="overflow-hidden rounded-2xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            className="bg-white dark:bg-gray-800 p-8 md:p-12 shadow-2xl"
          >
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-shrink-0">
                <img
                  src={testimonials[currentIndex].image || "/placeholder.svg"}
                  alt={testimonials[currentIndex].name}
                  className="w-20 h-20 rounded-full object-cover border-4 border-lime-200"
                />
              </div>
              <div className="flex-1 text-center md:text-left">
                <Quote className="w-8 h-8 text-lime-500 mb-4 mx-auto md:mx-0" />
                <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                  "{testimonials[currentIndex].content}"
                </p>
                <div className="flex items-center justify-center md:justify-start gap-1 mb-4">
                  {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white">{testimonials[currentIndex].name}</h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    {testimonials[currentIndex].role} at {testimonials[currentIndex].company}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-center gap-4 mt-8">
        <Button
          variant="outline"
          size="sm"
          onClick={prevTestimonial}
          className="rounded-full w-12 h-12 p-0 bg-transparent"
        >
          <ChevronLeft className="w-5 h-5" />
        </Button>

        <div className="flex gap-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex ? "bg-lime-500 scale-125" : "bg-gray-300"
              }`}
            />
          ))}
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={nextTestimonial}
          className="rounded-full w-12 h-12 p-0 bg-transparent"
        >
          <ChevronRight className="w-5 h-5" />
        </Button>
      </div>
    </div>
  )
}

// Floating Elements Component
function FloatingElements() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Floating Code Snippets */}
      <motion.div
        animate={{
          y: [-20, 20, -20],
          rotate: [0, 5, 0],
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        className="absolute top-20 left-10 bg-gray-900/10 dark:bg-white/10 p-4 rounded-lg backdrop-blur-sm"
      >
        <code className="text-sm text-gray-600 dark:text-gray-400">const vibe = true;</code>
      </motion.div>

      <motion.div
        animate={{
          y: [20, -20, 20],
          rotate: [0, -5, 0],
        }}
        transition={{
          duration: 10,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 2,
        }}
        className="absolute top-40 right-20 bg-lime-500/10 p-4 rounded-lg backdrop-blur-sm"
      >
        <code className="text-sm text-lime-600">{"<Vibey />"}</code>
      </motion.div>

      <motion.div
        animate={{
          y: [-15, 15, -15],
          rotate: [0, 3, 0],
        }}
        transition={{
          duration: 12,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 4,
        }}
        className="absolute bottom-40 left-20 bg-blue-500/10 p-4 rounded-lg backdrop-blur-sm"
      >
        <code className="text-sm text-blue-600">npm install vibes</code>
      </motion.div>
    </div>
  )
}

export default function HomePage() {
  const { user, loading } = useAuth()
  const { scrollYProgress } = useScroll()
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    message: "",
  })

  // Parallax transforms
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0])

  const [stats, setStats] = useState({
    discussions: 0,
    members: 0,
    projects: 0,
    satisfaction: 0,
  })

  useEffect(() => {
    // Animate stats counting up
    const timer = setTimeout(() => {
      setStats({
        discussions: 1250,
        members: 3400,
        projects: 890,
        satisfaction: 98,
      })
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const handleContactSubmit = (e) => {
    e.preventDefault()
    // Handle form submission
    console.log("Contact form submitted:", contactForm)
    // Reset form
    setContactForm({ name: "", email: "", message: "" })
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-lime-50 via-green-50 to-emerald-50 dark:from-lime-950/20 dark:via-green-950/20 dark:to-emerald-950/20">
        <div className="absolute inset-0 bg-grid-black/[0.02] dark:bg-grid-white/[0.02]" />
        <div className="container relative py-24 lg:py-32">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-8 flex justify-center">
              <Badge variant="secondary" className="px-4 py-2 text-sm">
                🚀 Platform Komunitas Developer Indonesia
              </Badge>
            </div>

            <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
              <span className="bg-gradient-to-r from-lime-600 to-green-600 bg-clip-text text-transparent">
                The Vibey
              </span>
              <br />
              <span className="text-foreground">Where Code Meets Creativity</span>
            </h1>

            <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground sm:text-xl">
              Platform komunitas eksklusif untuk para Vibe Coder Indonesia yang peduli pada kualitas, estetika, dan
              inovasi dalam setiap baris kode.
            </p>

            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              {user ? (
                <Button
                  size="lg"
                  asChild
                  className="bg-gradient-to-r from-lime-600 to-green-600 hover:from-lime-700 hover:to-green-700"
                >
                  <Link href="/dashboard">
                    Go to Dashboard
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              ) : (
                <>
                  <Button
                    size="lg"
                    asChild
                    className="bg-gradient-to-r from-lime-600 to-green-600 hover:from-lime-700 hover:to-green-700"
                  >
                    <Link href="/auth/signup">
                      Join The Community
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link href="/about">Learn More</Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 lg:py-32">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Why Choose The Vibey?</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Bergabunglah dengan komunitas developer Indonesia yang mengutamakan kualitas dan inovasi
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-lime-400 to-green-600 flex items-center justify-center mb-4">
                  <Code2 className="w-6 h-6 text-white" />
                </div>
                <CardTitle>Quality First</CardTitle>
                <CardDescription>Fokus pada kualitas kode dan best practices dalam setiap project</CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <CardTitle>Community Driven</CardTitle>
                <CardDescription>Komunitas yang saling mendukung dan berbagi pengetahuan</CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-orange-400 to-red-600 flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <CardTitle>Innovation Hub</CardTitle>
                <CardDescription>Tempat untuk mengeksplorasi teknologi terbaru dan ide-ide kreatif</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-muted/50">
        <div className="container">
          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-lime-400 to-green-600">
                <Users className="w-8 h-8 text-white" />
              </div>
              <div className="text-3xl font-bold">1,000+</div>
              <div className="text-muted-foreground">Active Developers</div>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-400 to-purple-600">
                <MessageSquare className="w-8 h-8 text-white" />
              </div>
              <div className="text-3xl font-bold">5,000+</div>
              <div className="text-muted-foreground">Discussions</div>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-orange-400 to-red-600">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <div className="text-3xl font-bold">10,000+</div>
              <div className="text-muted-foreground">Code Reviews</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 lg:py-32">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">Ready to Join The Vibey?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Bergabunglah dengan ribuan developer Indonesia lainnya dan mulai perjalanan coding yang lebih vibey!
            </p>

            {!user && (
              <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
                <Button
                  size="lg"
                  asChild
                  className="bg-gradient-to-r from-lime-600 to-green-600 hover:from-lime-700 hover:to-green-700"
                >
                  <Link href="/auth/signup">
                    Get Started Now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/contact">Contact Us</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
