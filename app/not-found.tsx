"use client"

import { Button } from "@/components/ui/button"
import { Home, ArrowRight, Search } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"

export default function NotFound() {
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
            
            <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-4">
              4<span className="text-primary">0</span>4
            </h1>
            
            <h2 className="text-2xl md:text-3xl font-semibold mb-4">
              Oops! Page not found
            </h2>
            
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              The AI agent you're looking for seems to have wandered off. 
              Let's get you back to building amazing things.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="rounded-full" asChild>
                <Link href="/">
                  <Home className="mr-2 h-4 w-4" />
                  Back to Home
                </Link>
              </Button>
              
              <Button variant="outline" size="lg" className="rounded-full" asChild>
                <Link href="/product">
                  <Search className="mr-2 h-4 w-4" />
                  Explore Features
                </Link>
              </Button>
            </div>
            
            <div className="mt-16 grid grid-cols-3 gap-4 max-w-sm mx-auto">
              {[404, 500, 403].map((code, index) => (
                <motion.div
                  key={code}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="text-center p-4 rounded-lg border border-border/50 bg-muted/30"
                >
                  <div className="text-2xl font-bold text-primary mb-1">{code}</div>
                  <div className="text-xs text-muted-foreground">
                    {code === 404 ? "Not Found" : code === 500 ? "Server Error" : "Forbidden"}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  )
}
