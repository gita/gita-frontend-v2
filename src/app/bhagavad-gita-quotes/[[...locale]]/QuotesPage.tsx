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

  return (
    <div className="min-h-[900px] md:flex md:min-h-[800px] md:flex-col md:justify-center">
      <QuotesBanner translate={translate} />
      <div className="relative z-10 m-auto w-full">
        <QuotesNavigator
          quoteCount={quotes.length}
          quoteIndex={quoteIndex}
          setQuote={setQuoteIndex}
        />
        <Quote
          quoteNumber={quoteIndex + 1}
          quote={quotes[quoteIndex]}
          translate={translate}
        />
      </div>
    </div>
  );
}
