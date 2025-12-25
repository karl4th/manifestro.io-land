"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Navigation from "@/components/navigation"

export default function Loading() {
  return (
    <>
      <Navigation />
      <main className="min-h-[80vh] flex items-center justify-center">
        <div className="container text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="max-w-md mx-auto"
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
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="w-16 h-16 mx-auto mb-6"
            >
              <div className="w-full h-full rounded-full border-4 border-primary/20 border-t-primary" />
            </motion.div>
            
            <h2 className="text-xl font-semibold mb-2">
              Initializing AI agents...
            </h2>
            
            <p className="text-muted-foreground">
              Preparing your no-code AI platform
            </p>
          </motion.div>
        </div>
      </main>
    </>
  )
}
