import {
  BookOpen,
  Briefcase,
  Compass,
  Feather,
  GraduationCap,
  Heart,
  Scroll,
  Target,
  Users,
} from "lucide-react";
import { ArrowRight } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

import { paramsToLocale } from "shared/functions";
import { getTranslate } from "shared/translate";
import { getTranslations } from "shared/translate/server";

import { getJsonLdFirst, getJsonLdTwo } from "./constants";

import { EnhancedCharacterCard } from "@/components/blocks/cards";
import { VedicPattern } from "@/components/blocks/decorative";
import {
  ChaptersOverviewSection,
  CTASection,
  EnhancedHero,
  EpicStorySection,
  ModernRelevanceSection,
  WhatIsGitaSection,
} from "@/components/blocks/page-sections";
import FAQ from "@/components/Home/FAQ";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/ui/section-header";

// Force static generation for better SEO
export const dynamic = "force-static";

// Pre-generate both English and Hindi versions
export async function generateStaticParams() {
  return [{ locale: ["en"] }, { locale: ["hi"] }];
}

export async function generateMetadata({
  params: paramsPromise,
}: ParamsWithLocale): Promise<Metadata> {
  const params = await paramsPromise;
  const locale = paramsToLocale(params);
  const isHindi = locale === "hi";
  const baseUrl = "https://bhagavadgita.io";

  return {
    title: isHindi
      ? "भगवद गीता के बारे में - कृष्ण की शिक्षाएं | महाभारत"
      : "About Bhagavad Gita - Krishna's Teachings to Arjuna | Mahabharata",
    description: isHindi
      ? "भगवद गीता की खोज करें: भगवान कृष्ण से अर्जुन को कालातीत ज्ञान के 700 श्लोक। वेद व्यास द्वारा रचित, गणेश जी द्वारा लिखित। महाभारत संदर्भ, प्रमुख पात्रों और गीता की प्रासंगिकता के बारे में जानें।"
      : "Discover the Bhagavad Gita: 700 verses of timeless wisdom from Lord Krishna to Arjuna. Authored by Ved Vyasa, scribed by Ganesh ji. Learn about the epic Mahabharata context, key characters, and why the Gita remains relevant today.",
    keywords: isHindi
      ? "भगवद गीता, भगवद गीता के बारे में, भगवान कृष्ण, अर्जुन, वेद व्यास, गणेश जी, महाभारत, हिंदू धर्मग्रंथ, धर्म, कर्म योग, भक्ति योग, ज्ञान योग, कुरुक्षेत्र, संजय, आध्यात्मिक ज्ञान"
      : "Bhagavad Gita, about Bhagavad Gita, Lord Krishna, Arjuna, Ved Vyasa, Ganesh ji, Mahabharata, Hindu scripture, dharma, karma yoga, bhakti yoga, jnana yoga, Kurukshetra, Sanjaya, spiritual wisdom",
    authors: [{ name: "Ved Vyasa" }],
    publisher: "Ved Vyas Foundation",
    openGraph: {
      title: isHindi
        ? "भगवद गीता के बारे में - कृष्ण की शिक्षाएं | महाभारत"
        : "About Bhagavad Gita - Krishna's Teachings to Arjuna | Mahabharata",
      description: isHindi
        ? "भगवद गीता की खोज करें: भगवान कृष्ण से अर्जुन को कालातीत ज्ञान के 700 श्लोक। महाभारत संदर्भ, वेद व्यास, गणेश जी और प्रमुख पात्रों के बारे में जानें।"
        : "Discover the Bhagavad Gita: 700 verses of timeless wisdom from Lord Krishna to Arjuna. Learn about the Mahabharata context, Ved Vyasa, Ganesh ji, and key characters.",
      url: isHindi ? `${baseUrl}/hi/about` : `${baseUrl}/about`,
      siteName: "Bhagavad Gita",
      locale: isHindi ? "hi_IN" : "en_US",
      type: "website",
      images: [
        {
          url: "https://bhagavadgita.io/_next/image?url=%2Fbanner2.png&w=3840&q=75",
          secureUrl:
            "https://bhagavadgita.io/_next/image?url=%2Fbanner2.png&w=3840&q=75",
          height: 1080,
          width: 1920,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: isHindi
        ? "भगवद गीता के बारे में - कृष्ण की शिक्षाएं | महाभारत"
        : "About Bhagavad Gita - Krishna's Teachings to Arjuna | Mahabharata",
      description: isHindi
        ? "भगवद गीता की खोज करें: भगवान कृष्ण से अर्जुन को कालातीत ज्ञान के 700 श्लोक। महाभारत संदर्भ, वेद व्यास और प्रमुख पात्रों के बारे में जानें।"
        : "Discover the Bhagavad Gita: 700 verses of timeless wisdom from Lord Krishna to Arjuna. Learn about the Mahabharata context, Ved Vyasa, and key characters.",
      images: [
        "https://bhagavadgita.io/_next/image?url=%2Fbanner2.png&w=3840&q=75",
      ],
      site: "@ShriKrishna",
    },
    alternates: {
      canonical: isHindi ? `${baseUrl}/hi/about` : `${baseUrl}/about`,
      languages: {
        "x-default": `${baseUrl}/about`,
        en: `${baseUrl}/about`,
        hi: `${baseUrl}/hi/about`,
      },
    },
  };
}

export default async function About(props: ParamsWithLocale) {
  const { params: paramsPromise } = props;
  const params = await paramsPromise;
  const locale = paramsToLocale(params);
  const translations = await getTranslations(locale);
  const translate = getTranslate(translations, locale);
  const isHindi = locale === "hi";

  const jsonLdFirst = getJsonLdFirst(isHindi);
  const jsonLdTwo = getJsonLdTwo(isHindi);

  // Helper function to get side badge
  const getSideBadge = (side: "divine" | "pandava" | "kaurava" | "neutral") => {
    switch (side) {
      case "divine":
        return (
          <Badge className="bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300">
            {translate("Divine")}
          </Badge>
        );
      case "pandava":
        return (
          <Badge className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
            {translate("Pandava")}
          </Badge>
        );
      case "neutral":
        return (
          <Badge className="bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-300">
            {translate("Neutral")}
          </Badge>
        );
      default:
        return null;
    }
  };

  // Sacred Authors (Ved Vyasa and Ganesh ji)
  const sacredAuthors = [
    {
      name: translate("Ved Vyasa"),
      sanskritName: "वेद व्यास",
      role: translate("The Author & Sage"),
      side: "divine" as const,
      icon: <Scroll className="size-6" />,
      imageSrc: "/art/bg_vedvyasji.webp",
      description: translate(
        "Ved Vyasa, also called Krishna Dvaipayana, is one of the most revered sages in Indian history. He didn't just write the Mahabharata - he compiled the four Vedas, authored the 18 Puranas, and even appears as a character in his own epic.",
      ),
      significance: translate(
        "The Bhagavad Gita is part of Vyasa's masterwork, the Mahabharata. This massive 100,000-verse epic tells the story of a family divided, a kingdom in conflict, and the conversation that changed everything.",
      ),
      keyFacts: [
        translate("Classified the four Vedas"),
        translate("Author of 18 Puranas"),
        translate("Father of Dhritarashtra and Pandu"),
        translate("Avatar of Lord Vishnu"),
      ],
    },
    {
      name: translate("Lord Ganesha"),
      sanskritName: "श्री गणेश",
      role: translate("The Divine Scribe"),
      side: "divine" as const,
      icon: <Feather className="size-6" />,
      imageSrc: "/art/bg_ganeshji_portrait.webp",
      description: translate(
        "When Ved Vyasa needed someone to write down the Mahabharata as he composed it, he turned to Lord Ganesh. But Ganesh set one condition: Vyasa had to recite without pause.",
      ),
      significance: translate(
        "So Vyasa created complex verses to slow Ganesh down while he thought ahead. This divine collaboration gave us the Mahabharata - and within it, the Bhagavad Gita. Every verse was carefully crafted, every word chosen with purpose.",
      ),
      keyFacts: [
        translate("Scribe of the Mahabharata"),
        translate("Remover of obstacles"),
        translate("Son of Lord Shiva and Goddess Parvati"),
        translate("Wrote the epic without stopping"),
      ],
    },
  ];

  // Main characters in the Gita
  const characters = [
    {
      name: translate("Lord Krishna"),
      sanskritName: "श्री कृष्ण",
      role: translate("The Divine Teacher"),
      side: "divine" as const,
      icon: <BookOpen className="size-6" />,
      imageSrc: "/art/bg_krishnaji_portrait_chariot.webp",
      description: translate(
        "Lord Krishna is the speaker of the Bhagavad Gita and the eighth avatar of Vishnu. He's Arjuna's friend, charioteer, and guide. What makes Krishna's teachings powerful isn't just what he says - it's who he is.",
      ),
      significance: translate(
        "Krishna doesn't preach from a distance. He stands with Arjuna on the battlefield, in the middle of chaos, answering real questions with real solutions. In Chapter 11, he reveals his Vishvarupa - the cosmic form - showing Arjuna that he's talking to the Supreme Being himself.",
      ),
      keyFacts: [
        translate("Eighth avatar of Lord Vishnu"),
        translate("Incarnation of Narayan (from Nar-Narayan)"),
        translate("King of Dwaraka"),
        translate("Spoke all 700 verses of the Gita"),
      ],
    },
    {
      name: translate("Arjuna"),
      sanskritName: "अर्जुन",
      role: translate("The Mighty Warrior & Disciple"),
      side: "pandava" as const,
      icon: <Users className="size-6" />,
      imageSrc: "/art/bg_arjunaji_portrait.webp",
      description: translate(
        "Arjuna is the third Pandava brother and one of history's greatest warriors. He's skilled, respected, and ready for battle. But when he sees his teachers, uncles, and cousins on the opposite side, he breaks down.",
      ),
      significance: translate(
        "This isn't weakness - it's the most human moment in the Mahabharata. Arjuna asks the questions we all ask: What's the right thing to do when all choices seem wrong? How do I act when I'm paralyzed by doubt? What's the point of success if it costs everything?",
      ),
      keyFacts: [
        translate("Son of Indra (god of thunder)"),
        translate("Incarnation of Nara (from Nar-Narayan)"),
        translate("Winner of Draupadi's Swayamvar"),
        translate("Wielder of the divine bow Gandiva"),
      ],
    },
    {
      name: translate("Sanjaya"),
      sanskritName: "संजय",
      role: translate("The Divine Narrator"),
      side: "neutral" as const,
      icon: <Heart className="size-6" />,
      imageSrc: "/art/bg_sanjayaji_portrait.webp",
      description: translate(
        "Sanjaya is the narrator who makes the Bhagavad Gita possible. As advisor to the blind king Dhritarashtra, he was blessed with divine vision by Ved Vyasa to witness the entire battle from afar.",
      ),
      significance: translate(
        "The Gita is framed as Sanjaya's narration to Dhritarashtra. He sees everything, hears everything, and reports it with precision. The last verse of the Gita is his - a powerful reflection on witnessing this divine conversation and what it means for anyone who hears it.",
      ),
      keyFacts: [
        translate("Blessed with divine vision by Vyasa"),
        translate("Narrated the entire war to Dhritarashtra"),
        translate("One of the few survivors of the war"),
        translate("Maintained neutrality as narrator"),
      ],
    },
  ];

  // Modern relevance benefits
  const modernBenefits = [
    {
      icon: <GraduationCap className="size-6" />,
      title: translate("For Students & Career Starters"),
      description: translate(
        "Choosing a major? Deciding between passion and practicality? The Gita talks about dharma - finding your path and walking it without comparing yourself to others. It's about doing your work well, not obsessing over outcomes you can't control.",
      ),
    },
    {
      icon: <Briefcase className="size-6" />,
      title: translate("For Working Professionals"),
      description: translate(
        "Burnout is real. Workplace stress is real. The Gita teaches karma yoga - how to give your best effort while staying mentally detached from results. It's not about not caring; it's about not letting anxiety run your life.",
      ),
    },
    {
      icon: <Heart className="size-6" />,
      title: translate("For Anyone Seeking Purpose"),
      description: translate(
        "Feeling lost? Questioning everything? The Gita addresses the big questions: Who am I? What matters? How do I live meaningfully? It offers three paths - action, devotion, and knowledge - and says you don't have to pick just one.",
      ),
    },
    {
      icon: <Compass className="size-6" />,
      title: translate("For Dealing with Change & Loss"),
      description: translate(
        "The Gita starts with Arjuna's grief and confusion. Krishna doesn't dismiss these feelings - he addresses them directly. The wisdom here helps you process change, handle loss, and find stability when everything feels uncertain.",
      ),
    },
    {
      icon: <Target className="size-6" />,
      title: translate("For Building Mental Resilience"),
      description: translate(
        "The Gita talks a lot about equanimity - staying steady in success and failure, praise and criticism. It's ancient mindfulness practice, teaching you to observe your thoughts without being controlled by them.",
      ),
    },
    {
      icon: <BookOpen className="size-6" />,
      title: translate("For Spiritual Growth"),
      description: translate(
        "Whether you're deeply religious or just spiritually curious, the Gita meets you where you are. It discusses meditation, self-realization, devotion, and the nature of consciousness - without requiring you to believe anything blindly.",
      ),
    },
  ];

  // Chapter groups
  const chapterGroups = [
    {
      title: translate("Karma Yoga"),
      chapters: translate("Chapters 1-6"),
      description: translate(
        "The first six chapters focus on action - how to work, fight, and live without being consumed by desire or fear. It's about doing what needs to be done with full effort and zero attachment to how things turn out.",
      ),
      type: "karma" as const,
    },
    {
      title: translate("Bhakti Yoga"),
      chapters: translate("Chapters 7-12"),
      description: translate(
        "The middle six chapters explore devotion and love for the divine. It's not blind faith - it's understanding who Krishna really is, how to connect with that ultimate reality, and what real devotion looks like in daily life.",
      ),
      type: "bhakti" as const,
    },
    {
      title: translate("Jnana Yoga"),
      chapters: translate("Chapters 13-18"),
      description: translate(
        "The final six chapters dive into knowledge - understanding the difference between body and soul, matter and spirit, the temporary and eternal. It all comes together in Chapter 18 with practical synthesis of everything taught.",
      ),
      type: "jnana" as const,
    },
  ];

  // Epic story points
  const epicStoryPoints = [
    {
      icon: "pandavas" as const,
      title: translate("The Pandavas"),
      description: translate(
        "Five brothers - Yudhishthira, Bhima, Arjuna, Nakula, and Sahadeva - who lost their kingdom through deceit and now must fight to reclaim it.",
      ),
    },
    {
      icon: "kauravas" as const,
      title: translate("The Kauravas"),
      description: translate(
        "Their hundred cousins, led by Duryodhana, who refuse to return even five villages to avoid war. Pride and greed have brought everyone to this battlefield.",
      ),
    },
    {
      icon: "dilemma" as const,
      title: translate("The Dilemma"),
      description: translate(
        "Arjuna must fight his grandfather Bhishma, his teacher Dronacharya, and his cousins. How do you do your duty when duty itself seems wrong?",
      ),
    },
  ];

  // Updated FAQs
  const faqs = [
    {
      question: translate("What is the Bhagavad Gita?"),
      answer: translate(
        "The Bhagavad Gita (the Song of the Lord) is a 700-verse Hindu scripture that's part of the Mahabharata. It's a conversation between Lord Krishna and the warrior Arjuna on the battlefield of Kurukshetra, moments before a massive war. Arjuna is paralyzed by doubt, and Krishna responds with teachings on life, duty, action, devotion, and the nature of reality itself.",
      ),
    },
    {
      question: translate("Who wrote the Bhagavad Gita?"),
      answer: translate(
        "Ved Vyasa composed the Mahabharata, which includes the Bhagavad Gita. According to tradition, Lord Ganesh served as the scribe, writing down the epic as Vyasa dictated it. Vyasa agreed to recite without pause, and Ganesh agreed to write without stopping - a collaboration that required both divine speed and wisdom.",
      ),
    },
    {
      question: translate("What role did Ganesh ji play in the Gita?"),
      answer: translate(
        "Ganesh ji was the scribe who wrote down the Mahabharata as Ved Vyasa composed it. When Vyasa needed someone who could write as fast as he could compose, he approached Ganesh. Ganesh agreed but set one condition: Vyasa must recite without stopping. To give himself time to think, Vyasa created complex verses that would take Ganesh a moment to comprehend before writing.",
      ),
    },
    {
      question: translate("How does the Gita fit into the Mahabharata?"),
      answer: translate(
        "The Mahabharata is a 100,000-verse epic about a family conflict that leads to the Kurukshetra war. The Bhagavad Gita appears in the Bhishma Parva (Book of Bhishma), right before the war begins. It's the conversation that happens when Arjuna refuses to fight. While the Mahabharata tells the story, the Gita teaches the philosophy.",
      ),
    },
    {
      question: translate("What are the main teachings of the Bhagavad Gita?"),
      answer: translate(
        "The Gita teaches three main paths (yogas): Karma Yoga (selfless action without attachment to results), Bhakti Yoga (devotion and love for the divine), and Jnana Yoga (knowledge of the self and ultimate reality). It also discusses dharma (duty), the eternal nature of the soul, meditation, and how to live with purpose in a chaotic world.",
      ),
    },
    {
      question: translate("Why is the Bhagavad Gita relevant today?"),
      answer: translate(
        "The Gita addresses timeless human struggles: making difficult decisions, managing stress and anxiety, finding purpose, dealing with loss, and understanding who you really are. It's been used by students facing career choices, professionals dealing with burnout, leaders making tough calls, and anyone seeking deeper meaning. Mahatma Gandhi called it his 'spiritual dictionary' and read it daily.",
      ),
    },
    {
      question: translate(
        "Who are Nar and Narayan in relation to Krishna and Arjuna?",
      ),
      answer: translate(
        "Krishna and Arjuna are considered incarnations of Narayan (Vishnu) and Nar respectively - the divine sage-duo. This eternal partnership appears throughout Hindu tradition. The Gita is special because it shows the divine (Krishna) teaching the devoted (Arjuna), continuing their timeless relationship in human form.",
      ),
    },
  ];

  const localizedLink = (path: string) => {
    if (locale === "en") return path;
    return `/${locale}${path.startsWith("/") ? path : "/" + path}`;
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFirst) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdTwo) }}
      />

      <div className="relative min-h-screen overflow-hidden bg-prakash-bg font-crimson dark:bg-nisha-bg">
        <EnhancedHero
          badge={translate("Sacred Scripture")}
          title={translate("The Bhagavad Gita")}
          subtitle={translate(
            "700 verses that changed everything. A conversation on a battlefield. A guide for life.",
          )}
          primaryButtonText={translate("Start Reading")}
          primaryButtonLink="/"
          secondaryButtonText={translate("Explore Chapters")}
          secondaryButtonLink="/"
          locale={locale}
        />

        {/* What is the Bhagavad Gita */}
        <div className="relative">
          <div className="pointer-events-none absolute bottom-10 right-10 opacity-15">
            <VedicPattern variant="om" size={200} opacity={0.5} />
          </div>
          <WhatIsGitaSection
            subtitle={translate("DISCOVER")}
            title={translate("What is the Bhagavad Gita?")}
            paragraphs={[
              translate(
                "The Bhagavad Gita - the Song of the Lord - is a 700-verse conversation between Lord Krishna and the warrior prince Arjuna. It happens on a battlefield, right before a war that will destroy families and change kingdoms.",
              ),
              translate(
                "Arjuna is ready to fight. His arrows are sharp, his army is strong. Then he looks across the field and sees his grandfather, his teacher, his cousins. People he loves. People he's supposed to kill. He can't do it. He breaks down.",
              ),
              translate(
                "That's when Krishna speaks. What follows isn't just battle advice - it's a complete guide to life, duty, action, devotion, and self-knowledge. The Gita talks about work without anxiety, love without attachment, and understanding who you truly are beyond your body and mind.",
              ),
            ]}
            imageSrc="/bhagavadgita.png"
          />
        </div>

        {/* Epic Story - Mahabharata Context */}
        <div className="relative">
          <div className="pointer-events-none absolute right-10 top-10 opacity-30">
            <VedicPattern variant="mandala" size={300} opacity={0.6} />
          </div>
          <EpicStorySection
            subtitle={translate("THE EPIC")}
            title={translate("The Story Behind the Gita")}
            introduction={translate(
              "The Bhagavad Gita is part of the Mahabharata - the longest epic poem ever written. The Mahabharata tells the story of two families, the Pandavas and Kauravas, fighting for the throne of Hastinapura. Lies, betrayal, gambling, exile - everything leads to Kurukshetra, where armies face each other and Arjuna faces his crisis.",
            )}
            storyPoints={epicStoryPoints}
            conclusion={translate(
              "The Gita begins where Arjuna's resolve ends. It's the moment between decision and action, where Krishna steps in with wisdom that transcends the battlefield and speaks to every human struggle.",
            )}
          />
        </div>

        {/* Sacred Authors */}
        <section className="relative py-8 md:py-12">
          <div className="pointer-events-none absolute left-10 top-10 opacity-25">
            <VedicPattern variant="lotus" size={250} opacity={0.6} />
          </div>
          <div className="container mx-auto max-w-7xl px-4">
            <SectionHeader
              subtitle={translate("THE AUTHORS")}
              title={translate("Ved Vyasa & Ganesh ji")}
              className="mb-12"
            />
            <div className="grid gap-6 md:grid-cols-2">
              {sacredAuthors.map((author, idx) => (
                <EnhancedCharacterCard
                  key={idx}
                  character={author}
                  sideBadge={getSideBadge(author.side)}
                  labels={{
                    significance: translate("Significance in the Gita"),
                    keyFacts: translate("Key Facts"),
                  }}
                  locale={locale}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Key Characters */}
        <section className="relative py-8 md:py-12">
          <div className="container mx-auto max-w-7xl px-4">
            <SectionHeader
              subtitle={translate("KEY FIGURES")}
              title={translate("The Main Characters")}
              className="mb-12"
            />
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {characters.map((character, idx) => (
                <EnhancedCharacterCard
                  key={idx}
                  character={character}
                  sideBadge={getSideBadge(character.side)}
                  labels={{
                    significance: translate("Significance in the Gita"),
                    keyFacts: translate("Key Facts"),
                  }}
                  locale={locale}
                />
              ))}
            </div>

            {/* CTA to Characters Page */}
            <div className="mt-12 text-center">
              <Link href={localizedLink("/mahabharata-characters")}>
                <Button
                  size="lg"
                  variant="outline"
                  className="group border-prakash-primary text-prakash-primary hover:bg-prakash-primary hover:text-white dark:border-nisha-primary dark:text-nisha-primary dark:hover:bg-nisha-primary dark:hover:text-white"
                >
                  {translate("Explore All Mahabharata Characters")}
                  <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Modern Relevance */}
        <div className="relative overflow-hidden">
          <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-20">
            <VedicPattern variant="mandala" size={400} opacity={0.5} />
          </div>
          <ModernRelevanceSection
            subtitle={translate("TODAY")}
            title={translate("Why Read the Gita Now?")}
            description={translate(
              "The Gita was spoken 5,000 years ago, but the questions haven't changed. The answers still work.",
            )}
            benefits={modernBenefits}
          />
        </div>

        {/* The 18 Chapters */}
        <div className="relative">
          <div className="pointer-events-none absolute bottom-10 left-10 opacity-20">
            <VedicPattern variant="dots" size={200} opacity={0.5} />
          </div>
          <ChaptersOverviewSection
            subtitle={translate("STRUCTURE")}
            title={translate("The 18 Chapters")}
            description={translate(
              "The Gita's 18 chapters are organized into three sections, each focusing on a different path to spiritual growth and self-realization.",
            )}
            chapterGroups={chapterGroups}
            ctaText={translate("Read All Chapters")}
            ctaLink="/"
            locale={locale}
            className="bg-adhyayan-bg dark:bg-nisha-bg/50"
          />
        </div>

        {/* FAQ Section */}
        <FAQ
          locale={locale}
          translations={translations}
          customFaqs={faqs}
          title={translate("Common Questions")}
          subtitle={translate(
            "What people ask about the Bhagavad Gita, answered clearly",
          )}
        />

        <CTASection
          title={translate("Ready to Read?")}
          description={translate(
            "Start with Chapter 1 and see why millions have found guidance, peace, and purpose in Krishna's words to Arjuna.",
          )}
          primaryButtonText={translate("Start Chapter 1")}
          primaryButtonLink="/chapter/1"
          secondaryButtonText={translate("Browse All Chapters")}
          secondaryButtonLink="/"
          locale={locale}
        />
      </div>
    </>
  );
}
