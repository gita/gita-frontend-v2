"use client";

import { motion, Variants } from "framer-motion";
import Image from "next/image";

import { getTranslate } from "shared/translate";

import Card from "./Card";

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const Chapters = ({ chapters, locale, translations }: ChaptersProps) => {
  const translate = getTranslate(translations, locale);

  return (
    <div className="relative bg-gradient-to-b from-transparent via-accent/20 to-transparent py-20">
      <div className="pointer-events-none absolute inset-0 z-[-2] bg-[radial-gradient(circle_at_30%_20%,rgba(251,146,60,0.08)_0%,transparent_60%)]" />
      <Image
        src="/bg-verses-fixed.png"
        alt="Bhagavad Gita chapters background illustration"
        fill
        style={{
          objectFit: "cover",
          objectPosition: "center",
        }}
        className="z-[-3] opacity-5"
      />
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="mb-10 text-center text-3xl font-bold text-foreground md:text-left md:text-4xl">
            {translate("Chapters")}
          </h2>
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 gap-6 md:grid-cols-2"
          >
            {chapters.map((chapter) => (
              <motion.div key={chapter.id} variants={item}>
                <Card chapter={chapter} translate={translate} />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Chapters;
