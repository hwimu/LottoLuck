
'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Home, Cpu, History, Ticket, Users } from 'lucide-react';
import {
  SidebarHeader,
  SidebarMenu as SidebarMenuRoot,
  SidebarMenuItem,
  SidebarMenuButton
} from '@/components/ui/sidebar';
import { LottoLuckLogo } from './lottoluck-logo';
import { useAuth } from '@/context/auth-context';
import { useToast } from '@/hooks/use-toast';

const menuItems = [
  { href: '/', label: '홈', icon: Home, auth: false },
  { href: '/analysis', label: 'AI 번호 예측', icon: Cpu, auth: true },
  { href: '/history', label: '나의 행운 기록', icon: History, auth: true },
  { href: '/recent', label: '금주의 당첨번호', icon: Ticket, auth: true },
  { href: '/community', label: '커뮤니티', icon: Users, auth: true },
];

export function SidebarMenu() {
  const pathname = usePathname();
  const router = useRouter();
  const { user } = useAuth();
  const { toast } = useToast();

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, authRequired: boolean) => {
    if (authRequired && !user) {
      e.preventDefault();
      toast({
        title: '로그인 필요',
        description: '로그인 후에 이용해 주세요.',
        variant: 'destructive',
      });
      router.push('/login?reason=unauthenticated');
    }
  };


  return (
    <>
      <SidebarHeader>
        <Link href="/" className="flex items-center gap-3">
          <LottoLuckLogo className="h-8 w-8 text-white" />
          <h1 className="text-2xl font-black tracking-tighter text-white">
            LottoLuck
          </h1>
        </Link>
      </SidebarHeader>
      <SidebarMenuRoot>
        {menuItems.map(({ href, label, icon: Icon, auth }) => (
          <SidebarMenuItem key={href}>
            <SidebarMenuButton
              asChild
              isActive={pathname === href}
              variant="ghost"
              className="w-full justify-start"
            >
              <Link href={href} onClick={(e) => handleLinkClick(e, href, auth)}>
                <Icon className="mr-2 h-5 w-5" />
                {label}
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenuRoot>
    </>
  );
}
