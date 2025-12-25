"use client"

import { useEffect, useState, use } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Calendar, Eye, Edit } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"

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
  tags?: string[]
}

// Mock blog posts data
const mockPosts = [
  {
    id: "1",
    title: "The Future of Collective Intelligence: How AI Agents Work Together",
    slug: "the-future-of-collective-intelligence-how-ai-agents-work-together",
    excerpt: "Exploring the paradigm shift from single AI models to coordinated systems of specialized agents that achieve superior results through collaboration.",
    content: `# The Future of Collective Intelligence

The landscape of artificial intelligence is undergoing a fundamental transformation. We're moving beyond the era of monolithic AI models toward sophisticated ecosystems of specialized agents that collaborate to solve complex problems.

## The Paradigm Shift

Traditional AI systems operate in isolation, processing inputs and generating outputs without the benefit of collaborative intelligence. This approach, while effective for specific tasks, falls short when dealing with the multifaceted challenges of real-world applications.

Collective intelligence represents a new frontier where multiple AI agents work together, each contributing their specialized capabilities to achieve outcomes that surpass what any individual agent could accomplish alone.

## Key Principles of Agent Collaboration

### 1. Specialization and Division of Labor
Just as human teams benefit from diverse expertise, AI agent systems thrive when each agent focuses on specific domains. A research agent might excel at information gathering, while an analysis agent specializes in pattern recognition, and a synthesis agent combines insights into actionable recommendations.

### 2. Dynamic Communication Protocols
Effective collaboration requires sophisticated communication mechanisms. Agents must share context, negotiate priorities, and coordinate actions in real-time. Our research has shown that implementing structured communication protocols increases system efficiency by up to 300%.

### 3. Emergent Problem-Solving
When agents collaborate effectively, they exhibit emergent behaviors that weren't explicitly programmed. These emergent properties often lead to innovative solutions that individual agents couldn't conceive.

## Real-World Applications

We've successfully deployed collective intelligence systems across various domains:

- **Financial Analysis**: Teams of agents analyze market data, assess risks, and generate investment strategies
- **Scientific Research**: Collaborative agents accelerate literature reviews, hypothesis generation, and experimental design
- **Customer Service**: Specialized agents handle different aspects of customer interactions, from initial triage to complex problem resolution

## The Road Ahead

The future of AI lies not in building larger, more powerful individual models, but in creating sophisticated networks of specialized agents that can adapt, learn, and evolve together. This approach promises more robust, efficient, and capable AI systems that can tackle the complex challenges of tomorrow.

As we continue to refine these systems, we're seeing unprecedented levels of performance and reliability that point toward a future where human-AI collaboration reaches new heights of effectiveness.`,
    author: "Karl Bagzhan",
    date: "2024-12-20",
    status: "published" as const,
    views: 1247,
    category: "Research",
    tags: ["AI", "Collective Intelligence", "Multi-Agent Systems"]
  },
  {
    id: "2",
    title: "Building Scalable AI Systems: Lessons from 1000+ Deployments",
    slug: "building-scalable-ai-systems-lessons-from-1000-deployments",
    excerpt: "Technical deep-dive into our architecture patterns for building resilient, scalable AI systems that can handle enterprise workloads.",
    content: `# Building Scalable AI Systems: Lessons from 1000+ Deployments

Over the past three years, we've deployed AI systems across more than 1000 enterprise environments. Each deployment taught us valuable lessons about scalability, reliability, and performance optimization.

## Architecture Fundamentals

### Microservices Architecture
Breaking AI systems into microservices provides several advantages:
- **Independent scaling**: Different components can scale based on demand
- **Fault isolation**: Issues in one service don't cascade to others
- **Technology diversity**: Each service can use the most appropriate technology stack

### Event-Driven Communication
Asynchronous, event-driven communication patterns have proven essential for scalable AI systems. This approach allows for:
- Better resource utilization
- Improved system responsiveness
- Natural load balancing

## Performance Optimization Strategies

### 1. Model Optimization
- **Quantization**: Reducing model precision while maintaining accuracy
- **Pruning**: Removing unnecessary neural network connections
- **Distillation**: Creating smaller models that mimic larger ones

### 2. Infrastructure Optimization
- **GPU utilization**: Maximizing compute resource efficiency
- **Memory management**: Optimizing memory usage patterns
- **Network optimization**: Minimizing data transfer overhead

### 3. Caching Strategies
Intelligent caching at multiple levels:
- Model inference results
- Preprocessed data
- Intermediate computations

## Monitoring and Observability

Comprehensive monitoring is crucial for production AI systems:

### Key Metrics
- **Inference latency**: Response time for predictions
- **Throughput**: Requests processed per second
- **Accuracy drift**: Model performance over time
- **Resource utilization**: CPU, GPU, and memory usage

### Alerting Systems
Proactive alerting helps prevent issues before they impact users:
- Performance degradation alerts
- Accuracy threshold violations
- Resource exhaustion warnings

## Deployment Patterns

### Blue-Green Deployments
Maintaining two identical production environments allows for:
- Zero-downtime deployments
- Quick rollback capabilities
- A/B testing opportunities

### Canary Releases
Gradual rollouts help identify issues early:
- Deploy to small user subset first
- Monitor key metrics closely
- Gradually increase traffic to new version

## Lessons Learned

After 1000+ deployments, several patterns have emerged:

1. **Start simple**: Begin with basic architectures and add complexity as needed
2. **Monitor everything**: Comprehensive observability is non-negotiable
3. **Plan for failure**: Systems will fail; design for graceful degradation
4. **Automate operations**: Manual processes don't scale
5. **Invest in tooling**: Good tools pay dividends over time

## Conclusion

Building scalable AI systems requires careful attention to architecture, performance, and operations. The lessons learned from our deployments continue to inform our approach to new challenges in the rapidly evolving AI landscape.`,
    author: "Engineering Team",
    date: "2024-12-18",
    status: "published" as const,
    views: 892,
    category: "Engineering",
    tags: ["Scalability", "Architecture", "DevOps", "Performance"]
  }
]

