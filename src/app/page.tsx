
'use client';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Cpu, History, Ticket, Users, ArrowRight } from "lucide-react";
import { Separator } from '@/components/ui/separator';
import { CommunityFeed } from '@/components/community-feed';
import { useAuth } from '@/context/auth-context';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';

const features = [
  {
    title: "AI 번호 예측",
    description: "AI가 분석한 통계로 행운의 번호를 예측해보세요.",
    icon: Cpu,
    href: "/analysis",
    color: "text-blue-500",
    bgColor: "bg-blue-50",
    auth: true,
  },
  {
    title: "나의 행운 기록",
    description: "과거에 추천받았던 번호 조합들을 다시 확인하세요.",
    icon: History,
    href: "/history",
    color: "text-green-500",
    bgColor: "bg-green-50",
    auth: true,
  },
  {
    title: "금주의 당첨번호",
    description: "가장 최근 회차의 당첨 번호를 확인해보세요.",
    icon: Ticket,
    href: "/recent",
    color: "text-yellow-500",
    bgColor: "bg-yellow-50",
    auth: true,
  },
  {
    title: "커뮤니티",
    description: "다른 사용자들과 의견을 나누고 정보를 공유하세요.",
    icon: Users,
    href: "/community",
    color: "text-purple-500",
    bgColor: "bg-purple-50",
    auth: true,
  },
];

export default function Home() {
  const { user } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, authRequired: boolean) => {
    if (authRequired && !user) {
      e.preventDefault();
      toast({
        title: '로그인 필요',
        description: '로그인 후에 이용해 주세요.',
      });
      router.push('/login');
    }
  };

  return (
    <div className="flex-1 space-y-8 p-4 md:p-8 pt-6">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">안녕하세요!</h2>
        <p className="text-muted-foreground">
          AI 행운 로또에 오신 것을 환영합니다. 무엇을 도와드릴까요?
        </p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
        {features.map((feature) => (
          <Card key={feature.title} className="hover:shadow-lg transition-shadow duration-300 group">
            <Link href={feature.href} onClick={(e) => handleLinkClick(e, feature.href, feature.auth)}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="space-y-2">
                  <CardTitle className="text-xl font-bold">{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </div>
                <div className={`p-3 rounded-full ${feature.bgColor}`}>
                  <feature.icon className={`h-6 w-6 ${feature.color}`} />
                </div>
              </CardHeader>
              <div className="p-6 pt-2">
                 <div className="flex items-center text-sm font-medium text-primary group-hover:underline">
                    바로가기
                   <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                 </div>
              </div>
            </Link>
          </Card>
        ))}
      </div>

      <Separator className="my-12" />

      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">커뮤니티 소식</h2>
        <p className="text-muted-foreground">
          다른 사용자들의 행운과 예측을 확인해보세요.
        </p>
      </div>
      <CommunityFeed />
    </div>
  );
}
