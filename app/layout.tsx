import "tailwindcss/tailwind.css";
import "../public/globals.css";

import { ReactNode } from "react";
import { Metadata } from "next";
import { Inter } from "next/font/google";
import Providers from "./providers";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  themeColor: "#ffffff",
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
  return (
    <html className={inter.className}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
