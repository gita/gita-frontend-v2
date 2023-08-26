import Image from "next/image";

import PrivacyTermsBannerImage from "../../../public/quotes-bg.png";

interface PrivacyTermsBannerProps {
  title: string;
  lastUpdated: string;
}

export default function PrivacyTermsBanner({
  title,
  lastUpdated,
}: PrivacyTermsBannerProps) {
  return (
    <>
      <div className="relative z-10 mx-auto max-w-full xl:mx-24">
        <Image
          src={PrivacyTermsBannerImage}
          placeholder="blur"
          alt="BG Privacy Terms Banner Image"
          fill
          style={{
            objectFit: "cover",
            objectPosition: "center",
          }}
          className="xl:rounded-lg"
        />
        <div className="flex h-4/5 flex-col px-8 py-36">
          <h1 className="text-shadow t-shadow z-20 text-center text-3xl font-extrabold text-white md:text-5xl">
            {title}
          </h1>
          <p className="text-shadow z-20 mt-5 text-center text-gray-200">
            Last updated: {lastUpdated}
          </p>
        </div>
      </div>
    </>
  );
}
