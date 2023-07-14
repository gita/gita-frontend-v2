import Translation from "../../components/Verse/Translation";
import Commentary from "../../components/Verse/Commentary";
import { Metadata } from "next";
import Image from "next/image";
import { SvgFloralDivider } from "../../components/svgs";

export const metadata: Metadata = {
  title: "Bhagavad Gita App - Verse",
};

export default function VerseParallel() {
  return (
    <div className="font-inter mb-16">
      <div className="max-w-5xl font-inter py-12 mx-auto text-center  px-4 sm:px-6">
        <Image
          src="/arrow-left.png"
          className="fixed z-neg top-1/2 md:top-1/3 left-3"
          width={40}
          height={40}
          alt="arrow left icon"
        />
        <Image
          src="/arrow-right.png"
          className="fixed z-neg top-1/2 md:top-1/3 right-3"
          width={40}
          height={40}
          alt="arrow right icon"
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
        <SvgFloralDivider className="my-16 w-full text-white dark:text-dark-bg" />

        <div className="grid grid-cols-2 gap-4">
          <div>
            {/*<Translation />*/}
            {/*<Commentary />*/}
          </div>

          <div>
            {/*<Translation />*/}
            {/*<Commentary />*/}
          </div>
        </div>
      </div>
    </div>
  );
}
