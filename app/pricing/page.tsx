"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, Zap, Shield, Crown } from "lucide-react"
import Navigation from "@/components/navigation"
import Link from "next/link"
import { motion } from "framer-motion"

const plans = [
  {
    name: "Starter",
    description: "Perfect for small teams getting started",
    price: "$99",
    period: "/month",
    features: [
      "Up to 5 AI agents",
      "10,000 requests/month",
      "Basic models included",
      "Email support",
      "API access"
    ],
    notIncluded: [
      "Custom models",
      "Priority support",
      "Advanced analytics"
    ],
    icon: Zap,
    popular: false
  },
  {
    name: "Professional",
    description: "Ideal for growing businesses",
    price: "$299",
    period: "/month",
    features: [
      "Up to 20 AI agents",
      "100,000 requests/month",
      "All models included",
      "Priority email support",
      "API access",
      "Custom integrations",
      "Basic analytics"
    ],
    notIncluded: [
      "Dedicated support",
      "Custom model training"
    ],
    icon: Shield,
    popular: true
  },
  {
    name: "Enterprise",
    description: "For large-scale operations",
    price: "Custom",
    period: "",
    features: [
      "Unlimited AI agents",
      "Unlimited requests",
      "All models + custom training",
      "24/7 dedicated support",
      "Full API access",
      "Advanced integrations",
      "Advanced analytics",
      "On-premise deployment",
      "SLA guarantee"
    ],
    notIncluded: [],
    icon: Crown,
    popular: false
  }
]

export default function PricingPage() {
  return (
    <>
      <Navigation />
      <main className="py-20 sm:py-32">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-auto max-w-2xl text-center mb-16"
          >
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Simple, transparent
              <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                {" "}pricing
              </span>
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Choose the perfect plan for your business. Scale as you grow.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className={`h-full ${plan.popular ? 'border-primary shadow-lg' : ''}`}>
                  <CardHeader>
                    {plan.popular && (
                      <Badge className="w-fit mb-2">Most Popular</Badge>
                    )}
                    <div className="flex items-center gap-2">
                      <plan.icon className="h-6 w-6 text-primary" />
                      <CardTitle>{plan.name}</CardTitle>
                    </div>
                    <CardDescription>{plan.description}</CardDescription>
                    <div className="mt-4">
                      <span className="text-4xl font-bold">{plan.price}</span>
                      <span className="text-muted-foreground">{plan.period}</span>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      {plan.features.map((feature) => (
                        <div key={feature} className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-green-500" />
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                      {plan.notIncluded.map((feature) => (
                        <div key={feature} className="flex items-center gap-2 opacity-50">
                          <div className="h-4 w-4 border-2 border-border rounded-sm" />
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                    <Button 
                      className="w-full" 
                      variant={plan.popular ? "default" : "outline"}
                      asChild
                    >
                      <Link href="#waitlist">
                        {plan.name === "Enterprise" ? "Contact Sales" : "Get Started"}
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-20 text-center"
          >
            <h3 className="text-2xl font-bold mb-4">Need a custom solution?</h3>
            <p className="text-muted-foreground mb-6">
              We can tailor a plan to fit your specific requirements.
            </p>
            <Button variant="outline" size="lg" asChild>
              <Link href="/contact">Talk to Sales</Link>
            </Button>
          </motion.div>
        </div>
      </main>
    </>
  )
}
