"use client";

import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Container, Button } from "./ui";
import { FloatingNodes } from "@/components/FloatingNodes";

export function CTA() {
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
    <section className="py-20 md:py-32 bg-zinc-900 relative overflow-hidden">
      {/* Neural network background */}
      <FloatingNodes color="rgba(255, 255, 255, 0.02)" nodeColor="rgba(255, 255, 255, 0.05)" />

      <Container className="relative">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-teal-600 to-teal-700 p-8 md:p-16">
          {/* Animated decorative elements */}
          <div
            className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl transition-transform duration-1000"
            style={{ transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)` }}
          />
          <div
            className="absolute bottom-0 left-0 w-64 h-64 bg-teal-400/20 rounded-full blur-2xl transition-transform duration-1000"
            style={{ transform: `translate(${-mousePosition.x}px, ${-mousePosition.y}px)` }}
          />

          <div className="relative max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              Получите 14 дней бесплатного пилота
            </h2>
            <p className="text-lg md:text-xl text-teal-100 mb-8 max-w-2xl mx-auto">
              Мы докажем, что вы теряете пациентов из-за медленных ответов. И мы их вернём.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-white text-teal-700 hover:bg-zinc-100 shadow-xl hover:shadow-2xl hover:scale-105 transition-all"
              >
                Подключить Manifestro
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-white/30 text-white hover:bg-white/10 hover:border-white/50"
              >
                Связаться с нами
              </Button>
            </div>

            <p className="mt-8 text-sm text-teal-200">
              Без обязательств • Настройка за 24 часа • Поддержка на всех этапах
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
