import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
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
  title: "Manifestro — The End of Human-Dependent Sales",
  description:
    "No more slow replies. No more missed leads. No more human error. Manifestro replaces the weakest link in business: people.",
  keywords:
    "AI sales, sales automation, AI assistant, lead generation, sales AI, no human error, automated sales, manifestro",
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
    title: "Manifestro — The End of Human-Dependent Sales",
    description:
      "No more slow replies. No more missed leads. No more human error. Manifestro replaces the weakest link in business.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Manifestro — The End of Human-Dependent Sales",
    description:
      "No more slow replies. No more missed leads. No more human error. Manifestro replaces the weakest link in business.",
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
      <head>
        <meta name="google-site-verification" content="hyx95IFIGVSmtl8Gv58-KD-o3u6xGjkrRA_YaoFQZiM" />
        {/* Google tag (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-QVNSYZQHK2"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-QVNSYZQHK2');
          `}
        </Script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <I18nProvider>{children}</I18nProvider>
      </body>
    </html>
  );
}
