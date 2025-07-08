import { History, Ticket } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";

export function Header() {
  return (
    <header className="py-6 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-4">
            <Ticket className="w-10 h-10 text-primary" />
            <h1 className="text-3xl md:text-4xl font-bold tracking-tighter text-foreground">
              LottoLuck
            </h1>
        </Link>
        <Button asChild variant="outline">
            <Link href="/history">
                <History className="mr-2 h-4 w-4" />
                추천 기록
            </Link>
        </Button>
      </div>
    </header>
  );
}
