
"use client";
import React, { useState } from "react";

type Stage = "none" | "account" | "item" | "center";

const TRANS_MS = 600;
const DIST_ITEM_IN = 60;   // first step for item
const DIST_ITEM_CLIP = 70; // extra step to push item left off wrapper
const DIST_CENTER_IN = 60; // center slides in same as first item

export default function IOULPage() {
  const [stage, setStage] = useState<Stage>("none");

  /* ---------- stage helpers ---------- */
  const nextForward = () => {
    setStage(prev => {
      if (prev === "none")   return "item";
      if (prev === "item")   return "center";
      if (prev === "account")return "none";   // account slides back
      return prev;           // center → no further
    });
  };

  const nextInverse = () => {
    setStage(prev => {
      if (prev === "none")   return "account"; // only when item & center are hidden
      if (prev === "account")return "none";
      if (prev === "item")   return "none";
      if (prev === "center") return "item";
      return prev;
    });
  };

  /* ---------- computed transforms ---------- */
  // account moves from -100vw (off left) to 0
  const accountTransform =
    stage === "account" ? "translateX(0)" : "translateX(-100vw)";

  // item group logic
  const itemTransform =
    stage === "item"   ? `translateX(-${DIST_ITEM_IN}vw)`
    : stage === "center"? `translateX(-${DIST_ITEM_IN + DIST_ITEM_CLIP}vw)`
    : "translateX(100vw)"; // off right for none/account

  // center group
  const centerTransform =
    stage === "center" ? `translateX(-${DIST_CENTER_IN}vw)` : "translateX(100vw)";

  /* ---------- JSX ---------- */
  return (
    <div className="non-fullscreen" translate="no">
      {/* controls for demo/testing */}
      <div style={{position:"fixed",top:"1rem",left:"1rem",zIndex:999}}>
        <button onClick={nextInverse}>⟵ inverse</button>
        <button onClick={nextForward} style={{marginLeft:"1rem"}}>forward ⟶</button>
        <span style={{marginLeft:"2rem"}}>stage: {stage}</span>
      </div>

      {/* Account / heading group */}
      <div
        className="account-container"
        data-slide-group="account"
        style={{
          position:"absolute",
          left:"6.41vw",
          top:"40vh",
          transform: accountTransform,
          transition:`transform ${TRANS_MS}ms ease`
        }}
      >
        <h2>Account Heading</h2>
      </div>
      {/* underline for account */}
      <div
        className="custom-line"
        data-slide-group="heading"
        style={{
          position:"absolute",
          left:"6.41vw",
          top:"47.8vh",
          width:"22.48vw",
          height:"1px",
          background:"rgba(230,230,230,0.28)",
          transform: accountTransform,
          transition:`transform ${TRANS_MS}ms ease`,
          zIndex:1
        }}
      />

      {/* Wrapper to clip the item group at width 28.86vw */}
      <div
        className="item-wrapper"
        style={{
          position:"absolute",
          left:"6.41vw",
          top:"55vh",
          width:"28.86vw",
          overflow:"hidden"
        }}
      >
        <div
          className="item-group"
          style={{
            transform: itemTransform,
            transition:`transform ${TRANS_MS}ms ease`
          }}
        >
          <div className="item-text">Item Text 1</div>
          <div className="item-text">Item Text 2</div>
          <div
            className="item-line"
            style={{
              height:"1px",
              background:"rgba(230,230,230,0.28)",
              marginTop:"0.5rem"
            }}
          />
        </div>
      </div>

      {/* Center group */}
      <div
        className="center-group"
        style={{
          position:"absolute",
          left:"6.41vw",
          top:"65vh",
          transform: centerTransform,
          transition:`transform ${TRANS_MS}ms ease`
        }}
      >
        <div className="center-text">Center Text</div>
        <div
          className="center-line"
          style={{
            height:"1px",
            background:"rgba(230,230,230,0.28)",
            marginTop:"0.5rem"
          }}
        />
      </div>
    </div>
  );
}
