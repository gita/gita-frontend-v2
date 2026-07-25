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

      <div className="from-prakash-primary/10 dark:from-nisha-primary/10 absolute inset-0 -z-10 bg-linear-to-b to-transparent dark:to-transparent"></div>

      <div className="relative z-10 container mx-auto max-w-7xl px-4">
        <div className="mx-auto max-w-4xl text-center">
          {badge && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="bg-prakash-primary/10 dark:bg-nisha-primary/10 mb-4 inline-flex items-center gap-2 rounded-full px-4 py-1.5"
            >
              <Sparkle className="text-prakash-primary dark:text-nisha-primary size-4" />
              <span className="text-prakash-primary dark:text-nisha-primary text-sm font-medium">
                {badge}
              </span>
            </motion.div>
          )}

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-newsreader mb-6 text-4xl leading-tight font-bold md:text-5xl lg:text-6xl"
          >
            {title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className={`font-merriweather text-muted-foreground text-lg md:text-xl lg:text-2xl ${hasButtons ? "mb-8" : ""}`}
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
                  className="bg-prakash-primary hover:bg-prakash-primary/90 dark:bg-nisha-primary dark:hover:bg-nisha-primary/90 text-white"
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
