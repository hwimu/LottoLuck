import { cn } from "@/lib/utils";
import { Ticket } from "lucide-react";

export function LottoLuckLogo({ className }: { className?: string }) {
  return (
    <svg
      className={cn(className)}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"
        fillOpacity="0.3"
      />
      <path d="M12 4c-2.97 0-5.58 1.66-6.96 4.05C6.84 9.87 9.21 12 12 12s5.16-2.13 6.96-3.95C17.58 5.66 14.97 4 12 4zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z" />
      <path
        d="M12 12c-2.97 0-5.58 1.66-6.96 4.05C6.84 17.87 9.21 20 12 20s5.16-2.13 6.96-3.95C17.58 13.66 14.97 12 12 12zm0 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"
        fillOpacity="0.7"
      />
    </svg>
  );
}
