import { type NextRequest, NextResponse } from "next/server";

import { supportedLocales } from "shared/constants";
import { getLanguageSettings } from "shared/functions";

export function middleware(req: NextRequest) {
  const { origin, pathname, searchParams } = new URL(req.url);

  const cookieT = req.cookies.get("translationAuthorId")?.value;
  const cookieC = req.cookies.get("commentaryAuthorId")?.value;

  const searchL = searchParams.get("l");
  const searchT = searchParams.get("t");
  const searchC = searchParams.get("c");

  const anyT = searchT || (typeof cookieT === "string" && cookieT) || "";
  const anyC = searchC || (typeof cookieC === "string" && cookieC) || "";

  const { translationAuthor, commentaryAuthor } = getLanguageSettings({
    translationAuthorId: parseInt(anyT),
    commentaryAuthorId: parseInt(anyC),
  });
  const translationAuthorIsInconsistent =
    searchT && searchT !== String(translationAuthor.id);
  const commentaryAuthorIsInconsistent =
    searchC && searchC !== String(commentaryAuthor.id);

  const someSettingIsInconsistent =
    translationAuthorIsInconsistent || commentaryAuthorIsInconsistent;

  if (someSettingIsInconsistent) {
    const urlSearchParams = new URLSearchParams({
      t: String(translationAuthor.id),
      c: String(commentaryAuthor.id),
    });
    const updatedUrl = `${origin}${pathname}?${urlSearchParams.toString()}`;
    return NextResponse.redirect(updatedUrl);
  }

  const [maybeLocale] = pathname.split("/").filter(Boolean).reverse();

  const response = NextResponse.next({
    headers: {
      "x-settings-l": supportedLocales.includes(maybeLocale) ? maybeLocale : "",
      "x-settings-t": String(translationAuthor.id),
      "x-settings-c": String(commentaryAuthor.id),
    },
  });

  return response;
}

export const config = {
  matcher: "/chapter/:chapterId/verse/:verseId*",
};
