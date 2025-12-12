"use client";

import { useEffect, useState, useRef } from "react";
import { ArrowRight, Sparkles, Zap, Shield, Clock } from "lucide-react";
import { Container, Button } from "./ui";
import { useDentalI18n } from "@/lib/i18n";
import { useIsMobile } from "@/lib/hooks/use-mobile";

function ChatDemo() {
  const { dictionary: t } = useDentalI18n();
  const chatMessages = t.hero.chat.messages;
  const [visibleMessages, setVisibleMessages] = useState<number>(0);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (visibleMessages >= chatMessages.length) {
      const resetTimer = setTimeout(() => {
        setVisibleMessages(0);
      }, 4000);
      return () => clearTimeout(resetTimer);
    }

    const nextMessage = chatMessages[visibleMessages];
    const showTyping = nextMessage?.type === "bot";

    if (showTyping) {
      setIsTyping(true);
      const typingTimer = setTimeout(() => {
        setIsTyping(false);
        setVisibleMessages((v) => v + 1);
      }, 1000);
      return () => clearTimeout(typingTimer);
    } else {
      const timer = setTimeout(() => {
        setVisibleMessages((v) => v + 1);
      }, visibleMessages === 0 ? 800 : 1200);
      return () => clearTimeout(timer);
    }
  }, [visibleMessages]);

  // Auto-scroll only within chat container, not the page
  useEffect(() => {
    if (messagesEndRef.current) {
      const container = messagesEndRef.current.parentElement;
      if (container) {
        container.scrollTop = container.scrollHeight;
      }
    }
  }, [visibleMessages, isTyping]);

  return (
    <div className="relative w-[280px] mx-auto">
      {/* Glow effect behind phone */}
      <div className="absolute inset-0 bg-gradient-to-r from-teal-400/20 via-cyan-400/20 to-teal-400/20 blur-3xl scale-125" />
      
      {/* Phone frame - 9:19.5 aspect ratio like iPhone */}
      <div className="relative bg-zinc-900 rounded-[2.5rem] p-2 shadow-2xl shadow-zinc-900/20">
        {/* Dynamic Island */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-24 h-6 bg-zinc-900 rounded-full z-10" />
        
        <div className="bg-white rounded-[2rem] overflow-hidden">
          {/* Status bar */}
          <div className="bg-zinc-900 text-white px-5 py-2 flex justify-between items-center text-[10px]">
            <span className="font-medium">9:41</span>
            <div className="flex items-center gap-1">
              <div className="flex gap-0.5">
                <div className="w-0.5 h-0.5 bg-white rounded-full" />
                <div className="w-0.5 h-0.5 bg-white rounded-full" />
                <div className="w-0.5 h-0.5 bg-white rounded-full" />
                <div className="w-0.5 h-0.5 bg-white/50 rounded-full" />
              </div>
              <span className="ml-0.5">5G</span>
              <div className="w-5 h-2.5 border border-white rounded-sm ml-0.5">
                <div className="w-3 h-full bg-white rounded-sm" />
              </div>
            </div>
          </div>

          {/* WhatsApp Header */}
          <div className="bg-teal-600 px-3 py-2 flex items-center gap-2">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-semibold">M</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-white font-medium text-xs truncate">{t.hero.chat.clinicName}</div>
              <div className="text-teal-100 text-[10px] flex items-center gap-1">
                <span className="w-1 h-1 bg-green-400 rounded-full" />
                {t.hero.chat.online}
              </div>
            </div>
          </div>

          {/* Messages - taller for phone proportions */}
          <div className="h-[420px] bg-[#e5ddd5] p-2 space-y-1.5 overflow-y-auto">
            {chatMessages.slice(0, visibleMessages).map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"} animate-fade-in-up`}
                style={{ animationDelay: `${i * 50}ms` }}
              >
                <div
                  className={`max-w-[85%] px-2.5 py-1.5 rounded-lg text-xs shadow-sm ${
                    msg.type === "user"
                      ? "bg-[#dcf8c6] text-zinc-800 rounded-tr-none"
                      : "bg-white text-zinc-800 rounded-tl-none"
                  }`}
                >
                  {msg.text}
                  <div className={`text-[9px] mt-0.5 ${msg.type === "user" ? "text-right text-zinc-500" : "text-zinc-400"}`}>
                    {msg.type === "bot" && <span className="text-teal-600 mr-0.5">AI</span>}
                    9:4{i + 1}
                  </div>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start animate-fade-in">
                <div className="bg-white px-3 py-2 rounded-lg rounded-tl-none shadow-sm">
                  <div className="flex gap-1">
                    <span className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input bar */}
          <div className="bg-[#f0f0f0] px-2 py-1.5 flex items-center gap-1.5">
            <div className="flex-1 bg-white rounded-full px-3 py-1.5 text-xs text-zinc-400">
              Сообщение
            </div>
            <div className="w-8 h-8 bg-teal-600 rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
            </div>
          </div>
          
          {/* Home indicator */}
          <div className="bg-white py-2 flex justify-center">
            <div className="w-28 h-1 bg-zinc-900 rounded-full" />
          </div>
        </div>
      </div>

      {/* Floating badges around phone */}
      <div className="absolute -left-4 top-1/4 bg-white rounded-xl shadow-lg px-3 py-2 flex items-center gap-2 animate-float">
        <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
          <Zap className="w-4 h-4 text-green-600" />
        </div>
        <div>
          <div className="text-xs font-semibold text-zinc-900">{t.hero.floatingBadges.speed.title}</div>
          <div className="text-[10px] text-zinc-500">{t.hero.floatingBadges.speed.subtitle}</div>
        </div>
      </div>

      <div className="absolute -right-4 top-1/3 bg-white rounded-xl shadow-lg px-3 py-2 flex items-center gap-2 animate-float" style={{ animationDelay: "1s" }}>
        <div className="w-8 h-8 bg-teal-100 rounded-lg flex items-center justify-center">
          <Shield className="w-4 h-4 text-teal-600" />
        </div>
        <div>
          <div className="text-xs font-semibold text-zinc-900">{t.hero.floatingBadges.accuracy.title}</div>
          <div className="text-[10px] text-zinc-500">{t.hero.floatingBadges.accuracy.subtitle}</div>
        </div>
      </div>

      <div className="absolute -right-2 bottom-1/4 bg-white rounded-xl shadow-lg px-3 py-2 flex items-center gap-2 animate-float" style={{ animationDelay: "2s" }}>
        <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
          <Clock className="w-4 h-4 text-purple-600" />
        </div>
        <div>
          <div className="text-xs font-semibold text-zinc-900">{t.hero.floatingBadges.availability.title}</div>
          <div className="text-[10px] text-zinc-500">{t.hero.floatingBadges.availability.subtitle}</div>
        </div>
      </div>
    </div>
  );
}

