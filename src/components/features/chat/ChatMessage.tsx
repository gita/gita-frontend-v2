"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface ChatMessageProps {
  role: "user" | "assistant";
  content: string;
  isLoading?: boolean;
}

export function ChatMessage({ role, content, isLoading }: ChatMessageProps) {
  const isAssistant = role === "assistant";

  return (
    <div
      className={cn(
        "flex gap-3 px-4 py-6",
        isAssistant ? "bg-muted/50" : "bg-background",
      )}
    >
      <Avatar className="size-8 shrink-0">
        {isAssistant ? (
          <>
            <AvatarImage src="/images/krishna-avatar.png" alt="Krishna" />
            <AvatarFallback className="bg-primary text-xs text-primary-foreground">
              🙏
            </AvatarFallback>
          </>
        ) : (
          <>
            <AvatarFallback className="bg-secondary text-xs text-secondary-foreground">
              You
            </AvatarFallback>
          </>
        )}
      </Avatar>

      <div className="flex-1 space-y-2 overflow-hidden">
        <p className="text-sm font-medium text-muted-foreground">
          {isAssistant ? "Krishna" : "You"}
        </p>

        <div className="prose prose-sm max-w-none dark:prose-invert prose-headings:font-semibold prose-p:leading-relaxed prose-pre:bg-muted prose-ul:my-2 prose-li:my-1">
          {isLoading && !content ? (
            <div className="flex items-center gap-1">
              <span className="size-2 animate-bounce rounded-full bg-primary [animation-delay:-0.3s]" />
              <span className="size-2 animate-bounce rounded-full bg-primary [animation-delay:-0.15s]" />
              <span className="size-2 animate-bounce rounded-full bg-primary" />
            </div>
          ) : (
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                // Ensure paragraphs render properly
                p: ({ children }) => <p className="mb-2">{children}</p>,
                // Ensure strong/bold renders
                strong: ({ children }) => (
                  <strong className="font-semibold">{children}</strong>
                ),
                // Ensure list items render properly
                ul: ({ children }) => (
                  <ul className="my-2 list-disc space-y-1 pl-5">{children}</ul>
                ),
                li: ({ children }) => <li className="ml-2">{children}</li>,
                // Style code blocks
                code: ({ className, children, ...props }) => {
                  const match = /language-(\w+)/.exec(className || "");
                  const isInline = !match;

                  if (isInline) {
                    return (
                      <code
                        className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm"
                        {...props}
                      >
                        {children}
                      </code>
                    );
                  }

                  return (
                    <pre className="overflow-x-auto rounded-lg bg-muted p-4">
                      <code className={className} {...props}>
                        {children}
                      </code>
                    </pre>
                  );
                },
                // Style blockquotes for Sanskrit verses
                blockquote: ({ children }) => (
                  <blockquote className="border-l-4 border-primary/50 bg-primary/5 py-2 pl-4 italic">
                    {children}
                  </blockquote>
                ),
                // Style links
                a: ({ href, children }) => (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary underline hover:no-underline"
                  >
                    {children}
                  </a>
                ),
              }}
            >
              {content}
            </ReactMarkdown>
          )}
        </div>
      </div>
    </div>
  );
}
