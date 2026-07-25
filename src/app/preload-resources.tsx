"use client";

import ReactDOM from "react-dom";

/**
 * Connection warm-up for third parties we actually contact.
 *
 * This used to preconnect to four Elfsight hosts. Elfsight appears nowhere else
 * in the repository and the live site issues no requests to it, so those were
 * four DNS lookups and TLS handshakes per page load for a service we do not
 * use. A preconnect to a host you never call is pure cost.
 *
 * Plausible is loaded from layout.tsx on every page, so warming that one earns
 * its place. Add a host here only when something on the page really fetches
 * from it.
 */
export function PreloadResources() {
  ReactDOM.preconnect("https://plausible.io");

  return null;
}
