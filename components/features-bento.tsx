"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  Brain, 
  Network, 
  Zap, 
  Shield, 
  Cpu, 
  Globe, 
  ArrowRight,
  Sparkles
} from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"

const features = [
  {
    icon: Brain,
    title: "Collective Intelligence",
    description: "Multiple AI models working together as one coordinated system",
    color: "from-blue-500/20 to-cyan-500/20"
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Real-time coordination between models with sub-second responses",
    color: "from-yellow-500/20 to-orange-500/20"
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "Bank-level encryption and data protection for your peace of mind",
    color: "from-green-500/20 to-emerald-500/20"
  },
  {
    icon: Network,
    title: "Scalable Architecture",
    description: "Handle millions of requests without breaking a sweat",
    color: "from-purple-500/20 to-pink-500/20"
  },
  {
    icon: Cpu,
    title: "10+ AI Models",
    description: "Access the best models from OpenAI, Anthropic, DeepSeek, and more",
    color: "from-red-500/20 to-rose-500/20"
  },
  {
    icon: Globe,
    title: "Global Reach",
    description: "Deploy worldwide with edge computing for minimal latency",
    color: "from-indigo-500/20 to-blue-500/20"
  }
]

export default function FeaturesBento() {
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
            <Sparkles className="mr-2 h-4 w-4" />
            Powerful Features
          </Badge>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6">
            Everything you need to
            <span className="text-foreground block">
              scale with AI
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Our platform combines cutting-edge AI technologies into one seamless experience
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -4 }}
              className="group"
            >
              <Card className="h-full border-0 shadow-lg hover:shadow-2xl transition-all duration-300 bg-background/50 backdrop-blur-sm overflow-hidden">
                <div className={`h-1 bg-gradient-to-r ${feature.color}`} />
                <CardHeader>
                  <div className={`inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${feature.color} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="h-7 w-7" />
                  </div>
                  <CardTitle className="text-xl group-hover:text-primary transition-colors">
                    {feature.title}
                  </CardTitle>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
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
          className="mt-24 text-center"
        >
          <div className="inline-flex items-center gap-4 px-6 py-3 rounded-full border border-border/50 bg-background/50 backdrop-blur-sm">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-sm text-muted-foreground">All systems operational</span>
            </div>
            <div className="h-4 w-px bg-border" />
            <span className="text-sm text-muted-foreground">99.9% uptime SLA</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
