"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SectionHeader } from "@/components/ui/section-header";

interface Character {
  name: string;
  icon: ReactNode;
  role: string;
  description: string[];
  imageSrc?: string;
  highlight?: string;
}

interface EnhancedCharacterSectionProps {
  subtitle: string;
  title: string;
  characters: Character[];
  ctaText: string;
  ctaLink: string;
  locale?: string;
  className?: string;
}

export function EnhancedCharacterSection({
  subtitle,
  title,
  characters,
  ctaText,
  ctaLink,
  locale = "en",
  className = "",
}: EnhancedCharacterSectionProps) {
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
          icon={<Users className="size-5" />}
          align="center"
        />

        <div className="mb-8 grid gap-6 md:grid-cols-3">
          {characters.map((character, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <Card className="group h-full overflow-hidden border-2 transition-all hover:border-prakash-primary hover:shadow-xl dark:hover:border-nisha-primary">
                {character.imageSrc && (
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={character.imageSrc}
                      alt={character.name}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                    <div className="absolute bottom-3 left-4 text-white">
                      <h3 className="font-newsreader text-xl font-bold drop-shadow-lg">
                        {character.name}
                      </h3>
                      <p className="text-sm opacity-90 drop-shadow-md">
                        {character.role}
                      </p>
                    </div>
                  </div>
                )}
                {!character.imageSrc && (
                  <div className="bg-gradient-to-br from-prakash-primary/10 to-prakash-primary/5 p-6 dark:from-nisha-primary/10 dark:to-nisha-primary/5">
                    <div className="flex items-center gap-3">
                      <motion.div
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                        className="flex size-14 items-center justify-center rounded-full bg-prakash-primary/20 text-prakash-primary dark:bg-nisha-primary/20 dark:text-nisha-primary"
                      >
                        {character.icon}
                      </motion.div>
                      <div>
                        <h3 className="font-newsreader text-xl font-bold">
                          {character.name}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {character.role}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
                <CardContent className="p-6">
                  <div className="font-merriweather space-y-4 text-base leading-relaxed text-muted-foreground">
                    {character.description.map((para, idx) => (
                      <p key={idx}>{para}</p>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center"
        >
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-2 hover:border-prakash-primary hover:bg-prakash-primary/10 dark:hover:border-nisha-primary dark:hover:bg-nisha-primary/10"
          >
            <Link href={localizedLink(ctaLink)}>
              {ctaText}
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

