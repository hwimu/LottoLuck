import { cn } from "@/lib/utils";

interface LottoBallProps {
  number: number | string;
  className?: string;
}

export function LottoBall({ number, className }: LottoBallProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground font-bold text-xl shadow-lg border-2 border-amber-300 transform transition-transform hover:scale-110",
        className
      )}
    >
      {number}
    </div>
  );
}
