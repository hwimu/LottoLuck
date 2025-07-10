'use client';

import { LogOut, Sparkles, Ticket, History } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import { useAuth } from "@/context/auth-context";
import { LottoLuckLogo } from "./lottoluck-logo";

export function Header() {
  const { user, logout, loading } = useAuth();

  const navLinks = [
    { href: "/analysis", label: "AI 번호 예측", icon: <Sparkles className="w-4 h-4" /> },
    { href: "/recent", label: "금주의 당첨번호", icon: <Ticket className="w-4 h-4" /> },
    { href: "/history", label: "나의 행운 기록", icon: <History className="w-4 h-4" /> },
  ]

  return (
    <header className="py-4 px-4 sm:px-6 lg:px-8 border-b bg-card/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-3">
          <LottoLuckLogo className="w-8 h-8 text-primary" />
          <h1 className="text-2xl font-black tracking-tighter text-foreground">
            LottoLuck
          </h1>
        </Link>
        <div className="flex items-center gap-4">
          {loading ? null : user ? (
            <>
              <nav className="hidden md:flex items-center gap-2">
                {navLinks.map(link => (
                  <Button asChild variant="ghost" key={link.href}>
                    <Link href={link.href} className="flex items-center gap-2">
                      {link.icon}
                      {link.label}
                    </Link>
                  </Button>
                ))}
              </nav>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-muted-foreground">{user.email}</span>
                <Button onClick={logout} variant="outline" size="icon" className="w-9 h-9">
                  <LogOut className="w-4 h-4" />
                  <span className="sr-only">로그아웃</span>
                </Button>
              </div>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <Button asChild variant="ghost">
                <Link href="/login">
                  로그인
                </Link>
              </Button>
              <Button asChild>
                <Link href="/signup">
                  회원가입
                </Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
