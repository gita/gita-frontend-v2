import React from "react";
import Link from "next/link";
import Image from "next/image";

const Banner = () => {
  return (
    <>
      <div className="max-w-full mx-auto xl:mx-24 z-10 relative">
        <Image
          src="/banner2.png"
          alt="BG Home Banner Image"
          layout="fill"
          objectFit="cover"
          objectPosition="center"
          className="xl:rounded-lg"
          priority
        />
        <div className="xl:rounded-lg flex flex-col h-4/5 px-8 py-36">
          <h1 className="text-3xl md:text-5xl text-center font-extrabold text-shadow text-white t-shadow z-30">
            Experience the Gita
          </h1>
          <h1 className="text-3xl md:text-5xl text-center font-extrabold text-shadow text-lead-text t-shadow z-30">
            Anywhere, Anytime
          </h1>

          <Link href={"/chapter/1"}>
            <button
              type="button"
              className="inline-flex items-center px-6 py-3 border  mx-auto mt-4 max-w-max border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-my-orange z-30"
            >
              Read Now
            </button>
          </Link>
        </div>
      </div>
      <div className="absolute z-[-1] h-96 -mt-60 w-full">
        <Image
          src="/main.png"
          layout="fill"
          objectFit="cover"
          objectPosition="center"
        />
      </div>
    </>
  );
};

export default Banner;
