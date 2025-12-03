"use client";

import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";
import Image from "next/image";

import { SectionHeader } from "@/components/ui/section-header";

interface WhatIsGitaSectionProps {
  subtitle: string;
  title: string;
  paragraphs: string[];
  imageSrc?: string;
  className?: string;
}

export function WhatIsGitaSection({
  subtitle,
  title,
  paragraphs,
  imageSrc = "/bhagavadgita.png",
  className = "",
}: WhatIsGitaSectionProps) {
  return (
    <section className={`py-16 md:py-20 ${className}`}>
      <div className="container mx-auto max-w-7xl px-4">
        <SectionHeader
          subtitle={subtitle}
          title={title}
          icon={<BookOpen className="size-5" />}
          align="center"
        />

        <div className="grid items-center gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="font-merriweather space-y-6 text-lg leading-relaxed text-muted-foreground"
          >
            {paragraphs.map((para, index) => (
              <p key={index}>{para}</p>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative h-[400px] overflow-hidden rounded-2xl lg:h-[500px]"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-prakash-primary/20 to-transparent dark:from-nisha-primary/20"></div>
            <Image
              src={imageSrc}
              alt="Bhagavad Gita - Krishna and Arjuna"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
