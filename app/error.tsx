"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Home, RefreshCw, AlertTriangle } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <>
      <Navigation />
      <main className="min-h-[80vh] flex items-center justify-center">
        <div className="container text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl mx-auto"
          >
            <div className="mb-8">
              <Image 
                src="/ligth.png" 
                alt="MANIFESTRO"
                width={200}
                height={60}
                className="dark:hidden mx-auto h-auto"
              />
              <Image 
                src="/dark.png" 
                alt="MANIFESTRO"
                width={200}
                height={60}
                className="hidden dark:block mx-auto h-auto"
              />
            </div>
            
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 0.5, repeat: 2, repeatDelay: 1 }}
              className="mb-6"
            >
              <AlertTriangle className="h-16 w-16 text-primary mx-auto" />
            </motion.div>
            
            <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-4">
              5<span className="text-primary">00</span>
            </h1>
            
            <h2 className="text-2xl md:text-3xl font-semibold mb-4">
              Something went wrong
            </h2>
            
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              Our AI agents encountered an unexpected error. 
              Don't worry, our team has been notified and is working on it.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button size="lg" className="rounded-full" onClick={reset}>
                <RefreshCw className="mr-2 h-4 w-4" />
                Try Again
              </Button>
              
              <Button variant="outline" size="lg" className="rounded-full" asChild>
                <Link href="/">
                  <Home className="mr-2 h-4 w-4" />
                  Back to Home
                </Link>
              </Button>
            </div>
            
            <div className="bg-muted/30 rounded-lg p-4 max-w-md mx-auto">
              <p className="text-xs text-muted-foreground">
                Error ID: {error.digest || 'unknown'}
              </p>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  )
}
