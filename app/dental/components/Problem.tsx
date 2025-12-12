"use client";

import { useEffect, useState, useRef } from "react";
import { Container } from "./ui";
import { Clock, Users, TrendingDown, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";

const problems = [
  {
    icon: Clock,
    title: "Медленные ответы",
    description: "Пациент не ждёт 10–20 минут — он идёт к другой клинике",
    stat: "67%",
    statLabel: "уходят, не дождавшись ответа",
  },
  {
    icon: Users,
    title: "Перегруженные администраторы",
    description: "Не успевают вести все диалоги, особенно в часы пик",
    stat: "40%",
    statLabel: "заявок остаются без ответа",
  },
  {
    icon: TrendingDown,
    title: "Потеря горячих лидов",
    description: "Конкуренция высокая — скорость решает всё",
    stat: "₸2M+",
    statLabel: "теряет средняя клиника в год",
  },
  {
    icon: MessageSquare,
    title: "WhatsApp — главный канал",
    description: "80% пациентов пишут в мессенджер, а не звонят",
    stat: "80%",
    statLabel: "обращений через WhatsApp",
  },
];

// Animated counter hook
function useCountUp(end: number, duration: number = 2000, startOnView: boolean = true) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!startOnView) {
      setHasStarted(true);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [hasStarted, startOnView]);

  useEffect(() => {
    if (!hasStarted) return;

    let startTime: number;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }, [end, duration, hasStarted]);

  return { count, ref };
}

export function Problem() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 15,
        y: (e.clientY / window.innerHeight - 0.5) * 15,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 md:py-32 bg-zinc-900 text-white relative overflow-hidden">
      {/* Animated grid background */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* Animated background elements */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute -left-32 top-1/4 w-64 h-64 bg-red-500/10 rounded-full blur-3xl transition-transform duration-1000"
          style={{ transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)` }}
        />
        <div
          className="absolute -right-32 bottom-1/4 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl transition-transform duration-1000"
          style={{ transform: `translate(${-mousePosition.x}px, ${-mousePosition.y}px)` }}
        />
        {/* Floating particles */}
        <div className="absolute top-[20%] left-[10%] w-2 h-2 bg-red-500/30 rounded-full animate-pulse" />
        <div className="absolute top-[60%] right-[15%] w-3 h-3 bg-teal-500/20 rounded-full animate-pulse delay-500" />
        <div className="absolute bottom-[30%] left-[20%] w-2 h-2 bg-white/10 rounded-full animate-pulse delay-1000" />
      </div>

      <Container className="relative">
        <div
          className={cn(
            "max-w-3xl mx-auto text-center transition-all duration-1000",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          <span className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 bg-red-500/20 text-red-400 text-sm font-medium rounded-full border border-red-500/30">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-red-400" />
            </span>
            Проблема
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-4">
            Почему клиники теряют пациентов каждый день
          </h2>
          <p className="text-lg text-zinc-300 leading-relaxed">
            В современном мире пациенты ожидают ответ сразу. Клиника, которая реагирует первой, получает преимущество.
          </p>
        </div>

        <div className="mt-16 grid sm:grid-cols-2 gap-6">
          {problems.map((problem, i) => (
            <ProblemCard key={problem.title} problem={problem} index={i} isVisible={isVisible} />
          ))}
        </div>
      </Container>
    </section>
  );
}

function ProblemCard({
  problem,
  index,
  isVisible,
}: {
  problem: typeof problems[0];
  index: number;
  isVisible: boolean;
}) {
  const numericStat = parseInt(problem.stat.replace(/[^0-9]/g, "")) || 0;
  const { count, ref } = useCountUp(numericStat, 1500);
  const statPrefix = problem.stat.includes("₸") ? "₸" : "";
  const statSuffix = problem.stat.includes("%") ? "%" : problem.stat.includes("+") ? "+" : problem.stat.includes("M") ? "M+" : "";

  return (
    <div
      ref={ref}
      className={cn(
        "p-8 rounded-2xl bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 hover:border-red-500/30 hover:bg-zinc-800/80 transition-all duration-500 group cursor-default",
        "hover:scale-[1.02] hover:shadow-2xl hover:shadow-red-500/10",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      )}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      <div className="flex items-start justify-between mb-6">
        <div className="w-14 h-14 rounded-2xl bg-red-500/10 flex items-center justify-center group-hover:bg-red-500/20 group-hover:scale-110 transition-all duration-300">
          <problem.icon className="w-7 h-7 text-red-400 group-hover:scale-110 transition-transform" />
        </div>
        <div className="text-right">
          <div className="text-4xl font-bold text-red-400 tabular-nums">
            {statPrefix}{count}{statSuffix}
          </div>
          <div className="text-xs text-zinc-500">{problem.statLabel}</div>
        </div>
      </div>
      <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-red-100 transition-colors">
        {problem.title}
      </h3>
      <p className="text-zinc-400 leading-relaxed group-hover:text-zinc-300 transition-colors">
        {problem.description}
      </p>
      
      {/* Hover line effect */}
      <div className="mt-4 h-0.5 w-0 bg-gradient-to-r from-red-500 to-transparent group-hover:w-full transition-all duration-500" />
    </div>
  );
}
