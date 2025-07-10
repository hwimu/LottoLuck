'use client'
import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { ThumbsUp, MessageSquare, UserCircle } from "lucide-react";
import { Skeleton } from './ui/skeleton';
import { Button } from './ui/button';
import Link from 'next/link';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

type Post = {
  id: number;
  author: string;
  title: string;
  content: string;
  votes: number;
  comments: { author: string; text: string }[];
  createdAt: string;
};

const PostCard = ({ post }: { post: Post }) => (
  <Card>
    <Collapsible>
      <CollapsibleTrigger className="w-full text-left">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-bold">{post.title}</CardTitle>
          <CardDescription className="flex items-center gap-2 pt-2 text-sm">
            <UserCircle className="w-4 h-4" />
            {post.author}
            <span className="text-xs text-muted-foreground/80">
              - {new Date(post.createdAt).toLocaleDateString('ko-KR')}
            </span>
          </CardDescription>
        </CardHeader>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <CardContent className="space-y-4 pt-0">
            <p className="text-sm text-foreground/90 p-3 bg-muted/50 rounded-lg truncate">
              {post.content}
            </p>
        </CardContent>
      </CollapsibleContent>
      <CardContent className="pt-0">
         <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <ThumbsUp className="w-3 h-3" />
              {post.votes}
            </div>
            <div className="flex items-center gap-1">
              <MessageSquare className="w-3 h-3" />
              {post.comments.length}
            </div>
          </div>
      </CardContent>
    </Collapsible>
  </Card>
);

export function CommunityFeed() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const savedPosts = localStorage.getItem('lottoPosts');
      if (savedPosts) {
        setPosts(JSON.parse(savedPosts));
      } else {
        const initialPosts: Post[] = [
          {
            id: 1,
            author: '행운의네잎클로버',
            title: '이번주 느낌 좋은 번호 공유합니다!',
            content: '왠지 이번주는 3, 7, 12, 21, 33, 45 중에서 나올 것 같아요. 다들 어떻게 생각하시나요?',
            votes: 12,
            comments: [
              { author: '로또대박기원', text: '오 저도 7, 21은 생각하고 있었는데!' },
              { author: 'AI맹신론자', text: 'AI 분석 결과랑 비슷한데요? 신기하네요.' },
            ],
            createdAt: new Date(Date.now() - 86400000).toISOString(),
          },
          {
            id: 2,
            author: '인생역전가즈아',
            title: '다들 AI 예측 신뢰하시나요?',
            content: '저는 반신반의하면서도 계속 쓰게 되네요. AI 추천으로 5등 한번 된 적 있어서..ㅎㅎ',
            votes: 5,
            comments: [],
            createdAt: new Date(Date.now() - 172800000).toISOString(),
          },
        ];
        setPosts(initialPosts);
      }
    } catch (error) {
      console.error("Failed to load posts from localStorage", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const popularPosts = [...posts].sort((a, b) => b.votes - a.votes).slice(0, 4);
  const recentPosts = [...posts].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 4);

  return (
    <div className="grid gap-8">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>인기글</CardTitle>
          <Button asChild variant="link" className="text-sm text-primary">
             <Link href="/community">더보기</Link>
          </Button>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          {isLoading ? (
            Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-28 w-full" />)
          ) : (
            popularPosts.map(post => <PostCard key={post.id} post={post} />)
          )}
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>실시간 글</CardTitle>
           <Button asChild variant="link" className="text-sm text-primary">
             <Link href="/community">더보기</Link>
          </Button>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          {isLoading ? (
            Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-28 w-full" />)
          ) : (
            recentPosts.map(post => <PostCard key={post.id} post={post} />)
          )}
        </CardContent>
      </Card>
    </div>
  );
}
