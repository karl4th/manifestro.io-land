import Link from "next/link";
import { Container } from "./ui";

const footerLinks = {
  product: [
    { label: "Возможности", href: "#features" },
    { label: "Тарифы", href: "#pricing" },
    { label: "FAQ", href: "#faq" },
  ],
  company: [
    { label: "О нас", href: "/about" },
    { label: "Блог", href: "/blog" },
    { label: "Контакты", href: "/contact" },
  ],
  legal: [
    { label: "Политика конфиденциальности", href: "/privacy" },
    { label: "Условия использования", href: "/terms" },
  ],
};

export function Footer() {
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
              AI-ассистент для стоматологий. Отвечает, консультирует и записывает пациентов 24/7.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold mb-4">Продукт</h4>
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
            <h4 className="font-semibold mb-4">Компания</h4>
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
            <h4 className="font-semibold mb-4">Правовая информация</h4>
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
            © 2024 Manifestro. Все права защищены.
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
