import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LottoBall } from "@/components/lotto-ball";

export const RecentWinningNumbers = () => {
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
