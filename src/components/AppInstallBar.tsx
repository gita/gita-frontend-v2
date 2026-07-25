"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const DISMISS_KEY = "app-install-bar-dismissed-until";
const DISMISS_DAYS = 30;

/**
 * Sticky app-install bar, mobile only.
 *
 * Three decisions here came out of measuring what the leaders actually do
 * (docs/ui-reference-analysis.md), and each is deliberate:
 *
 * 1. BOTH store badges show, on every device. None of bible.com, quran.com,
 *    hallow or abide branch their store CTA on user agent. iPads report desktop
 *    UAs and Android tablets are ambiguous, so sniffing risks hiding the only
 *    button that mattered. iOS detection is separately free via the Smart App
 *    Banner meta tag, which Safari renders only on iOS.
 *
 * 2. Social proof leads, buttons follow. bible.com's bar reads "20M Ratings.
 *    4.9" to the LEFT of its badges — the number does the persuading.
 *
 * 3. Dismissal lasts 30 days, not a session. A bar that returns on the next
 *    page view is the thing people actually resent.
 *
 * Rendered only under `md:hidden`: a desktop visitor cannot install anything,
 * so the bar would be pure friction there.
 */
export function AppInstallBar({ translate }: { translate: Translate }) {
  // Start hidden and reveal after the storage check, so a dismissed bar never
  // flashes in on hydration.
  const [visible, setVisible] = useState(false);
  // Measured rather than hard-coded: the bar is taller on devices with a home
  // indicator (134px on iPhone vs 116px on Pixel), and a fixed guess left the
  // last footer row underneath it.
  const barRef = useRef<HTMLDivElement>(null);
  const [barHeight, setBarHeight] = useState(0);

  useEffect(() => {
    try {
      const until = window.localStorage.getItem(DISMISS_KEY);
      if (until && Date.now() < Number(until)) return;
    } catch {
      // Private mode or storage disabled — show the bar rather than fail closed.
    }
    setVisible(true);
  }, []);

  function dismiss() {
    setVisible(false);
    try {
      window.localStorage.setItem(
        DISMISS_KEY,
        String(Date.now() + DISMISS_DAYS * 864e5),
      );
    } catch {
      // Nothing to do; it will reappear next visit, which is acceptable.
    }
  }

  useEffect(() => {
    if (!visible || !barRef.current) return;
    const el = barRef.current;
    const measure = () => setBarHeight(el.getBoundingClientRect().height);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [visible]);

  if (!visible) return null;

  return (
    <>
      {/* Spacer. The bar is fixed, so without this it sits on top of the last
          rows of the footer and makes them unreachable on mobile. */}
      <div
        aria-hidden
        className="md:hidden"
        style={{ height: barHeight || 116 }}
      />
      <div
      ref={barRef}
      // pb accounts for the iOS home indicator so the badges stay tappable.
      className="fixed inset-x-0 bottom-0 z-40 border-t border-border/60 bg-prakash-bg/95 backdrop-blur-sm dark:bg-nisha-bg/95 md:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      role="complementary"
      aria-label={translate("Get the Bhagavad Gita app")}
    >
      <div className="flex items-center gap-3 px-4 py-2.5">
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold leading-tight">
            {translate("Read the Gita offline, free")}
          </p>
          <p className="text-xs leading-tight text-muted-foreground">
            {/* Figures verified against Google Play, India storefront, 2026-07-25. */}
            {translate("4.9 stars · 500,000+ downloads · no ads")}
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <a
            href="/go/ios"
            className="transition-transform active:scale-95"
            aria-label={translate("Download on the App Store")}
          >
            <Image
              src="/app_store.svg"
              alt={translate("Download on the App Store")}
              height={32}
              width={108}
              className="h-8 w-auto"
            />
          </a>
          <a
            href="/go/android"
            className="transition-transform active:scale-95"
            aria-label={translate("Get it on Google Play")}
          >
            <Image
              src="/play_store.svg"
              alt={translate("Get it on Google Play")}
              height={32}
              width={108}
              className="h-8 w-auto"
            />
          </a>
        </div>

        <button
          type="button"
          onClick={dismiss}
          aria-label={translate("Dismiss")}
          // 44px target: anything smaller is a mis-tap generator on mobile.
          className="-mr-2 flex size-11 shrink-0 items-center justify-center text-muted-foreground"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M4 4l8 8M12 4l-8 8"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
          </svg>
        </button>
        </div>
      </div>
    </>
  );
}
