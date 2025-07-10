
'use client';

import { LogIn, UserPlus, LogOut, User as UserIcon, MessageSquare } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import { useAuth } from "@/context/auth-context";

const LottoIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
        <path d="M12 2a10 10 0 1 0 10 10" />
        <path d="M12 2a10 10 0 1 1-10 10" />
        <path d="m15.6 15.6 2.8 2.8" />
        <path d="M12 8v8" />
        <path d="M8 12h8" />
    </svg>
)


export function Header() {
  const { user, logout, loading } = useAuth();

  return (
    <header className="py-4 px-4 sm:px-6 lg:px-8 border-b bg-card">
      <div className="container mx-auto flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-3">
            <LottoIcon />
            <h1 className="text-2xl font-black tracking-tighter text-foreground">
              AI 행운 로또
            </h1>
        </Link>
        <div className="flex items-center gap-2">
            {loading ? null : user ? (
              <>
                <Button asChild variant="ghost" size="sm">
                    <Link href="/community">
                        <MessageSquare className="mr-2 h-4 w-4" />
                        커뮤니티
                    </Link>
                </Button>
                <div className="flex items-center gap-2 bg-secondary px-3 py-1.5 rounded-lg">
                  <UserIcon className="w-5 h-5 text-muted-foreground" />
                  <span className="text-sm font-medium">{user.email.split('@')[0]}</span>
                </div>
                <Button onClick={logout} variant="outline" size="sm">
                  <LogOut className="mr-2 h-4 w-4" />
                  로그아웃
                </Button>
              </>
            ) : (
              <>
                <Button asChild variant="ghost" size="sm">
                  <Link href="/login">
                      <LogIn className="mr-2 h-4 w-4" />
                      로그인
                  </Link>
                </Button>
                <Button asChild variant="default" size="sm">
                  <Link href="/signup">
                      <UserPlus className="mr-2 h-4 w-4" />
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
