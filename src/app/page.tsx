
import { Header } from "@/components/header";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, History, Ticket } from "lucide-react";

export default function Home() {
  const features = [
    {
      title: "AI 번호 예측",
      description: "과거 당첨 번호를 입력하여 AI의 분석과 추천 번호를 받아보세요.",
      href: "/analysis",
      icon: <Sparkles className="w-10 h-10 text-primary" />,
    },
    {
      title: "금주의 당첨번호",
      description: "가장 최근 회차의 당첨 번호와 보너스 번호를 확인하세요.",
      href: "/recent",
      icon: <Ticket className="w-10 h-10 text-primary" />,
    },
    {
        title: "나의 행운 기록",
        description: "과거에 AI가 추천했던 번호 조합들을 확인해보세요.",
        href: "/history",
        icon: <History className="w-10 h-10 text-primary" />,
    },
  ];

  return (
    <div className="min-h-screen bg-background selection:bg-primary/20">
      <Header />
      <main className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 md:mb-24">
          <h2 className="text-5xl font-extrabold tracking-tighter sm:text-6xl md:text-7xl text-foreground">
            AI로 당신의 행운을 예측하세요
          </h2>
          <p className="mt-6 max-w-3xl mx-auto text-xl text-muted-foreground">
            LottoLuck은 고급 AI 기술을 사용하여 최적의 로또 번호 조합을 추천합니다.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {features.map((feature) => (
            <Link href={feature.href} key={feature.title} className="block group">
              <Card className="h-full flex flex-col transition-all duration-300 ease-in-out group-hover:shadow-2xl group-hover:-translate-y-2 group-hover:border-primary/50">
                <CardHeader className="flex flex-row items-center gap-5 p-8 pb-4">
                  {feature.icon}
                  <CardTitle className="text-3xl font-bold">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="p-8 pt-0">
                  <CardDescription className="text-lg">{feature.description}</CardDescription>
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
