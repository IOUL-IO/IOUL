"use client";
    import "./globals.css";
    import type { Metadata } from "next";
    import { ReactNode, useEffect } from "react";
    import { usePathname } from "next/navigation";

    const legacyCssFiles: string[] = [
  "/IOUL-login/center/add-ons/styles.css",
  "/IOUL-login/center/community/styles.css",
  "/IOUL-login/center/ioul center/styles.css",
  "/IOUL-login/center/library/styles.css",
  "/IOUL-login/ioul/styles.css",
  "/IOUL-login/styles.css",
  "/IOUL-login/tool-kit/cms/docs/styles.css",
  "/IOUL-login/tool-kit/cms/forms/styles.css",
  "/IOUL-login/tool-kit/cms/sheets/styles.css",
  "/IOUL-login/tool-kit/cms/styles.css",
  "/IOUL-login/tool-kit/coms/styles.css",
  "/IOUL-login/tool-kit/crm/styles.css",
  "/IOUL-login/tool-kit/erp/styles.css",
  "/IOUL-login/tool-kit/fms/styles.css",
  "/IOUL-login/tool-kit/hr/styles.css",
  "/IOUL-login/tool-kit/it/styles.css",
  "/IOUL-login/tool-kit/jobs/styles.css",
  "/IOUL-login/tool-kit/lms/styles.css",
  "/IOUL-login/tool-kit/ops/styles.css"
];

    export const metadata: Metadata = {
      title: "IOUL",
      description: "IOUL App",
    };

    export default function RootLayout({ children }: { children: ReactNode }) {
      const pathname = usePathname();

      // Re‑execute any inline legacy scripts that were in the HTML string
      useEffect(() => {
        const legacyScripts = Array.from(document.querySelectorAll("script"))
          .filter((s): s is HTMLScriptElement => !!s.textContent && !s.dataset.executed);

        legacyScripts.forEach((script) => {
          try {
            // Run the inline script
            // eslint-disable-next-line no-new-func
            new Function(script.textContent ?? "")();
            // Mark so we don't run it twice
            script.dataset.executed = "true";
          } catch (e) {
            console.error("Legacy script error:", e);
          }
        });

        // Fire DOMContentLoaded for code that waited for it
        setTimeout(() => {
          document.dispatchEvent(new Event("DOMContentLoaded"));
        }, 0);
      }, [pathname]);

      return (
        <html lang="en">
          <head>
            {legacyCssFiles.map((href) => (
              <link key={href} rel="stylesheet" href={href} />
            ))}
          </head>
          <body>{children}</body>
        </html>
      );
    }
