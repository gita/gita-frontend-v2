import { ReactNode } from "react";
import { Metadata, Viewport } from "next";
import { Inter, Noto_Sans_Devanagari } from "next/font/google";
import { headers } from "next/headers";
import Script from "next/script";

// TopLoader removed - NProgress causes hydration errors on gitagpt routes
// and conflicts with React 19's commit phase.
// import TopLoader from "components/Headers/TopLoader";
// ChatbaseWidget removed - its DOM manipulation (removing parent elements)
// was breaking client-side navigation to gitagpt routes.
// import ChatbaseWidget from "components/ChatbaseWidget";
import { PreloadResources } from "./preload-resources";
import Providers from "./providers";

import "tailwindcss/tailwind.css";
import "./global.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const notoSansDevanagari = Noto_Sans_Devanagari({
  subsets: ["devanagari"],
  display: "swap",
  variable: "--font-devanagari",
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
      className={`${inter.variable} ${notoSansDevanagari.variable}`}
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
