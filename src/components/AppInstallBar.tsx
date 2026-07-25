"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const DISMISS_KEY = "app-install-bar-dismissed-until";
const DISMISS_DAYS = 30;
const SHOW_AFTER_SCROLL = 700;

/**
 * App-install prompt. Slim bar on mobile, corner card on desktop.
 *
 * Shape follows radhakrishna.com's `app-cta.tsx`, which is a clear improvement on
 * the first version of this component. What changed and why:
 *
 * - An app icon anchors it. Recognisable at a glance, and it fills the left edge
 *   where the previous version had cramped 11px stats.
 * - Two readable lines carrying a proposition ("free", "read and listen") rather
 *   than a rating and a download count. The sentence does more work than the
 *   number did.
 * - Pill buttons instead of the official store badge images. Two badge PNGs plus
 *   a close button in a 393px viewport left nothing legible.
 * - It waits for engagement (700px of scroll) instead of appearing on load.
 *
 * Both platforms are always offered and the device is never sniffed. Measured
 * across bible.com, quran.com, hallow and abide: none branch their store CTA by
 * user agent (docs/ui-reference-analysis.md). iPads report desktop agents, and
 * iOS is separately covered by the Smart App Banner meta tag in app/layout.tsx,
 * which Safari renders only on iOS.
 */
export function AppInstallBar({ translate }: { translate: Translate }) {
  const [show, setShow] = useState(false);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    try {
      const until = window.localStorage.getItem(DISMISS_KEY);
      if (until && Date.now() < Number(until)) return;
    } catch {
      // Storage blocked — show it rather than fail closed.
    }
    const onScroll = () => {
      if (window.scrollY > SHOW_AFTER_SCROLL) {
        setShow(true);
        window.removeEventListener("scroll", onScroll);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function close() {
    setClosing(true);
    try {
      window.localStorage.setItem(
        DISMISS_KEY,
        String(Date.now() + DISMISS_DAYS * 864e5),
      );
    } catch {
      // It reappears next visit, which is acceptable.
    }
    window.setTimeout(() => setShow(false), 200);
  }

  if (!show) return null;

  const title = translate("Bhagavad Gita, free app");
  const subtitle = translate("Read and listen, verse by verse");

  return (
    <>
      {/* Mobile: slim sticky bar */}
      <div
        className={`border-border/60 bg-prakash-bg/95 dark:bg-nisha-bg/95 fixed inset-x-0 bottom-0 z-50 border-t p-3 shadow-[0_-6px_24px_rgba(0,0,0,0.08)] backdrop-blur-sm transition-transform duration-200 md:hidden ${
          closing ? "translate-y-full" : "translate-y-0"
        }`}
        style={{ paddingBottom: "calc(0.75rem + env(safe-area-inset-bottom))" }}
        role="complementary"
        aria-label={title}
      >
        <div className="flex items-center gap-3">
          <Image
            src="/gita-app-icon.webp"
            alt=""
            width={88}
            height={88}
            className="size-11 shrink-0 rounded-xl shadow-xs ring-1 ring-black/5"
          />
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm leading-tight font-semibold">
              {title}
            </p>
            <p className="text-muted-foreground truncate text-xs leading-tight">
              {subtitle}
            </p>
          </div>
          {/* One button, so the title and subtitle are not truncated. /go/app
              resolves the store server-side from the User-Agent. */}
          <a
            href="/go/app"
            data-analytics="app-cta-mobile"
            className="bg-prakash-primary dark:bg-nisha-primary shrink-0 rounded-full px-4 py-2 text-sm font-semibold text-white"
          >
            {translate("Get app")}
          </a>
          <button
            type="button"
            onClick={close}
            aria-label={translate("Dismiss")}
            className="text-muted-foreground -mr-1 shrink-0 p-2 text-xl leading-none"
          >
            <span aria-hidden>&times;</span>
          </button>
        </div>
      </div>

      {/* Desktop: compact corner card. Nobody installs an app on a laptop, so this
          stays small and out of the way rather than spanning the page. */}
      <div
        className={`border-border/60 bg-card fixed right-6 bottom-6 z-50 hidden w-76 rounded-2xl border p-5 shadow-xl transition-opacity duration-200 md:block ${
          closing ? "opacity-0" : "opacity-100"
        }`}
        role="complementary"
        aria-label={title}
      >
        <button
          type="button"
          onClick={close}
          aria-label={translate("Dismiss")}
          className="text-muted-foreground hover:text-foreground absolute top-3 right-3 text-xl leading-none"
        >
          <span aria-hidden>&times;</span>
        </button>
        <div className="flex items-center gap-3">
          <Image
            src="/gita-app-icon.webp"
            alt=""
            width={88}
            height={88}
            className="size-11 shrink-0 rounded-xl shadow-xs ring-1 ring-black/5"
          />
          <div className="min-w-0">
            <p className="text-sm leading-tight font-semibold">{title}</p>
            <p className="text-muted-foreground text-xs leading-tight">
              {subtitle}
            </p>
          </div>
        </div>
        <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
          {translate(
            "Every verse in Hindi and English, with meaning and audio. Free, no ads.",
          )}
        </p>
        <div className="mt-4 flex gap-2">
          <a
            href="/go/ios"
            data-analytics="app-cta-desktop-ios"
            className="bg-prakash-primary dark:bg-nisha-primary flex-1 rounded-full px-4 py-2 text-center text-sm font-semibold text-white"
          >
            {translate("iPhone")}
          </a>
          <a
            href="/go/android"
            data-analytics="app-cta-desktop-android"
            className="border-border flex-1 rounded-full border px-4 py-2 text-center text-sm font-semibold"
          >
            {translate("Android")}
          </a>
        </div>
      </div>
    </>
  );
}
