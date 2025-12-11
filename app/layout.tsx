import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { I18nProvider } from "@/lib/i18n";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Manifestro — AI-Powered Future is Coming",
  description:
    "Manifestro is building the next generation of AI solutions. Something powerful is on the way. Stay tuned for the revolution.",
  keywords:
    "AI, artificial intelligence, machine learning, startup, innovation, technology, future, manifestro",
  authors: [{ name: "Manifestro" }],
  creator: "Manifestro",
  publisher: "Manifestro",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: "ru_RU",
    url: "https://manifestro.io",
    siteName: "Manifestro",
    title: "Manifestro — AI-Powered Future is Coming",
    description:
      "Manifestro is building the next generation of AI solutions. Something powerful is on the way.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Manifestro — AI-Powered Future is Coming",
    description:
      "Manifestro is building the next generation of AI solutions. Something powerful is on the way.",
  },
  metadataBase: new URL("https://manifestro.io"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <I18nProvider>{children}</I18nProvider>
      </body>
    </html>
  );
}
