import React from "react";
import Head from "next/head";
import QuotesBanner from "../components/Shared/QuotesBanner";
import HomeLayout from "../layouts/HomeLayout";

const quotes = [
  "Whenever dharma declines and the purpose of life is forgotten, I manifest myself on earth. I am born in every age to protect the good, to destroy evil, and to reestablish dharma.",
  "As they approach me, so I receive them. All paths, Arjuna, lead to me.",
  "I am the beginning, middle, and end of creation.",
  "Among animals I am the lion; among birds, the eagle Garuda. I am Prahlada, born among the demons, and of all that measures, I am time.",
  "I am death, which overcomes all, and the source of all beings still to be born.",
  "Just remember that I am, and that I support the entire cosmos with only a fragment of my being.",
  "Behold, Arjuna, a million divine forms, with an infinite variety of color and shape. Behold the gods of the natural world, and many more wonders never revealed before. Behold the entire cosmos turning within my body, and the other things you desire to see.",
  "I am time, the destroyer of all; I have come to consume the world.",
  "That one is dear to me who runs not after the pleasant or away from the painful, grieves not, lusts not, but lets things come and go as they happen.",
  "Just as a reservoir is of little use when the whole countryside is flooded, scriptures are of little use to the illumined man or woman, who sees the Lord everywhere.",
  "They alone see truly who see the Lord the same in every creature, who see the deathless in the hearts of all that die. Seeing the same Lord everywhere, they do not harm themselves or others. Thus they attain the supreme goal.",
  "With a drop of my energy I enter the earth and support all creatures. Through the moon, the vessel of life-giving fluid, I nourish all plants. I enter breathing creatures and dwell within as the life-giving breath. I am the fire in the stomach which digests all food.",
  "Those who worship the devas will go to the realm of the devas; those who worship their ancestors will be united with them after death. Those who worship phantoms will become phantoms; but my devotees will come to me. Those who worship the devas will go to the realm of the devas; those who worship their ancestors will be united with them after death. Those who worship phantoms will become phantoms; but my devotees will come to me.",
  "Fill your mind with me; love me; serve me; worship me always. Seeking me in your heart, you will at last be united with me.",
  "All the scriptures lead to me; I am their author and their wisdom.",
  "Bhishma, Drona, Jayadratha, Karna, and many others are already slain. Kill those whom I have killed. Do not hesitate. Fight in this battle and you will conquer your enemies.",
  "Not by knowledge of the Vedas, nor sacrifice, nor charity, nor rituals, nor even by severe asceticism has any other mortal seen what you have seen, O heroic Arjuna.",
  "Better indeed is knowledge than mechanical practice. Better than knowledge is meditation. But better still is surrender of attachment to results, because there follows immediate peace.",
  "Some realize the Self within them through the practice of meditation, some by the path of wisdom, and others by selfless service. Others may not know these paths; but hearing and following the instructions of an illumined teacher, they too go beyond death.",
  "The brightness of the sun, which lights up the world, the brightness of the moon and of fire - these are my glory.",
  "Calmness, gentleness, silence, self-restraint, and purity: these are the disciplines of the mind.97. To refrain from selfish acts is one kind of renunciation, called sannyasa; to renounce the fruit of action is another, called tyaga.",
  "By serving me with steadfast love, a man or woman goes beyond the gunas. Such a one is fit for union with Braman.",
  "When they see the variety of creation rooted in that unity and growing out of it, they attain fulfillment in Brahman.",
  "I have shared this profound truth with you, Arjuna. Those who understand it will attain wisdom; they will have done that which has to be done.",
  "I give you these precious words of wisdom; reflect on them and then do as you choose.",
];

const Quotes = () => {
  return (
    <div className="mb-16">
      <Head>
        <title>Bhagavad Gita App - Quotes</title>
      </Head>
      <QuotesBanner />
      <div className="max-w-5xl font-inter py-12 mx-auto  px-4 sm:px-6">
        {quotes.map((quote, index) => (
          <p className="mt-3 text-xl" key={index}>
            {index + 1}. {quote}
          </p>
        ))}
      </div>
    </div>
  );
};

export default Quotes;

Quotes.getLayout = function getLayout(page) {
  return <HomeLayout>{page}</HomeLayout>;
};
