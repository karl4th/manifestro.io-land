"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Brain, Users, Target, Zap, Shield, Globe, ArrowRight } from "lucide-react"
import Navigation from "@/components/navigation"
import Link from "next/link"
import { motion } from "framer-motion"

const values = [
  {
    icon: Brain,
    title: "Innovation First",
    description: "We push the boundaries of what's possible with AI technology"
  },
  {
    icon: Shield,
    title: "Trust & Security",
    description: "Your data is protected with enterprise-grade security"
  },
  {
    icon: Users,
    title: "Customer Success",
    description: "We succeed when our customers succeed"
  }
]

const stats = [
  { value: "10+", label: "AI Models Integrated", description: "OpenAI, Anthropic, DeepSeek, and more" },
  { value: "1000+", label: "Waitlist Joiners", description: "Companies waiting to transform" },
  { value: "99.9%", label: "Uptime SLA", description: "Enterprise-grade reliability" },
  { value: "24/7", label: "Support", description: "Always here to help you succeed" }
]

const partners = [
  { name: "OpenAI", description: "GPT-4, o1 models" },
  { name: "Anthropic", description: "Claude 3 family" },
  { name: "DeepSeek", description: "Advanced reasoning models" },
  { name: "Moonshot AI", description: "Multimodal AI" },
  { name: "xAI", description: "Grok models" },
  { name: "Google", description: "Gemini models" }
]

const team = [
  {
    name: "Karl Bagzhan",
    role: "Founder & CEO",
    description: "Visionary leader with expertise in AI systems architecture"
  },
  {
    name: "Karl Alizhan",
    role: "Founder & Marketing Director",
    description: "Growth strategist passionate about AI democratization"
  }
]

export default function AboutPage() {
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
            <Badge className="mb-6">About MANIFESTRO</Badge>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6">
              Engineering the future of
              <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                {" "}collective intelligence
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              MANIFESTRO INC. is a Denver-based technology company pioneering the next 
              generation of AI systems through coordinated collective intelligence.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid md:grid-cols-2 gap-12 mb-20"
          >
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Vision</h2>
              <p className="text-lg text-muted-foreground">
                A future where businesses are powered not by isolated tools, but by 
                cohesive, adaptive, and self-learning digital intelligence systems that 
                work in perfect harmony.
              </p>
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
              <p className="text-lg text-muted-foreground">
                To democratize access to the world's most powerful AI by uniting the 
                best models into a single, intuitive system of collective intelligence 
                for solving complex business challenges.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-20"
          >
            <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {values.map((value, index) => (
                <Card key={value.title} className="text-center">
                  <CardContent className="p-6">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 mb-4">
                      <value.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                    <p className="text-muted-foreground">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mb-20 bg-muted/30 py-16 -mx-4 px-4 sm:mx-0 sm:px-0"
          >
            <h2 className="text-3xl font-bold text-center mb-12">By the Numbers</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={stat.label} className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">{stat.value}</div>
                  <div className="font-semibold mb-1">{stat.label}</div>
                  <div className="text-sm text-muted-foreground">{stat.description}</div>
                </div>
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
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {partners.map((partner) => (
                <Card key={partner.name} className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="h-12 w-12 mx-auto mb-4 rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                      <Brain className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold mb-1">{partner.name}</h3>
                    <p className="text-sm text-muted-foreground">{partner.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mb-20"
          >
            <h2 className="text-3xl font-bold text-center mb-12">Leadership Team</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {team.map((member, index) => (
                <Card key={member.name}>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                        <Users className="h-8 w-8 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold">{member.name}</h3>
                        <p className="text-primary mb-2">{member.role}</p>
                        <p className="text-muted-foreground">{member.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold mb-6">Ready to join the AI revolution?</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Be part of the future. Join our waitlist today.
            </p>
            <Button size="lg" className="rounded-full" asChild>
              <Link href="#waitlist">
                Join Waitlist <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </main>
    </>
  )
}
