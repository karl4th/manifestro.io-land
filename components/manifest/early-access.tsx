"use client"

import { motion } from "framer-motion"
import { Rocket, Brain, Settings, BarChart3 } from "lucide-react"

export default function EarlyAccess() {
  const benefits = [
    {
      icon: Rocket,
      title: "First access",
      description: "to Manifestro CI Platform"
    },
    {
      icon: Brain,
      title: "Help shape CI development",
      description: "your use cases guide the paradigm"
    },
    {
      icon: Settings,
      title: "Model flexibility",
      description: "use any AI provider"
    },
    {
      icon: BarChart3,
      title: "CI analytics",
      description: "see how your intellectrons think together"
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
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
            Early Access to
            <span className="block text-muted-foreground font-medium">
              CI
            </span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground mb-12">
            What Waitlist Members Get:
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-6 rounded-xl border border-border bg-background/50 backdrop-blur-sm h-full"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-lg border border-border/50 flex items-center justify-center">
                    <benefit.icon className="h-5 w-5 text-muted-foreground" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-2 text-foreground">
                    {benefit.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto mt-12 text-center"
        >
          <div className="p-6 rounded-xl border border-border bg-background/50 backdrop-blur-sm">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full border border-border/50 mb-4">
              <Brain className="h-6 w-6" />
            </div>
            <p className="text-lg text-foreground font-medium">
              Be among the first to experience true Collective Intelligence. 
              Shape the future of AI collaboration.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
