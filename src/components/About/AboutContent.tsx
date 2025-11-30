"use client";

import { getTranslate } from "shared/translate";

interface AboutContentProps extends LocaleAndTranslations {}

const AboutContent = ({ locale, translations }: AboutContentProps) => {
  const translate = getTranslate(translations, locale);

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 font-inter dark:bg-dark-bg dark:text-gray-200 sm:px-6">
      {/* Main Introduction */}
      <section className="mb-12">
        <h2 className="mb-6 text-3xl font-bold dark:text-white">
          {translate("What is the Bhagavad Gita?")}
        </h2>
        <p className="mb-4 text-lg leading-relaxed text-gray-700 dark:text-gray-300">
          {translate(
            'The Bhagavad Gita, also known as the Gita - "The Song of The Lord" is a 700-verse Hindu scripture that is part of the epic Mahabharata. It is a sacred dialogue between Lord Krishna and the warrior prince Arjuna on the battlefield of Kurukshetra.',
          )}
        </p>
        <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
          {translate(
            "The Gita provides practical guidance on life, dharma (righteousness), karma (action), bhakti (devotion), and jnana (knowledge). It teaches how to achieve inner peace, fulfill one's duty, and attain moksha (spiritual liberation).",
          )}
        </p>
      </section>

      {/* The Mahabharata Context */}
      <section className="mb-12">
        <h2 className="mb-6 text-3xl font-bold dark:text-white">
          {translate("The Mahabharata Context")}
        </h2>
        <p className="mb-4 text-lg leading-relaxed text-gray-700 dark:text-gray-300">
          {translate(
            "The Bhagavad Gita appears in the Bhishma Parva (Book of Bhishma) of the Mahabharata, the great Indian epic composed by Ved Vyasa. The Mahabharata narrates the story of two royal families - the Pandavas and Kauravas - and their struggle for the throne of Hastinapura.",
          )}
        </p>
        <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
          {translate(
            "The Gita's dialogue takes place just before the Kurukshetra war begins. Arjuna, one of the five Pandava brothers, faces an inner crisis when he sees his relatives, teachers, and friends on the opposing side. This moral dilemma becomes the setting for Krishna's divine discourse.",
          )}
        </p>
      </section>

      {/* Ved Vyasa */}
      <section className="mb-12">
        <h2 className="mb-6 text-3xl font-bold dark:text-white">
          {translate("Ved Vyasa - The Author")}
        </h2>
        <p className="mb-4 text-lg leading-relaxed text-gray-700 dark:text-gray-300">
          {translate(
            "Ved Vyasa, also known as Vyasadeva or Krishna Dvaipayana, is revered as one of the greatest sages in Hindu tradition. He is credited with composing the Mahabharata, compiling the four Vedas, and writing the 18 Puranas.",
          )}
        </p>
        <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
          {translate(
            "Vyasa not only authored the Mahabharata but also appears as a character in it. His contribution to preserving and organizing ancient Vedic knowledge has earned him the title 'Veda Vyasa' - the one who classified the Vedas.",
          )}
        </p>
      </section>

      {/* Lord Krishna */}
      <section className="mb-12">
        <h2 className="mb-6 text-3xl font-bold dark:text-white">
          {translate("Lord Krishna - The Divine Teacher")}
        </h2>
        <p className="mb-4 text-lg leading-relaxed text-gray-700 dark:text-gray-300">
          {translate(
            "Lord Krishna is the central figure and speaker of the Bhagavad Gita. He is considered the eighth avatar (incarnation) of Lord Vishnu and is revered as the Supreme Being in many Hindu traditions.",
          )}
        </p>
        <p className="mb-4 text-lg leading-relaxed text-gray-700 dark:text-gray-300">
          {translate(
            "In the Gita, Krishna serves as Arjuna's charioteer and guide. He reveals profound spiritual truths about the nature of the soul (atman), the Supreme Reality (Brahman), karma yoga, bhakti yoga, and jnana yoga. In Chapter 11, Krishna displays his Vishvarupa (universal form) to Arjuna.",
          )}
        </p>
        <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
          {translate(
            "Krishna's teachings emphasize performing one's duty without attachment to results, devotion to God, and understanding the eternal nature of the soul beyond the physical body.",
          )}
        </p>
      </section>

      {/* Arjuna */}
      <section className="mb-12">
        <h2 className="mb-6 text-3xl font-bold dark:text-white">
          {translate("Arjuna - The Devoted Disciple")}
        </h2>
        <p className="mb-4 text-lg leading-relaxed text-gray-700 dark:text-gray-300">
          {translate(
            "Arjuna is the third of the five Pandava brothers and one of the greatest warriors in the Mahabharata. He is the son of King Pandu and Queen Kunti, and the friend and devotee of Lord Krishna.",
          )}
        </p>
        <p className="mb-4 text-lg leading-relaxed text-gray-700 dark:text-gray-300">
          {translate(
            "At the beginning of the Gita, Arjuna is overcome with doubt and compassion when he realizes he must fight against his own relatives, teachers like Dronacharya and Bhishma, and friends. He lays down his bow and arrows, refusing to fight.",
          )}
        </p>
        <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
          {translate(
            "Arjuna's questions and doubts represent the universal human struggles with duty, morality, and the meaning of life. His sincere seeking and willingness to learn make him the ideal student for Krishna's divine teachings.",
          )}
        </p>
      </section>

      {/* Sanjaya */}
      <section className="mb-12">
        <h2 className="mb-6 text-3xl font-bold dark:text-white">
          {translate("Sanjaya - The Narrator")}
        </h2>
        <p className="mb-4 text-lg leading-relaxed text-gray-700 dark:text-gray-300">
          {translate(
            "Sanjaya is the narrator of the Bhagavad Gita. He was the charioteer and advisor to the blind king Dhritarashtra, the father of the Kauravas. Ved Vyasa blessed Sanjaya with divine vision (divya-drishti) to witness the events of the battlefield from afar.",
          )}
        </p>
        <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
          {translate(
            "Sanjaya narrates the entire dialogue between Krishna and Arjuna to King Dhritarashtra, who cannot see the battle himself. The Gita is framed as Sanjaya's narration, beginning with his words and ending with his reflections on the divine discourse.",
          )}
        </p>
      </section>

      {/* The 18 Chapters */}
      <section className="mb-12">
        <h2 className="mb-6 text-3xl font-bold dark:text-white">
          {translate("The 18 Chapters of the Gita")}
        </h2>
        <p className="mb-4 text-lg leading-relaxed text-gray-700 dark:text-gray-300">
          {translate(
            "The Bhagavad Gita consists of 18 chapters, each focusing on different aspects of yoga (spiritual discipline) and philosophy:",
          )}
        </p>
        <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
          {translate(
            "The first six chapters deal with Karma Yoga (the yoga of action), the middle six with Bhakti Yoga (the yoga of devotion), and the final six with Jnana Yoga (the yoga of knowledge). Together, they provide a comprehensive spiritual guide covering action, devotion, knowledge, meditation, and the ultimate goal of self-realization.",
          )}
        </p>
      </section>

      {/* Timeless Relevance */}
      <section className="mb-12">
        <h2 className="mb-6 text-3xl font-bold dark:text-white">
          {translate("Timeless Relevance")}
        </h2>
        <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
          {translate(
            "Though spoken over 5,000 years ago, the Bhagavad Gita's teachings remain highly relevant today. It addresses universal questions about duty, ethics, the nature of reality, managing stress and anxiety, finding purpose in life, and spiritual growth. The Gita has been studied and revered by spiritual seekers, scholars, and leaders worldwide, including Mahatma Gandhi, who called it his 'spiritual dictionary.'",
          )}
        </p>
      </section>
    </div>
  );
};

export default AboutContent;
