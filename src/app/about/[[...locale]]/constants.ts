export const getJsonLdFirst = (isHindi: boolean) => ({
  "@context": "https://schema.org",
  "@type": "Article",
  headline: isHindi
    ? "भगवद गीता के बारे में - कृष्ण की शिक्षाएं | महाभारत"
    : "About Bhagavad Gita - Krishna's Teachings to Arjuna | Mahabharata",
  description: isHindi
    ? "भगवद गीता की खोज करें: भगवान कृष्ण से अर्जुन को कालातीत ज्ञान के 700 श्लोक। वेद व्यास द्वारा रचित, गणेश जी द्वारा लिखित। महाभारत संदर्भ, प्रमुख पात्रों और गीता की प्रासंगिकता के बारे में जानें।"
    : "Discover the Bhagavad Gita: 700 verses of timeless wisdom from Lord Krishna to Arjuna. Authored by Ved Vyasa, scribed by Ganesh ji. Learn about the epic Mahabharata context, key characters, and why the Gita remains relevant today.",
  author: [
    {
      "@type": "Person",
      name: isHindi ? "वेद व्यास" : "Ved Vyasa",
      description: isHindi
        ? "महाभारत और भगवद गीता के रचयिता ऋषि"
        : "Sage and author of the Mahabharata, including the Bhagavad Gita",
    },
    {
      "@type": "Person",
      name: isHindi ? "गणेश" : "Ganesh",
      description: isHindi
        ? "दिव्य लेखक जिन्होंने वेद व्यास के बोलने पर महाभारत लिखा"
        : "Divine scribe who wrote down the Mahabharata as Ved Vyasa dictated",
    },
  ],
  publisher: {
    "@type": "Organization",
    name: isHindi ? "वेद व्यास फाउंडेशन" : "Ved Vyas Foundation",
    logo: {
      "@type": "ImageObject",
      url: "https://bhagavadgita.io/static/images/radhakrishna.png",
    },
  },
  datePublished: "2020-01-01",
  dateModified: new Date().toISOString().split("T")[0],
  keywords: isHindi
    ? "भगवद गीता, भगवान कृष्ण, अर्जुन, वेद व्यास, गणेश जी, महाभारत, हिंदू धर्मग्रंथ, धर्म, कर्म योग, भक्ति योग, ज्ञान योग"
    : "Bhagavad Gita, Lord Krishna, Arjuna, Ved Vyasa, Ganesh ji, Mahabharata, Hindu scripture, dharma, karma yoga, bhakti yoga, jnana yoga",
  inLanguage: isHindi ? "hi" : "en",
});

export const getJsonLdTwo = (isHindi: boolean) => ({
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: isHindi ? "भगवद गीता के बारे में" : "About Bhagavad Gita",
  description: isHindi
    ? "भगवद गीता के बारे में संपूर्ण जानकारी - इसका इतिहास, भगवान कृष्ण और अर्जुन सहित पात्र, कर्म योग, भक्ति योग और ज्ञान योग की शिक्षाएं, और हिंदू दर्शन में महत्व। वेद व्यास, गणेश जी और महाभारत संदर्भ के बारे में जानें।"
    : "Complete information about the Bhagavad Gita - its history, characters including Lord Krishna and Arjuna, teachings on karma yoga, bhakti yoga and jnana yoga, and significance in Hindu philosophy. Learn about Ved Vyasa, Ganesh ji, and the Mahabharata context.",
  url: isHindi ? "https://bhagavadgita.io/hi/about" : "https://bhagavadgita.io/about",
  about: {
    "@type": "Book",
    name: isHindi ? "भगवद गीता" : "Bhagavad Gita",
    author: {
      "@type": "Person",
      name: isHindi ? "वेद व्यास" : "Ved Vyasa",
    },
    numberOfPages: isHindi ? "700 श्लोक" : "700 verses",
    inLanguage: ["Sanskrit", "Hindi", "English"],
  },
  mainEntity: [
    {
      "@type": "Person",
      name: isHindi ? "भगवान श्री कृष्ण" : "Lord Krishna",
      description: isHindi
        ? "भगवद गीता के दिव्य गुरु और वक्ता"
        : "The divine teacher and speaker of the Bhagavad Gita",
    },
    {
      "@type": "Person",
      name: isHindi ? "अर्जुन" : "Arjuna",
      description: isHindi
        ? "भगवद गीता में योद्धा राजकुमार और समर्पित शिष्य"
        : "The warrior prince and devoted disciple in the Bhagavad Gita",
    },
    {
      "@type": "Person",
      name: isHindi ? "संजय" : "Sanjaya",
      description: isHindi
        ? "भगवद गीता के सूत्रधार"
        : "The narrator of the Bhagavad Gita",
    },
  ],
  inLanguage: isHindi ? "hi" : "en",
});
