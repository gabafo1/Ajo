import React from 'react'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-14 items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <SidebarTrigger aria-label="Open sidebar" />
            <h1 className="text-sm font-medium text-foreground">
              Welcome back
            </h1>
          </div>
        
        {/* Left section */}


        {/* Right section */}
        <div>
        <SignedOut />
        <SignedIn>
            <UserButton />
        </SignedIn>
        </div>
      </div>
    </header>
  )
}
