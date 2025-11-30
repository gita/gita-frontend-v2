"use client";

import { useState } from "react";
import Image from "next/image";

import { getTranslate } from "shared/translate";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps extends LocaleAndTranslations {}

const FAQ = ({ locale, translations }: FAQProps) => {
  const translate = getTranslate(translations, locale);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqsEnglish: FAQItem[] = [
    {
      question: "How many chapters are in the Bhagavad Gita?",
      answer: "The Bhagavad Gita contains 18 chapters with a total of 700 verses (shlokas). It is part of the Indian epic Mahabharata and presents a conversation between Lord Krishna and Arjuna on the battlefield of Kurukshetra.",
    },
    {
      question: "Who wrote the Bhagavad Gita?",
      answer: "The Bhagavad Gita was composed by Sage Vyasa as part of the Mahabharata. It records the sacred dialogue between Lord Sri Krishna and Prince Arjuna before the great war at Kurukshetra.",
    },
    {
      question: "What are the benefits of reading the Bhagavad Gita?",
      answer: "Reading the Bhagavad Gita provides guidance on life's most profound questions, teaches the paths of karma (action), bhakti (devotion), and jnana (knowledge), brings peace of mind, and helps lead a purposeful life aligned with dharma (righteousness).",
    },
    {
      question: "Is the Bhagavad Gita available with commentaries?",
      answer: "Yes, BhagavadGita.io provides the complete Bhagavad Gita with authentic commentaries from 20+ revered scholars including Adi Shankaracharya, Ramanujacharya, Madhvacharya, Swami Sivananda, and many other traditional and modern commentators. Multiple translations are available in Hindi, English, and Sanskrit.",
    },
  ];

  const faqsHindi: FAQItem[] = [
    {
      question: "भगवद गीता में कितने अध्याय हैं?",
      answer: "श्रीमद् भगवद गीता में कुल 18 अध्याय और 700 श्लोक हैं। यह महाभारत के भीष्म पर्व का हिस्सा है जिसमें भगवान श्री कृष्ण ने अर्जुन को उपदेश दिया।",
    },
    {
      question: "भगवद गीता किसने लिखी?",
      answer: "भगवद गीता की रचना महर्षि वेदव्यास जी ने की थी। यह भगवान श्री कृष्ण और अर्जुन के बीच कुरुक्षेत्र युद्ध के मैदान में हुए संवाद का संग्रह है।",
    },
    {
      question: "भगवद गीता पढ़ने के क्या लाभ हैं?",
      answer: "भगवद गीता जीवन के सभी प्रश्नों का समाधान देती है। यह कर्म, धर्म, ज्ञान और भक्ति का मार्गदर्शन करती है तथा मन को शांति और जीवन को सही दिशा प्रदान करती है।",
    },
    {
      question: "क्या भगवद गीता टीका के साथ उपलब्ध है?",
      answer: "हाँ, BhagavadGita.io पर भगवद गीता 20+ प्रामाणिक आचार्यों की टीका के साथ उपलब्ध है जिनमें आदि शंकराचार्य, रामानुजाचार्य, माधवाचार्य, स्वामी शिवानंद आदि शामिल हैं। हिंदी, अंग्रेजी और संस्कृत में अनुवाद उपलब्ध हैं।",
    },
  ];

  const faqs = locale === "hi" ? faqsHindi : faqsEnglish;

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="relative my-14 py-10">
      <Image
        src="/bg-verses-fixed.png"
        alt="BG FAQ Background"
        fill
        style={{
          objectFit: "cover",
          objectPosition: "center",
        }}
        className="z-[-1]"
      />
      <div className="z-50 mx-auto max-w-4xl px-4 sm:px-6">
        <div>
          <h2 className="mb-6 text-center text-4xl font-bold dark:text-white">
            {translate("Frequently Asked Questions")}
          </h2>
          <p className="mb-10 text-center text-lg text-gray-600 dark:text-gray-300">
            {translate("Everything you need to know about the Bhagavad Gita")}
          </p>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="rounded-md border-2 border-white bg-white drop-shadow-card dark:border-dark-bg dark:bg-dark-100"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="flex w-full items-start justify-between p-6 text-left transition-all hover:bg-box-bg dark:hover:bg-dark-bg"
                >
                  <h3 className="pr-4 text-lg font-semibold text-gray-900 dark:text-white">
                    {faq.question}
                  </h3>
                  <span
                    className={`shrink-0 text-2xl font-bold text-my-orange transition-transform ${
                      openIndex === index ? "rotate-45" : ""
                    }`}
                  >
                    +
                  </span>
                </button>
                
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openIndex === index ? "max-h-96" : "max-h-0"
                  }`}
                >
                  <div className="border-t border-gray-200 p-6 pt-4 dark:border-gray-700">
                    <p className="text-gray-600 dark:text-gray-300">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;