export default function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params)
  const [post, setPost] = useState<BlogPost | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // First try to find in localStorage
    const blogPosts = JSON.parse(localStorage.getItem("blogPosts") || "[]")
    let foundPost = blogPosts.find((p: BlogPost) => p.slug === resolvedParams.slug && p.status === "published")
    
    // If not found in localStorage, check mock data
    if (!foundPost) {
      foundPost = mockPosts.find(p => p.slug === resolvedParams.slug)
    }
    
    if (foundPost) {
      // Increment views
      foundPost.views = (foundPost.views || 0) + 1
      
      // Update views in localStorage if it exists there
      if (blogPosts.some((p: BlogPost) => p.slug === resolvedParams.slug)) {
        const updatedPosts = blogPosts.map((p: BlogPost) => 
          p.id === foundPost.id ? foundPost : p
        )
        localStorage.setItem("blogPosts", JSON.stringify(updatedPosts))
      }
      
      setPost(foundPost)
    }
    
    setIsLoading(false)
  }, [resolvedParams.slug])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="max-w-md w-full">
          <CardHeader className="text-center">
            <h1 className="text-2xl font-bold">Post Not Found</h1>
            <p className="text-muted-foreground">The blog post you're looking for doesn't exist.</p>
          </CardHeader>
          <CardContent className="text-center">
            <Link href="/blog">
              <Button>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Blog
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-black text-white">
        {/* Hero Section */}
      <div className="py-20 sm:py-32">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link href="/blog" className="inline-flex items-center text-sm text-muted-foreground hover:text-white mb-8 transition-colors">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Blog
            </Link>
            
            <div className="max-w-4xl mx-auto text-center">
              <Badge variant="outline" className="mb-6 border-white/20 text-white">
                {post.category}
              </Badge>
              
              <h1 className="text-4xl md:text-6xl font-bold mb-8 leading-tight bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                {post.title}
              </h1>
              
              <div className="flex items-center justify-center gap-6 text-muted-foreground mb-8">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  {new Date(post.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric"
                  })}
                </div>
                <div className="flex items-center gap-2">
                  <Eye className="h-4 w-4" />
                  {post.views} views
                </div>
                <span>By {post.author}</span>
              </div>
              
              {post.tags && post.tags.length > 0 && (
                <div className="flex gap-2 justify-center mb-8">
                  {post.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="bg-white/10 text-white border-white/20">
                      #{tag}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
            <CardContent className="p-8 md:p-12">
              <div className="prose prose-lg max-w-none">
                <div 
                  className="markdown-content space-y-6"
                  dangerouslySetInnerHTML={{ 
                    __html: post.content
                      .replace(/^# (.*$)/gm, '<h1 class="text-3xl font-bold mb-6 mt-8 text-white">$1</h1>')
                      .replace(/^## (.*$)/gm, '<h2 class="text-2xl font-bold mb-4 mt-8 text-white">$1</h2>')
                      .replace(/^### (.*$)/gm, '<h3 class="text-xl font-semibold mb-3 mt-6 text-white">$1</h3>')
                      .replace(/^- (.*$)/gm, '<li class="mb-2 ml-4 list-disc text-white/80">$1</li>')
                      .replace(/^\d+\. (.*$)/gm, '<li class="mb-2 ml-4 list-decimal text-white/80">$1</li>')
                      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-white">$1</strong>')
                      .replace(/\*(.*?)\*/g, '<em class="italic text-white/90">$1</em>')
                      .replace(/`(.*?)`/g, '<code class="bg-white/10 px-2 py-1 rounded text-sm font-mono text-white border border-white/20">$1</code>')
                      .split('\n\n')
                      .map(paragraph => {
                        if (paragraph.startsWith('<h') || paragraph.startsWith('<li')) {
                          return paragraph;
                        }
                        if (paragraph.trim() === '') return '';
                        return `<p class="mb-6 text-white/80 leading-relaxed text-lg">${paragraph}</p>`;
                      })
                      .join('')
                  }} 
                />
              </div>
            </CardContent>
          </Card>
          
          {/* Edit Button for Admin */}
          {typeof window !== 'undefined' && window.location.pathname.startsWith('/admin') && (
            <div className="mt-8 text-center">
              <Link href={`/admin/blog/${post.slug}/edit`}>
                <Button variant="outline">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Post
                </Button>
              </Link>
            </div>
          )}
        </motion.div>

        {/* Read More Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="max-w-4xl mx-auto mt-16"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Read More</h2>
            <p className="text-white/60">Related articles you might find interesting</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {mockPosts.filter(p => p.slug !== post.slug).slice(0, 2).map((relatedPost) => (
              <Card key={relatedPost.id} className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors">
                <CardContent className="p-6">
                  <Badge variant="outline" className="mb-3 border-white/20 text-white/80">
                    {relatedPost.category}
                  </Badge>
                  <h3 className="text-xl font-bold mb-3 text-white">
                    <Link href={`/blog/${relatedPost.slug}`} className="hover:text-white/80 transition-colors">
                      {relatedPost.title}
                    </Link>
                  </h3>
                  <p className="text-white/60 mb-4 line-clamp-3">{relatedPost.excerpt}</p>
                  <div className="flex items-center gap-4 text-sm text-white/50">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {new Date(relatedPost.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="h-3 w-3" />
                      {relatedPost.views}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>
      </div>
      <Footer />
    </div>
    </>
  )
}
