"use client"

import { motion } from "framer-motion"

const companies = [
  "OpenAI",
  "Anthropic",
  "DeepSeek",
  "Google",
  "xAI",
  "Microsoft"
]

export default function TrustedBy() {
  return (
    <section className="py-16 border-y border-border/30 bg-muted/20">
      <div className="container">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-sm text-muted-foreground uppercase tracking-wider">
            Trusted by leading AI companies
          </p>
        </motion.div>
        
        <div className="flex flex-wrap items-center justify-center gap-16 opacity-60">
          {companies.map((company, index) => (
            <motion.div
              key={company}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 0.6, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ opacity: 1, scale: 1.05 }}
              className="text-2xl font-bold text-muted-foreground"
            >
              {company}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
