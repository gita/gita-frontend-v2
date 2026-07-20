export const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=com.gitainitiative.bhagavadgita";
export const APP_STORE_URL =
  "https://apps.apple.com/us/app/bhagavad-gita-hindi-english/id1602895635";

/**
 * Store figures shown on the page and in SoftwareApplication schema.
 * These come from the live Google Play listing and drift over time, so they
 * need a refresh whenever the listing moves meaningfully. Keep the visible
 * copy and the schema reading from these same constants so the two can never
 * disagree with each other.
 */
export const STORE_STATS = {
  ratingValue: "4.8",
  ratingCount: "1680",
  downloads: "500,000+",
};

export const LANGUAGES = [
  "English",
  "Hindi",
  "Telugu",
  "Tamil",
  "Gujarati",
  "Odia",
  "Spanish",
];

type Faq = { question: string; answer: string };

export function getFaqs(isHindi: boolean): Faq[] {
  if (isHindi) {
    return [
      {
        question: "क्या भगवद गीता ऐप पूरी तरह निःशुल्क है?",
        answer:
          "हाँ। ऐप डाउनलोड करना और उसकी हर सुविधा उपयोग करना निःशुल्क है। कोई विज्ञापन नहीं, कोई सदस्यता नहीं, कोई भुगतान वाला संस्करण नहीं। इसे वेद व्यास फाउंडेशन चलाता और उसका खर्च उठाता है, जो एक गैर-लाभकारी संस्था है।",
      },
      {
        question: "सबसे अच्छा भगवद गीता ऐप कौन सा है?",
        answer:
          "यह इस पर निर्भर करता है कि आपको क्या चाहिए। यदि आप बिना विज्ञापन और बिना किसी शुल्क के पूरी गीता पढ़ना चाहते हैं, तो BhagavadGita.com का ऐप सातों भाषाओं में सभी 18 अध्याय और 700 श्लोक देता है, साथ में संस्कृत पाठ, ऑफ़लाइन पठन और Gita GPT। Google Play पर इसे 1,680 समीक्षाओं से 4.8 रेटिंग मिली है।",
      },
      {
        question: "क्या मैं भगवद गीता ऐप ऑफ़लाइन पढ़ सकता हूँ?",
        answer:
          "हाँ। सभी अध्याय, श्लोक, अनुवाद और भाष्य ऐप के भीतर ही सहेजे रहते हैं, इसलिए बिना इंटरनेट के भी पढ़ सकते हैं। संस्कृत ऑडियो, Gita GPT और आज का श्लोक के लिए इंटरनेट चाहिए।",
      },
      {
        question: "क्या ऐप में भगवद गीता का ऑडियो है?",
        answer:
          "हाँ। हर श्लोक के लिए संस्कृत पाठ उपलब्ध है। पढ़ते समय सुन सकते हैं, या केवल सुनने के लिए बने अलग स्क्रीन का उपयोग कर सकते हैं।",
      },
      {
        question: "क्या भगवद गीता ऐप हिंदी में उपलब्ध है?",
        answer:
          "हाँ। ऐप सात भाषाओं में है: हिंदी, अंग्रेज़ी, तेलुगु, तमिल, गुजराती, ओड़िया और स्पेनिश। भाषा बदलने पर पूरा पाठ और ऐप का इंटरफ़ेस दोनों बदल जाते हैं।",
      },
      {
        question: "ऐप में किसका अनुवाद और भाष्य है?",
        answer:
          "ऐप में स्वामी मुकुंदानंद जी का अनुवाद और भाष्य है, जो उनकी अनुमति से लिया गया है। हर श्लोक के साथ संस्कृत मूल पाठ, लिप्यंतरण और शब्द-अर्थ भी रहते हैं।",
      },
      {
        question: "Gita GPT क्या है?",
        answer:
          "Gita GPT एक AI है जो भगवद गीता पर आधारित प्रश्नों के उत्तर देता है, जैसे ChatGPT पर बात करते हैं। हम इसे शुरू करने वाले पहले लोगों में से थे। यह निःशुल्क है और इसके लिए एक बार निःशुल्क साइन-इन करना होता है।",
      },
      {
        question: "क्या भगवद गीता ऐप Android और iPhone दोनों पर है?",
        answer: "हाँ। ऐप Google Play और App Store दोनों पर निःशुल्क उपलब्ध है।",
      },
      {
        question: "क्या पढ़ने के लिए खाता बनाना ज़रूरी है?",
        answer:
          "नहीं। बिना खाते के भी पढ़ सकते हैं, सुन सकते हैं, बुकमार्क और नोट्स बना सकते हैं। साइन-इन करने पर Gita GPT खुलता है और आपकी प्रगति सहेजी जाती है।",
      },
    ];
  }

  return [
    {
      question: "Is the Bhagavad Gita app completely free?",
      answer:
        "Yes. The app is free to download and every feature inside it is free to use. There are no ads, no subscription, and no paid tier. It is run and funded by Ved Vyas Foundation, a non-profit.",
    },
    {
      question: "What is the best Bhagavad Gita app?",
      answer:
        "It depends on what you want from it. If you want to read the complete Gita without ads and without paying anything, the BhagavadGita.com app gives you all 18 chapters and 700 verses in seven languages, with Sanskrit recitation, offline reading, and Gita GPT. It is rated 4.8 from 1,680 reviews on Google Play, with over 500,000 downloads.",
    },
    {
      question: "Can I use the Bhagavad Gita app offline?",
      answer:
        "Yes. Every chapter, verse, translation, and commentary is stored inside the app, so you can read with no connection at all. Sanskrit audio, Gita GPT, and the verse of the day need internet.",
    },
    {
      question: "Does the Bhagavad Gita app have audio?",
      answer:
        "Yes. Sanskrit recitation is available for every verse. You can play it while reading, or use the separate listening screen if you only want to listen.",
    },
    {
      question: "Is the Bhagavad Gita app available in Hindi?",
      answer:
        "Yes. The app is available in seven languages: Hindi, English, Telugu, Tamil, Gujarati, Odia, and Spanish. Changing the language changes both the scripture text and the app interface.",
    },
    {
      question: "Whose translation and commentary does the app use?",
      answer:
        "The app carries the translation and commentary of Swami Mukundananda, used with his permission. Every verse also shows the original Sanskrit, the transliteration, and word-by-word meanings.",
    },
    {
      question: "What is Gita GPT?",
      answer:
        "Gita GPT answers questions using the Bhagavad Gita, the way you would ask ChatGPT something. We were among the first to build this. It is free, and it asks you to sign in once so your conversations are saved to your account.",
    },
    {
      question: "Is the Bhagavad Gita app on both Android and iPhone?",
      answer: "Yes. The app is free on Google Play and on the App Store.",
    },
    {
      question: "Do I need an account to read the Gita?",
      answer:
        "No. You can read, listen, bookmark, and take notes without an account. Signing in unlocks Gita GPT and saves your reading progress to your account.",
    },
  ];
}

