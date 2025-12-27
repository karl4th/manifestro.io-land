"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Brain, Network } from "lucide-react"
import { motion } from "framer-motion"
import AnimatedGridPattern from "@/components/ui/animated-grid-pattern"
import { cn } from "@/lib/utils"
import { waitlistApi } from "@/lib/api"
import { useToast } from "@/hooks/use-toast"

export default function ManifestHero() {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    try {
      const response = await waitlistApi.join({
        email,
        ip_address: undefined,
        user_agent: navigator.userAgent,
        utm_source: 'manifest_hero'
      })

      if (response.error) {
        toast({
          title: "Ошибка",
          description: response.error,
          variant: "destructive"
        })
        return
      }

      setIsSubmitted(true)
      setEmail('')
      toast({
        title: "Успешно!",
        description: "Вы добавлены в CI waitlist. Мы сообщим вам о запуске."
      })
      setTimeout(() => setIsSubmitted(false), 3000)
    } catch (error) {
      console.error('Submit error:', error)
      toast({
        title: "Ошибка",
        description: "Произошла ошибка. Попробуйте еще раз.",
        variant: "destructive"
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
      <AnimatedGridPattern
        numSquares={30}
        maxOpacity={0.1}
        duration={3}
        className={cn(
          "mask-[radial-gradient(500px_circle_at_center,white,transparent)]",
          "inset-x-0 h-full skew-y-12"
        )}
      />
      
      <div className="relative z-10 text-center max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border/50 bg-background/80 backdrop-blur-sm mb-8">
            <Brain className="h-4 w-4" />
            <span className="text-sm font-medium">The Future of AI is Here</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 leading-tight">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="block text-foreground"
            >
              Manifestro
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="block text-2xl sm:text-3xl md:text-4xl lg:text-5xl mt-2 text-muted-foreground font-medium"
            >
              The First True CI Platform
            </motion.span>
          </h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg sm:text-xl md:text-2xl text-muted-foreground mb-12 max-w-4xl mx-auto leading-relaxed"
          >
            Where Collective Intelligence emerges from specialized intellectrons—
            <span className="text-foreground font-semibold"> Planner, Searcher, Expert, Memory, Orchestrator</span>—
            working as one cognitive unit. Not just AI agents. A thinking team.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mb-16"
          >
            <form onSubmit={handleSubmit} className="max-w-lg mx-auto" id="ci-waitlist">
              <div className="flex flex-col gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email to join the CI revolution"
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background text-base focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                  required
                />
                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full rounded-lg text-base px-6 py-3 font-medium"
                  disabled={isLoading || isSubmitted}
                >
                  {isLoading ? "Joining..." : isSubmitted ? "Welcome!" : "Join CI Waitlist"}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
              {isSubmitted && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 text-center text-sm text-green-600"
                >
                  Welcome to the future! We'll notify you when CI launches.
                </motion.p>
              )}
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="relative max-w-4xl mx-auto mt-16"
          >
            <div className="rounded-2xl border border-border bg-background/50 backdrop-blur-sm p-8">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full border border-border mb-4">
                  <Network className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Intellectron Network</h3>
                <p className="text-muted-foreground">
                  Specialized AI units working together as one cognitive system
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {['Planner', 'Searcher', 'Expert', 'Memory', 'Orchestrator'].map((name, index) => (
                  <div key={name} className="p-4 rounded-lg border border-border/50 text-center">
                    <div className="w-8 h-8 rounded-lg border border-border/50 flex items-center justify-center mx-auto mb-3">
                      <div className="w-2 h-2 rounded-full bg-foreground/40" />
                    </div>
                    <span className="text-sm font-medium">{name}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
