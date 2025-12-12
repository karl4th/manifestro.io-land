"use client";

import { useEffect, useState } from "react";
import { Container } from "./ui";
import { Zap, Brain, Calendar, ArrowRight } from "lucide-react";
import { useDentalI18n } from "@/lib/i18n";

const icons = [Zap, Brain, Calendar];

export function Intro() {
  const { dictionary: t } = useDentalI18n();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const points = t.intro.points;

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
    <section className="py-24 md:py-32 bg-white relative overflow-hidden">
      {/* Floating gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-20 -right-20 w-[400px] h-[400px] bg-gradient-to-br from-teal-100/50 to-cyan-100/50 rounded-full blur-3xl transition-transform duration-1000"
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
            <Brain className="w-4 h-4" />
            {t.intro.badge}
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-zinc-900 tracking-tight mb-6">
            {t.intro.title}{" "}
            <span className="relative">
              <span className="relative z-10 bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
                {t.intro.titleHighlight}
              </span>
              <span className="absolute -bottom-1 left-0 right-0 h-2 bg-gradient-to-r from-teal-200 to-cyan-200 -skew-x-3 -z-0" />
            </span>
            {" "}{t.intro.titleEnd}
          </h2>
          <p className="text-lg text-zinc-600 leading-relaxed">
            {t.intro.description}
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {points.map((point, i) => {
            const Icon = icons[i];
            return (
              <div
                key={point.title}
                className="group relative p-8 rounded-2xl bg-gradient-to-b from-zinc-50 to-white border border-zinc-100 hover:border-teal-200 hover:shadow-xl hover:shadow-teal-100/50 transition-all duration-500"
              >
                {/* Metric badge */}
                <div className="absolute -top-3 right-6 bg-white px-3 py-1 rounded-full border border-zinc-100 shadow-sm">
                  <span className="text-sm font-bold text-teal-600">{point.metric}</span>
                  <span className="text-xs text-zinc-500 ml-1">{point.metricLabel}</span>
                </div>

                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-teal-500/25">
                  <Icon className="w-7 h-7 text-white" />
                </div>
                
                <h3 className="text-xl font-semibold text-zinc-900 mb-3">
                  {point.title}
                </h3>
                <p className="text-zinc-600 leading-relaxed mb-4">
                  {point.description}
                </p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
