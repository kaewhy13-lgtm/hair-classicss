"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface ElegantCardProps extends Omit<HTMLMotionProps<"div">, "animate" | "children"> {
  children?: React.ReactNode;
  gold?:    boolean;   // subtle gold accent
  hover?:   boolean;   // lift on hover
  glow?:    boolean;   // soft ambient glow
  flat?:    boolean;   // no surface — transparent
  padding?: "sm" | "md" | "lg" | "none";
}

export function ElegantCard({
  gold = false,
  hover = false,
  glow = false,
  flat = false,
  padding = "md",
  className,
  children,
  ...props
}: ElegantCardProps) {
  const paddings = { none: "", sm: "p-5", md: "p-7", lg: "p-10" };

  return (
    <motion.div
      whileHover={hover ? { y: -3, transition: { duration: 0.35, ease: [0.4, 0, 0.1, 1] } } : undefined}
      className={cn(
        "relative rounded-sm overflow-hidden transition-all duration-400",
        // Surface
        !flat && "bg-white",
        // Border
        gold
          ? "border border-gold/25 hover:border-gold/40"
          : "border border-linen-deep hover:border-linen-darker",
        // Glow
        glow && "shadow-soft hover:shadow-soft-lg",
        // Default shadow
        "shadow-soft-sm",
        paddings[padding],
        className
      )}
      {...props}
    >
      <>
        {/* Subtle top accent for gold cards */}
        {gold && (
          <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
        )}
        {children}
      </>
    </motion.div>
  );
}
