'use client'

import { SidebarProvider, Sidebar, SidebarInset, SidebarContent } from "@/components/ui/sidebar"
import { SidebarMenu } from "./sidebar"
import { Header } from "./header"

export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
     <SidebarProvider>
      <Sidebar>
        <SidebarContent>
          <SidebarMenu />
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <div className="flex flex-col">
          <Header />
          <main className="flex flex-1 flex-col gap-4 bg-muted/40 p-4 sm:px-6 sm:py-0 md:gap-8">
            {children}
          </main>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
