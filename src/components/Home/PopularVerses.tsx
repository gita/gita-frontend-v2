"use client";

import { useState } from "react";
import Image from "next/image";

import LinkWithLocale from "components/LinkWithLocale";
import { getTranslate } from "shared/translate";

interface PopularVerse {
  chapter: number;
  verse: string;
  category: string;
  summary: string;
}

const popularVerses: PopularVerse[] = [
  {
    chapter: 2,
    verse: "47",
    category: "Karma Yog",
    summary: "Emphasizes performing one's duty without attachment to the results.",
  },
  {
    chapter: 4,
    verse: "7",
    category: "Avatar Vani",
    summary: "Krishna declares He incarnates whenever righteousness declines.",
  },
  {
    chapter: 4,
    verse: "8",
    category: "Avatar Vani",
    summary: "Explains the purpose of His incarnations: to protect the good and destroy the wicked.",
  },
  {
    chapter: 18,
    verse: "66",
    category: "Moksha",
    summary: "Urges to abandon all forms of dharma and surrender to Krishna for liberation.",
  },
  {
    chapter: 2,
    verse: "20",
    category: "Sankhya Yog",
    summary: "Describes the soul as eternal, neither born nor dying.",
  },
  {
    chapter: 3,
    verse: "9",
    category: "Karma Yog",
    summary: "Work should be done as a sacrifice to avoid bondage.",
  },
  {
    chapter: 6,
    verse: "5",
    category: "Dhyana Yog",
    summary: "One must elevate oneself by one's own mind, not degrade oneself.",
  },
  {
    chapter: 2,
    verse: "14",
    category: "Sankhya Yog",
    summary: "Teaches about the temporary nature of pleasure and pain.",
  },
  {
    chapter: 10,
    verse: "8",
    category: "Vibhuti Yog",
    summary: "Krishna is the source of all spiritual and material worlds.",
  },
  {
    chapter: 9,
    verse: "22",
    category: "Bhakti Yog",
    summary: "For devoted worshippers, Krishna provides and preserves their needs.",
  },
  {
    chapter: 3,
    verse: "20-21",
    category: "Karma Yog",
    summary: "People follow the example set by great individuals.",
  },
  {
    chapter: 11,
    verse: "32",
    category: "Vishvarupa Darshana Yog",
    summary: "Krishna reveals Himself as Time, the destroyer of worlds.",
  },
  {
    chapter: 2,
    verse: "12",
    category: "Sankhya Yog",
    summary: "Krishna begins teaching about the nature of the soul.",
  },
  {
    chapter: 6,
    verse: "6",
    category: "Dhyana Yog",
    summary: "The mind can be one's friend or enemy.",
  },
  {
    chapter: 12,
    verse: "12",
    category: "Bhakti Yog",
    summary: "Qualities of a true devotee: non-envious, friendly, and compassionate.",
  },
  {
    chapter: 2,
    verse: "27",
    category: "Sankhya Yog",
    summary: "Death is certain for the born; rebirth is certain for the dead.",
  },
  {
    chapter: 5,
    verse: "18",
    category: "Karma Sannyasa Yog",
    summary: "The wise see all beings with equal vision.",
  },
  {
    chapter: 7,
    verse: "14",
    category: "Jnana Vijnana Yog",
    summary: "Divine energy (Maya) is hard to overcome without surrendering to Krishna.",
  },
  {
    chapter: 8,
    verse: "6",
    category: "Akshara Brahma Yog",
    summary: "Whatever one thinks of at the time of death, that state one attains.",
  },
  {
    chapter: 17,
    verse: "3",
    category: "Shraddhatraya Vibhaga Yog",
    summary: "A person's faith corresponds to their inherent nature.",
  },
  {
    chapter: 10,
    verse: "10",
    category: "Bhakti Yog",
    summary: "Krishna grants understanding to devoted worshippers to reach Him.",
  },
  {
    chapter: 2,
    verse: "16",
    category: "Sankhya Yog",
    summary: "The unreal has no existence; the real never ceases to be.",
  },
  {
    chapter: 13,
    verse: "22",
    category: "Kshetra Kshetrajna Vibhaga Yog",
    summary: "The soul experiences birth and death due to attachment to material nature.",
  },
  {
    chapter: 2,
    verse: "7",
    category: "Sankhya Yog",
    summary: "Arjuna surrenders to Krishna, seeking guidance.",
  },
  {
    chapter: 2,
    verse: "31",
    category: "Sankhya Yog",
    summary: "One should not waver from their duty as a warrior.",
  },
  {
    chapter: 16,
    verse: "21",
    category: "Daivasura Sampad Vibhaga Yog",
    summary: "Desire, anger, and greed are gates to hell.",
  },
  {
    chapter: 3,
    verse: "27",
    category: "Karma Yog",
    summary: "All actions are performed by nature; the self, deluded by ego, thinks 'I am the doer.'",
  },
  {
    chapter: 9,
    verse: "4",
    category: "Raja Vidya Raja Guhya Yog",
    summary: "Krishna pervades and supports the entire universe.",
  },
  {
    chapter: 18,
    verse: "65",
    category: "Moksha",
    summary: "Directs to fix the mind on Krishna, be devoted, and one will come to Him.",
  },
  {
    chapter: 15,
    verse: "7",
    category: "Purushottama Yog",
    summary: "Living entities are eternal fragments of Krishna.",
  },
  {
    chapter: 6,
    verse: "47",
    category: "Dhyana Yog",
    summary: "The yogi with great faith who always abides in Krishna is the highest.",
  },
];

