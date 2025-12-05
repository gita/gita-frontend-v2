"use client";

import { useEffect, useState } from "react";
import { Moon, PanelLeft, Plus, Sun } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { SidebarToggle } from "./sidebar-toggle";

import { AuthModal } from "@/components/AuthModal";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useAuth } from "@/lib/auth/AuthProvider";

interface ChatHeaderProps {
  showExpandButton?: boolean;
  onExpandSidebar?: () => void;
}

export function ChatHeader({
  showExpandButton,
  onExpandSidebar,
}: ChatHeaderProps) {
  const [isDark, setIsDark] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const { user, signOut } = useAuth();
  const router = useRouter();

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  const toggleTheme = () => {
    const html = document.documentElement;
    if (html.classList.contains("dark")) {
      html.classList.remove("dark");
      localStorage.theme = "light";
      setIsDark(false);
    } else {
      html.classList.add("dark");
      localStorage.theme = "dark";
      setIsDark(true);
    }
  };

  const handleSignOut = async () => {
    await signOut();
  };

  const handleNewChat = () => {
    router.push("/gitagpt");
  };

  return (
    <TooltipProvider delayDuration={0}>
      <header className="flex items-center justify-between bg-background px-4 py-3">
        {/* Left: Sidebar Toggle + New Chat (when collapsed) + Title */}
        <div className="flex items-center gap-2">
          <SidebarToggle />

          {/* Show expand and new chat buttons when sidebar is collapsed */}
          {showExpandButton && (
            <>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={onExpandSidebar}
                    className="hidden size-10 rounded-lg border text-foreground hover:bg-muted md:flex"
                  >
                    <PanelLeft className="size-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Open sidebar</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleNewChat}
                    className="hidden size-10 rounded-lg border text-foreground hover:bg-muted md:flex"
                  >
                    <Plus className="size-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>New chat</p>
                </TooltipContent>
              </Tooltip>
            </>
          )}

          <Link
            href="/gitagpt"
            className="ml-1 text-lg font-semibold transition-opacity hover:opacity-80"
          >
            GitaGPT
          </Link>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          {/* Quick Links - Hidden on mobile */}
          <div className="hidden items-center gap-1 text-sm md:flex">
            <Link
              href="/about"
              className="rounded-md px-3 py-1.5 transition-colors hover:bg-muted"
            >
              About
            </Link>
            <Link
              href="/donate"
              className="rounded-md px-3 py-1.5 transition-colors hover:bg-muted"
            >
              Donate
            </Link>
          </div>

          {/* Theme Toggle */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                aria-label="Toggle theme"
              >
                {isDark ? (
                  <Sun className="size-5" />
                ) : (
                  <Moon className="size-5" />
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{isDark ? "Light mode" : "Dark mode"}</p>
            </TooltipContent>
          </Tooltip>

          {/* Auth Buttons - ChatGPT Style */}
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  className="flex size-9 cursor-pointer items-center justify-center rounded-full transition-opacity hover:opacity-80"
                  aria-label="User menu"
                >
                  {user.user_metadata?.avatar_url ||
                  user.user_metadata?.picture ? (
                    <img
                      src={
                        user.user_metadata.avatar_url ||
                        user.user_metadata.picture
                      }
                      alt="Avatar"
                      className="size-9 rounded-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="flex size-9 items-center justify-center rounded-full bg-primary text-sm font-medium text-primary-foreground">
                      {(
                        user.user_metadata?.full_name?.[0] ||
                        user.email?.[0] ||
                        "U"
                      ).toUpperCase()}
                    </div>
                  )}
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="flex items-center gap-3 p-2">
                  {user.user_metadata?.avatar_url ||
                  user.user_metadata?.picture ? (
                    <img
                      src={
                        user.user_metadata.avatar_url ||
                        user.user_metadata.picture
                      }
                      alt="Avatar"
                      className="size-10 rounded-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="flex size-10 items-center justify-center rounded-full bg-primary text-sm font-medium text-primary-foreground">
                      {(
                        user.user_metadata?.full_name?.[0] ||
                        user.email?.[0] ||
                        "U"
                      ).toUpperCase()}
                    </div>
                  )}
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">
                      {user.user_metadata?.full_name ||
                        user.email?.split("@")[0]}
                    </p>
                    <p className="truncate text-xs text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleSignOut}
                  className="cursor-pointer"
                >
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setAuthModalOpen(true)}
                className="hidden sm:inline-flex"
              >
                Sign in
              </Button>
              <Button
                size="sm"
                onClick={() => setAuthModalOpen(true)}
                className="bg-primary hover:bg-primary/90"
              >
                Sign up
              </Button>
            </div>
          )}
        </div>
      </header>

      {/* Auth Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        translate={(key) => key || ""}
      />
    </TooltipProvider>
  );
}
