import React, { useState, useEffect } from "react";
import "./ioul.css";

const CLIP_VW = 36; // mask width in vw
const SLIDE_VW = 70; // slide distance in vw

export default function IOUL() {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    // Lock the viewport
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
  }, []);

  const handleTrigger = () => {
    setStage((prev) => (prev + 1) % 3);
  };

  const itemsOffset = stage === 1 ? -SLIDE_VW : stage === 2 ? 0 : 0;
  const centerOffset = stage === 1 ? 0 : stage === 2 ? SLIDE_VW : SLIDE_VW;

  return (
    <div className="ioul-root">
      <button className="trigger-btn" onClick={handleTrigger}>Toggle</button>
      <div id="layer-1">{/* Artwork */}</div>
      <div id="layer-2" />
      <div id="layer-3" />

      {/* Items Group */}
      <div className="items-container">
        <div className="items-inner" style={{
            transform: `translateX(${stage === 1 ? -SLIDE_VW : 0}vw)`,
            transition: "transform 0.7s ease"
          }}>
          {/* Existing item-texts and item-lines */}
          {/* Missing spans */}
          <span className="item-text" style={{position: "absolute", top: "35.4vh", left: "96vw"}}>1ncOME</span>
          <span className="item-text" style={{position: "absolute", top: "41.6vh", left: "96vw"}}>cL1EnT</span>
          <span className="item-text right-flow" style={{position: "absolute", top: "35.4vh", left: "109vw"}}>0</span>
          <span className="item-text right-flow" style={{position: "absolute", top: "41.6vh", left: "109vw"}}>0</span>
          <span className="item-text" style={{position: "absolute", top: "35.4vh", left: "118vw"}}>T1cKETS</span>
          <span className="item-text" style={{position: "absolute", top: "41.6vh", left: "118vw"}}>1nQU1RY</span>
          <span className="item-text right-flow" style={{position: "absolute", top: "35.4vh", left: "131vw"}}>0</span>
          <span className="item-text right-flow" style={{position: "absolute", top: "41.6vh", left: "131vw"}}>0</span>
          <span className="item-text" style={{position: "absolute", top: "35.4vh", left: "139vw"}}>OnL1nE</span>
          <span className="item-text" style={{position: "absolute", top: "41.6vh", left: "139vw"}}>JO1nED</span>
          <span className="item-text right-flow" style={{position: "absolute", top: "35.4vh", left: "153.4vw"}}>0</span>
          <span className="item-text right-flow" style={{position: "absolute", top: "41.6vh", left: "153.4vw"}}>0</span>
        </div>
      </div>

      {/* Center Group */}
      <div className="center-container">
        <div className="center-inner" style={{
            transform: `translateX(${stage === 1 ? 0 : SLIDE_VW}vw)`,
            transition: "transform 0.7s ease"
          }}>
          {/* Existing center-texts and center-lines */}
          {/* Missing spans */}
          <span className="center-text" style={{position: "absolute", top: "35.4vh", left: "106vw"}}>UPDATES</span>
          <span className="center-text" style={{position: "absolute", top: "41.6vh", left: "106vw"}}>cATALOg</span>
          <span className="center-text right-flow" style={{position: "absolute", top: "35.4vh", left: "119vw"}}>0</span>
          <span className="center-text right-flow" style={{position: "absolute", top: "41.6vh", left: "119vw"}}>0</span>
          <span className="center-text" style={{position: "absolute", top: "35.4vh", left: "128vw"}}>T1cKETS</span>
          <span className="center-text" style={{position: "absolute", top: "41.6vh", left: "128vw"}}>cOnTAcT</span>
          <span className="center-text right-flow" style={{position: "absolute", top: "35.4vh", left: "141vw"}}>0</span>
          <span className="center-text right-flow" style={{position: "absolute", top: "41.6vh", left: "141vw"}}>0</span>
          <span className="center-text" style={{position: "absolute", top: "35.4vh", left: "149vw"}}>gET APP</span>
          <span className="center-text" style={{position: "absolute", top: "41.6vh", left: "149vw"}}>AP1-LOg</span>
          <span className="center-text right-flow" style={{position: "absolute", top: "35.4vh", left: "163.4vw"}}>0</span>
          <span className="center-text right-flow" style={{position: "absolute", top: "41.6vh", left: "163.4vw"}}>0</span>
        </div>
      </div>

      {/* Community & Zero Items Group */}
      <div className="community-container">
        {/* ...community and zero items need to mirror items-group at 6.41vw stage... */}
      </div>

      {/* Mail Group */}
      <div className="mail-wrapper">
        {/* include all mail-text & mail-line spans here */}
      </div>

      {/* Util-Line Toggle */}
      <div className="util-line" onClick={() => {/* toggle mail vs calendar here */}}>
        {/* util-line element */}
      </div>
    </div>
);
}
