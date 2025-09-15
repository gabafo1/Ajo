"use client";

import React from 'react';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { SignedIn, SignedOut, UserButton, useUser } from '@clerk/nextjs';

export default function Header() {
  const { user } = useUser();

  if (!user) return <p>Loading...</p>;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-14 items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <SidebarTrigger aria-label="Open sidebar" />
          <h1 className="text-sm font-medium text-foreground">
            Welcome back {user.firstName} {user.lastName}
          </h1>
        </div>

        <div>
          <SignedOut />
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </div>
    </header>
  );
}
