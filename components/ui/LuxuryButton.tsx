"use client";

import { forwardRef } from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?:   "gold" | "outline" | "ghost" | "text" | "danger";
  size?:      "sm" | "md" | "lg";
  isLoading?: boolean;
  fullWidth?: boolean;
  leftIcon?:  React.ReactNode;
  rightIcon?: React.ReactNode;
  asChild?:   boolean;
}

export const LuxuryButton = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { variant = "gold", size = "md", isLoading, fullWidth, leftIcon, rightIcon,
      className, children, disabled, asChild, ...props },
    ref
  ) => {
    const base = cn(
      "relative inline-flex items-center justify-center gap-2.5 overflow-hidden rounded-sm font-medium tracking-[0.1em] uppercase transition-all duration-300 select-none focus-visible:outline focus-visible:outline-gold focus-visible:outline-offset-2",
      fullWidth && "w-full",
      disabled || isLoading ? "opacity-40 pointer-events-none" : "",
    );

    const sizes: Record<string, string> = {
      sm:  "text-[11px] px-5 py-2.5",
      md:  "text-[12px] px-7 py-3.5",
      lg:  "text-[12px] px-10 py-4",
    };

    const variants: Record<string, string> = {
      // Solid dark fill — primary action
      gold: cn(
        "bg-dark text-parchment shadow-soft-sm",
        "hover:bg-dark-mid hover:shadow-soft"
      ),
      // Outline — secondary
      outline: cn(
        "border border-dark/25 text-dark bg-transparent",
        "hover:border-dark hover:bg-dark hover:text-parchment"
      ),
      // Ghost — tertiary
      ghost: cn(
        "bg-parchment-mid text-taupe border border-linen-deep",
        "hover:bg-linen hover:text-dark"
      ),
      // Text only
      text: cn(
        "bg-transparent text-taupe hover:text-dark px-0 tracking-[0.08em]"
      ),
      // Danger
      danger: cn(
        "border border-red-400/30 text-red-500 bg-transparent",
        "hover:bg-red-50 hover:border-red-400"
      ),
    };

    return (
      <motion.button
        ref={ref}
        whileTap={{ scale: 0.98 }}
        className={cn(base, sizes[size], variants[variant], className)}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <>
            {leftIcon  && <span className="shrink-0">{leftIcon}</span>}
            {children}
            {rightIcon && <span className="shrink-0">{rightIcon}</span>}
          </>
        )}
      </motion.button>
    );
  }
);

LuxuryButton.displayName = "LuxuryButton";
