
'use client';

import { LogOut, UserCircle } from "lucide-react";
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
import { useSidebar } from "./ui/sidebar";

export function Header() {
  const { user, logout, loading } = useAuth();
  const { toggleSidebar } = useSidebar();
  
  const userInitial = user?.email.split('@')[0] || "사용자";

  return (
    <header className="sticky top-0 z-30 flex h-20 items-center gap-4 border-b bg-primary px-4 sm:px-6">
       <Button
        size="icon"
        variant="outline"
        className="sm:hidden"
        onClick={toggleSidebar}
      >
        <LottoLuckLogo className="h-5 w-5" />
        <span className="sr-only">Toggle Menu</span>
      </Button>
      <div className="flex items-center gap-2 ml-auto">
        {loading ? null : user ? (
          <>
            <span className="text-primary-foreground font-bold">안녕하세요, {userInitial}님!</span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="overflow-hidden rounded-full">
                  <UserCircle className="w-6 h-6 text-primary-foreground" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>내 계정</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout}>
                  <LogOut className="w-4 h-4 mr-2" />
                  로그아웃
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        ) : null}
      </div>
    </header>
  );
}
