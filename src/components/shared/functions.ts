"use client";

import { isLocale } from "shared/functions";

export const setCookie = (
  name: string,
  value: string | boolean,
  days = 365,
) => {
  if (typeof document === "undefined") {
    return;
  }
  var expires = "";
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
};

export const getCookie = (name: string) => {
  if (typeof document === "undefined") {
    return;
  }

  const nameEQ = name + "=";
  const ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1, c.length);
    }
    if (c.indexOf(nameEQ) == 0) {
      return c.substring(nameEQ.length, c.length);
    }
  }
  return null;
};

export const getLocaleFromPath = (): Locale => {
  if (typeof window === "undefined") {
    throw new Error("Server side only");
  }
  const maybeLocale = window.location.pathname.split("/").pop();
  return isLocale(maybeLocale) ? maybeLocale : "en";
};

export const updatedLocalePath = (newLocale: Locale) => {
  const currentLocale = getLocaleFromPath();
  const newUrl = new URL(window.location.href);
  if (currentLocale === newLocale) {
    // Do nothing
  } else if (currentLocale === "en") {
    newUrl.pathname = `${newUrl.pathname}/${newLocale}`;
  } else {
    newUrl.pathname = newUrl.pathname.replace(
      `/${currentLocale}`,
      newLocale === "en" ? "" : `/${newLocale}`,
    );
  }
  return newUrl.toString();
};
