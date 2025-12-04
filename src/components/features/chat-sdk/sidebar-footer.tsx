"use client";

import Link from "next/link";

import { UsageDisplay } from "./usage-display";

import { useAuth } from "@/lib/auth/AuthProvider";

export function SidebarFooter() {
  const { user } = useAuth();

  // TODO: Get actual usage from rate limit system
  const messageLimit = user ? 10 : 5;
  const messagesUsed = 0; // Placeholder

  return (
    <div className="bg-sidebar-background mt-auto border-t p-3">
      {/* Usage Display */}
      <UsageDisplay
        used={messagesUsed}
        limit={messageLimit}
        isAuthenticated={!!user}
      />

      {/* Quick Links */}
      <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted-foreground">
        <Link href="/about" className="hover:text-sidebar-primary transition-colors">
          About
        </Link>
        <Link href="/donate" className="hover:text-sidebar-primary transition-colors">
          Donate
        </Link>
        <Link href="/privacy-policy" className="hover:text-sidebar-primary transition-colors">
          Privacy
        </Link>
      </div>
    </div>
  );
}

