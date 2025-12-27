"use client"

import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import FloatingCTA from "@/components/floating-cta"
import ManifestHero from "@/components/manifest/manifest-hero"
import CIParadigm from "@/components/manifest/ci-paradigm"
import CIArchitecture from "@/components/manifest/ci-architecture"
import IntellectronRoles from "@/components/manifest/intellectron-roles"
import CIInAction from "@/components/manifest/ci-in-action"
import WhyCIMatters from "@/components/manifest/why-ci-matters"
import EarlyAccess from "@/components/manifest/early-access"
import FinalCTA from "@/components/manifest/final-cta"

export default function ManifestPage() {
  return (
    <>
      <Navigation />
      <main>
        <ManifestHero />
        <CIParadigm />
        <CIArchitecture />
        <IntellectronRoles />
        <CIInAction />
        <WhyCIMatters />
        <EarlyAccess />
        <FinalCTA />
      </main>
      <Footer />
      <FloatingCTA />
    </>
  )
}
