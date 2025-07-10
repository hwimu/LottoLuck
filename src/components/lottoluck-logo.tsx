import { cn } from "@/lib/utils";
import { Ticket } from "lucide-react";

export function LottoLuckLogo({ className }: { className?: string }) {
  return (
    <Ticket className={cn("text-primary", className)} />
  );
}
