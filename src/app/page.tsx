'use client';
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, History, Ticket } from "lucide-react";
import { Header } from "@/components/header";

export default function Home() {
  const features = [
    {
      title: "AI 번호 예측",
      description: "과거 당첨 번호를 입력하여 AI의 분석과 추천 번호를 받아보세요.",
      href: "/analysis",
      icon: <Sparkles className="w-8 h-8 mb-4 text-primary" />,
    },
    {
      title: "금주의 당첨번호",
      description: "가장 최근 회차의 당첨 번호와 보너스 번호를 확인하세요.",
      href: "/recent",
      icon: <Ticket className="w-8 h-8 mb-4 text-primary" />,
    },
    {
      title: "나의 행운 기록",
      description: "과거에 AI가 추천했던 번호 조합들을 확인해보세요.",
      href: "/history",
      icon: <History className="w-8 h-8 mb-4 text-primary" />,
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-1">
        <section className="w-full py-24 md:py-32 lg:py-40 bg-background">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-6 text-center">
              <h1 
                className="text-5xl font-black sm:text-6xl md:text-7xl lg:text-8xl tracking-tighter text-foreground"
              >
                AI로 당신의 행운을 예측하세요
              </h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                LottoLuck은 고급 AI 기술을 사용하여 최적의 로또 번호 조합을 추천합니다.
              </p>
            </div>
          </div>
        </section>
        
        <section className="w-full pb-20 md:pb-32">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature) => (
                <Link href={feature.href} key={feature.title} className="block group">
                  <Card className="h-full flex flex-col text-left p-8 transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1 bg-card border rounded-lg">
                    <CardHeader className="p-0">
                      {feature.icon}
                      <CardTitle className="text-2xl font-bold">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0 pt-4">
                      <CardDescription className="text-base">{feature.description}</CardDescription>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <footer className="py-8 text-center text-muted-foreground text-sm border-t">
        © {new Date().getFullYear() + 1} LottoLuck. All rights reserved.
      </footer>
    </div>
  );
}
