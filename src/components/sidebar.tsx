'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Cpu, History, Ticket, Users } from 'lucide-react';
import {
  SidebarHeader,
  SidebarMenu as SidebarMenuRoot,
  SidebarMenuItem,
  SidebarMenuButton
} from '@/components/ui/sidebar';
import { LottoLuckLogo } from './lottoluck-logo';

const menuItems = [
  { href: '/', label: '홈', icon: Home },
  { href: '/analysis', label: 'AI 번호 예측', icon: Cpu },
  { href: '/history', label: '나의 행운 기록', icon: History },
  { href: '/recent', label: '금주의 당첨번호', icon: Ticket },
  { href: '/community', label: '커뮤니티', icon: Users },
];

export function SidebarMenu() {
  const pathname = usePathname();

  return (
    <>
      <SidebarHeader>
        <Link href="/" className="flex items-center gap-3">
          <LottoLuckLogo className="h-8 w-8" />
          <h1 className="text-2xl font-black tracking-tighter text-foreground">
            AI 행운 로또
          </h1>
        </Link>
      </SidebarHeader>
      <SidebarMenuRoot>
        {menuItems.map(({ href, label, icon: Icon }) => (
          <SidebarMenuItem key={href}>
            <SidebarMenuButton
              asChild
              isActive={pathname === href}
              variant="ghost"
              className="w-full justify-start"
            >
              <Link href={href}>
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
