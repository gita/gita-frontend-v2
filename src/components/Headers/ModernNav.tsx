"use client";

import { useEffect, useState } from "react";
import { BookOpen, ChevronDown, Menu, Moon, Search, Sun } from "lucide-react";
import Link from "next/link";

import LinkWithLocale from "components/LinkWithLocale";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
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
        </div>
      </div>
    </header>
  );
}
