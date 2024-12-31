import { type NextRequest, NextResponse } from "next/server";

import { supportedLocales } from "shared/constants";
import { getLanguageSettings, isLocale } from "shared/functions";

export function middleware(req: NextRequest) {
  const { origin, pathname, searchParams } = new URL(req.url);

  console.log("[Middleware] Processing request for path:", pathname);

  // Skip middleware for static files and API routes
  if (
    pathname.startsWith("/app") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api")
  ) {
    console.log("[Middleware] Skipping middleware for static/api path");
    return NextResponse.next();
  }

  // Handle trailing slashes
  if (pathname.endsWith("/") && pathname !== "/") {
    console.log("[Middleware] Redirecting to remove trailing slash");
    return NextResponse.redirect(new URL(pathname.slice(0, -1), req.url));
  }

  const cookieT = req.cookies.get("bgTranslationAuthorId")?.value;
  const cookieC = req.cookies.get("bgCommentaryAuthorId")?.value;
  const cookieL = req.cookies.get("bgLocale")?.value;

  console.log("[Middleware] Cookie locale:", cookieL);

  const searchT = searchParams.get("t");
  const searchC = searchParams.get("c");

  const anyT = searchT || (typeof cookieT === "string" && cookieT) || "";
  const anyC = searchC || (typeof cookieC === "string" && cookieC) || "";

  // More robust locale detection
  const pathParts = pathname.split("/").filter(Boolean);
  const hasHindiInPath =
    pathname.includes("/hi") || pathname === "/hi" || pathname.endsWith("/hi");
  const isHindiCookie = cookieL === "hi";
  const locale = hasHindiInPath || isHindiCookie ? "hi" : "en";

  console.log("[Middleware] Path parts:", pathParts);
  console.log("[Middleware] Has Hindi in path:", hasHindiInPath);
  console.log("[Middleware] Is Hindi cookie:", isHindiCookie);
  console.log("[Middleware] Final locale:", locale);

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
    console.log("[Middleware] Redirecting due to inconsistent settings");
    const urlSearchParams = new URLSearchParams({
      t: String(translationAuthor.id),
      c: String(commentaryAuthor.id),
    });
    const updatedUrl = `${origin}${pathname}?${urlSearchParams.toString()}`;
    return NextResponse.redirect(updatedUrl);
  }

  // Create response with headers
  const response = NextResponse.next();

  // Set locale headers
  response.headers.set("x-settings-l", locale);
  response.headers.set("x-settings-t", String(translationAuthor.id));
  response.headers.set("x-settings-c", String(commentaryAuthor.id));
  response.headers.set("x-locale", locale);
  response.headers.set("x-html-lang", locale);

  console.log("[Middleware] Set headers:", {
    "x-settings-l": locale,
    "x-settings-t": String(translationAuthor.id),
    "x-settings-c": String(commentaryAuthor.id),
    "x-locale": locale,
    "x-html-lang": locale,
  });

  return response;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|app).*)"],
};
