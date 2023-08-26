import { useEffect, useState } from "react";

import { getCookie, setCookie } from "components/shared/functions";

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
  devanagari: booleanOrTrue(getCookie("devanagari")),
  verseText: booleanOrTrue(getCookie("verseText")),
  synonyms: booleanOrTrue(getCookie("synonyms")),
  translation: booleanOrTrue(getCookie("translation")),
  purport: booleanOrTrue(getCookie("purport")),
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
      setCookie(key, String(value));
    });
    setAdvancedSettings(updatedAdvancedSettings);
  };

  return {
    advancedSettings,
    updateAdvancedSettings,
  };
}

export default useAdvancedSettings;
