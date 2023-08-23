import Image from "next/image";
import QuotesBannerBG from "../../../public/quotes-bg.png";
export default function QuotesBanner() {
  return (
    <div className="relative z-10 mx-auto max-w-full xl:mx-24">
      <Image
        src={QuotesBannerBG}
        alt="BG Quotes Banner Image"
        placeholder="blur"
        layout="fill"
        objectFit="cover"
        objectPosition="center"
        className="xl:rounded-lg"
      />
      <div className="flex h-4/5 flex-col px-8 py-36">
        <h1 className="text-shadow t-shadow z-20 text-center text-3xl font-extrabold text-white md:text-5xl">
          Bhagavad Gita Quotes By <br /> Lord Krishna
        </h1>
      </div>
    </div>
  );
}
