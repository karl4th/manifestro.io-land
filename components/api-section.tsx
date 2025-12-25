"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Code2, 
  Copy, 
  Play, 
  Check, 
  Zap, 
  Shield, 
  Globe,
  ArrowRight,
  Terminal,
  Sparkles,
  Puzzle
} from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"

const codeExamples = {
  connect: `// Connect a custom channel
const manifestro = new Manifestro({
  apiKey: process.env.MANIFESTRO_API_KEY
});

const customChannel = await manifestro.createChannel({
  type: "custom",
  name: "My CRM",
  webhook: "https://my-crm.com/webhook",
  events: ["message.received", "user.joined"]
});

console.log("Channel ID:", customChannel.id);`,

  agent: `// Create an AI agent
const agent = await manifestro.createAgent({
  name: "Sales Assistant",
  model: "gpt-4-turbo",
  instructions: "You are a helpful sales assistant...",
  channels: ["whatsapp", "telegram", "custom_crm"],
  tools: ["calendar", "crm", "payment"]
});

// Deploy to all channels
await agent.deploy();`,

  webhook: `// Handle incoming webhooks
app.post('/webhook/manifestro', (req, res) => {
  const { event, data } = req.body;
  
  if (event === 'message.received') {
    // Process message
    manifestro.processMessage(data);
  }
  
  res.status(200).send('OK');
});`
}

export default function ApiSection() {
  const [copied, setCopied] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("connect")

  const copyToClipboard = async (text: string, key: string) => {
    await navigator.clipboard.writeText(text)
    setCopied(key)
    setTimeout(() => setCopied(null), 2000)
  }

  return (
    <section className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-primary/5" />
      <div className="container relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-3xl text-center mb-16"
        >
          <Badge className="mb-6 text-sm">
            <Code2 className="mr-2 h-4 w-4" />
            Developer First
          </Badge>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6">
            Build custom
            <span className="text-foreground block">
              channels with our API
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Full API access for custom integrations. Connect any platform, 
            build custom workflows, and extend Manifestro's capabilities.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="connect">Connect</TabsTrigger>
                <TabsTrigger value="agent">Create Agent</TabsTrigger>
                <TabsTrigger value="webhook">Webhooks</TabsTrigger>
              </TabsList>
              
              {Object.entries(codeExamples).map(([key, code]) => (
                <TabsContent key={key} value={key} className="relative">
                  <Card className="border-0 shadow-2xl bg-background/80 backdrop-blur">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Terminal className="h-4 w-4 text-primary" />
                          <span className="text-sm font-mono text-muted-foreground">
                            {key === 'connect' ? 'connect.js' : key === 'agent' ? 'agent.js' : 'webhook.js'}
                          </span>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard(code, key)}
                          className="text-xs"
                        >
                          {copied === key ? (
                            <Check className="h-3 w-3 text-green-500" />
                          ) : (
                            <Copy className="h-3 w-3" />
                          )}
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <pre className="text-sm overflow-x-auto">
                        <code className="text-muted-foreground font-mono">
                          {code}
                        </code>
                      </pre>
                    </CardContent>
                  </Card>
                </TabsContent>
              ))}
            </Tabs>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Zap className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle>Lightning Fast</CardTitle>
                </div>
                <CardDescription>
                  RESTful API with sub-100ms response times. 
                  Built for scale and reliability.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Shield className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle>Enterprise Security</CardTitle>
                </div>
                <CardDescription>
                  OAuth 2.0, API keys, webhooks signatures. 
                  Bank-level encryption included.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Globe className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle>Global CDN</CardTitle>
                </div>
                <CardDescription>
                  Deploy worldwide with edge locations. 
                  99.99% uptime SLA guaranteed.
                </CardDescription>
              </CardHeader>
            </Card>

            <div className="pt-4">
              <Button size="lg" className="w-full group" asChild>
                <Link href="/docs">
                  View Full Documentation
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-6 px-6 py-3 rounded-full border border-border/50 bg-background/50 backdrop-blur-sm">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm text-muted-foreground">SDKs for JS, Python, Go, Ruby</span>
            </div>
            <div className="h-4 w-px bg-border" />
            <div className="flex items-center gap-2">
              <Puzzle className="h-4 w-4 text-primary" />
              <span className="text-sm text-muted-foreground">100+ API endpoints</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
