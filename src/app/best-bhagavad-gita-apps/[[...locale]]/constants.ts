/**
 * Data for /best-bhagavad-gita-apps.
 *
 * Every figure here came from Google Play's own SoftwareApplication JSON-LD or
 * Apple's lookup API on the date in VERIFIED_ON, not from a scraped page. The
 * rendered Play page carries ratings from its "similar apps" carousel and
 * scraping those produced a wrong number for our own app during research.
 *
 * Re-pull every figure before changing VERIFIED_ON, and confirm the returned
 * `name` matches the app you meant. Play served a substituted listing at least
 * once during research: same URL, 200 OK, a different app's page.
 */

export const VERIFIED_ON = "2026-07-25";
export const VERIFIED_ON_LABEL = "25 July 2026";

/** Play ratings differ by storefront. Ours is 4.91 in India and 4.78 in the US
 *  off the same 1,688 ratings, so a rating without its storefront is not a fact.
 *  Play displays one decimal; the figures here are its underlying value to two. */
export const STOREFRONT = "Google Play India";

export type App = {
  slug: string;
  name: string;
  developer: string;
  /** Our relationship, shown wherever the app appears. */
  ours?: "published" | "built-for-jkyog";
  playUrl?: string;
  iosUrl?: string;
  rating?: string;
  ratingCount?: string;
  installs?: string;
  price: string;
  ads: string;
  languages: string;
  attribution: string;
  /** The single most useful thing about it. */
  verdict: string;
  forWhom: string;
  notForWhom: string;
  pros: string[];
  cons: string[];
};

