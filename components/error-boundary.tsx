"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { Home, RefreshCw, AlertTriangle } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"

interface Props {
  children: React.ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Error caught by boundary:", error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <main className="min-h-screen flex items-center justify-center">
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
              
              <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-4">
                Unexpected Error
              </h1>
              
              <h2 className="text-xl md:text-2xl font-semibold mb-4">
                Something went wrong
              </h2>
              
              <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                Our AI agents encountered an unexpected error. 
                Please refresh the page or contact support if the problem persists.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="rounded-full" onClick={() => window.location.reload()}>
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Refresh Page
                </Button>
                
                <Button variant="outline" size="lg" className="rounded-full" asChild>
                  <Link href="/">
                    <Home className="mr-2 h-4 w-4" />
                    Back to Home
                  </Link>
                </Button>
              </div>
              
              {process.env.NODE_ENV === "development" && this.state.error && (
                <div className="mt-8 bg-muted/30 rounded-lg p-4 max-w-2xl mx-auto text-left">
                  <p className="text-sm font-mono text-red-500">
                    {this.state.error.message}
                  </p>
                </div>
              )}
            </motion.div>
          </div>
        </main>
      )
    }

    return this.props.children
  }
}
