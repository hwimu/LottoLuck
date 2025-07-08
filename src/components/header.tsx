import { History, Sparkles, Ticket } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";

export function Header() {
  return (
    <header className="py-8 px-4 sm:px-6 lg:px-8 border-b shadow-sm">
      <div className="container mx-auto flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-4">
            <Ticket className="w-12 h-12 text-primary" />
            <h1 className="text-4xl md:text-5xl font-bold tracking-tighter text-foreground">
              LottoLuck
            </h1>
        </Link>
        <nav className="hidden md:flex items-center gap-2">
            <Button asChild variant="ghost" size="lg">
                <Link href="/analysis">
                    <Sparkles className="mr-2 h-5 w-5" />
                    통계 분석
                </Link>
            </Button>
            <Button asChild variant="ghost" size="lg">
                <Link href="/recent">
                    <Ticket className="mr-2 h-5 w-5" />
                    최신 당첨 결과
                </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
                <Link href="/history">
                    <History className="mr-2 h-5 w-5" />
                    추천 기록
                </Link>
            </Button>
        </nav>
      </div>
    </header>
  );
}
