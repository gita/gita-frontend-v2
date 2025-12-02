import { ReactNode } from "react";
import { Users } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SectionHeader } from "@/components/ui/section-header";

interface Character {
  name: string;
  icon: ReactNode;
  role: string;
  description: string[];
}

interface CharacterSectionProps {
  subtitle: string;
  title: string;
  characters: Character[];
  className?: string;
}

export function CharacterSection({
  subtitle,
  title,
  characters,
  className = "",
}: CharacterSectionProps) {
  return (
    <section className={`py-16 md:py-20 ${className}`}>
      <div className="container mx-auto max-w-7xl px-4">
        <SectionHeader
          subtitle={subtitle}
          title={title}
          icon={<Users className="size-5" />}
          className="text-center"
        />

        <div className="grid gap-6 md:grid-cols-2">
          {characters.map((character, index) => (
            <Card
              key={index}
              className="overflow-hidden transition-shadow hover:shadow-lg"
            >
              <CardHeader className="bg-adhyayan-bg dark:bg-nisha-bg/50">
                <div className="flex items-center gap-3">
                  <div className="flex size-12 items-center justify-center rounded-lg bg-prakash-primary/10 text-prakash-primary dark:bg-nisha-primary/10 dark:text-nisha-primary">
                    {character.icon}
                  </div>
                  <div>
                    <CardTitle className="font-newsreader text-xl">
                      {character.name}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">
                      {character.role}
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="font-merriweather space-y-3 text-muted-foreground">
                  {character.description.map((para, idx) => (
                    <p key={idx} className="text-sm leading-relaxed">
                      {para}
                    </p>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

