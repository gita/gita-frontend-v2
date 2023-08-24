export const getTranslate =
  (translations: Record<string, string>) => (literal: string) =>
    translations[literal] || literal;