interface PopularVersesProps extends LocaleAndTranslations {}

const PopularVerses = ({ locale, translations }: PopularVersesProps) => {
  const translate = getTranslate(translations, locale);
  const [scrollPosition, setScrollPosition] = useState(0);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    setScrollPosition(e.currentTarget.scrollLeft);
  };

  return (
    <div className="relative my-14 py-10">
      <Image
        src="/bg-verses-fixed.png"
        alt="BG Popular Verses Background"
        fill
        style={{
          objectFit: "cover",
          objectPosition: "center",
        }}
        className="z-[-1]"
      />
      <div className="z-50 mx-auto max-w-7xl px-4 sm:px-6">
        <div>
          <h2 className="mb-6 text-4xl font-bold dark:text-white">
            {translate("Popular Verses")}
          </h2>
          <p className="mb-10 text-lg text-gray-600 dark:text-gray-300">
            {translate("Discover the most profound verses from the Bhagavad Gita")}
          </p>
          
          <div className="relative">
            {/* Horizontal scrollable container */}
            <div
              className="no-scrollbar flex gap-4 overflow-x-auto pb-4"
              onScroll={handleScroll}
              style={{
                scrollBehavior: "smooth",
              }}
            >
              {popularVerses.map((verse, index) => (
                <LinkWithLocale
                  key={`${verse.chapter}-${verse.verse}`}
                  href={`/chapter/${verse.chapter}/verse/${verse.verse}`}
                  prefetch={false}
                  className="z-10 flex min-w-[320px] flex-col rounded-md border-2 border-white bg-white p-6 drop-shadow-card hover:cursor-pointer hover:border-2 hover:border-box-stroke hover:bg-box-bg hover:shadow-none dark:border-dark-bg dark:bg-dark-100 dark:text-gray-200 dark:hover:border-dark-100 dark:hover:bg-dark-bg sm:min-w-[360px]"
                >
                  <div className="mb-2 flex items-center justify-between">
                    <h3 className="text-lg font-bold text-my-orange">
                      {translate("Verse")} {verse.chapter}.{verse.verse}
                    </h3>
                    <span className="rounded-full bg-my-orange/10 px-3 py-1 text-xs font-medium text-my-orange dark:bg-my-orange/20">
                      {verse.category}
                    </span>
                  </div>
                  
                  <p className="mt-3 flex-1 text-gray-600 dark:text-gray-300">
                    {verse.summary}
                  </p>

                  <div className="mt-4 flex items-center text-sm font-medium text-my-orange">
                    {translate("Read full verse")} →
                  </div>
                </LinkWithLocale>
              ))}
            </div>
            
            {/* Scroll indicator hint */}
            <div className="mt-4 text-center text-sm text-gray-500 dark:text-gray-400 md:hidden">
              ← {translate("Scroll to explore more")} →
            </div>
          </div>
        </div>
      </div>
      
      {/* Custom CSS to hide scrollbar */}
      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default PopularVerses;

