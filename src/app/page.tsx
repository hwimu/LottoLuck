'use client';
import { CommunityFeed } from "@/components/community-feed";

export default function Home() {
  return (
    <div className="flex-1 space-y-8 p-8 pt-6">
       <div className="flex items-center justify-between space-y-2">
         <h2 className="text-3xl font-bold tracking-tight">홈</h2>
       </div>
       <CommunityFeed />
    </div>
  );
}
