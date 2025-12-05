"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { Check, Copy } from "lucide-react";
import Image from "next/image";
import remarkGfm from "remark-gfm";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface MessageProps {
  role: "user" | "assistant";
  content: string;
  isLoading?: boolean;
}

export function Message({ role, content, isLoading }: MessageProps) {
  const isUser = role === "user";
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <TooltipProvider delayDuration={0}>
      <div className="mx-auto w-full max-w-3xl p-4">
        {isUser ? (
          // User message - right aligned with background
          <div className="flex justify-end">
            <div className="max-w-[85%] rounded-3xl bg-muted px-5 py-3">
              <p className="whitespace-pre-wrap text-[15px]">{content}</p>
            </div>
          </div>
        ) : (
          // Assistant message - with Krishna avatar
          <div className="group flex gap-3">
            {/* Krishna Avatar */}
            <div className="size-8 shrink-0 overflow-hidden rounded-full bg-muted">
              <Image
                src="/art/bg_krishnaji_portrait.webp"
                alt="Krishna"
                width={32}
                height={32}
                className="size-full object-cover"
              />
            </div>

            <div className="flex-1 space-y-3">
              {isLoading ? (
                <div className="flex items-center gap-1.5 py-2">
                  <div className="size-2 animate-bounce rounded-full bg-muted-foreground/50 [animation-delay:-0.3s]" />
                  <div className="size-2 animate-bounce rounded-full bg-muted-foreground/50 [animation-delay:-0.15s]" />
                  <div className="size-2 animate-bounce rounded-full bg-muted-foreground/50" />
                </div>
              ) : (
                <>
                  <div className="prose prose-neutral max-w-none text-[15px] dark:prose-invert">
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      components={{
                        // Paragraphs
                        p: ({ children }) => (
                          <p className="mb-4 leading-7 last:mb-0">{children}</p>
                        ),
                        // Style blockquotes for Sanskrit verses
                        blockquote: ({ children }) => (
                          <blockquote className="my-4 border-l-4 border-primary/50 bg-muted/30 py-2 pl-4 italic">
                            {children}
                          </blockquote>
                        ),
                        // Style code blocks
                        code: ({
                          node,
                          className,
                          children,
                          ...props
                        }: any) => {
                          const isInline = !className?.includes("language-");
                          return isInline ? (
                            <code
                              className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm"
                              {...props}
                            >
                              {children}
                            </code>
                          ) : (
                            <code
                              className="block overflow-x-auto rounded-lg bg-muted p-4 font-mono text-sm"
                              {...props}
                            >
                              {children}
                            </code>
                          );
                        },
                        // Style lists
                        ul: ({ children }) => (
                          <ul className="my-4 list-disc space-y-2 pl-6">
                            {children}
                          </ul>
                        ),
                        ol: ({ children }) => (
                          <ol className="my-4 list-decimal space-y-2 pl-6">
                            {children}
                          </ol>
                        ),
                        // Style headings
                        h1: ({ children }) => (
                          <h1 className="mb-3 mt-6 text-xl font-semibold">
                            {children}
                          </h1>
                        ),
                        h2: ({ children }) => (
                          <h2 className="mb-2 mt-5 text-lg font-semibold">
                            {children}
                          </h2>
                        ),
                        h3: ({ children }) => (
                          <h3 className="mb-2 mt-4 text-base font-semibold">
                            {children}
                          </h3>
                        ),
                        // Style strong/bold
                        strong: ({ children }) => (
                          <strong className="font-semibold">{children}</strong>
                        ),
                      }}
                    >
                      {content}
                    </ReactMarkdown>
                  </div>

                  {/* Copy button - subtle, appears on hover */}
                  <div className="flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={handleCopy}
                          className="size-8 text-muted-foreground hover:bg-muted hover:text-foreground"
                        >
                          {copied ? (
                            <Check className="size-4 text-green-500" />
                          ) : (
                            <Copy className="size-4" />
                          )}
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{copied ? "Copied!" : "Copy message"}</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </TooltipProvider>
  );
}
