import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Manifestro Dental — AI-ассистент для стоматологий",
  description:
    "Автономный sales-агент в WhatsApp для стоматологий. Отвечает за 1 секунду, консультирует и записывает пациентов 24/7. Получите 14 дней бесплатного пилота.",
  keywords:
    "AI для стоматологии, чат-бот стоматология, WhatsApp бот клиника, автоматизация записи пациентов, CRM стоматология, manifestro dental",
  openGraph: {
    title: "Manifestro Dental — AI-ассистент для стоматологий",
    description:
      "Автономный sales-агент в WhatsApp. Отвечает за 1 секунду, консультирует и записывает пациентов 24/7.",
    url: "https://manifestro.io/dental",
    siteName: "Manifestro",
    locale: "ru_RU",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Manifestro Dental — AI-ассистент для стоматологий",
    description:
      "Автономный sales-агент в WhatsApp. Отвечает за 1 секунду, консультирует и записывает пациентов 24/7.",
  },
};

export default function DentalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
