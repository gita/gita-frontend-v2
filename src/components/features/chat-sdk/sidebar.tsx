"use client";

import { useState } from "react";
import { MessageSquare, PanelLeftClose, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { SidebarFooter } from "./sidebar-footer";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useChatPersistence } from "@/hooks/useChatPersistence";
import { cn } from "@/lib/utils";

interface SidebarProps {
  className?: string;
  onCollapse?: () => void;
}

export function Sidebar({ className, onCollapse }: SidebarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { chats, deleteChat } = useChatPersistence();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Extract current chat ID from pathname
  const currentChatId = pathname?.match(/\/gitagpt\/chat\/([^/]+)/)?.[1];

  const handleNewChat = () => {
    // Just navigate to main page - chat is created when user sends first message
    router.push("/gitagpt");
  };

  const handleDeleteChat = async (chatId: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (confirm("Delete this conversation?")) {
      setDeletingId(chatId);
      try {
        await deleteChat(chatId);
        // If deleting current chat, redirect to main page
        if (currentChatId === chatId) {
          router.push("/gitagpt");
        }
      } finally {
        setDeletingId(null);
      }
    }
  };

  return (
    <TooltipProvider delayDuration={0}>
      <div
        className={cn(
          "bg-sidebar-background flex h-full w-64 flex-col border-r",
          className,
        )}
      >
        {/* Header - Logo + Collapse Button */}
        <div className="flex items-center justify-between p-3">
          <Link href="/" className="flex items-center gap-2.5 hover:opacity-80">
            <Image
              src="/bhagavad-gita.png"
              height={28}
              width={23}
              alt="Bhagavad Gita"
            />
            <span className="text-sidebar-foreground font-bold">
              Bhagavad Gita
            </span>
          </Link>
          {onCollapse && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onCollapse}
                  className="size-9 rounded-lg border text-foreground hover:bg-muted"
                >
                  <PanelLeftClose className="size-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>Close sidebar</p>
              </TooltipContent>
            </Tooltip>
          )}
        </div>

        {/* New Chat Button */}
        <div className="px-3 pb-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={handleNewChat}
                className="w-full justify-start gap-2"
                variant="outline"
              >
                <Plus className="size-4" />
                New Chat
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>Start a new conversation</p>
            </TooltipContent>
          </Tooltip>
        </div>

        {/* Chat List */}
        <ScrollArea className="flex-1 px-2">
          <div className="space-y-1 py-2">
            {chats.length === 0 ? (
              <div className="px-3 py-8 text-center text-sm text-muted-foreground">
                No conversations yet.
                <br />
                Start a new chat!
              </div>
            ) : (
              chats.map((chat) => (
                <Link
                  key={chat.id}
                  href={`/gitagpt/chat/${chat.id}`}
                  className={cn(
                    "hover:bg-sidebar-accent group flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors",
                    currentChatId === chat.id &&
                      "bg-sidebar-accent text-sidebar-primary font-medium",
                  )}
                >
                  <MessageSquare className="size-4 shrink-0" />
                  <span className="flex-1 truncate">{chat.title}</span>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="size-6 opacity-0 transition-opacity group-hover:opacity-100"
                        onClick={(e) => handleDeleteChat(chat.id, e)}
                        disabled={deletingId === chat.id}
                      >
                        <Trash2 className="size-3" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Delete chat</p>
                    </TooltipContent>
                  </Tooltip>
                </Link>
              ))
            )}
          </div>
        </ScrollArea>

        {/* Footer */}
        <SidebarFooter />
      </div>
    </TooltipProvider>
  );
}
