'use client';

import { useState, useEffect } from 'react';
import { Header } from '@/components/header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LottoBall } from '@/components/lotto-ball';
import { History as HistoryIcon } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

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
      <main className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="text-left mb-12 md:mb-16">
            <h2 className="text-4xl font-extrabold tracking-tighter sm:text-5xl md:text-6xl text-foreground flex items-center gap-4">
              <HistoryIcon className="w-10 h-10 text-primary" />
              이전 추천 번호
            </h2>
            <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
              과거에 AI가 추천했던 번호 조합들을 확인해보세요.
            </p>
        </div>

        {isLoading ? (
            <div className="space-y-8">
                {Array.from({length: 3}).map((_, i) => (
                    <Card key={i} className="shadow-lg animate-pulse">
                        <CardHeader>
                            <CardTitle><Skeleton className="h-7 w-48" /></CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {[...Array(2)].map((_, j) => (
                                <div key={j} className="flex flex-wrap gap-2 p-3 rounded-lg bg-muted">
                                    {[...Array(6)].map((_, k) => (
                                        <Skeleton key={k} className="w-12 h-12 rounded-full" />
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
              <Card key={index} className="shadow-lg">
                <CardHeader>
                  <CardTitle>{entry.date} 추천</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {entry.combinations.map((combo, comboIndex) => (
                    <div key={comboIndex} className="flex flex-wrap gap-2 p-3 rounded-lg bg-muted">
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
          <Card className="shadow-lg text-center py-12">
            <CardHeader>
              <CardTitle>기록 없음</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">아직 생성된 추천 번호가 없습니다.</p>
              <p className="text-muted-foreground mt-2">홈으로 돌아가서 번호를 생성해보세요.</p>
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
