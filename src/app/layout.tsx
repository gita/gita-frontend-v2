import { ReactNode } from "react";
import { Metadata } from "next";
import { Inter } from "next/font/google";
import { headers } from "next/headers";

import TopLoader from "components/Headers/TopLoader";
import { paramsToLocale } from "shared/functions";

import { PreloadResources } from "./preload-resources";
import Providers from "./providers";

import "tailwindcss/tailwind.css";
import "./global.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  themeColor: "#ffffff",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
  manifest: "/favicon/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon/favicon-16x16.png", type: "image/png", sizes: "16x16" },
    ],
    shortcut: ["/shortcut-icon.png"],
    apple: [
      {
        url: "/favicon/apple-touch-icon.png",
        sizes: "180x180",
      },
    ],
    other: [
      {
        rel: "apple-touch-icon-precomposed",
        url: "/apple-touch-icon-precomposed.png",
      },
      {
        rel: "mask-icon",
        url: "/favicon/safari-pinned-tab.svg",
      },
    ],
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  const headersList = headers();
  const requestUrl = headersList.get("x-invoke-path") || "";
  const htmlLang = requestUrl.includes("/hi") ? "hi" : "en";

  // Log for debugging
  console.log("[RootLayout] Request URL:", requestUrl);
  console.log("[RootLayout] Using HTML lang:", htmlLang);

  return (
    <html lang={htmlLang} className={inter.className} suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <Providers>
          <PreloadResources />
          <TopLoader />
          {children}
        </Providers>
      </body>
    </html>
  );
}
