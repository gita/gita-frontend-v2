"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

// Extend Window interface for chatbase
declare global {
  interface Window {
    chatbase?: any;
  }
}

/**
 * Client-side Chatbase widget manager that handles loading/unloading
 * based on the current route to prevent double-display on /gitagpt
 */
export default function ChatbaseWidget() {
  const pathname = usePathname();

  useEffect(() => {
    // Add custom CSS to make chatbot less intrusive on mobile
    const style = document.createElement("style");
    style.textContent = `
      /* Make chatbot button smaller on mobile */
      @media (max-width: 640px) {
        iframe[src*="chatbase"] {
          bottom: 16px !important;
          right: 16px !important;
        }
        
        /* Target the chatbot button container */
        [id*="chatbase"] button,
        [class*="chatbase"] button {
          width: 48px !important;
          height: 48px !important;
          font-size: 12px !important;
        }
        
        /* Make the opened chat window smaller on mobile */
        [id*="chatbase"][style*="height"],
        [class*="chatbase"][style*="height"] {
          max-height: 60vh !important;
          max-width: 90vw !important;
        }
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  useEffect(() => {
    // Don't load chatbot widget on GitaGPT page (it has iframe instead)
    if (pathname.includes("/gitagpt")) {
      // Remove any existing chatbot widget
      const existingWidget = document.getElementById("FUopn1I5lRD_dEopmyuQk");
      if (existingWidget) {
        existingWidget.remove();
      }
      // Remove the chatbase button/iframe container if it exists
      const chatbaseElements = document.querySelectorAll(
        '[id*="chatbase"], [class*="chatbase"]',
      );
      chatbaseElements.forEach((el) => {
        if (el.parentElement) {
          el.parentElement.remove();
        }
      });
      return;
    }

    // Initialize chatbase if not already done
    if (!window.chatbase || window.chatbase("getState") !== "initialized") {
      window.chatbase = (...args: any[]) => {
        if (!window.chatbase.q) {
          window.chatbase.q = [];
        }
        window.chatbase.q.push(args);
      };
      window.chatbase = new Proxy(window.chatbase, {
        get(target: any, prop: string) {
          if (prop === "q") {
            return target.q;
          }
          return (...args: any[]) => target(prop, ...args);
        },
      });
    }

    const onLoad = function () {
      // Double-check we're not on gitagpt page
      if (window.location.pathname.includes("/gitagpt")) return;

      // Check if script already exists
      const existingScript = document.getElementById("FUopn1I5lRD_dEopmyuQk");
      if (existingScript) return;

      const script = document.createElement("script");
      script.src = "https://www.chatbase.co/embed.min.js";
      script.id = "FUopn1I5lRD_dEopmyuQk";
      script.setAttribute("data-domain", "www.chatbase.co");
      script.setAttribute("chatbotId", "FUopn1I5lRD_dEopmyuQk");
      document.body.appendChild(script);
    };

    if (document.readyState === "complete") {
      onLoad();
    } else {
      window.addEventListener("load", onLoad);
      return () => window.removeEventListener("load", onLoad);
    }
  }, [pathname]); // Re-run when pathname changes

  return null;
}
