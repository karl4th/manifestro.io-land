"use client";

import { useEffect, useState } from "react";
import { ArrowRight, MessageCircle, Clock, CheckCircle, Brain } from "lucide-react";
import { Container, Button } from "./ui";
import { FloatingNodes } from "@/components/FloatingNodes";

const stats = [
  { icon: Clock, value: "1 сек", label: "Время ответа" },
  { icon: MessageCircle, value: "24/7", label: "Без выходных" },
  { icon: CheckCircle, value: "0%", label: "Потерянных заявок" },
];

export function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section className="relative min-h-screen pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
      {/* Neural network background */}
      <FloatingNodes color="rgba(13, 148, 136, 0.03)" nodeColor="rgba(13, 148, 136, 0.1)" />

      {/* Geometric accents */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute -right-48 -top-48 h-[500px] w-[500px] rounded-full border-2 border-teal-200/30 transition-transform duration-1000 ease-out"
          style={{ transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)` }}
        />
        <div
          className="absolute -left-24 bottom-1/4 h-48 w-48 border-2 border-teal-600/10 transition-transform duration-700 ease-out"
          style={{ transform: `rotate(${12 + mousePosition.x * 0.5}deg)` }}
        />
        <div className="absolute right-[15%] top-[20%] h-3 w-3 bg-teal-600 rounded-full" />
        <div className="absolute left-[20%] bottom-[25%] h-2 w-2 rounded-full bg-teal-400" />
      </div>

      <Container className="relative z-10">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          {/* Badge */}
          <div className="mb-8 animate-fade-in">
            <span className="inline-flex items-center gap-2 rounded-full border border-teal-200 bg-teal-50 px-4 py-1.5 text-sm font-medium text-teal-700">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal-500 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-teal-500" />
              </span>
              AI-ассистент для стоматологий
            </span>
          </div>

          {/* Heading */}
          <h1 className="mb-6 animate-fade-in-up text-4xl md:text-6xl lg:text-7xl font-bold text-zinc-900 tracking-tight leading-[1.1]">
            Стоматология, которая отвечает за{" "}
            <span className="text-teal-600">1 секунду</span>
          </h1>

          {/* Description */}
          <p className="mb-10 animate-fade-in-up text-lg md:text-xl text-zinc-600 leading-relaxed max-w-2xl delay-100">
            Manifestro — автономный sales-агент в WhatsApp. Он отвечает, консультирует и записывает пациентов вместо администратора.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up delay-200">
            <Button size="lg">
              Получить 14 дней бесплатно
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button variant="outline" size="lg">
              Смотреть демо
            </Button>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 mt-16 animate-fade-in-up delay-300">
            {stats.map((stat) => (
              <div key={stat.label} className="flex items-center gap-3 px-6 py-4 bg-white rounded-2xl shadow-sm border border-zinc-100">
                <div className="w-12 h-12 rounded-xl bg-teal-50 flex items-center justify-center">
                  <stat.icon className="w-6 h-6 text-teal-600" />
                </div>
                <div className="text-left">
                  <div className="text-2xl font-bold text-zinc-900">{stat.value}</div>
                  <div className="text-sm text-zinc-500">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
