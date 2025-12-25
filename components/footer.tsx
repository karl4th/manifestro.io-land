"use client"

import Link from "next/link"
import { Brain, Github, Twitter, Linkedin, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { useState } from "react"
import Image from "next/image"

const footerLinks = {
  product: [
    { name: "Platform", href: "/product" },
    { name: "Pricing", href: "/pricing" },
    { name: "API & SDK", href: "/docs" },
    { name: "Enterprise", href: "/contact" }
  ],
  company: [
    { name: "About", href: "/about" },
    { name: "Blog", href: "/blog" },
    { name: "Careers", href: "/careers" },
    { name: "Contact", href: "/contact" }
  ],
  resources: [
    { name: "Documentation", href: "/docs" },
    { name: "Research", href: "/research" },
    { name: "Status", href: "/status" },
    { name: "Terms", href: "/terms" }
  ]
}

const contactInfo = {
  address: "Denver, CO",
  email: "hello@manifestro.io",
  phone: "+1 (555) 123-4567"
}

export default function Footer() {
  const [email, setEmail] = useState("")

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement newsletter subscription
    console.log("Newsletter subscription:", email)
    setEmail("")
  }

  return (
    <footer className="border-t border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <Image 
                src="/ligth.png" 
                alt="MANIFESTRO"
                width={300}
                height={74}
                className="dark:hidden h-6 w-auto"
              />
              <Image 
                src="/dark.png" 
                alt="MANIFESTRO"
                width={300}
                height={74}
                className="hidden dark:block h-6 w-auto"
              />
            </Link>
            <p className="text-sm text-muted-foreground mb-4 max-w-xs">
              Engineering the future of collective intelligence. Transform your business with coordinated AI systems.
            </p>
            <div className="space-y-2 mb-4">
              <p className="text-sm text-muted-foreground">
                📍 {contactInfo.address}
              </p>
              <p className="text-sm text-muted-foreground">
                📧 {contactInfo.email}
              </p>
              <p className="text-sm text-muted-foreground">
                📞 {contactInfo.phone}
              </p>
            </div>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" asChild>
                <Link href="https://github.com/manifestro" target="_blank">
                  <Github className="h-4 w-4" />
                </Link>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <Link href="https://twitter.com/manifestro" target="_blank">
                  <Twitter className="h-4 w-4" />
                </Link>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <Link href="https://linkedin.com/company/manifestro" target="_blank">
                  <Linkedin className="h-4 w-4" />
                </Link>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <Link href="mailto:hello@manifestro.io">
                  <Mail className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Product</h3>
            <ul className="space-y-2">
              {footerLinks.product.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="col-span-2 md:col-span-1">
            <h3 className="font-semibold mb-4">Stay Updated</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Get the latest updates on our AI research and product releases.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full"
                required
              />
              <Button type="submit" className="w-full" size="sm">
                Subscribe
              </Button>
            </form>
          </div>
        </div>
        
        <Separator className="my-8" />
        
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">© 2025 MANIFESTRO INC. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
