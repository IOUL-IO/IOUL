// page.tsx
"use client";

import React, { useEffect, useState, useCallback } from "react";
import "./styles.css";

const IOULPage: React.FC = () => {
  // 0 = baseline, 1 = mail, 2 = calendar
  const [state, setState] = useState(0);

  const handleUtilLineClick = useCallback(() => {
    setState((prev) => (prev + 1) % 3);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-util", state.toString());
  }, [state]);

  return (
    <div className="non-fullscreen" translate="no">
      <div className="layer-one" />
      <div className="layer-two" />
      <div className="layer-three" />
      <div className="layer-four" />

      <div className="other-content">
        <div className="line original" />
        <div className="line second" />
        <div className="line util-line" onClick={handleUtilLineClick} />
        <div className="line third" />
        <div className="line fourth" />
        <div className="line fifth" />
        {state === 1 && <div className="line mail-line" />}
        <div className="line sixth" />
      </div>

      {state === 1 && (
        <>
          <span className="mail-text to">TO:</span>
          <span className="mail-text subject">SUBJECT:</span>
          <span className="mail-text cc">cc</span>
          <span className="mail-text bcc">Bcc</span>
          <span className="mail-text send">SEND</span>
        </>
      )}

      {state === 2 && (
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
