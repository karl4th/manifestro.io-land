"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Brain, 
  Network, 
  Zap, 
  Shield, 
  Cpu, 
  Globe, 
  ArrowRight, 
  CheckCircle2,
  Play,
  Code,
  Users,
  BarChart3,
  Bot,
  Puzzle
} from "lucide-react"
import Navigation from "@/components/navigation"
import Link from "next/link"
import { motion } from "framer-motion"

const products = [
  {
    name: "Manifestro Platform",
    description: "Cloud-based SaaS for building and managing Collective Intelligence systems",
    icon: Network,
    features: [
      "Visual AI agent builder",
      "10+ pre-built integrations",
      "Real-time collaboration",
      "Analytics dashboard",
      "Version control",
      "Team management"
    ],
    pricing: "From $99/month",
    cta: "Start Free Trial"
  },
  {
    name: "Enterprise Solutions",
    description: "Custom Collective Intelligence systems for enterprise needs",
    icon: Shield,
    features: [
      "On-premise deployment",
      "Custom model training",
      "Dedicated support team",
      "SLA guarantee",
      "Advanced security",
      "Unlimited scalability"
    ],
    pricing: "Custom pricing",
    cta: "Contact Sales"
  },
  {
    name: "API & SDK",
    description: "Programmatic access to Manifestro's Collective Intelligence network",
    icon: Code,
    features: [
      "RESTful API",
      "WebSocket streaming",
      "Python/JS SDKs",
      "Webhooks support",
      "Comprehensive docs",
      "Sandbox environment"
    ],
    pricing: "Pay-as-you-go",
    cta: "View Documentation"
  }
]

const useCases = [
  {
    title: "Sales Automation",
    icon: Users,
    description: "Transform your sales process with AI agents that work together",
    benefits: [
      "300% increase in qualified leads",
      "50% reduction in response time",
      "24/7 automated follow-ups"
    ],
    color: "from-blue-500 to-cyan-500"
  },
  {
    title: "Customer Support",
    icon: Bot,
    description: "Deliver exceptional support with coordinated AI teams",
    benefits: [
      "90% of queries resolved instantly",
      "Multilingual support in 50+ languages",
      "Seamless human handoff when needed"
    ],
    color: "from-purple-500 to-pink-500"
  },
  {
    title: "Data Analysis",
    icon: BarChart3,
    description: "Unlock insights with collective AI analysis",
    benefits: [
      "Real-time data processing",
      "Predictive analytics",
      "Automated report generation"
    ],
    color: "from-orange-500 to-red-500"
  }
]

const integrations = [
  { name: "OpenAI", models: "GPT-4, o1, DALL-E" },
  { name: "Anthropic", models: "Claude 3 Opus, Sonnet, Haiku" },
  { name: "DeepSeek", models: "DeepSeek-V2, Coder" },
  { name: "Google", models: "Gemini 1.5 Pro, Flash" },
  { name: "xAI", models: "Grok-2, Grok-2 Mini" },
  { name: "Moonshot", models: "Moonshot-v1, Kimi" }
]

export default function ProductPage() {
  return (
    <>
      <Navigation />
      <main className="py-20 sm:py-32">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-auto max-w-4xl text-center mb-20"
          >
            <Badge className="mb-6">Our Products</Badge>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6">
              The complete
              <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                {" "}Collective Intelligence
              </span>
              {" "}platform
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              From no-code platform to enterprise solutions, Manifestro provides 
              everything you need to build the future of AI-powered automation.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid lg:grid-cols-3 gap-8 mb-20"
          >
            {products.map((product, index) => (
              <Card key={product.name} className="h-full hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <product.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{product.name}</CardTitle>
                  <CardDescription className="text-base">
                    {product.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <ul className="space-y-2 mb-6">
                    {product.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="space-y-4">
                    <p className="font-semibold">{product.pricing}</p>
                    <Button className="w-full" asChild>
                      <Link href="#waitlist">
                        {product.cta} <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-20"
          >
            <h2 className="text-3xl font-bold text-center mb-12">Use Cases</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {useCases.map((useCase, index) => (
                <Card key={useCase.title} className="overflow-hidden group cursor-pointer">
                  <div className={`h-2 bg-gradient-to-r ${useCase.color}`} />
                  <CardContent className="p-6">
                    <div className={`inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-r ${useCase.color} mb-4`}>
                      <useCase.icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{useCase.title}</h3>
                    <p className="text-muted-foreground mb-4">{useCase.description}</p>
                    <ul className="space-y-2">
                      {useCase.benefits.map((benefit) => (
                        <li key={benefit} className="flex items-center gap-2">
                          <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                          <span className="text-sm">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mb-20"
          >
            <h2 className="text-3xl font-bold text-center mb-12">Powered by Leading AI</h2>
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="all">All Models</TabsTrigger>
                <TabsTrigger value="language">Language</TabsTrigger>
                <TabsTrigger value="code">Code</TabsTrigger>
                <TabsTrigger value="multimodal">Multimodal</TabsTrigger>
              </TabsList>
              <TabsContent value="all" className="mt-6">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {integrations.map((integration) => (
                    <Card key={integration.name} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                          <Brain className="h-5 w-5 text-primary" />
                          <div>
                            <p className="font-semibold">{integration.name}</p>
                            <p className="text-sm text-muted-foreground">{integration.models}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="language" className="mt-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-4">Language Models</h3>
                    <p className="text-muted-foreground">
                      Access the world's most powerful language models including GPT-4, Claude 3, 
                      and Gemini for tasks ranging from simple Q&A to complex reasoning.
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="code" className="mt-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-4">Code Models</h3>
                    <p className="text-muted-foreground">
                      Specialized models for code generation, debugging, and optimization 
                      including DeepSeek Coder and OpenAI's code models.
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="multimodal" className="mt-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-4">Multimodal Models</h3>
                    <p className="text-muted-foreground">
                      Process text, images, audio, and video with models like GPT-4 Vision, 
                      DALL-E, and Gemini 1.5 Pro for comprehensive AI solutions.
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="text-center bg-muted/30 py-16 -mx-4 px-4 sm:mx-0 sm:px-0 rounded-2xl"
          >
            <h2 className="text-3xl font-bold mb-6">Ready to get started?</h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of companies already using Manifestro to build 
              the next generation of AI-powered solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="rounded-full" asChild>
                <Link href="#waitlist">
                  Start Free Trial <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="rounded-full" asChild>
                <Link href="/docs">
                  View Documentation <Code className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </main>
    </>
  )
}
