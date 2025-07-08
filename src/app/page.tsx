import { Header } from "@/components/header";
import { NumberGenerator } from "@/components/number-generator";
import { StatisticsAnalysis } from "@/components/statistics-analysis";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LottoBall } from "@/components/lotto-ball";

const RecentWinningNumbers = () => {
  const recentDraw = {
    drawNumber: 1125,
    date: "2024-06-22",
    numbers: [6, 12, 25, 30, 31, 42],
    bonus: 29,
  };

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle>최신 당첨 결과</CardTitle>
        <CardDescription>
          {recentDraw.drawNumber}회차 ({recentDraw.date} 추첨)
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h4 className="font-semibold mb-3 text-muted-foreground">당첨 번호</h4>
          <div className="flex flex-wrap gap-2">
            {recentDraw.numbers.map((num) => (
              <LottoBall key={num} number={num} />
            ))}
          </div>
        </div>
        <div>
            <h4 className="font-semibold mb-3 mt-4 text-muted-foreground">보너스 번호</h4>
            <LottoBall number={recentDraw.bonus} className="bg-accent text-accent-foreground border-green-300" />
        </div>
      </CardContent>
    </Card>
  );
};


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
