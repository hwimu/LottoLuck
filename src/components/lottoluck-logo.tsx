import { cn } from "@/lib/utils";

export function LottoLuckLogo({ className }: { className?: string }) {
  return (
    <svg
      className={cn("text-primary", className)}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M4 9h16" />
      <path d="M4 15h16" />
      <path d="M10 3v2" />
      <path d="M14 3v2" />
      <path d="M10 19v2" />
      <path d="M14 19v2" />
      <path d="M22 10v4" />
      <path d="M2 10v4" />
      <path d="M6 5C4.78 5.75 4 7.21 4 9c0 1.79.78 3.25 2 4 .71.42 1.5.66 2.33.74" />
      <path d="M18 5c1.22.75 2 2.21 2 4s-.78 3.25-2 4c-.83.42-1.62.66-2.41.74" />
    </svg>
  );
}
