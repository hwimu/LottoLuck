
'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LogOut, UserCircle, Home, Cpu, History, Ticket, Users, Menu } from "lucide-react";
import { Button } from "./ui/button";
import { useAuth } from "@/context/auth-context";
import { LottoLuckLogo } from "./lottoluck-logo";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

const menuItems = [
  { href: '/', label: '홈', icon: Home, auth: false },
  { href: '/analysis', label: 'AI 번호 예측', icon: Cpu, auth: true },
  { href: '/history', label: '나의 행운 기록', icon: History, auth: true },
  { href: '/recent', label: '금주의 당첨번호', icon: Ticket, auth: true },
  { href: '/community', label: '커뮤니티', icon: Users, auth: true },
];

export function Header() {
  const { user, logout, loading } = useAuth();
  const userInitial = user?.email.split('@')[0] || "사용자";
  const pathname = usePathname();
  const router = useRouter();
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

  const NavLinks = ({ isMobile = false }: { isMobile?: boolean }) => {
    const navClass = isMobile 
      ? "grid gap-6 text-lg font-medium" 
      : "hidden md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6";
    const linkClass = isMobile 
      ? "text-primary-foreground/80 hover:text-white" 
      : "transition-colors hover:text-white whitespace-nowrap";

    return (
      <nav className={navClass}>
        {menuItems.map(({ href, label, auth }) => (
          <Link
            key={href}
            href={href}
            onClick={(e) => handleLinkClick(e, href, auth)}
            className={cn(
              linkClass,
              pathname === href ? "text-white font-semibold" : "text-primary-foreground/80",
            )}
          >
            {label}
          </Link>
        ))}
      </nav>
    );
  };


  return (
    <header className="sticky top-0 flex h-20 items-center gap-4 border-b bg-primary px-4 md:px-6 z-40">
      <Link
        href="/"
        className="flex items-center gap-2 text-lg font-semibold md:text-base mr-6"
      >
        <LottoLuckLogo className="h-10 w-10 text-white" />
        <h1 className="text-3xl font-black tracking-tighter text-white">LottoLuck</h1>
      </Link>
      
      <div className="flex-1 items-center gap-5">
         <NavLinks />
      </div>

      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="shrink-0 md:hidden bg-primary border-primary-foreground/50 text-primary-foreground"
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="bg-primary text-primary-foreground">
          <div className="grid gap-6 text-lg font-medium">
             <Link
              href="/"
              className="flex items-center gap-2 text-lg font-semibold mb-4"
            >
              <LottoLuckLogo className="h-6 w-6 text-white" />
               <h1 className="text-xl font-black tracking-tighter text-white">LottoLuck</h1>
            </Link>
            {menuItems.map(({ href, label, auth }) => (
            <Link
              key={href}
              href={href}
              onClick={(e) => handleLinkClick(e, href, auth)}
              className={cn(
                "transition-colors hover:text-white whitespace-nowrap",
                pathname === href ? "text-white font-semibold" : "text-primary-foreground/80"
              )}
            >
              {label}
            </Link>
          ))}
          </div>
        </SheetContent>
      </Sheet>
      <div className="flex w-full items-center justify-end gap-4 md:ml-auto md:gap-2 lg:gap-4">
        {loading ? null : user ? (
          <div className="flex items-center gap-2">
            <span className="text-primary-foreground font-bold hidden sm:inline">안녕하세요, {userInitial}님!</span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="overflow-hidden rounded-full hover:bg-primary/80">
                  <UserCircle className="w-6 h-6 text-primary-foreground" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>내 계정</DropdownMenuLabel>
                <DropdownMenuSeparator />
                 <DropdownMenuItem disabled>
                    {user.email}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout}>
                  <LogOut className="w-4 h-4 mr-2" />
                  로그아웃
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ) : (
           <Button asChild variant="secondary">
             <Link href="/login">로그인</Link>
           </Button>
        )}
      </div>
    </header>
  );
}
