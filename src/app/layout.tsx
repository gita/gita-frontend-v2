import { ReactNode } from "react";
import { Metadata, Viewport } from "next";
import {
  Crimson_Pro,
  Inter,
  Mukta,
  Noto_Serif_Devanagari,
  Noto_Serif_Gujarati,
  Noto_Serif_Tamil,
  Noto_Serif_Telugu,
  Tiro_Devanagari_Sanskrit,
} from "next/font/google";
import { headers } from "next/headers";
import Script from "next/script";

import { PreloadResources } from "./preload-resources";
import Providers from "./providers";

import "tailwindcss/tailwind.css";
import "./global.css";

// Latin/English fonts
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  weight: ["400", "500", "600"],
});

const crimsonPro = Crimson_Pro({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-crimson",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

// Devanagari fonts (Hindi, Sanskrit, Marathi)
// Tiro Devanagari Sanskrit - for classical Sanskrit verses
const tiroDevanagariSanskrit = Tiro_Devanagari_Sanskrit({
  subsets: ["devanagari", "latin"],
  display: "swap",
  variable: "--font-sanskrit",
  weight: ["400"],
  style: ["normal", "italic"],
});

// Noto Serif Devanagari - for Hindi/Marathi content and fallback
const notoSerifDevanagari = Noto_Serif_Devanagari({
  subsets: ["devanagari"],
  display: "swap",
  variable: "--font-devanagari-serif",
  weight: ["400", "500", "600", "700"],
});

const mukta = Mukta({
  subsets: ["devanagari"],
  display: "swap",
  variable: "--font-devanagari-sans",
  weight: ["400", "500", "600"],
});

// Tamil fonts
const notoSerifTamil = Noto_Serif_Tamil({
  subsets: ["tamil"],
  display: "swap",
  variable: "--font-tamil-serif",
  weight: ["400", "500", "600", "700"],
});

// Telugu fonts
const notoSerifTelugu = Noto_Serif_Telugu({
  subsets: ["telugu"],
  display: "swap",
  variable: "--font-telugu-serif",
  weight: ["400", "500", "600", "700"],
});

// Gujarati fonts
const notoSerifGujarati = Noto_Serif_Gujarati({
  subsets: ["gujarati"],
  display: "swap",
  variable: "--font-gujarati-serif",
  weight: ["400", "500", "600", "700"],
});

// Next.js 14+ recommends separating viewport from metadata
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#ffffff",
};

export const metadata: Metadata = {
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

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const headersList = await headers();
  const requestUrl = headersList.get("x-invoke-path") || "";
  const htmlLang = requestUrl.includes("/hi") ? "hi" : "en";

  return (
    <html
      lang={htmlLang}
      className={` ${inter.variable} ${crimsonPro.variable} ${tiroDevanagariSanskrit.variable} ${notoSerifDevanagari.variable} ${mukta.variable} ${notoSerifTamil.variable} ${notoSerifTelugu.variable} ${notoSerifGujarati.variable} `}
      suppressHydrationWarning
    >
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Script src="https://p.usestyle.ai" defer />
      </head>
      <body>
        <Providers>
          <PreloadResources />
          {children}
        </Providers>
      </body>
    </html>
  );
}
