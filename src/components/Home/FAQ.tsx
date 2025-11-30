"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
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
      answer:
        "The Bhagavad Gita contains 18 chapters with a total of 700 verses (shlokas). It is part of the Indian epic Mahabharata and presents a conversation between Lord Krishna and Arjuna on the battlefield of Kurukshetra.",
    },
    {
      question: "Who wrote the Bhagavad Gita?",
      answer:
        "The Bhagavad Gita was composed by Sage Ved Vyasa as part of the Mahabharata. It records the sacred dialogue between Lord Sri Krishna and Prince Arjuna before the great war at Kurukshetra.",
    },
    {
      question: "What are the benefits of reading the Bhagavad Gita?",
      answer:
        "Reading the Bhagavad Gita provides guidance on life's most profound questions, teaches the paths of karma yoga (action), bhakti yoga (devotion), and jnana yoga (knowledge), brings peace of mind, and helps lead a purposeful life aligned with dharma (righteousness).",
    },
    {
      question: "Is the Bhagavad Gita available with commentaries?",
      answer:
        "Yes, BhagavadGita.io provides the complete Bhagavad Gita with authentic commentaries from 20+ revered scholars including Adi Shankaracharya, Ramanujacharya, Madhvacharya, Swami Sivananda, and many other traditional and modern commentators. Multiple translations are available in Hindi, English, and Sanskrit.",
    },
    {
      question: "Can I read Bhagavad Gita in Hindi and English?",
      answer:
        "Yes, BhagavadGita.io offers complete Bhagavad Gita in both Hindi and English languages. You can read all 700 verses with translations, transliterations, and word-by-word meanings in both languages along with Sanskrit originals.",
    },
    {
      question: "What is the main message of the Bhagavad Gita?",
      answer:
        "The main message of the Bhagavad Gita is to perform one's duty (dharma) without attachment to results, practice devotion to God, and understand the eternal nature of the soul. It teaches about karma yoga, bhakti yoga, jnana yoga, and the path to moksha (liberation).",
    },
    {
      question: "What are the different yogas explained in Bhagavad Gita?",
      answer:
        "The Bhagavad Gita explains three main yogas: Karma Yoga (path of selfless action), Bhakti Yoga (path of devotion), and Jnana Yoga (path of knowledge). It also discusses Dhyana Yoga (meditation), Raja Yoga, and other spiritual practices for self-realization and moksha.",
    },
  ];

  const faqsHindi: FAQItem[] = [
    {
      question: "भगवद गीता में कितने अध्याय हैं?",
      answer:
        "श्रीमद् भगवद गीता में कुल 18 अध्याय और 700 श्लोक हैं। यह महाभारत के भीष्म पर्व का हिस्सा है जिसमें भगवान श्री कृष्ण ने अर्जुन को उपदेश दिया।",
    },
    {
      question: "भगवद गीता किसने लिखी?",
      answer:
        "भगवद गीता की रचना महर्षि वेद व्यास जी ने की थी। यह भगवान श्री कृष्ण और अर्जुन के बीच कुरुक्षेत्र युद्ध के मैदान में हुए संवाद का संग्रह है।",
    },
    {
      question: "भगवद गीता पढ़ने के क्या लाभ हैं?",
      answer:
        "भगवद गीता जीवन के सभी प्रश्नों का समाधान देती है। यह कर्म योग, भक्ति योग, ज्ञान योग और ध्यान योग का मार्गदर्शन करती है तथा मन को शांति और जीवन को सही दिशा प्रदान करती है।",
    },
    {
      question: "क्या भगवद गीता टीका के साथ उपलब्ध है?",
      answer:
        "हाँ, BhagavadGita.io पर भगवद गीता 20+ प्रामाणिक आचार्यों की टीका के साथ उपलब्ध है जिनमें आदि शंकराचार्य, रामानुजाचार्य, माधवाचार्य, स्वामी शिवानंद आदि शामिल हैं। हिंदी, अंग्रेजी और संस्कृत में अनुवाद उपलब्ध हैं।",
    },
    {
      question: "क्या भगवद गीता हिंदी और अंग्रेजी में पढ़ सकते हैं?",
      answer:
        "हाँ, BhagavadGita.io पर संपूर्ण भगवद गीता हिंदी और अंग्रेजी दोनों भाषाओं में उपलब्ध है। आप सभी 700 श्लोक संस्कृत, हिंदी और अंग्रेजी अनुवाद, शब्दार्थ और टीका के साथ पढ़ सकते हैं।",
    },
    {
      question: "भगवद गीता का मुख्य संदेश क्या है?",
      answer:
        "भगवद गीता का मुख्य संदेश है कि बिना फल की इच्छा के अपने कर्तव्य का पालन करें, भगवान में भक्ति रखें और आत्मा की अमरता को समझें। यह कर्म योग, भक्ति योग, ज्ञान योग और मोक्ष का मार्ग सिखाती है।",
    },
    {
      question: "भगवद गीता में कौन से योग बताए गए हैं?",
      answer:
        "भगवद गीता में तीन मुख्य योग बताए गए हैं: कर्म योग (निष्काम कर्म का मार्ग), भक्ति योग (भक्ति का मार्ग) और ज्ञान योग (ज्ञान का मार्ग)। इसके अलावा ध्यान योग, राज योग और आत्म-साक्षात्कार के अन्य आध्यात्मिक अभ्यास भी बताए गए हैं।",
    },
  ];

  const faqs = locale === "hi" ? faqsHindi : faqsEnglish;

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="relative bg-gradient-to-b from-transparent via-accent/20 to-transparent py-20">
      <div className="pointer-events-none absolute inset-0 z-[-2] bg-[radial-gradient(circle_at_80%_30%,rgba(251,146,60,0.07)_0%,transparent_60%)]" />
      <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="mb-4 text-center text-3xl font-bold text-foreground md:text-4xl">
            {translate("Frequently Asked Questions")}
          </h2>
          <p className="mb-12 text-center text-lg text-foreground/70 md:text-xl">
            {translate("Everything you need to know about the Bhagavad Gita")}
          </p>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="rounded-lg border-2 border-border bg-white shadow-lg transition-all hover:shadow-xl dark:bg-card"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="flex w-full items-start justify-between p-6 text-left transition-all hover:bg-accent/30"
                  aria-expanded={openIndex === index}
                  aria-controls={`faq-answer-${index}`}
                >
                  <h3 className="pr-4 text-lg font-semibold text-foreground">
                    {faq.question}
                  </h3>
                  <motion.span
                    animate={{ rotate: openIndex === index ? 45 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="shrink-0 text-2xl font-bold text-primary"
                    aria-hidden="true"
                  >
                    +
                  </motion.span>
                </button>

                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                      id={`faq-answer-${index}`}
                      role="region"
                    >
                      <div className="border-t border-border p-6 pt-4">
                        <p className="text-base leading-relaxed text-foreground/90">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default FAQ;
