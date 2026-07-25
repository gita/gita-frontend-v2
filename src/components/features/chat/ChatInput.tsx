"use client";

import { type FormEvent, type KeyboardEvent, useEffect, useRef } from "react";
import { Send, Square } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  onStop?: () => void;
  isLoading?: boolean;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

export function ChatInput({
  value,
  onChange,
  onSubmit,
  onStop,
  isLoading = false,
  placeholder = "Ask Krishna a question...",
  disabled = false,
  className,
}: ChatInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea based on content
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${Math.min(textarea.scrollHeight, 200)}px`;
    }
  }, [value]);

  // Handle keyboard shortcuts
  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    // Submit on Enter (without Shift)
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (value.trim() && !isLoading && !disabled) {
        const form = e.currentTarget.form;
        if (form) {
          form.requestSubmit();
        }
      }
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      className={cn(
        "bg-background relative flex items-end gap-2 rounded-2xl border p-2 shadow-xs transition-shadow focus-within:shadow-md",
        className,
      )}
    >
      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        disabled={disabled || isLoading}
        rows={1}
        className={cn(
          "placeholder:text-muted-foreground max-h-[200px] min-h-[44px] flex-1 resize-none bg-transparent px-3 py-2.5 text-sm focus:outline-hidden disabled:cursor-not-allowed disabled:opacity-50",
        )}
      />

      {isLoading && onStop ? (
        <Button
          type="button"
          size="icon"
          variant="destructive"
          onClick={onStop}
          className="size-10 shrink-0 rounded-xl"
        >
          <Square className="size-4" />
          <span className="sr-only">Stop generating</span>
        </Button>
      ) : (
        <Button
          type="submit"
          size="icon"
          disabled={!value.trim() || isLoading || disabled}
          className="size-10 shrink-0 rounded-xl"
        >
          <Send className="size-4" />
          <span className="sr-only">Send message</span>
        </Button>
      )}
    </form>
  );
}
