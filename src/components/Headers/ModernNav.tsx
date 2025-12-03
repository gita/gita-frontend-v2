"use client";

import { useEffect, useState } from "react";
import {
  BookOpen,
  ChevronDown,
  LogOut,
  Menu,
  Moon,
  Search,
  Sun,
  User,
} from "lucide-react";
import Link from "next/link";

import { AuthModal } from "components/AuthModal";
import LinkWithLocale from "components/LinkWithLocale";
import { useAuth } from "lib/auth/AuthProvider";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

interface ModernNavProps {
  translate: Translate;
  locale: string;
  chapters: TChapter[];
}

export function ModernNav({ translate, locale, chapters }: ModernNavProps) {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
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
        {/* Left: Logo & Menu */}
        <div className="flex items-center gap-4">
          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="size-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[350px]">
              <nav className="mt-8 flex flex-col gap-4">
                <LinkWithLocale
                  href="/"
                  className="text-lg font-medium transition-colors hover:text-primary"
                >
                  {translate("Home")}
                </LinkWithLocale>
                <LinkWithLocale
                  href="/bhagavad-gita-quotes"
                  className="text-lg font-medium transition-colors hover:text-primary"
                >
                  {translate("Quotes")}
                </LinkWithLocale>
                <LinkWithLocale
                  href="/about"
                  className="text-lg font-medium transition-colors hover:text-primary"
                >
                  {translate("About Gita")}
                </LinkWithLocale>
                <Link
                  href="/gitagpt"
                  className="text-lg font-medium transition-colors hover:text-primary"
                >
                  {translate("Gita AI")}
                </Link>
                <LinkWithLocale
                  href="/donate"
                  className="text-lg font-medium transition-colors hover:text-primary"
                >
                  {translate("Donate")}
                </LinkWithLocale>
                <LinkWithLocale
                  href="/app"
                  className="text-lg font-medium transition-colors hover:text-primary"
                >
                  {translate("App")}
                </LinkWithLocale>

                {/* Auth Section */}
                <div className="mt-4 border-t pt-4">
                  {!user ? (
                    <Button
                      onClick={() => setAuthModalOpen(true)}
                      className="w-full gap-2"
                    >
                      <User className="size-4" />
                      {translate("Sign In")}
                    </Button>
                  ) : (
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 rounded-lg bg-muted p-3">
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
                          <p className="truncate font-medium">
                            {user.user_metadata?.full_name ||
                              user.email?.split("@")[0]}
                          </p>
                          <p className="truncate text-sm text-muted-foreground">
                            {user.email}
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        onClick={() => signOut()}
                        className="w-full gap-2"
                      >
                        <LogOut className="size-4" />
                        {translate("Sign Out")}
                      </Button>
                    </div>
                  )}
                </div>
              </nav>
            </SheetContent>
          </Sheet>

          {/* Logo */}
          <LinkWithLocale href="/" className="flex items-center gap-2">
            <BookOpen className="size-6 text-primary" />
            <span className="font-inter text-xl font-bold">
              {translate("Bhagavad Gita")}
            </span>
          </LinkWithLocale>
        </div>

        {/* Center: Desktop Navigation */}
        <nav className="hidden md:flex md:items-center md:gap-6">
          {chapters && chapters.length > 0 && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex h-auto items-center gap-1 p-0 text-sm font-medium transition-colors hover:bg-transparent hover:text-primary"
                >
                  {translate("Chapters")}
                  <ChevronDown className="size-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="max-h-[70vh] w-[600px] overflow-y-auto">
                <div className="grid grid-cols-2 gap-1 p-2">
                  {chapters.map((chapter) => (
                    <DropdownMenuItem key={chapter.id} asChild>
                      <LinkWithLocale
                        href={`/chapter/${chapter.id}`}
                        className="block cursor-pointer p-3"
                      >
                        <div>
                          <div className="font-semibold text-primary">
                            {translate("Chapter")} {chapter.chapter_number}
                          </div>
                          <div className="text-sm text-foreground">
                            {chapter.name_translated}
                          </div>
                        </div>
                      </LinkWithLocale>
                    </DropdownMenuItem>
                  ))}
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          <LinkWithLocale
            href="/bhagavad-gita-quotes"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            {translate("Quotes")}
          </LinkWithLocale>
          <LinkWithLocale
            href="/about"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            {translate("About Gita")}
          </LinkWithLocale>
          <Link
            href="/gitagpt"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            {translate("Gita AI")}
          </Link>
          <LinkWithLocale
            href="/donate"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            {translate("Donate")}
          </LinkWithLocale>
        </nav>

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          <LinkWithLocale href="/search">
            <Button variant="ghost" size="icon" aria-label="Search">
              <Search className="size-5" />
            </Button>
          </LinkWithLocale>

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

          {/* Language Dropdown */}
          <DropdownMenu>
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
                <span className="text-sm font-medium">
                  {locale === "en" ? "EN" : "हिं"}
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-36">
              <DropdownMenuItem
                onClick={() => {
                  if (locale !== "en") {
                    document.cookie = "locale=en";
                    // Remove /hi from the end of the path
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
                    // Append /hi to the end of the path (not beginning)
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
                  <ChevronDown className="hidden size-4 sm:block" />
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
