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
      question: "When was the Bhagavad Gita written?",
      answer:
        "The Bhagavad Gita is traditionally believed to have been narrated around 5,000 years ago during the Kurukshetra war. It was composed by Sage Ved Vyasa as part of the Mahabharata epic. The exact historical dating is debated by scholars, but the text itself describes events from the ancient Dvapara Yuga.",
    },
    {
      question: "What is the Mahabharata and how is the Gita related to it?",
      answer:
        "The Mahabharata is one of the two major Sanskrit epics of ancient India, composed by Ved Vyasa. The Bhagavad Gita appears in the Bhishma Parva (chapters 23-40) of the Mahabharata. While the Mahabharata narrates the entire story of the Kuru dynasty and the great war, the Gita specifically contains Lord Krishna's teachings to Arjuna on the battlefield.",
    },
    {
      question: "Who are the Pandavas and Kauravas?",
      answer:
        "The Pandavas and Kauravas were two branches of the Kuru dynasty. The five Pandava brothers (Yudhishthira, Bhima, Arjuna, Nakula, and Sahadeva) and the hundred Kaurava brothers led by Duryodhana fought the Kurukshetra war for the throne of Hastinapura. The Bhagavad Gita dialogue occurs just before this war begins, with Arjuna as one of the Pandava warriors.",
    },
    {
      question: "Why did Krishna speak the Bhagavad Gita to Arjuna?",
      answer:
        "Krishna spoke the Bhagavad Gita to Arjuna when the great warrior became overwhelmed with grief and refused to fight, seeing his relatives and teachers in the opposing army. Arjuna's existential crisis about dharma (duty), karma (action), and the consequences of war prompted Krishna to reveal profound spiritual wisdom about life, death, the eternal soul, and one's responsibilities.",
    },
    {
      question: "What languages is the Bhagavad Gita available in?",
      answer:
        "The Bhagavad Gita was originally composed in Sanskrit. Today, it has been translated into virtually every major language worldwide. BhagavadGita.io provides the complete text in Sanskrit with translations in Hindi and English, along with transliterations and word-by-word meanings for better understanding.",
    },
    {
      question: "What is the significance of Kurukshetra in the Bhagavad Gita?",
      answer:
        "Kurukshetra is the battlefield where the Mahabharata war took place and where Lord Krishna delivered the Bhagavad Gita teachings. Located in present-day Haryana, India, Kurukshetra is considered a sacred place. The battlefield setting is symbolic - representing the internal battle between good and evil, duty and desire, that every human faces in life.",
    },
  ];

  const faqsHindi: FAQItem[] = [
    {
      question: "भगवद गीता कब लिखी गई थी?",
      answer:
        "भगवद गीता लगभग 5,000 वर्ष पूर्व कुरुक्षेत्र युद्ध के समय कही गई थी। इसकी रचना महर्षि वेद व्यास ने महाभारत के भाग के रूप में की थी। ऐतिहासिक तिथि पर विद्वानों में मतभेद हैं, लेकिन ग्रंथ स्वयं द्वापर युग की घटनाओं का वर्णन करता है।",
    },
    {
      question: "महाभारत क्या है और गीता का इससे क्या संबंध है?",
      answer:
        "महाभारत प्राचीन भारत के दो प्रमुख संस्कृत महाकाव्यों में से एक है, जिसकी रचना वेद व्यास जी ने की थी। भगवद गीता महाभारत के भीष्म पर्व (अध्याय 23-40) में आती है। जहां महाभारत कुरु वंश और महायुद्ध की पूरी कथा बताता है, वहीं गीता विशेष रूप से युद्धभूमि में श्री कृष्ण द्वारा अर्जुन को दी गई शिक्षाओं को प्रस्तुत करती है।",
    },
    {
      question: "पांडव और कौरव कौन थे?",
      answer:
        "पांडव और कौरव कुरु वंश की दो शाखाएं थीं। पांच पांडव भाई (युधिष्ठिर, भीम, अर्जुन, नकुल और सहदेव) और दुर्योधन के नेतृत्व में सौ कौरव भाइयों ने हस्तिनापुर के सिंहासन के लिए कुरुक्षेत्र युद्ध लड़ा। भगवद गीता का संवाद इसी युद्ध से ठीक पहले होता है, जिसमें अर्जुन पांडव योद्धाओं में से एक हैं।",
    },
    {
      question: "कृष्ण ने अर्जुन को भगवद गीता क्यों सुनाई?",
      answer:
        "श्री कृष्ण ने अर्जुन को भगवद गीता तब सुनाई जब महान योद्धा अपने रिश्तेदारों और गुरुओं को विपक्षी सेना में देखकर शोक से व्याकुल हो गए और युद्ध करने से इनकार कर दिया। धर्म (कर्तव्य), कर्म और युद्ध के परिणामों को लेकर अर्जुन के अस्तित्वगत संकट ने कृष्ण को जीवन, मृत्यु, अनश्वर आत्मा और किसी के दायित्वों के बारे में गहन आध्यात्मिक ज्ञान प्रकट करने के लिए प्रेरित किया।",
    },
    {
      question: "भगवद गीता किन भाषाओं में उपलब्ध है?",
      answer:
        "भगवद गीता मूल रूप से संस्कृत में रची गई थी। आज यह दुनिया की लगभग हर प्रमुख भाषा में अनुवादित हो चुकी है। BhagavadGita.io पर संपूर्ण पाठ संस्कृत में हिंदी और अंग्रेजी अनुवाद, लिप्यंतरण और शब्दार्थ के साथ उपलब्ध है।",
    },
    {
      question: "भगवद गीता में कुरुक्षेत्र का क्या महत्व है?",
      answer:
        "कुरुक्षेत्र वह युद्धभूमि है जहां महाभारत युद्ध हुआ था और जहां भगवान कृष्ण ने भगवद गीता का उपदेश दिया था। वर्तमान हरियाणा, भारत में स्थित कुरुक्षेत्र को एक पवित्र स्थान माना जाता है। युद्धभूमि की स्थापना प्रतीकात्मक है - यह अच्छाई और बुराई, कर्तव्य और इच्छा के बीच आंतरिक संघर्ष का प्रतिनिधित्व करती है जो हर मनुष्य जीवन में सामना करता है।",
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

