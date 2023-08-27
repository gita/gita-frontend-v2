import { useEffect, useState } from "react";

import { getCookie, setCookie } from "components/shared/functions";
import { upperFirst } from "shared/functions";

const booleanOrTrue = (cookieValue: string | boolean | undefined) => {
  try {
    const parsed = JSON.parse(String(cookieValue));
    return parsed ?? true;
  } catch {
    //
  }
  return true;
};

const getAdvancedSettings = () => ({
  devanagari: booleanOrTrue(getCookie("bgDevanagari")),
  verseText: booleanOrTrue(getCookie("bgVerseText")),
  synonyms: booleanOrTrue(getCookie("bsSynonyms")),
  translation: booleanOrTrue(getCookie("bgTranslation")),
  purport: booleanOrTrue(getCookie("bgPurport")),
});

function useAdvancedSettings() {
  const [advancedSettings, setAdvancedSettings] = useState<AdvancedSettings>({
    devanagari: true,
    verseText: true,
    synonyms: true,
    translation: true,
    purport: true,
  });

  useEffect(() => {
    setAdvancedSettings(getAdvancedSettings());
  }, []);

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
