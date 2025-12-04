"use client";

import { Menu } from "lucide-react";

import { Sidebar } from "./sidebar";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle,SheetTrigger } from "@/components/ui/sheet";

export function SidebarToggle() {
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

