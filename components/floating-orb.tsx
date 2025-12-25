"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

export default function FloatingOrb({ className }: { className?: string }) {
  return (
    <motion.div
      animate={{
        y: [0, -20, 0],
        rotate: [0, 180, 360],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className={cn(
        "absolute w-96 h-96 rounded-full bg-gradient-to-br from-primary/10 via-primary/5 to-transparent blur-3xl",
        className
      )}
    >
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-primary/10 to-transparent blur-2xl"
      />
    </motion.div>
  )
}
