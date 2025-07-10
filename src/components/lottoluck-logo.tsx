import { cn } from "@/lib/utils";

export function LottoLuckLogo({ className }: { className?: string }) {
  return (
    <svg
      className={cn(className)}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M24 4C12.9543 4 4 12.9543 4 24C4 35.0457 12.9543 44 24 44C35.0457 44 44 35.0457 44 24C44 12.9543 35.0457 4 24 4ZM0 24C0 10.7452 10.7452 0 24 0C37.2548 0 48 10.7452 48 24C48 37.2548 37.2548 48 24 48C10.7452 48 0 37.2548 0 24Z"
        fill="#FFD60A"
      />
      <path
        d="M14 18H34V22H14V18Z"
        fill="currentColor"
        className="text-primary-foreground"
      />
      <path
        d="M14 26H34V30H14V26Z"
        fill="currentColor"
        className="text-primary-foreground"
      />
    </svg>
  );
}
