import { getLanguageSettings } from "app/shared/functions";
import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { href, search } = new URL(request.url);
  const searchParams = new URLSearchParams(search);

  const { language, translationAuthor, commentaryAuthor } = getLanguageSettings(
    {
      languageId: parseInt(searchParams.get("l") || ""),
      translationAuthorId: parseInt(searchParams.get("t") || ""),
      commentaryAuthorId: parseInt(searchParams.get("c") || ""),
    }
  );
  const languageSelected = String(language.id) === searchParams.get("l");
  const translationAuthorSelected =
    String(translationAuthor.id) === searchParams.get("t");
  const commentaryAuthorSelected =
    String(commentaryAuthor.id) === searchParams.get("c");
  if (
    !languageSelected ||
    !translationAuthorSelected ||
    !commentaryAuthorSelected
  ) {
    const urlSearchParams = new URLSearchParams({
      l: String(language.id),
      t: String(translationAuthor.id),
      c: String(commentaryAuthor.id),
    });
    const updatedUrl = `${href}?${urlSearchParams.toString()}`;
    return NextResponse.redirect(updatedUrl);
  }
}

export const config = {
  matcher: "/chapter/:chapterId/verse/:verseId*",
};
