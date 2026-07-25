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

import "./global.css";

/**
 * Fonts.
 *
 * `next/font` defaults to `preload: true`, and Next emits those preloads as an
 * HTTP `Link:` response header rather than markup — which is why they are
 * invisible if you go looking for <link> tags in the HTML.
 *
 * Every family declared here is instantiated in the root layout, so every page
 * was preloading all eight. Measured on the English homepage: 15 files, 1,045
 * kB, of which 863 kB was Indic type on a page containing no Indic characters
 * at all. Tiro Devanagari Sanskrit alone was 281 kB.
 *
 * So the Indic families opt out of preloading below. They are still declared,
 * and `display: "swap"` still applies, so the browser fetches them the moment
 * a glyph actually needs one — which on a Hindi page is immediately. What goes
 * away is the guaranteed download on pages that never render that script.
 *
 * Inter and Crimson Pro keep preloading: they set every page, above the fold.
 */
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
  preload: false,
});

// Noto Serif Devanagari - for Hindi/Marathi content and fallback
const notoSerifDevanagari = Noto_Serif_Devanagari({
  subsets: ["devanagari"],
  display: "swap",
  variable: "--font-devanagari-serif",
  weight: ["400", "500", "600", "700"],
  preload: false,
});

const mukta = Mukta({
  subsets: ["devanagari"],
  display: "swap",
  variable: "--font-devanagari-sans",
  weight: ["400", "500", "600"],
  preload: false,
});

// Tamil fonts
const notoSerifTamil = Noto_Serif_Tamil({
  subsets: ["tamil"],
  display: "swap",
  variable: "--font-tamil-serif",
  weight: ["400", "500", "600", "700"],
  preload: false,
});

// Telugu fonts
const notoSerifTelugu = Noto_Serif_Telugu({
  subsets: ["telugu"],
  display: "swap",
  variable: "--font-telugu-serif",
  weight: ["400", "500", "600", "700"],
  preload: false,
});

// Gujarati fonts
const notoSerifGujarati = Noto_Serif_Gujarati({
  subsets: ["gujarati"],
  display: "swap",
  variable: "--font-gujarati-serif",
  weight: ["400", "500", "600", "700"],
  preload: false,
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
  other: {
    // iOS Smart App Banner. Safari renders this only on iOS, so Apple performs
    // the device detection for us and no user-agent sniffing is needed.
    //
    // Deliberately NO `app-argument`: the Flutter app's deep-link handler
    // (gita-flutter-2.0, lib/main.dart) currently only routes gitagpt and
    // home-widget links, so a verse deep link would open the app at its home
    // screen. Add `app-argument=gita://gita.app/chapter/N/verse/M` here once
    // that route is handled — see ROADMAP item 19a.
    "apple-itunes-app": "app-id=1602895635",
  },
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
        {/* Privacy-friendly analytics by Plausible */}
        <Script
          async
          src="https://plausible.io/js/pa-8TnPv5NCTm5JoA4O14NB2.js"
        />
        <Script
          id="plausible-init"
          dangerouslySetInnerHTML={{
            __html: `
              window.plausible=window.plausible||function(){(plausible.q=plausible.q||[]).push(arguments)},plausible.init=plausible.init||function(i){plausible.o=i||{}};
              plausible.init()
            `,
          }}
        />
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
