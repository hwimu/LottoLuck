
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/auth-context';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { LottoBall } from '@/components/lotto-ball';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';

type HistoryEntry = {
  date: string;
  combinations: number[][];
};

export default function HistoryPage() {
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [isLoadingHistory, setIsLoadingHistory] = useState(true);
  
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (user) {
      try {
        const savedHistory = localStorage.getItem('lottoHistory');
        if (savedHistory) {
          setHistory(JSON.parse(savedHistory));
        }
      } catch (error) {
        console.error("Failed to load history from localStorage", error);
      } finally {
        setIsLoadingHistory(false);
      }
    }
  }, [user]);

  if (authLoading || !user) {
    return (
      <div className="p-8 space-y-8">
        <Skeleton className="h-10 w-1/3 mb-8" />
        <Skeleton className="h-64 w-full" />
        <Skeleton className="h-64 w-full" />
      </div>
    )
  }

  return (
    <div className="flex-1 space-y-8 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">나의 행운 기록</h2>
      </div>
      <p className="text-muted-foreground">
        과거에 AI가 추천했던 번호 조합들을 확인해보세요.
      </p>

      {isLoadingHistory ? (
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
              <CardHeader className="p-6">
                <CardTitle className="text-xl font-bold">{entry.date} 추천</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 p-6 pt-0">
                {entry.combinations.map((combo, comboIndex) => (
                  <div key={comboIndex} className="flex flex-wrap gap-3 p-3 rounded-lg bg-muted/50">
                    {combo.map((num) => (
                      <LottoBall key={`${comboIndex}-${num}`} number={num} size="sm"/>
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
            <CardTitle className="text-2xl font-bold">기록 없음</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-4">
            <p className="text-muted-foreground text-lg">아직 생성된 추천 번호가 없습니다.</p>
            <Button asChild className="mt-4" size="lg">
              <Link href="/analysis">통계 분석하러 가기</Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
