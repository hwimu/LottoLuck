import { Header } from "@/components/header";
import { NumberGenerator } from "@/components/number-generator";
import { StatisticsAnalysis } from "@/components/statistics-analysis";
import { RecentWinningNumbers } from "@/components/recent-winning-numbers";

export default function Home() {
  return (
    <div className="min-h-screen bg-background selection:bg-primary/20">
      <Header />
      <main className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
            <h2 className="text-4xl font-extrabold tracking-tighter sm:text-5xl md:text-6xl text-foreground">
              AI로 당신의 행운을 예측하세요
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
              LottoLuck은 고급 AI 기술을 사용하여 최적의 로또 번호 조합을 추천합니다.
            </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <div className="space-y-8">
            <RecentWinningNumbers />
            <StatisticsAnalysis />
          </div>
          <div className="lg:sticky lg:top-8">
            <NumberGenerator />
          </div>
        </div>
      </main>
      <footer className="py-8 mt-16 text-center text-muted-foreground text-sm border-t">
        © {new Date().getFullYear()} LottoLuck. All rights reserved.
      </footer>
    </div>
  );
}
