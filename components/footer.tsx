"use client"

import type React from "react"
import Link from "next/link"
import { Logo } from "@/components/logo"
import { Github, Twitter, Linkedin, Instagram, Code, Palette, Coffee, MessageCircle } from "lucide-react"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"

const footerLinks = {
  product: [
    { label: "Features", href: "/#features" },
    { label: "Pricing", href: "/#pricing" },
    { label: "Showcase", href: "/category/showcase" },
    { label: "DesignCrit", href: "/category/designcrit" },
    { label: "TechStack", href: "/category/techstack" },
    { label: "Ngopi", href: "/category/ngopi" },
  ],
  company: [
    { label: "About Us", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
    { label: "Careers", href: "/careers" },
    { label: "Press Kit", href: "/press" },
  ],
  resources: [
    { label: "Help Center", href: "/help" },
    { label: "Community Guidelines", href: "/guidelines" },
    { label: "API Documentation", href: "/docs" },
    { label: "Status Page", href: "/status" },
    { label: "Changelog", href: "/changelog" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Cookie Policy", href: "/cookies" },
    { label: "GDPR", href: "/gdpr" },
  ],
}

const socialLinks = [
  { icon: Github, label: "GitHub", href: "https://github.com/thevibey", color: "hover:text-gray-600" },
  { icon: Twitter, label: "Twitter", href: "https://twitter.com/thevibey", color: "hover:text-blue-500" },
  { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com/company/thevibey", color: "hover:text-blue-600" },
  { icon: Instagram, label: "Instagram", href: "https://instagram.com/thevibey", color: "hover:text-pink-500" },
]

const vibeZones = [
  { name: "Showcase", icon: Palette, href: "/category/showcase", color: "text-pink-500" },
  { name: "DesignCrit", icon: MessageCircle, href: "/category/designcrit", color: "text-blue-500" },
  { name: "TechStack", icon: Code, href: "/category/techstack", color: "text-green-500" },
  { name: "Ngopi", icon: Coffee, href: "/category/ngopi", color: "text-orange-500" },
]

export function Footer() {
  const { toast } = useToast()
  const [email, setEmail] = useState("")
  const [isSubscribing, setIsSubscribing] = useState(false)

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setIsSubscribing(true)

    // Simulate newsletter subscription
    await new Promise((resolve) => setTimeout(resolve, 1500))

    toast({
      title: "Successfully subscribed!",
      description: "You'll receive our weekly newsletter with the latest updates.",
    })

    setEmail("")
    setIsSubscribing(false)
  }

  return (
    <footer className="border-t bg-background">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Logo />
              <span className="font-bold">The Vibey</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Platform komunitas eksklusif untuk para Vibe Coder Indonesia yang peduli pada kualitas, estetika, dan
              inovasi.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-semibold">Community</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/categories" className="text-muted-foreground hover:text-foreground">
                  Categories
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-muted-foreground hover:text-foreground">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-foreground">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-semibold">Support</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-foreground">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/help" className="text-muted-foreground hover:text-foreground">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-muted-foreground hover:text-foreground">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-semibold">Connect</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="https://github.com" className="text-muted-foreground hover:text-foreground">
                  GitHub
                </a>
              </li>
              <li>
                <a href="https://twitter.com" className="text-muted-foreground hover:text-foreground">
                  Twitter
                </a>
              </li>
              <li>
                <a href="https://discord.com" className="text-muted-foreground hover:text-foreground">
                  Discord
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2024 The Vibey. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
