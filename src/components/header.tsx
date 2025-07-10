'use client';

import { LogIn, LogOut, UserPlus, ArrowRight, Users } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import { useAuth } from "@/context/auth-context";
import { LottoLuckLogo } from "./lottoluck-logo";

export function Header() {
  const { user, logout, loading } = useAuth();
  
  const userInitial = user?.email.split('@')[0];

  return (
    <header className="py-4 px-4 sm:px-6 lg:px-8 bg-card border-b">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <LottoLuckLogo className="w-8 h-8 text-primary" />
          <h1 className="text-2xl font-black tracking-tighter text-foreground">
            LottoLuck
          </h1>
        </Link>
        <div className="flex items-center gap-2">
          {loading ? null : user ? (
            <>
              <Button asChild variant="ghost">
                <Link href="/community">
                  <Users className="w-4 h-4 mr-2" />
                  커뮤니티
                </Link>
              </Button>
              <span className="text-sm font-medium text-muted-foreground hidden sm:inline">안녕하세요, {userInitial}님!</span>
              <Button onClick={logout} variant="outline" size="sm">
                <LogOut className="w-4 h-4 mr-2" />
                로그아웃
              </Button>
            </>
          ) : (
            <>
              <Button asChild variant="ghost">
                <Link href="/login">
                  <ArrowRight className="w-4 h-4 mr-2" />
                  로그인
                </Link>
              </Button>
              <Button asChild>
                <Link href="/signup">
                  <UserPlus className="w-4 h-4 mr-2" />
                  회원가입
                </Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
