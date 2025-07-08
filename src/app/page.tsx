import { Header } from "@/components/header";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, History, Ticket } from "lucide-react";

export default function Home() {
  const features = [
    {
      title: "AI 통계 분석",
      description: "과거 당첨 번호를 입력하여 AI의 분석과 추천 번호를 받아보세요.",
      href: "/analysis",
      icon: <Sparkles className="w-8 h-8 text-primary" />,
    },
    {
      title: "최신 당첨 결과",
      description: "가장 최근 회차의 당첨 번호와 보너스 번호를 확인하세요.",
      href: "/recent",
      icon: <Ticket className="w-8 h-8 text-primary" />,
    },
    {
        title: "추천 기록",
        description: "과거에 AI가 추천했던 번호 조합들을 확인해보세요.",
        href: "/history",
        icon: <History className="w-8 h-8 text-primary" />,
    }
  ];

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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <Link href={feature.href} key={feature.title} className="block hover:shadow-xl transition-shadow duration-300 rounded-lg">
              <Card className="h-full flex flex-col">
                <CardHeader className="flex flex-row items-center gap-4 pb-2">
                  {feature.icon}
                  <CardTitle className="text-2xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </main>
      <footer className="py-8 mt-16 text-center text-muted-foreground text-sm border-t">
        © {new Date().getFullYear()} LottoLuck. All rights reserved.
      </footer>
    </div>
  );
}
