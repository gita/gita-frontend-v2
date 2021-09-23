import React from "react";
import PagesLayout from "../layouts/PagesLayout";
import Head from "next/head";

const Verse = () => {
  return (
    <div className="font-inter mb-16">
      <Head>
        <title>Bhagwat Gita App - Verse</title>
        <link rel="icon" href="/favicon.ico" />
        <link ref="style" rel="stylesheet" href="/globals.css" />
      </Head>
      <div className="max-w-5xl font-inter py-12 mx-auto text-center  px-4 sm:px-6">
        <img
          src="arrow-left.png"
          className="fixed z-neg top-1/2 md:top-1/3 left-3"
        />
        <img
          src="arrow-right.png"
          className="fixed z-neg top-1/2 md:top-1/3 right-3"
        />
        <h1 className="font-extrabold text-3xl">BG 1.1</h1>
        <p className="font-dev text-my-orange mt-4  text-2xl max-w-md mx-auto">
          धृतराष्ट्र उवाच | धर्मक्षेत्रे कुरुक्षेत्रे समवेता युयुत्सवः | मामकाः
          पाण्डवाश्चैव किमकुर्वत सञ्जय ||1||
        </p>
        <p className="  mt-4  text-xl max-w-md mx-auto">
          dhṛitarāśhtra uvācha dharma-kṣhetre kuru-kṣhetre samavetā yuyutsavaḥ
          māmakāḥ pāṇḍavāśhchaiva kimakurvata sañjaya
        </p>
        <p className="  mt-4  text-xl  mx-auto">
          dhṛitarāśhtraḥ uvācha—Dhritarashtra said; dharma-kṣhetre—the land of
          dharma; kuru-kṣhetre—at Kurukshetra; samavetāḥ—having gathered;
          yuyutsavaḥ—desiring to fight; māmakāḥ—my sons; pāṇḍavāḥ—the sons of
          Pandu; cha—and; eva—certainly; kim—what; akurvata—did they do;
          sañjaya—Sanjay
        </p>
        <img src="floral-divider.svg" className="my-16 w-full" />
        <h1 className="font-extrabold text-3xl">Translation</h1>
        <p className="  mt-4    mx-auto text-left">
          Dhritarashtra said: O Sanjay, after gathering on the holy field of
          Kurukshetra, and desiring to fight, what did my sons and the sons of
          Pandu do?
        </p>
        <h1 className="font-extrabold text-3xl mt-4">Commentary</h1>
        <p className="  mt-4    mx-auto text-left">
          The two armies had gathered on the battlefield of Kurukshetra, well
          prepared to fight a war that was inevitable. Still, in this verse,
          King Dhritarashtra asked Sanjay, what his sons and his brother Pandu’s
          sons were doing on the battlefield? It was apparent that they would
          fight, then why did he ask such a question?
        </p>
        <p className="  mt-4    mx-auto text-left">
          The blind King Dhritarashtra’s fondness for his own sons had clouded
          his spiritual wisdom and deviated him from the path of virtue. He had
          usurped the kingdom of Hastinapur from the rightful heirs; the
          Pandavas, sons of his brother Pandu. Feeling guilty of the injustice
          he had done towards his nephews, his conscience worried him about the
          outcome of this battle.
        </p>
        <p className="  mt-4    mx-auto text-left">
          The words dharma kṣhetre, the land of dharma (virtuous conduct) used
          by Dhritarashtra depict the dilemma he was experiencing. Kurukshetra
          is described as kurukṣhetraṁ deva yajanam in the Shatapath Brahman,
          the Vedic textbook detailing rituals. It means “Kurukshetra is the
          sacrificial arena of the celestial gods.” Hence, it was regarded as
          the sacred land that nourished dharma.
        </p>
        <p className=" mt-4 mx-auto text-left">
          Dhritarashtra feared that the holy land might influence the minds of
          his sons. If it aroused the faculty of discrimination, they might turn
          away from killing their cousins and negotiate a truce. A peaceful
          settlement meant that the Pandavas would continue being a hindrance
          for them. He felt great displeasure at these possibilities, instead
          preferred that this war transpires. He was uncertain of the
          consequences of the war, yet desired to determine the fate of his
          sons. Therefore, he asked Sanjay about the activities of the two
          armies on the battleground.
        </p>
      </div>
    </div>
  );
};

export default Verse;

Verse.getLayout = function getLayout(page) {
  return <PagesLayout>{page}</PagesLayout>;
};
