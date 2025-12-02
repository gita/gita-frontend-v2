import {
  BookOpen,
  Crown,
  Heart,
  Shield,
  Sparkles,
  Star,
  Sword,
  Users,
} from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";

import { paramsToLocale } from "shared/functions";
import { getTranslate } from "shared/translate";
import { getTranslations } from "shared/translate/server";

import { EnhancedCharacterCard } from "@/components/blocks/cards";
import { VedicPattern } from "@/components/blocks/decorative";
import {
  CTASection,
  FamilyTreeSection,
  PageHero,
} from "@/components/blocks/page-sections";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Force static generation for better SEO
export const dynamic = "force-static";

// Pre-generate both English and Hindi versions
export async function generateStaticParams() {
  return [{ locale: ["en"] }, { locale: ["hi"] }];
}

export const metadata: Metadata = {
  title: "Mahabharata Characters - Key Figures in the Bhagavad Gita",
  description:
    "Explore the main characters of the Mahabharata featured in the Bhagavad Gita - Lord Krishna, Arjuna, Bhishma, Dronacharya, Yudhishthir, and more. Learn their stories and significance.",
  keywords:
    "mahabharata characters, bhagavad gita characters, lord krishna, arjuna, bhishma, dronacharya, yudhishthir, karna, pandavas, kauravas",
  openGraph: {
    title: "Mahabharata Characters - Key Figures in the Bhagavad Gita",
    description:
      "Explore the main characters of the Mahabharata featured in the Bhagavad Gita - Lord Krishna, Arjuna, Bhishma, Dronacharya, Yudhishthir, and more.",
    url: "https://bhagavadgita.io/mahabharata-characters",
    siteName: "Bhagavad Gita",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://bhagavadgita.io/_next/image?url=%2Fbanner2.png&w=3840&q=75",
        height: 1080,
        width: 1920,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mahabharata Characters - Key Figures in the Bhagavad Gita",
    description:
      "Explore the main characters of the Mahabharata featured in the Bhagavad Gita.",
    images: [
      "https://bhagavadgita.io/_next/image?url=%2Fbanner2.png&w=3840&q=75",
    ],
    site: "@ShriKrishna",
  },
  alternates: {
    canonical: "https://bhagavadgita.io/mahabharata-characters",
  },
};

interface Character {
  name: string;
  sanskritName?: string;
  role: string;
  side: "divine" | "pandava" | "kaurava" | "neutral";
  icon: React.ReactNode;
  imageSrc?: string;
  description: string;
  significance: string;
  keyFacts: string[];
}

