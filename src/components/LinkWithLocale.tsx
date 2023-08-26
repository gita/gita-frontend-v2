"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { UrlObject } from "url";

import { getLocaleFromPath } from "./shared/functions";

const getUpdatedHref = (href: UrlObject | string, locale: Locale) => {
  const hrefUrl =
    typeof href === "string"
      ? new URL(
          href.startsWith("/") ? `${window.location.origin}${href}` : href,
        )
      : href;
  const addSlash = !hrefUrl.pathname.endsWith("/");
  hrefUrl.pathname = `${hrefUrl.pathname}${addSlash ? "/" : ""}${locale}`;
  return hrefUrl.toString();
};

function LinkWithLocale({
  href,
  children,
  ...props
}: React.PropsWithChildren<React.ComponentProps<typeof Link>>) {
  const locale = getLocaleFromPath();

  return (
    <Link
      href={locale === "en" ? href : getUpdatedHref(href, locale)}
      {...props}
    >
      {children}
    </Link>
  );
}

export default LinkWithLocale;
