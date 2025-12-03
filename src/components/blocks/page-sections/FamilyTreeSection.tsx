"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  BookOpen,
  ChevronDown,
  ChevronRight,
  Crown,
  Heart,
  Shield,
  Sparkles,
  Star,
  Sword,
  Users,
} from "lucide-react";

import { SectionHeader } from "@/components/ui/section-header";
import { cn } from "@/lib/utils";
import hiTranslations from "@/shared/translate/locales/hi.json";

interface FamilyTreeSectionProps {
  subtitle: string;
  title: string;
  description: string;
  locale?: string;
}

// --- Types ---
interface FamilyMember {
  name: string;
  title?: string;
  color: "purple" | "red" | "blue" | "pink" | "cyan" | "amber";
  icon?: React.ReactNode;
  spouse?: FamilyMember | FamilyMember[];
  children?: FamilyMember[];
  note?: string;
}

// --- Color Styles ---
const colorStyles = {
  purple:
    "bg-gradient-to-br from-purple-50 to-purple-100 text-purple-900 border-purple-300 dark:from-purple-900/50 dark:to-purple-800/50 dark:text-purple-100 dark:border-purple-600",
  red: "bg-gradient-to-br from-red-50 to-red-100 text-red-900 border-red-300 dark:from-red-900/50 dark:to-red-800/50 dark:text-red-100 dark:border-red-600",
  blue: "bg-gradient-to-br from-blue-50 to-blue-100 text-blue-900 border-blue-300 dark:from-blue-900/50 dark:to-blue-800/50 dark:text-blue-100 dark:border-blue-600",
  pink: "bg-gradient-to-br from-pink-50 to-pink-100 text-pink-900 border-pink-300 dark:from-pink-900/50 dark:to-pink-800/50 dark:text-pink-100 dark:border-pink-600",
  cyan: "bg-gradient-to-br from-cyan-50 to-cyan-100 text-cyan-900 border-cyan-300 dark:from-cyan-900/50 dark:to-cyan-800/50 dark:text-cyan-100 dark:border-cyan-600",
  amber:
    "bg-gradient-to-br from-amber-50 to-amber-100 text-amber-900 border-amber-300 dark:from-amber-900/50 dark:to-amber-800/50 dark:text-amber-100 dark:border-amber-600",
};

const badgeStyles = {
  purple:
    "bg-purple-200 text-purple-900 dark:bg-purple-800 dark:text-purple-100",
  red: "bg-red-200 text-red-900 dark:bg-red-800 dark:text-red-100",
  blue: "bg-blue-200 text-blue-900 dark:bg-blue-800 dark:text-blue-100",
  pink: "bg-pink-200 text-pink-900 dark:bg-pink-800 dark:text-pink-100",
  cyan: "bg-cyan-200 text-cyan-900 dark:bg-cyan-800 dark:text-cyan-100",
  amber: "bg-amber-200 text-amber-900 dark:bg-amber-800 dark:text-amber-100",
};

