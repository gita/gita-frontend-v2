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
        className={`fixed inset-x-0 bottom-0 z-50 border-t border-border/60 bg-prakash-bg/95 p-3 shadow-[0_-6px_24px_rgba(0,0,0,0.08)] backdrop-blur transition-transform duration-200 dark:bg-nisha-bg/95 md:hidden ${
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
            className="size-11 shrink-0 rounded-xl shadow-sm ring-1 ring-black/5"
          />
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold leading-tight">
              {title}
            </p>
            <p className="truncate text-xs leading-tight text-muted-foreground">
              {subtitle}
            </p>
          </div>
          {/* One button, so the title and subtitle are not truncated. /go/app
              resolves the store server-side from the User-Agent. */}
          <a
            href="/go/app"
            data-analytics="app-cta-mobile"
            className="shrink-0 rounded-full bg-prakash-primary px-4 py-2 text-sm font-semibold text-white dark:bg-nisha-primary"
          >
            {translate("Get app")}
          </a>
          <button
            type="button"
            onClick={close}
            aria-label={translate("Dismiss")}
            className="-mr-1 shrink-0 p-2 text-xl leading-none text-muted-foreground"
          >
            <span aria-hidden>&times;</span>
          </button>
        </div>
      </div>

      {/* Desktop: compact corner card. Nobody installs an app on a laptop, so this
          stays small and out of the way rather than spanning the page. */}
      <div
        className={`fixed bottom-6 right-6 z-50 hidden w-[19rem] rounded-2xl border border-border/60 bg-card p-5 shadow-xl transition-opacity duration-200 md:block ${
          closing ? "opacity-0" : "opacity-100"
        }`}
        role="complementary"
        aria-label={title}
      >
        <button
          type="button"
          onClick={close}
          aria-label={translate("Dismiss")}
          className="absolute right-3 top-3 text-xl leading-none text-muted-foreground hover:text-foreground"
        >
          <span aria-hidden>&times;</span>
        </button>
        <div className="flex items-center gap-3">
          <Image
            src="/gita-app-icon.webp"
            alt=""
            width={88}
            height={88}
            className="size-11 shrink-0 rounded-xl shadow-sm ring-1 ring-black/5"
          />
          <div className="min-w-0">
            <p className="text-sm font-semibold leading-tight">{title}</p>
            <p className="text-xs leading-tight text-muted-foreground">
              {subtitle}
            </p>
          </div>
        </div>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          {translate(
            "Every verse in Hindi and English, with meaning and audio. Free, no ads.",
          )}
        </p>
        <div className="mt-4 flex gap-2">
          <a
            href="/go/ios"
            data-analytics="app-cta-desktop-ios"
            className="flex-1 rounded-full bg-prakash-primary px-4 py-2 text-center text-sm font-semibold text-white dark:bg-nisha-primary"
          >
            {translate("iPhone")}
          </a>
          <a
            href="/go/android"
            data-analytics="app-cta-desktop-android"
            className="flex-1 rounded-full border border-border px-4 py-2 text-center text-sm font-semibold"
          >
            {translate("Android")}
          </a>
        </div>
      </div>
    </>
  );
}
