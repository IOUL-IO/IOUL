"use client";
import "./styles.css";

import React, { useEffect, useRef } from "react";

/* ─────────────────────────────────────────────────────────────────────
   IOULPage (REV‑2)
   - lines 5 & 6 removed
   - grid sits under mask layers 5 & 6
   ───────────────────────────────────────────────────────────────────── */

const IOULPage: React.FC = () => {
  useEffect(() => {
    document.body.classList.add("non-fullscreen");
  }, []);

  /* Full‑screen toggle (edge‑click) */
  useEffect(() => {
    const EDGE = 11;
    const clickEdge = (e: MouseEvent) => {
      const { clientX:x, clientY:y } = e;
      const { innerWidth:w, innerHeight:h } = window;
      const hit = x<=EDGE || x>=w-EDGE || y<=EDGE || y>=h-EDGE;
      if(!hit) return;
      if(!document.fullscreenElement){
        document.documentElement.requestFullscreen().catch(()=>{});
      }else{
        document.exitFullscreen().catch(()=>{});
      }
    };
    const fsChange = ()=>document.body.classList.toggle("non-fullscreen",!document.fullscreenElement);
    document.addEventListener("click",clickEdge);
    document.addEventListener("fullscreenchange",fsChange);
    return ()=>{document.removeEventListener("click",clickEdge);document.removeEventListener("fullscreenchange",fsChange);};
  }, []);

  /* Scroll grid */
  const idxRef = useRef(0);
  useEffect(() => {
    const wheel = (e: WheelEvent) => {
      e.preventDefault();
      const els = Array.from(document.querySelectorAll<HTMLElement>(".grid-number,.grid-dashed"));
      if(!els.length) return;
      const dir = e.deltaY>0?1:-1;
      idxRef.current = Math.min(Math.max(idxRef.current+dir,0),2);
      const offset = -55.5*idxRef.current;
      els.forEach(el=>{
        el.style.transition="transform .7s ease";
        el.style.transform=`translateY(${offset}vh)`;
      });
    };
    window.addEventListener("wheel",wheel,{passive:false});
    return ()=>window.removeEventListener("wheel",wheel);
  }, []);

  return (
    <div className="non-fullscreen" translate="no">
      {/* mask layers */}
      <div className="layer-one"/><div className="layer-two"/><div className="layer-three"/>
      <div className="layer-four"/><div className="layer-five"/><div className="layer-six"/>

      {/* content */}
      <div className="other-content">
        {/* timeline lines */}
        <div className="line original"/>
        <div className="line second"/>
        <div className="line util-line"/>
        <div className="line third"/>
        <div className="line fourth"/>

        {/* calendar grid */}
        {Array.from({length:31},(_,i)=>(<span key={i} className={`grid-number num${i+1}`} style={{display:"inline-block"}}>{i+1}</span>))}
        {Array.from({length:31},(_,i)=>(<span key={`d${i}`} className={`grid-dashed dashed${String(i+1).padStart(2,"0")}`} style={{display:"inline-block"}}/>))}
      </div>
    </div>
  );
};

export default IOULPage;