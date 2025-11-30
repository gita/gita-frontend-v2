"use client";

import { useEffect, useRef,useState } from "react";
import { motion, useInView, useMotionValueEvent,useScroll, useSpring, useTransform, Variants } from "framer-motion";
import { ChevronDown } from "lucide-react";

import LinkWithLocale from "components/LinkWithLocale";
import { getTranslate } from "shared/translate";

import { Button } from "@/components/ui/button";

// Stagger animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.4, 0.25, 1] as [number, number, number, number],
    },
  },
};

const buttonContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const buttonVariants: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.4, 0.25, 1] as [number, number, number, number],
    },
  },
};

const Banner = (props: LocaleAndTranslations) => {
  const { translations, locale } = props;
  const translate = getTranslate(translations, locale);
  
  const [isLoaded, setIsLoaded] = useState(false);
  const [isParallaxActive, setIsParallaxActive] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(contentRef, { once: true });

  // Smooth parallax scroll effect
  const { scrollY } = useScroll();
  
  // Track scroll position to disable parallax after hero section
  useMotionValueEvent(scrollY, "change", (latest) => {
    // Disable parallax once user scrolls past 70% of viewport height
    const heroHeight = window.innerHeight * 0.7;
    setIsParallaxActive(latest < heroHeight);
  });
  
  // Use spring for smoother parallax
  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  
  // Parallax transformations - only active when in hero section
  const imageY = useTransform(scrollY, [0, 500], [0, isParallaxActive ? 150 : 0]);
  const imageScale = useTransform(scrollY, [0, 500], [1, isParallaxActive ? 1.1 : 1]);
  const contentY = useTransform(scrollY, [0, 300], [0, isParallaxActive ? 50 : 0]);
  const overlayOpacity = useTransform(scrollY, [0, 300], [0.25, 0.5]);
  
  // Apply spring physics for smoothness
  const smoothImageY = useSpring(imageY, springConfig);
  const smoothImageScale = useSpring(imageScale, springConfig);
  const smoothContentY = useSpring(contentY, springConfig);

  useEffect(() => {
    // Small delay to ensure smooth initial animation
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const scrollToChapters = () => {
    const chaptersSection = document.querySelector("main > div:nth-child(2)");
    if (chaptersSection) {
      chaptersSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div 
      ref={containerRef}
      className="relative flex max-h-[75vh] min-h-[75vh] items-center overflow-hidden"
    >
      {/* Parallax Background Image with smooth motion */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{
          y: isParallaxActive ? smoothImageY : 0,
          scale: isParallaxActive ? smoothImageScale : 1,
        }}
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ 
          opacity: isLoaded ? 1 : 0,
          scale: isLoaded ? 1 : 1.1,
        }}
        transition={{ duration: 2, ease: "easeOut" }}
      >
        <picture>
          <source
            media="(min-width:1536px)"
            srcSet="/images/hero/bhagavad-gita-21x9-1152x495.webp 1152w, /images/hero/bhagavad-gita-21x9-2304x990.webp 2304w"
            sizes="100vw"
            type="image/webp"
          />
          <source
            media="(min-width:1024px)"
            srcSet="/images/hero/bhagavad-gita-16x9-1152x648.webp 1152w, /images/hero/bhagavad-gita-16x9-2304x1296.webp 2304w"
            sizes="100vw"
            type="image/webp"
          />
          <source
            media="(min-width:640px)"
            srcSet="/images/hero/bhagavad-gita-4x3-1024x768.webp 1024w, /images/hero/bhagavad-gita-4x3-2048x1536.webp 2048w"
            sizes="100vw"
            type="image/webp"
          />
          <img
            src="/images/hero/bhagavad-gita-3x4-576x768.webp"
            srcSet="/images/hero/bhagavad-gita-3x4-576x768.webp 576w, /images/hero/bhagavad-gita-3x4-1152x1536.webp 1152w"
            sizes="100vw"
            alt="Bhagavad Gita hero banner showing Lord Krishna and Arjuna"
            className="size-full object-cover"
            loading="eager"
          />
        </picture>
      </motion.div>

      {/* Animated Gradient Overlay */}
      <motion.div 
        className="absolute inset-0 z-10 bg-black"
        style={{ opacity: overlayOpacity }}
      />
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-transparent via-transparent to-prakash-bg dark:to-nisha-bg" />

      {/* Animated Color Tint */}
      <motion.div 
        className="absolute inset-0 z-[5] bg-orange-700/10 mix-blend-multiply dark:bg-orange-900/20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.5 }}
      />

      {/* Content with staggered animations */}
      <motion.div 
        ref={contentRef}
        className="container relative z-20 mx-auto max-w-7xl px-4 py-12 text-center md:py-16 lg:py-20"
        style={{ y: isParallaxActive ? smoothContentY : 0 }}
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Main Title with staggered reveal */}
          <motion.h1 
            variants={itemVariants}
            className="font-inter text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl"
          >
            <motion.span 
              className="block text-white drop-shadow-xl [text-shadow:_0_2px_10px_rgb(0_0_0_/_40%)]"
            >
              {translate("Bhagavad Gita in")}
            </motion.span>
            <motion.span 
              className="mt-2 block text-white drop-shadow-xl [text-shadow:_0_2px_10px_rgb(0_0_0_/_40%)]"
            >
              {translate("Hindi & English with Audio")}
            </motion.span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p 
            variants={itemVariants}
            className="mx-auto mt-5 max-w-2xl text-lg text-white drop-shadow-xl [text-shadow:_0_2px_10px_rgb(0_0_0_/_40%)] md:text-xl"
          >
            {translate("Read, study, and practice the eternal wisdom of Lord Krishna's Bhagavad Gita")}
          </motion.p>

          {/* CTA Buttons with hover effects */}
          <motion.div 
            variants={buttonContainerVariants}
            className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <motion.div variants={buttonVariants}>
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Button 
                  asChild 
                  size="lg" 
                  className="bg-primary text-white shadow-xl shadow-primary/30 transition-all duration-200 hover:bg-orange-700 hover:shadow-2xl hover:shadow-primary/40"
                >
                  <LinkWithLocale href={"/chapter/1"}>
                    {translate("Read now")}
                  </LinkWithLocale>
                </Button>
              </motion.div>
            </motion.div>

            <motion.div variants={buttonVariants}>
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Button 
                  size="lg" 
                  variant="outline" 
                  asChild 
                  className="border-2 border-transparent bg-white text-black shadow-xl transition-all duration-200 hover:bg-gray-100"
                >
                  <LinkWithLocale href={"/about"}>
                    {translate("Learn more")}
                  </LinkWithLocale>
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Animated Scroll Indicator */}
      <motion.div 
        className="absolute inset-x-0 bottom-6 z-20 flex justify-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isLoaded ? 0.8 : 0, y: isLoaded ? 0 : 20 }}
        transition={{ duration: 0.8, delay: 1.5 }}
      >
        <motion.button
          onClick={scrollToChapters}
          className="group rounded-full p-2 transition-all hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-primary"
          aria-label="Scroll down to view chapters"
          animate={{ y: [0, 8, 0] }}
          transition={{ 
            duration: 2, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ChevronDown className="size-8 text-white drop-shadow-lg transition-colors group-hover:text-primary" />
        </motion.button>
      </motion.div>

      {/* Bottom gradient fade for smooth transition */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[15] h-32 bg-gradient-to-t from-prakash-bg via-prakash-bg/50 to-transparent dark:from-nisha-bg dark:via-nisha-bg/50" />
    </div>
  );
};

export default Banner;
