import { ReactNode } from "react";

import { Card, CardContent } from "@/components/ui/card";

export interface LegalContentSection {
  title: string;
  content: ReactNode;
}

export interface LegalContentPageProps {
  title?: string;
  subtitle?: string;
  lastUpdated?: string;
  sections: LegalContentSection[];
  className?: string;
}

export function LegalContentPage({
  title,
  subtitle,
  lastUpdated,
  sections,
  className = "",
}: LegalContentPageProps): React.ReactNode {
  const hasHeader = title || subtitle || lastUpdated;
  
  return (
    <section className={`relative -mt-4 py-8 md:py-10 ${className}`}>
      <div className="container mx-auto max-w-4xl px-4">
        {hasHeader && (
          <div className="mb-6">
            {title && (
              <h1 className="font-newsreader mb-3 text-3xl font-bold tracking-tight md:text-4xl">
                {title}
              </h1>
            )}
            {subtitle && <p className="mb-2 text-lg text-muted-foreground">{subtitle}</p>}
            {lastUpdated && (
              <p className="mb-8 text-center text-sm text-muted-foreground">
                Last updated: {lastUpdated}
              </p>
            )}
          </div>
        )}

        {!hasHeader && lastUpdated && (
          <p className="mb-8 text-center text-sm text-muted-foreground">
            Last updated: {lastUpdated}
          </p>
        )}

        <Card className="overflow-hidden shadow-lg transition-shadow hover:shadow-xl">
          <CardContent className="p-6 sm:p-8 md:p-10">
            <div className="space-y-8">
              {sections.map((section, index) => (
                <div key={index} className="space-y-4">
                  {section.title && (
                    <h2 className="font-newsreader border-b pb-3 text-xl font-bold text-foreground md:text-2xl">
                      {section.title}
                    </h2>
                  )}
                  <div className="prose font-merriweather dark:prose-invert prose-headings:font-newsreader prose-p:text-foreground/90 max-w-none leading-relaxed">
                    {section.content}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

