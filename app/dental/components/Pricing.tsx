"use client";

import { useEffect, useState, useRef } from "react";
import { Container, SectionHeading, Button } from "./ui";
import { Check, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const plans = [
  {
    name: "Start",
    price: "49 000",
    period: "месяц",
    description: "Для небольших клиник",
    features: [
      "До 300 диалогов в месяц",
      "Ответы в WhatsApp 24/7",
      "Базовая консультация по услугам",
      "Запись на приём",
      "Email поддержка",
    ],
    popular: false,
  },
  {
    name: "Grow",
    price: "99 000",
    period: "месяц",
    description: "Для растущих клиник",
    features: [
      "До 1000 диалогов в месяц",
      "Всё из тарифа Start",
      "Расширенная консультация",
      "Follow-up и напоминания",
      "Приоритетная поддержка",
      "Аналитика диалогов",
    ],
    popular: true,
  },
  {
    name: "Scale",
    price: "199 000",
    period: "месяц",
    description: "Для сетей клиник",
    features: [
      "Безлимит диалогов",
      "Всё из тарифа Grow",
      "Кастомные сценарии",
      "Интеграция с CRM",
      "Персональный менеджер",
      "SLA 99.9%",
    ],
    popular: false,
  },
];

export function Pricing() {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredPlan, setHoveredPlan] = useState<string | null>(null);
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
    <section ref={sectionRef} id="pricing" className="py-20 md:py-32 bg-white relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-to-b from-teal-50 to-transparent rounded-full blur-3xl opacity-50" />

      <Container className="relative">
        <div className={cn(
          "transition-all duration-1000",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}>
          <SectionHeading
            badge="Тарифы"
            title="Простые и понятные цены"
            description="Один дополнительный пациент полностью окупает месяц работы системы"
          />
        </div>

        <div className="mt-16 grid md:grid-cols-3 gap-8">
          {plans.map((plan, i) => (
            <div
              key={plan.name}
              onMouseEnter={() => setHoveredPlan(plan.name)}
              onMouseLeave={() => setHoveredPlan(null)}
              className={cn(
                "relative p-8 rounded-2xl border-2 transition-all duration-500 cursor-default",
                plan.popular
                  ? "border-teal-600 bg-gradient-to-b from-teal-50/50 to-white scale-105 shadow-xl shadow-teal-100/50"
                  : "border-zinc-100 bg-white hover:border-teal-200 hover:shadow-lg",
                !plan.popular && hoveredPlan === plan.name && "scale-[1.02] -translate-y-1",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              )}
              style={{ transitionDelay: `${i * 150}ms` }}
            >
              {plan.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-teal-600 text-white text-sm font-medium rounded-full flex items-center gap-1.5 shadow-lg">
                  <Sparkles className="w-3.5 h-3.5" />
                  Популярный
                </span>
              )}

              <div className="text-center mb-8">
                <h3 className="text-xl font-semibold text-zinc-900 mb-2">
                  {plan.name}
                </h3>
                <p className="text-sm text-zinc-500 mb-4">{plan.description}</p>
                <div className="flex items-baseline justify-center gap-1">
                  <span className={cn(
                    "text-4xl font-bold transition-colors",
                    plan.popular ? "text-teal-700" : "text-zinc-900"
                  )}>
                    {plan.price}
                  </span>
                  <span className="text-zinc-500">₸/{plan.period}</span>
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, fi) => (
                  <li
                    key={feature}
                    className={cn(
                      "flex items-start gap-3 transition-all duration-300",
                      isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
                    )}
                    style={{ transitionDelay: `${i * 150 + fi * 50}ms` }}
                  >
                    <div className={cn(
                      "w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors",
                      plan.popular ? "bg-teal-100" : "bg-zinc-100"
                    )}>
                      <Check className={cn(
                        "w-3 h-3",
                        plan.popular ? "text-teal-600" : "text-zinc-600"
                      )} />
                    </div>
                    <span className="text-sm text-zinc-600">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                variant={plan.popular ? "primary" : "outline"}
                className={cn(
                  "w-full transition-all duration-300",
                  plan.popular && "shadow-lg shadow-teal-600/25 hover:shadow-xl hover:shadow-teal-600/30"
                )}
              >
                Начать бесплатно
              </Button>
            </div>
          ))}
        </div>

        {/* Trial CTA */}
        <div className={cn(
          "mt-12 text-center transition-all duration-1000 delay-500",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        )}>
          <p className="text-zinc-500">
            Не уверены? Попробуйте{" "}
            <span className="font-semibold text-teal-600 underline decoration-teal-200 underline-offset-4 hover:decoration-teal-400 transition-colors cursor-pointer">
              14 дней бесплатного пилота
            </span>{" "}
            без обязательств
          </p>
        </div>
      </Container>
    </section>
  );
}
