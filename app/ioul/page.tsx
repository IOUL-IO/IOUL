"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";

export default function IOULPage() {
  const [state, setState] = useState<number>(0);
  const hoverAreaRef = useRef<HTMLDivElement>(null);
  const chatTextRef = useRef<HTMLSpanElement>(null);

  // Handle util-line clicks (cycles through states 0,1,2)
  const handleUtilLineClick = useCallback(() => {
    setState((prev) => (prev + 1) % 3);
  }, []);

  // Sync CSS data attribute for toggles
  useEffect(() => {
    document.documentElement.setAttribute("data-util", state.toString());
  }, [state]);

  // Click handler for hover area to show chat
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const hover = hoverAreaRef.current;
      if (hover && hover.contains(e.target as Node)) {
        chatTextRef.current!.style.opacity = "1";
      }
    };
    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, []);

  return (
    <div className="non-fullscreen" translate="no">
      <p style={{ display: "none" }} lang="en">
        This page is already in English. No translation is needed.
      </p>

      <div className="layer-one" />
      <div className="layer-two" />
      <div className="layer-three" />
      <div className="layer-four" />

      {/* Hover area and chat text */}
      <div className="hover-area" ref={hoverAreaRef} />
      <span className="chat-text" ref={chatTextRef} id="chatText">
        cHAT . .
      </span>

      {/* Mail line */}
      <div className="mail-line" data-util={state} onClick={handleUtilLineClick} />

      {/* Mail texts */}
      <span className="mail-text to">TO:</span>
      <span className="mail-text subject">SUBJEcT:</span>
      <span className="mail-text cc">cc</span>
      <span className="mail-text bcc">Bcc</span>
      <span className="mail-text send">SEnD</span>

      {/* Calendar grid and other content omitted for brevity */}
    </div>
  );
}
