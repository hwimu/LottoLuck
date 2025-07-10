import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const lottoBallVariants = cva(
  "flex items-center justify-center rounded-full text-primary-foreground font-bold shadow-xl border-4 transform transition-transform hover:scale-110",
  {
    variants: {
      size: {
        default: "w-14 h-14 text-2xl border-amber-300",
        sm: "w-10 h-10 text-lg border-amber-200"
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
)

interface LottoBallProps extends VariantProps<typeof lottoBallVariants> {
  number: number | string;
  className?: string;
}

export function LottoBall({ number, className, size }: LottoBallProps) {
  return (
    <div
      className={cn(
        "bg-primary",
        lottoBallVariants({ size }),
        className
      )}
    >
      {number}
    </div>
  );
}
