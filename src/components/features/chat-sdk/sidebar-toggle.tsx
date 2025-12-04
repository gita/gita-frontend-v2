"use client";

import { useEffect, useState } from "react";
import { Menu } from "lucide-react";

import { Sidebar } from "./sidebar";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

export function SidebarToggle() {
  // Prevent hydration mismatch by delaying Sheet render until client
  // Radix UI generates different aria-controls IDs on server vs client
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Render placeholder button during SSR to avoid layout shift
  if (!mounted) {
    return (
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden"
        aria-label="Toggle sidebar"
      >
        <Menu className="size-5" />
      </Button>
    );
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          aria-label="Toggle sidebar"
        >
          <Menu className="size-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-64 p-0">
        {/* Visually hidden title for accessibility */}
        <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
        <Sidebar />
      </SheetContent>
    </Sheet>
  );
}

