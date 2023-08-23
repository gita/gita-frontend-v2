import { getLanguageSettings } from "app/shared/functions";
import { type NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const { origin, pathname, searchParams } = new URL(req.url);

  const cookieL = req.cookies.get("languageId")?.value;
  const cookieT = req.cookies.get("translationAuthorId")?.value;
  const cookieC = req.cookies.get("commentaryAuthorId")?.value;

  const searchL = searchParams.get("l");
  const searchT = searchParams.get("t");
  const searchC = searchParams.get("c");

  const anyL = searchL || (typeof cookieL === "string" && cookieL) || "";
  const anyT = searchT || (typeof cookieT === "string" && cookieT) || "";
  const anyC = searchC || (typeof cookieC === "string" && cookieC) || "";

  const { language, translationAuthor, commentaryAuthor } = getLanguageSettings(
    {
      languageId: parseInt(anyL),
      translationAuthorId: parseInt(anyT),
      commentaryAuthorId: parseInt(anyC),
    },
  );
  const languageIsInconsistent = searchL && searchL !== String(language.id);
  const translationAuthorIsInconsistent =
    searchT && searchT !== String(translationAuthor.id);
  const commentaryAuthorIsInconsistent =
    searchC && searchC !== String(commentaryAuthor.id);

  const someSettingIsInconsistent =
    languageIsInconsistent ||
    translationAuthorIsInconsistent ||
    commentaryAuthorIsInconsistent;

  if (someSettingIsInconsistent) {
    const urlSearchParams = new URLSearchParams({
      l: String(language.id),
      t: String(translationAuthor.id),
      c: String(commentaryAuthor.id),
    });
    const updatedUrl = `${origin}${pathname}?${urlSearchParams.toString()}`;
    return NextResponse.redirect(updatedUrl);
  }

  const response = NextResponse.next({
    headers: {
      "x-settings-l": String(language.id),
      "x-settings-t": String(translationAuthor.id),
      "x-settings-c": String(commentaryAuthor.id),
    },
  });
  return response;
}

export const config = {
  matcher: "/chapter/:chapterId/verse/:verseId*",
};
