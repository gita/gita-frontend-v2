import { headers } from "next/headers";

import PageHeader from "components/Headers/PageHeader";
import { Verse } from "components/Verse/Verse";
import { headerToLocale } from "shared/functions";
import classNames from "utils/classNames";

type Props = {
  verseData: GitaVerse;
  translations: Record<string, string>;
};

export default function VersePage({ verseData, translations }: Props) {
  // const styles = getMyStyles();
  const headersList = headers();

  return (
    <div
      className={classNames(
        "font-inter dark:bg-dark-bg",
        // `bg-${styles.backgroundColor}`,
      )}
    >
      <PageHeader
        translations={translations}
        locale={headerToLocale(headersList.get("x-settings-l"))}
      />
      {verseData && <Verse verse={verseData} />}
      {!verseData && (
        <h1 className="p-5 text-center">This verse was not found</h1>
      )}
    </div>
  );
}
