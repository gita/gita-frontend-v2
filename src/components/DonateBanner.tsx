import Image from "next/image";

import { getTranslate } from "shared/translate";

export default function DonateBanner(props: LocaleAndTranslations) {
  const { locale, translations } = props;
  const translate = getTranslate(translations, locale);

  return (
    <>
      <div className="relative z-10 mx-auto max-w-full xl:mx-24">
        <Image
          src="/banner2.png"
          alt="BG Banner Image"
          fill
          style={{
            objectFit: "cover",
            objectPosition: "center",
          }}
          className="xl:rounded-lg"
        />
        <div className="flex h-4/5 flex-col px-8 py-36">
          <h1 className="text-shadow z-20 text-center text-3xl font-extrabold uppercase text-white md:text-5xl">
            {translate("Donate")}
          </h1>
        </div>
      </div>
    </>
  );
}
