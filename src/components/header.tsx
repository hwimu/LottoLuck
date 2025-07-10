
'use client';

import { LogIn, UserPlus, LogOut, User as UserIcon, MessageSquare } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import { useAuth } from "@/context/auth-context";

export function Header() {
  const { user, logout, loading } = useAuth();

  return (
    <header className="py-4 px-4 sm:px-6 lg:px-8 border-b bg-card">
      <div className="container mx-auto flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-3">
            <h1 className="text-2xl font-black tracking-tighter text-foreground">
              AI 행운 로또
            </h1>
        </Link>
        <div className="flex items-center gap-2">
            {loading ? null : user ? (
              <>
                <div className="flex items-center gap-4">
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
                </div>
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
