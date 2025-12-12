"use client";

import { useEffect, useState } from "react";
import { Container } from "./ui";
import {
  MessageCircle,
  Stethoscope,
  CalendarCheck,
  Bell,
  HelpCircle,
  BarChart3,
  Layers,
  TrendingUp,
} from "lucide-react";
import { useDentalI18n } from "@/lib/i18n";

const featureIcons = [MessageCircle, Stethoscope, CalendarCheck, Bell, HelpCircle, BarChart3];
const featureColors = [
  "from-teal-500 to-cyan-500",
  "from-purple-500 to-pink-500",
  "from-blue-500 to-indigo-500",
  "from-orange-500 to-red-500",
  "from-green-500 to-emerald-500",
  "from-yellow-500 to-orange-500",
];

// Мини-дашборд для демонстрации
function DashboardPreview() {
  const { dictionary: t } = useDentalI18n();
  const [activeConversation, setActiveConversation] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveConversation((prev) => (prev + 1) % 3);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const conversations = t.features.dashboard.conversations;

  return (
    <div className="relative">
      {/* Glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-teal-400/20 via-cyan-400/20 to-purple-400/20 blur-3xl scale-110" />
      
      <div className="relative bg-white rounded-2xl border border-zinc-200 shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="px-5 py-4 border-b border-zinc-100 flex items-center justify-between bg-gradient-to-r from-zinc-50 to-white">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg shadow-teal-500/25">
              <span className="text-white text-sm font-bold">M</span>
            </div>
            <div>
              <span className="font-semibold text-zinc-900">Manifestro</span>
              <span className="text-zinc-400 ml-1">Dashboard</span>
            </div>
          </div>
          <div className="flex items-center gap-2 px-3 py-1 bg-green-50 rounded-full">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
            </span>
            <span className="text-xs font-medium text-green-700">{t.features.dashboard.online}</span>
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 divide-x divide-zinc-100 border-b border-zinc-100">
          {[
            { value: "847", label: t.features.dashboard.stats.conversations, trend: "+12%" },
            { value: "94%", label: t.features.dashboard.stats.processed, trend: "+5%" },
            { value: "12с", label: t.features.dashboard.stats.avgResponse, trend: "−3с" },
          ].map((stat, i) => (
            <div key={i} className="px-4 py-4 text-center">
              <div className="text-2xl font-bold text-zinc-900">{stat.value}</div>
              <div className="text-xs text-zinc-500">{stat.label}</div>
              <div className="text-[10px] text-green-600 font-medium mt-1">{stat.trend}</div>
            </div>
          ))}
        </div>

        {/* Recent conversations */}
        <div className="p-4">
          <div className="text-xs font-medium text-zinc-400 uppercase tracking-wide mb-3">{t.features.dashboard.recentTitle}</div>
          <div className="space-y-2">
            {conversations.map((item, i) => (
              <div
                key={i}
                className={`flex items-center justify-between p-3 rounded-xl transition-all duration-300 ${
                  activeConversation === i
                    ? "bg-teal-50 border border-teal-200"
                    : "hover:bg-zinc-50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-semibold ${
                    activeConversation === i
                      ? "bg-gradient-to-br from-teal-500 to-cyan-500 text-white"
                      : "bg-zinc-100 text-zinc-600"
                  }`}>
                    {item.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-zinc-900">{item.name}</div>
                    <div className="text-xs text-zinc-500">{item.status}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function Features() {
  const { dictionary: t } = useDentalI18n();
  const features = t.features.list;
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
    <section id="features" className="py-24 md:py-32 bg-gradient-to-b from-zinc-50 to-white relative overflow-hidden">
      {/* Floating gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-40 -left-20 w-[400px] h-[400px] bg-gradient-to-br from-teal-100/40 to-cyan-100/40 rounded-full blur-3xl transition-transform duration-1000"
          style={{ transform: `translate(${mousePosition.x * 0.3}px, ${mousePosition.y * 0.3}px)` }}
        />
        <div
          className="absolute -bottom-20 right-20 w-[300px] h-[300px] bg-gradient-to-tr from-purple-100/30 to-pink-100/30 rounded-full blur-3xl transition-transform duration-1000"
          style={{ transform: `translate(${-mousePosition.x * 0.2}px, ${-mousePosition.y * 0.2}px)` }}
        />
      </div>

      <Container className="relative">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-teal-500/10 to-cyan-500/10 border border-teal-200/50 px-4 py-1.5 text-sm font-medium text-teal-700 mb-6">
            <Layers className="w-4 h-4" />
            {t.features.badge}
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-zinc-900 tracking-tight mb-6">
            {t.features.title}{" "}
            <span className="relative">
              <span className="relative z-10 bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
                {t.features.titleHighlight}
              </span>
              <span className="absolute -bottom-1 left-0 right-0 h-2 bg-gradient-to-r from-teal-200 to-cyan-200 -skew-x-3 -z-0" />
            </span>
            {" "}{t.features.titleEnd}
          </h2>
          <p className="text-lg text-zinc-600 leading-relaxed">
            {t.features.description}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Features list */}
          <div className="grid sm:grid-cols-2 gap-4">
            {features.map((feature, i) => {
              const Icon = featureIcons[i];
              const color = featureColors[i];
              return (
                <div
                  key={feature.title}
                  className="group p-5 bg-white rounded-2xl border border-zinc-100 hover:border-transparent hover:shadow-xl hover:shadow-zinc-200/50 transition-all duration-300"
                >
                  <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`} style={{ boxShadow: `0 8px 20px -4px rgba(0,0,0,0.15)` }}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="font-semibold text-zinc-900 mb-1">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-zinc-500">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Dashboard preview */}
          <div className="relative lg:pl-8">
            <DashboardPreview />
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-zinc-900 text-white px-5 py-2 rounded-full text-sm font-medium shadow-lg">
              {t.features.dashboard.title}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
