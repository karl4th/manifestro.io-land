"use client";

import Link from "next/link";
import { Container } from "./ui";
import { useDentalI18n } from "@/lib/i18n";

export function Footer() {
  const { dictionary: t } = useDentalI18n();

  const footerLinks = {
    product: [
      { label: t.footer.links.features, href: "#features" },
      { label: t.footer.links.pricing, href: "#pricing" },
      { label: t.footer.links.faq, href: "#faq" },
    ],
    company: [
      { label: t.footer.links.about, href: "/about" },
      { label: t.footer.links.contact, href: "/contact" },
    ],
    legal: [
      { label: t.footer.links.privacy, href: "/privacy" },
      { label: t.footer.links.terms, href: "/terms" },
    ],
  };

  return (
    <footer className="bg-zinc-900 text-white py-16">
      <Container>
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/dental" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-teal-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">M</span>
              </div>
              <span className="font-semibold">
                Manifestro <span className="text-teal-400">Dental</span>
              </span>
            </Link>
            <p className="text-sm text-zinc-400 leading-relaxed">
              {t.footer.description}
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold mb-4">{t.footer.product}</h4>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-zinc-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">{t.footer.company}</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-zinc-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">{t.footer.legal}</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-zinc-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-zinc-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-zinc-500">
            {t.footer.copyright}
          </p>
          <div className="flex items-center gap-6">
            <a
              href="https://wa.me/77001234567"
              className="text-sm text-zinc-400 hover:text-white transition-colors"
            >
              WhatsApp
            </a>
            <a
              href="mailto:hello@manifestro.io"
              className="text-sm text-zinc-400 hover:text-white transition-colors"
            >
              hello@manifestro.io
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
