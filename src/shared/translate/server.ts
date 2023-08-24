import { headers } from "next/headers";

import { supportedLocales } from "shared/constants";

export const getTranslations = async (paths: string[]) => {
  const headersList = headers();
  const locale = headersList.get("x-settings-l");
  return supportedLocales.includes(locale)
    ? (
        await Promise.all(
          paths.map((path) =>
            import(`../../../src/${path}/${locale}.json`).then(
              (imported) => imported.default,
            ),
          ),
        )
      ).reduce(
        (prev, cur) => ({
          ...prev,
          ...cur,
        }),
        [],
      )
    : {};
};
