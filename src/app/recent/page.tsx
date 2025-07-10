
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/auth-context';
import { RecentWinningNumbers } from "@/components/recent-winning-numbers";
import { Skeleton } from '@/components/ui/skeleton';

export default function RecentPage() {
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
         <Skeleton className="h-[360px] w-full max-w-2xl" />
      </div>
    )
  }

  return (
    <div className="flex-1 space-y-8 p-8 pt-6">
       <div className="flex items-center justify-between space-y-2">
         <h2 className="text-3xl font-bold tracking-tight">금주의 당첨번호</h2>
       </div>
       <div className="flex justify-center">
            <div className="w-full max-w-2xl">
                <RecentWinningNumbers />
            </div>
        </div>
    </div>
  );
}
