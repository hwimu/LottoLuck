
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/auth-context';
import { Header } from '@/components/header';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { PlusCircle, MessageSquare } from 'lucide-react';
import { NewPostForm } from '@/components/community-new-post-form';
import { PostCard, type Post } from '@/components/community-post-card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

export default function CommunityPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoadingPosts, setIsLoadingPosts] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login?reason=unauthenticated');
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (user) {
      try {
        const savedPosts = localStorage.getItem('lottoCommunityPosts');
        if (savedPosts) {
          setPosts(JSON.parse(savedPosts).sort((a: Post, b: Post) => new Date(b.date).getTime() - new Date(a.date).getTime()));
        }
      } catch (error) {
        console.error("Failed to load posts from localStorage", error);
      } finally {
        setIsLoadingPosts(false);
      }
    }
  }, [user]);

  const handleNewPost = (newPost: Post) => {
    const updatedPosts = [newPost, ...posts];
    setPosts(updatedPosts);
    localStorage.setItem('lottoCommunityPosts', JSON.stringify(updatedPosts));
    setIsFormOpen(false);
  };
  
  const updatePost = (updatedPost: Post) => {
    const updatedPosts = posts.map(p => p.id === updatedPost.id ? updatedPost : p);
    setPosts(updatedPosts);
    localStorage.setItem('lottoCommunityPosts', JSON.stringify(updatedPosts));
  }

  if (loading || !user) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            <Skeleton className="h-16 w-3/4" />
            <Skeleton className="h-8 w-1/2 mt-6" />
            <div className="mt-8 space-y-6">
              <Skeleton className="h-48 w-full rounded-lg" />
              <Skeleton className="h-48 w-full rounded-lg" />
              <Skeleton className="h-48 w-full rounded-lg" />
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background selection:bg-primary/20">
      <Header />
      <main className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-16">
            <div className="text-left">
                <h2 className="text-5xl font-extrabold tracking-tighter sm:text-6xl md:text-6xl text-foreground flex items-center gap-4">
                  <MessageSquare className="w-12 h-12 text-primary" />
                  커뮤니티
                </h2>
                <p className="mt-6 max-w-2xl text-xl text-muted-foreground">
                  자신만의 예측 번호를 공유하고 다른 사람들의 생각도 확인해보세요.
                </p>
            </div>
            <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
                <DialogTrigger asChild>
                    <Button size="lg" className="h-14 text-lg">
                        <PlusCircle className="mr-2 h-6 w-6" />
                        새 게시물 작성
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>새 게시물 작성</DialogTitle>
                    </DialogHeader>
                    <NewPostForm onSubmit={handleNewPost} />
                </DialogContent>
            </Dialog>
        </div>

        <div className="space-y-6">
          {isLoadingPosts ? (
             <div className="mt-8 space-y-6">
                <Skeleton className="h-48 w-full rounded-lg" />
                <Skeleton className="h-48 w-full rounded-lg" />
                <Skeleton className="h-48 w-full rounded-lg" />
            </div>
          ) : posts.length > 0 ? (
            posts.map(post => (
              <PostCard key={post.id} post={post} onUpdate={updatePost} currentUserEmail={user.email} />
            ))
          ) : (
            <div className="text-center py-16 border-2 border-dashed rounded-lg">
              <h3 className="text-2xl font-bold text-muted-foreground">아직 게시물이 없습니다.</h3>
              <p className="text-lg mt-2 text-muted-foreground">가장 먼저 게시물을 작성해보세요!</p>
            </div>
          )}
        </div>

      </main>
      <footer className="py-8 mt-16 text-center text-muted-foreground text-sm border-t">
        © {new Date().getFullYear()} LottoLuck. All rights reserved.
      </footer>
    </div>
  );
}
