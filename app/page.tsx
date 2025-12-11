"use client";

import { useState, useEffect, useRef } from "react";
import { Globe, ArrowRight, Brain, Cpu, Network } from "lucide-react";
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
        className="absolute right-6 top-6 z-50 flex items-center gap-2 border-b border-transparent pb-0.5 text-sm font-medium text-zinc-500 transition-all hover:border-zinc-900 hover:text-zinc-900"
      >
        <Globe className="h-4 w-4" />
        {t.language.switch}
      </button>

      {/* Main content */}
      <main className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 py-20">
        {/* Logo */}
        <div className="mb-16 animate-fade-in">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-900">
              <Brain className="h-6 w-6 text-white" />
            </div>
            <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 md:text-3xl">
              manifestro
            </h2>
          </div>
        </div>

        {/* Badge */}
        <div className="mb-10 animate-fade-in-up">
          <span className="inline-flex items-center gap-2 rounded-full border border-zinc-900 px-4 py-2 text-xs font-medium uppercase tracking-widest text-zinc-900">
            <span className="h-2 w-2 animate-pulse rounded-full bg-zinc-900" />
            {t.hero.badge}
          </span>
        </div>

        {/* Main heading */}
        <div className="mb-8 animate-fade-in-up text-center delay-100">
          <h1 className="text-5xl font-bold leading-[1.1] tracking-tight md:text-7xl lg:text-8xl">
            <span className="block">{t.hero.title}</span>
            <span className="block text-zinc-400">{t.hero.titleHighlight}</span>
          </h1>
        </div>

        {/* Description */}
        <p className="mb-14 max-w-xl animate-fade-in-up text-center text-lg leading-relaxed text-zinc-500 delay-200 md:text-xl">
          {t.hero.description}
        </p>

        {/* Email form */}
        <div className="mb-20 w-full max-w-md animate-fade-in-up delay-300">
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t.hero.placeholder}
                className="flex-1 border-b-2 border-zinc-200 bg-transparent px-1 py-4 text-zinc-900 placeholder-zinc-400 transition-all focus:border-zinc-900 focus:outline-none"
                required
              />
              <button
                type="submit"
                className="group flex items-center justify-center gap-2 bg-zinc-900 px-8 py-4 font-medium text-white transition-all hover:bg-zinc-800"
              >
                {t.hero.cta}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
            </form>
          ) : (
            <div className="border-l-4 border-zinc-900 bg-zinc-50 p-6">
              <p className="text-lg font-medium text-zinc-900">
                {locale === "en" ? "You're on the list." : "Вы в списке."}
              </p>
              <p className="mt-1 text-sm text-zinc-500">
                {locale === "en"
                  ? "We'll be in touch."
                  : "Мы свяжемся с вами."}
              </p>
            </div>
          )}
        </div>

        {/* Feature badges */}
        <div className="flex animate-fade-in-up flex-wrap justify-center gap-8 delay-500">
          <div className="flex items-center gap-3">
            <Cpu className="h-5 w-5 text-zinc-400" />
            <span className="text-sm font-medium text-zinc-600">{t.features.ai}</span>
          </div>
          <div className="h-6 w-px bg-zinc-200" />
          <div className="flex items-center gap-3">
            <Network className="h-5 w-5 text-zinc-400" />
            <span className="text-sm font-medium text-zinc-600">{t.features.innovation}</span>
          </div>
          <div className="h-6 w-px bg-zinc-200" />
          <div className="flex items-center gap-3">
            <Brain className="h-5 w-5 text-zinc-400" />
            <span className="text-sm font-medium text-zinc-600">{t.features.future}</span>
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
