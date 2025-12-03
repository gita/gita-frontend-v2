"use client";

import { useState } from "react";
import { BookOpen } from "lucide-react";

import LinkWithLocale from "components/LinkWithLocale";
import { useAuth } from "lib/auth/AuthProvider";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  translate: Translate;
}

export function AuthModal({ isOpen, onClose, translate }: AuthModalProps) {
  const { signInWithGoogle, signInWithApple, isLoading } = useAuth();
  const [loadingProvider, setLoadingProvider] = useState<
    "google" | "apple" | null
  >(null);

  const handleGoogleSignIn = async () => {
    setLoadingProvider("google");
    await signInWithGoogle();
  };

  const handleAppleSignIn = async () => {
    setLoadingProvider("apple");
    await signInWithApple();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="mx-4 border-border bg-background sm:mx-0 sm:max-w-md">
        <DialogHeader className="space-y-3 text-center">
          <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-primary/10">
            <BookOpen className="size-8 text-primary" />
          </div>
          <DialogTitle className="text-center text-2xl font-bold">
            {translate("Welcome to Bhagavad Gita")}
          </DialogTitle>
          <DialogDescription className="text-center text-base">
            {translate(
              "Sign in to access Gita AI chatbot, save your notes, bookmarks, and reading progress",
            )}
          </DialogDescription>
        </DialogHeader>

        {/* Sign In Options */}
        <div className="mt-6 space-y-3">
          {/* Google Sign In */}
          <Button
            onClick={handleGoogleSignIn}
            disabled={isLoading}
            variant="outline"
            size="lg"
            className="w-full justify-center gap-3"
          >
            {loadingProvider === "google" ? (
              <LoadingSpinner />
            ) : (
              <>
                <GoogleIcon />
                <span className="text-center">
                  {translate("Continue with Google")}
                </span>
              </>
            )}
          </Button>

          {/* Apple Sign In */}
          <Button
            onClick={handleAppleSignIn}
            disabled={isLoading}
            variant="outline"
            size="lg"
            className="w-full justify-center gap-3"
          >
            {loadingProvider === "apple" ? (
              <LoadingSpinner />
            ) : (
              <>
                <AppleIcon />
                <span className="text-center">
                  {translate("Continue with Apple")}
                </span>
              </>
            )}
          </Button>
        </div>

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-center text-muted-foreground">
              {translate("Secure authentication")}
            </span>
          </div>
        </div>

        {/* Footer Note */}
        <p className="px-2 text-center text-xs text-muted-foreground">
          {translate("By signing in, you agree to our")}{" "}
          <LinkWithLocale
            href="/terms-of-service"
            className="text-primary underline-offset-4 hover:underline"
          >
            {translate("Terms of Service")}
          </LinkWithLocale>{" "}
          {translate("and")}{" "}
          <LinkWithLocale
            href="/privacy-policy"
            className="text-primary underline-offset-4 hover:underline"
          >
            {translate("Privacy Policy")}
          </LinkWithLocale>
        </p>
      </DialogContent>
    </Dialog>
  );
}

function GoogleIcon() {
  return (
    <svg className="size-5" viewBox="0 0 24 24">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  );
}

function AppleIcon() {
  return (
    <svg className="size-5 fill-current" viewBox="0 0 24 24">
      <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
    </svg>
  );
}

function LoadingSpinner({ className }: { className?: string }) {
  return (
    <svg
      className={cn("size-5 animate-spin", className)}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
}
