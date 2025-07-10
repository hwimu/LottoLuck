
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/auth-context';
import { StatisticsAnalysis } from "@/components/statistics-analysis";
import { Skeleton } from '@/components/ui/skeleton';

export default function AnalysisPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="p-8">
         <Skeleton className="h-[600px] w-full" />
      </div>
    )
  }

  return (
    <div className="flex-1 space-y-8 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">AI 번호 예측</h2>
      </div>
       <div className="flex justify-center">
          <div className="w-full max-w-4xl">
              <StatisticsAnalysis />
          </div>
      </div>
    </div>
  );
}
