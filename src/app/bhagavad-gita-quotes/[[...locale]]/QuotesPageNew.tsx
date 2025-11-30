"use client";

import Image from "next/image";

import QuotesBanner from "components/QuotesBanner";
import { getTranslate } from "shared/translate";

import { quotes } from "./constants";

export default function QuotesPageNew(props: LocaleAndTranslations) {
  const { translations, locale } = props;
  const translate = getTranslate(translations, locale);

  // Get quotes in the correct language
  const isHindi = locale === "hi";
  const quotesArray = isHindi ? quotes.hi : quotes.en;

  return (
    <div className="min-h-screen dark:bg-dark-bg">
      <QuotesBanner translate={translate} />

      {/* Main Quotes Section */}
      <div className="relative py-16">
        <Image
          src="/bg-verses-fixed.png"
          alt="BG Quotes Background"
          fill
          style={{
            objectFit: "cover",
            objectPosition: "center",
          }}
          className="z-[-1]"
        />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
          {/* SEO Introduction */}
          <div className="mb-10 text-center">
            <p className="mx-auto max-w-3xl text-lg text-gray-600 dark:text-gray-300">
              {translate(
                "100+ inspiring quotes by Lord Krishna on life, karma, dharma & spiritual liberation",
              )}
            </p>
          </div>

          {/* Quotes Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {quotesArray.map((quote, index) => (
              <div
                key={index}
                className="group relative flex rounded-lg border-2 border-gray-200 bg-white p-6 shadow-md transition-all hover:border-my-orange hover:shadow-xl dark:border-gray-700 dark:bg-dark-100"
              >
                {/* Quote Number Badge - Smaller and positioned to not interfere */}
                <div className="absolute -right-2 -top-2 flex size-8 items-center justify-center rounded-full bg-my-orange text-xs font-bold text-white shadow-md">
                  {index + 1}
                </div>

                {/* Quote Text */}
                <blockquote className="pr-4 text-base leading-relaxed text-gray-700 dark:text-gray-300">
                  &quot;{quote}&quot;
                </blockquote>
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="mt-12 rounded-lg border-2 border-my-orange bg-white p-6 text-center shadow-lg dark:bg-dark-100">
            <h3 className="mb-3 text-xl font-bold text-gray-900 dark:text-white">
              {translate("Read Complete Bhagavad Gita")}
            </h3>
            <p className="mb-4 text-gray-600 dark:text-gray-300">
              {translate(
                "700 verses with commentaries from 20+ scholars in Hindi & English",
              )}
            </p>
            <a
              href={locale === "hi" ? "/hi" : "/"}
              className="inline-flex items-center rounded-md bg-my-orange px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-my-orange focus:ring-offset-2"
            >
              {translate("Start Reading")} →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
