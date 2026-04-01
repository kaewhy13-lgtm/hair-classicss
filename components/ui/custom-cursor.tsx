"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useMousePosition } from "@/lib/hooks/use-mouse-position";

export const CustomCursor = () => {
  const mousePosition = useMousePosition();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-[100] h-6 w-6 rounded-full border border-dark mix-blend-difference"
      animate={{
        x: mousePosition.x - 12,
        y: mousePosition.y - 12,
      }}
      transition={{
        type: "spring",
        stiffness: 150,
        damping: 25,
        mass: 0.5,
      }}
    />
  );
};
