import { useEffect, useState } from "react";

import { getCookie, setCookie } from "components/shared/functions";
import { upperFirst } from "shared/functions";

const booleanOrTrue = (
  cookieValue: string | boolean | undefined | null,
  defaultTo = true,
): boolean => {
  try {
    const parsed = JSON.parse(String(cookieValue));
    return parsed ?? defaultTo;
  } catch {
    //
  }
  return true;
};

const getAdvancedSettings = (locale: Locale) => ({
  devanagari: booleanOrTrue(getCookie("bgDevanagari")),
  verseText: booleanOrTrue(getCookie("bgVerseText"), locale === "en"),
  synonyms: booleanOrTrue(getCookie("bgSynonyms"), locale === "en"),
  translation: booleanOrTrue(getCookie("bgTranslation")),
  purport: booleanOrTrue(getCookie("bgPurport")),
});

function useAdvancedSettings(locale: Locale) {
  const [advancedSettings, setAdvancedSettings] = useState<AdvancedSettings>({
    devanagari: true,
    verseText: true,
    synonyms: true,
    translation: true,
    purport: true,
  });

  useEffect(() => {
    setAdvancedSettings(getAdvancedSettings(locale));
  }, [locale]);

  const updateAdvancedSettings = (update: Partial<AdvancedSettings>) => {
    const updatedAdvancedSettings = {
      ...advancedSettings,
      ...update,
    };
    Object.entries(update).forEach(([key, value]) => {
      setCookie(`bg${upperFirst(key)}`, String(value));
    });
    setAdvancedSettings(updatedAdvancedSettings);
  };

  return {
    advancedSettings,
    updateAdvancedSettings,
  };
}

export default useAdvancedSettings;
