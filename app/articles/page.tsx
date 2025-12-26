"use client"

import { useEffect, useState } from "react"
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
  Network,
  Eye
} from "lucide-react"
import Navigation from "@/components/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import { articlesApi } from "@/lib/api"
import type { ArticleShortResponse } from "@/lib/types"

export default function ArticlesPage() {
  const [articles, setArticles] = useState<ArticleShortResponse[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    loadArticles()
  }, [currentPage])

  const loadArticles = async () => {
    setIsLoading(true)
    setError("")
    
    try {
      const response = await articlesApi.getArticles(currentPage, 12, "published")
      
      if (response.error) {
        setError(response.error)
        return
      }
      
      if (response.data) {
        const articleList = response.data as any
        setArticles(articleList.articles || [])
        setTotalPages(articleList.total_pages || 1)
      }
    } catch (error) {
      setError("Failed to load articles")
      console.error('Load articles error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const filteredArticles = articles.filter(article => 
    article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    article.excerpt?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const getAuthorName = (article: ArticleShortResponse) => {
    if (article.author) {
      return `${article.author.first_name} ${article.author.last_name}`
    }
    return "Manifestro Team"
  }

  const getCategoryIcon = (categoryName?: string) => {
    switch (categoryName?.toLowerCase()) {
      case 'ai & ml':
      case 'research':
        return <Brain className="h-4 w-4" />
      case 'engineering':
        return <Cpu className="h-4 w-4" />
      case 'product updates':
        return <TrendingUp className="h-4 w-4" />
      default:
        return <Network className="h-4 w-4" />
    }
  }

  const featuredArticles = filteredArticles.slice(0, 3)
  const regularArticles = filteredArticles.slice(3)

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Insights & Research
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Explore the latest in AI, collective intelligence, and enterprise technology from our research team.
            </p>
          </motion.div>
        </div>

        {error && (
          <Card className="mb-8 border-red-200 bg-red-50">
            <CardContent className="pt-6">
              <p className="text-red-600">{error}</p>
            </CardContent>
          </Card>
        )}

        {/* Search */}
        <div className="max-w-md mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : filteredArticles.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-lg font-semibold mb-2">No articles found</h3>
            <p className="text-muted-foreground">
              {searchTerm ? "Try adjusting your search terms" : "Check back later for new content"}
            </p>
          </div>
        ) : (
          <>
            {/* Featured Articles */}
            {featuredArticles.length > 0 && (
              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-6">Featured Articles</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {featuredArticles.map((article, index) => (
                    <motion.div
                      key={article.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card className="h-full hover:shadow-lg transition-shadow">
                        <CardHeader>
                          <div className="flex items-center gap-2 mb-2">
                            {getCategoryIcon(article.category?.name)}
                            <Badge variant="secondary" className="text-xs">
                              {article.category?.name || "Article"}
                            </Badge>
                          </div>
                          <CardTitle className="line-clamp-2">
                            <Link href={`/articles/${article.slug}`} className="hover:text-primary">
                              {article.title}
                            </Link>
                          </CardTitle>
                          <CardDescription className="line-clamp-3">
                            {article.excerpt}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center justify-between text-sm text-muted-foreground">
                            <div className="flex items-center gap-4">
                              <div className="flex items-center gap-1">
                                <User className="h-3 w-3" />
                                {getAuthorName(article)}
                              </div>
                              <div className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                {formatDate(article.created_at)}
                              </div>
                            </div>
                            
                          </div>
                          <div className="mt-4">
                            <Button variant="ghost" size="sm" asChild>
                              <Link href={`/articles/${article.slug}`}>
                                Read More
                                <ArrowRight className="h-4 w-4 ml-2" />
                              </Link>
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Regular Articles */}
            {regularArticles.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Latest Articles</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {regularArticles.map((article, index) => (
                    <motion.div
                      key={article.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: (index + featuredArticles.length) * 0.1 }}
                    >
                      <Card className="h-full hover:shadow-lg transition-shadow">
                        <CardHeader>
                          <div className="flex items-center gap-2 mb-2">
                            {getCategoryIcon(article.category?.name)}
                            <Badge variant="secondary" className="text-xs">
                              {article.category?.name || "Article"}
                            </Badge>
                          </div>
                          <CardTitle className="line-clamp-2">
                            <Link href={`/articles/${article.slug}`} className="hover:text-primary">
                              {article.title}
                            </Link>
                          </CardTitle>
                          <CardDescription className="line-clamp-3">
                            {article.excerpt}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center justify-between text-sm text-muted-foreground">
                            <div className="flex items-center gap-4">
                              <div className="flex items-center gap-1">
                                <User className="h-3 w-3" />
                                {getAuthorName(article)}
                              </div>
                              <div className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                {formatDate(article.created_at)}
                              </div>
                            </div>
                            <div className="flex items-center gap-1">
                              <Eye className="h-3 w-3" />
                              {article.view_count || 0}
                            </div>
                          </div>
                          <div className="mt-4">
                            <Button variant="ghost" size="sm" asChild>
                              <Link href={`/articles/${article.slug}`}>
                                Read More
                                <ArrowRight className="h-4 w-4 ml-2" />
                              </Link>
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-12">
                <Button
                  variant="outline"
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>
                <span className="text-sm text-muted-foreground">
                  Page {currentPage} of {totalPages}
                </span>
                <Button
                  variant="outline"
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                >
                  Next
                </Button>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  )
}
