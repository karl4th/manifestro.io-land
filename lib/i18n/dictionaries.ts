export const locales = ["en", "ru"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export const dictionaries = {
  en: {
    meta: {
      title: "Manifestro — The End of Human-Dependent Sales",
      description:
        "No more slow replies. No more missed leads. No more human error. Manifestro replaces the weakest link in business: people.",
      keywords:
        "AI sales, sales automation, AI assistant, lead generation, sales AI, no human error, automated sales, manifestro",
    },
    hero: {
      badge: "Coming Soon",
      title: "The End of Human-Dependent Sales",
      subtitle: [
        "No more slow replies.",
        "No more missed leads.",
        "No more human error.",
      ],
      description: "Manifestro replaces the weakest link in business: people.",
      ctaLabel: "Be the first to experience the shift.",
      cta: "Subscribe",
      placeholder: "Enter your email",
    },
    features: {
      ai: "AI-Powered",
      speed: "24/7 Instant",
      accuracy: "Zero Errors",
    },
    footer: {
      copyright: "© 2024 Manifestro. All rights reserved.",
      building: "Replacing humans, one sale at a time",
    },
    language: {
      switch: "RU",
    },
  },
  ru: {
    meta: {
      title: "Manifestro — Конец продаж, зависящих от людей",
      description:
        "Больше никаких медленных ответов. Никаких упущенных лидов. Никаких человеческих ошибок. Manifestro заменяет слабое звено в бизнесе: людей.",
      keywords:
        "ИИ продажи, автоматизация продаж, ИИ ассистент, генерация лидов, AI продажи, без ошибок, автоматические продажи, manifestro",
    },
    hero: {
      badge: "Скоро",
      title: "Конец продаж, зависящих от людей",
      subtitle: [
        "Больше никаких медленных ответов.",
        "Никаких упущенных лидов.",
        "Никаких человеческих ошибок.",
      ],
      description: "Manifestro заменяет слабое звено в бизнесе: людей.",
      ctaLabel: "Будь первым, кто испытает перемены.",
      cta: "Подписаться",
      placeholder: "Введите ваш email",
    },
    features: {
      ai: "На базе ИИ",
      speed: "24/7 Мгновенно",
      accuracy: "Ноль Ошибок",
    },
    footer: {
      copyright: "© 2024 Manifestro. Все права защищены.",
      building: "Заменяем людей, продажа за продажей",
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
