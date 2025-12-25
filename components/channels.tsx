"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  MessageCircle, 
  Send, 
  Instagram, 
  Globe, 
  Phone, 
  Bot,
  ArrowRight,
  CheckCircle2
} from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"

const channels = [
  {
    icon: MessageCircle,
    name: "WhatsApp",
    description: "Deploy AI agents that handle customer inquiries, process orders, and provide support 24/7",
    color: "from-green-500/20 to-emerald-500/20",
    features: ["Automated responses", "Rich media support", "Group chat handling"]
  },
  {
    icon: Send,
    name: "Telegram",
    description: "Build powerful bots for Telegram with advanced features and instant deployment",
    color: "from-blue-500/20 to-cyan-500/20",
    features: ["Inline bots", "Payment processing", "Channel integration"]
  },
  {
    icon: Instagram,
    name: "Instagram",
    description: "Automate DM responses, handle comments, and manage customer interactions",
    color: "from-pink-500/20 to-rose-500/20",
    features: ["DM automation", "Comment replies", "Story interactions"]
  },
  {
    icon: Globe,
    name: "Website & Widgets",
    description: "Embed AI agents anywhere on your site with customizable widgets",
    color: "from-purple-500/20 to-indigo-500/20",
    features: ["Custom widgets", "Full control", "Analytics"]
  },
  {
    icon: Phone,
    name: "Phone Calls",
    description: "Voice-enabled AI agents that can handle inbound and outbound calls",
    color: "from-orange-500/20 to-red-500/20",
    features: ["Voice AI", "Call routing", "Voicemail handling"]
  },
  {
    icon: Bot,
    name: "API Access",
    description: "Full API access for custom integrations and advanced workflows",
    color: "from-gray-500/20 to-slate-500/20",
    features: ["REST API", "Webhooks", "SDKs"]
  }
]

export default function Channels() {
  return (
    <section className="py-32 bg-muted/30">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-3xl text-center mb-24"
        >
          <Badge className="mb-6 text-sm">
            Deploy Everywhere
          </Badge>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6">
            One Agent,
            <span className="text-foreground block">
              Every Channel
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Build once, deploy everywhere. Your AI agents work seamlessly across 
            all major communication channels.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {channels.map((channel, index) => (
            <motion.div
              key={channel.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -4 }}
              className="group"
            >
              <Card className="h-full border-0 shadow-lg hover:shadow-2xl transition-all duration-300 bg-background/50 backdrop-blur-sm overflow-hidden">
                <div className={`h-1 bg-gradient-to-r ${channel.color}`} />
                <CardHeader>
                  <div className={`inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${channel.color} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <channel.icon className="h-7 w-7" />
                  </div>
                  <CardTitle className="text-xl group-hover:text-primary transition-colors">
                    {channel.name}
                  </CardTitle>
                  <CardDescription className="text-base">
                    {channel.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <ul className="space-y-2 mb-4">
                    {channel.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link 
                    href="/product" 
                    className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors group"
                  >
                    Learn more 
                    <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-4 px-6 py-3 rounded-full border border-border/50 bg-background/50 backdrop-blur-sm">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-sm text-muted-foreground">6+ channels supported</span>
            </div>
            <div className="h-4 w-px bg-border" />
            <span className="text-sm text-muted-foreground">No-code deployment</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
