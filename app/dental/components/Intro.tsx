import { Container, SectionHeading } from "./ui";
import { Zap, Brain, Calendar } from "lucide-react";

const points = [
  {
    icon: Zap,
    title: "Мгновенный ответ",
    description: "Система отвечает за 1 секунду, пока конкуренты думают",
  },
  {
    icon: Brain,
    title: "Умная консультация",
    description: "Задаёт уточняющие вопросы и подбирает услуги",
  },
  {
    icon: Calendar,
    title: "Автоматическая запись",
    description: "Записывает на приём без участия администратора",
  },
];

export function Intro() {
  return (
    <section className="py-20 md:py-32 bg-white relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-teal-50 rounded-full blur-3xl opacity-50" />
      
      <Container className="relative">
        <SectionHeading
          badge="Что такое Manifestro"
          title="Ваш идеальный администратор, который никогда не ошибается"
          description="Manifestro — это система, которая ведёт переписку вместо администратора. Отвечает мгновенно, задаёт уточняющие вопросы, записывает на приём."
        />

        <div className="mt-16 grid md:grid-cols-3 gap-6">
          {points.map((point, i) => (
            <div
              key={point.title}
              className="relative p-8 rounded-2xl bg-zinc-50/80 backdrop-blur-sm border border-zinc-100 hover:border-teal-200 hover:bg-white hover:shadow-xl hover:shadow-teal-100/50 transition-all duration-300 group"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-6 group-hover:bg-teal-600 group-hover:shadow-lg group-hover:shadow-teal-600/25 transition-all duration-300">
                <point.icon className="w-7 h-7 text-teal-600 group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-xl font-semibold text-zinc-900 mb-3">
                {point.title}
              </h3>
              <p className="text-zinc-600 leading-relaxed">
                {point.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
