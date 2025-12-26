"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { X, ArrowRight, Sparkles } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { waitlistApi } from "@/lib/api"
import { useToast } from "@/hooks/use-toast"

export default function FloatingCTA() {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
      setIsVisible(window.scrollY > 500)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    try {
      const response = await waitlistApi.join({
        email,
        ip_address: undefined,
        user_agent: navigator.userAgent,
        utm_source: 'floating_cta'
      })

      if (response.error) {
        toast({
          title: "Error",
          description: response.error,
          variant: "destructive"
        })
        return
      }

      setIsSubmitted(true)
      setEmail('')
      toast({
        title: "Success!",
        description: "You've been added to the waitlist. We'll notify you when we launch."
      })
      setTimeout(() => setIsSubmitted(false), 3000)
    } catch (error) {
      console.error('Submit error:', error)
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive"
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-6 right-6 z-50"
        >
          <Sheet>
            <SheetTrigger asChild>
              <Button size="lg" className="rounded-full shadow-lg">
                <Sparkles className="mr-2 h-4 w-4" />
                Join Waitlist
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full sm:max-w-md">
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5" />
                  Get Early Access
                </SheetTitle>
              </SheetHeader>
              <div className="mt-6 space-y-4">
                <Badge variant="secondary">Limited Spots Available</Badge>
                <p className="text-sm text-muted-foreground">
                  Be the first to experience Manifestro's Collective Intelligence. 
                  Join 1,000+ companies on the waitlist.
                </p>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                  />
                  <Button type="submit" className="w-full" disabled={isLoading || isSubmitted}>
                    {isLoading ? "Adding..." : isSubmitted ? "You're on the list!" : "Join Waitlist"}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </form>
                <div className="text-xs text-muted-foreground">
                  No spam. Unsubscribe at any time.
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
