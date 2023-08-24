export const getTranslate = (translations: Record<string, string>) => {
  const translationsKeys = Object.keys(translations);
  return (literal: string) => {
    const translation = translations[literal];
    if (translation) {
      return translation;
    } else if (translationsKeys.length && typeof window === "undefined") {
      console.error(`Literal ${literal} not found in translations`);
    }
    return literal;
  };
};
