"use client";

import { useEffect, useState } from "react";
import { Bookmark, BookOpen, MessageSquare, NotebookPen, Sparkles } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface WelcomeModalProps {
  onSignUp: () => void;
}

const WELCOME_MODAL_KEY = "gitagpt_welcome_shown";

export function WelcomeModal({ onSignUp }: WelcomeModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Check if modal has been shown before
    const hasSeenWelcome = localStorage.getItem(WELCOME_MODAL_KEY);
    if (!hasSeenWelcome) {
      // Show modal after a short delay for better UX
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = (openModal: boolean) => {
    if (!openModal) {
      // Mark as seen when user closes the modal
      localStorage.setItem(WELCOME_MODAL_KEY, "true");
      setIsOpen(false);
    }
  };

  const handleSignUp = () => {
    localStorage.setItem(WELCOME_MODAL_KEY, "true");
    setIsOpen(false);
    onSignUp();
  };

  const handleMaybeLater = () => {
    localStorage.setItem(WELCOME_MODAL_KEY, "true");
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md sm:max-w-md">
        <DialogHeader className="text-center">
          <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-primary">
            <Sparkles className="size-8 text-white" />
          </div>
          <DialogTitle className="text-center text-2xl font-bold">
            Try GitaGPT, Free
          </DialogTitle>
          <DialogDescription className="text-center text-sm">
            Sign up to save conversations and access more features
          </DialogDescription>
        </DialogHeader>

        {/* Benefits - Simple List */}
        <div className="space-y-2 py-4">
          <div className="flex items-center gap-3">
            <MessageSquare className="size-5 text-primary" />
            <span className="text-sm">Unlimited messages & saved chats</span>
          </div>
          <div className="flex items-center gap-3">
            <BookOpen className="size-5 text-primary" />
            <span className="text-sm">Full Gita access with commentaries</span>
          </div>
          <div className="flex items-center gap-3">
            <Bookmark className="size-5 text-primary" />
            <span className="text-sm">Bookmarks & personal highlights</span>
          </div>
          <div className="flex items-center gap-3">
            <NotebookPen className="size-5 text-primary" />
            <span className="text-sm">Take notes on verses</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-2">
          <Button
            onClick={handleSignUp}
            className="w-full bg-primary hover:bg-primary/90"
            size="lg"
          >
            Sign Up
          </Button>
          <Button
            onClick={handleMaybeLater}
            variant="ghost"
            className="w-full"
          >
            Maybe later
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

