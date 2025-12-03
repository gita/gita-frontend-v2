"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Expand } from "lucide-react";
import Image from "next/image";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

interface EnhancedCharacterCardProps {
  character: {
    name: string;
    sanskritName?: string;
    role: string;
    side: "divine" | "pandava" | "kaurava" | "neutral";
    icon: React.ReactNode;
    imageSrc?: string;
    description: string;
    significance: string;
    keyFacts: string[];
  };
  sideBadge: React.ReactNode;
  labels: {
    significance: string;
    keyFacts: string;
  };
  locale?: string;
}

export function EnhancedCharacterCard({
  character,
  sideBadge,
  labels,
  locale = "en",
}: EnhancedCharacterCardProps) {
  const [isImageOpen, setIsImageOpen] = useState(false);

  // Show Sanskrit name for Hindi, English name for English
  const displayName =
    locale === "hi" && character.sanskritName
      ? character.sanskritName
      : character.name;

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.4 }}
        className="flex h-full"
      >
        <Card className="group flex h-full flex-col overflow-hidden border-muted/40 shadow-md transition-all duration-300 hover:border-muted/60 hover:shadow-2xl">
          {/* Character Image Header */}
          {character.imageSrc && (
            <div className="relative h-64 w-full shrink-0 cursor-pointer overflow-hidden bg-gradient-to-br from-prakash-primary/10 to-prakash-primary/5 dark:from-nisha-primary/10 dark:to-nisha-primary/5">
              <Image
                src={character.imageSrc}
                alt={character.name}
                fill
                className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                style={{ objectPosition: "center 20%" }}
              />
              {/* Badge on Image */}
              <div className="absolute right-4 top-4 z-10">{sideBadge}</div>

              {/* Expand Icon - Clickable */}
              <button
                onClick={() => setIsImageOpen(true)}
                className="absolute right-4 top-16 z-10 rounded-full bg-black/60 p-2.5 text-white opacity-0 backdrop-blur-sm transition-all hover:bg-black/80 group-hover:opacity-100"
                aria-label="View full image"
              >
                <Expand className="size-5" />
              </button>

              {/* Name Overlay - Clickable */}
              <div
                onClick={() => setIsImageOpen(true)}
                className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent px-5 pb-5 pt-10 text-white"
              >
                <CardTitle
                  className={`mb-0 font-bold leading-tight drop-shadow-2xl ${locale === "hi" ? "font-dev text-3xl" : "font-newsreader text-2xl"}`}
                >
                  {displayName}
                </CardTitle>
              </div>
            </div>
          )}

          <CardHeader className="shrink-0 space-y-2 bg-adhyayan-bg pb-5 dark:bg-nisha-bg/50">
            {!character.imageSrc && (
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex size-12 items-center justify-center rounded-lg bg-prakash-primary/10 text-prakash-primary dark:bg-nisha-primary/10 dark:text-nisha-primary">
                    {character.icon}
                  </div>
                  <div>
                    <CardTitle
                      className={
                        locale === "hi"
                          ? "font-dev text-xl"
                          : "font-newsreader text-xl"
                      }
                    >
                      {displayName}
                    </CardTitle>
                  </div>
                </div>
                {sideBadge}
              </div>
            )}
            <CardDescription className="text-[15px] font-semibold leading-tight text-foreground/80">
              {character.role}
            </CardDescription>
          </CardHeader>

          <CardContent className="flex flex-1 flex-col gap-5 p-5 pt-4">
            {/* Main Description */}
            <p className="font-merriweather text-[15px] leading-[1.7] text-muted-foreground">
              {character.description}
            </p>

            {/* Significance Section - Enhanced Visual Hierarchy */}
            <div className="rounded-xl border border-prakash-primary/20 bg-gradient-to-br from-prakash-primary/5 via-prakash-primary/10 to-prakash-primary/5 p-4 shadow-sm dark:border-nisha-primary/20 dark:from-nisha-primary/5 dark:via-nisha-primary/10 dark:to-nisha-primary/5">
              <p className="mb-2.5 text-[13px] font-bold uppercase tracking-widest text-prakash-primary dark:text-nisha-primary">
                {labels.significance}
              </p>
              <p className="font-merriweather text-[14px] leading-[1.65] text-foreground/85">
                {character.significance}
              </p>
            </div>

            {/* Key Facts Section - Better Spacing & Readability */}
            <div className="flex-1">
              <p className="mb-3 text-[13px] font-bold uppercase tracking-widest text-foreground/70">
                {labels.keyFacts}
              </p>
              <ul className="space-y-2.5">
                {character.keyFacts.slice(0, 3).map((fact, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2.5 text-[14px] leading-[1.6] text-muted-foreground"
                  >
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-prakash-primary dark:bg-nisha-primary" />
                    <span className="font-merriweather">{fact}</span>
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Full Image Dialog */}
      {character.imageSrc && (
        <Dialog open={isImageOpen} onOpenChange={setIsImageOpen}>
          <DialogContent className="max-h-[95vh] max-w-4xl overflow-hidden p-0 sm:max-h-[90vh]">
            <DialogTitle className="sr-only">
              {character.name} - {character.sanskritName}
            </DialogTitle>
            <div className="relative h-[85vh] w-full overflow-hidden sm:h-[80vh]">
              <Image
                src={character.imageSrc}
                alt={character.name}
                fill
                className="object-contain"
                sizes="90vw"
                priority
              />
              {/* Character Info Overlay at Bottom */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/95 via-black/70 to-transparent p-6">
                <h3
                  className={`mb-1 font-bold text-white drop-shadow-2xl ${locale === "hi" ? "font-dev text-4xl" : "font-newsreader text-3xl"}`}
                >
                  {displayName}
                </h3>
                <p className="mt-2 text-base text-white/90">{character.role}</p>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
