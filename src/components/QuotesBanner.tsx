import Image from "next/image";

import QuotesBannerBG from "../../public/quotes-bg.png";

type Props = {
  translate: Translate;
};

export default function QuotesBanner(props: Props) {
  const { translate } = props;

  return (
    <div className="relative z-10 mx-auto max-w-full xl:mx-24 md:mb-5">
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
        <h1 className="text-shadow z-20 whitespace-break-spaces text-center text-3xl font-extrabold text-white md:text-5xl">
          {translate("Bhagavad Gita Quotes By\nLord Krishna")}
        </h1>
      </div>
    </div>
  );
}
