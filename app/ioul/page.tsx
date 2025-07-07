
"use client";

import React, { useEffect, useState } from "react";
import Script from "next/script";
import "../../globals.css";

interface TextGroup {
  texts: [string, string];
  baseLeft: number;
  rightFlow?: boolean;
}

export default function Page() {
  const DIST = 60; // vw per slide step
  const [step, setStep] = useState(0); // 0,1,2

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

  const computeItemLeft = (base: number) => `${base - DIST * step}vw`;
  const computeCenterLeft = (base: number) => `${base - DIST * (step > 1 ? 1 : 0)}vw`;

  const handleForward = () => {
    if (step < 2) setStep((s) => s + 1);
  };
  const handleReverse = () => {
    if (step > 0) setStep((s) => s - 1);
  };

  useEffect(() => {
    const content = document.querySelector(".page-content") as HTMLElement;
    if (content) content.style.opacity = "1";
  }, []);

  return (
    <>
      <Script id="legacy-js" strategy="afterInteractive">
        {/* Include any other original JS here if needed */}
      </Script>
      <div className="layer-one" />
      <div className="layer-two" />
      <div
        className="page-content"
        style={{ position: "relative", opacity: 0, transition: "opacity 0.7s ease" }}
      >
        {itemGroups.map((grp, i) => (
          <React.Fragment key={`item-${i}`}>
            <span
              className={`item-text${grp.rightFlow ? " right-flow" : ""}`}
              style={{
                position: "absolute",
                top: "35.4vh",
                left: computeItemLeft(grp.baseLeft),
                transition: "left 0.7s ease",
                overflow: "visible",
                lineHeight: 1.6,
              }}
            >
              {grp.texts[0]}
            </span>
            <span
              className={`item-text${grp.rightFlow ? " right-flow" : ""}`}
              style={{
                position: "absolute",
                top: "41.6vh",
                left: computeItemLeft(grp.baseLeft),
                transition: "left 0.7s ease",
                overflow: "visible",
                lineHeight: 1.6,
              }}
            >
              {grp.texts[1]}
            </span>
          </React.Fragment>
        ))}
        {centerGroups.map((grp, i) => (
          <React.Fragment key={`center-${i}`}>
            <span
              className={`center-text${grp.rightFlow ? " right-flow" : ""}`}
              style={{
                position: "absolute",
                top: "35.4vh",
                left: computeCenterLeft(grp.baseLeft),
                transition: "left 0.7s ease",
                overflow: "visible",
                lineHeight: 1.6,
              }}
            >
              {grp.texts[0]}
            </span>
            <span
              className={`center-text${grp.rightFlow ? " right-flow" : ""}`}
              style={{
                position: "absolute",
                top: "41.6vh",
                left: computeCenterLeft(grp.baseLeft),
                transition: "left 0.7s ease",
                overflow: "visible",
                lineHeight: 1.6,
              }}
            >
              {grp.texts[1]}
            </span>
          </React.Fragment>
        ))}
        {accountGroups.map((grp, i) => (
          <span
            key={`acct-${i}`}
            className={`account-text${grp.rightFlow ? " right-flow" : ""}`}
            style={{
              position: "absolute",
              top: "35.4vh",
              left: computeItemLeft(grp.baseLeft),
              transition: "left 0.7s ease",
            }}
          >
            {grp.text}
          </span>
        ))}
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
      <div className="layer-three" />
      <div className="layer-four" />
    </>
  );
}
