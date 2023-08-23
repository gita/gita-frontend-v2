import { Metadata } from "next";
import AboutBanner from "../../components/Shared/AboutBanner";

export const metadata: Metadata = {
  title: "What is The Bhagavad Gita -  BhagavadGita.io",
  description:
    "Bhagavad Gita, also known as the Gita - the song of lord is a practical guide to one's life that guides one re-organise their life, achieve inner peace and approach supreme lord (the ultimate reality).",
  openGraph: {
    title: "Srimad Bhagavad Gita - Free Searchable Online Bhagwat Geeta",
    description:
      "Bhagavad Gita, also known as the Gita - the song of lord is a practical guide to one's life that guides one re-organise their life, achieve inner peace and approach supreme lord (the ultimate reality).",
    url: "https://bhagavadgita.io/about/",
    siteName: "Bhagavad Gita",
    images: "https://bhagavadgita.io/static/images/sribhagavadgita.jpg",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "What is The Bhagavad Gita -  BhagavadGita.io",
    description:
      "Bhagavad Gita, also known as the Gita - the song of lord is a practical guide to one's life that guides one re-organise their life, achieve inner peace and approach supreme lord (the ultimate reality).",
    images: ["https://bhagavadgita.io/static/images/sribhagavadgita.jpg"],
    site: "@ShriKrishna",
  },
};

export default function About() {
  const jsonLdFirst = {
    "@context": "http://schema.org",
    "@type": "Organization",
    "@id": "#organization",
    name: "Bhagavad Gita",
    url: "https://bhagavadgita.io",
    logo: "https://bhagavadgita.io/static/images/radhakrishna.png",
  };

  const jsonLdTwo = {
    "@context": "http://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        item: {
          "@id": "https://bhagavadgita.io",
          name: "Home",
        },
      },
      {
        "@type": "ListItem",
        position: 2,
        item: {
          "@id": "https://bhagavadgita.io/about/",
          name: "What is The Bhagavad Gita -  BhagavadGita.io",
        },
      },
    ],
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
      <AboutBanner />
      <div className="mx-auto max-w-5xl px-4 py-12  font-inter sm:px-6">
        <p className="mt-8 text-xl ">
          Bhagavad Gita, also known as the Gita - &quot;The Song of The
          Lord&quot; is a practical guide to one&apos;s life that guides one to
          re-organise their life, achieve inner peace and approach the Supreme
          Lord (the Ultimate Reality). It is a 700-verse text in Sanskrit which
          comprises chapters 23 through 40 in the Bhishma-Parva section of the
          Mahabharata.
        </p>
        <p className="mt-8 text-xl ">
          The Bhagavad Gita is a dialogue between Arjuna, a supernaturally
          gifted warrior and his guide and charioteer Lord Krishna on the
          battlefield of Kurukshetra. As both armies stand ready for the battle,
          the mighty warrior Arjuna, on observing the warriors on both sides
          becomes overwhelmed with grief and compassion due to the fear of
          losing his relatives and friends and the consequent sins attributed to
          killing his own relatives. So, he surrenders to Lord Krishna, seeking
          a solution. Thus, follows the wisdom of the Bhagavad Gita. Over 18
          chapters, Gita packs an intense analysis of life, emotions and
          ambitions, discussion of various types of yoga, including Jnana,
          Bhakti, Karma and Raja, the difference between Self and the material
          body as well as the revelation of the Ultimate Purpose of Life.
        </p>
      </div>
    </>
  );
}