export function Hero() {
  const { dictionary: t } = useDentalI18n();
  const isMobile = useIsMobile();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (isMobile) return; // Skip mouse tracking on mobile
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isMobile]);

  return (
    <section className="relative min-h-screen pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-teal-50/30" />
      
      {/* Subtle animated grid */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* Floating gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-gradient-to-br from-teal-200/40 to-cyan-200/40 rounded-full blur-3xl transition-transform duration-1000 ease-out"
          style={{ transform: `translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px)` }}
        />
        <div
          className="absolute -bottom-40 -left-40 w-[400px] h-[400px] bg-gradient-to-tr from-purple-200/30 to-pink-200/30 rounded-full blur-3xl transition-transform duration-1000 ease-out"
          style={{ transform: `translate(${-mousePosition.x * 0.3}px, ${-mousePosition.y * 0.3}px)` }}
        />
      </div>

      <Container className="relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-teal-500/10 to-cyan-500/10 border border-teal-200/50 px-4 py-1.5 text-sm font-medium text-teal-700 mb-8 backdrop-blur-sm">
              <Sparkles className="w-4 h-4" />
              {t.hero.badge}
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500" />
              </span>
            </div>

            {/* Heading */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-zinc-900 tracking-tight leading-[1.1] mb-6">
              {t.hero.title}{" "}
              <br className="hidden sm:block" />
              <span className="relative">
                <span className="relative z-10 bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
                  {t.hero.titleHighlight}
                </span>
                <span className="absolute -bottom-2 left-0 right-0 h-3 bg-gradient-to-r from-teal-200 to-cyan-200 -skew-x-3 -z-0" />
              </span>
            </h1>

            {/* Description */}
            <p className="text-lg md:text-xl text-zinc-600 leading-relaxed mb-10 max-w-xl mx-auto lg:mx-0">
              {t.hero.description} <span className="font-semibold text-zinc-900">{t.hero.descriptionBold}</span>.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
              <Button size="lg" className="shadow-lg shadow-teal-600/20 hover:shadow-xl hover:shadow-teal-600/30 transition-shadow">
                {t.hero.cta}
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
              <Button variant="outline" size="lg" className="group">
                <span className="w-2 h-2 bg-red-500 rounded-full mr-2 group-hover:animate-pulse" />
                {t.hero.ctaDemo}
              </Button>
            </div>

            {/* Social proof */}
            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full bg-gradient-to-br from-zinc-200 to-zinc-300 border-2 border-white flex items-center justify-center text-xs font-medium text-zinc-600"
                  >
                    {["АМ", "СК", "ИП", "ДВ"][i - 1]}
                  </div>
                ))}
              </div>
              <div className="text-sm text-zinc-600">
                <span className="font-semibold text-zinc-900">12+</span> {t.hero.socialProof}
              </div>
            </div>
          </div>

          {/* Chat Demo */}
          <div className="relative lg:pl-8">
            <ChatDemo />
          </div>
        </div>
      </Container>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
    </section>
  );
}
