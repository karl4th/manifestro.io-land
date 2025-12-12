"use client";

import { useEffect, useState, useRef } from "react";
import { Container, SectionHeading } from "./ui";
import { TrendingUp, MessageCircle, Target, Clock, Quote } from "lucide-react";
import { cn } from "@/lib/utils";

const cases = [
  {
    icon: TrendingUp,
    stat: "+28%",
    label: "конверсия в запись",
    description: "Рост первичных записей через WhatsApp",
    soon: true,
  },
  {
    icon: MessageCircle,
    stat: "+47%",
    label: "обработанных заявок",
    description: "Больше диалогов без увеличения штата",
    soon: true,
  },
  {
    icon: Target,
    stat: "0%",
    label: "потерянных лидов",
    description: "Каждое обращение получает ответ",
    soon: true,
  },
  {
    icon: Clock,
    stat: "1 сек",
    label: "время ответа",
    description: "Вместо 10-20 минут ожидания",
    soon: false,
  },
];

export function Cases() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 md:py-32 bg-zinc-50 relative overflow-hidden">
      <Container>
        <div className={cn(
          "transition-all duration-1000",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}>
          <SectionHeading
            badge="Результаты"
            title="Что получают клиники с Manifestro"
            description="Реальные метрики от наших первых клиентов"
          />
        </div>

        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cases.map((item, i) => (
            <div
              key={item.label}
              className={cn(
                "relative p-8 bg-white rounded-2xl border border-zinc-100 text-center group cursor-default",
                "hover:border-teal-200 hover:shadow-xl hover:shadow-teal-100/50 hover:scale-[1.03] hover:-translate-y-1 transition-all duration-500",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              )}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              {item.soon && (
                <span className="absolute top-4 right-4 px-2 py-1 bg-amber-50 text-amber-600 text-xs font-medium rounded-full animate-pulse">
                  Скоро кейс
                </span>
              )}
              <div className="w-14 h-14 rounded-2xl bg-teal-50 flex items-center justify-center mx-auto mb-4 group-hover:bg-teal-600 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                <item.icon className="w-7 h-7 text-teal-600 group-hover:text-white transition-colors" />
              </div>
              <div className="text-4xl font-bold text-zinc-900 mb-1 group-hover:text-teal-700 transition-colors">
                {item.stat}
              </div>
              <div className="text-sm font-medium text-teal-600 mb-2">
                {item.label}
              </div>
              <p className="text-sm text-zinc-500">{item.description}</p>
            </div>
          ))}
        </div>

        {/* Testimonial placeholder */}
        <div
          className={cn(
            "mt-16 p-8 md:p-12 bg-white rounded-2xl border border-zinc-100 relative overflow-hidden transition-all duration-1000 delay-500",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          {/* Decorative quote */}
          <Quote className="absolute top-6 left-6 w-12 h-12 text-teal-100" />
          
          <div className="max-w-3xl mx-auto text-center relative">
            <div className="w-16 h-16 bg-gradient-to-br from-teal-100 to-teal-50 rounded-full mx-auto mb-6 flex items-center justify-center ring-4 ring-teal-50">
              <span className="text-2xl">👤</span>
            </div>
            <blockquote className="text-xl md:text-2xl text-zinc-700 italic mb-6 leading-relaxed">
              "Здесь будет отзыв от первой клиники-партнёра о том, как Manifestro изменил их работу с пациентами"
            </blockquote>
            <div>
              <div className="font-semibold text-zinc-900">Имя Фамилия</div>
              <div className="text-sm text-zinc-500">
                Должность, Название клиники
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
