"use client";
import React, { useEffect, useState } from "react";

export default function Page() {
  const [html, setHtml] = useState<string>("");

  useEffect(() => {
    fetch("/IOUL-login/ioul/index.html")
      .then((res) => res.text())
      .then((text) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(text, "text/html");
        setHtml(doc.body.innerHTML);
        // Re-trigger legacy scripts after HTML injection
        document.dispatchEvent(new Event("DOMContentLoaded", { bubbles: true }));
      })
      .catch((err) => {
        console.error("Failed to load static HTML:", err);
      });
  }, []);

  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
