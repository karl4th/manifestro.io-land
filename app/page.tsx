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
        className="absolute right-6 top-6 z-50 flex items-center gap-2 rounded-none border border-zinc-300 bg-white/80 px-4 py-2 text-sm font-medium text-zinc-700 backdrop-blur-sm transition-all hover:border-zinc-900 hover:bg-zinc-900 hover:text-white"
      >
        <Globe className="h-4 w-4" />
        {t.language.switch}
      </button>

      {/* Main content */}
      <main className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 py-20">
        {/* Logo with glitch effect on hover */}
        <div 
          className="group mb-12 animate-fade-in cursor-default"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <div className="flex items-center gap-4">
            <div className="relative flex h-14 w-14 items-center justify-center bg-zinc-900 transition-transform duration-300 group-hover:rotate-12">
              <Brain className="h-7 w-7 text-white" />
              {/* Corner accents */}
              <div className="absolute -right-1 -top-1 h-2 w-2 bg-zinc-900" />
              <div className="absolute -bottom-1 -left-1 h-2 w-2 bg-zinc-900" />
            </div>
            <div className="relative">
              <h2 className={`text-3xl font-bold tracking-tighter text-zinc-900 md:text-4xl ${isHovering ? 'animate-glitch' : ''}`}>
                MANIFESTRO
              </h2>
              <div className="absolute -bottom-1 left-0 h-0.5 w-0 bg-zinc-900 transition-all duration-500 group-hover:w-full" />
            </div>
          </div>
        </div>

        {/* Status indicator */}
        <div className="mb-8 animate-fade-in-up">
          <div className="flex items-center gap-3 text-sm">
            <span className="relative flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-zinc-900 opacity-75" />
              <span className="relative inline-flex h-3 w-3 rounded-full bg-zinc-900" />
            </span>
            <span className="font-mono uppercase tracking-[0.2em] text-zinc-600">
              {t.hero.badge}
            </span>
          </div>
        </div>

        {/* Main heading - split design */}
        <div className="mb-8 animate-fade-in-up text-center delay-100">
          <h1 className="relative text-6xl font-black leading-[0.9] tracking-tighter md:text-8xl lg:text-9xl">
            <span className="block text-zinc-900">{t.hero.title}</span>
            <span className="relative block">
              <span className="text-zinc-300">{t.hero.titleHighlight}</span>
              {/* Strikethrough accent */}
              <div className="absolute left-1/2 top-1/2 h-1 w-0 -translate-x-1/2 -translate-y-1/2 bg-zinc-900 transition-all duration-1000 hover:w-full" />
            </span>
          </h1>
        </div>

        {/* Description with accent */}
        <div className="relative mb-12 max-w-lg animate-fade-in-up delay-200">
          <div className="absolute -left-4 top-0 h-full w-1 bg-zinc-200" />
          <p className="pl-4 text-center text-lg leading-relaxed text-zinc-500 sm:text-left md:text-xl">
            {t.hero.description}
          </p>
        </div>

        {/* Email form - brutalist style */}
        <div className="mb-16 w-full max-w-lg animate-fade-in-up delay-300">
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="relative">
              <div className="flex flex-col gap-0 sm:flex-row">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t.hero.placeholder}
                  className="flex-1 border-2 border-zinc-900 bg-white px-6 py-5 text-zinc-900 placeholder-zinc-400 transition-all focus:outline-none focus:ring-0"
                  required
                />
                <button
                  type="submit"
                  className="group relative flex items-center justify-center gap-2 border-2 border-zinc-900 bg-zinc-900 px-8 py-5 font-bold uppercase tracking-wider text-white transition-all hover:bg-white hover:text-zinc-900 sm:-ml-0.5"
                >
                  {t.hero.cta}
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-2" />
                </button>
              </div>
              {/* Decorative corner */}
              <div className="absolute -bottom-2 -right-2 h-4 w-4 border-b-2 border-r-2 border-zinc-300" />
            </form>
          ) : (
            <div className="relative border-2 border-zinc-900 bg-white p-8">
              <div className="absolute -left-3 -top-3 flex h-6 w-6 items-center justify-center bg-zinc-900 text-xs font-bold text-white">
                ✓
              </div>
              <p className="text-xl font-bold text-zinc-900">
                {locale === "en" ? "You're in." : "Вы в деле."}
              </p>
              <p className="mt-2 text-zinc-500">
                {locale === "en"
                  ? "We'll reach out when we're ready."
                  : "Мы свяжемся, когда будем готовы."}
              </p>
            </div>
          )}
        </div>

        {/* Stats/Features - more impactful */}
        <div className="grid animate-fade-in-up grid-cols-3 gap-8 delay-500 md:gap-16">
          <div className="text-center">
            <Cpu className="mx-auto mb-3 h-6 w-6 text-zinc-900" />
            <div className="text-xs font-bold uppercase tracking-widest text-zinc-600">{t.features.ai}</div>
          </div>
          <div className="text-center">
            <Network className="mx-auto mb-3 h-6 w-6 text-zinc-900" />
            <div className="text-xs font-bold uppercase tracking-widest text-zinc-600">{t.features.innovation}</div>
          </div>
          <div className="text-center">
            <Brain className="mx-auto mb-3 h-6 w-6 text-zinc-900" />
            <div className="text-xs font-bold uppercase tracking-widest text-zinc-600">{t.features.future}</div>
          </div>
        </div>
      </main>

      {/* Footer - minimal */}
      <footer className="absolute bottom-0 left-0 right-0 z-10 border-t border-zinc-200">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-6 sm:flex-row">
          <p className="font-mono text-xs uppercase tracking-widest text-zinc-400">{t.footer.copyright}</p>
          <p className="font-mono text-xs uppercase tracking-widest text-zinc-400">{t.footer.building}</p>
        </div>
      </footer>
    </div>
  );
}
