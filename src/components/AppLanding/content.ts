export const GOOGLE_PLAY_URL =
  "https://play.google.com/store/apps/details?id=com.gitainitiative.bhagavadgita";
export const APP_STORE_URL =
  "https://apps.apple.com/us/app/bhagavad-gita-hindi-english/id1602895635";

export type AppLandingCopy = {
  locale: "en" | "hi";
  badge: string;
  title: string;
  answer: string;
  supportingText: string;
  storeLabels: { google: string; apple: string };
  proof: Array<{ value: string; label: string }>;
  features: {
    eyebrow: string;
    title: string;
    description: string;
    items: Array<{
      icon:
        | "book"
        | "headphones"
        | "sparkles"
        | "bookmark"
        | "wifi"
        | "languages";
      title: string;
      description: string;
    }>;
  };
  screenshots: {
    eyebrow: string;
    title: string;
    description: string;
    items: Array<{ src: string; alt: string; label: string }>;
  };
  facts: {
    eyebrow: string;
    title: string;
    intro: string;
    rows: Array<{ label: string; value: string }>;
    sourceNote: string;
    sourceLink: string;
  };
  sources: {
    eyebrow: string;
    title: string;
    description: string;
    translationsLabel: string;
    translations: string;
    commentariesLabel: string;
    commentaries: string;
    historyTitle: string;
    historyText: string;
  };
  faq: {
    eyebrow: string;
    title: string;
    items: Array<{ question: string; answer: string }>;
  };
  cta: { title: string; description: string };
};

const screenshots = {
  en: [
    {
      src: "/images/app/free.webp",
      alt: "Current Bhagavad Gita app home screen with its free and ad-free message",
      label: "Free, with no ads or payments",
    },
    {
      src: "/images/app/commentary.webp",
      alt: "Current Bhagavad Gita app commentary reading screen",
      label: "Read established commentaries",
    },
    {
      src: "/images/app/gita-ai.webp",
      alt: "Current Gita AI question and answer screen",
      label: "Ask Gita AI",
    },
    {
      src: "/images/app/audio.webp",
      alt: "Current Bhagavad Gita app Sanskrit audio player",
      label: "Listen to Sanskrit verses",
    },
    {
      src: "/images/app/offline.webp",
      alt: "Current Bhagavad Gita app offline chapter reading screen",
      label: "Take the Gita offline",
    },
    {
      src: "/images/app/reading.webp",
      alt: "Current Bhagavad Gita app dark reading screen with notes and bookmarks",
      label: "Adjust and save your reading",
    },
  ],
  hi: [
    {
      src: "/images/app/free.webp",
      alt: "वर्तमान भगवद गीता ऐप का निःशुल्क और विज्ञापन-मुक्त होम स्क्रीन",
      label: "निःशुल्क, बिना विज्ञापन या भुगतान",
    },
    {
      src: "/images/app/commentary.webp",
      alt: "वर्तमान भगवद गीता ऐप की टीका पाठ स्क्रीन",
      label: "स्थापित टीकाएँ पढ़ें",
    },
    {
      src: "/images/app/gita-ai.webp",
      alt: "वर्तमान Gita AI प्रश्नोत्तर स्क्रीन",
      label: "Gita AI से पूछें",
    },
    {
      src: "/images/app/audio.webp",
      alt: "वर्तमान भगवद गीता ऐप का संस्कृत ऑडियो प्लेयर",
      label: "संस्कृत श्लोक सुनें",
    },
    {
      src: "/images/app/offline.webp",
      alt: "वर्तमान भगवद गीता ऐप की ऑफलाइन अध्याय स्क्रीन",
      label: "गीता को ऑफलाइन पढ़ें",
    },
    {
      src: "/images/app/reading.webp",
      alt: "नोट्स और बुकमार्क के साथ वर्तमान भगवद गीता ऐप की डार्क पाठ स्क्रीन",
      label: "पाठ बदलें और सहेजें",
    },
  ],
};

