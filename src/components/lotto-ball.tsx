import { cn } from "@/lib/utils";

interface LottoBallProps {
  number: number | string;
  className?: string;
}

export function LottoBall({ number, className }: LottoBallProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-center w-14 h-14 rounded-full bg-primary text-primary-foreground font-bold text-2xl shadow-xl border-4 border-amber-300 transform transition-transform hover:scale-110",
        className
      )}
    >
      {number}
    </div>
  );
}
