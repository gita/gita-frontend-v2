import { ReactNode } from "react";
import { BookOpen } from "lucide-react";

import { SectionHeader } from "@/components/ui/section-header";

interface VisionSectionProps {
  subtitle: string;
  title: string;
  content: Array<string | ReactNode>;
  blockquote?: string;
  imageUrl?: string;
  className?: string;
}

export function VisionSection({
  subtitle,
  title,
  content,
  blockquote,
  imageUrl = "/about-gita.png",
  className = "",
}: VisionSectionProps) {
  return (
    <section className={`py-16 md:py-20 ${className}`}>
      <div className="container mx-auto max-w-7xl px-4">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div>
            <SectionHeader
              subtitle={subtitle}
              title={title}
              icon={<BookOpen className="size-5" />}
            />

            <div className="font-merriweather text-muted-foreground space-y-6">
              {content.map((paragraph, index) => (
                <p key={index} className="text-lg leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          {blockquote && (
            <div className="relative h-[500px] overflow-hidden rounded-2xl">
              <div className="from-prakash-primary/70 to-prakash-primary/90 dark:from-nisha-primary/70 dark:to-nisha-primary/90 absolute inset-0 bg-linear-to-r mix-blend-multiply"></div>
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${imageUrl})` }}
              ></div>
              <div className="absolute inset-0 bg-black/30 dark:bg-black/40"></div>
              <div className="relative flex h-full flex-col items-center justify-center p-8 text-center">
                <blockquote className="max-w-xs text-white">
                  <p className="font-newsreader mb-5 text-2xl italic">
                    {blockquote}
                  </p>
                </blockquote>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
