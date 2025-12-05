"use client";

import React, { useState } from "react";

import { ChatHeader } from "@/components/features/chat-sdk/chat-header";
import { Sidebar } from "@/components/features/chat-sdk/sidebar";

export default function GitagptLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Sidebar - always shown unless collapsed */}
      {!sidebarCollapsed && (
        <aside className="hidden md:block md:w-64 md:shrink-0">
          <Sidebar onCollapse={() => setSidebarCollapsed(true)} />
        </aside>
      )}

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <ChatHeader
          showExpandButton={sidebarCollapsed}
          onExpandSidebar={() => setSidebarCollapsed(false)}
        />
        <main className="flex-1 overflow-hidden">{children}</main>
      </div>
    </div>
  );
}
