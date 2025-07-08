import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LottoBall } from "@/components/lotto-ball";
import { Ticket } from "lucide-react";

export const RecentWinningNumbers = () => {
  const recentDraw = {
    drawNumber: 1125,
    date: "2024-06-22",
    numbers: [6, 12, 25, 30, 31, 42],
    bonus: 29,
  };

  return (
    <Card className="shadow-2xl border-primary/20 border">
      <CardHeader className="p-8">
        <CardTitle className="text-3xl font-bold flex items-center gap-3">
          <Ticket className="w-8 h-8 text-primary" />
          최신 당첨 결과
        </CardTitle>
        <CardDescription className="text-lg pt-1">
          {recentDraw.drawNumber}회차 ({recentDraw.date} 추첨)
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8 p-8 pt-0">
        <div>
          <h4 className="font-semibold mb-4 text-lg text-muted-foreground">당첨 번호</h4>
          <div className="flex flex-wrap gap-4">
            {recentDraw.numbers.map((num) => (
              <LottoBall key={num} number={num} />
            ))}
          </div>
        </div>
        <div>
            <h4 className="font-semibold mb-4 mt-6 text-lg text-muted-foreground">보너스 번호</h4>
            <LottoBall number={recentDraw.bonus} className="bg-accent text-accent-foreground border-green-300" />
        </div>
      </CardContent>
    </Card>
  );
};
