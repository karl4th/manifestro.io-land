"use client"

import { motion } from "framer-motion"
import { Puzzle, RefreshCw, Brain, Zap } from "lucide-react"

export default function CIParadigm() {
  const principles = [
    {
      icon: Puzzle,
      title: "Cognitive Specialization",
      description: "Each intellectron has a dedicated thinking role"
    },
    {
      icon: RefreshCw,
      title: "Shared Consciousness",
      description: "Memory and context are collective"
    },
    {
      icon: Brain,
      title: "Emergent Reasoning",
      description: "The team reasons as one mind"
    },
    {
      icon: Zap,
      title: "Real-time Collaboration",
      description: "No handoffs, no latency"
    }
  ]

  return (
    <section className="py-24 bg-muted/20">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-4xl text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
            Collective Intelligence:
            <span className="block text-muted-foreground font-medium">
              The Next Layer of AI
            </span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            CI is not multi-agent systems. It's{" "}
            <span className="text-foreground font-semibold">cognitive collaboration</span>—where 
            specialized intellectrons share memory, context, and reasoning paths to form a single 
            emergent intelligence.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {principles.map((principle, index) => (
            <motion.div
              key={principle.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-6 rounded-xl border border-border bg-background/50 backdrop-blur-sm h-full"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-lg border border-border/50 flex items-center justify-center">
                    <principle.icon className="h-5 w-5 text-muted-foreground" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-foreground">
                    {principle.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {principle.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