export const appLandingCopy: Record<"en" | "hi", AppLandingCopy> = {
  en: {
    locale: "en",
    badge: "Free on Android and iPhone",
    title: "The Bhagavad Gita app for daily reading and study",
    answer:
      "The Bhagavad Gita app is free and ad-free on Android and iPhone, with all 18 chapters and 700 verses in English and Hindi. Read or listen with translations, commentaries, offline access, bookmarks, notes, and Gita AI.",
    supportingText:
      "No subscription and no paid tier. Start with a chapter, continue where you stopped, or open a saved verse when you want to study it again.",
    storeLabels: {
      google: "Get it on Google Play",
      apple: "Download on the App Store",
    },
    proof: [
      { value: "500K+", label: "Google Play downloads" },
      { value: "4.8", label: "Google Play rating" },
      { value: "1.66K", label: "Google Play reviews" },
      { value: "Free", label: "No ads or subscription" },
    ],
    features: {
      eyebrow: "What you can do",
      title: "Built around the way people read the Gita",
      description:
        "The app keeps the verse, its meaning, and the relevant study tools in one reading flow.",
      items: [
        {
          icon: "book",
          title: "Read each verse with context",
          description:
            "Move through all 18 chapters and 700 verses. Sanskrit, transliteration, translations, and commentaries stay together at verse level.",
        },
        {
          icon: "headphones",
          title: "Listen verse by verse",
          description:
            "Play Sanskrit audio while following the verse on screen. The controls stay beside the text.",
        },
        {
          icon: "sparkles",
          title: "Ask Gita AI",
          description:
            "Ask a question and find relevant ideas from the Bhagavad Gita. Gita AI is a study aid, not a replacement for the source text.",
        },
        {
          icon: "bookmark",
          title: "Keep your place and your notes",
          description:
            "Bookmark verses, add notes, and return to your recent reading. Copy or share from the verse screen.",
        },
        {
          icon: "wifi",
          title: "Read offline",
          description:
            "Read the scripture content without a data connection. Audio, Gita AI, and account syncing need internet access.",
        },
        {
          icon: "languages",
          title: "Study in English or Hindi",
          description:
            "Use the app in English or Hindi and choose from the translations and commentaries available for each language.",
        },
      ],
    },
    screenshots: {
      eyebrow: "Inside the app",
      title: "See the current Bhagavad Gita app",
      description:
        "These screenshots are from the current Google Play release. They show the same core reading and study experience available on Android and iPhone.",
      items: screenshots.en,
    },
    facts: {
      eyebrow: "Quick facts",
      title: "What is included in the Bhagavad Gita app?",
      intro:
        "Here are the practical details people usually want before downloading.",
      rows: [
        { label: "Price", value: "Free. No ads, subscription, or paid tier." },
        { label: "Platforms", value: "Android and iPhone" },
        { label: "Languages", value: "English and Hindi" },
        { label: "Scripture", value: "18 chapters and 700 verses" },
        { label: "Study sources", value: "7 translations and 16 commentaries" },
        { label: "Audio", value: "Sanskrit verse audio" },
        { label: "Offline use", value: "Reading content works offline" },
        {
          label: "Account",
          value:
            "Not required to start reading; used for account-based features and syncing",
        },
      ],
      sourceNote:
        "Store figures are from the Google Play listing, checked 19 July 2026.",
      sourceLink: "View the current Google Play listing",
    },
    sources: {
      eyebrow: "Texts and commentaries",
      title: "Study more than one established interpretation",
      description:
        "A translation tells you what a verse says. A commentary helps you see how a teacher or philosophical tradition understands it. The app keeps the author visible so you know which source you are reading.",
      translationsLabel: "7 translations",
      translations:
        "English and Hindi translations include works by Swami Sivananda, Swami Gambirananda, Swami Adidevananda, Swami Ramsukhdas, Swami Tejomayananda, Dr. S. Sankaranarayan, and Shri Purohit Swami.",
      commentariesLabel: "16 commentaries",
      commentaries:
        "The collection includes commentaries by Sri Shankaracharya, Sri Ramanujacharya, Sri Madhvacharya, Sri Sridhara Swami, Swami Ramsukhdas, Swami Chinmayananda, Swami Sivananda, and other established teachers.",
      historyTitle: "Serving Gita readers since 2018",
      historyText:
        "Bhagavadgita.com and its app have grown from the same long-running project. The mobile app carries the core reading experience into a focused format for Android and iPhone.",
    },
    faq: {
      eyebrow: "Common questions",
      title: "Bhagavad Gita app FAQ",
      items: [
        {
          question: "Is the Bhagavad Gita app completely free?",
          answer:
            "Yes. The Android and iPhone apps are free to download and use. There are no advertisements, subscriptions, or paid feature tiers.",
        },
        {
          question: "Can I use the Bhagavad Gita app offline?",
          answer:
            "Yes. You can read the chapters, verses, translations, and commentaries offline after installing the app. Streaming audio, Gita AI, and account syncing require an internet connection.",
        },
        {
          question: "Does the app include Bhagavad Gita audio?",
          answer:
            "Yes. Sanskrit verse audio is available from the reading screen, so you can listen while following the text.",
        },
        {
          question: "Is the app available in Hindi?",
          answer:
            "Yes. The app supports English and Hindi, with translations and commentaries available for both reading paths.",
        },
        {
          question:
            "Is the Bhagavad Gita app available for Android and iPhone?",
          answer:
            "Yes. The app is available from Google Play for Android and from the App Store for iPhone, with the same core reading and study features on both platforms.",
        },
        {
          question: "Do I need an account to read the Bhagavad Gita?",
          answer:
            "No. You can begin reading without creating an account. Sign-in is used when a feature needs to save or sync account activity.",
        },
        {
          question: "What is Gita AI?",
          answer:
            "Gita AI is a question-and-answer study tool inside the app. It is included at no cost and has a daily message allowance so the service remains available to everyone.",
        },
        {
          question: "Which translations and commentaries are included?",
          answer:
            "The app includes 7 translations and 16 commentaries from established teachers and editions. The author is shown with the text, and you can switch sources while studying a verse.",
        },
      ],
    },
    cta: {
      title: "Keep the complete Gita with you",
      description:
        "Download the free Bhagavad Gita app for Android or iPhone. There are no ads and no subscription.",
    },
  },
  hi: {
    locale: "hi",
    badge: "Android और iPhone पर निःशुल्क",
    title: "दैनिक पाठ और अध्ययन के लिए भगवद गीता ऐप",
    answer:
      "भगवद गीता ऐप Android और iPhone पर निःशुल्क और विज्ञापन-मुक्त है। इसमें सभी 18 अध्याय और 700 श्लोक अंग्रेज़ी व हिंदी में, ऑडियो, अनुवाद, टीकाएँ, ऑफलाइन पाठ, बुकमार्क, नोट्स और Gita AI के साथ उपलब्ध हैं।",
    supportingText:
      "न कोई सदस्यता, न कोई भुगतान वाला स्तर। किसी अध्याय से शुरू करें, पिछला पाठ आगे बढ़ाएँ या सहेजे हुए श्लोक पर दोबारा लौटें।",
    storeLabels: {
      google: "Google Play से डाउनलोड करें",
      apple: "App Store से डाउनलोड करें",
    },
    proof: [
      { value: "5 लाख+", label: "Google Play डाउनलोड" },
      { value: "4.8", label: "Google Play रेटिंग" },
      { value: "1.66K", label: "Google Play समीक्षाएँ" },
      { value: "निःशुल्क", label: "न विज्ञापन, न सदस्यता" },
    ],
    features: {
      eyebrow: "ऐप में क्या कर सकते हैं",
      title: "गीता पढ़ने के स्वाभाविक क्रम के अनुसार बनाया गया",
      description:
        "श्लोक, उसका अर्थ और अध्ययन के उपयोगी साधन एक ही पाठ क्रम में मिलते हैं।",
      items: [
        {
          icon: "book",
          title: "हर श्लोक संदर्भ के साथ पढ़ें",
          description:
            "18 अध्याय और 700 श्लोक पढ़ें। प्रत्येक श्लोक के साथ संस्कृत पाठ, लिप्यंतरण, अनुवाद और टीकाएँ उपलब्ध हैं।",
        },
        {
          icon: "headphones",
          title: "एक-एक श्लोक सुनें",
          description:
            "स्क्रीन पर श्लोक पढ़ते हुए स्पष्ट संस्कृत ऑडियो सुनें। ऑडियो नियंत्रण पाठ के पास रहते हैं।",
        },
        {
          icon: "sparkles",
          title: "Gita AI से प्रश्न पूछें",
          description:
            "प्रश्न पूछें और भगवद गीता से जुड़े विचार खोजें। Gita AI निःशुल्क अध्ययन सहायक है, मूल पाठ का विकल्प नहीं।",
        },
        {
          icon: "bookmark",
          title: "स्थान और नोट्स सहेजें",
          description:
            "श्लोक बुकमार्क करें, निजी नोट्स जोड़ें और हाल का पाठ फिर खोलें। श्लोक स्क्रीन से ही कॉपी और साझा कर सकते हैं।",
        },
        {
          icon: "wifi",
          title: "ऑफलाइन पढ़ें",
          description:
            "ऐप इंस्टॉल होने के बाद मूल पाठ बिना इंटरनेट पढ़ा जा सकता है। ऑडियो, Gita AI और अकाउंट सिंक के लिए इंटरनेट चाहिए।",
        },
        {
          icon: "languages",
          title: "अंग्रेज़ी या हिंदी में अध्ययन करें",
          description:
            "ऐप को अंग्रेज़ी या हिंदी में उपयोग करें और उस भाषा में उपलब्ध अनुवाद व टीकाएँ चुनें।",
        },
      ],
    },
    screenshots: {
      eyebrow: "ऐप के भीतर",
      title: "वर्तमान भगवद गीता ऐप देखें",
      description:
        "ये स्क्रीनशॉट वर्तमान Google Play रिलीज़ से हैं। Android और iPhone दोनों पर यही मुख्य पाठ और अध्ययन अनुभव उपलब्ध है।",
      items: screenshots.hi,
    },
    facts: {
      eyebrow: "मुख्य जानकारी",
      title: "भगवद गीता ऐप में क्या शामिल है?",
      intro: "डाउनलोड करने से पहले जानने योग्य व्यावहारिक जानकारी।",
      rows: [
        {
          label: "मूल्य",
          value: "निःशुल्क। न विज्ञापन, न सदस्यता, न भुगतान वाला स्तर।",
        },
        { label: "प्लेटफ़ॉर्म", value: "Android और iPhone" },
        { label: "भाषाएँ", value: "अंग्रेज़ी और हिंदी" },
        { label: "मूल पाठ", value: "18 अध्याय और 700 श्लोक" },
        { label: "अध्ययन स्रोत", value: "7 अनुवाद और 16 टीकाएँ" },
        { label: "ऑडियो", value: "संस्कृत श्लोक ऑडियो" },
        { label: "ऑफलाइन उपयोग", value: "पाठ सामग्री ऑफलाइन उपलब्ध" },
        {
          label: "अकाउंट",
          value:
            "पढ़ना शुरू करने के लिए आवश्यक नहीं; अकाउंट-आधारित सुविधाओं और सिंक के लिए उपयोग होता है",
        },
      ],
      sourceNote:
        "स्टोर आँकड़े Google Play सूची से हैं, 19 जुलाई 2026 को जाँचे गए।",
      sourceLink: "वर्तमान Google Play सूची देखें",
    },
    sources: {
      eyebrow: "अनुवाद और टीकाएँ",
      title: "एक से अधिक स्थापित व्याख्याओं के साथ अध्ययन करें",
      description:
        "अनुवाद बताता है कि श्लोक क्या कहता है। टीका दिखाती है कि कोई आचार्य या दार्शनिक परंपरा उसे कैसे समझती है। ऐप में लेखक का नाम साथ रहता है।",
      translationsLabel: "7 अनुवाद",
      translations:
        "अंग्रेज़ी और हिंदी अनुवादों में स्वामी शिवानंद, स्वामी गंभीरानंद, स्वामी आदिदेवानंद, स्वामी रामसुखदास, स्वामी तेजोमयानंद, डॉ. एस. शंकरनारायण और श्री पुरोहित स्वामी की कृतियाँ शामिल हैं।",
      commentariesLabel: "16 टीकाएँ",
      commentaries:
        "संग्रह में श्री शंकराचार्य, श्री रामानुजाचार्य, श्री मध्वाचार्य, श्री श्रीधर स्वामी, स्वामी रामसुखदास, स्वामी चिन्मयानंद, स्वामी शिवानंद और अन्य स्थापित आचार्यों की टीकाएँ शामिल हैं।",
      historyTitle: "2018 से गीता पाठकों की सेवा में",
      historyText:
        "Bhagavadgita.com और यह ऐप एक ही लंबे समय से चल रही परियोजना के भाग हैं। मोबाइल ऐप Android और iPhone पर मूल पाठ अनुभव को केंद्रित रूप में उपलब्ध कराता है।",
    },
    faq: {
      eyebrow: "सामान्य प्रश्न",
      title: "भगवद गीता ऐप से जुड़े प्रश्न",
      items: [
        {
          question: "क्या भगवद गीता ऐप पूरी तरह निःशुल्क है?",
          answer:
            "हाँ। Android और iPhone ऐप डाउनलोड और उपयोग करने के लिए निःशुल्क हैं। इनमें विज्ञापन, सदस्यता या भुगतान वाले फीचर स्तर नहीं हैं।",
        },
        {
          question: "क्या भगवद गीता ऐप ऑफलाइन चलता है?",
          answer:
            "हाँ। ऐप इंस्टॉल करने के बाद अध्याय, श्लोक, अनुवाद और टीकाएँ ऑफलाइन पढ़ सकते हैं। ऑडियो, Gita AI और अकाउंट सिंक के लिए इंटरनेट चाहिए।",
        },
        {
          question: "क्या ऐप में भगवद गीता ऑडियो है?",
          answer:
            "हाँ। पाठ स्क्रीन पर संस्कृत श्लोक का ऑडियो उपलब्ध है, इसलिए आप पाठ देखते हुए सुन सकते हैं।",
        },
        {
          question: "क्या ऐप हिंदी में उपलब्ध है?",
          answer:
            "हाँ। ऐप अंग्रेज़ी और हिंदी का समर्थन करता है। दोनों पाठ क्रमों में अनुवाद और टीकाएँ उपलब्ध हैं।",
        },
        {
          question: "क्या ऐप Android और iPhone दोनों पर उपलब्ध है?",
          answer:
            "हाँ। Android के लिए Google Play और iPhone के लिए App Store पर ऐप उपलब्ध है। दोनों में समान मुख्य पाठ और अध्ययन सुविधाएँ हैं।",
        },
        {
          question: "क्या गीता पढ़ने के लिए अकाउंट बनाना जरूरी है?",
          answer:
            "नहीं। आप बिना अकाउंट बनाए पढ़ना शुरू कर सकते हैं। साइन-इन केवल उन सुविधाओं के लिए उपयोग होता है जिन्हें अकाउंट की गतिविधि सहेजनी या सिंक करनी होती है।",
        },
        {
          question: "Gita AI क्या है?",
          answer:
            "Gita AI ऐप के भीतर प्रश्नोत्तर अध्ययन साधन है। यह निःशुल्क शामिल है और सेवा सभी के लिए उपलब्ध रखने हेतु इसमें दैनिक संदेश सीमा है।",
        },
        {
          question: "ऐप में कौन से अनुवाद और टीकाएँ हैं?",
          answer:
            "ऐप में स्थापित आचार्यों और संस्करणों से 7 अनुवाद और 16 टीकाएँ हैं। पाठ के साथ लेखक का नाम दिखता है और श्लोक पढ़ते समय स्रोत बदल सकते हैं।",
        },
      ],
    },
    cta: {
      title: "संपूर्ण गीता हमेशा अपने साथ रखें",
      description:
        "Android या iPhone के लिए निःशुल्क भगवद गीता ऐप डाउनलोड करें। न कोई विज्ञापन, न कोई सदस्यता।",
    },
  },
};
