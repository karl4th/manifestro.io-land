"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { 
  Brain, 
  Search, 
  Calendar, 
  Clock, 
  User, 
  ArrowRight,
  TrendingUp,
  Cpu,
  Network
} from "lucide-react"
import Navigation from "@/components/navigation"
import Link from "next/link"
import { useState } from "react"
import { motion } from "framer-motion"

const blogPosts = [
  {
    id: 1,
    title: "The Future of Collective Intelligence: How AI Agents Work Together",
    excerpt: "Exploring the paradigm shift from single AI models to coordinated systems of specialized agents that achieve superior results through collaboration.",
    author: "Karl Bagzhan",
    date: "2024-12-20",
    readTime: "8 min",
    category: "Research",
    featured: true,
    image: "/api/placeholder/600/400"
  },
  {
    id: 2,
    title: "Building Scalable AI Systems: Lessons from 1000+ Deployments",
    excerpt: "Technical deep-dive into our architecture patterns for building resilient, scalable AI systems that can handle enterprise workloads.",
    author: "Engineering Team",
    date: "2024-12-18",
    readTime: "12 min",
    category: "Engineering",
    featured: false,
    image: "/api/placeholder/600/400"
  },
  {
    id: 3,
    title: "DeepSeek vs GPT-4: A Comparative Analysis for Enterprise Use",
    excerpt: "Comprehensive benchmarking study comparing leading AI models across various enterprise use cases and performance metrics.",
    author: "Research Team",
    date: "2024-12-15",
    readTime: "10 min",
    category: "Analysis",
    featured: false,
    image: "/api/placeholder/600/400"
  },
  {
    id: 4,
    title: "The Ant Colony Algorithm: Nature's Inspiration for AI Coordination",
    excerpt: "How we drew inspiration from ant colony behavior to design our revolutionary AI coordination system.",
    author: "Karl Alizhan",
    date: "2024-12-12",
    readTime: "6 min",
    category: "Research",
    featured: false,
    image: "/api/placeholder/600/400"
  },
  {
    id: 5,
    title: "Security in the Age of Collective AI: Best Practices",
    excerpt: "Essential security considerations when deploying multiple AI agents in enterprise environments.",
    author: "Security Team",
    date: "2024-12-10",
    readTime: "9 min",
    category: "Security",
    featured: false,
    image: "/api/placeholder/600/400"
  },
  {
    id: 6,
    title: "Real-time AI: The Power of Streaming Inference",
    excerpt: "Exploring the technical implementation of real-time AI inference and its applications in modern business.",
    author: "Engineering Team",
    date: "2024-12-08",
    readTime: "7 min",
    category: "Engineering",
    featured: false,
    image: "/api/placeholder/600/400"
  }
]

const categories = [
  { name: "All", count: blogPosts.length },
  { name: "Research", count: 2 },
  { name: "Engineering", count: 2 },
  { name: "Analysis", count: 1 },
  { name: "Security", count: 1 }
]

export default function BlogPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const featuredPost = blogPosts.find(post => post.featured)
  const regularPosts = filteredPosts.filter(post => !post.featured)

  return (
    <>
      <Navigation />
      <main className="py-20 sm:py-32">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-auto max-w-4xl text-center mb-16"
          >
            <Badge className="mb-6">Blog & Research</Badge>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6">
              Insights on
              <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                {" "}Collective Intelligence
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Deep dives into AI research, engineering best practices, and the future of coordinated AI systems.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-12"
          >
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2 flex-wrap">
                {categories.map((category) => (
                  <Button
                    key={category.name}
                    variant={selectedCategory === category.name ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category.name)}
                  >
                    {category.name} ({category.count})
                  </Button>
                ))}
              </div>
            </div>
          </motion.div>

          {featuredPost && selectedCategory === "All" && searchTerm === "" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-16"
            >
              <Card className="overflow-hidden">
                <div className="md:flex">
                  <div className="md:w-2/3 p-8">
                    <div className="flex items-center gap-2 mb-4">
                      <Badge variant="secondary">Featured</Badge>
                      <Badge variant="outline">{featuredPost.category}</Badge>
                    </div>
                    <h2 className="text-2xl font-bold mb-4 hover:text-primary transition-colors">
                      <Link href={`/blog/${featuredPost.id}`}>
                        {featuredPost.title}
                      </Link>
                    </h2>
                    <p className="text-muted-foreground mb-6">{featuredPost.excerpt}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                      <div className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        {featuredPost.author}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {new Date(featuredPost.date).toLocaleDateString()}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {featuredPost.readTime}
                      </div>
                    </div>
                    <Button asChild>
                      <Link href={`/blog/${featuredPost.id}`}>
                        Read Article <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                  <div className="md:w-1/3 bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                    <Brain className="h-24 w-24 text-primary/20" />
                  </div>
                </div>
              </Card>
            </motion.div>
          )}

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-all duration-300 group cursor-pointer">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="outline">{post.category}</Badge>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {post.readTime}
                      </div>
                    </div>
                    <CardTitle className="line-clamp-2 group-hover:text-primary transition-colors">
                      <Link href={`/blog/${post.id}`}>
                        {post.title}
                      </Link>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4 line-clamp-3">{post.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <User className="h-3 w-3" />
                        <span className="truncate">{post.author}</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        {new Date(post.date).toLocaleDateString()}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {regularPosts.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <p className="text-muted-foreground">No articles found matching your criteria.</p>
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-20 text-center"
          >
            <h3 className="text-2xl font-bold mb-4">Stay updated with our research</h3>
            <p className="text-muted-foreground mb-6">
              Get the latest insights on collective intelligence delivered to your inbox.
            </p>
            <Button size="lg" className="rounded-full" asChild>
              <Link href="#waitlist">
                Subscribe to Newsletter <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </main>
    </>
  )
}
