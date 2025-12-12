"use client";

import { useEffect, useState } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { Container, Button } from "./ui";
import { useDentalI18n } from "@/lib/i18n";

export function CTA() {
  const { dictionary: t } = useDentalI18n();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 30,
        y: (e.clientY / window.innerHeight - 0.5) * 30,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section className="py-24 md:py-32 bg-zinc-900 relative overflow-hidden">
      {/* Animated gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-gradient-to-br from-teal-500/20 to-cyan-500/20 rounded-full blur-3xl transition-transform duration-1000"
          style={{ transform: `translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px)` }}
        />
        <div
          className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-gradient-to-tr from-purple-500/15 to-pink-500/15 rounded-full blur-3xl transition-transform duration-1000"
          style={{ transform: `translate(${-mousePosition.x * 0.3}px, ${-mousePosition.y * 0.3}px)` }}
        />
      </div>

      {/* Subtle grid */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <Container className="relative">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/5 border border-white/10 px-4 py-1.5 text-sm font-medium text-zinc-300 mb-8 backdrop-blur-sm">
            <Sparkles className="w-4 h-4 text-teal-400" />
            {t.cta.badge}
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-6">
            {t.cta.title}{" "}
            <span className="relative">
              <span className="relative z-10 bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">
                {t.cta.titleHighlight}
              </span>
              <span className="absolute -bottom-1 left-0 right-0 h-2 bg-gradient-to-r from-teal-500/30 to-cyan-500/30 -skew-x-3 -z-0" />
            </span>
            {" "}{t.cta.titleEnd}
          </h2>
          <p className="text-lg text-zinc-400 mb-10 max-w-xl mx-auto">
            {t.cta.description}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button
              size="lg"
              className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white hover:from-teal-600 hover:to-cyan-600 shadow-lg shadow-teal-500/25 hover:shadow-xl hover:shadow-teal-500/30 transition-all"
            >
              {t.cta.primary}
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-white/20 text-white hover:bg-white/10 hover:border-white/30"
            >
              {t.cta.secondary}
            </Button>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-sm text-zinc-500">
            {t.cta.features.map((feature, i) => (
              <span key={i} className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-teal-500 rounded-full" />
                {feature}
              </span>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
