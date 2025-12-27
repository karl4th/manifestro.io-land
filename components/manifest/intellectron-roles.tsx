"use client"

import { motion } from "framer-motion"
import { Calendar, Search, GraduationCap, Brain, Settings } from "lucide-react"

export default function IntellectronRoles() {
  const intellectrons = [
    {
      icon: Calendar,
      name: "Planner",
      description: "Strategic thinking & timeline reasoning"
    },
    {
      icon: Search,
      name: "Searcher",
      description: "Information retrieval & synthesis"
    },
    {
      icon: GraduationCap,
      name: "Expert",
      description: "Domain-specific deep knowledge"
    },
    {
      icon: Brain,
      name: "Memory",
      description: "Long-term context & relationship mapping"
    },
    {
      icon: Settings,
      name: "Orchestrator",
      description: "Cognitive workflow coordination"
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
            Intellectron Roles
            <span className="block text-muted-foreground font-medium text-xl md:text-2xl mt-2">
              (CI Units)
            </span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16 max-w-5xl mx-auto">
          {intellectrons.map((intellectron, index) => (
            <motion.div
              key={intellectron.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-6 rounded-xl border border-border bg-background/50 backdrop-blur-sm h-full"
            >
              <div className="text-center">
                <div className="w-16 h-16 rounded-lg border border-border/50 flex items-center justify-center mx-auto mb-4">
                  <intellectron.icon className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-foreground">
                  {intellectron.name}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {intellectron.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <div className="p-6 rounded-xl border border-border bg-background/50 backdrop-blur-sm">
            <p className="text-lg text-muted-foreground leading-relaxed">
              <span className="text-foreground font-medium">Each intellectron can be powered by any model</span> 
              {" "}(OpenAI, Anthropic, DeepSeek, Moonshot, or your own intellectron-0.1).
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