export const APPS: App[] = [
  {
    slug: "bhagavadgita-com",
    name: "Bhagavad Gita Hindi & English",
    developer: "Ved Vyas Foundation",
    ours: "published",
    playUrl:
      "https://play.google.com/store/apps/details?id=com.gitainitiative.bhagavadgita",
    iosUrl:
      "https://apps.apple.com/us/app/bhagavad-gita-hindi-english/id1602895635",
    rating: "4.91",
    ratingCount: "1,688",
    installs: "500,000+",
    price: "Free",
    ads: "None",
    languages: "English, Hindi, Telugu, Tamil, Gujarati, Odia, Spanish",
    attribution: "Swami Mukundananda, named in the app",
    verdict:
      "The most focused option here. It does one thing, which is help you read the Gita, and it carries no advertising and nothing to pay for.",
    forWhom:
      "Anyone who wants the complete Gita and nothing competing for their attention. On Android without reservation; on iPhone the build is a day old.",
    notForWhom:
      "Anyone wanting several commentators side by side, or a wider devotional practice.",
    pros: [
      "All 18 chapters and 700 verses in seven languages",
      "Sanskrit recitation, plus translation and commentary audio",
      "Scripture text reads offline",
      "Free with no advertising, subscription or in-app purchases",
    ],
    cons: [
      "One translation and commentary, not a choice of several",
      "The iPhone build only shipped on 21 July 2026. Its nine store ratings, 2.0 in the US and 3.0 in India, all predate it",
      "Gita GPT asks you to sign in, and gives ten messages a day",
    ],
  },
  {
    slug: "krishna-bhakti",
    name: "Bhagavad Gita — Krishna Bhakti",
    developer: "JKYog",
    ours: "built-for-jkyog",
    playUrl:
      "https://play.google.com/store/apps/details?id=org.jkyog.radhakrishnabhakti",
    iosUrl:
      "https://apps.apple.com/us/app/bhagavad-gita-krishna-bhakti/id6463116386",
    rating: "4.85",
    ratingCount: "4,551",
    installs: "100,000+",
    price: "Free",
    ads: "None",
    languages: "Multiple, including Hindi and Odia",
    attribution: "Swami Mukundananda, named in the app",
    verdict:
      "The same Gita text inside a much wider devotional app, and the best-reviewed option on this page.",
    forWhom:
      "Anyone who wants a whole practice rather than only the Gita: kirtans, meditations, courses and lectures alongside the text.",
    notForWhom:
      "Anyone who finds extra features distracting and only wants to read.",
    pros: [
      "4,551 ratings on Google Play, plus 4.93 from 736 on the App Store",
      "Audiobooks, bhajans and kirtans alongside verse audio",
      "Ask Swamiji covers the Gita and Swami Mukundananda's other books",
      "Free with no advertising",
    ],
    cons: [
      "Much more than a Gita app, which is the point but will not suit everyone",
      "Same single commentator as our own app",
    ],
  },
  {
    slug: "banaka-hindi",
    name: "Bhagavad-Gita in Hindi",
    developer: "Banaka",
    playUrl:
      "https://play.google.com/store/apps/details?id=in.banaka.mohit.bhagwadgita",
    rating: "4.66",
    ratingCount: "58,591",
    installs: "1,000,000+",
    price: "Free",
    ads: "Contains ads, and in-app purchases",
    languages: "Hindi",
    attribution:
      'None. The listing names no translator and says "Assuming it is out of copyright protection."',
    verdict:
      "Comfortably the most-reviewed Hindi Gita app, with 58,591 ratings. Popularity and provenance are different things.",
    forWhom: "Hindi readers who want the option most people have chosen.",
    notForWhom:
      "Anyone who needs to know which edition they are reading and who translated it.",
    pros: [
      "58,591 ratings, roughly 35 times our own review count",
      "Works without a connection",
      "Free to install",
    ],
    cons: [
      "Carries advertising and in-app purchases",
      "No translator or commentator named anywhere on the listing",
      'The listing describes the text as "assuming it is out of copyright protection"',
    ],
  },
  {
    slug: "gita-seva",
    name: "Gita Seva: Hindu Books & Aarti",
    developer: "Gita Seva Trust",
    playUrl:
      "https://play.google.com/store/apps/details?id=ct.android.gitasevakotlin",
    rating: "4.86",
    ratingCount: "15,777",
    installs: "1,000,000+",
    price: "Free",
    ads: "None declared",
    languages: "Mainly Hindi",
    attribution: "Varies by book",
    verdict:
      "Much broader than the Gita: a large library of scripture texts in one app.",
    forWhom:
      "Anyone who wants a shelf of scripture rather than one book done thoroughly.",
    notForWhom:
      "Anyone who wants a purpose-built reading experience for the Gita alone.",
    pros: [
      "Far more than the Gita, spanning many scripture texts",
      "15,777 ratings and over a million installs",
    ],
    cons: [
      "Library breadth rather than depth on any single text",
      "Reading experience is built around documents, not verses",
    ],
  },
  {
    slug: "bhagavad-gita-for-all",
    name: "Bhagavad Gita For All | Video",
    developer: "Bhagavad Gita For All",
    playUrl: "https://play.google.com/store/apps/details?id=com.bgfa",
    iosUrl:
      "https://apps.apple.com/us/app/bhagavad-gita-for-all-video/id6504813763",
    rating: "4.48",
    ratingCount: "9,215",
    installs: "1,000,000+",
    price: "Chapter 1 free, then a trial, then paid",
    ads: "None declared, but paid content",
    languages: "Hindi and English",
    attribution: "No translator or commentator named",
    verdict:
      "The strongest video teaching here, and also the most heavily monetised app on this page.",
    forWhom: "People who learn better by watching than by reading.",
    notForWhom: "Anyone who wants the full text free.",
    pros: [
      "Genuinely substantial video content, with real production investment",
      "Topic-led browsing rather than chapter-by-chapter",
    ],
    cons: [
      "Only chapter one is permanently free",
      "The subscription price is not published on either store or on their site",
      "No named translator or commentator",
    ],
  },
  {
    slug: "banaka-bangla",
    name: "Bhagavad Gita in Bangla",
    developer: "Banaka",
    playUrl:
      "https://play.google.com/store/apps/details?id=in.banaka.mohit.bhagwadgita.bangla",
    rating: "4.72",
    ratingCount: "11,156",
    installs: "100,000+",
    price: "Free",
    ads: "Not verified",
    languages: "Bangla",
    attribution: "None named",
    verdict: "The most-reviewed Bangla option, with 11,156 ratings.",
    forWhom: "Bangla readers.",
    notForWhom: "Anyone needing named sources.",
    pros: ["11,156 ratings", "Bangla text in a dedicated app"],
    cons: ["No named translator", "Same publisher pattern as the Hindi app"],
  },
  {
    slug: "telugu-bhagavadgita",
    name: "Bhagavad Gita Telugu",
    developer: "Learning Game Apps",
    playUrl:
      "https://play.google.com/store/apps/details?id=telugu.bhagavadgita",
    rating: "4.67",
    ratingCount: "9,190",
    installs: "100,000+",
    price: "Free",
    ads: "Not verified",
    languages: "Telugu",
    attribution: "None named",
    verdict: "The most-reviewed dedicated Telugu option, with 9,190 ratings.",
    forWhom: "Telugu readers.",
    notForWhom: "Anyone needing named sources.",
    pros: ["9,190 ratings", "Dedicated Telugu app"],
    cons: ["No named translator"],
  },
  {
    slug: "banaka-oriya",
    name: "Bhagavad Gita in Oriya / Odia",
    developer: "Banaka",
    playUrl:
      "https://play.google.com/store/apps/details?id=in.banaka.mohit.bhagwadgita.oriya",
    rating: "4.69",
    ratingCount: "7,159",
    installs: "100,000+",
    price: "Free",
    ads: "Not verified",
    languages: "Odia",
    attribution: "None named",
    verdict: "The most-reviewed Odia option, with 7,159 ratings.",
    forWhom: "Odia readers.",
    notForWhom: "Anyone needing named sources.",
    pros: ["7,159 ratings", "Dedicated Odia app"],
    cons: ["No named translator"],
  },
  {
    slug: "learn-geeta",
    name: "Learn Geeta",
    developer: "Geeta Pariwar",
    playUrl:
      "https://play.google.com/store/apps/details?id=com.loginwithgoogle",
    iosUrl: "https://apps.apple.com/us/app/learn-geeta/id6447505100",
    rating: "4.75",
    ratingCount: "1,562",
    installs: "100,000+",
    price: "Free",
    ads: "None declared",
    languages: "Hindi and English",
    attribution: "Geeta Pariwar",
    verdict:
      "The only app here built around a course and a community rather than solo reading.",
    forWhom:
      "Anyone who learns better with structure, deadlines and other people.",
    notForWhom: "Anyone who wants to read at their own pace, alone.",
    pros: [
      "Structured courses rather than open-ended reading",
      "An organised community around the study",
    ],
    cons: ["Less useful as a plain reference", "Narrower language coverage"],
  },
  {
    slug: "ask-krishna-ai",
    name: "Ask Krishna AI",
    developer: "HNIX Innovations",
    playUrl:
      "https://play.google.com/store/apps/details?id=com.hnix.bhagavad_gita_ai",
    rating: "4.75",
    ratingCount: "647",
    installs: "10,000+",
    price: "Free to install",
    ads: "Not verified",
    languages: "English",
    attribution: "Not stated",
    verdict:
      "The clearest alternative if what you want is an AI to ask rather than a book to read.",
    forWhom: "People who prefer asking questions to browsing chapters.",
    notForWhom: "Anyone who wants a complete, well-attributed reading text.",
    pros: ["Built around asking rather than reading", "4.75 from 647 ratings"],
    cons: ["Small review base", "Not a complete reading experience"],
  },
  {
    slug: "song-of-god",
    name: "Bhagavad Gita — Song of God",
    developer: "JKYog India",
    playUrl:
      "https://play.google.com/store/apps/details?id=in.jkyog.bhagavadgita",
    rating: "4.66",
    ratingCount: "309",
    installs: "10,000+",
    price: "Free",
    ads: "None declared",
    languages: "English and Hindi",
    attribution: "Swami Mukundananda",
    verdict:
      "The lightest app here, and the one making the clearest promise about working without a connection.",
    forWhom: "Anyone on a patchy connection or a older phone.",
    notForWhom: "Anyone who wants audio or more than two languages.",
    pros: [
      "Explicitly built to work with no internet after install",
      "Small and quick",
    ],
    cons: ["No audio", "English and Hindi only", "Small review base"],
  },
  {
    slug: "bbt-as-it-is",
    name: "Bhagavad-gita As It Is",
    developer: "The Bhaktivedanta Book Trust",
    iosUrl: "https://apps.apple.com/us/app/id1080562426",
    rating: "4.89",
    ratingCount: "557",
    price: "$4.99, one-time",
    ads: "None",
    languages: "English, German, French, Hungarian, Russian",
    attribution: "A. C. Bhaktivedanta Swami Prabhupada, published by the BBT",
    verdict:
      "The only edition here published by the rights holder itself, and the one to buy if you want Prabhupada's translation.",
    forWhom: "Readers who specifically want the Prabhupada edition.",
    notForWhom: "Android users, and anyone unwilling to pay.",
    pros: [
      "Published by the rights holder, with the edition stated",
      "4.89 from 557 ratings on the App Store",
    ],
    cons: [
      "iPhone and iPad only. There is no official Android app.",
      "Costs $4.99",
      "No Indian language beyond English",
    ],
  },
];

