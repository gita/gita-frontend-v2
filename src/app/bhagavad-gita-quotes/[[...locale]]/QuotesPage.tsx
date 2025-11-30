"use client";

import { useState } from "react";

import Quote from "components/Quotes/Quote";
import QuotesNavigator from "components/Quotes/QuotesNavigator";
import QuotesBanner from "components/QuotesBanner";
import { getTranslate } from "shared/translate";

import { quotes } from "./constants";

export default function QuotesPage(props: LocaleAndTranslations) {
  const { translations, locale } = props;
  const translate = getTranslate(translations, locale);

  const [quoteIndex, setQuoteIndex] = useState(0);

  // Get quotes in the correct language
  const isHindi = locale === "hi";
  const quotesArray = isHindi ? quotes.hi : quotes.en;

  return (
    <div className="min-h-[900px] md:flex md:min-h-[800px] md:flex-col md:justify-center">
      <QuotesBanner translate={translate} />
      <div className="relative z-10 m-auto w-full">
        <QuotesNavigator
          quoteCount={quotesArray.length}
          quoteIndex={quoteIndex}
          setQuote={setQuoteIndex}
        />
        <Quote
          quoteNumber={quoteIndex + 1}
          quote={quotesArray[quoteIndex]}
          translate={translate}
        />
      </div>
    </div>
  );
}
