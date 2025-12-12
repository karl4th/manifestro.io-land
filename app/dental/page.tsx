import {
  Navbar,
  Hero,
  Intro,
  Features,
  Problem,
  Benefits,
  Cases,
  Pricing,
  FAQ,
  CTA,
  Footer,
} from "./components";

export default function DentalPage() {
  return (
    <main className="min-h-screen bg-zinc-50">
      <Navbar />
      <Hero />
      <Intro />
      <Features />
      <Problem />
      <Benefits />
      <Cases />
      <Pricing />
      <FAQ />
      <CTA />
      <Footer />
    </main>
  );
}
