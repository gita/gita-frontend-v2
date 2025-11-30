"use client";

import { useState } from "react";
import Image from "next/image";

import { getTranslate } from "shared/translate";

interface FAQItem {
  question: string;
  answer: string;
}

interface AboutFAQProps extends LocaleAndTranslations {}

const AboutFAQ = ({ locale, translations }: AboutFAQProps) => {
  const translate = getTranslate(translations, locale);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqsEnglish: FAQItem[] = [
    {
      question: "What is the historical context of the Bhagavad Gita?",
      answer:
        "The Bhagavad Gita is set during the Kurukshetra war, a climactic battle between the Pandavas and Kauravas described in the Mahabharata. This 18-day war represents the culmination of a long-standing conflict over succession to the throne of Hastinapura. The Gita's dialogue occurs on the first day, before battle begins, when Arjuna experiences a moral crisis seeing his loved ones on both sides.",
    },
    {
      question: "What role did Sanjaya play in preserving the Bhagavad Gita?",
      answer:
        "Sanjaya, blessed with divine vision by Ved Vyasa, narrated the entire Bhagavad Gita dialogue to the blind king Dhritarashtra who could not witness the battlefield events. Sanjaya served as both narrator and witness, ensuring that Krishna's teachings were preserved. The Gita is framed as Sanjaya's narration, making him crucial to the text's transmission through history.",
    },
    {
      question: "What are the three main paths (yogas) taught in the Gita?",
      answer:
        "The Bhagavad Gita teaches three primary spiritual paths: Karma Yoga (path of selfless action without attachment to results), Bhakti Yoga (path of loving devotion to God), and Jnana Yoga (path of knowledge and wisdom). These are complementary paths, not contradictory. The first six chapters focus on Karma Yoga, the middle six on Bhakti Yoga, and the final six on Jnana Yoga.",
    },
    {
      question: "What is the Vishvarupa Darshan in the Bhagavad Gita?",
      answer:
        "In Chapter 11, Krishna reveals His Vishvarupa (universal form) to Arjuna - a cosmic vision showing all of creation, past, present, and future within His divine form. This overwhelming vision demonstrates Krishna's true nature as the Supreme Being. Arjuna witnesses the entire universe, all beings, and even the outcome of the war within Krishna's form, proving His divine identity.",
    },
    {
      question: "How is the Bhagavad Gita structured across its 18 chapters?",
      answer:
        "The 18 chapters are organized into three sections of six chapters each. Chapters 1-6 primarily teach Karma Yoga and deal with action. Chapters 7-12 focus on Bhakti Yoga and devotion. Chapters 13-18 emphasize Jnana Yoga and knowledge. Each chapter is titled as a form of yoga (e.g., Karma Yoga, Bhakti Yoga, Sankhya Yoga), showing different aspects of the spiritual path to liberation.",
    },
    {
      question:
        "Why is the Bhagavad Gita considered relevant for modern times?",
      answer:
        "The Bhagavad Gita addresses universal human challenges: fulfilling duties while managing stress, making ethical decisions, finding life's purpose, dealing with loss and grief, and seeking spiritual growth. Its teachings on mindfulness, detachment, and selfless service apply to modern workplace ethics, leadership, and personal development. Leaders like Mahatma Gandhi and many contemporary thinkers have drawn inspiration from its wisdom for contemporary challenges.",
    },
  ];

  const faqsHindi: FAQItem[] = [
    {
      question: "भगवद गीता का ऐतिहासिक संदर्भ क्या है?",
      answer:
        "भगवद गीता कुरुक्षेत्र युद्ध के दौरान स्थापित है, जो महाभारत में वर्णित पांडवों और कौरवों के बीच एक निर्णायक युद्ध है। यह 18 दिवसीय युद्ध हस्तिनापुर के सिंहासन के उत्तराधिकार को लेकर लंबे समय से चले आ रहे संघर्ष का चरमोत्कर्ष है। गीता का संवाद पहले दिन होता है, युद्ध शुरू होने से पहले, जब अर्जुन दोनों पक्षों में अपने प्रियजनों को देखकर नैतिक संकट का अनुभव करते हैं।",
    },
    {
      question: "भगवद गीता को संरक्षित करने में संजय की क्या भूमिका थी?",
      answer:
        "वेद व्यास द्वारा दिव्य दृष्टि से आशीर्वादित संजय ने अंधे राजा धृतराष्ट्र को संपूर्ण भगवद गीता संवाद सुनाया, जो युद्धभूमि की घटनाओं को स्वयं नहीं देख सकते थे। संजय ने वर्णनकर्ता और साक्षी दोनों की भूमिका निभाई, यह सुनिश्चित करते हुए कि कृष्ण की शिक्षाएं संरक्षित रहें। गीता को संजय के वर्णन के रूप में प्रस्तुत किया गया है, जो उन्हें इतिहास के माध्यम से पाठ के संचरण के लिए महत्वपूर्ण बनाता है।",
    },
    {
      question: "गीता में सिखाए गए तीन मुख्य मार्ग (योग) कौन से हैं?",
      answer:
        "भगवद गीता तीन प्राथमिक आध्यात्मिक मार्ग सिखाती है: कर्म योग (परिणामों के प्रति आसक्ति के बिना निस्वार्थ कर्म का मार्ग), भक्ति योग (भगवान के प्रति प्रेमपूर्ण भक्ति का मार्ग), और ज्ञान योग (ज्ञान और विवेक का मार्ग)। ये पूरक मार्ग हैं, विरोधाभासी नहीं। पहले छह अध्याय कर्म योग पर, मध्य छह भक्ति योग पर और अंतिम छह ज्ञान योग पर केंद्रित हैं।",
    },
    {
      question: "भगवद गीता में विश्वरूप दर्शन क्या है?",
      answer:
        "अध्याय 11 में, कृष्ण अर्जुन को अपना विश्वरूप (सार्वभौमिक रूप) प्रकट करते हैं - एक ब्रह्मांडीय दृष्टि जो उनके दिव्य रूप के भीतर सभी सृष्टि, अतीत, वर्तमान और भविष्य को दिखाती है। यह अभिभूत करने वाली दृष्टि परम सत्ता के रूप में कृष्ण की वास्तविक प्रकृति को प्रदर्शित करती है। अर्जुन कृष्ण के रूप के भीतर संपूर्ण ब्रह्मांड, सभी प्राणियों और यहां तक कि युद्ध के परिणाम को भी देखते हैं, जो उनकी दिव्य पहचान को सिद्ध करता है।",
    },
    {
      question: "भगवद गीता के 18 अध्यायों की संरचना कैसे है?",
      answer:
        "18 अध्यायों को छह-छह अध्यायों के तीन खंडों में व्यवस्थित किया गया है। अध्याय 1-6 मुख्य रूप से कर्म योग सिखाते हैं और कर्म से संबंधित हैं। अध्याय 7-12 भक्ति योग और भक्ति पर केंद्रित हैं। अध्याय 13-18 ज्ञान योग और ज्ञान पर जोर देते हैं। प्रत्येक अध्याय को योग के एक रूप के रूप में शीर्षक दिया गया है (जैसे कर्म योग, भक्ति योग, सांख्य योग), जो मुक्ति के आध्यात्मिक मार्ग के विभिन्न पहलुओं को दर्शाता है।",
    },
    {
      question: "भगवद गीता को आधुनिक समय के लिए प्रासंगिक क्यों माना जाता है?",
      answer:
        "भगवद गीता सार्वभौमिक मानवीय चुनौतियों को संबोधित करती है: तनाव का प्रबंधन करते हुए कर्तव्यों को पूरा करना, नैतिक निर्णय लेना, जीवन का उद्देश्य खोजना, हानि और शोक से निपटना और आध्यात्मिक विकास की तलाश करना। माइंडफुलनेस, वैराग्य और निस्वार्थ सेवा पर इसकी शिक्षाएं आधुनिक कार्यस्थल नैतिकता, नेतृत्व और व्यक्तिगत विकास पर लागू होती हैं। महात्मा गांधी और कई समकालीन विचारकों ने समकालीन चुनौतियों के लिए इसकी बुद्धिमत्ता से प्रेरणा ली है।",
    },
  ];

  const faqs = locale === "hi" ? faqsHindi : faqsEnglish;

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="relative my-14 py-10">
      {/* Decorative divider */}
      <div className="mx-auto mb-16 max-w-4xl px-4 sm:px-6">
        <div className="flex items-center">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-my-orange to-transparent dark:via-my-orange/50"></div>
          <div className="mx-4">
            <svg
              className="h-8 w-8 text-my-orange"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z" />
            </svg>
          </div>
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-my-orange to-transparent dark:via-my-orange/50"></div>
        </div>
      </div>

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
            {translate(
              "Learn more about the history and context of the Bhagavad Gita",
            )}
          </p>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="rounded-md border-2 border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-dark-100"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="flex w-full items-start justify-between p-6 text-left transition-all hover:bg-gray-50 dark:hover:bg-dark-bg"
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

export default AboutFAQ;
