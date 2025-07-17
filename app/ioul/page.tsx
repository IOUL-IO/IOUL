"use client";

import React, { useEffect, useState, useRef, useCallback } from 'react';

const IOULPage: React.FC = () => {
  const [currentMenu, setCurrentMenu] = useState<string | null>(null);
  const [slideState, setSlideState] = useState("none");
  const [pageFadedIn, setPageFadedIn] = useState(false);
  const chatTextRef = useRef<HTMLSpanElement | null>(null);
  const hoverAreaRef = useRef<HTMLDivElement | null>(null);
  const pageContentRef = useRef<HTMLDivElement | null>(null);

  // Util state: 0 = baseline, 1 = mail, 2 = calendar
  const [utilState, setUtilState] = useState(0);

  // Advance utilState on click
  const handleUtilLineClick = useCallback(() => {
    setUtilState(prev => (prev + 1) % 3);
  }, []);

  // Sync the data-util attribute with utilState
  useEffect(() => {
    document.documentElement.setAttribute('data-util', utilState.toString());
  }, [utilState]);

  // ... (other menu and slide logic unchanged) ...

  return (
    <div className="non-fullscreen" translate="no">
      {/* ... earlier layers and menu code ... */}

      <div className="layer-four" />

      {/* Other content... */}
      <div className="other-content">
        <div className="line original" />
        <div className="line second" />
        <div className="line util-line" onClick={handleUtilLineClick} />
        <div className="line third" />
        <div className="line fourth" />
        <div className="line fifth" />
        <div className="line mail-line" />
        <div className="line sixth" />
      </div>

      {/* Mail texts */}
      <span className="mail-text">TO:</span>
      <span className="mail-text">SUBJECT:</span>
      <span className="mail-text">cc</span>
      <span className="mail-text">Bcc</span>
      <span className="mail-text">SEND</span>

      {/* Calendar grid (1–16) */}
      {[...Array(16)].map((_, idx) => (
        <React.Fragment key={idx}>
          <span className={`grid-number num${idx + 1}`}>{idx + 1}</span>
          <span className={`grid-dashed dashed${String(idx + 1).padStart(2, '0')}`} />
        </React.Fragment>
      ))}

      {/* ... remaining content (17–31, etc.) unchanged ... */}
    </div>
  );
};

export default IOULPage;