"use client";

import { useEffect, useState } from "react";
import { Container } from "./ui";
import { TrendingUp, MessageCircle, Target, Clock, Award } from "lucide-react";
import { useDentalI18n } from "@/lib/i18n";
import { useIsMobile } from "@/lib/hooks/use-mobile";

const metricIcons = [TrendingUp, MessageCircle, Target, Clock];
const metricColors = [
  "from-green-500 to-emerald-500",
  "from-blue-500 to-indigo-500",
  "from-purple-500 to-pink-500",
  "from-orange-500 to-red-500",
];

export function Cases() {
  const { dictionary: t } = useDentalI18n();
  const isMobile = useIsMobile();
  const metrics = t.cases.metrics;
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (isMobile) return;
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 15,
        y: (e.clientY / window.innerHeight - 0.5) * 15,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isMobile]);

  return (
    <section className="py-24 md:py-32 bg-white relative overflow-hidden">
      {/* Floating gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute -top-20 left-1/4 w-[400px] h-[400px] bg-gradient-to-br from-teal-100/30 to-cyan-100/30 rounded-full blur-3xl transition-transform duration-1000"
          style={{ transform: `translate(${mousePosition.x * 0.3}px, ${mousePosition.y * 0.3}px)` }}
        />
        <div
          className="absolute -bottom-20 right-1/4 w-[300px] h-[300px] bg-gradient-to-tr from-purple-100/20 to-pink-100/20 rounded-full blur-3xl transition-transform duration-1000"
          style={{ transform: `translate(${-mousePosition.x * 0.2}px, ${-mousePosition.y * 0.2}px)` }}
        />
      </div>

      <Container className="relative">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-teal-500/10 to-cyan-500/10 border border-teal-200/50 px-4 py-1.5 text-sm font-medium text-teal-700 mb-6">
            <Award className="w-4 h-4" />
            {t.cases.badge}
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-zinc-900 tracking-tight mb-6">
            {t.cases.title}{" "}
            <span className="relative">
              <span className="relative z-10 bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
                {t.cases.titleHighlight}
              </span>
              <span className="absolute -bottom-1 left-0 right-0 h-2 bg-gradient-to-r from-teal-200 to-cyan-200 -skew-x-3 -z-0" />
            </span>
          </h2>
          <p className="text-lg text-zinc-600 leading-relaxed">
            {t.cases.description}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((item, i) => {
            const Icon = metricIcons[i];
            const color = metricColors[i];
            return (
              <div
                key={item.label}
                className="group relative p-6 bg-gradient-to-b from-zinc-50 to-white rounded-2xl border border-zinc-100 hover:border-transparent hover:shadow-xl hover:shadow-zinc-200/50 transition-all duration-300 text-center"
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <div className="text-4xl font-bold text-zinc-900 mb-1">
                  {item.stat}
                </div>
                <div className="text-sm font-semibold text-zinc-700 mb-1">
                  {item.label}
                </div>
                <p className="text-xs text-zinc-500">{item.description}</p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
