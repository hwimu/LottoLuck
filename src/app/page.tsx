
'use client';
import { Header } from "@/components/header";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, History, Ticket } from "lucide-react";

export default function Home() {
  const features = [
    {
      title: "AI 번호 예측",
      description: "AI가 행운의 번호를 생성합니다.",
      href: "/analysis",
      icon: <Sparkles className="w-10 h-10 mb-4 text-primary" />,
    },
    {
      title: "금주의 당첨번호",
      description: "이번 주 당첨 번호를 확인하세요.",
      href: "/recent",
      icon: <Ticket className="w-10 h-10 mb-4 text-primary" />,
    },
    {
      title: "나의 행운 기록",
      description: "내가 저장한 번호를 볼 수 있습니다.",
      href: "/history",
      icon: <History className="w-10 h-10 mb-4 text-primary" />,
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-1">
        <section className="w-full py-20 md:py-32 bg-secondary/50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <h1 className="text-4xl font-black sm:text-5xl md:text-6xl text-foreground">
                AI 행운 로또
              </h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                AI 분석으로 행운의 로또 번호를 예측하고 당신의 운을 시험해보세요.
              </p>
              <Button asChild size="lg" className="h-12 text-lg px-8">
                <Link href="/analysis">번호 예측 시작하기</Link>
              </Button>
            </div>
          </div>
        </section>
        
        <section className="w-full py-20 md:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature) => (
                <Link href={feature.href} key={feature.title} className="block group">
                  <Card className="h-full flex flex-col items-center text-center p-8 transition-all duration-300 ease-in-out hover:shadow-2xl hover:-translate-y-2 border-2 border-transparent hover:border-primary">
                    <CardHeader>
                      {feature.icon}
                      <CardTitle className="text-2xl font-bold">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
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
        © {new Date().getFullYear()} LottoLuck. All rights reserved.
      </footer>
    </div>
  );
}
