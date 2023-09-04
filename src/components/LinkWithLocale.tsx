"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { UrlObject } from "url";

import { getLocaleFromPath } from "./shared/functions";

const getAsUrl = (href: string) => {
  try {
    return new URL(
      href.startsWith("/") ? `${window.location.origin}${href}` : href,
    );
  } catch (err) {
    console.error("Unable to create URL");
    console.error(href);
  }
  return new URL(window.location.href);
};

const getUpdatedHref = (href: UrlObject | string, locale: Locale) => {
  if (typeof href === "string" && href.startsWith("mailto:")) {
    return href;
  }
  const hrefUrl = typeof href === "string" ? getAsUrl(href) : href;
  const addSlash = !hrefUrl.pathname?.endsWith("/");
  hrefUrl.pathname = `${hrefUrl.pathname}${addSlash ? "/" : ""}${locale}`;
  return hrefUrl.toString();
};

function LinkWithLocale({
  href,
  children,
  ...props
}: React.PropsWithChildren<React.ComponentProps<typeof Link>>) {
  const [locale, setLocale] = useState<Locale>("en");

  useEffect(() => {
    setLocale(getLocaleFromPath());
  }, []);

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
