'use client'

import { Header } from "./header"

export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header />
      <main className="flex flex-1 flex-col gap-4 md:gap-8 p-4 md:p-8">
        {children}
      </main>
    </div>
  )
}
