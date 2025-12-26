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
import { articlesApi, categoriesApi, tagsApi, type ArticleCreate, type Category, type Tag } from "@/lib/api"
import { useToast } from "@/hooks/use-toast"

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
  const [post, setPost] = useState<Partial<ArticleCreate>>({
    title: "",
    excerpt: "",
    content: "",
    category_id: "",
    tag_ids: []
  })
  const [status, setStatus] = useState<"published" | "draft">("draft")
  const [tagInput, setTagInput] = useState("")
  const [isSaving, setIsSaving] = useState(false)
  const [saveMessage, setSaveMessage] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const [categories, setCategories] = useState<Category[]>([])
  const [tags, setTags] = useState<Tag[]>([])
  const [selectedTags, setSelectedTags] = useState<Tag[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const [categoriesRes, tagsRes] = await Promise.all([
        categoriesApi.getCategories(),
        tagsApi.getTags()
      ])

      if (categoriesRes.data) {
        setCategories((categoriesRes.data as any).items || [])
      }
      if (tagsRes.data) {
        setTags((tagsRes.data as any).items || [])
      }
    } catch (error) {
      console.error('Failed to load data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSave = async (status: "published" | "draft") => {
    setIsSaving(true)
    setSaveMessage("")
    setErrorMessage("")
    
    try {
      // Generate slug from title if not provided
      const slug = post.slug || (post.title || "untitled")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')

      const articleData: ArticleCreate = {
        title: post.title || "Untitled",
        slug,
        excerpt: post.excerpt || "",
        content: post.content || "",
        category_id: post.category_id || "",
        tag_ids: selectedTags.map(tag => tag.id)
      }

      const response = await articlesApi.createArticle(articleData)
      
      if (response.error) {
        setErrorMessage(response.error)
        toast({
          title: "Error creating article",
          description: response.error,
          variant: "destructive"
        })
        return
      }

      const message = `Post ${status === "published" ? "published" : "saved as draft"} successfully!`
      setSaveMessage(message)
      toast({
        title: "Success",
        description: message
      })
      
      if (status === "published") {
        setTimeout(() => router.push("/admin/blog"), 1000)
      }
    } catch (error) {
      setErrorMessage("An unexpected error occurred. Please try again.")
      console.error('Save error:', error)
    } finally {
      setIsSaving(false)
    }
  }

  const addTag = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && tagInput.trim()) {
      e.preventDefault()
      const existingTag = tags.find(tag => 
        tag.name.toLowerCase() === tagInput.trim().toLowerCase()
      )
      
      if (existingTag && !selectedTags.find(t => t.id === existingTag.id)) {
        setSelectedTags(prev => [...prev, existingTag])
      }
      
      setTagInput("")
    }
  }

  const removeTag = (tagToRemove: Tag) => {
    setSelectedTags(prev => prev.filter(tag => tag.id !== tagToRemove.id))
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

      {errorMessage && (
        <Alert variant="destructive">
          <AlertDescription>{errorMessage}</AlertDescription>
        </Alert>
      )}

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      ) : (
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
                  value="Admin User"
                  disabled
                  className="bg-muted"
                />
              </div>

              <div>
                <Label>Category</Label>
                <Select 
                  value={post.category_id} 
                  onValueChange={(value) => setPost(prev => ({ ...prev, category_id: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(category => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
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
                  {selectedTags.map(tag => (
                    <Badge key={tag.id} variant="secondary" className="cursor-pointer">
                      {tag.name}
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
                    variant={status === "draft" ? "default" : "secondary"}
                    className="cursor-pointer"
                    onClick={() => setStatus("draft")}
                  >
                    Draft
                  </Badge>
                  <Badge 
                    variant={status === "published" ? "default" : "secondary"}
                    className="cursor-pointer"
                    onClick={() => setStatus("published")}
                  >
                    Published
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      )}
    </div>
  )
}
