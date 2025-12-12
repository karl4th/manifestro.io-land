import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  badge?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  dark?: boolean;
  children?: ReactNode;
}

export function SectionHeading({
  badge,
  title,
  description,
  align = "center",
  dark = false,
  children,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        align === "left" && "text-left"
      )}
    >
      {badge && (
        <span
          className={cn(
            "inline-block mb-4 px-4 py-1.5 text-sm font-medium rounded-full",
            dark
              ? "bg-white/10 text-white/80"
              : "bg-teal-50 text-teal-700"
          )}
        >
          {badge}
        </span>
      )}
      <h2
        className={cn(
          "text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight",
          dark ? "text-white" : "text-zinc-900"
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-4 text-lg leading-relaxed",
            dark ? "text-zinc-400" : "text-zinc-600"
          )}
        >
          {description}
        </p>
      )}
      {children}
    </div>
  );
}
