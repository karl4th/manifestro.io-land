import Image from "next/image";
import { Container, SectionHeading } from "./ui";
import {
  TrendingUp,
  Users,
  Clock,
  Heart,
  Target,
  Shield,
} from "lucide-react";

const benefits = [
  {
    icon: TrendingUp,
    title: "Больше первичных записей",
    description:
      "Пациенты выбирают ту клинику, которая отвечает первой. Моментальный ответ → выше вероятность записи.",
  },
  {
    icon: Users,
    title: "Снижение нагрузки на админов",
    description:
      "Переписка уходит из рук персонала. Они занимаются приёмом пациентов, а не гонкой с WhatsApp.",
  },
  {
    icon: Clock,
    title: "Равномерный сервис 24/7",
    description:
      "Никаких задержек, выходных или человеческого фактора. Каждый пациент получает одинаково качественный опыт.",
  },
  {
    icon: Heart,
    title: "Рост доверия пациентов",
    description:
      "Пациенты получают чёткие ответы на вопросы и чувствуют заботу с первого сообщения.",
  },
  {
    icon: Target,
    title: "Увеличение конверсии",
    description:
      "Manifestro ведёт диалог аккуратно и последовательно. Пациенты с большей вероятностью доходят до записи.",
  },
  {
    icon: Shield,
    title: "Это не бот — это агент",
    description:
      "Понимает смысл сообщений, различает симптомы и намерения, ведёт живой диалог как обученный администратор.",
  },
];

export function Benefits() {
  return (
    <section className="py-20 md:py-32 bg-white">
      <Container>
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <div className="relative order-2 lg:order-1">
            <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-teal-50 to-blue-50 flex items-center justify-center">
              <div className="text-center p-8">
                <div className="w-20 h-20 bg-teal-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-10 h-10 text-teal-600" />
                </div>
                <p className="text-zinc-400 text-sm max-w-xs mx-auto">
                  📸 Фото: Счастливый администратор клиники за компьютером, или график роста записей, или интерфейс дашборда Manifestro
                </p>
              </div>
            </div>
            
            {/* Floating stats */}
            <div className="absolute -right-4 -bottom-4 bg-white rounded-xl shadow-xl p-4 border border-zinc-100">
              <div className="text-2xl font-bold text-teal-600">+40%</div>
              <div className="text-sm text-zinc-500">рост записей</div>
            </div>
          </div>

          {/* Content */}
          <div className="order-1 lg:order-2">
            <SectionHeading
              align="left"
              badge="Преимущества"
              title="Почему клиники выбирают Manifestro"
            />

            <div className="mt-10 space-y-6">
              {benefits.map((benefit) => (
                <div key={benefit.title} className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-teal-50 flex items-center justify-center">
                    <benefit.icon className="w-5 h-5 text-teal-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-zinc-900 mb-1">
                      {benefit.title}
                    </h3>
                    <p className="text-sm text-zinc-600 leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
