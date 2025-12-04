"use client";

import { MessageSquare } from "lucide-react";

import { cn } from "@/lib/utils";

interface UsageDisplayProps {
  used: number;
  limit: number;
  isAuthenticated: boolean;
  className?: string;
}

export function UsageDisplay({
  used,
  limit,
  isAuthenticated,
  className,
}: UsageDisplayProps) {
  const percentage = (used / limit) * 100;
  const isNearLimit = percentage >= 80;

  return (
    <div className={cn("space-y-2", className)}>
      {/* Usage Bar */}
      <div className="space-y-1">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <MessageSquare className="size-3" />
            <span>Messages Today</span>
          </div>
          <span
            className={cn(
              "font-medium",
              isNearLimit ? "text-destructive" : "text-sidebar-foreground"
            )}
          >
            {used} / {limit}
          </span>
        </div>
        <div className="bg-sidebar-accent h-1.5 w-full overflow-hidden rounded-full">
          <div
            className={cn(
              "h-full transition-all duration-300",
              isNearLimit ? "bg-destructive" : "bg-sidebar-primary"
            )}
            style={{ width: `${Math.min(percentage, 100)}%` }}
          />
        </div>
      </div>

      {/* Status Message */}
      {!isAuthenticated && used >= limit && (
        <p className="text-xs text-destructive">
          Daily limit reached. Sign in for more messages.
        </p>
      )}
      {isAuthenticated && used >= limit && (
        <p className="text-xs text-destructive">
          Daily limit reached. Resets at midnight.
        </p>
      )}
    </div>
  );
}

