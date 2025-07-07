
"use client";

import React, { useEffect, useState } from "react";
import Script from "next/script";
import "./globals.css";

interface TextGroup {
  texts: [string, string];
  baseLeft: number;
  rightFlow?: boolean;
}

export default function IOULPage() {
  const DIST = 60; // vw shift amount per stage
  const [itemStage, setItemStage] = useState(0); // 0 or 1
  const [centerStage, setCenterStage] = useState(0); // 0 or 1

  const itemGroups: TextGroup[] = [
    { texts: ["1ncOME", "cL1EnT"], baseLeft: 96 },
    { texts: ["0", "0"], baseLeft: 109, rightFlow: true },
    { texts: ["T1cKETS", "1nQU1RY"], baseLeft: 118 },
    { texts: ["0", "0"], baseLeft: 131, rightFlow: true },
    { texts: ["OnL1nE", "JO1nED"], baseLeft: 139 },
    { texts: ["0", "0"], baseLeft: 153.4, rightFlow: true },
  ];

  const centerGroups: TextGroup[] = [
    { texts: ["UPDATES", "cATALOg"], baseLeft: 106 },
    { texts: ["0", "0"], baseLeft: 119, rightFlow: true },
    { texts: ["T1cKETS", "cOnTAcT"], baseLeft: 128 },
    { texts: ["0", "0"], baseLeft: 141, rightFlow: true },
    { texts: ["gET APP", "AP1-LOg"], baseLeft: 149 },
    { texts: ["0", "0"], baseLeft: 163.4, rightFlow: true },
  ];

  const accountGroups: { text: string; baseLeft: number; rightFlow?: boolean }[] = [
    { text: "AccOUnT nAME", baseLeft: -24 },
    { text: "L1nK UP", baseLeft: 26 },
    { text: "0", baseLeft: 33.19, rightFlow: true },
  ];

  const computeLeft = (base: number, stage: number) => {
    if (stage === 0) return base;
    // stage 1 for items moves left by DIST, stage 1 for centers moves left by DIST
    return base - DIST * stage;
  };

  const handleForward = () => {
    if (itemStage === 0) {
      setItemStage(1);
    } else if (itemStage === 1 && centerStage === 0) {
      setCenterStage(1);
    }
  };

  const handleReverse = () => {
    if (centerStage === 1) {
      setCenterStage(0);
    } else if (itemStage === 1 && centerStage === 0) {
      setItemStage(0);
    }
  };

  // Fade in page content on mount
  useEffect(() => {
    const content = document.querySelector(".page-content") as HTMLElement;
    if (content) {
      content.style.opacity = "1";
    }
  }, []);

  return (
    <>
      {/* Ensure legacy lines and masks are in place */}
      <div className="layer-one" />
      <div className="layer-two" />
      <div className="layer-three" />
      <div className="page-content" style={{ position: "relative", opacity: 0, transition: "opacity 0.7s ease" }}>
        {/* Render item text groups */}
        {itemGroups.map((grp, idx) => (
          <React.Fragment key={`item-${idx}`}>
            <span
              className={`item-text${grp.rightFlow ? " right-flow" : ""}`}
              style={{
                position: "absolute",
                top: "35.4vh",
                left: `${computeLeft(grp.baseLeft, itemStage)}vw`,
                transition: "left 0.7s ease",
                lineHeight: 1.6,
                overflow: "visible",
              }}
            >
              {grp.texts[0]}
            </span>
            <span
              className={`item-text${grp.rightFlow ? " right-flow" : ""}`}
              style={{
                position: "absolute",
                top: "41.6vh",
                left: `${computeLeft(grp.baseLeft, itemStage)}vw`,
                transition: "left 0.7s ease",
                lineHeight: 1.6,
                overflow: "visible",
              }}
            >
              {grp.texts[1]}
            </span>
          </React.Fragment>
        ))}

        {/* Render center text groups */}
        {centerGroups.map((grp, idx) => (
          <React.Fragment key={`center-${idx}`}>
            <span
              className={`center-text${grp.rightFlow ? " right-flow" : ""}`}
              style={{
                position: "absolute",
                top: "35.4vh",
                left: `${computeLeft(grp.baseLeft, centerStage)}vw`,
                transition: "left 0.7s ease",
                lineHeight: 1.6,
                overflow: "visible",
              }}
            >
              {grp.texts[0]}
            </span>
            <span
              className={`center-text${grp.rightFlow ? " right-flow" : ""}`}
              style={{
                position: "absolute",
                top: "41.6vh",
                left: `${computeLeft(grp.baseLeft, centerStage)}vw`,
                transition: "left 0.7s ease",
                lineHeight: 1.6,
                overflow: "visible",
              }}
            >
              {grp.texts[1]}
            </span>
          </React.Fragment>
        ))}

        {/* Render account text */}
        {accountGroups.map((grp, idx) => (
          <span
            key={`acct-${idx}`}
            className={`account-text${grp.rightFlow ? " right-flow" : ""}`}
            style={{
              position: "absolute",
              top: "35.4vh",
              left: `${computeLeft(grp.baseLeft, itemStage)}vw`,
              transition: "left 0.7s ease",
            }}
          >
            {grp.text}
          </span>
        ))}

        {/* Slide triggers */}
        <div
          className="slide-trigger"
          onClick={handleForward}
          style={{ position: "absolute", top: 0, right: 0, width: "6vw", height: "100vh", cursor: "pointer" }}
        />
        <div
          className="slide-trigger-reverse"
          onClick={handleReverse}
          style={{ position: "absolute", top: 0, left: 0, width: "6vw", height: "100vh", cursor: "pointer" }}
        />
      </div>
      <div className="layer-four" />

      {/* Include any legacy external scripts if needed */}
    </>
  );
}
