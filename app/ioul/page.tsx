
"use client";
import React, { useState } from "react";

/**
 * Low‑level slider with four stages:
 *
 *   none     – everything off‑screen
 *   item     – item group visible at 36 vw
 *   center   – item pushed further left (& clipped) + center visible
 *   account  – account heading visible
 *
 * Forward  (right‑edge click):  none → item → center   (center has no forward)
 * Inverse  (left‑edge click):   center → item → none → account → none
 *
 * Distances are hard‑coded to match the user spec:
 *   • item columns start at 96 vw; 1st forward = −60 vw  → 36 vw
 *   • 2nd forward = −70 vw  (additional)  → −34 vw, which is < 28.86 vw so it’s clipped
 *   • center columns start at 106 vw; forward = −60 vw → 46 vw (user said “slide left by 60”)
 */

type Stage = "none" | "item" | "center" | "account";

const DUR_MS = 600;

// starting left positions (vw) for first elements in each group
const ITEM_BASE_LEFT   = 96;
const CENTER_BASE_LEFT = 106;

// per‑stage transforms
const txItem = (stage: Stage) => {
  switch (stage) {
    case "item":   return `translateX(calc(-60vw))`;             // 96 → 36
    case "center": return `translateX(calc(-130vw))`;            // 96 → -34 (clipped)
    default:       return `translateX(0)`;                       // keep at 96 (off‑screen right)
  }
};

const txCenter = (stage: Stage) => {
  switch (stage) {
    case "center": return `translateX(calc(-60vw))`;             // 106 → 46
    default:       return `translateX(0)`;                       // keep at 106
  }
};

const txAccount = (stage: Stage) =>
  stage === "account" ? "translateX(0)" : "translateX(-100vw)";

export default function IOULPage() {
  const [stage, setStage] = useState<Stage>("none");

  /* ----- click zones ----- */
  const handleForward = () => {
    setStage(prev => {
      if (prev === "none")   return "item";
      if (prev === "item")   return "center";
      if (prev === "account")return "none";
      return prev; // center has no forward
    });
  };

  const handleInverse = () => {
    setStage(prev => {
      if (prev === "center") return "item";
      if (prev === "item")   return "none";
      if (prev === "none")   return "account";
      if (prev === "account")return "none";
      return prev;
    });
  };

  /* ----- JSX ----- */
  return (
    <div className="non-fullscreen" translate="no" style={{position:"relative",minHeight:"100vh",overflow:"hidden"}}>

      {/* Inverse (left‑edge) trigger zone */}
      <div
        onClick={handleInverse}
        style={{
          position:"fixed",left:0,top:"28.5vh",
          width:"6.37vw",height:"55.5vh",zIndex:999,cursor:"pointer"
        }}
      />
      {/* Forward (right‑edge) trigger zone */}
      <div
        onClick={handleForward}
        style={{
          position:"fixed",left:"28.86vw",top:"28.5vh",
          width:"3.57vw",height:"55.5vh",zIndex:999,cursor:"pointer"
        }}
      />

      {/* Account heading + underline */}
      <div
        className="account-container"
        style={{
          position:"absolute",
          left:"6.41vw", top:"40vh",
          transform: txAccount(stage),
          transition:`transform ${DUR_MS}ms ease`
        }}
      >
        <h2>Account Heading</h2>
      </div>
      <div
        className="custom-line"
        style={{
          position:"absolute",
          left:"6.41vw", top:"47.8vh",
          width:"22.48vw",height:"1px",
          background:"rgba(230,230,230,0.28)",
          transform: txAccount(stage),
          transition:`transform ${DUR_MS}ms ease`
        }}
      />

      {/* Item wrapper clips width 28.86 vw */}
      <div
        style={{
          position:"absolute",left:"6.41vw",top:"55vh",
          width:"28.86vw",overflow:"hidden"
        }}
      >
        <div
          style={{
            position:"relative",
            left:`${ITEM_BASE_LEFT}vw`,
            transform: txItem(stage),
            transition:`transform ${DUR_MS}ms ease`
          }}
        >
          <span className="item-text" style={{display:"block"}}>Item Text 1</span>
          <span className="item-text" style={{display:"block"}}>Item Text 2</span>
          <div style={{height:"1px",background:"rgba(230,230,230,0.28)",marginTop:"0.5rem"}}/>
        </div>
      </div>

      {/* Center group */}
      <div
        style={{
          position:"absolute",left:"6.41vw",top:"68vh",
          width:"28.86vw",overflow:"hidden"
        }}
      >
        <div
          style={{
            position:"relative",
            left:`${CENTER_BASE_LEFT}vw`,
            transform: txCenter(stage),
            transition:`transform ${DUR_MS}ms ease`
          }}
        >
          <span className="center-text" style={{display:"block"}}>Center Text</span>
          <div style={{height:"1px",background:"rgba(230,230,230,0.28)",marginTop:"0.5rem"}}/>
        </div>
      </div>
    </div>
  );
}
