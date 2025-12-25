"use client"

import Navigation from "@/components/navigation"
import HeroSection from "@/components/hero-section"
import TrustedBy from "@/components/trusted-by"
import Channels from "@/components/channels"
import ApiSection from "@/components/api-section"
import FeaturesBento from "@/components/features-bento"
import Testimonials from "@/components/testimonials"
import FloatingCTA from "@/components/floating-cta"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { ArrowRight, Brain, Sparkles } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <HeroSection />
        <TrustedBy />
        <Channels />
        <ApiSection />
        <FeaturesBento />
        <Testimonials />
        
        <section className="py-32 bg-muted/30 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5" />
          <div className="container relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mx-auto max-w-3xl text-center"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-8"
              >
                <Sparkles className="h-8 w-8 text-primary" />
              </motion.div>
              <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-8">
                Ready to build your
                <span className="text-foreground block">
                  AI empire?
                </span>
              </h2>
              <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
                Join thousands of companies building AI agents with Manifestro's no-code platform. 
                Start free, scale infinitely.
              </p>
              <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-center">
                <Button size="lg" className="rounded-full text-base px-8 py-6 group" asChild>
                  <Link href="#waitlist">
                    Start Building Free
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" className="rounded-full text-base px-8 py-6 group" asChild>
                  <Link href="/docs">
                    View API Docs
                    <Brain className="ml-2 h-5 w-5 transition-transform group-hover:rotate-12" />
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingCTA />
    </>
  )
}
