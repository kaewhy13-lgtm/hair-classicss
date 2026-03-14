import { cn } from "@/lib/utils";

interface GoldDividerProps {
  label?:     string;
  diamond?:   boolean;
  className?: string;
}

export function GoldDivider({ label, diamond, className }: GoldDividerProps) {
  if (!label && !diamond) {
    return (
      <div className={cn("h-px w-full bg-gradient-to-r from-transparent via-linen-deep to-transparent", className)} />
    );
  }

  return (
    <div className={cn("flex items-center gap-4", className)}>
      <div className="flex-1 h-px bg-gradient-to-r from-transparent to-linen-deep" />
      {diamond ? (
        <span className="text-taupe/40 text-xs">·</span>
      ) : (
        <span className="text-[10px] tracking-[0.2em] text-taupe/60 uppercase">{label}</span>
      )}
      <div className="flex-1 h-px bg-gradient-to-l from-transparent to-linen-deep" />
    </div>
  );
}
