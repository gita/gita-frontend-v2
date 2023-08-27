import Image from "next/image";

import { getTranslate } from "shared/translate";

import AboutGitaBanner from "../../public/quotes-bg.png";

type Props = {
  locale: Locale;
  translations: Record<string, string>;
};

export default function AboutBanner(props: Props) {
  const { locale, translations } = props;
  const translate = getTranslate(translations, locale);

  return (
    <>
      <div className="relative z-10 mx-auto max-w-full xl:mx-24">
        <Image
          src={AboutGitaBanner}
          placeholder="blur"
          alt="BG About Banner Image"
          fill
          style={{
            objectFit: "cover",
            objectPosition: "center",
          }}
          className="xl:rounded-lg"
        />
        <div className="flex h-4/5 flex-col px-8 py-36">
          <h1 className="text-shadow z-20 text-center text-3xl font-extrabold uppercase text-white md:text-5xl">
            {translate("About Bhagwad Gita")}
          </h1>
        </div>
      </div>
    </>
  );
}
