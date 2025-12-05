"use client";

import { useEffect, useState } from "react";
import { MessageSquare } from "lucide-react";

import { cn } from "@/lib/utils";

interface UsageDisplayProps {
  used: number;
  limit: number;
  isAuthenticated: boolean;
  resetTime?: Date | null;
  onSignInClick?: () => void;
  className?: string;
}

function useCountdown(targetDate: Date | null | undefined) {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    if (!targetDate) return;

    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const target = new Date(targetDate).getTime();
      const difference = target - now;

      if (difference <= 0) {
        return "now";
      }

      const hours = Math.floor(difference / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));

      if (hours > 0) {
        return `${hours}h ${minutes}m`;
      }
      return `${minutes}m`;
    };

    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, [targetDate]);

  return timeLeft;
}

export function UsageDisplay({
  used,
  limit,
  isAuthenticated,
  resetTime,
  onSignInClick,
  className,
}: UsageDisplayProps) {
  const percentage = (used / limit) * 100;
  const countdown = useCountdown(resetTime);

  return (
    <div className={cn("space-y-2", className)}>
      {/* Usage Bar */}
      <div className="space-y-1">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <MessageSquare className="size-3" />
            <span>Messages Today</span>
          </div>
          <span className="text-sidebar-foreground font-medium">
            {used} / {limit}
          </span>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-primary/20">
          <div
            className="h-full bg-primary transition-all duration-300"
            style={{ width: `${Math.min(percentage, 100)}%` }}
          />
        </div>
      </div>

      {/* Status Message */}
      {!isAuthenticated && used >= limit && (
        <p className="text-xs text-destructive">
          Daily limit reached.{" "}
          <button
            onClick={onSignInClick}
            className="font-medium underline underline-offset-2 hover:text-destructive/80"
          >
            Sign in
          </button>{" "}
          for more messages.
        </p>
      )}
      {isAuthenticated && used >= limit && (
        <p className="text-xs text-destructive">
          Limit reached. Resets in {countdown || "24h"}.
        </p>
      )}
    </div>
  );
}
