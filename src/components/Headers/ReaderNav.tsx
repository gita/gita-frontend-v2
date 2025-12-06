"use client";

import { useEffect, useState } from "react";
import {
  BookOpen,
  List,
  LogOut,
  Moon,
  Search,
  Settings,
  Sun,
  Type,
  User,
} from "lucide-react";

import { AuthModal } from "components/AuthModal";
import LinkWithLocale from "components/LinkWithLocale";
import { useAuth } from "lib/auth/AuthProvider";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ReaderNavProps {
  translate: Translate;
  locale: string;
  currentChapter?: number;
  chapterName?: string;
  onSidebarToggle?: () => void;
}

export function ReaderNav({
  translate,
  locale,
  currentChapter,
  chapterName,
  onSidebarToggle,
}: ReaderNavProps) {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [contentModalOpen, setContentModalOpen] = useState(false);
  const [appearanceModalOpen, setAppearanceModalOpen] = useState(false);
  const { user, signOut } = useAuth();

  useEffect(() => {
    setMounted(true);
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

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        {/* Left: Sidebar Toggle + Logo */}
        <div className="flex items-center gap-3">
          {onSidebarToggle && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onSidebarToggle}
                  className="lg:hidden"
                  aria-label="Toggle navigation"
                >
                  <List className="size-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{translate("Navigation")}</p>
              </TooltipContent>
            </Tooltip>
          )}

          <LinkWithLocale href="/" className="flex items-center gap-2">
            <BookOpen className="size-6 text-primary" />
            <span className="hidden font-inter text-xl font-bold sm:inline-block">
              {translate("Bhagavad Gita")}
            </span>
            <span className="font-inter text-xl font-bold sm:hidden">BG</span>
          </LinkWithLocale>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-1">
          {/* Content Settings - Hidden for now */}
          {/* <Dialog open={contentModalOpen} onOpenChange={setContentModalOpen}>
            <Tooltip>
              <TooltipTrigger asChild>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="icon" aria-label="Content settings">
                    <Settings className="size-5" />
                  </Button>
                </DialogTrigger>
              </TooltipTrigger>
              <TooltipContent>
                <p>{translate("Content")}</p>
              </TooltipContent>
            </Tooltip>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle>{translate("Content Settings")}</DialogTitle>
              </DialogHeader>
              <div className="mt-4 space-y-4">
                <p className="text-sm text-muted-foreground">
                  {translate("Choose what content to display")}
                </p>
              </div>
            </DialogContent>
          </Dialog> */}

          {/* Appearance Settings - Hidden for now */}
          {/* <Dialog open={appearanceModalOpen} onOpenChange={setAppearanceModalOpen}>
            <Tooltip>
              <TooltipTrigger asChild>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="icon" aria-label="Appearance settings">
                    <Type className="size-5" />
                  </Button>
                </DialogTrigger>
              </TooltipTrigger>
              <TooltipContent>
                <p>{translate("Appearance")}</p>
              </TooltipContent>
            </Tooltip>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle>{translate("Appearance")}</DialogTitle>
              </DialogHeader>
              <div className="mt-4 space-y-4">
                <p className="text-sm text-muted-foreground">
                  {translate("Customize your reading experience")}
                </p>
              </div>
            </DialogContent>
          </Dialog> */}

          {/* Search - Hidden for now */}
          {/* <Tooltip>
            <TooltipTrigger asChild>
              <LinkWithLocale href="/search">
                <Button variant="ghost" size="icon" aria-label="Search">
                  <Search className="size-5" />
                </Button>
              </LinkWithLocale>
            </TooltipTrigger>
            <TooltipContent>
              <p>{translate("Search")}</p>
            </TooltipContent>
          </Tooltip> */}

          {/* Theme Toggle */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                aria-label="Toggle theme"
              >
                {mounted && isDark ? (
                  <Sun className="size-5" />
                ) : (
                  <Moon className="size-5" />
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{isDark ? translate("Light mode") : translate("Dark mode")}</p>
            </TooltipContent>
          </Tooltip>

          {/* Language Dropdown */}
          <DropdownMenu>
            <Tooltip>
              <TooltipTrigger asChild>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="gap-2 px-2"
                    aria-label="Change language"
                  >
                    <img
                      alt={`Flag for ${locale} locale`}
                      src={`/assets/images/locales/${locale}.svg`}
                      className="h-4 w-6 rounded object-cover"
                    />
                    <span className="hidden text-sm font-medium sm:inline-block">
                      {locale === "en" ? "EN" : "हिं"}
                    </span>
                  </Button>
                </DropdownMenuTrigger>
              </TooltipTrigger>
              <TooltipContent>
                <p>{translate("Language")}</p>
              </TooltipContent>
            </Tooltip>
            <DropdownMenuContent align="end" className="w-36">
              <DropdownMenuItem
                onClick={() => {
                  if (locale !== "en") {
                    document.cookie = "locale=en";
                    const currentPath = window.location.pathname;
                    const newPath = currentPath.endsWith("/hi")
                      ? currentPath.slice(0, -3)
                      : currentPath.replace("/hi/", "/");
                    window.location.href = newPath || "/";
                  }
                }}
                className="flex cursor-pointer items-center gap-2"
              >
                <img
                  alt="English flag"
                  src="/assets/images/locales/en.svg"
                  className="h-4 w-6 rounded object-cover"
                />
                English
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  if (locale !== "hi") {
                    document.cookie = "locale=hi";
                    const currentPath = window.location.pathname;
                    const newPath =
                      currentPath === "/"
                        ? "/hi"
                        : currentPath.endsWith("/")
                          ? `${currentPath}hi`
                          : `${currentPath}/hi`;
                    window.location.href = newPath;
                  }
                }}
                className="flex cursor-pointer items-center gap-2"
              >
                <img
                  alt="Hindi flag"
                  src="/assets/images/locales/hi.svg"
                  className="h-4 w-6 rounded object-cover"
                />
                हिंदी
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Auth Button / User Menu */}
          {!user ? (
            <Button
              onClick={() => setAuthModalOpen(true)}
              className="hidden gap-2 bg-primary text-primary-foreground hover:bg-primary/90 sm:flex"
              size="sm"
            >
              <User className="size-4" />
              {translate("Sign In")}
            </Button>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="gap-2 px-2">
                  {user.user_metadata?.avatar_url ||
                  user.user_metadata?.picture ? (
                    <img
                      src={
                        user.user_metadata.avatar_url ||
                        user.user_metadata.picture
                      }
                      alt="Avatar"
                      className="size-7 rounded-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="flex size-7 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground">
                      {(
                        user.user_metadata?.full_name?.[0] ||
                        user.email?.[0] ||
                        "U"
                      ).toUpperCase()}
                    </div>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="px-2 py-1.5">
                  <p className="text-sm font-medium">
                    {user.user_metadata?.full_name || user.email?.split("@")[0]}
                  </p>
                  <p className="truncate text-xs text-muted-foreground">
                    {user.email}
                  </p>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => signOut()}
                  className="cursor-pointer text-destructive focus:text-destructive"
                >
                  <LogOut className="mr-2 size-4" />
                  {translate("Sign Out")}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>

      {/* Auth Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        translate={translate}
      />
    </header>
  );
}
