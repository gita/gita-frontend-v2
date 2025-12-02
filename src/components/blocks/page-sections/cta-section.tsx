"use client";

import { motion } from "framer-motion";
import Link from "next/link";

import { VedicPattern } from "../decorative";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface CTASectionProps {
  title: string;
  description: string;
  primaryButtonText?: string;
  primaryButtonLink?: string;
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
  locale?: string;
  className?: string;
}

export function CTASection({
  title,
  description,
  primaryButtonText,
  primaryButtonLink,
  secondaryButtonText,
  secondaryButtonLink,
  locale = "en",
  className = "",
}: CTASectionProps) {
  const localizedLink = (path: string) => {
    if (locale === "en") return path;
    return `/${locale}${path.startsWith("/") ? path : "/" + path}`;
  };

  const hasButtons = primaryButtonText || secondaryButtonText;

  return (
    <section className={`py-16 md:py-20 ${className}`}>
      <div className="container mx-auto max-w-5xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Card className="relative overflow-hidden border-2 bg-gradient-to-br from-white via-prakash-primary/5 to-prakash-primary/10 shadow-xl dark:from-card dark:via-nisha-primary/5 dark:to-nisha-primary/10">
            {/* Decorative pattern in background */}
            <div className="pointer-events-none absolute right-0 top-0 opacity-10">
              <VedicPattern variant="mandala" size={250} opacity={0.4} animate={false} />
            </div>
            
            <CardContent className="relative z-10 p-8 text-center md:p-12">
              <h2 className="font-newsreader mb-4 text-2xl font-bold md:text-3xl lg:text-4xl">
            {title}
          </h2>

              <p className={`font-merriweather mx-auto max-w-2xl text-lg text-muted-foreground ${hasButtons ? 'mb-8' : ''}`}>
            {description}
          </p>

              {hasButtons && (
          <div className="flex flex-col flex-wrap justify-center gap-4 sm:flex-row">
            {primaryButtonText && primaryButtonLink && (
              <Button
                asChild
                size="lg"
                className="w-full bg-prakash-primary text-white hover:bg-prakash-primary/90 dark:bg-nisha-primary dark:hover:bg-nisha-primary/90 sm:w-auto"
              >
                <Link href={localizedLink(primaryButtonLink)}>
                      {primaryButtonText}
                </Link>
              </Button>
            )}

            {secondaryButtonText && secondaryButtonLink && (
              <Button asChild size="lg" variant="outline" className="w-full sm:w-auto">
                <Link href={localizedLink(secondaryButtonLink)}>
                      {secondaryButtonText}
                </Link>
              </Button>
            )}
          </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
