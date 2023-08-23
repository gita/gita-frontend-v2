"use client";

import classNames from "utils/classNames";
import PageHeader from "components/Headers/PageHeader";
import { Verse } from "components/Verse/Verse";
import { getMyStyles } from "app/shared/functions";

type Props = {
  verseData: GitaVerse;
};

export default function VersePage({ verseData }: Props) {
  const styles = getMyStyles();

  return (
    <div
      className={classNames(
        "font-inter dark:bg-dark-bg",
        `bg-${styles.backgroundColor}`,
      )}
    >
      <PageHeader />
      {verseData && <Verse verse={verseData} />}
      {!verseData && (
        <h1 className="p-5 text-center">This verse was not found</h1>
      )}
    </div>
  );
}
