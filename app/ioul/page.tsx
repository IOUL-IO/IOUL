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
      {/* ... existing layers and other content above ... */}

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

      {/* Mail labels with absolute positioning and initial opacity 0 */}
      <span
        className="mail-text"
        style={{
          position: "absolute",
          top: "35.4vh",
          left: "36vw",
          zIndex: 1,
          fontFamily: "'Distill Expanded', sans-serif",
          color: "#111111",
          letterSpacing: "0.28vw",
          fontSize: "0.47rem",
          textShadow:
            "0.001rem 0.001rem 0 #717171, -0.001rem -0.001rem 0 #717171",
          opacity: 0,
          transition: "opacity 0.3s ease",
        }}
      >
        TO:
      </span>
      <span
        className="mail-text"
        style={{
          position: "absolute",
          top: "41.6vh",
          left: "36vw",
          zIndex: 1,
          fontFamily: "'Distill Expanded', sans-serif",
          color: "#111111",
          letterSpacing: "0.28vw",
          fontSize: "0.47rem",
          textShadow:
            "0.001rem 0.001rem 0 #717171, -0.001rem -0.001rem 0 #717171",
          opacity: 0,
          transition: "opacity 0.3s ease",
        }}
      >
        SUBJECT:
      </span>
      <span
        className="mail-text"
        style={{
          position: "absolute",
          top: "35.4vh",
          left: "89vw",
          zIndex: 1,
          fontFamily: "'Distill Expanded', sans-serif",
          color: "#111111",
          letterSpacing: "0.28vw",
          fontSize: "0.47rem",
          textShadow:
            "0.001rem 0.001rem 0 #717171, -0.001rem -0.001rem 0 #717171",
          opacity: 0,
          transition: "opacity 0.3s ease",
        }}
      >
        cc
      </span>
      <span
        className="mail-text"
        style={{
          position: "absolute",
          top: "35.4vh",
          left: "91.9vw",
          zIndex: 1,
          fontFamily: "'Distill Expanded', sans-serif",
          color: "#111111",
          letterSpacing: "0.28vw",
          fontSize: "0.47rem",
          textShadow:
            "0.001rem 0.001rem 0 #717171, -0.001rem -0.001rem 0 #717171",
          opacity: 0,
          transition: "opacity 0.3s ease",
        }}
      >
        Bcc
      </span>
      <span
        className="mail-text"
        style={{
          position: "absolute",
          top: "41.6vh",
          left: "91.1vw",
          zIndex: 1,
          fontFamily: "'Distill Expanded', sans-serif",
          color: "#111111",
          letterSpacing: "0.28vw",
          fontSize: "0.47rem",
          textShadow:
            "0.001rem 0.001rem 0 #717171, -0.001rem -0.001rem 0 #717171",
          opacity: 0,
          transition: "opacity 0.3s ease",
        }}
      >
        SEND
      </span>

      {/* Calendar grid numbers 1-16 */}
      {[...Array(16)].map((_, idx) => (
        <React.Fragment key={idx}>
          <span className={`grid-number num${idx + 1}`}>{idx + 1}</span>
          <span
            className={`grid-dashed dashed${String(idx + 1).padStart(2, "0")}`}
          />
        </React.Fragment>
      ))}

      {/* ... rest of calendar and other content ... */}
    </div>
  );
};

export default IOULPage;
