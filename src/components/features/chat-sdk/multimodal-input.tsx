"use client";

import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import { ArrowUp, Square } from "lucide-react";

import { Button } from "@/components/ui/button";

interface MultimodalInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onStop: () => void;
  isLoading: boolean;
  disabled?: boolean;
  placeholder?: string;
}

export interface MultimodalInputRef {
  focus: () => void;
}

export const MultimodalInput = forwardRef<
  MultimodalInputRef,
  MultimodalInputProps
>(function MultimodalInput(
  {
    value,
    onChange,
    onSubmit,
    onStop,
    isLoading,
    disabled,
    placeholder = "Ask Krishna a question...",
  },
  ref,
) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Expose focus method to parent component
  useImperativeHandle(ref, () => ({
    focus: () => {
      textareaRef.current?.focus();
    },
  }));

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [value]);

  // Auto-focus when component mounts (initial page load)
  useEffect(() => {
    textareaRef.current?.focus();
  }, []);

  // Auto-focus when loading completes (AI response done)
  useEffect(() => {
    if (!isLoading && !disabled) {
      // Small delay to ensure DOM is ready
      setTimeout(() => {
        textareaRef.current?.focus();
      }, 100);
    }
  }, [isLoading, disabled]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
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
    <form onSubmit={onSubmit} className="relative w-full">
      <div className="relative flex min-h-12 items-center gap-2 rounded-3xl border border-border bg-background px-4 shadow-sm transition-all focus-within:border-primary focus-within:shadow-md">
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          rows={1}
          className="max-h-52 flex-1 resize-none bg-transparent py-3.5 text-base outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed"
        />

        {/* Submit/Stop Button */}
        {isLoading ? (
          <Button
            type="button"
            size="icon"
            onClick={onStop}
            className="size-8 shrink-0 rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <Square className="size-3.5 fill-current" />
          </Button>
        ) : (
          <Button
            type="submit"
            size="icon"
            disabled={!value.trim() || disabled}
            className="size-8 shrink-0 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 disabled:bg-primary/30 disabled:text-primary-foreground/50"
          >
            <ArrowUp className="size-4" />
          </Button>
        )}
      </div>
    </form>
  );
});
