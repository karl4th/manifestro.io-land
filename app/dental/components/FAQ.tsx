"use client";

import { useState } from "react";
import { Container, SectionHeading } from "./ui";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const faqs = [
  {
    question: "Это бот?",
    answer:
      "Нет, это не бот с кнопками и меню. Manifestro — это автономный AI-агент, который понимает смысл сообщений, различает симптомы и намерения, ведёт живой диалог как обученный администратор.",
  },
  {
    question: "Как быстро подключается?",
    answer:
      "Подключение занимает 24-48 часов. Мы настраиваем систему под ваши услуги, цены и расписание врачей. После этого Manifestro готов к работе.",
  },
  {
    question: "Опасно ли отдавать чат ИИ?",
    answer:
      "Все диалоги доступны в удобной панели — вы видите каждый шаг и при желании можете вмешаться в любой момент. Система обучена на медицинских сценариях и не даёт медицинских рекомендаций.",
  },
  {
    question: "Как он знает наши услуги?",
    answer:
      "Перед запуском мы загружаем информацию о ваших услугах, ценах, врачах и расписании. Система адаптируется под вашу клинику и отвечает точно по вашим данным.",
  },
  {
    question: "Что если клиент спросит сложный вопрос?",
    answer:
      "Если вопрос выходит за рамки компетенции системы, она корректно передаст диалог администратору или предложит пациенту позвонить. Никаких выдуманных ответов.",
  },
  {
    question: "Нужно ли менять CRM?",
    answer:
      "Нет, Manifestro работает независимо и может интегрироваться с вашей текущей CRM. На тарифе Scale мы настраиваем полную интеграцию.",
  },
  {
    question: "Как мы контролируем переписку?",
    answer:
      "У вас есть доступ к панели управления, где видны все диалоги в реальном времени. Вы можете читать переписку, вмешиваться и получать отчёты.",
  },
];

function FAQItem({
  question,
  answer,
  isOpen,
  onClick,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}) {
  return (
    <div className="border-b border-zinc-100 last:border-0">
      <button
        onClick={onClick}
        className="w-full py-6 flex items-center justify-between text-left"
      >
        <span className="text-lg font-medium text-zinc-900 pr-8">
          {question}
        </span>
        <ChevronDown
          className={cn(
            "w-5 h-5 text-zinc-400 transition-transform flex-shrink-0",
            isOpen && "rotate-180"
          )}
        />
      </button>
      <div
        className={cn(
          "overflow-hidden transition-all duration-300",
          isOpen ? "max-h-96 pb-6" : "max-h-0"
        )}
      >
        <p className="text-zinc-600 leading-relaxed">{answer}</p>
      </div>
    </div>
  );
}

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-20 md:py-32 bg-zinc-50">
      <Container>
        <SectionHeading
          badge="FAQ"
          title="Частые вопросы"
          description="Ответы на самые популярные вопросы о Manifestro"
        />

        <div className="mt-16 max-w-3xl mx-auto bg-white rounded-2xl border border-zinc-100 p-2 md:p-4">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
