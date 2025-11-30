import { Metadata } from "next";
import Image from "next/image";

import { SvgFloralDivider } from "components/svgs";

// Static page - optimize for SEO
export const dynamic = "force-static";

export async function generateStaticParams() {
  return [{ locale: [] }, { locale: ["hi"] }];
}

export const metadata: Metadata = {
  title: "Bhagavad Gita Parallel View - Compare 20+ Translations Side by Side",
  description:
    "Compare Bhagavad Gita translations from 20+ scholars simultaneously. View parallel interpretations and commentaries in Hindi & English for deeper understanding.",
  keywords:
    "bhagavad gita parallel translation, compare gita translations, gita parallel view, multiple gita commentaries, side by side gita",
  authors: [{ name: "Ved Vyasa" }],
  creator: "Ved Vyas Foundation",
  publisher: "Ved Vyas Foundation",
  openGraph: {
    title: "Bhagavad Gita Parallel Translation - Compare Multiple Translations",
    description:
      "Read Bhagavad Gita verses with parallel translations from multiple authors side by side. Compare different interpretations and commentaries.",
    url: "https://bhagavadgita.io/verse-parallel",
    siteName: "Bhagavad Gita",
    locale: "en_US",
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
    title: "Bhagavad Gita Parallel Translation",
    description:
      "Compare multiple Bhagavad Gita translations side by side from various authors and commentaries.",
    images: [
      "https://bhagavadgita.io/_next/image?url=%2Fbanner2.png&w=3840&q=75",
    ],
    site: "@ShriKrishna",
  },
  alternates: {
    canonical: "https://bhagavadgita.io/verse-parallel",
  },
};

export default function VerseParallel() {
  return (
    <div className="mb-16 font-inter">
      <div className="mx-auto max-w-5xl px-4 py-12 text-center font-inter sm:px-6">
        <Image
          src="/arrow-left.png"
          className="fixed left-3 top-1/2 -z-10 md:top-1/3"
          width={40}
          height={40}
          alt="arrow left icon"
        />
        <Image
          src="/arrow-right.png"
          className="fixed right-3 top-1/2 -z-10 md:top-1/3"
          width={40}
          height={40}
          alt="arrow right icon"
        />
        <h1 className="text-3xl font-extrabold">BG 1.1</h1>
        <p className="mx-auto mt-4 max-w-md font-dev text-2xl text-my-orange">
          धृतराष्ट्र उवाच | धर्मक्षेत्रे कुरुक्षेत्रे समवेता युयुत्सवः | मामकाः
          पाण्डवाश्चैव किमकुर्वत सञ्जय ||1||
        </p>
        <p className="mx-auto mt-4 max-w-md text-xl">
          dhṛitarāśhtra uvācha dharma-kṣhetre kuru-kṣhetre samavetā yuyutsavaḥ
          māmakāḥ pāṇḍavāśhchaiva kimakurvata sañjaya
        </p>
        <p className="mx-auto mt-4 text-xl">
          dhṛitarāśhtraḥ uvācha—Dhritarashtra said; dharma-kṣhetre—the land of
          dharma; kuru-kṣhetre—at Kurukshetra; samavetāḥ—having gathered;
          yuyutsavaḥ—desiring to fight; māmakāḥ—my sons; pāṇḍavāḥ—the sons of
          Pandu; cha—and; eva—certainly; kim—what; akurvata—did they do;
          sañjaya—Sanjay
        </p>
        <SvgFloralDivider className="my-16 w-full text-white dark:text-dark-bg" />
      </div>
    </div>
  );
}
