"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles } from "lucide-react"
import { motion } from "framer-motion"
import { waitlistApi } from "@/lib/api"
import { useToast } from "@/hooks/use-toast"

export default function FinalCTA() {
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
        utm_source: 'manifest_final_cta'
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
        title: "Добро пожаловать в CI революцию!",
        description: "Вы добавлены в waitlist. Мы сообщим вам о запуске."
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
    <section className="py-24 bg-muted/20">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-4xl text-center"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full border border-border/50 mb-8">
            <Sparkles className="h-8 w-8" />
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
            Be Part of the
            <span className="block text-muted-foreground font-medium">
              CI Revolution
            </span>
          </h2>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
            Join the first platform where AI doesn't just answer—it thinks together.
          </p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mb-12"
          >
            <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
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
                  Welcome to the future of collective intelligence!
                </motion.p>
              )}
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-center"
          >
            <p className="text-muted-foreground">
              <span className="font-medium text-foreground">Manifestro CI Platform.</span> Coming Q3 2025.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
