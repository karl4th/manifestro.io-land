"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Sparkles, Zap, Shield, Brain, Play, Puzzle, Bot, MessageCircle, Send, Globe, Star } from "lucide-react"
import { motion } from "framer-motion"
import MeshGradient from "./mesh-gradient"
import FloatingOrb from "./floating-orb"

export default function HeroSection() {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      
      if (response.ok) {
        setIsSubmitted(true)
        setEmail('')
        setTimeout(() => setIsSubmitted(false), 3000)
      }
    } catch (error) {
      console.error('Submit error:', error)
    }
  }

  return (
    <section className="relative py-32 sm:py-48 overflow-hidden">
      <FloatingOrb className="top-20 right-20" />
      <FloatingOrb className="bottom-20 left-20" />
      <MeshGradient />
      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-5xl text-center"
        >
          <Badge className="mb-8 bg-muted/50 text-foreground border-border backdrop-blur-sm">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="mr-2 h-4 w-4" />
            </motion.div>
            No-Code AI Platform
          </Badge>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-8 leading-[0.9]">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Build AI agents
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-foreground block"
            >
              without code
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-muted-foreground"
            >
              {" "}deploy everywhere
            </motion.span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
            Create powerful AI agents with our visual platform. Deploy them across 
            WhatsApp, Telegram, Instagram, websites, and phone calls - all without 
            writing a single line of code.
          </p>
          
          <div className="flex flex-col lg:flex-row gap-6 max-w-2xl mx-auto mb-16">
            <form onSubmit={handleSubmit} className="flex-1">
              <div className="flex flex-col sm:flex-row gap-3">
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 h-14 bg-background/50 backdrop-blur border-border/50 text-base"
                  required
                />
                <Button type="submit" size="lg" className="h-14 px-8 rounded-full text-base" disabled={isSubmitted}>
                  {isSubmitted ? "You're in!" : "Get Started"}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </form>
          </div>
          
          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto mb-16">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-center group"
            >
              <motion.div 
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-3xl font-bold mb-2 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent"
              >
                10+
              </motion.div>
              <div className="text-sm text-muted-foreground">AI Models</div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-center group"
            >
              <motion.div 
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                className="text-3xl font-bold mb-2 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent"
              >
                1000+
              </motion.div>
              <div className="text-sm text-muted-foreground">Companies</div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-center group"
            >
              <motion.div 
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                className="text-3xl font-bold mb-2 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent"
              >
                99.9%
              </motion.div>
              <div className="text-sm text-muted-foreground">Uptime</div>
            </motion.div>
          </div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex items-center justify-center gap-1 mb-8"
          >
            {[1, 2, 3, 4, 5].map((star) => (
              <motion.div
                key={star}
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.8 + star * 0.1, type: "spring" }}
              >
                <Star className="h-5 w-5 fill-primary text-primary" />
              </motion.div>
            ))}
            <span className="ml-2 text-sm text-muted-foreground">
              Trusted by 10,000+ developers
            </span>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative max-w-4xl mx-auto"
        >
          <div className="relative rounded-2xl border border-border/50 bg-background/50 backdrop-blur-xl overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-border/50">
              <div className="flex items-center gap-3">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/20" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/20" />
                  <div className="w-3 h-3 rounded-full bg-green-500/20" />
                </div>
                <span className="text-sm text-muted-foreground">AI Agent Builder</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsPlaying(!isPlaying)}
                className="text-xs"
              >
                {isPlaying ? "Pause" : "Play"} Demo
              </Button>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <motion.div
                  animate={isPlaying ? { scale: [1, 1.05, 1] } : {}}
                  transition={{ duration: 2, repeat: isPlaying ? Infinity : 0 }}
                  className="space-y-4"
                >
                  <div className="p-4 rounded-lg border border-border/50 bg-muted/30">
                    <div className="flex items-center gap-2 mb-2">
                      <Bot className="h-4 w-4 text-primary" />
                      <span className="text-sm font-medium">Customer Support</span>
                    </div>
                    <p className="text-xs text-muted-foreground">Handles inquiries and support tickets</p>
                  </div>
                  <div className="p-4 rounded-lg border border-border/50 bg-muted/30">
                    <div className="flex items-center gap-2 mb-2">
                      <MessageCircle className="h-4 w-4 text-primary" />
                      <span className="text-sm font-medium">Sales Assistant</span>
                    </div>
                    <p className="text-xs text-muted-foreground">Qualifies leads and schedules demos</p>
                  </div>
                </motion.div>
                
                <motion.div
                  animate={isPlaying ? { x: [0, 10, 0] } : {}}
                  transition={{ duration: 1, repeat: isPlaying ? Infinity : 0 }}
                  className="flex items-center justify-center"
                >
                  <div className="relative">
                    <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                      <Brain className="h-10 w-10 text-primary" />
                    </div>
                    <motion.div
                      animate={isPlaying ? { rotate: 360 } : {}}
                      transition={{ duration: 3, repeat: isPlaying ? Infinity : 0, ease: "linear" }}
                      className="absolute inset-0 rounded-full border-2 border-dashed border-primary/30"
                    />
                  </div>
                </motion.div>
                
                <motion.div
                  animate={isPlaying ? { scale: [1, 1.05, 1] } : {}}
                  transition={{ duration: 2, repeat: isPlaying ? Infinity : 0 }}
                  className="space-y-4"
                >
                  <div className="p-4 rounded-lg border border-border/50 bg-muted/30">
                    <div className="flex items-center gap-2 mb-2">
                      <MessageCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm font-medium">WhatsApp</span>
                    </div>
                    <div className="h-2 bg-green-500/20 rounded-full" />
                  </div>
                  <div className="p-4 rounded-lg border border-border/50 bg-muted/30">
                    <div className="flex items-center gap-2 mb-2">
                      <Send className="h-4 w-4 text-blue-500" />
                      <span className="text-sm font-medium">Telegram</span>
                    </div>
                    <div className="h-2 bg-blue-500/20 rounded-full" />
                  </div>
                  <div className="p-4 rounded-lg border border-border/50 bg-muted/30">
                    <div className="flex items-center gap-2 mb-2">
                      <Globe className="h-4 w-4 text-purple-500" />
                      <span className="text-sm font-medium">Website</span>
                    </div>
                    <div className="h-2 bg-purple-500/20 rounded-full" />
                  </div>
                </motion.div>
              </div>
              
              <div className="mt-6 flex items-center justify-center gap-4">
                <Button variant="outline" size="sm">
                  <Puzzle className="h-4 w-4 mr-2" />
                  Add Block
                </Button>
                <Button size="sm">
                  <Play className="h-4 w-4 mr-2" />
                  Deploy Agent
                </Button>
              </div>
            </div>
          </div>
          
          <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/20 via-transparent to-primary/20 rounded-2xl blur-3xl -z-10" />
        </motion.div>
      </div>
    </section>
  )
}