export function getJsonLdOrganization() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://bhagavadgita.com/#organization",
    name: "Bhagavad Gita",
    url: "https://bhagavadgita.com",
    logo: "https://bhagavadgita.com/bhagavadgita.png",
    nonprofitStatus: "NonprofitANBI",
    parentOrganization: {
      "@type": "Organization",
      name: "Ved Vyas Foundation",
    },
  };
}

export function getJsonLdSoftwareApplication(isHindi: boolean) {
  const url = isHindi
    ? "https://bhagavadgita.com/bhagavad-gita-app/hi"
    : "https://bhagavadgita.com/bhagavad-gita-app";

  return {
    "@context": "https://schema.org",
    "@type": "MobileApplication",
    "@id": "https://bhagavadgita.com/bhagavad-gita-app#app",
    name: "Bhagavad Gita",
    alternateName: "Bhagavad Gita Hindi & English",
    url,
    applicationCategory: "BooksApplication",
    operatingSystem: "Android, iOS",
    isAccessibleForFree: true,
    inLanguage: ["en", "hi", "te", "ta", "gu", "or", "es"],
    downloadUrl: [PLAY_STORE_URL, APP_STORE_URL],
    installUrl: [PLAY_STORE_URL, APP_STORE_URL],
    publisher: {
      "@type": "Organization",
      name: "Ved Vyas Foundation",
    },
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: STORE_STATS.ratingValue,
      ratingCount: STORE_STATS.ratingCount,
      bestRating: "5",
      worstRating: "1",
    },
    featureList: [
      "All 18 chapters and 700 verses",
      "Seven languages",
      "Sanskrit recitation for every verse",
      "Gita GPT AI",
      "Offline reading",
      "Bookmarks, notes and highlights",
      "Dark mode and reading controls",
      "Verse of the day",
    ],
    screenshot: [
      "https://bhagavadgita.com/images/app/verse-of-the-day.webp",
      "https://bhagavadgita.com/images/app/commentary.webp",
      "https://bhagavadgita.com/images/app/gita-gpt.webp",
      "https://bhagavadgita.com/images/app/audio.webp",
      "https://bhagavadgita.com/images/app/languages.webp",
      "https://bhagavadgita.com/images/app/chapters-offline.webp",
    ],
  };
}

export function getJsonLdFaq(isHindi: boolean) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: getFaqs(isHindi).map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function getJsonLdBreadcrumb(isHindi: boolean) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        item: {
          "@id": "https://bhagavadgita.com",
          name: isHindi ? "होम" : "Home",
        },
      },
      {
        "@type": "ListItem",
        position: 2,
        item: {
          "@id": isHindi
            ? "https://bhagavadgita.com/bhagavad-gita-app/hi"
            : "https://bhagavadgita.com/bhagavad-gita-app",
          name: isHindi ? "भगवद गीता ऐप" : "Bhagavad Gita App",
        },
      },
    ],
  };
}
