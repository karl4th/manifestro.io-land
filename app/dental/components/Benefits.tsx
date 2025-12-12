"use client";

import { useEffect, useState } from "react";
import { Container } from "./ui";
import {
  TrendingUp,
  Users,
  Clock,
  Heart,
  Target,
  Shield,
  CheckCircle,
} from "lucide-react";
import { useDentalI18n } from "@/lib/i18n";

const benefitIcons = [TrendingUp, Users, Clock, Heart, Target, Shield];
const benefitColors = [
  "from-green-500 to-emerald-500",
  "from-blue-500 to-indigo-500",
  "from-purple-500 to-pink-500",
  "from-red-500 to-orange-500",
  "from-yellow-500 to-orange-500",
  "from-teal-500 to-cyan-500",
];

// Визуализация роста
function GrowthChart() {
  const { dictionary: t } = useDentalI18n();
  return (
    <div className="relative">
      {/* Glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-teal-400/20 via-cyan-400/20 to-purple-400/20 blur-3xl scale-110" />
      
      <div className="relative bg-white rounded-2xl border border-zinc-200 shadow-2xl p-6 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="text-sm text-zinc-500">{t.benefits.chart.title}</div>
            <div className="text-2xl font-bold text-zinc-900">+47%</div>
          </div>
          <div className="flex items-center gap-2 px-3 py-1 bg-green-50 rounded-full">
            <TrendingUp className="w-4 h-4 text-green-600" />
            <span className="text-xs font-medium text-green-700">{t.benefits.chart.growth}</span>
          </div>
        </div>

        {/* Chart bars */}
        <div className="flex items-end gap-2 h-32 mb-4">
          {[40, 55, 45, 65, 50, 75, 60, 85, 70, 95, 80, 100].map((height, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <div
                className={`w-full rounded-t-sm transition-all duration-500 ${
                  i >= 6
                    ? "bg-gradient-to-t from-teal-500 to-cyan-500"
                    : "bg-zinc-200"
                }`}
                style={{ height: `${height}%` }}
              />
            </div>
          ))}
        </div>

        {/* Labels */}
        <div className="flex justify-between text-xs text-zinc-400">
          <span>{t.benefits.chart.before}</span>
          <span>{t.benefits.chart.after}</span>
        </div>

        {/* Floating badges */}
        <div className="absolute -right-2 top-1/3 bg-white rounded-lg shadow-lg px-3 py-2 border border-zinc-100">
          <div className="text-lg font-bold text-teal-600">−30%</div>
          <div className="text-[10px] text-zinc-500">{t.cases.metrics[0].label}</div>
        </div>

        <div className="absolute -left-2 bottom-1/4 bg-white rounded-lg shadow-lg px-3 py-2 border border-zinc-100">
          <div className="text-lg font-bold text-purple-600">3ч</div>
          <div className="text-[10px] text-zinc-500">{t.cases.metrics[1].label}</div>
        </div>
      </div>
    </div>
  );
}

export function Benefits() {
  const { dictionary: t } = useDentalI18n();
  const benefits = t.benefits.list;
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
    <section className="py-24 md:py-32 bg-gradient-to-b from-white to-zinc-50 relative overflow-hidden">
      {/* Floating gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute -top-20 -left-20 w-[400px] h-[400px] bg-gradient-to-br from-teal-100/40 to-cyan-100/40 rounded-full blur-3xl transition-transform duration-1000"
          style={{ transform: `translate(${mousePosition.x * 0.3}px, ${mousePosition.y * 0.3}px)` }}
        />
        <div
          className="absolute -bottom-20 right-20 w-[300px] h-[300px] bg-gradient-to-tr from-purple-100/30 to-pink-100/30 rounded-full blur-3xl transition-transform duration-1000"
          style={{ transform: `translate(${-mousePosition.x * 0.2}px, ${-mousePosition.y * 0.2}px)` }}
        />
      </div>

      <Container className="relative">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Chart */}
          <div className="order-2 lg:order-1">
            <GrowthChart />
          </div>

          {/* Content */}
          <div className="order-1 lg:order-2">
            <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-teal-500/10 to-cyan-500/10 border border-teal-200/50 px-4 py-1.5 text-sm font-medium text-teal-700 mb-6">
              <CheckCircle className="w-4 h-4" />
              {t.benefits.badge}
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 tracking-tight mb-6">
              {t.benefits.title}{" "}
              <span className="relative">
                <span className="relative z-10 bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
                  {t.benefits.titleHighlight}
                </span>
                <span className="absolute -bottom-1 left-0 right-0 h-2 bg-gradient-to-r from-teal-200 to-cyan-200 -skew-x-3 -z-0" />
              </span>
              {" "}{t.benefits.titleEnd}
            </h2>

            <div className="space-y-4">
              {benefits.map((benefit, i) => {
                const Icon = benefitIcons[i];
                const color = benefitColors[i];
                return (
                  <div key={benefit.title} className="group flex gap-4 p-3 rounded-xl hover:bg-white hover:shadow-lg hover:shadow-zinc-100/50 transition-all duration-300">
                    <div className={`flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-zinc-900 mb-0.5">
                        {benefit.title}
                      </h3>
                      <p className="text-sm text-zinc-500">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
