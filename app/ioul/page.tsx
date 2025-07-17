"use client";

import React, { useEffect, useState } from "react";
import "./styles.css";

const IOULPage: React.FC = () => {
  // UTIL LINE TOGGLE STATE: 0=baseline, 1=mail, 2=calendar
  const [utilState, setUtilState] = useState(0);

  // Sync `data-util` attribute for legacy CSS toggles if needed
  useEffect(() => {
    document.documentElement.setAttribute("data-util", utilState.toString());
  }, [utilState]);

  // Handle click on util-line
  const handleUtilLineClick = () => {
    setUtilState((prev) => (prev + 1) % 3);
  };

  return (
    <div className="non-fullscreen" translate="no">
      {/* Background / slide layers */}
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

      {/* Mail labels (state 1) */}
      {utilState === 1 && (
        <>
          <span className="mail-text to">TO:</span>
          <span className="mail-text subject">SUBJECT:</span>
          <span className="mail-text cc">cc</span>
          <span className="mail-text bcc">Bcc</span>
          <span className="mail-text send">SEND</span>
        </>
      )}

      {/* Calendar grid items 1–16 (state 2) */}
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

      {/* Other content... */}
    </div>
  );
};

export default IOULPage;
