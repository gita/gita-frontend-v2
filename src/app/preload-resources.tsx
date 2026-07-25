"use client";

import ReactDOM from "react-dom";

/**
 * Connection warm-up for third parties the page actually contacts.
 *
 * Only add a host here when something on the page really fetches from it. A
 * preconnect to a host you never call is pure cost: a DNS lookup and a TLS
 * handshake per page load, competing with the resources that do matter.
 */
export function PreloadResources() {
  ReactDOM.preconnect("https://plausible.io");

  return null;
}
