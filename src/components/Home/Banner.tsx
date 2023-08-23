import Link from "next/link";
import Image from "next/image";

const Banner = () => {
  return (
    <>
      <div className="relative z-10 mx-auto h-[451px] max-w-7xl">
        <Image
          src="/banner2.png"
          alt="BG Home Banner Image"
          fill
          style={{
            objectFit: "cover",
            objectPosition: "center",
          }}
          className="shadow-xl xl:rounded-lg"
          priority
        />
        <div className="flex h-4/5 flex-col px-8 py-36 xl:rounded-lg">
          <h1 className="text-shadow t-shadow z-30 text-center text-3xl font-extrabold text-white md:text-6xl">
            Experience the Gita
          </h1>
          <h1 className="text-shadow t-shadow z-30 text-center text-3xl font-extrabold text-lead-text md:text-6xl">
            Anywhere, Anytime
          </h1>

          <Link
            href={"/chapter/1"}
            className="z-30 mx-auto mt-10 inline-flex max-w-max items-center rounded-md border border-gray-300 bg-white px-6 py-3 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-my-orange focus:ring-offset-2"
          >
            Read Now
          </Link>
        </div>
      </div>
    </>
  );
};

export default Banner;
