"use client";

import ReactDOM from "react-dom";

export function PreloadResources() {
  ReactDOM.preconnect("https://apps.elfsight.com", {
    crossOrigin: "anonymous",
  });
  ReactDOM.preconnect("https://static.elfsight.com", {
    crossOrigin: "anonymous",
  });
  ReactDOM.preconnect("https://service-reviews-ultimate.elfsight.com", {
    crossOrigin: "anonymous",
  });
  ReactDOM.preconnect("https://storage.elfsight.com", {
    crossOrigin: "anonymous",
  });

  return null;
}
