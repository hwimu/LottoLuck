
'use client';

import { History, Sparkles, Ticket, LogIn, UserPlus, LogOut, User as UserIcon, MessageSquare } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import { useAuth } from "@/context/auth-context";

export function Header() {
  const { user, logout, loading } = useAuth();

  return (
    <header className="py-8 px-4 sm:px-6 lg:px-8 border-b shadow-sm bg-primary text-primary-foreground">
      <div className="container mx-auto flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-4">
            <Ticket className="w-12 h-12" />
            <h1 className="text-4xl md:text-5xl font-bold tracking-tighter">
              LottoLuck
            </h1>
        </Link>
        <nav className="hidden md:flex items-center gap-2">
            {user && (
              <>
                <Button asChild variant="ghost" size="lg" className="hover:bg-primary/80">
                    <Link href="/community">
                        <MessageSquare className="mr-2 h-5 w-5" />
                        커뮤니티
                    </Link>
                </Button>
              </>
            )}
        </nav>
        <div className="hidden md:flex items-center gap-4 ml-auto">
            {loading ? null : user ? (
              <>
                <div className="flex items-center gap-2">
                  <UserIcon className="w-6 h-6" />
                  <span className="text-lg font-medium">{user.email.split('@')[0]}</span>
                </div>
                <Button onClick={logout} variant="outline" size="lg" className="text-foreground hover:bg-primary/80 hover:text-primary-foreground">
                  <LogOut className="mr-2 h-5 w-5" />
                  로그아웃
                </Button>
              </>
            ) : (
              <>
                <Button asChild variant="ghost" size="lg" className="hover:bg-primary/80">
                  <Link href="/login">
                      <LogIn className="mr-2 h-5 w-5" />
                      로그인
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="text-foreground hover:bg-primary/80 hover:text-primary-foreground">
                  <Link href="/signup">
                      <UserPlus className="mr-2 h-5 w-5" />
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
