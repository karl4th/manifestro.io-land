"use client"

import { useEffect, useState, use } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Save, Eye } from "lucide-react"
import Link from "next/link"

interface BlogPost {
  id: string
  title: string
  slug: string
  content: string
  excerpt: string
  status: "draft" | "published"
  date: string
  views?: number
}

export default function EditBlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const router = useRouter()
  const [post, setPost] = useState<BlogPost | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const resolvedParams = use(params)

  useEffect(() => {
    // Load blog post from localStorage
    const blogPosts = JSON.parse(localStorage.getItem("blogPosts") || "[]")
    const foundPost = blogPosts.find((p: BlogPost) => p.slug === resolvedParams.slug)
    
    if (foundPost) {
      setPost(foundPost)
    } else {
      router.push("/admin/blog")
    }
    setIsLoading(false)
  }, [resolvedParams.slug, router])

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
  }

  const handleSave = () => {
    if (!post) return

    // Generate new slug from title
    const newSlug = generateSlug(post.title || 'untitled')
    const updatedPost = { ...post, slug: newSlug }

    const blogPosts = JSON.parse(localStorage.getItem("blogPosts") || "[]")
    const updatedPosts = blogPosts.map((p: BlogPost) => 
      p.slug === resolvedParams.slug ? updatedPost : p
    )
    
    localStorage.setItem("blogPosts", JSON.stringify(updatedPosts))
    router.push("/admin/blog")
  }

  const handleDelete = () => {
    if (!post) return

    if (confirm("Are you sure you want to delete this post?")) {
      const blogPosts = JSON.parse(localStorage.getItem("blogPosts") || "[]")
      const updatedPosts = blogPosts.filter((p: BlogPost) => p.slug !== resolvedParams.slug)
      
      localStorage.setItem("blogPosts", JSON.stringify(updatedPosts))
      router.push("/admin/blog")
    }
  }

  if (isLoading) {
    return <div className="p-8">Loading...</div>
  }

  if (!post) {
    return <div className="p-8">Post not found</div>
  }

  return (
    <div className="p-8  mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Link href="/admin/blog">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Blog
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold">Edit Blog Post</h1>
            <p className="text-muted-foreground">Make changes to your blog post</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Link href={`/blog/${post.slug}`} target="_blank">
            <Button variant="outline">
              <Eye className="h-4 w-4 mr-2" />
              Preview
            </Button>
          </Link>
          <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Post Details</CardTitle>
          <CardDescription>Edit the content and settings of your blog post</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={post.title}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const newTitle = e.target.value
                  const newSlug = generateSlug(newTitle || 'untitled')
                  setPost({ ...post, title: newTitle, slug: newSlug })
                }}
                placeholder="Enter post title"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="slug">Slug (auto-generated from title)</Label>
              <Input
                id="slug"
                value={post.slug}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPost({ ...post, slug: e.target.value })}
                placeholder="url-friendly-slug"
                className="bg-muted"
              />
              <p className="text-xs text-muted-foreground">
                URL: /blog/{post.slug}
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="excerpt">Excerpt</Label>
            <Textarea
              id="excerpt"
              value={post.excerpt}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setPost({ ...post, excerpt: e.target.value })}
              placeholder="Brief description of the post"
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              value={post.content}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setPost({ ...post, content: e.target.value })}
              placeholder="Write your blog post content here..."
              rows={20}
            />
          </div>

          <div className="flex items-center justify-between pt-4">
            <div className="flex items-center gap-4">
              <Label htmlFor="status">Status:</Label>
              <select
                id="status"
                value={post.status}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setPost({ ...post, status: e.target.value as "draft" | "published" })}
                className="px-3 py-2 border rounded-md"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>
            <Button variant="destructive" onClick={handleDelete}>
              Delete Post
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
