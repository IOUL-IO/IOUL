"use client";
import { useEffect, useRef } from "react";

export default function IoulPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Fetch and inject legacy HTML
    fetch("/IOUL-login/ioul/index.html")
      .then(res => res.text())
      .then(html => {
        if (containerRef.current) {
          containerRef.current.innerHTML = html;
        }
        // Inject slide logic
        const script = document.createElement("script");
        script.src = "/ioul_slide_logic.js";
        script.async = true;
        document.body.appendChild(script);
        return () => {
          document.body.removeChild(script);
        };
      });
  }, []);

  return (
    <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
      <div ref={containerRef} />
    </div>
  );
}
