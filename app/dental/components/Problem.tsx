"use client";

import { useEffect, useState } from "react";
import { Container } from "./ui";
import { Clock, Users, TrendingUp, MessageSquare, Sparkles } from "lucide-react";
import { useDentalI18n } from "@/lib/i18n";
import { useIsMobile } from "@/lib/hooks/use-mobile";

const icons = [Clock, Users, TrendingUp, MessageSquare];
const colors = [
  "from-teal-500 to-cyan-500",
  "from-purple-500 to-pink-500",
  "from-orange-500 to-red-500",
  "from-green-500 to-emerald-500",
];

export function Problem() {
  const { dictionary: t } = useDentalI18n();
  const isMobile = useIsMobile();
  const challenges = t.problem.challenges;
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
    <section className="py-24 md:py-32 bg-zinc-900 text-white relative overflow-hidden">
      {/* Animated gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-gradient-to-br from-teal-500/10 to-cyan-500/10 rounded-full blur-3xl transition-transform duration-1000"
          style={{ transform: `translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px)` }}
        />
        <div
          className="absolute -bottom-40 -left-40 w-[400px] h-[400px] bg-gradient-to-tr from-purple-500/10 to-pink-500/10 rounded-full blur-3xl transition-transform duration-1000"
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
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/5 border border-white/10 px-4 py-1.5 text-sm font-medium text-zinc-300 mb-6 backdrop-blur-sm">
            <Sparkles className="w-4 h-4 text-teal-400" />
            {t.problem.badge}
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-6">
            {t.problem.title}{" "}
            <span className="relative">
              <span className="relative z-10 bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">
                {t.problem.titleHighlight}
              </span>
              <span className="absolute -bottom-1 left-0 right-0 h-2 bg-gradient-to-r from-teal-500/30 to-cyan-500/30 -skew-x-3 -z-0" />
            </span>
            {" "}{t.problem.titleEnd}
          </h2>
          <p className="text-lg text-zinc-400 leading-relaxed">
            {t.problem.description}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          {challenges.map((challenge, i) => {
            const Icon = icons[i];
            const color = colors[i];
            return (
              <div
                key={challenge.title}
                className="group relative p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-500 backdrop-blur-sm"
              >
                {/* Gradient line on top */}
                <div className={`absolute top-0 left-6 right-6 h-0.5 bg-gradient-to-r ${color} opacity-0 group-hover:opacity-100 transition-opacity rounded-full`} />
                
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-white">{challenge.stat}</div>
                    <div className="text-xs text-zinc-500">{challenge.statLabel}</div>
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-teal-300 transition-colors">
                  {challenge.title}
                </h3>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  {challenge.description}
                </p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
