import Image from "next/image";

import { getTranslate } from "shared/translate";

import Card from "./Card";

const Chapters = ({ chapters, locale, translations }: ChaptersProps) => {
  const translate = getTranslate(translations, locale);

  return (
    <div className="relative my-14">
      <Image
        src="/bg-verses-fixed.png"
        alt="BG Chapters Image"
        fill
        style={{
          objectFit: "cover",
          objectPosition: "center",
        }}
        className="z-[-1]"
      />
      <div className="z-50 mx-auto max-w-7xl px-4 sm:px-6">
        <div>
          <h1 className="mb-10 text-5xl font-bold dark:text-white">
            {translate("Chapters")}
          </h1>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {chapters.map((chapter) => (
              <Card key={chapter.id} chapter={chapter} translate={translate} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chapters;
