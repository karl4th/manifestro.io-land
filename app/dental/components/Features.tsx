"use client";

import { useEffect, useState, useRef } from "react";
import { Container, SectionHeading } from "./ui";
import {
  MessageCircle,
  Stethoscope,
  CalendarCheck,
  Bell,
  HelpCircle,
  BarChart3,
} from "lucide-react";
import { cn } from "@/lib/utils";

const features = [
  {
    icon: MessageCircle,
    title: "Мгновенные ответы",
    description: "Ответ в WhatsApp за 1 секунду, 24/7 без выходных",
  },
  {
    icon: Stethoscope,
    title: "Консультации по услугам",
    description: "Лечение, имплантация, чистка, ортодонтия и другие услуги",
  },
  {
    icon: CalendarCheck,
    title: "Запись на приём",
    description: "Автоматическая запись к нужному специалисту",
  },
  {
    icon: Bell,
    title: "Напоминания и follow-up",
    description: "Автоматические напоминания и повторные касания",
  },
  {
    icon: HelpCircle,
    title: "Ответы на FAQ",
    description: "Цены, адрес, акции, условия — всё автоматически",
  },
  {
    icon: BarChart3,
    title: "Аналитика диалогов",
    description: "Все диалоги в удобной панели с полным контролем",
  },
];

export function Features() {
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
    <section ref={sectionRef} id="features" className="py-20 md:py-32 bg-zinc-50 relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-teal-100 rounded-full blur-3xl opacity-30" />
      <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-blue-100 rounded-full blur-3xl opacity-30" />

      <Container className="relative">
        <div className={cn(
          "transition-all duration-1000",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}>
          <SectionHeading
            badge="Возможности"
            title="Всё, что нужно для работы с пациентами"
            description="Manifestro берёт на себя всю рутину переписки, освобождая ваших администраторов для более важных задач"
          />
        </div>

        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <div
              key={feature.title}
              className={cn(
                "p-6 bg-white rounded-2xl border border-zinc-100 hover:border-teal-200 transition-all duration-500 group cursor-default",
                "hover:shadow-xl hover:shadow-teal-100/50 hover:scale-[1.02] hover:-translate-y-1",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              )}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="w-12 h-12 rounded-xl bg-teal-50 flex items-center justify-center mb-4 group-hover:bg-teal-600 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                <feature.icon className="w-6 h-6 text-teal-600 group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-lg font-semibold text-zinc-900 mb-2 group-hover:text-teal-700 transition-colors">
                {feature.title}
              </h3>
              <p className="text-zinc-600 text-sm leading-relaxed">
                {feature.description}
              </p>
              {/* Hover accent */}
              <div className="mt-4 h-0.5 w-0 bg-gradient-to-r from-teal-500 to-transparent group-hover:w-full transition-all duration-500" />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
