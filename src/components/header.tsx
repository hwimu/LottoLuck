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
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
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
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="overflow-hidden rounded-full">
                <UserCircle className="w-6 h-6" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>안녕하세요, {userInitial}님!</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={logout}>
                <LogOut className="w-4 h-4 mr-2" />
                로그아웃
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : null}
      </div>
    </header>
  );
}
