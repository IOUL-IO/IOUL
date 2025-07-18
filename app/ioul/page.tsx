"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';

export default function IOULPage() {
  const [state, setState] = useState<number>(0);
  const hoverAreaRef = useRef<HTMLDivElement>(null);
  const chatTextRef = useRef<HTMLSpanElement>(null);

  const handleUtilLineClick = useCallback(() => {
    setState((prev) => (prev + 1) % 3);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-util', state.toString());
  }, [state]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const hover = hoverAreaRef.current;
      if (hover && hover.contains(e.target as Node)) {
        if (chatTextRef.current) {
          chatTextRef.current.style.opacity = '1';
        }
      }
    };
    document.addEventListener('click', handleClick, true);
    return () => document.removeEventListener('click', handleClick, true);
  }, []);

  return (
    <div className="non-fullscreen" translate="no">
      <p style={{ display: 'none' }} lang="en">
        This page is already in English. No translation is needed.
      </p>

      <div className="layer-one" />
      <div className="layer-two" />
      <div className="layer-three" />
      <div className="layer-four" />

      <div className="hover-area" ref={hoverAreaRef} />
      <span className="chat-text" ref={chatTextRef} id="chatText">
        cHAT . .
      </span>

      <div className="mail-line" onClick={handleUtilLineClick} />

      {state === 1 && (
        <>
          <span className="mail-text to">TO:</span>
          <span className="mail-text subject">SUBJEcT:</span>
          <span className="mail-text cc">cc</span>
          <span className="mail-text bcc">Bcc</span>
          <span className="mail-text send">SEnD</span>
        </>
      )}

      <div className="grid-container">
        {Array.from({ length: 16 }).map((_, idx) => (
          <React.Fragment key={idx}>
            <div className={`grid-number num${idx + 1}`} />
            <div className={`grid-dashed dashed0${(idx + 1)
              .toString()
              .padStart(2, '0')}`} />
          </React.Fragment>
        ))}
      </div>

      <div className="slide-container">{/* Slide content here */}</div>
      <div className="community-items-container">{/* Community content here */}</div>
    </div>
  );
}
