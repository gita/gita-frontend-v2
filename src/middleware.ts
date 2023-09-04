import { type NextRequest, NextResponse } from "next/server";

import { supportedLocales } from "shared/constants";
import { getLanguageSettings, isLocale } from "shared/functions";

export function middleware(req: NextRequest) {
  const { origin, pathname, searchParams } = new URL(req.url);

  const cookieT = req.cookies.get("bgTranslationAuthorId")?.value;
  const cookieC = req.cookies.get("bgCommentaryAuthorId")?.value;
  const cookieL = req.cookies.get("bgLocale")?.value;

  const searchT = searchParams.get("t");
  const searchC = searchParams.get("c");

  const anyT = searchT || (typeof cookieT === "string" && cookieT) || "";
  const anyC = searchC || (typeof cookieC === "string" && cookieC) || "";

  const [maybeLocale] = pathname.split("/").filter(Boolean).reverse();
  const locale = isLocale(maybeLocale) ? maybeLocale : "en";

  const { translationAuthor, commentaryAuthor } = getLanguageSettings(locale, {
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

  const response = NextResponse.next({
    headers: {
      "x-settings-l": cookieL,
      "x-settings-t": String(translationAuthor.id),
      "x-settings-c": String(commentaryAuthor.id),
    } as HeadersInit,
  });

  return response;
}

export const config = {
  matcher: "/chapter/:chapterId/verse/:verseId*",
};
