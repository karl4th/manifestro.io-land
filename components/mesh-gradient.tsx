"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

export default function MeshGradient({ className }: { className?: string }) {
  return (
    <div className={cn("absolute inset-0 overflow-hidden opacity-30", className)}>
      <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-muted/20 blur-3xl" />
      <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-muted/10 blur-3xl" />
      <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-muted/5 blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-muted/5 blur-3xl" />
      <div className="absolute inset-0 bg-grid-black/[0.02] dark:bg-grid-white/[0.02] bg-[size:50px_50px]" />
    </div>
  )
}