/** Kept off the ranked list on purpose, with the reason stated. */
export const ALSO_CONSIDERED = [
  {
    name: "Bhakti: Gita & Mantras",
    developer: "Kuku Technologies",
    note: "The largest app in this space by installs, at over five million, with 30,459 ratings. It is a broad devotional audio product covering mantras and chants rather than a Bhagavad Gita reader, so ranking it against reading apps would flatter neither.",
  },
  {
    name: "Transcend",
    developer: "The Bhaktivedanta Book Trust",
    note: "The BBT's actual Android app, and a good one at 4.80 from 1,312 ratings. It is a library of more than 600 ebooks rather than a Gita app, so it sits here rather than in the table.",
  },
  {
    name: "Bhagavad-gītā As It Is (unofficial)",
    developer: "Listed as an individual developer",
    note: "Carries Prabhupada's text but is not published by the Bhaktivedanta Book Trust, and its own description disclaims responsibility for the text it ships. If you want this translation, buy the official iOS edition.",
  },
  {
    name: "Gita Press",
    developer: "Gita Press",
    note: "One of the most important publishers of Hindu scripture anywhere, but the app itself has a small review base at 232 ratings and we could not verify enough about it to rank it fairly.",
  },
  {
    name: "Srimad Gita",
    developer: "Decentralized Inc",
    note: "Its marketing pages claim a 4.8 rating from more than 2,450 reviews and over a million downloads. The stores show 4.28 from 44 ratings on Google Play with 1,000+ installs, and 4.0 from 4 ratings on the US App Store, 1.5 from 2 on the Indian one. We have not ranked it because we could not reconcile those numbers.",
  },
];

