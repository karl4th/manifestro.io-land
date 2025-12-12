import { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center font-medium transition-all duration-200 rounded-full",
        // Variants
        variant === "primary" &&
          "bg-teal-600 text-white hover:bg-teal-700 shadow-lg shadow-teal-600/25 hover:shadow-xl hover:shadow-teal-600/30",
        variant === "secondary" &&
          "bg-zinc-900 text-white hover:bg-zinc-800",
        variant === "outline" &&
          "border-2 border-zinc-200 text-zinc-700 hover:border-teal-600 hover:text-teal-600",
        // Sizes
        size === "sm" && "px-4 py-2 text-sm",
        size === "md" && "px-6 py-3 text-base",
        size === "lg" && "px-8 py-4 text-lg",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
