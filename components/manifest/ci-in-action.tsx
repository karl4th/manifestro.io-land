"use client"

import { motion } from "framer-motion"
import { ArrowRight, Settings, Calendar, Search, GraduationCap, Brain, CheckCircle } from "lucide-react"

export default function CIInAction() {
  const steps = [
    {
      number: 1,
      icon: Settings,
      title: "Orchestrator",
      action: "decomposes the task"
    },
    {
      number: 2,
      icon: Calendar,
      title: "Planner",
      action: "creates timeline"
    },
    {
      number: 3,
      icon: Search,
      title: "Searcher",
      action: "gathers market data"
    },
    {
      number: 4,
      icon: GraduationCap,
      title: "Expert",
      action: "evaluates risks"
    },
    {
      number: 5,
      icon: Brain,
      title: "Memory",
      action: "connects to past launches"
    },
    {
      number: 6,
      icon: CheckCircle,
      title: "Collective output",
      action: "delivered as one coordinated response"
    }
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
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8">
            CI in Action
          </h2>
          <div className="p-6 rounded-xl border border-border bg-background/50 backdrop-blur-sm mb-12">
            <p className="text-lg font-medium text-foreground mb-2">
              Example Query:
            </p>
            <p className="text-base md:text-lg text-muted-foreground italic">
              "Plan a product launch and analyze market risks"
            </p>
          </div>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="space-y-4">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-4 p-4 rounded-xl border border-border bg-background/50 backdrop-blur-sm"
              >
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full border border-border/50 flex items-center justify-center">
                    <span className="text-lg font-bold text-muted-foreground">
                      {step.number}
                    </span>
                  </div>
                </div>
                
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-lg border border-border/50 flex items-center justify-center">
                    <step.icon className="h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
                
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-foreground mb-1">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {step.action}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto mt-12 text-center"
        >
          <div className="p-6 rounded-xl border border-border bg-background/50 backdrop-blur-sm">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full border border-border/50 mb-4">
              <CheckCircle className="h-6 w-6" />
            </div>
            <p className="text-lg text-foreground font-medium">
              All intellectrons work simultaneously in one cognitive cycle, 
              delivering a comprehensive, coordinated response.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