export type Faq = { question: string; answer: string };

export const FAQS: Faq[] = [
  {
    question: "What is the best Bhagavad Gita app?",
    answer:
      "It depends on what you want from it. If you want to read the Gita and nothing else, our own app is free, carries no advertising, and covers all 18 chapters and 700 verses in seven languages. If you want a wider devotional practice, Krishna Bhakti has the same text plus kirtans, meditations and courses. If you specifically want Prabhupada's translation, buy the Bhaktivedanta Book Trust edition on iOS.",
  },
  {
    question: "Which Bhagavad Gita app is completely free?",
    answer:
      "Ours and Krishna Bhakti are free with no advertising, no subscription and no in-app purchases. Banaka's Hindi app is free to install but carries advertising and in-app purchases. Bhagavad Gita For All gives you chapter one, then asks you to pay.",
  },
  {
    question: "What is the best Bhagavad Gita app in Hindi?",
    answer:
      "Banaka's Hindi app is the most popular by a wide margin, with 58,591 ratings. It names no translator, though, and its listing describes the text as assuming it is out of copyright. If knowing your source matters, our app and Krishna Bhakti both carry Swami Mukundananda's translation and commentary in Hindi, with the source named.",
  },
  {
    question: "Which Bhagavad Gita app works offline?",
    answer:
      "JKYog's Song of God makes the clearest offline promise, saying no internet is needed once installed. It is a lightweight app in English and Hindi with no audio. The scripture text in our own app also reads offline, though audio and Gita GPT need a connection.",
  },
  {
    question: "Is there a Bhagavad Gita app with AI?",
    answer:
      "Ours includes Gita GPT, which answers questions using the Gita and gives ten free messages a day after you sign in. Krishna Bhakti has Ask Swamiji, which covers Swami Mukundananda's wider work as well. Ask Krishna AI is an independent alternative built entirely around asking rather than reading.",
  },
  {
    question: "Which app has the most translations and commentaries?",
    answer:
      "None of these apps carries a deep library of commentators. Most ship one, and several name none at all. If you want to compare Shankaracharya, Ramanuja, Madhvacharya, Sivananda and others side by side, that is a job for a website rather than an app, and you can do it free on bhagavadgita.com.",
  },
  {
    question: "Is there an official ISKCON Bhagavad Gita app?",
    answer:
      "The Bhaktivedanta Book Trust publishes Bhagavad-gita As It Is on iOS for $4.99. There is no official Android version. An Android app carrying the same text exists but is not published by the BBT, and its own description disclaims responsibility for the text.",
  },
  {
    question: "How did you choose these apps?",
    answer:
      "We searched Google Play across seven query variants, which surfaced 117 distinct apps, then kept the ones with enough scale or a distinct purpose to be worth comparing. Every rating, review count and install figure comes from the stores' own structured data rather than the visible page, and each was checked on 25 July 2026.",
  },
];

