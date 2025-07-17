"use client";

import React, { useEffect, useState, useCallback } from "react";
import "./styles.css";

const IOULPage: React.FC = () => {
  // UTIL LINE TOGGLE STATE: 0=baseline, 1=mail, 2=calendar
  const [utilState, setUtilState] = useState(0);

  // Advance state on click
  const handleUtilLineClick = useCallback(() => {
    setUtilState((prev) => (prev + 1) % 3);
  }, []);

  // Sync data-util attribute
  useEffect(() => {
    document.documentElement.setAttribute("data-util", utilState.toString());
  }, [utilState]);

  return (
    <div className="non-fullscreen" translate="no">
      {/* Layers 1-3 */}
      <div className="layer-one" />
      <div className="layer-two" />
      <div className="layer-three" />

      {/* UTIL toggle lines */}
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
      <span
        className="mail-text to"
        style={{
          position: "absolute",
          top: "35.4vh",
          left: "36vw",
          fontFamily: "'Distill Expanded', sans-serif",
          color: "#111111",
          letterSpacing: "0.28vw",
          fontSize: "0.47rem",
          textShadow: "0.001rem 0.001rem 0 #717171, -0.001rem -0.001rem 0 #717171",
        }}
      >
        TO:
      </span>
      <span
        className="mail-text subject"
        style={{
          position: "absolute",
          top: "41.6vh",
          left: "36vw",
          fontFamily: "'Distill Expanded', sans-serif",
          color: "#111111",
          letterSpacing: "0.28vw",
          fontSize: "0.47rem",
          textShadow: "0.001rem 0.001rem 0 #717171, -0.001rem -0.001rem 0 #717171",
        }}
      >
        SUBJECT:
      </span>
      <span
        className="mail-text cc"
        style={{
          position: "absolute",
          top: "35.4vh",
          left: "89vw",
          fontFamily: "'Distill Expanded', sans-serif",
          color: "#111111",
          letterSpacing: "0.28vw",
          fontSize: "0.47rem",
          textShadow: "0.001rem 0.001rem 0 #717171, -0.001rem -0.001rem 0 #717171",
        }}
      >
        cc
      </span>
      <span
        className="mail-text bcc"
        style={{
          position: "absolute",
          top: "35.4vh",
          left: "91.9vw",
          fontFamily: "'Distill Expanded', sans-serif",
          color: "#111111",
          letterSpacing: "0.28vw",
          fontSize: "0.47rem",
          textShadow: "0.001rem 0.001rem 0 #717171, -0.001rem -0.001rem 0 #717171",
        }}
      >
        Bcc
      </span>
      <span
        className="mail-text send"
        style={{
          position: "absolute",
          top: "41.6vh",
          left: "91.1vw",
          fontFamily: "'Distill Expanded', sans-serif",
          color: "#111111",
          letterSpacing: "0.28vw",
          fontSize: "0.47rem",
          textShadow: "0.001rem 0.001rem 0 #717171, -0.001rem -0.001rem 0 #717171",
        }}
      >
        SEND
      </span>

      {/* Calendar grid 1-16 */}
      {[...Array(16)].map((_, idx) => (
        <React.Fragment key={idx}>
          <span className={`grid-number num${idx + 1}`}>{idx + 1}</span>
          <span
            className={`grid-dashed dashed${String(idx + 1).padStart(2, "0")}`}
          />
        </React.Fragment>
      ))}

      {/* Remaining content (grid items 17-31, etc.) */}
    </div>
  );
};

export default IOULPage;
