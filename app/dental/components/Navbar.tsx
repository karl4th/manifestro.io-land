"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Globe } from "lucide-react";
import { Container, Button } from "./ui";
import { useDentalI18n } from "@/lib/i18n";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const { dictionary: t, locale, setLocale } = useDentalI18n();

  const navLinks = [
    { href: "#features", label: t.nav.features },
    { href: "#pricing", label: t.nav.pricing },
    { href: "#faq", label: t.nav.faq },
  ];

  const languages = [
    { code: "kk" as const, label: "Қазақша", flag: "🇰🇿" },
    { code: "en" as const, label: "English", flag: "🇺🇸" },
    { code: "ru" as const, label: "Русский", flag: "🇷🇺" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-zinc-100">
      <Container>
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/dental" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-teal-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-sm font-bold">M</span>
            </div>
            <span className="font-semibold text-zinc-900">
              Manifestro <span className="text-teal-600">Dental</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-zinc-600 hover:text-zinc-900 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Language + CTA */}
          <div className="hidden md:flex items-center gap-3">
            {/* Language Switcher */}
            <div className="relative">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-zinc-600 hover:text-zinc-900 rounded-lg hover:bg-zinc-100 transition-colors"
              >
                <Globe className="w-4 h-4" />
                {languages.find(l => l.code === locale)?.flag}
              </button>
              {langOpen && (
                <div className="absolute right-0 top-full mt-1 bg-white rounded-lg shadow-lg border border-zinc-100 py-1 min-w-[140px]">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLocale(lang.code);
                        setLangOpen(false);
                      }}
                      className={`w-full px-3 py-2 text-left text-sm flex items-center gap-2 hover:bg-zinc-50 ${
                        locale === lang.code ? "text-teal-600 font-medium" : "text-zinc-600"
                      }`}
                    >
                      <span>{lang.flag}</span>
                      {lang.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <Button size="sm">{t.nav.cta}</Button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-zinc-600"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Nav */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-zinc-100">
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm text-zinc-600 hover:text-zinc-900"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              {/* Mobile Language Switcher */}
              <div className="flex gap-2 py-2">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => setLocale(lang.code)}
                    className={`px-3 py-1.5 text-sm rounded-lg ${
                      locale === lang.code
                        ? "bg-teal-100 text-teal-700"
                        : "bg-zinc-100 text-zinc-600"
                    }`}
                  >
                    {lang.flag}
                  </button>
                ))}
              </div>
              <Button size="sm" className="mt-2">
                {t.nav.cta}
              </Button>
            </div>
          </div>
        )}
      </Container>
    </nav>
  );
}