export type CategoryWinner = {
  category: string;
  winner: string;
  ours?: App["ours"];
  why: string;
};

export const CATEGORY_WINNERS: CategoryWinner[] = [
  { category: "Best dedicated Gita app", winner: "Bhagavad Gita Hindi & English", ours: "published",
    why: "Built for one thing, free, ad-free, and the highest rated on Google Play India among Gita apps with more than 1,000 ratings." },
  { category: "Best free, ad-free app", winner: "Bhagavad Gita Hindi & English", ours: "published",
    why: "No advertising, no subscription, no in-app purchases, no sponsorship." },
  { category: "Best all-round devotional app", winner: "Bhagavad Gita — Krishna Bhakti", ours: "built-for-jkyog",
    why: "The same Gita text plus kirtans, meditations, audiobooks, courses and lectures. 4,551 ratings, the largest review base here." },
  { category: "Best audio", winner: "Bhagavad Gita — Krishna Bhakti", ours: "built-for-jkyog",
    why: "Verse audio alongside audiobooks, bhajans and kirtans." },
  { category: "Best AI assistant", winner: "Bhagavad Gita Hindi & English", ours: "published",
    why: "Gita GPT answers from the Gita and cites the verses it drew on. Ten free messages a day once you sign in." },
  { category: "Best AI alternative", winner: "Ask Krishna AI",
    why: "An independent app built entirely around asking questions rather than reading chapters." },
  { category: "Most popular in Hindi", winner: "Bhagavad-Gita in Hindi, by Banaka",
    why: "58,591 ratings, roughly 35 times our own review count." },
  { category: "Best for Bangla", winner: "Bhagavad Gita in Bangla, by Banaka",
    why: "11,156 ratings, the most-reviewed Bangla option." },
  { category: "Best for Telugu", winner: "Bhagavad Gita Telugu, by Learning Game Apps",
    why: "9,190 ratings, the most-reviewed dedicated Telugu option." },
  { category: "Best for Odia", winner: "Bhagavad Gita in Oriya, by Banaka",
    why: "7,159 ratings. Krishna Bhakti also ships Odia if you want a named source." },
  { category: "Largest scripture library", winner: "Gita Seva",
    why: "Far broader than the Gita, with over a million installs." },
  { category: "Best for structured learning", winner: "Learn Geeta, by Geeta Pariwar",
    why: "The only app here built around a course and a community." },
  { category: "Best video teaching", winner: "Bhagavad Gita For All",
    why: "Substantial video content, though only chapter one is permanently free." },
  { category: "Best for Prabhupada readers", winner: "Bhagavad-gita As It Is, by the BBT",
    why: "The only edition published by the rights holder. iOS only, $4.99." },
  { category: "Best offline", winner: "Bhagavad Gita — Song of God, by JKYog India",
    why: "The clearest offline promise here. Lightweight, English and Hindi, no audio." },
];

