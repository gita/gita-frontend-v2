"use client";

import { motion } from "framer-motion";
import { Sparkle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { VedicPattern } from "../decorative";

import { Button } from "@/components/ui/button";

interface EnhancedHeroProps {
  badge?: string;
  title: string;
  subtitle: string;
  primaryButtonText?: string;
  primaryButtonLink?: string;
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
  locale?: string;
}

export function EnhancedHero({
  badge,
  title,
  subtitle,
  primaryButtonText,
  primaryButtonLink,
  secondaryButtonText,
  secondaryButtonLink,
  locale = "en",
}: EnhancedHeroProps) {
  const localizedLink = (path: string) => {
    if (locale === "en") return path;
    return `/${locale}${path.startsWith("/") ? path : "/" + path}`;
  };

  const hasButtons = primaryButtonText || secondaryButtonText;

  return (
    <section className="relative overflow-hidden py-12 md:py-16 lg:py-20">
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-25">
        <VedicPattern variant="mandala" size={600} opacity={0.6} animate />
      </div>
      
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-prakash-primary/10 to-transparent dark:from-nisha-primary/10 dark:to-transparent"></div>

      <div className="container relative z-10 mx-auto max-w-7xl px-4">
        <div className="mx-auto max-w-4xl text-center">
          {badge && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="mb-4 inline-flex items-center gap-2 rounded-full bg-prakash-primary/10 px-4 py-1.5 dark:bg-nisha-primary/10"
            >
              <Sparkle className="size-4 text-prakash-primary dark:text-nisha-primary" />
              <span className="text-sm font-medium text-prakash-primary dark:text-nisha-primary">
                {badge}
              </span>
            </motion.div>
          )}

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-newsreader mb-6 text-4xl font-bold leading-tight md:text-5xl lg:text-6xl"
          >
            {title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className={`font-merriweather text-lg text-muted-foreground md:text-xl lg:text-2xl ${hasButtons ? 'mb-8' : ''}`}
          >
            {subtitle}
          </motion.p>

          {hasButtons && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap justify-center gap-4"
            >
              {primaryButtonText && primaryButtonLink && (
                <Button
                  asChild
                  size="lg"
                  className="bg-prakash-primary text-white hover:bg-prakash-primary/90 dark:bg-nisha-primary dark:hover:bg-nisha-primary/90"
                >
                  <Link href={localizedLink(primaryButtonLink)}>
                    {primaryButtonText}
                  </Link>
                </Button>
              )}

              {secondaryButtonText && secondaryButtonLink && (
                <Button asChild size="lg" variant="outline">
                  <Link href={localizedLink(secondaryButtonLink)}>
                    {secondaryButtonText}
                  </Link>
                </Button>
              )}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}

