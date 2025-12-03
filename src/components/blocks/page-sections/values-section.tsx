import { ReactNode } from "react";
import { Sparkles } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SectionHeader } from "@/components/ui/section-header";

interface Value {
  icon: ReactNode;
  title: string;
  description: string;
}

interface ValuesSectionProps {
  subtitle: string;
  title: string;
  description?: string;
  values: Value[];
  className?: string;
}

export function ValuesSection({
  subtitle,
  title,
  description,
  values,
  className = "",
}: ValuesSectionProps) {
  return (
    <section
      className={`bg-adhyayan-bg py-16 dark:bg-nisha-bg/50 md:py-20 ${className}`}
    >
      <div className="container mx-auto max-w-7xl px-4">
        <SectionHeader
          subtitle={subtitle}
          title={title}
          description={description}
          icon={<Sparkles className="size-5" />}
          className="text-center"
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((value, index) => (
            <Card key={index} className="transition-shadow hover:shadow-lg">
              <CardHeader>
                <div className="mb-4 flex size-12 items-center justify-center rounded-lg bg-prakash-primary/10 text-prakash-primary dark:bg-nisha-primary/10 dark:text-nisha-primary">
                  {value.icon}
                </div>
                <CardTitle className="font-newsreader text-xl">
                  {value.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-merriweather text-muted-foreground">
                  {value.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
