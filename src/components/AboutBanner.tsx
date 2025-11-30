import Image from "next/image";

import { getTranslate } from "shared/translate";

import AboutGitaBanner from "../../public/quotes-bg.png";

export default function AboutBanner(props: LocaleAndTranslations) {
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
            {translate("About Bhagavad Gita")}
          </h1>
          <p className="text-shadow z-20 mx-auto mt-6 max-w-3xl text-center text-lg font-medium text-white md:text-xl">
            {translate(
              "Sacred 700-verse scripture from the Mahabharata - Lord Krishna's timeless teachings to Arjuna on dharma, karma yoga, and spiritual liberation",
            )}
          </p>
        </div>
      </div>
    </>
  );
}
