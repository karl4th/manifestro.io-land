"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Code, BookOpen, Zap, ArrowRight, ExternalLink, Github } from "lucide-react"
import Navigation from "@/components/navigation"
import Link from "next/link"
import { useState } from "react"
import { motion } from "framer-motion"

const docs = [
  {
    category: "Getting Started",
    items: [
      { title: "Quick Start", description: "Get up and running in 5 minutes", href: "/docs/quickstart" },
      { title: "Authentication", description: "Secure API authentication methods", href: "/docs/auth" },
      { title: "SDK Installation", description: "Install and configure our SDKs", href: "/docs/sdk" }
    ]
  },
  {
    category: "API Reference",
    items: [
      { title: "REST API", description: "Complete REST API documentation", href: "/docs/api" },
      { title: "WebSocket API", description: "Real-time streaming API", href: "/docs/websocket" },
      { title: "Rate Limits", description: "API rate limiting and quotas", href: "/docs/rate-limits" }
    ]
  },
  {
    category: "Guides",
    items: [
      { title: "Creating AI Agents", description: "Build your first collective AI system", href: "/docs/agents" },
      { title: "Model Integration", description: "Connect multiple AI models", href: "/docs/models" },
      { title: "Best Practices", description: "Tips for optimal performance", href: "/docs/best-practices" }
    ]
  }
]

const examples = [
  { language: "Python", code: "from manifestro import Manifestro\nclient = Manifestro(api_key='your-key')\nresult = client.collective_run(prompt='Analyze data')" },
  { language: "JavaScript", code: "import { Manifestro } from '@manifestro/js';\nconst client = new Manifestro('your-key');\nconst result = await client.collective('Analyze data');" },
  { language: "cURL", code: "curl -X POST https://api.manifestro.io/v1/collective \\\n  -H 'Authorization: Bearer your-key' \\\n  -d '{\"prompt\": \"Analyze data\"}'" }
]

export default function DocsPage() {
  const [searchTerm, setSearchTerm] = useState("")

  return (
    <>
      <Navigation />
      <main className="py-20 sm:py-32">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-auto max-w-4xl text-center mb-12"
          >
            <Badge className="mb-6">Documentation</Badge>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6">
              Everything you need to
              <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                {" "}build with AI
              </span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Comprehensive documentation to help you integrate Collective Intelligence into your applications
            </p>
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search documentation..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </motion.div>

          <div className="grid lg:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-1"
            >
              <Card className="sticky top-20">
                <CardHeader>
                  <CardTitle className="text-lg">Quick Links</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button variant="ghost" className="w-full justify-start" asChild>
                    <Link href="/docs/quickstart">
                      <Zap className="mr-2 h-4 w-4" />
                      Quick Start
                    </Link>
                  </Button>
                  <Button variant="ghost" className="w-full justify-start" asChild>
                    <Link href="/docs/api">
                      <Code className="mr-2 h-4 w-4" />
                      API Reference
                    </Link>
                  </Button>
                  <Button variant="ghost" className="w-full justify-start" asChild>
                    <Link href="https://github.com/manifestro" target="_blank">
                      <Github className="mr-2 h-4 w-4" />
                      GitHub
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="lg:col-span-3 space-y-12"
            >
              {docs.map((section, index) => (
                <div key={section.category}>
                  <h2 className="text-2xl font-bold mb-6">{section.category}</h2>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {section.items.map((item) => (
                      <Card key={item.title} className="hover:shadow-lg transition-shadow cursor-pointer">
                        <CardHeader>
                          <CardTitle className="text-lg">{item.title}</CardTitle>
                          <CardDescription>{item.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <Button variant="ghost" size="sm" asChild>
                            <Link href={item.href}>
                              Read more <ArrowRight className="ml-1 h-3 w-3" />
                            </Link>
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              ))}

              <div>
                <h2 className="text-2xl font-bold mb-6">Code Examples</h2>
                <Tabs defaultValue="python" className="w-full">
                  <TabsList>
                    <TabsTrigger value="python">Python</TabsTrigger>
                    <TabsTrigger value="javascript">JavaScript</TabsTrigger>
                    <TabsTrigger value="curl">cURL</TabsTrigger>
                  </TabsList>
                  {examples.map((example) => (
                    <TabsContent key={example.language} value={example.language.toLowerCase()}>
                      <Card>
                        <CardContent className="p-6">
                          <pre className="text-sm overflow-x-auto">
                            <code>{example.code}</code>
                          </pre>
                        </CardContent>
                      </Card>
                    </TabsContent>
                  ))}
                </Tabs>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-20 text-center"
          >
            <h3 className="text-2xl font-bold mb-4">Need help?</h3>
            <p className="text-muted-foreground mb-6">
              Our support team is here to help you succeed
            </p>
            <div className="flex gap-4 justify-center">
              <Button variant="outline" asChild>
                <Link href="/contact">Contact Support</Link>
              </Button>
              <Button asChild>
                <Link href="https://discord.gg/manifestro" target="_blank">
                  Join Discord <ExternalLink className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </main>
    </>
  )
}
