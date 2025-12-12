"use client";

import { useEffect, useState } from "react";
import { Container, Button } from "./ui";
import { Check, Sparkles, CreditCard } from "lucide-react";
import { cn } from "@/lib/utils";
import { useDentalI18n } from "@/lib/i18n";

const planColors = [
  "from-zinc-500 to-zinc-600",
  "from-teal-500 to-cyan-500",
  "from-purple-500 to-pink-500",
];

export function Pricing() {
  const { dictionary: t } = useDentalI18n();
  const plans = t.pricing.plans;
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 15,
        y: (e.clientY / window.innerHeight - 0.5) * 15,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section id="pricing" className="py-24 md:py-32 bg-gradient-to-b from-zinc-50 to-white relative overflow-hidden">
      {/* Floating gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-20 -right-20 w-[400px] h-[400px] bg-gradient-to-br from-teal-100/40 to-cyan-100/40 rounded-full blur-3xl transition-transform duration-1000"
          style={{ transform: `translate(${mousePosition.x * 0.3}px, ${mousePosition.y * 0.3}px)` }}
        />
        <div
          className="absolute -bottom-20 -left-20 w-[300px] h-[300px] bg-gradient-to-tr from-purple-100/30 to-pink-100/30 rounded-full blur-3xl transition-transform duration-1000"
          style={{ transform: `translate(${-mousePosition.x * 0.2}px, ${-mousePosition.y * 0.2}px)` }}
        />
      </div>

      <Container className="relative">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-teal-500/10 to-cyan-500/10 border border-teal-200/50 px-4 py-1.5 text-sm font-medium text-teal-700 mb-6">
            <CreditCard className="w-4 h-4" />
            {t.pricing.badge}
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-zinc-900 tracking-tight mb-6">
            {t.pricing.title}{" "}
            <span className="relative">
              <span className="relative z-10 bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
                {t.pricing.titleHighlight}
              </span>
              <span className="absolute -bottom-1 left-0 right-0 h-2 bg-gradient-to-r from-teal-200 to-cyan-200 -skew-x-3 -z-0" />
            </span>
            {" "}{t.pricing.titleEnd}
          </h2>
          <p className="text-lg text-zinc-600 leading-relaxed">
            {t.pricing.description}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {plans.map((plan, i) => {
            const isPopular = i === 1;
            const color = planColors[i];
            return (
              <div
                key={plan.name}
                className={cn(
                  "group relative p-6 lg:p-8 rounded-2xl border bg-white transition-all duration-500",
                  isPopular
                    ? "border-teal-200 shadow-xl shadow-teal-100/50 scale-105 z-10"
                    : "border-zinc-100 hover:border-zinc-200 hover:shadow-lg"
                )}
              >
                {isPopular && "popular" in plan && (
                  <div className="absolute -top-5 left-1/2 -translate-x-1/2 px-4 py-2 bg-gradient-to-r from-teal-500 to-cyan-500 text-white text-sm font-semibold rounded-full shadow-lg flex items-center gap-1.5 z-20">
                    <Sparkles className="w-4 h-4" />
                    {plan.popular}
                  </div>
                )}

                {/* Gradient line on top for popular */}
                {isPopular && (
                  <div className="absolute top-0 left-6 right-6 h-0.5 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full" />
                )}

                <div className="text-center mb-8">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                    <span className="text-white text-lg font-bold">{plan.name[0]}</span>
                  </div>
                  <h3 className="text-xl font-bold text-zinc-900 mb-1">
                    {plan.name}
                  </h3>
                  <p className="text-sm text-zinc-500 mb-4">{plan.description}</p>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-4xl font-bold text-zinc-900">
                      {plan.price}
                    </span>
                    <span className="text-zinc-500">₸/{plan.period}</span>
                  </div>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <div className={cn(
                        "w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5",
                        isPopular ? "bg-teal-100" : "bg-zinc-100"
                      )}>
                        <Check className={cn(
                          "w-3 h-3",
                          isPopular ? "text-teal-600" : "text-zinc-500"
                        )} />
                      </div>
                      <span className="text-sm text-zinc-600">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  variant={isPopular ? "primary" : "outline"}
                  className={cn(
                    "w-full",
                    isPopular && "shadow-lg shadow-teal-500/25"
                  )}
                >
                  {t.pricing.cta}
                </Button>
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <p className="text-zinc-500">
            {t.pricing.trial}{" "}
            <span className="font-semibold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
              {t.pricing.trialHighlight}
            </span>
          </p>
        </div>
      </Container>
    </section>
  );
}
