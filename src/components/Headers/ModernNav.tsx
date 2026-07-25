"use client";

import { useEffect, useState } from "react";
import {
  ChevronDown,
  LogOut,
  Menu,
  Moon,
  Search,
  Sun,
  User,
} from "lucide-react";
import Image from "next/image";
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
    <header className="bg-background/80 sticky top-0 z-50 w-full border-b backdrop-blur-xs">
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
                  className="hover:text-primary text-lg font-medium transition-colors"
                >
                  {translate("Home")}
                </LinkWithLocale>
                <LinkWithLocale
                  href="/bhagavad-gita-quotes"
                  className="hover:text-primary text-lg font-medium transition-colors"
                >
                  {translate("Quotes")}
                </LinkWithLocale>
                <LinkWithLocale
                  href="/about"
                  className="hover:text-primary text-lg font-medium transition-colors"
                >
                  {translate("About Gita")}
                </LinkWithLocale>
                <Link
                  href="/gitagpt"
                  className="hover:text-primary text-lg font-medium transition-colors"
                >
                  {translate("Gita AI")}
                </Link>
                <LinkWithLocale
                  href="/bhagavad-gita-app"
                  className="hover:text-primary text-lg font-medium transition-colors"
                >
                  {translate("Mobile App")}
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
                      <div className="bg-muted flex items-center gap-3 rounded-lg p-3">
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
                          <div className="bg-primary text-primary-foreground flex size-10 items-center justify-center rounded-full text-sm font-medium">
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
                          <p className="text-muted-foreground truncate text-sm">
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
          <LinkWithLocale href="/" className="flex items-center gap-2.5">
            <Image
              src="/bhagavad-gita.png"
              height={28}
              width={23}
              alt="Bhagavad Gita"
            />
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
                  className="hover:text-primary flex h-auto items-center gap-1 p-0 text-sm font-medium transition-colors hover:bg-transparent"
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
                          <div className="text-primary font-semibold">
                            {translate("Chapter")} {chapter.chapter_number}
                          </div>
                          <div className="text-foreground text-sm">
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
            className="hover:text-primary text-sm font-medium transition-colors"
          >
            {translate("Quotes")}
          </LinkWithLocale>
          <LinkWithLocale
            href="/about"
            className="hover:text-primary text-sm font-medium transition-colors"
          >
            {translate("About Gita")}
          </LinkWithLocale>
          <Link
            href="/gitagpt"
            className="hover:text-primary text-sm font-medium transition-colors"
          >
            {translate("Gita AI")}
          </Link>
          <LinkWithLocale
            href="/bhagavad-gita-app"
            className="hover:text-primary text-sm font-medium whitespace-nowrap transition-colors"
          >
            {translate("App")}
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
              className="bg-primary text-primary-foreground hover:bg-primary/90 hidden gap-2 sm:flex"
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
                    <div className="bg-primary text-primary-foreground flex size-7 items-center justify-center rounded-full text-xs font-medium">
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
                  <p className="text-muted-foreground truncate text-xs">
                    {user.email}
                  </p>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => signOut()}
                  className="text-destructive focus:text-destructive cursor-pointer"
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
        source="nav"
      />
    </header>
  );
}
