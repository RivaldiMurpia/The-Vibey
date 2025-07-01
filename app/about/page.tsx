"use client"

import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Users,
  Target,
  Heart,
  Zap,
  Award,
  Globe,
  Code,
  MessageCircle,
  Github,
  Twitter,
  Linkedin,
  MapPin,
  TrendingUp,
} from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

const teamMembers = [
  {
    name: "Andi Pratama",
    role: "Founder & Lead Developer",
    bio: "Full-stack developer dengan 8+ tahun pengalaman di startup unicorn Indonesia. Passionate tentang community building dan developer experience.",
    avatar: "/placeholder.svg?height=120&width=120",
    social: {
      github: "https://github.com/andipratama",
      twitter: "https://twitter.com/andipratama",
      linkedin: "https://linkedin.com/in/andipratama",
    },
    skills: ["React", "Node.js", "TypeScript", "System Design"],
  },
  {
    name: "Sarah Wijaya",
    role: "Head of Design & UX",
    bio: "Product designer yang telah merancang pengalaman digital untuk jutaan pengguna. Fokus pada inclusive design dan accessibility.",
    avatar: "/placeholder.svg?height=120&width=120",
    social: {
      github: "https://github.com/sarahwijaya",
      twitter: "https://twitter.com/sarahwijaya",
      linkedin: "https://linkedin.com/in/sarahwijaya",
    },
    skills: ["UI/UX Design", "Design Systems", "Figma", "User Research"],
  },
  {
    name: "Budi Santoso",
    role: "Community Manager",
    bio: "Community builder yang telah membangun dan mengelola komunitas tech dengan 10K+ members. Expert dalam engagement dan growth strategies.",
    avatar: "/placeholder.svg?height=120&width=120",
    social: {
      github: "https://github.com/budisantoso",
      twitter: "https://twitter.com/budisantoso",
      linkedin: "https://linkedin.com/in/budisantoso",
    },
    skills: ["Community Building", "Content Strategy", "Event Management", "Growth Hacking"],
  },
  {
    name: "Maya Sari",
    role: "Content & Marketing Lead",
    bio: "Content strategist dan technical writer yang passionate tentang storytelling dan developer advocacy. Membantu developer berbagi cerita mereka.",
    avatar: "/placeholder.svg?height=120&width=120",
    social: {
      github: "https://github.com/mayasari",
      twitter: "https://twitter.com/mayasari",
      linkedin: "https://linkedin.com/in/mayasari",
    },
    skills: ["Technical Writing", "Content Marketing", "Developer Relations", "SEO"],
  },
]

const milestones = [
  {
    year: "2023",
    title: "The Beginning",
    description:
      "Ide The Vibey lahir dari frustrasi terhadap kurangnya platform berkualitas untuk developer Indonesia.",
    icon: Zap,
  },
  {
    year: "Q1 2024",
    title: "Beta Launch",
    description: "Soft launch dengan 100 developer terpilih untuk testing dan feedback awal.",
    icon: Users,
  },
  {
    year: "Q2 2024",
    title: "Public Launch",
    description: "Official launch dengan 1000+ members dalam minggu pertama.",
    icon: Globe,
  },
  {
    year: "Q3 2024",
    title: "Community Growth",
    description: "Mencapai 3000+ active members dengan 500+ discussions berkualitas.",
    icon: TrendingUp,
  },
]

const values = [
  {
    title: "Quality First",
    description: "Kami mengutamakan kualitas dalam setiap aspek - dari kode, desain, hingga diskusi komunitas.",
    icon: Award,
    color: "blue",
  },
  {
    title: "Inclusive Community",
    description: "Semua developer welcome, regardless of experience level, background, atau tech stack preference.",
    icon: Heart,
    color: "pink",
  },
  {
    title: "Continuous Learning",
    description: "Kami percaya bahwa learning never stops. Setiap hari adalah kesempatan untuk grow bersama.",
    icon: Target,
    color: "green",
  },
  {
    title: "Indonesian Pride",
    description: "Bangga menjadi platform buatan Indonesia untuk developer Indonesia yang go international.",
    icon: Globe,
    color: "orange",
  },
]

