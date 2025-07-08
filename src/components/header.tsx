import { Ticket } from "lucide-react";

export function Header() {
  return (
    <header className="py-6 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto flex items-center gap-4">
        <Ticket className="w-10 h-10 text-primary" />
        <h1 className="text-3xl md:text-4xl font-bold tracking-tighter text-foreground">
          LottoLuck
        </h1>
      </div>
    </header>
  );
}
