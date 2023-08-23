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
      <div className="max-w-full mx-auto xl:mx-24 z-10 relative">
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
        <div className="flex flex-col h-4/5 px-8 py-36">
          <h1 className="text-3xl md:text-5xl text-center font-extrabold text-shadow text-white t-shadow z-20">
            {title}
          </h1>
          <p className="text-center text-gray-200 text-shadow z-20 mt-5">
            Last updated: {lastUpdated}
          </p>
        </div>
      </div>
    </>
  );
}
