export const locales = ["en", "ru"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export const dictionaries = {
  en: {
    meta: {
      title: "Manifestro — AI-Powered Future is Coming",
      description:
        "Manifestro is building the next generation of AI solutions. Something powerful is on the way. Stay tuned for the revolution.",
      keywords:
        "AI, artificial intelligence, machine learning, startup, innovation, technology, future, manifestro",
    },
    hero: {
      badge: "Something Big is Coming",
      title: "The Future of AI",
      titleHighlight: "Starts Here",
      description:
        "We're crafting something extraordinary. An AI revolution that will transform the way you work, create, and think.",
      cta: "Get Notified",
      placeholder: "Enter your email",
    },
    features: {
      ai: "AI-Powered",
      innovation: "Innovation",
      future: "Future-Ready",
    },
    footer: {
      copyright: "© 2025 Manifestro. All rights reserved.",
      building: "Building the future with AI",
    },
    language: {
      switch: "RU",
    },
  },
  ru: {
    meta: {
      title: "Manifestro — Будущее с ИИ уже близко",
      description:
        "Manifestro создаёт решения нового поколения на базе искусственного интеллекта. Что-то мощное уже на подходе. Следите за революцией.",
      keywords:
        "ИИ, искусственный интеллект, машинное обучение, стартап, инновации, технологии, будущее, manifestro",
    },
    hero: {
      badge: "Что-то Грандиозное Приближается",
      title: "Будущее ИИ",
      titleHighlight: "Начинается Здесь",
      description:
        "Мы создаём нечто экстраординарное. ИИ-революция, которая изменит то, как вы работаете, творите и мыслите.",
      cta: "Узнать Первым",
      placeholder: "Введите ваш email",
    },
    features: {
      ai: "На базе ИИ",
      innovation: "Инновации",
      future: "Готов к Будущему",
    },
    footer: {
      copyright: "© 2025 Manifestro. Все права защищены.",
      building: "Строим будущее с ИИ",
    },
    language: {
      switch: "EN",
    },
  },
} as const;

export type Dictionary = (typeof dictionaries)[Locale];

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] || dictionaries[defaultLocale];
}
