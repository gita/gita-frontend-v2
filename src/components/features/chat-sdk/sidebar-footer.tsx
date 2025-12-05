"use client";

import { useState } from "react";
import Link from "next/link";

import { GitaPromoCard } from "./gita-promo-card";
import { UsageDisplay } from "./usage-display";

import { AuthModal } from "@/components/AuthModal";
import { useRateLimitStatus } from "@/hooks/useRateLimitStatus";
import { useAuth } from "@/lib/auth/AuthProvider";

export function SidebarFooter() {
  const { user } = useAuth();
  const { remaining, limit, resetTime } = useRateLimitStatus();
  const [authModalOpen, setAuthModalOpen] = useState(false);

  // Calculate used messages from remaining
  const messagesUsed = limit - remaining;

  return (
    <>
      <div className="bg-sidebar-background mt-auto border-t p-3">
        {/* Gita Website Promo */}
        <GitaPromoCard className="mb-3" />

        {/* Usage Display */}
        <UsageDisplay
          used={messagesUsed}
          limit={limit}
          isAuthenticated={!!user}
          resetTime={resetTime}
          onSignInClick={() => setAuthModalOpen(true)}
        />

        {/* Quick Links */}
        <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted-foreground">
          <Link
            href="/about"
            className="hover:text-sidebar-primary transition-colors"
          >
            About
          </Link>
          <Link
            href="/donate"
            className="hover:text-sidebar-primary transition-colors"
          >
            Donate
          </Link>
          <Link
            href="/privacy-policy"
            className="hover:text-sidebar-primary transition-colors"
          >
            Privacy
          </Link>
        </div>
      </div>

      {/* Auth Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        translate={(key) => key || ""}
      />
    </>
  );
}
