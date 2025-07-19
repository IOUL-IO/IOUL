
"use client";
import React, { useState, useRef, useEffect } from "react";

type Stage = "none" | "account" | "item" | "center";

const DUR = 600;                    // ms
const ITEM_IN  = 60;                // first shift for item (from 96 → 36vw)
const ITEM_OUT = 70;                // extra shift to hide item (-70vw)
const CENTER_IN = 60;               // center shift (from 106 → 46? or 36 maybe adjust)
const BASE_LEFT = 6.41;             // wrapper left vw
const WRAP_WIDTH = 28.86;           // clip width

export default function IOULPage() {
  const [stage, setStage] = useState<Stage>("none");

  /* ---------- event handlers ---------- */
  const forward = () => {
    setStage(prev => {
      if (prev === "none")   return "item";
      if (prev === "item")   return "center";
      if (prev === "account")return "none";
      return prev;
    });
  };

  const inverse = () => {
    setStage(prev => {
      if (prev === "center") return "item";
      if (prev === "item")   return "none";
      if (prev === "none")   return "account";
      if (prev === "account")return "none";
      return prev;
    });
  };

  /* ---------- transforms ---------- */
  const accountTx =
    stage === "account" ? "translateX(0)" : "translateX(-100vw)";

  const itemTx =
    stage === "item"   ? `translateX(-${ITEM_IN}vw)`
    : stage === "center"? `translateX(-${ITEM_IN + ITEM_OUT}vw)`
    : "translateX(100vw)";

  const centerTx =
    stage === "center" ? `translateX(-${CENTER_IN}vw)` : "translateX(100vw)";

  /* ---------- JSX ---------- */
  return (
    <div className="non-fullscreen" translate="no" style={{position:"relative",minHeight:"100vh"}}>

      {/* Edge trigger areas */}
      <div
        style={{position:"fixed",left:0,top:"28.5vh",width:"6.37vw",height:"55.5vh",zIndex:999}}
        onClick={inverse}
      />
      <div
        style={{position:"fixed",left:"28.86vw",top:"28.5vh",width:"3.57vw",height:"55.5vh",zIndex:999}}
        onClick={forward}
      />

      {/* Account / heading */}
      <div
        className="account-container"
        style={{
          position:"absolute",
          left:`${BASE_LEFT}vw`,
          top:"40vh",
          transform:accountTx,
          transition:`transform ${DUR}ms ease`
        }}
      >
        <h2>Account Heading</h2>
      </div>

      <div
        className="custom-line"
        style={{
          position:"absolute",
          left:`${BASE_LEFT}vw`,
          top:"47.8vh",
          width:"22.48vw",
          height:"1px",
          background:"rgba(230,230,230,0.28)",
          transform:accountTx,
          transition:`transform ${DUR}ms ease`,
          zIndex:1
        }}
      />

      {/* Item wrapper (clips contents) */}
      <div
        style={{
          position:"absolute",
          left:`${BASE_LEFT}vw`,
          top:"55vh",
          width:`${WRAP_WIDTH}vw`,
          overflow:"hidden"
        }}
      >
        <div
          style={{
            display:"flex",
            flexDirection:"column",
            gap:"0.5rem",
            transform:itemTx,
            transition:`transform ${DUR}ms ease`
          }}
        >
          <span className="item-text">Item Text 1</span>
          <span className="item-text">Item Text 2</span>
          <div style={{height:"1px",background:"rgba(230,230,230,0.28)"}}/>
        </div>
      </div>

      {/* Center group */}
      <div
        style={{
          position:"absolute",
          left:`${BASE_LEFT}vw`,
          top:"68vh",
          transform:centerTx,
          transition:`transform ${DUR}ms ease`
        }}
      >
        <span className="center-text">Center Text</span>
        <div style={{height:"1px",background:"rgba(230,230,230,0.28)",marginTop:"0.5rem"}}/>
      </div>
    </div>
  );
}