const stats = [
  { label: "Active Members", value: "3,400+", icon: Users },
  { label: "Discussions", value: "1,250+", icon: MessageCircle },
  { label: "Projects Shared", value: "890+", icon: Code },
  { label: "Cities Represented", value: "50+", icon: MapPin },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header />

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-lime-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-lime-950/20" />

        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23000000' fillOpacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>

        <div className="relative container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.h1
              className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6"
              style={{
                background: "linear-gradient(45deg, #1f2937, #065f46, #84cc16, #1f2937)",
                backgroundSize: "300% 300%",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 4,
                repeat: Number.POSITIVE_INFINITY,
              }}
            >
              About The Vibey
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed"
            >
              Platform komunitas yang lahir dari passion untuk membangun ekosistem developer Indonesia yang berkualitas,
              inklusif, dan saling mendukung dalam journey teknologi.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto"
            >
              {stats.map((stat, index) => (
                <motion.div key={stat.label} whileHover={{ scale: 1.05, y: -5 }} className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-lime-500 to-green-500 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg">
                    <stat.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">Our Mission</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                Membangun platform komunitas yang memberdayakan developer Indonesia untuk berkembang, berkolaborasi, dan
                menciptakan impact positif melalui teknologi. Kami percaya bahwa dengan saling berbagi knowledge dan
                experience, kita bisa elevate standar industri tech Indonesia ke level internasional.
              </p>

              <div className="space-y-4">
                {[
                  "Menyediakan ruang diskusi berkualitas tinggi",
                  "Memfasilitasi peer-to-peer learning",
                  "Mendukung career growth developer Indonesia",
                  "Membangun network profesional yang kuat",
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-2 h-2 bg-lime-500 rounded-full flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">{item}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative z-10 bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-2xl">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Our Vision</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  Menjadi platform komunitas developer #1 di Indonesia yang dikenal secara internasional sebagai hub
                  untuk talent-talent tech terbaik. Kami ingin The Vibey menjadi tempat dimana setiap developer
                  Indonesia bisa find their tribe, grow their skills, dan build amazing things together.
                </p>
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-r from-lime-400 to-green-400 rounded-full opacity-20 blur-xl" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-20 blur-xl" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">Our Core Values</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Values yang menjadi foundation dari setiap keputusan dan action yang kami ambil
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
              >
                <Card className="h-full text-center p-8 hover:shadow-xl transition-all duration-300">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6 ${
                      value.color === "blue"
                        ? "bg-gradient-to-r from-blue-500 to-cyan-500"
                        : value.color === "pink"
                          ? "bg-gradient-to-r from-pink-500 to-rose-500"
                          : value.color === "green"
                            ? "bg-gradient-to-r from-green-500 to-emerald-500"
                            : "bg-gradient-to-r from-orange-500 to-amber-500"
                    }`}
                  >
                    <value.icon className="w-8 h-8 text-white" />
                  </motion.div>

                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{value.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{value.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">Our Journey</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Dari ide sederhana hingga menjadi platform komunitas yang dipercaya ribuan developer
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            {milestones.map((milestone, index) => (
              <motion.div
                key={milestone.year}
                initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className={`flex items-center gap-8 mb-12 ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}
              >
                <div className="flex-1">
                  <Card className="p-6 hover:shadow-lg transition-all duration-300">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-lime-500 to-green-500 rounded-xl flex items-center justify-center">
                        <milestone.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <Badge variant="outline" className="mb-2">
                          {milestone.year}
                        </Badge>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">{milestone.title}</h3>
                      </div>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300">{milestone.description}</p>
                  </Card>
                </div>

                <div className="w-4 h-4 bg-lime-500 rounded-full flex-shrink-0 relative">
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full" />
                </div>

                <div className="flex-1" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">Meet Our Team</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Tim passionate yang dedicated untuk membangun komunitas developer Indonesia terbaik
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
              >
                <Card className="text-center p-6 hover:shadow-xl transition-all duration-300">
                  <motion.div whileHover={{ scale: 1.1 }} className="relative mb-6">
                    <img
                      src={member.avatar || "/placeholder.svg"}
                      alt={member.name}
                      className="w-24 h-24 rounded-full mx-auto object-cover border-4 border-lime-200"
                    />
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-r from-lime-500 to-green-500 rounded-full flex items-center justify-center">
                      <div className="w-3 h-3 bg-white rounded-full" />
                    </div>
                  </motion.div>

                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{member.name}</h3>
                  <p className="text-lime-600 dark:text-lime-400 font-medium mb-4">{member.role}</p>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-6 leading-relaxed">{member.bio}</p>

                  <div className="flex flex-wrap gap-1 mb-6">
                    {member.skills.map((skill) => (
                      <Badge key={skill} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex justify-center gap-3">
                    {Object.entries(member.social).map(([platform, url]) => {
                      const Icon = platform === "github" ? Github : platform === "twitter" ? Twitter : Linkedin
                      return (
                        <motion.a
                          key={platform}
                          href={url}
                          whileHover={{ scale: 1.2, y: -2 }}
                          className="w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center hover:bg-lime-500 hover:text-white transition-all duration-300"
                        >
                          <Icon className="w-4 h-4" />
                        </motion.a>
                      )
                    })}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-lime-600 to-green-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10" />

        <div className="relative container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Ready to Join Our Mission?</h2>
            <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
              Bergabunglah dengan ribuan developer Indonesia yang sudah menjadi bagian dari The Vibey community
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/auth/signup">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button size="lg" className="bg-white text-lime-600 hover:bg-gray-50 px-8 py-4 text-lg font-semibold">
                    Join The Community
                  </Button>
                </motion.div>
              </Link>

              <Link href="/contact">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-2 border-white text-white hover:bg-white hover:text-lime-600 px-8 py-4 text-lg font-semibold bg-transparent"
                  >
                    Get In Touch
                  </Button>
                </motion.div>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
