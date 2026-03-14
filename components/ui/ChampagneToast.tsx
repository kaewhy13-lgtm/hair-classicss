"use client";

import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, XCircle, AlertCircle, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

type ToastType = "success" | "error" | "info";

interface ChampagneToastProps {
  message: string;
  type?: ToastType;
  duration?: number;
  onClose: () => void;
  isVisible: boolean;
}

const typeStyles: Record<ToastType, { icon: React.ReactNode; border: string; bg: string }> = {
  success: {
    icon: <CheckCircle className="h-4 w-4 text-luxury-success" />,
    border: "border-luxury-success/30",
    bg: "bg-luxury-success/10",
  },
  error: {
    icon: <XCircle className="h-4 w-4 text-red-400" />,
    border: "border-luxury-error/30",
    bg: "bg-luxury-error/10",
  },
  info: {
    icon: <AlertCircle className="h-4 w-4 text-gold" />,
    border: "border-gold/30",
    bg: "bg-gold/10",
  },
};

/**
 * Luxury toast notification — slides in from top with glass blur effect.
 */
export function ChampagneToast({
  message,
  type = "info",
  duration = 4000,
  onClose,
  isVisible,
}: ChampagneToastProps) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  const { icon, border, bg } = typeStyles[type];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -16, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.95 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          role="alert"
          aria-live="polite"
          className={cn(
            "fixed top-6 left-1/2 -translate-x-1/2 z-[9999]",
            "flex items-center gap-3 px-4 py-3 rounded-xl",
            "glass shadow-elevated min-w-[280px] max-w-[420px]",
            "border",
            border,
            bg
          )}
        >
          {icon}
          <p className="text-sm text-ivory flex-1 font-medium">{message}</p>
          <button
            onClick={onClose}
            aria-label="Dismiss notification"
            className="text-muted hover:text-ivory transition-colors shrink-0"
          >
            <X className="h-4 w-4" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── Hook for easy usage ──────────────────────────────────
export function useChampagneToast() {
  const [toast, setToast] = useState<{
    message: string;
    type: ToastType;
    visible: boolean;
  }>({ message: "", type: "info", visible: false });

  const show = (message: string, type: ToastType = "info") => {
    setToast({ message, type, visible: true });
  };

  const hide = () => setToast((t) => ({ ...t, visible: false }));

  const ToastComponent = (
    <ChampagneToast
      message={toast.message}
      type={toast.type}
      isVisible={toast.visible}
      onClose={hide}
    />
  );

  return { show, hide, ToastComponent };
}
