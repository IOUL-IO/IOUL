"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function LegacyScripts() {
  const pathname = usePathname();

  useEffect(() => {
    // Find all inline scripts that have not been executed
    const scripts = Array.from(document.querySelectorAll("script")).filter(
      (s: any) => !s.dataset.__executed
    ) as HTMLScriptElement[];

    scripts.forEach((script) => {
      try {
        // Execute script content in global scope
        // eslint-disable-next-line no-new-func
        const fn = new Function(script.innerHTML);
        fn();
        script.dataset.__executed = "true";
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error("Legacy script execution error:", err);
      }
    });

    // Dispatch DOMContentLoaded so legacy code listening for it runs
    window.document.dispatchEvent(new Event("DOMContentLoaded", {
      bubbles: true,
      cancelable: true,
    }));
  }, [pathname]);

  return null;
}