export default async function MahabharataCharacters(props: ParamsWithLocale) {
  const { params: paramsPromise } = props;
  const params = await paramsPromise;
  const locale = paramsToLocale(params);
  const translations = await getTranslations(locale);
  const translate = getTranslate(translations, locale);

  const characters: Character[] = [
    // ============ DIVINE BEINGS ============
    {
      name: translate("Lord Krishna"),
      sanskritName: "श्री कृष्ण",
      role: translate("The Supreme Being & Charioteer"),
      side: "divine",
      icon: <Star className="size-6" />,
      imageSrc: "/art/bg_krishnaji_portrait_chariot.png",
      description: translate(
        "Lord Krishna, the eighth avatar of Lord Vishnu, serves as Arjuna's charioteer and spiritual guide. He is the speaker of the Bhagavad Gita and reveals divine wisdom to Arjuna. Together with Arjuna, he represents the eternal Nar-Narayan - the divine sage duo."
      ),
      significance: translate(
        "Krishna's role transforms from a friend and charioteer to the Supreme Teacher, ultimately revealing his cosmic Vishvarupa form in Chapter 11."
      ),
      keyFacts: [
        translate("Eighth avatar of Lord Vishnu"),
        translate("Incarnation of Narayan (from Nar-Narayan)"),
        translate("King of Dwaraka"),
        translate("Spoke all 700 verses of the Gita"),
      ],
    },
    {
      name: translate("Ved Vyasa"),
      sanskritName: "वेद व्यास",
      role: translate("The Author & Sage"),
      side: "divine",
      icon: <BookOpen className="size-6" />,
      imageSrc: "/art/bg_vedvyasji.png",
      description: translate(
        "The legendary sage who composed the Mahabharata and compiled the four Vedas. Vyasa blessed Sanjaya with divine vision to narrate the war to Dhritarashtra. He is considered an avatar of Lord Vishnu."
      ),
      significance: translate(
        "Vyasa's literary contribution preserved the eternal wisdom of the Gita for humanity across millennia."
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
      side: "divine",
      icon: <Sparkles className="size-6" />,
      imageSrc: "/art/bg_ganeshji_portrait.png",
      description: translate(
        "The elephant-headed deity who served as the scribe of the Mahabharata. Ved Vyasa chose Ganesha to write down the epic, and Ganesha agreed on the condition that Vyasa would dictate without pause. This divine collaboration preserved the epic for eternity."
      ),
      significance: translate(
        "Ganesha's role as the scribe represents the divine blessing that preserves sacred knowledge and removes obstacles to understanding."
      ),
      keyFacts: [
        translate("Scribe of the Mahabharata"),
        translate("Remover of obstacles"),
        translate("Son of Lord Shiva and Goddess Parvati"),
        translate("Wrote the epic without stopping"),
      ],
    },
    {
      name: translate("Sanjaya"),
      sanskritName: "संजय",
      role: translate("The Divine Narrator"),
      side: "neutral",
      icon: <Users className="size-6" />,
      imageSrc: "/art/bg_sanjayaji_portrait.png",
      description: translate(
        "The charioteer and advisor to the blind king Dhritarashtra. Blessed with divya-drishti (divine vision) by Ved Vyasa, Sanjaya could see all events on the distant battlefield and narrated them in real-time."
      ),
      significance: translate(
        "Sanjaya frames the entire Gita narrative, and his reflections in the final chapter express the profound impact of witnessing Krishna's teachings."
      ),
      keyFacts: [
        translate("Blessed with divine vision by Vyasa"),
        translate("Narrated the entire war to Dhritarashtra"),
        translate("One of the few survivors of the war"),
        translate("Maintained neutrality as narrator"),
      ],
    },

    // ============ PANDAVA FAMILY ============
    {
      name: translate("Kunti"),
      sanskritName: "कुंती",
      role: translate("The Mother of Pandavas"),
      side: "pandava",
      icon: <Heart className="size-6" />,
      imageSrc: "/art/bg_kuntiji_landscape.png",
      description: translate(
        "The revered mother of the three eldest Pandavas (Yudhishthir, Bhima, Arjuna) and Karna. Blessed with a divine mantra by sage Durvasa, she could invoke any deity. Her wisdom, devotion, and unwavering strength guided the Pandavas through their greatest trials."
      ),
      significance: translate(
        "Kunti represents maternal strength, devotion, and the courage to face life's hardships with dignity."
      ),
      keyFacts: [
        translate("Mother of Yudhishthir, Bhima, Arjuna, and Karna"),
        translate("Sister of Vasudeva (Krishna's father)"),
        translate("Blessed with divine mantra"),
        translate("Guided Pandavas with her wisdom"),
      ],
    },
    {
      name: translate("Yudhishthir"),
      sanskritName: "युधिष्ठिर",
      role: translate("The Dharma Raja"),
      side: "pandava",
      icon: <Crown className="size-6" />,
      imageSrc: "/art/bg_yuddhistirji_portrait.png",
      description: translate(
        "The eldest Pandava, known for his unwavering commitment to truth and dharma. Son of Dharma (god of righteousness), he became king after the Kurukshetra war despite his reluctance to fight."
      ),
      significance: translate(
        "Yudhishthir represents the ideal of righteous kingship and the struggles of maintaining dharma in difficult circumstances."
      ),
      keyFacts: [
        translate("Son of Dharma (Yama)"),
        translate("Never spoke a lie until the war"),
        translate("Performed Rajasuya and Ashwamedha Yagyas"),
        translate("Attained heaven in his mortal body"),
      ],
    },
    {
      name: translate("Bhima"),
      sanskritName: "भीम",
      role: translate("The Mighty Warrior"),
      side: "pandava",
      icon: <Shield className="size-6" />,
      imageSrc: "/art/bg_bheemji_landscape_2.png",
      description: translate(
        "The second Pandava, renowned for his immense physical strength and courage. Son of Vayu (god of wind), Bhima was a formidable warrior and protector of his family, known for his unwavering loyalty to his brothers and commitment to dharma."
      ),
      significance: translate(
        "Bhima represents strength tempered with loyalty and righteous anger against injustice."
      ),
      keyFacts: [
        translate("Son of Vayu (wind god)"),
        translate("Master warrior of the mace (gada)"),
        translate("Known for immense strength and courage"),
        translate("Protector of the Pandava family"),
      ],
    },
    {
      name: translate("Arjuna"),
      sanskritName: "अर्जुन",
      role: translate("The Mighty Warrior & Disciple"),
      side: "pandava",
      icon: <Sword className="size-6" />,
      imageSrc: "/art/bg_arjunaji_portrait.png",
      description: translate(
        "The third Pandava prince and greatest archer of his time. Arjuna's moral crisis on the battlefield becomes the catalyst for Krishna's divine teachings. He represents the ideal seeker - humble, questioning, and devoted."
      ),
      significance: translate(
        "As incarnation of Nara (from Nar-Narayan), Arjuna represents the eternal companion of the Divine. His questions shape the entire Gita."
      ),
      keyFacts: [
        translate("Son of Indra (god of thunder)"),
        translate("Incarnation of Nara (from Nar-Narayan)"),
        translate("Winner of Draupadi's Swayamvar"),
        translate("Wielder of the divine bow Gandiva"),
      ],
    },
    {
      name: translate("Nakul"),
      sanskritName: "नकुल",
      role: translate("The Skilled Swordsman"),
      side: "pandava",
      icon: <Sword className="size-6" />,
      imageSrc: "/art/bg_nakulji_landscape.png",
      description: translate(
        "The fourth Pandava and twin brother of Sahadev. Son of the Ashwini Kumaras (divine physicians), Nakul was renowned for his exceptional beauty, swordsmanship, and expertise in horse training and Ayurveda."
      ),
      significance: translate(
        "Nakul represents beauty combined with humility and dedication to service."
      ),
      keyFacts: [
        translate("Son of Ashwini Kumaras"),
        translate("Twin brother of Sahadev"),
        translate("Expert swordsman and horse trainer"),
        translate("Known for his exceptional beauty"),
      ],
    },
    {
      name: translate("Sahadev"),
      sanskritName: "सहदेव",
      role: translate("The Wise Astrologer"),
      side: "pandava",
      icon: <Star className="size-6" />,
      imageSrc: "/art/bg_sahadev_ji.png",
      description: translate(
        "The youngest Pandava and twin brother of Nakul. Son of the Ashwini Kumaras, Sahadev was a master astrologer and possessed deep knowledge of the future. His wisdom was sought by many, yet he remained humble."
      ),
      significance: translate(
        "Sahadev represents wisdom, foresight, and the burden of knowledge that cannot always be shared."
      ),
      keyFacts: [
        translate("Son of Ashwini Kumaras"),
        translate("Twin brother of Nakul"),
        translate("Master astrologer"),
        translate("Knew about the war but remained silent"),
      ],
    },
    {
      name: translate("Draupadi"),
      sanskritName: "द्रौपदी",
      role: translate("The Empress"),
      side: "pandava",
      icon: <Heart className="size-6" />,
      imageSrc: "/art/bg_draupadiji_landscape.png",
      description: translate(
        "The revered empress and wife of the five Pandavas, daughter of King Drupada. Born from the sacred fire, her strength, dignity, and unwavering devotion to Lord Krishna made her one of the most significant figures in the Mahabharata."
      ),
      significance: translate(
        "Draupadi represents the honor and dignity that must be protected, and the power of devotion - Krishna always came to her aid."
      ),
      keyFacts: [
        translate("Born from sacred sacrificial fire"),
        translate("Wife of the five Pandavas"),
        translate("Devoted follower of Lord Krishna"),
        translate("Symbol of strength and dignity"),
      ],
    },

    // ============ KAURAVA SIDE ============
    {
      name: translate("Dhritarashtra"),
      sanskritName: "धृतराष्ट्र",
      role: translate("The Blind King"),
      side: "kaurava",
      icon: <Crown className="size-6" />,
      imageSrc: "/art/bg_dhritarashtraji_landscape.png",
      description: translate(
        "The king of Hastinapura and father of the 100 Kauravas. Despite his wisdom and position, his deep attachment to his sons and inability to guide them on the path of dharma became a key factor in the great war. Sanjaya narrated the Gita to him."
      ),
      significance: translate(
        "Dhritarashtra represents how deep attachment to loved ones can sometimes cloud one's vision of dharma and righteous duty."
      ),
      keyFacts: [
        translate("King of Hastinapura"),
        translate("Father of 100 Kauravas and one daughter"),
        translate("The Gita was narrated to him by Sanjaya"),
        translate("Listener of the divine dialogue"),
      ],
    },
    {
      name: translate("Duryodhana"),
      sanskritName: "दुर्योधन",
      role: translate("The Antagonist Prince"),
      side: "kaurava",
      icon: <Crown className="size-6" />,
      imageSrc: "/art/bg_duryodhanji_landscape.png",
      description: translate(
        "The eldest Kaurava prince whose ambition and rivalry with the Pandavas led to the great war. A skilled warrior and master of the mace, Duryodhana inspired fierce loyalty from his allies, especially Karna, and fought bravely until his final moment."
      ),
      significance: translate(
        "Duryodhana's story illustrates the consequences of allowing ambition and rivalry to overshadow dharma, and the importance of wise counsel."
      ),
      keyFacts: [
        translate("Eldest of 100 Kaurava brothers"),
        translate("Master warrior of the mace (gada)"),
        translate("Leader of the Kaurava forces"),
        translate("Inspired great loyalty among his followers"),
      ],
    },
    {
      name: translate("Bhishma"),
      sanskritName: "भीष्म",
      role: translate("The Grandsire"),
      side: "kaurava",
      icon: <Shield className="size-6" />,
      imageSrc: "/art/bg_bheeshmaji_landscape.png",
      description: translate(
        "The revered grand-uncle of both Pandavas and Kauravas, Bhishma was bound by his sacred vow to serve the throne of Hastinapura. Known for his wisdom, valor, and unwavering commitment to his word, he served as the Kaurava commander for the first ten days of the war."
      ),
      significance: translate(
        "Bhishma represents the tragic conflict between personal dharma and duty to one's oath. His discourse on the bed of arrows later became the Shanti Parva."
      ),
      keyFacts: [
        translate("Took a vow of lifelong celibacy (Bhishma Pratigya)"),
        translate("Could choose the time of his death"),
        translate("Commander of Kaurava forces for 10 days"),
        translate("Imparted wisdom while on his deathbed of arrows"),
      ],
    },
    {
      name: translate("Dronacharya"),
      sanskritName: "द्रोणाचार्य",
      role: translate("The Supreme Teacher"),
      side: "kaurava",
      icon: <BookOpen className="size-6" />,
      imageSrc: "/art/bg_dronaji_landscape.png",
      description: translate(
        "The legendary guru who trained both Pandavas and Kauravas in martial arts. Despite his affection for Arjuna, his favorite student, Drona fought for the Kauravas due to his obligation to Hastinapura."
      ),
      significance: translate(
        "Drona exemplifies the conflict between duty and affection, and the price of misplaced loyalty."
      ),
      keyFacts: [
        translate("Greatest martial arts teacher of his era"),
        translate("Arjuna was his favorite disciple"),
        translate("Commander after Bhishma fell"),
        translate("Father of Ashwatthama"),
      ],
    },
    {
      name: translate("Karna"),
      sanskritName: "कर्ण",
      role: translate("The Tragic Hero"),
      side: "kaurava",
      icon: <Sparkles className="size-6" />,
      imageSrc: "/art/bg_karnaji_landscape.png",
      description: translate(
        "The firstborn son of Kunti, Karna was raised by a charioteer family. Known for his unparalleled generosity and warrior skills, his unwavering loyalty to Duryodhana led him to fight against the Pandavas, creating one of the Mahabharata's most poignant tragedies."
      ),
      significance: translate(
        "Karna represents the complexities of dharma, loyalty, and destiny. His life teaches us about dignity in adversity and the nobility of character transcending circumstances."
      ),
      keyFacts: [
        translate("Firstborn son of Kunti"),
        translate("Born with divine armor (kavach-kundal)"),
        translate("Equal to Arjuna in archery"),
        translate("Renowned for his extraordinary generosity"),
      ],
    },
  ];

  const getSideBadge = (side: Character["side"]) => {
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
      case "kaurava":
        return (
          <Badge className="bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300">
            {translate("Kaurava")}
          </Badge>
        );
      case "neutral":
        return (
          <Badge className="bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-300">
            {translate("Neutral")}
          </Badge>
        );
    }
  };

  const divineCharacters = characters.filter((c) => c.side === "divine");
  const pandavaCharacters = characters.filter((c) => c.side === "pandava");
  const kauravaCharacters = characters.filter((c) => c.side === "kaurava");
  const neutralCharacters = characters.filter((c) => c.side === "neutral");


  return (
    <div className="relative min-h-screen overflow-hidden bg-prakash-bg font-inter dark:bg-nisha-bg">
      <PageHero
        badge={translate("Epic Characters")}
        title={translate("Characters of the Mahabharata")}
        subtitle={translate(
          "Meet the legendary figures whose stories interweave with the timeless teachings of the Bhagavad Gita"
        )}
        primaryButtonText={translate("Read the Gita")}
        primaryButtonLink="/"
        secondaryButtonText={translate("About the Gita")}
        secondaryButtonLink="/about"
          locale={locale}
        />

        {/* Family Tree Section */}
        <div className="relative">
          <div className="pointer-events-none absolute right-10 top-10 opacity-20">
            <VedicPattern variant="mandala" size={300} opacity={0.5} />
          </div>
          <FamilyTreeSection
            subtitle={translate("FAMILY TREE")}
            title={translate("The House of Kuru")}
            description={translate(
              "Understanding the relationships between characters helps illuminate the moral dilemmas presented in the Bhagavad Gita. The conflict between cousins, duties to teachers, and bonds of family form the backdrop of Krishna's teachings."
            )}
            locale={locale}
          />
        </div>

        {/* Characters Section */}
        <section className="relative py-8 md:py-12">
          <div className="pointer-events-none absolute bottom-10 left-10 opacity-15">
            <VedicPattern variant="dots" size={250} opacity={0.6} />
          </div>
          <div className="container mx-auto max-w-7xl px-4">
            {/* Section Header */}
            <div className="mb-8 text-center">
              <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-prakash-primary dark:text-nisha-primary">
                {translate("MEET THE CHARACTERS")}
              </p>
              <h2 className="font-newsreader mb-4 text-3xl font-bold md:text-4xl">
                {translate("Legends of the Mahabharata")}
              </h2>
              <p className="font-merriweather mx-auto max-w-2xl text-muted-foreground">
                {translate(
                  "Each character brings unique lessons and perspectives to Krishna's timeless wisdom"
                )}
              </p>
            </div>

            <Tabs defaultValue="all" className="w-full">
            <TabsList className="mb-8 flex h-auto flex-nowrap justify-start gap-2 overflow-x-auto bg-transparent md:flex-wrap md:justify-center">
              <TabsTrigger
                value="all"
                className="shrink-0 rounded-full data-[state=active]:bg-prakash-primary data-[state=active]:text-white dark:data-[state=active]:bg-nisha-primary"
              >
                {translate("All Characters")}
              </TabsTrigger>
              <TabsTrigger
                value="divine"
                className="shrink-0 rounded-full data-[state=active]:bg-purple-600 data-[state=active]:text-white"
              >
                {translate("Divine & Narrators")}
              </TabsTrigger>
              <TabsTrigger
                value="pandava"
                className="shrink-0 rounded-full data-[state=active]:bg-blue-600 data-[state=active]:text-white"
              >
                {translate("Pandavas")}
              </TabsTrigger>
              <TabsTrigger
                value="kaurava"
                className="shrink-0 rounded-full data-[state=active]:bg-red-600 data-[state=active]:text-white"
              >
                {translate("Kauravas & Allies")}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all">
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
            </TabsContent>

            <TabsContent value="divine">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {[...divineCharacters, ...neutralCharacters].map(
                  (character, idx) => (
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
                  )
                )}
              </div>
            </TabsContent>

            <TabsContent value="pandava">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {pandavaCharacters.map((character, idx) => (
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
            </TabsContent>

            <TabsContent value="kaurava">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {kauravaCharacters.map((character, idx) => (
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
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <CTASection
        title={translate("Dive Into the Bhagavad Gita")}
        description={translate(
          "Now that you know the characters, explore the timeless dialogue between Krishna and Arjuna"
        )}
        primaryButtonText={translate("Start Reading")}
        primaryButtonLink="/"
        secondaryButtonText={translate("Learn More About the Gita")}
        secondaryButtonLink="/about"
        locale={locale}
      />
    </div>
  );
}

