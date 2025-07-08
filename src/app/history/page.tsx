'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Header } from '@/components/header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LottoBall } from '@/components/lotto-ball';
import { History as HistoryIcon } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';

type HistoryEntry = {
  date: string;
  combinations: number[][];
};

export default function HistoryPage() {
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const savedHistory = localStorage.getItem('lottoHistory');
      if (savedHistory) {
        setHistory(JSON.parse(savedHistory));
      }
    } catch (error) {
      console.error("Failed to load history from localStorage", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="min-h-screen bg-background selection:bg-primary/20">
      <Header />
      <main className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-left mb-16">
            <h2 className="text-5xl font-extrabold tracking-tighter sm:text-6xl md:text-6xl text-foreground flex items-center gap-4">
              <HistoryIcon className="w-12 h-12 text-primary" />
              이전 추천 번호
            </h2>
            <p className="mt-6 max-w-2xl text-xl text-muted-foreground">
              과거에 AI가 추천했던 번호 조합들을 확인해보세요.
            </p>
        </div>

        {isLoading ? (
            <div className="space-y-8">
                {Array.from({length: 3}).map((_, i) => (
                    <Card key={i} className="shadow-lg animate-pulse border">
                        <CardHeader className="p-8">
                            <CardTitle><Skeleton className="h-8 w-56" /></CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6 p-8 pt-0">
                            {[...Array(2)].map((_, j) => (
                                <div key={j} className="flex flex-wrap gap-4 p-4 rounded-lg bg-muted">
                                    {[...Array(6)].map((_, k) => (
                                        <Skeleton key={k} className="w-14 h-14 rounded-full" />
                                    ))}
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                ))}
            </div>
        ) : history.length > 0 ? (
          <div className="space-y-8">
            {history.map((entry, index) => (
              <Card key={index} className="shadow-lg border">
                <CardHeader className="p-8">
                  <CardTitle className="text-2xl font-bold">{entry.date} 추천</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6 p-8 pt-0">
                  {entry.combinations.map((combo, comboIndex) => (
                    <div key={comboIndex} className="flex flex-wrap gap-4 p-4 rounded-lg bg-muted">
                      {combo.map((num) => (
                        <LottoBall key={`${comboIndex}-${num}`} number={num} />
                      ))}
                    </div>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="shadow-lg text-center py-16 border-dashed border-2">
            <CardHeader>
              <CardTitle className="text-3xl font-bold">기록 없음</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center gap-4">
              <p className="text-muted-foreground text-lg">아직 생성된 추천 번호가 없습니다.</p>
              <Button asChild className="mt-4" size="lg">
                <Link href="/analysis">통계 분석하러 가기</Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </main>
      <footer className="py-8 mt-16 text-center text-muted-foreground text-sm border-t">
        © {new Date().getFullYear()} LottoLuck. All rights reserved.
      </footer>
    </div>
  );
}
