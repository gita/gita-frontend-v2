import { Metadata } from "next";
import Image from "next/image";

import { SvgFloralDivider } from "components/svgs";

export const metadata: Metadata = {
  title: "Bhagavad Gita App - Verse",
};

export default function VerseParallel() {
  return (
    <div className="mb-16 font-inter">
      <div className="mx-auto max-w-5xl px-4 py-12 text-center  font-inter sm:px-6">
        <Image
          src="/arrow-left.png"
          className="-z-10 fixed left-3 top-1/2 md:top-1/3"
          width={40}
          height={40}
          alt="arrow left icon"
        />
        <Image
          src="/arrow-right.png"
          className="-z-10 fixed right-3 top-1/2 md:top-1/3"
          width={40}
          height={40}
          alt="arrow right icon"
        />
        <h1 className="text-3xl font-extrabold">BG 1.1</h1>
        <p className="mx-auto mt-4 max-w-md  font-dev text-2xl text-my-orange">
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
