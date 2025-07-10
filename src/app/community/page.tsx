
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/auth-context';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Skeleton } from '@/components/ui/skeleton';
import { ThumbsUp, MessageSquare, UserCircle } from 'lucide-react';

type Post = {
  id: number;
  author: string;
  title: string;
  content: string;
  votes: number;
  comments: { author: string; text: string }[];
  createdAt: string;
};

export default function CommunityPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();

  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostContent, setNewPostContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [commentInputs, setCommentInputs] = useState<{[key: number]: string}>({});

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (user) {
      try {
        const savedPosts = localStorage.getItem('lottoPosts');
        if (savedPosts) {
          setPosts(JSON.parse(savedPosts));
        } else {
          // Add initial data if no posts are saved
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
              createdAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
            },
            {
              id: 2,
              author: '인생역전가즈아',
              title: '다들 AI 예측 신뢰하시나요?',
              content: '저는 반신반의하면서도 계속 쓰게 되네요. AI 추천으로 5등 한번 된 적 있어서..ㅎㅎ',
              votes: 5,
              comments: [],
              createdAt: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
            },
          ];
          setPosts(initialPosts);
          localStorage.setItem('lottoPosts', JSON.stringify(initialPosts));
        }
      } catch (error) {
        console.error("Failed to load posts from localStorage", error);
      } finally {
        setIsLoading(false);
      }
    }
  }, [user]);

  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostTitle.trim() || !newPostContent.trim() || !user) return;

    setIsSubmitting(true);
    const newPost: Post = {
      id: Date.now(),
      author: user.email.split('@')[0],
      title: newPostTitle,
      content: newPostContent,
      votes: 0,
      comments: [],
      createdAt: new Date().toISOString(),
    };

    setTimeout(() => {
      const updatedPosts = [newPost, ...posts];
      setPosts(updatedPosts);
      localStorage.setItem('lottoPosts', JSON.stringify(updatedPosts));
      setNewPostTitle('');
      setNewPostContent('');
      setIsSubmitting(false);
    }, 500);
  };
  
  const handleVote = (postId: number) => {
    const updatedPosts = posts.map(p => p.id === postId ? { ...p, votes: p.votes + 1 } : p);
    setPosts(updatedPosts);
    localStorage.setItem('lottoPosts', JSON.stringify(updatedPosts));
  };
  
  const handleCommentSubmit = (postId: number) => {
    const commentText = commentInputs[postId];
    if (!commentText || !commentText.trim() || !user) return;
    
    const newComment = { author: user.email.split('@')[0], text: commentText };
    const updatedPosts = posts.map(p => p.id === postId ? { ...p, comments: [...p.comments, newComment] } : p);
    
    setPosts(updatedPosts);
    localStorage.setItem('lottoPosts', JSON.stringify(updatedPosts));
    setCommentInputs(prev => ({ ...prev, [postId]: '' }));
  };
  
  const handleCommentChange = (postId: number, text: string) => {
    setCommentInputs(prev => ({ ...prev, [postId]: text }));
  };

  if (authLoading || !user) {
    return (
      <div className="p-8 space-y-8">
        <Skeleton className="h-10 w-1/3 mb-8" />
        <Skeleton className="h-48 w-full" />
        <Skeleton className="h-64 w-full" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  return (
    <div className="flex-1 space-y-8 p-8 pt-6">
       <div className="flex items-center justify-between space-y-2">
         <h2 className="text-3xl font-bold tracking-tight">커뮤니티</h2>
       </div>
       <p className="text-muted-foreground">
          다른 사용자들과 자유롭게 의견을 나누고 행운의 기운을 받아보세요!
       </p>

        <Card className="mb-12 shadow-lg border">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">새 게시물 작성</CardTitle>
          </CardHeader>
          <form onSubmit={handlePostSubmit}>
            <CardContent className="space-y-4">
              <Input
                placeholder="제목을 입력하세요"
                value={newPostTitle}
                onChange={(e) => setNewPostTitle(e.target.value)}
                required
                className="text-base"
              />
              <Textarea
                placeholder="어떤 의견을 나누고 싶으신가요?"
                value={newPostContent}
                onChange={(e) => setNewPostContent(e.target.value)}
                required
                className="text-base min-h-[100px]"
              />
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={isSubmitting} className="w-full h-12 text-lg">
                {isSubmitting ? '등록 중...' : '게시물 등록'}
              </Button>
            </CardFooter>
          </form>
        </Card>

        {isLoading ? (
          <div className="space-y-8">
            {[...Array(3)].map((_, i) => <Skeleton key={i} className="h-64 w-full" />)}
          </div>
        ) : (
          <div className="space-y-8">
            {posts.sort((a,b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).map(post => (
              <Card key={post.id} className="shadow-lg border">
                <CardHeader className="pb-4">
                  <CardTitle className="text-2xl font-bold">{post.title}</CardTitle>
                  <CardDescription className="flex items-center gap-2 pt-2 text-sm">
                    <UserCircle className="w-4 h-4" />
                    {post.author}
                    <span className="text-xs text-muted-foreground/80">
                      - {new Date(post.createdAt).toLocaleString('ko-KR')}
                    </span>
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-base text-foreground/90 p-4 bg-muted/50 rounded-lg">{post.content}</p>
                  <div className="flex items-center gap-6">
                    <Button variant="outline" size="sm" onClick={() => handleVote(post.id)}>
                      <ThumbsUp className="w-4 h-4 mr-2" />
                      추천 ({post.votes})
                    </Button>
                    <div className="flex items-center text-muted-foreground text-sm">
                        <MessageSquare className="w-4 h-4 mr-2" />
                        댓글 {post.comments.length}개
                    </div>
                  </div>

                  {post.comments.length > 0 && (
                    <div className="space-y-4 pt-4 border-t">
                      {post.comments.map((comment, index) => (
                        <div key={index} className="text-sm p-3 bg-muted/30 rounded-md">
                          <span className="font-semibold">{comment.author}:</span> {comment.text}
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="flex gap-2">
                    <Input
                      placeholder="댓글을 입력하세요..."
                      value={commentInputs[post.id] || ''}
                      onChange={(e) => handleCommentChange(post.id, e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleCommentSubmit(post.id)}
                    />
                    <Button onClick={() => handleCommentSubmit(post.id)}>등록</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
    </div>
  );
}
