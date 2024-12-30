import { ReactNode } from "react";
import { Metadata } from "next";
import { Inter } from "next/font/google";
import { headers } from "next/headers";
import Script from "next/script";

import TopLoader from "components/Headers/TopLoader";

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
  const pathname = headersList.get("x-invoke-path") || "";
  const isHindi = pathname.includes("/hi") || pathname === "/hi";
  const htmlLang = isHindi ? "hi" : "en";

  // Log all headers for debugging
  console.log("[RootLayout] Path:", pathname);
  console.log("[RootLayout] Is Hindi path:", isHindi);
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
          <Script src="https://p.usestyle.ai" defer />
          <Script
            id="sa-dynamic-optimization"
            dangerouslySetInnerHTML={{
              __html: `var script = document.createElement("script");script.setAttribute("nowprocket", "");script.setAttribute("nitro-exclude", "");script.src = "https://dashboard.searchatlas.com/scripts/dynamic_optimization.js";script.dataset.uuid = "aa22da35-1a8e-43c4-b313-ba60739e999c";script.id = "sa-dynamic-optimization-loader";document.head.appendChild(script);`
            }}
          />
        </Providers>
      </body>
    </html>
  );
}
