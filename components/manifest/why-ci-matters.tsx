"use client"

import { motion } from "framer-motion"
import { TrendingUp, Users, Zap } from "lucide-react"

export default function WhyCIMatters() {
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
            Beyond Chatbots,
            <span className="block text-muted-foreground font-medium">
              Beyond Agents
            </span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 max-w-4xl mx-auto">
          {[
            {
              icon: TrendingUp,
              title: "Single AI Models",
              description: "Hit complexity ceilings"
            },
            {
              icon: Users,
              title: "Multi-Agent Systems",
              description: "Create coordination overhead"
            },
            {
              icon: Zap,
              title: "CI is the Third Way",
              description: "Specialized cognitive units working as one mind"
            }
          ].map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-6 rounded-xl border border-border bg-background/50 h-full"
            >
              <div className="text-center">
                <div className="w-16 h-16 rounded-lg border border-border/50 flex items-center justify-center mx-auto mb-4">
                  <item.icon className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-bold mb-3 text-foreground">
                  {item.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {item.description}
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
          <div className="p-8 rounded-xl border border-border bg-background/50 backdrop-blur-sm">
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-6">
              <span className="text-foreground font-bold text-xl md:text-2xl block mb-4">
                CI is the third way
              </span>
              —specialized cognitive units working as one mind. 
              This is how AI scales to real business complexity.
            </p>
            <div className="inline-flex items-center gap-2 text-foreground font-medium">
              <Zap className="h-5 w-5" />
              The future of AI is collective intelligence
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
