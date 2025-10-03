import Image from "next/image";

import LinkWithLocale from "components/LinkWithLocale";
import { getTranslate } from "shared/translate";

type Props = {
  hint?: string;
  isChapter?: boolean;
  isVerse?: boolean;
} & LocaleAndTranslations;

function NotFound(props: Props) {
  const { hint } = props;
  const { translations, locale, isChapter, isVerse } = props;

  const translate = getTranslate(translations, locale);

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden">
    <Image
      src="/quotes-bg.png"
      alt="BG Not Found Banner Image"
      fill
      className="absolute inset-0 -z-10 object-cover object-center"
      priority
    />
  
    <div className="z-10 p-4 text-center drop-shadow-card">
      <h1 className="mb-4 text-4xl font-bold text-my-orange">
        {isChapter
          ? `${translate("Chapter")} ${hint} ${translate("Not found")}`
          : isVerse
          ? `${translate("Chapter")} ${hint?.split(" ")[0]} ${translate("Verse")} ${hint?.split(" ")[1]} ${translate("Not found")}`
          : `${translate(hint || "Not found")}`}
      </h1>
      <p className="mb-8 text-xl text-white">
        {translate("Sorry, the page you're looking for doesn't exist")}
      </p>
      <LinkWithLocale
        href="/"
        className="inline-flex items-center rounded-md border border-gray-300 bg-white px-6 py-3 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-my-orange focus:ring-offset-2"
      >
        {translate("Go Back to Home")}
      </LinkWithLocale>
    </div>
  </div>
  
  );
}

export default NotFound;
