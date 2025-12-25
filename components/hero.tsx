"use client";

import AnimatedGridPattern from "@/components/ui/animated-grid-pattern";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowUpRight, CirclePlay, Brain, Network } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function Hero() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsSubmitted(true);
        setEmail('');
        setTimeout(() => setIsSubmitted(false), 3000);
      } else {
        if (response.status === 409) {
          alert('Этот email уже добавлен в waitlist');
        } else {
          alert('Ошибка: ' + data.error);
        }
      }
    } catch (error) {
      console.error('Submit error:', error);
      alert('Произошла ошибка. Попробуйте еще раз.');
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
      <AnimatedGridPattern
        numSquares={30}
        maxOpacity={0.1}
        duration={3}
        className={cn(
          "mask-[radial-gradient(500px_circle_at_center,white,transparent)]",
          "inset-x-0 h-full skew-y-12"
        )}
      />
      <div className="relative z-10 text-center max-w-4xl">
        <Badge
          variant="secondary"
          className="rounded-full py-1 border-border mb-6"
          asChild
        >
          <Link href="#waitlist">
            <Brain className="mr-1 size-4" />
            Будущее коллективного ИИ уже здесь <ArrowUpRight className="ml-1 size-4" />
          </Link>
        </Badge>
        <h1 className="mt-6 text-4xl sm:text-5xl md:text-6xl lg:text-7xl md:leading-[1.2] font-semibold tracking-tighter">
          MANIFESTRO
          <span className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl mt-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Инженерия Коллективного Разума
          </span>
        </h1>
        <p className="mt-6 md:text-lg text-foreground/80 max-w-2xl mx-auto">
          Создаем новую парадигму в сфере ИИ — не просто модели, а скоординированные 
          системы цифрового интеллекта для бизнеса будущего. Присоединяйтесь к революции.
        </p>
        
        {/* Waitlist Form */}
        <form onSubmit={handleSubmit} className="mt-10 max-w-md mx-auto" id="waitlist">
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Введите ваш email"
              className="flex-1 px-4 py-3 rounded-full border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
            <Button 
              type="submit" 
              size="lg" 
              className="rounded-full text-base whitespace-nowrap"
            >
              {isSubmitted ? "Добавлены!" : "Войти в waitlist"}
            </Button>
          </div>
          {isSubmitted && (
            <p className="mt-3 text-sm text-green-600">
              Спасибо! Мы сообщим вам о запуске.
            </p>
          )}
        </form>

        <div className="mt-12 flex items-center justify-center gap-4">
          <Button size="lg" className="rounded-full text-base" asChild>
            <Link href="/about">
              Узнать больше <ArrowUpRight className="h-5! w-5!" />
            </Link>
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="rounded-full text-base shadow-none"
            asChild
          >
            <Link href="/blog">
              <Network className="h-5! w-5!" /> Наш блог
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
