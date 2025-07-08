import { Header } from "@/components/header";
import { RecentWinningNumbers } from "@/components/recent-winning-numbers";
import { Trophy } from "lucide-react";

export default function RecentPage() {
  return (
    <div className="min-h-screen bg-background selection:bg-primary/20">
      <Header />
      <main className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="text-left mb-12 md:mb-16">
            <h2 className="text-4xl font-extrabold tracking-tighter sm:text-5xl md:text-6xl text-foreground flex items-center gap-4">
              <Trophy className="w-10 h-10 text-primary" />
              최신 당첨 결과
            </h2>
            <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
                가장 최근의 로또 당첨 번호와 보너스 번호를 확인하세요.
            </p>
        </div>
        <div className="flex justify-center">
            <div className="w-full max-w-md">
                <RecentWinningNumbers />
            </div>
        </div>
      </main>
      <footer className="py-8 mt-16 text-center text-muted-foreground text-sm border-t">
        © {new Date().getFullYear()} LottoLuck. All rights reserved.
      </footer>
    </div>
  );
}
