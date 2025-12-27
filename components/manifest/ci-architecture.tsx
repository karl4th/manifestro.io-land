"use client"

import { motion } from "framer-motion"
import { ArrowRight, User, Settings, Search, GraduationCap, Brain, Shuffle } from "lucide-react"

export default function CIArchitecture() {
  const architectureFlow = [
    { icon: User, label: "User Input" },
    { icon: Settings, label: "Orchestrator" },
    { icon: Search, label: "Searcher" },
    { icon: GraduationCap, label: "Expert" },
    { icon: Brain, label: "Memory" },
    { icon: Shuffle, label: "Collective Output" }
  ]

  return (
    <section className="py-24">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-4xl text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
            How CI Works in
            <span className="block text-muted-foreground font-medium">
              Manifestro
            </span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto mb-16"
        >
          <div className="space-y-4">
            {architectureFlow.map((step, index) => (
              <motion.div
                key={step.label}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-4 p-4 rounded-lg border border-border bg-background/50"
              >
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-lg border border-border/50 flex items-center justify-center">
                    <step.icon className="h-5 w-5 text-muted-foreground" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-foreground">
                    {step.label}
                  </h3>
                </div>
                {index < architectureFlow.length - 1 && (
                  <div className="flex-shrink-0">
                    <ArrowRight className="h-4 w-4 text-muted-foreground" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center mt-12"
        >
          <div className="p-6 rounded-lg border border-border bg-background/50">
            <p className="text-lg text-muted-foreground leading-relaxed">
              Your query is processed by a team of intellectrons simultaneously. 
              <span className="text-foreground font-medium"> Orchestrator coordinates</span>, 
              <span className="text-foreground font-medium"> Searcher researches</span>, 
              <span className="text-foreground font-medium"> Expert analyzes</span>, 
              <span className="text-foreground font-medium"> Memory retains</span>—
              all in one cognitive cycle.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
