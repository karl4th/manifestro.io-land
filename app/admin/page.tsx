"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  FileText, 
  Users,
  TrendingUp,
  Eye,
  Edit,
  Plus,
  Calendar,
  Clock,
  Mail
} from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

interface ContentItem {
  id: string
  title: string
  type: "blog" | "waitlist"
  status: "published" | "draft" | "pending" | "invited" | "joined"
  date: string
  views?: number
}

export default function AdminDashboard() {
  const [recentContent, setRecentContent] = useState<ContentItem[]>([])
  const [stats, setStats] = useState({
    totalBlog: 0,
    totalWaitlist: 0,
    totalViews: 0,
    recentSignups: 0
  })

  useEffect(() => {
    // Load data from localStorage
    const blogPosts = JSON.parse(localStorage.getItem("blogPosts") || "[]")
    const waitlist = JSON.parse(localStorage.getItem("waitlist") || "[]")

    // Calculate recent signups (last 7 days)
    const sevenDaysAgo = new Date()
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)
    const recentSignups = waitlist.filter((entry: any) => 
      new Date(entry.date) > sevenDaysAgo
    ).length

    setStats({
      totalBlog: blogPosts.length,
      totalWaitlist: waitlist.length,
      totalViews: blogPosts.reduce((acc: number, post: any) => acc + (post.views || 0), 0),
      recentSignups
    })

    // Combine recent content
    const allContent = [
      ...blogPosts.map((item: any) => ({ ...item, type: "blog" as const })),
      ...waitlist.map((item: any) => ({ ...item, type: "waitlist" as const, title: item.email }))
    ]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 5)

    setRecentContent(allContent)
  }, [])

  const statCards = [
    {
      title: "Blog Posts",
      value: stats.totalBlog,
      icon: FileText,
      color: "text-blue-500",
      href: "/admin/blog"
    },
    {
      title: "Waitlist",
      value: stats.totalWaitlist,
      icon: Users,
      color: "text-green-500",
      href: "/admin/waitlist"
    },
    {
      title: "Recent Signups",
      value: stats.recentSignups,
      icon: Calendar,
      color: "text-purple-500",
      description: "Last 7 days"
    },
    {
      title: "Total Views",
      value: stats.totalViews,
      icon: TrendingUp,
      color: "text-orange-500",
      href: "/admin/blog"
    }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          Manage your content and track performance
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            {stat.href ? (
              <Link href={stat.href}>
                <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      {stat.title}
                    </CardTitle>
                    <stat.icon className={`h-4 w-4 ${stat.color}`} />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stat.value}</div>
                  </CardContent>
                </Card>
              </Link>
            ) : (
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {stat.title}
                  </CardTitle>
                  <stat.icon className={`h-4 w-4 ${stat.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  {stat.description && (
                    <p className="text-xs text-muted-foreground mt-1">
                      {stat.description}
                    </p>
                  )}
                </CardContent>
              </Card>
            )}
          </motion.div>
        ))}
      </div>

      {/* Recent Content */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Recent Content</CardTitle>
            <CardDescription>
              Latest blog posts, releases, and research papers
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" asChild>
              <Link href="/admin/blog/new">
                <Plus className="h-4 w-4 mr-2" />
                New Post
              </Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {recentContent.length === 0 ? (
            <div className="text-center py-8">
              <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No content yet</h3>
              <p className="text-muted-foreground mb-4">
                Start by creating your first blog post, release, or research paper.
              </p>
              <div className="flex gap-2 justify-center">
                <Button asChild>
                  <Link href="/admin/blog/new">Create Blog Post</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/admin/releases/new">New Release</Link>
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {recentContent.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-2 rounded-lg bg-muted">
                      {item.type === "blog" && <FileText className="h-5 w-5" />}
                      {item.type === "waitlist" && <Users className="h-5 w-5" />}
                    </div>
                    <div>
                      <h4 className="font-medium">{item.title}</h4>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        {new Date(item.date).toLocaleDateString()}
                        {item.views && (
                          <>
                            <span>•</span>
                            <Eye className="h-3 w-3" />
                            {item.views} views
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge 
                      variant={
                        item.status === "published" ? "default" :
                        item.status === "joined" ? "default" :
                        item.status === "invited" ? "secondary" :
                        "outline"
                      }
                    >
                      {item.status}
                    </Badge>
                    {item.type === "blog" && item.id && (
                      <Button variant="ghost" size="sm" asChild>
                        <Link href={`/admin/blog/${item.id}/edit`}>
                          <Edit className="h-4 w-4" />
                        </Link>
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Blog Posts
            </CardTitle>
            <CardDescription>
              Share news and updates
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full" asChild>
              <Link href="/admin/blog">
                Manage Blog
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              Email Campaign
            </CardTitle>
            <CardDescription>
              Send updates to waitlist
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full" variant="outline">
              Compose Email
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Analytics
            </CardTitle>
            <CardDescription>
              View platform statistics
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full" variant="outline">
              View Analytics
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
