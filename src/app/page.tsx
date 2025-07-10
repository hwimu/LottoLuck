
'use client';
import { Header } from "@/components/header";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, History, Ticket, ThumbsUp, MessageSquare, Crown } from "lucide-react";
import { useState, useEffect } from "react";
import { PostCard, type Post } from "@/components/community-post-card";
import { useAuth } from "@/context/auth-context";

export default function Home() {
  const [activeMenu, setActiveMenu] = useState("analysis");
  const [posts, setPosts] = useState<Post[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    try {
      const savedPosts = localStorage.getItem('lottoCommunityPosts');
      if (savedPosts) {
        setPosts(JSON.parse(savedPosts).sort((a: Post, b: Post) => new Date(b.date).getTime() - new Date(a.date).getTime()));
      }
    } catch (error) {
      console.error("Failed to load posts from localStorage", error);
    }
  }, []);

  const popularPosts = [...posts].sort((a, b) => b.votes - a.votes).slice(0, 3);
  const recentPosts = posts.slice(0, 5);

  const features = [
    {
      id: "analysis",
      title: "AI 번호 예측",
      description: "AI가 행운의 번호를 생성합니다.",
      href: "/analysis",
      icon: <Sparkles className="w-6 h-6" />,
    },
    {
      id: "recent",
      title: "금주의 당첨번호",
      description: "이번 주 당첨 번호를 확인하세요.",
      href: "/recent",
      icon: <Ticket className="w-6 h-6" />,
    },
    {
      id: "history",
      title: "나의 행운 기록",
      description: "내가 저장한 번호를 볼 수 있습니다.",
      href: "/history",
      icon: <History className="w-6 h-6" />,
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <aside className="lg:col-span-1">
            <Card className="p-4 bg-card shadow-sm border-none">
              <div className="space-y-2">
                {features.map((feature) => (
                   <Link href={feature.href} key={feature.id} className="block group" onMouseEnter={() => setActiveMenu(feature.id)}>
                    <Card className={`transition-all duration-300 ease-in-out ${activeMenu === feature.id ? 'bg-primary text-primary-foreground' : 'bg-secondary hover:bg-secondary/80'}`}>
                      <CardHeader className="flex flex-row items-center gap-4 p-4">
                        {feature.icon}
                        <div>
                          <CardTitle className="text-lg font-bold">{feature.title}</CardTitle>
                          <CardDescription className={`text-sm ${activeMenu === feature.id ? 'text-primary-foreground/90' : 'text-muted-foreground'}`}>{feature.description}</CardDescription>
                        </div>
                      </CardHeader>
                    </Card>
                  </Link>
                ))}
              </div>
            </Card>
          </aside>
          
          <section className="lg:col-span-2">
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold flex items-center gap-2 mb-4">
                  <Crown className="w-6 h-6 text-primary" />
                  금주의 인기글
                </h2>
                <div className="space-y-3">
                  {popularPosts.length > 0 ? popularPosts.map((post, index) => (
                    <Link href="/community" key={post.id}>
                      <Card className="bg-card hover:bg-secondary/80 transition-colors cursor-pointer">
                        <CardContent className="p-4 flex items-center gap-4">
                          <span className="text-xl font-bold text-primary">{index + 1}</span>
                          <div className="flex-grow">
                            <p className="font-semibold text-base">{post.title}</p>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                              <span>{post.author.split('@')[0]}</span>
                              <div className="flex items-center gap-1">
                                <ThumbsUp className="w-3.5 h-3.5" />
                                <span>{post.votes}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <MessageSquare className="w-3.5 h-3.5" />
                                <span>{post.comments.length}</span>
                              </div>
                            </div>
                          </div>
                          <span className="text-sm text-muted-foreground">{new Date(post.date).toLocaleDateString('ko-KR')}</span>
                        </CardContent>
                      </Card>
                    </Link>
                  )) : (
                    <p className="text-muted-foreground">아직 인기글이 없습니다.</p>
                  )}
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4">실시간 글</h2>
                <div className="space-y-4">
                   {recentPosts.length > 0 ? recentPosts.map(post => (
                     <Link href="/community" key={post.id}>
                       <Card className="bg-card hover:bg-secondary/80 transition-colors cursor-pointer">
                          <CardContent className="p-4">
                              <p className="font-semibold truncate">{post.title}</p>
                              <p className="text-sm text-muted-foreground truncate mt-1">{post.content}</p>
                          </CardContent>
                       </Card>
                      </Link>
                    )) : (
                      <p className="text-muted-foreground">아직 게시물이 없습니다.</p>
                    )}
                </div>
              </div>

            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
