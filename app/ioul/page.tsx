"use client";
import { useEffect, useRef } from "react";

export default function Page() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 1. Inject legacy CSS
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "/IOUL-login/ioul/styles.css";
    document.head.appendChild(link);

    // 2. Fetch and inject legacy HTML
    fetch("/IOUL-login/ioul/index.html")
      .then(res => res.text())
      .then(html => {
        if (containerRef.current) {
          containerRef.current.innerHTML = html;
          // 3. Execute all scripts within that HTML
          containerRef.current.querySelectorAll("script").forEach(oldScript => {
            const script = document.createElement("script");
            if (oldScript.src) {
              script.src = oldScript.src;
            } else {
              script.textContent = oldScript.textContent;
            }
            document.body.appendChild(script);
          });
        }
      });
  }, []);

  return <div ref={containerRef} style={{ width: "100vw", height: "100vh" }} />;
}
