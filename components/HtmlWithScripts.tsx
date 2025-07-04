"use client";
import { useEffect, useRef } from "react";

interface Props {
  html: string;
}

export default function HtmlWithScripts({ html }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    ref.current.querySelectorAll("script").forEach((oldScript) => {
      const newScript = document.createElement("script");
      if (oldScript.src) {
        newScript.src = oldScript.src;
      } else {
        newScript.text = oldScript.textContent ?? "";
      }
      Array.from(oldScript.attributes).forEach((attr) => {
        newScript.setAttribute(attr.name, attr.value);
      });
      oldScript.replaceWith(newScript);
    });
  }, []);

  return <div ref={ref} dangerouslySetInnerHTML={{ __html: html }} />;
}