// --- Complete Family Tree Data ---
const completeTree: FamilyMember = {
  name: "Maharaj Shantanu",
  title: "King of Hastinapur",
  color: "purple",
  icon: <Crown className="size-5" />,
  spouse: [
    { name: "Ganga", title: "River Goddess (Wife 1)", color: "cyan" },
    { name: "Satyavati", title: "Queen (Wife 2)", color: "purple" },
  ],
  children: [
    // From Ganga
    {
      name: "Bhishma",
      title: "The Grandsire",
      color: "cyan",
      icon: <Shield className="size-5" />,
      note: "Son of Ganga. Took the sacred vow of celibacy (Bhishma Pratigya) for his father's happiness.",
    },
    // From Satyavati & Sage Parashara
    {
      name: "Veda Vyasa",
      title: "Author of Mahabharata",
      color: "purple",
      icon: <BookOpen className="size-5" />,
      note: "Son of Satyavati & Sage Parashara. The great sage who performed Niyoga to continue the lineage.",
    },
    // From Satyavati (with Shantanu)
    {
      name: "Chitrangada",
      title: "Eldest Prince",
      color: "purple",
      note: "Son of Satyavati & Shantanu. Eldest prince of Hastinapura.",
    },
    {
      name: "Vichitravirya",
      title: "King of Hastinapur",
      color: "purple",
      icon: <Crown className="size-5" />,
      spouse: [
        { name: "Ambika", title: "Princess of Kashi", color: "purple" },
        { name: "Ambalika", title: "Princess of Kashi", color: "purple" },
      ],
      note: "Son of Satyavati & Shantanu. Passed away young. Vyasa performed Niyoga to continue the lineage.",
      children: [
        // Children through Niyoga (via Vyasa)
        {
          name: "Dhritarashtra",
          title: "The Blind King",
          color: "red",
          icon: <Crown className="size-5" />,
          note: "Son of Ambika via Niyoga by Vyasa. King of Hastinapura.",
          spouse: {
            name: "Gandhari",
            title: "Princess of Gandhara",
            color: "red",
          },
          children: [
            {
              name: "Duryodhana",
              title: "Eldest Kaurava",
              color: "red",
              icon: <Sword className="size-5" />,
            },
            {
              name: "Dushasana",
              title: "Second Kaurava",
              color: "red",
            },
            {
              name: "+ 98 more brothers",
              title: "100 Kauravas total",
              color: "red",
            },
            {
              name: "Dussala",
              title: "Only Daughter",
              color: "pink",
              spouse: {
                name: "Jayadratha",
                title: "King of Sindhu",
                color: "red",
              },
            },
          ],
        },
        {
          name: "Pandu",
          title: "King of Hastinapur",
          color: "blue",
          icon: <Crown className="size-5" />,
          note: "Son of Ambalika via Niyoga by Vyasa. His sons were born through divine boons.",
          spouse: [
            {
              name: "Kunti",
              title: "Princess of Kunti (Wife 1)",
              color: "blue",
            },
            {
              name: "Madri",
              title: "Princess of Madra (Wife 2)",
              color: "blue",
            },
          ],
          children: [
            // Karna - Eldest son of Kunti
            {
              name: "Karna",
              title: "The Eldest of Kunti",
              color: "red",
              icon: <Star className="size-5" />,
              note: "Firstborn son of Kunti & Surya (Sun God). Raised with love by Adhiratha & Radha. Allied with Kauravas.",
              children: [
                { name: "Vrishasena", title: "Son of Karna", color: "red" },
              ],
            },
            // Sons of Kunti (via divine boons)
            {
              name: "Yudhishthir",
              title: "The Dharma Raja",
              color: "blue",
              icon: <Crown className="size-5" />,
              note: "Eldest Pandava. Son of Kunti & Dharma (God of Righteousness).",
              spouse: {
                name: "Draupadi",
                title: "Common wife of 5 Pandavas",
                color: "pink",
                icon: <Heart className="size-5" />,
              },
              children: [
                {
                  name: "Prativindhya",
                  title: "Son from Draupadi",
                  color: "blue",
                },
              ],
            },
            {
              name: "Bhima",
              title: "The Mighty",
              color: "blue",
              icon: <Shield className="size-5" />,
              note: "Second Pandava. Son of Kunti & Vayu (Wind God).",
              spouse: [
                { name: "Draupadi", title: "Common wife", color: "pink" },
                { name: "Hidimbi", title: "Rakshasi wife", color: "amber" },
              ],
              children: [
                { name: "Sutasoma", title: "Son from Draupadi", color: "blue" },
                {
                  name: "Ghatotkacha",
                  title: "Son from Hidimbi",
                  color: "amber",
                  note: "Brave warrior with divine powers. Sacrificed himself in the great war.",
                  children: [
                    {
                      name: "Barbarik",
                      title: "Greatest warrior",
                      color: "amber",
                      note: "Could end war in 1 minute",
                    },
                  ],
                },
              ],
            },
            {
              name: "Arjuna",
              title: "The Archer",
              color: "blue",
              icon: <Sword className="size-5" />,
              note: "Third Pandava. Son of Kunti & Indra (King of Gods). Greatest archer.",
              spouse: [
                { name: "Draupadi", title: "Common wife", color: "pink" },
                { name: "Subhadra", title: "Sister of Krishna", color: "cyan" },
                { name: "Ulupi", title: "Naga princess", color: "amber" },
                {
                  name: "Chitrangada",
                  title: "Princess of Manipur",
                  color: "purple",
                },
              ],
              children: [
                {
                  name: "Shrutakarma",
                  title: "Son from Draupadi",
                  color: "blue",
                },
                {
                  name: "Abhimanyu",
                  title: "Son from Subhadra",
                  color: "blue",
                  icon: <Sword className="size-5" />,
                  note: "Brave warrior who knew the secrets of Chakravyuha. Attained martyrdom at a young age.",
                  spouse: {
                    name: "Uttara",
                    title: "Princess of Matsya",
                    color: "blue",
                  },
                  children: [
                    {
                      name: "Parikshit",
                      title: "King of Kuru Dynasty",
                      color: "blue",
                      icon: <Crown className="size-5" />,
                      note: "Born after war. Continued the Kuru lineage.",
                      children: [
                        {
                          name: "Janamejaya",
                          title: "Performed Sarpa Satra",
                          color: "blue",
                          icon: <Crown className="size-5" />,
                        },
                      ],
                    },
                  ],
                },
                { name: "Iravan", title: "Son from Ulupi", color: "amber" },
                {
                  name: "Babruvahana",
                  title: "Son from Chitrangada",
                  color: "purple",
                },
              ],
            },
            // Sons of Madri (via divine boons)
            {
              name: "Nakula",
              title: "The Handsome",
              color: "blue",
              note: "Fourth Pandava. Son of Madri & Ashwini Kumaras. Master of horses & swords.",
              spouse: { name: "Draupadi", title: "Common wife", color: "pink" },
              children: [
                {
                  name: "Shatanika",
                  title: "Son from Draupadi",
                  color: "blue",
                },
              ],
            },
            {
              name: "Sahadeva",
              title: "The Wise",
              color: "blue",
              note: "Youngest Pandava. Son of Madri & Ashwini Kumaras. Master astrologer.",
              spouse: { name: "Draupadi", title: "Common wife", color: "pink" },
              children: [
                {
                  name: "Shrutasena",
                  title: "Son from Draupadi",
                  color: "blue",
                },
              ],
            },
          ],
        },
        {
          name: "Vidura",
          title: "Wise Counsellor",
          color: "purple",
          icon: <BookOpen className="size-5" />,
          note: "Son via Niyoga by Vyasa. Incarnation of Dharma. Wise advisor to kings.",
          spouse: { name: "Sulabha", title: "Wife of Vidura", color: "purple" },
        },
      ],
    },
  ],
};

