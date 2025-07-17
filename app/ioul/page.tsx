"use client";

import React, { useEffect, useState, useCallback } from "react";
import "./styles.css";

const IOULPage: React.FC = () => {
  // UTIL LINE TOGGLE STATE: 0=baseline, 1=mail, 2=calendar
  const [utilState, setUtilState] = useState(0);

  const handleUtilLineClick = useCallback(() => {
    setUtilState((prev) => (prev + 1) % 3);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-util", utilState.toString());
  }, [utilState]);

  return (
    <div className="non-fullscreen" translate="no">
      {/* ... your other layers and content ... */}

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

      {/* Mail labels */}
      <span className="mail-text to">TO:</span>
      <span className="mail-text subject">SUBJECT:</span>
      <span className="mail-text cc">cc</span>
      <span className="mail-text bcc">Bcc</span>
      <span className="mail-text send">SEND</span>

      {/* Calendar grid 1–16 */}
      {[...Array(16)].map((_, i) => (
        <React.Fragment key={i}>
          <span className={`grid-number num${i + 1}`}>{i + 1}</span>
          <span className={`grid-dashed dashed${String(i + 1).padStart(2, "0")}`} />
        </React.Fragment>
      ))}

      {/* ... remaining grid items 17–31 and other content ... */}
    </div>
  );
};

export default IOULPage;
