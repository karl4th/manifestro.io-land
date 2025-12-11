"use client";

import { useState, useEffect, useRef } from "react";
import { Globe, ArrowRight, Brain, Zap, Clock, Target } from "lucide-react";
import { useI18n } from "@/lib/i18n";

// Floating nodes for neural network effect
function FloatingNodes() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    let animationId: number;
    let nodes: { x: number; y: number; vx: number; vy: number; radius: number }[] = [];
    
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    const init = () => {
      resize();
      nodes = [];
      const nodeCount = Math.floor((canvas.width * canvas.height) / 25000);
      for (let i = 0; i < nodeCount; i++) {
        nodes.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          radius: Math.random() * 2 + 1,
        });
      }
    };
    
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw connections
      ctx.strokeStyle = "rgba(0, 0, 0, 0.03)";
      ctx.lineWidth = 1;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }
      
      // Draw nodes
      for (const node of nodes) {
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
        ctx.fill();
        
        // Update position
        node.x += node.vx;
        node.y += node.vy;
        
        // Bounce off edges
        if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1;
      }
      
      animationId = requestAnimationFrame(draw);
    };
    
    init();
    draw();
    window.addEventListener("resize", init);
    
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", init);
    };
  }, []);
  
  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />;
}

export default function Home() {
  const { locale, dictionary: t, setLocale } = useI18n();
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 30,
        y: (e.clientY / window.innerHeight - 0.5) * 30,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      setEmail("");
    }
  };

  const toggleLocale = () => {
    setLocale(locale === "en" ? "ru" : "en");
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-zinc-50 text-zinc-900 selection:bg-zinc-900 selection:text-white">
      {/* Neural network background */}
      <FloatingNodes />
      
      {/* Geometric accents */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Large circle */}
        <div
          className="absolute -right-48 -top-48 h-[500px] w-[500px] rounded-full border-2 border-zinc-200/50 transition-transform duration-1000 ease-out"
          style={{ transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)` }}
        />
        {/* Accent square */}
        <div
          className="absolute -left-24 bottom-1/4 h-48 w-48 border-2 border-zinc-900/10 transition-transform duration-700 ease-out"
          style={{ transform: `rotate(${12 + mousePosition.x * 0.5}deg)` }}
        />
        {/* Small decorative elements */}
        <div className="absolute right-[15%] top-[20%] h-3 w-3 bg-zinc-900" />
        <div className="absolute left-[20%] bottom-[25%] h-2 w-2 rounded-full bg-zinc-400" />
        <div className="absolute right-[30%] bottom-[15%] h-4 w-4 rotate-45 border-2 border-zinc-300" />
      </div>

      {/* Language switcher */}
      <button
        onClick={toggleLocale}
        className="absolute right-6 top-6 z-50 flex items-center gap-2 rounded-full border border-zinc-200 bg-white/90 px-4 py-2 text-sm font-medium text-zinc-600 shadow-sm backdrop-blur-sm transition-all hover:border-zinc-300 hover:bg-white hover:text-zinc-900 hover:shadow-md"
      >
        <Globe className="h-4 w-4" />
        {t.language.switch}
      </button>

      {/* Main content */}
      <main className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 py-20">
        {/* Logo - top left absolute */}
        <div className="absolute left-6 top-6 flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-900">
            <Brain className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-semibold tracking-tight text-zinc-900">manifestro</span>
        </div>

        {/* Hero section */}
        <div className="flex max-w-4xl flex-col items-center">
          {/* Badge */}
          <div className="mb-8 animate-fade-in">
            <span className="inline-flex items-center gap-2 rounded-full border border-red-200 bg-red-50 px-4 py-1.5 text-sm font-medium text-red-700">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
              </span>
              {t.hero.badge}
            </span>
          </div>

          {/* Main heading - BIG and aggressive */}
          <h1 className="mb-8 animate-fade-in-up text-center text-4xl font-black leading-[1.1] tracking-tight text-zinc-900 md:text-6xl lg:text-7xl">
            {t.hero.title}
          </h1>

          {/* Pain points - strikethrough style */}
          <div className="mb-8 animate-fade-in-up flex flex-wrap justify-center gap-x-6 gap-y-2 delay-100">
            {t.hero.subtitle.map((line, i) => (
              <span key={i} className="text-lg text-zinc-400 line-through decoration-red-500 decoration-2 md:text-xl">
                {line.replace("No more ", "").replace("Больше никаких ", "").replace("Никаких ", "").replace(".", "")}
              </span>
            ))}
          </div>

          {/* The killer statement */}
          <p className="mb-12 animate-fade-in-up max-w-2xl text-center text-xl font-medium text-zinc-900 delay-150 md:text-2xl lg:text-3xl">
            {t.hero.description}
          </p>

          {/* CTA section */}
          <div className="w-full max-w-lg animate-fade-in-up delay-200">
            <p className="mb-4 text-center text-sm font-medium uppercase tracking-wider text-zinc-500">
              {t.hero.ctaLabel}
            </p>
            {!isSubmitted ? (
              <form onSubmit={handleSubmit}>
                <div className="flex flex-col gap-3 sm:flex-row sm:gap-0">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t.hero.placeholder}
                    className="flex-1 rounded-xl border border-zinc-200 bg-white px-5 py-4 text-zinc-900 placeholder-zinc-400 shadow-sm transition-all focus:border-zinc-400 focus:outline-none focus:ring-4 focus:ring-zinc-100 sm:rounded-r-none sm:border-r-0"
                    required
                  />
                  <button
                    type="submit"
                    className="group flex items-center justify-center gap-2 rounded-xl bg-zinc-900 px-8 py-4 font-semibold text-white shadow-lg transition-all hover:bg-zinc-800 hover:shadow-xl active:scale-[0.98] sm:rounded-l-none"
                  >
                    {t.hero.cta}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </form>
            ) : (
              <div className="rounded-xl border border-zinc-200 bg-white p-6 text-center shadow-sm">
                <p className="text-lg font-semibold text-zinc-900">
                  {locale === "en" ? "You're in." : "Вы в деле."}
                </p>
                <p className="mt-1 text-sm text-zinc-500">
                  {locale === "en"
                    ? "We'll notify you when we launch."
                    : "Мы уведомим вас о запуске."}
                </p>
              </div>
            )}
          </div>

          {/* Features - inline */}
          <div className="mt-16 flex animate-fade-in-up flex-wrap justify-center gap-6 delay-300">
            <div className="flex items-center gap-2 text-zinc-500">
              <Zap className="h-4 w-4" />
              <span className="text-sm font-medium">{t.features.ai}</span>
            </div>
            <div className="h-4 w-px bg-zinc-300" />
            <div className="flex items-center gap-2 text-zinc-500">
              <Clock className="h-4 w-4" />
              <span className="text-sm font-medium">{t.features.speed}</span>
            </div>
            <div className="h-4 w-px bg-zinc-300" />
            <div className="flex items-center gap-2 text-zinc-500">
              <Target className="h-4 w-4" />
              <span className="text-sm font-medium">{t.features.accuracy}</span>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="absolute bottom-0 left-0 right-0 z-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 sm:flex-row">
          <p className="text-sm text-zinc-400">{t.footer.copyright}</p>
          <p className="text-sm text-zinc-400">{t.footer.building}</p>
        </div>
      </footer>
    </div>
  );
}