// --- Components ---

// Simple wrapper - will use context for translations
const MemberCard = ({
  member,
  isSpouse = false,
  tr,
}: {
  member: FamilyMember;
  isSpouse?: boolean;
  tr?: (text: string) => string;
}) => {
  const translate = tr || ((text: string) => text);
  return (
    <div
      className={cn(
        "flex min-w-[160px] items-center gap-2.5 rounded-xl border-2 px-3 py-2 font-medium shadow-sm transition-all hover:shadow-md sm:min-w-0",
        colorStyles[member.color],
        isSpouse && "border-dashed",
      )}
    >
      {member.icon && <span className="shrink-0">{member.icon}</span>}
      <div className="min-w-0 flex-1">
        <div className="truncate text-sm font-bold sm:text-base">
          {translate(member.name)}
        </div>
        {member.title && (
          <div className="truncate text-xs opacity-80 sm:text-sm">
            {translate(member.title)}
          </div>
        )}
      </div>
    </div>
  );
};

const FamilyNode = ({
  member,
  level = 0,
  tr,
}: {
  member: FamilyMember;
  level?: number;
  tr?: (text: string) => string;
}) => {
  const [isOpen, setIsOpen] = useState(level < 2);
  const hasChildren = member.children && member.children.length > 0;
  const hasSpouse = member.spouse;

  return (
    <div className="w-full">
      {/* Member Header */}
      <div
        className={cn(
          "flex items-start gap-3 rounded-xl p-3 transition-all",
          hasChildren && "cursor-pointer",
          hasChildren &&
            !isOpen &&
            "border-2 border-dashed border-muted-foreground/20 bg-muted/40 hover:bg-muted/70",
          hasChildren && isOpen && "hover:bg-muted/30",
        )}
        onClick={() => hasChildren && setIsOpen(!isOpen)}
      >
        {/* Expand/Collapse Icon */}
        {hasChildren ? (
          <div
            className={cn(
              "mt-2.5 shrink-0 rounded-full p-1 transition-colors",
              isOpen
                ? "bg-primary/10 text-primary"
                : "bg-muted text-muted-foreground",
            )}
          >
            {isOpen ? (
              <ChevronDown className="size-5" />
            ) : (
              <ChevronRight className="size-5" />
            )}
          </div>
        ) : (
          <div className="w-7 shrink-0" />
        )}

        {/* Member Info */}
        <div className="min-w-0 flex-1">
          <div className="scrollbar-thin flex items-center gap-2 overflow-x-auto pb-2">
            <MemberCard member={member} tr={tr} />

            {/* Spouse(s) */}
            {hasSpouse && (
              <>
                <span className="shrink-0 px-2 text-sm font-semibold text-muted-foreground">
                  +
                </span>
                {Array.isArray(member.spouse) ? (
                  member.spouse.map((s, i) => (
                    <MemberCard key={i} member={s} isSpouse tr={tr} />
                  ))
                ) : (
                  <MemberCard member={member.spouse!} isSpouse tr={tr} />
                )}
              </>
            )}

            {/* Expandable hint */}
            {hasChildren && !isOpen && (
              <span className="ml-2 shrink-0 animate-pulse rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                {member.children!.length}{" "}
                {member.children!.length === 1 ? "▼" : "▼"}
              </span>
            )}
          </div>

          {/* Note */}
          {member.note && tr && (
            <p className="ml-1 mt-2 text-sm leading-relaxed text-muted-foreground">
              <span className="font-medium">ℹ️</span> {tr(member.note)}
            </p>
          )}
          {member.note && !tr && (
            <p className="ml-1 mt-2 text-sm leading-relaxed text-muted-foreground">
              <span className="font-medium">ℹ️</span> {member.note}
            </p>
          )}
        </div>
      </div>

      {/* Children */}
      <AnimatePresence>
        {isOpen && hasChildren && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="border-l-3 ml-8 space-y-2 border-primary/30 pl-5 pt-3">
              {member.children!.map((child, i) => (
                <FamilyNode key={i} member={child} level={level + 1} tr={tr} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const GenerationSection = ({
  title,
  members,
  badge,
  defaultOpen = true,
  tr,
}: {
  title: string;
  members: FamilyMember[];
  badge?: string;
  defaultOpen?: boolean;
  tr?: (text: string) => string;
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="overflow-hidden rounded-2xl border-2 bg-card shadow-lg">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between p-5 text-left transition-colors hover:bg-muted/50"
      >
        <div className="flex items-center gap-4">
          <h3 className="font-newsreader text-xl font-bold md:text-2xl">
            {title}
          </h3>
          {badge && (
            <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
              {badge}
            </span>
          )}
        </div>
        <div
          className={cn(
            "rounded-full p-2 transition-colors",
            isOpen
              ? "bg-primary/10 text-primary"
              : "bg-muted text-muted-foreground",
          )}
        >
          {isOpen ? (
            <ChevronDown className="size-6" />
          ) : (
            <ChevronRight className="size-6" />
          )}
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="space-y-3 border-t-2 p-5">
              {members.map((member, i) => (
                <FamilyNode key={i} member={member} tr={tr} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export function FamilyTreeSection({
  subtitle,
  title,
  description,
  locale = "en",
}: FamilyTreeSectionProps) {
  // Translation helper
  const t = (en: string, hi: string) => (locale === "hi" ? hi : en);

  // Translation lookup for family tree names/titles
  const tr = (text: string) => {
    if (
      locale === "hi" &&
      hiTranslations[text as keyof typeof hiTranslations]
    ) {
      return hiTranslations[text as keyof typeof hiTranslations];
    }
    return text;
  };
  return (
    <section className="relative overflow-hidden bg-background py-8 md:py-12">
      <div className="container mx-auto max-w-5xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <SectionHeader subtitle={subtitle} title={title} align="center" />
          <p className="font-merriweather mx-auto mb-10 max-w-3xl text-center text-base text-muted-foreground md:text-lg">
            {description}
          </p>
        </motion.div>

        {/* Legend */}
        <div className="mb-8 flex flex-wrap justify-center gap-x-4 gap-y-3 px-2 text-sm">
          <div className="flex items-center gap-2">
            <div
              className={cn("size-4 shrink-0 rounded-md", badgeStyles.purple)}
            />
            <span className="whitespace-nowrap font-medium">
              {t("Kuru Ancestors", "कुरु पूर्वज")}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div
              className={cn("size-4 shrink-0 rounded-md", badgeStyles.blue)}
            />
            <span className="whitespace-nowrap font-medium">
              {t("Pandavas", "पांडव")}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div
              className={cn("size-4 shrink-0 rounded-md", badgeStyles.red)}
            />
            <span className="whitespace-nowrap font-medium">
              {t("Kauravas", "कौरव")}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div
              className={cn("size-4 shrink-0 rounded-md", badgeStyles.cyan)}
            />
            <span className="whitespace-nowrap font-medium">
              {t("Divine", "दिव्य")}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div
              className={cn("size-4 shrink-0 rounded-md", badgeStyles.pink)}
            />
            <span className="whitespace-nowrap font-medium">
              {t("Queens", "रानियाँ")}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div
              className={cn("size-4 shrink-0 rounded-md", badgeStyles.amber)}
            />
            <span className="whitespace-nowrap font-medium">
              {t("Others", "अन्य")}
            </span>
          </div>
        </div>

        {/* Family Tree */}
        <div className="space-y-6">
          <GenerationSection
            title={t("The Kuru Dynasty", "कुरु राजवंश")}
            members={[completeTree]}
            badge={t("Complete Lineage", "पूर्ण वंशावली")}
            tr={tr}
          />
        </div>

        <p className="mt-8 text-center text-sm text-muted-foreground">
          💡{" "}
          {t(
            "Click on highlighted rows to expand/collapse. Dashed borders indicate spouses.",
            "विस्तार/संक्षिप्त करने के लिए हाइलाइट की गई पंक्तियों पर क्लिक करें। धराशायी सीमाएं जीवनसाथी को दर्शाती हैं।",
          )}
        </p>
      </div>
    </section>
  );
}
