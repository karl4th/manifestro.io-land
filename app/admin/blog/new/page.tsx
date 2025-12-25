"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import RichTextEditor from "@/components/ui/rich-text-editor"
import { Save, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  author: string
  date: string
  status: "published" | "draft"
  views: number
  category: string
  tags: string[]
}

export default function NewBlogPost() {
  const router = useRouter()
  const [post, setPost] = useState<Partial<BlogPost>>({
    title: "",
    excerpt: "",
    content: "",
    author: "Admin User",
    status: "draft",
    category: "",
    tags: []
  })
  const [tagInput, setTagInput] = useState("")
  const [isSaving, setIsSaving] = useState(false)
  const [saveMessage, setSaveMessage] = useState("")
  const [currentUser, setCurrentUser] = useState("Admin User")

  useEffect(() => {
    // In a real app, you'd get the current user from auth context
    // For now, we'll use a simple approach
    const savedUser = localStorage.getItem("adminUser")
    if (savedUser) {
      setCurrentUser(savedUser)
      setPost(prev => ({ ...prev, author: savedUser }))
    }
  }, [])

  const categories = [
    "AI & ML",
    "Product Updates",
    "Company News",
    "Engineering",
    "Research",
    "Tutorials"
  ]

  const handleSave = async (status: "published" | "draft") => {
    setIsSaving(true)
    setSaveMessage("")
    
    // Generate slug from title
    const slug = (post.title || "untitled")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
    
    const newPost: BlogPost = {
      id: Date.now().toString(),
      title: post.title || "Untitled",
      slug: slug || 'untitled',
      excerpt: post.excerpt || "",
      content: post.content || "",
      author: post.author || "Admin User",
      date: new Date().toISOString(),
      status,
      views: 0,
      category: post.category || "Uncategorized",
      tags: post.tags || []
    }

    // Save to localStorage
    const existingPosts = JSON.parse(localStorage.getItem("blogPosts") || "[]")
    const updatedPosts = [newPost, ...existingPosts]
    localStorage.setItem("blogPosts", JSON.stringify(updatedPosts))

    setSaveMessage(`Post ${status === "published" ? "published" : "saved as draft"} successfully!`)
    setIsSaving(false)
    
    if (status === "published") {
      setTimeout(() => router.push("/admin/blog"), 1000)
    }
  }

  const addTag = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && tagInput.trim()) {
      e.preventDefault()
      if (!post.tags?.includes(tagInput.trim())) {
        setPost(prev => ({
          ...prev,
          tags: [...(prev.tags || []), tagInput.trim()]
        }))
      }
      setTagInput("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setPost(prev => ({
      ...prev,
      tags: prev.tags?.filter(tag => tag !== tagToRemove) || []
    }))
  }

  const insertMarkdown = (syntax: string) => {
    const textarea = document.getElementById("content") as HTMLTextAreaElement
    if (textarea) {
      const start = textarea.selectionStart
      const end = textarea.selectionEnd
      const text = textarea.value
      const before = text.substring(0, start)
      const after = text.substring(end)
      
      let insertion = ""
      if (syntax === "link") {
        insertion = "[link text](url)"
      } else if (syntax === "image") {
        insertion = "![alt text](image-url)"
      } else if (syntax === "code") {
        insertion = "```\ncode here\n```"
      } else {
        insertion = syntax
      }
      
      textarea.value = before + insertion + after
      textarea.focus()
      textarea.setSelectionRange(start + insertion.length, start + insertion.length)
      
      setPost(prev => ({ ...prev, content: textarea.value }))
    }
  }

  const renderMarkdownPreview = (content: string) => {
    // Simple markdown preview (in production, use a proper markdown parser)
    return content
      .replace(/^### (.*$)/gim, "<h3>$1</h3>")
      .replace(/^## (.*$)/gim, "<h2>$1</h2>")
      .replace(/^# (.*$)/gim, "<h1>$1</h1>")
      .replace(/\*\*(.*)\*\*/gim, "<strong>$1</strong>")
      .replace(/\*(.*)\*/gim, "<em>$1</em>")
      .replace(/!\[([^\]]*)\]\(([^)]*)\)/gim, "<img alt='$1' src='$2' />")
      .replace(/\[([^\]]*)\]\(([^)]*)\)/gim, "<a href='$2'>$1</a>")
      .replace(/```[\s\S]*?```/g, "<pre><code>$1</code></pre>")
      .replace(/`([^`]*)`/gim, "<code>$1</code>")
      .replace(/^\> (.*$)/gim, "<blockquote>$1</blockquote>")
      .replace(/\n\n/gim, "</p><p>")
      .replace(/\n/gim, "<br>")
      .replace(/^(.*)$/gim, "<p>$1</p>")
  }

  return (
    <div className=" mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/admin/blog">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold">New Blog Post</h1>
            <p className="text-muted-foreground">
              Create a new blog post for your audience
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => handleSave("draft")}
            disabled={isSaving}
          >
            <Save className="h-4 w-4 mr-2" />
            Save Draft
          </Button>
          <Button
            onClick={() => handleSave("published")}
            disabled={isSaving || !post.title || !post.content}
          >
            {isSaving ? "Publishing..." : "Publish"}
          </Button>
        </div>
      </div>

      {saveMessage && (
        <Alert>
          <AlertDescription>{saveMessage}</AlertDescription>
        </Alert>
      )}

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Content</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  placeholder="Enter post title"
                  value={post.title}
                  onChange={(e) => setPost(prev => ({ ...prev, title: e.target.value }))}
                  className="text-lg"
                />
              </div>

              <div>
                <Label htmlFor="excerpt">Excerpt</Label>
                <Textarea
                  id="excerpt"
                  placeholder="Brief description of the post"
                  value={post.excerpt}
                  onChange={(e) => setPost(prev => ({ ...prev, excerpt: e.target.value }))}
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="content">Content</Label>
                <RichTextEditor
                  content={post.content || ""}
                  onChange={(content) => setPost(prev => ({ ...prev, content }))}
                  placeholder="Write your blog post here..."
                  maxLength={10000}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Publication</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Author</Label>
                <Input
                  value={currentUser}
                  disabled
                  className="bg-muted"
                />
              </div>

              <div>
                <Label>Category</Label>
                <Select 
                  value={post.category} 
                  onValueChange={(value) => setPost(prev => ({ ...prev, category: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(category => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Tags</Label>
                <Input
                  placeholder="Press Enter to add tags"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={addTag}
                />
                <div className="flex flex-wrap gap-2 mt-2">
                  {post.tags?.map(tag => (
                    <Badge key={tag} variant="secondary" className="cursor-pointer">
                      {tag}
                      <button
                        onClick={() => removeTag(tag)}
                        className="ml-2 text-xs"
                      >
                        ×
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label>Status</Label>
                <div className="flex gap-2">
                  <Badge 
                    variant={post.status === "draft" ? "default" : "secondary"}
                    className="cursor-pointer"
                    onClick={() => setPost(prev => ({ ...prev, status: "draft" }))}
                  >
                    Draft
                  </Badge>
                  <Badge 
                    variant={post.status === "published" ? "default" : "secondary"}
                    className="cursor-pointer"
                    onClick={() => setPost(prev => ({ ...prev, status: "published" }))}
                  >
                    Published
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
