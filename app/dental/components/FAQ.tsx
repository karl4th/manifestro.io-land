"use client";

import { useState } from "react";
import { Container } from "./ui";
import { ChevronDown, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { useDentalI18n } from "@/lib/i18n";

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
  const { dictionary: t } = useDentalI18n();
  const faqs = t.faq.questions;
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-20 md:py-32 bg-zinc-50">
      <Container>
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-teal-500/10 to-cyan-500/10 border border-teal-200/50 px-4 py-1.5 text-sm font-medium text-teal-700 mb-6">
            <HelpCircle className="w-4 h-4" />
            {t.faq.badge}
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-zinc-900 tracking-tight mb-6">
            {t.faq.title}{" "}
            <span className="relative">
              <span className="relative z-10 bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
                {t.faq.titleHighlight}
              </span>
              <span className="absolute -bottom-1 left-0 right-0 h-2 bg-gradient-to-r from-teal-200 to-cyan-200 -skew-x-3 -z-0" />
            </span>
          </h2>
        </div>

        <div className="max-w-3xl mx-auto bg-white rounded-2xl border border-zinc-100 p-2 md:p-4">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.q}
              answer={faq.a}
              isOpen={openIndex === index}
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
