import LinkWithLocale from "components/LinkWithLocale";
import { getTranslate } from "shared/translate";

import { getDailyVerse } from "../../lib/getDailyVerse";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

/**
 * Verse of the day, rendered on the server.
 *
 * This used to be a client component that shipped a skeleton in the HTML and
 * then fetched /api/verse-of-the-day from a useEffect. The card sits directly
 * under the hero, so the most prominent thing on the homepage could not appear
 * until the JS had downloaded, React had hydrated, and a round trip had
 * completed. Measured on production: the skeleton was in the HTML on every
 * load and the verse arrived around eleven seconds later.
 *
 * The data is a local JSON lookup, not a network call — the API route it used
 * to hit answered in under a second and simply read the same files. Reading it
 * here puts the verse in the first paint and deletes the skeleton, the loading
 * state and the fetch.
 */
const VerseOfDay = async ({ locale, translations }: LocaleAndTranslations) => {
  const translate = getTranslate(translations, locale);
  const dailyVerse = await getDailyVerse(locale);

  // No verse means the data lookup failed. Render nothing rather than an empty
  // card: a missing section reads as a shorter page, an empty one reads as broken.
  if (!dailyVerse) return null;

  return (
    <div className="relative z-10 mx-auto mt-16 mb-0 max-w-4xl px-4 sm:px-6">
      <Card className="dark:bg-card border-2 bg-white shadow-lg">
        <CardHeader className="pb-4">
          {/* Wording kept byte-for-byte as it renders today. It is not passed
              through translate(), so /hi shows an English heading. That is a
              real bug, but a copy one, and fixing it inside a performance
              change would hide one behind the other. Noted, not touched. */}
          <h2 className="text-primary text-center text-xl font-bold md:text-2xl">
            Shloka of the Day - BG {dailyVerse.chapter_number}.
            {dailyVerse.verse_number}
          </h2>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-foreground/90 text-center text-base leading-relaxed md:text-lg">
            {dailyVerse.gita_translations[0]?.description}
          </p>
          <div className="flex justify-center">
            <Button
              variant="outline"
              asChild
              className="group border-primary text-primary hover:bg-primary hover:text-primary-foreground gap-2 border-2"
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
      </Card>
    </div>
  );
};

export default VerseOfDay;
