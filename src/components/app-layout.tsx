'use client'

import { SidebarProvider, Sidebar, SidebarInset, SidebarContent } from "@/components/ui/sidebar"
import { SidebarMenu } from "./sidebar"
import { Header } from "./header"

export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
     <SidebarProvider>
        <div className="flex flex-col w-full">
          <Header />
          <div className="flex">
            <Sidebar>
              <SidebarContent>
                <SidebarMenu />
              </SidebarContent>
            </Sidebar>
            <SidebarInset>
                <main className="flex flex-1 flex-col gap-4 bg-background p-4 sm:px-6 sm:py-0 md:gap-8">
                  {children}
                </main>
            </SidebarInset>
          </div>
        </div>
    </SidebarProvider>
  )
}
