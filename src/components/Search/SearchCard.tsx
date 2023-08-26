import LinkWithLocale from "components/LinkWithLocale";

interface Props {
  chapterNumber: number;
  verseNumber: number;
  transliteration: string;
  translate: (literal: string) => string;
}

const SearchCard = ({
  chapterNumber,
  verseNumber,
  transliteration,
  translate,
}: Props) => {
  return (
    <LinkWithLocale
      href={`chapter/${chapterNumber}/verse/${verseNumber}`}
      prefetch={false}
    >
      <div className="mt-4 flex w-full flex-col justify-between rounded-lg border px-6 py-2 hover:cursor-pointer hover:bg-box-bg lg:py-5">
        <div className="text-md pb-2 font-semibold uppercase text-my-orange lg:w-2/5">
          {translate("Chapter")} {chapterNumber} - {translate("Verse")}{" "}
          {verseNumber}
        </div>
        <div className="flex-1 text-sm text-gray-900 sm:col-span-4 sm:mt-0">
          {transliteration}
        </div>
      </div>
    </LinkWithLocale>
  );
};

export default SearchCard;