const PAGE_URL = "https://bhagavadgita.com/best-bhagavad-gita-apps";

export function getJsonLd() {
  return [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      "@id": `${PAGE_URL}#article`,
      headline: "The Best Bhagavad Gita Apps, Compared",
      description:
        "Every Bhagavad Gita app compared on price, advertising, languages and who translated the text, with every figure checked against the stores.",
      datePublished: "2026-07-21",
      dateModified: "2026-07-21",
      inLanguage: "en",
      author: {
        "@type": "Organization",
        name: "Ved Vyas Foundation",
        url: "https://bhagavadgita.com",
      },
      publisher: {
        "@type": "Organization",
        name: "Ved Vyas Foundation",
        url: "https://bhagavadgita.com",
      },
      mainEntityOfPage: { "@type": "WebPage", "@id": PAGE_URL },
    },
    {
      // ItemList, with every app on the page present and all of one type.
      // Store ratings are attributed to the store on the individual app, never
      // aggregated across the page: Google's guidance is explicit that review
      // markup describes a specific item, not a category or a list.
      "@context": "https://schema.org",
      "@type": "ItemList",
      "@id": `${PAGE_URL}#list`,
      name: "Bhagavad Gita apps compared",
      numberOfItems: APPS.length,
      itemListElement: APPS.map((app, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: {
          "@type": "SoftwareApplication",
          name: app.name,
          applicationCategory: "BooksApplication",
          operatingSystem: app.iosUrl && app.playUrl ? "Android, iOS" : app.playUrl ? "Android" : "iOS",
          url: app.playUrl ?? app.iosUrl,
          author: { "@type": "Organization", name: app.developer },
          offers: app.price.toLowerCase().startsWith("free")
            ? { "@type": "Offer", price: "0", priceCurrency: "USD" }
            : { "@type": "Offer", description: app.price },
          ...(app.rating && app.ratingCount
            ? {
                aggregateRating: {
                  "@type": "AggregateRating",
                  ratingValue: app.rating,
                  ratingCount: Number(app.ratingCount.replace(/,/g, "")),
                  bestRating: "5",
                },
              }
            : {}),
        },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: FAQS.map((f) => ({
        "@type": "Question",
        name: f.question,
        acceptedAnswer: { "@type": "Answer", text: f.answer },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, item: { "@id": "https://bhagavadgita.com", name: "Home" } },
        { "@type": "ListItem", position: 2, item: { "@id": PAGE_URL, name: "Best Bhagavad Gita Apps" } },
      ],
    },
  ];
}
