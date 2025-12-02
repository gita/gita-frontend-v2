import { ReactNode } from "react";
import { Target } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/ui/section-header";

interface ListItem {
  icon: ReactNode;
  text: string;
}

interface MissionSectionProps {
  subtitle: string;
  title: string;
  content: Array<string | ReactNode>;
  listItems?: ListItem[];
  blockquote?: string;
  blockquoteFooter?: string;
  linkText?: string;
  linkHref?: string;
  locale?: string;
  className?: string;
}

export function MissionSection({
  subtitle,
  title,
  content,
  listItems,
  blockquote,
  blockquoteFooter,
  linkText,
  linkHref,
  locale = "en",
  className = "",
}: MissionSectionProps) {
  const localizedLink = (path: string) => {
    if (locale === "en") return path;
    return `/${locale}${path.startsWith("/") ? path : "/" + path}`;
  };

  return (
    <section className={`py-16 md:py-20 ${className}`}>
      <div className="container mx-auto max-w-7xl px-4">
        <SectionHeader
          subtitle={subtitle}
          title={title}
          icon={<Target className="size-5" />}
        />

        <div className="grid gap-12 md:grid-cols-2">
          <div className="font-merriweather space-y-6 text-muted-foreground">
            {content.map((paragraph, index) => (
              <p key={index} className="text-lg leading-relaxed">
                {paragraph}
              </p>
            ))}

            {listItems && listItems.length > 0 && (
              <ul className="mt-6 space-y-3">
                {listItems.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="mt-1 flex size-6 shrink-0 items-center justify-center rounded-full bg-prakash-primary/10 text-prakash-primary dark:bg-nisha-primary/10 dark:text-nisha-primary">
                      {item.icon}
                    </span>
                    <span className="text-base">{item.text}</span>
                  </li>
                ))}
              </ul>
            )}

            {linkText && linkHref && (
              <Button
                asChild
                className="mt-6 bg-prakash-primary hover:bg-prakash-primary/90 dark:bg-nisha-primary dark:hover:bg-nisha-primary/90"
              >
                <Link href={localizedLink(linkHref)}>{linkText}</Link>
              </Button>
            )}
          </div>

          {blockquote && (
            <div className="flex items-center">
              <div className="rounded-2xl border-l-4 border-prakash-primary bg-card p-8 dark:border-nisha-primary">
                <blockquote className="font-newsreader text-2xl italic leading-relaxed">
                  {blockquote}
                </blockquote>
                {blockquoteFooter && (
                  <footer className="font-merriweather mt-4 text-sm text-muted-foreground">
                    {blockquoteFooter}
                  </footer>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

