"use client";

import { useEffect, useState } from "react";

import LinkWithLocale from "components/LinkWithLocale";
import { getTranslate } from "shared/translate";

import { Skeleton } from "../Skeleton";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface Props extends LocaleAndTranslations {}

const VerseOfDayClient = ({ locale, translations }: Props) => {
  const [dailyVerse, setDailyVerse] = useState<GitaVerse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const translate = getTranslate(translations, locale);

  useEffect(() => {
    const fetchDailyVerse = async () => {
      try {
        const response = await fetch(`/api/verse-of-the-day?locale=${locale}`);
        if (response.ok) {
          const data = await response.json();
          setDailyVerse(data);
        }
      } catch (error) {
        console.error("Failed to fetch daily verse:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDailyVerse();
  }, [locale]);

  return (
    <div className="relative z-10 mx-auto mb-0 mt-16 max-w-4xl px-4 sm:px-6">
      <Card className="border-2 bg-white shadow-lg dark:bg-card">
        {isLoading ? (
          <CardContent className="py-8">
            <Skeleton height="h-4" width="w-2/12" margin="my-4" />
            <Skeleton height="h-5" width="w-10/12" margin="mb-3" />
            <Skeleton height="h-5" width="w-9/12" margin="mb-4" />
            <Skeleton height="h-5" width="w-1/12" margin="mb-3" />
          </CardContent>
        ) : dailyVerse ? (
          <>
            <CardHeader className="pb-4">
              <h2 className="text-center text-xl font-bold text-primary md:text-2xl">
                Shloka of the Day - BG {dailyVerse?.chapter_number}.
                {dailyVerse?.verse_number}
              </h2>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-center text-base leading-relaxed text-foreground/90 md:text-lg">
                {dailyVerse?.gita_translations[0]?.description}
              </p>
              <div className="flex justify-center">
                <Button
                  variant="outline"
                  asChild
                  className="group gap-2 border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                >
                  <LinkWithLocale
                    href="/verse-of-the-day"
                    shallow
                    aria-label="Explore daily verse of the day and view verse history"
                  >
                    {translate("Explore Daily Verse")}
                    <span
                      className="transition-transform group-hover:translate-x-1"
                      aria-hidden="true"
                    >
                      →
                    </span>
                  </LinkWithLocale>
                </Button>
              </div>
            </CardContent>
          </>
        ) : (
          <CardContent className="py-8">
            <p className="text-center text-muted-foreground">
              {translate("Unable to load verse of the day")}
            </p>
          </CardContent>
        )}
      </Card>
    </div>
  );
};

export default VerseOfDayClient;
