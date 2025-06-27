"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, TrendingUp } from "lucide-react"
import { motion } from "framer-motion"

interface Category {
  id: string
  name: string
  slug: string
  description: string | null
  color: string
}

interface SidebarProps {
  categories: Category[]
}

export function Sidebar({ categories }: SidebarProps) {
  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Welcome to The Vibey</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-gray-600">
              Platform komunitas untuk para Vibe Coder Indonesia berbagi karya, berdiskusi teknis, dan mengasah selera
              desain.
            </p>
            <Button asChild className="w-full bg-blue-600 hover:bg-blue-700">
              <Link href="/create">
                <Plus className="h-4 w-4 mr-2" />
                Create Thread
              </Link>
            </Button>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center">
              <TrendingUp className="h-5 w-5 mr-2" />
              Categories
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/${category.slug}`}
                className="block p-3 rounded-lg border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center justify-between mb-1">
                  <Badge variant="secondary" style={{ backgroundColor: `${category.color}20`, color: category.color }}>
                    #{category.name}
                  </Badge>
                </div>
                {category.description && <p className="text-xs text-gray-600 mt-1">{category.description}</p>}
              </Link>
            ))}
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">About The Vibey</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">
              The Vibey adalah sebuah platform komunitas online bergaya Reddit yang diciptakan khusus untuk para developer dan desainer di Indonesia yang terobsesi dengan kualitas, estetika, dan "rasa" dari sebuah produk digital.
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
