"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { Feather } from "lucide-react";
import Image from "next/image";

import { Card, CardContent } from "@/components/ui/card";
import { SectionHeader } from "@/components/ui/section-header";

interface Author {
  name: string;
  role: string;
  description: string[];
  icon?: ReactNode;
  imageSrc?: string;
}

interface SacredAuthorsSectionProps {
  subtitle: string;
  title: string;
  authors: Author[];
  className?: string;
}

export function SacredAuthorsSection({
  subtitle,
  title,
  authors,
  className = "",
}: SacredAuthorsSectionProps) {
  return (
    <section
      className={`bg-adhyayan-bg py-16 dark:bg-nisha-bg/50 md:py-20 ${className}`}
    >
      <div className="container mx-auto max-w-7xl px-4">
        <SectionHeader
          subtitle={subtitle}
          title={title}
          icon={<Feather className="size-5" />}
          align="center"
        />

        <div className="grid gap-8 md:grid-cols-2">
          {authors.map((author, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Card className="group h-full overflow-hidden border-2 transition-all hover:border-prakash-primary hover:shadow-lg dark:hover:border-nisha-primary">
                {author.imageSrc && (
                  <div className="relative h-56 overflow-hidden">
                    <Image
                      src={author.imageSrc}
                      alt={author.name}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-4 left-6 text-white">
                      <h3 className="font-newsreader mb-1 text-2xl font-bold">
                        {author.name}
                      </h3>
                      <p className="text-sm font-medium uppercase tracking-wide opacity-90">
                        {author.role}
                      </p>
                    </div>
                  </div>
                )}
                <CardContent className="p-6">
                  {!author.imageSrc && (
                    <div className="mb-4 flex items-start gap-4">
                      <div className="flex size-16 shrink-0 items-center justify-center rounded-full bg-prakash-primary/10 text-prakash-primary dark:bg-nisha-primary/10 dark:text-nisha-primary">
                        {author.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-newsreader mb-1 text-2xl font-bold">
                          {author.name}
                        </h3>
                        <p className="text-sm font-medium uppercase tracking-wide text-prakash-primary dark:text-nisha-primary">
                          {author.role}
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="space-y-3">
                    {author.description.map((para, idx) => (
                      <p
                        key={idx}
                        className="font-merriweather leading-relaxed text-muted-foreground"
                      >
                        {para}
                      </p>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
