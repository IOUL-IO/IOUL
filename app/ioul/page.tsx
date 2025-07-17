"use client";

import React, { useEffect, useState, useCallback } from "react";
import "./styles.css";

const IOULPage: React.FC = () => {
  // UTIL LINE TOGGLE STATE: 0=baseline, 1=mail, 2=calendar
  const [utilState, setUtilState] = useState(0);

  // Advance state through 0→1→2→0 on click
  const handleUtilLineClick = useCallback(() => {
    setUtilState((prev) => (prev + 1) % 3);
  }, []);

  // Sync data-util attribute for CSS (optional)
  useEffect(() => {
    document.documentElement.setAttribute("data-util", utilState.toString());
  }, [utilState]);

  return (
    <div className="non-fullscreen" translate="no">
      {/* Background layers */}
      <div className="layer-one" />
      <div className="layer-two" />
      <div className="layer-three" />
      <div className="layer-four" />

      {/* Utility lines */}
      <div className="other-content">
        <div className="line original" />
        <div className="line second" />
        <div className="line util-line" onClick={handleUtilLineClick} />
        <div className="line third" />
        <div className="line fourth" />
        <div className="line fifth" />
        {utilState === 1 && <div className="line mail-line" />}
        <div className="line sixth" />
      </div>

      {/* Mail labels on first click */}
      {utilState === 1 && (
        <>
          <span className="mail-text to">TO:</span>
          <span className="mail-text subject">SUBJECT:</span>
          <span className="mail-text cc">cc</span>
          <span className="mail-text bcc">Bcc</span>
          <span className="mail-text send">SEND</span>
        </>
      )}

      {/* Calendar grid items 1–16 on second click */}
      {utilState === 2 && (
        <>
          {[...Array(16)].map((_, i) => (
            <React.Fragment key={i}>
              <span className={`grid-number num${i + 1}`}>{i + 1}</span>
              <span className={`grid-dashed dashed${String(i + 1).padStart(2, "0")}`} />
            </React.Fragment>
          ))}
        </>
      )}
    </div>
  );
};

export default IOULPage;
