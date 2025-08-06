
"use client";
import "./styles.css";
import React, { useEffect, useRef } from "react";

const IOULPage: React.FC = () => {
  // Edge-click full‑screen toggle
  useEffect(() => {
    const EDGE = 11;
    const toggle = (e: MouseEvent) => {
      const { clientX:x, clientY:y } = e;
      const { innerWidth:w, innerHeight:h } = window;
      const nearEdge = x<=EDGE||x>=w-EDGE||y<=EDGE||y>=h-EDGE;
      if(!nearEdge) return;
      if(!document.fullscreenElement){document.documentElement.requestFullscreen().catch(()=>{});}
      else{document.exitFullscreen().catch(()=>{});}
    };
    document.addEventListener("click", toggle);
    return () => document.removeEventListener("click", toggle);
  }, []);

  // Scroll calendar grid
  const idxRef = useRef(0);
  useEffect(() => {
    const wheel = (e: WheelEvent) => {
      e.preventDefault();
      const els = Array.from(document.querySelectorAll<HTMLElement>(".grid-number,.grid-dashed"));
      if(!els.length) return;
      const clamp = (v:number,min:number,max:number)=>Math.min(Math.max(v,min),max);
      const dir = e.deltaY>0?1:-1;
      idxRef.current = clamp(idxRef.current + dir,0,2);
      const offset = -55.5*idxRef.current;
      els.forEach(el=>{
        el.style.transform = `translateY(${offset}vh)`;
      });
    };
    window.addEventListener("wheel", wheel, { passive:false });
    return () => window.removeEventListener("wheel", wheel);
  }, []);

  return (
    <div translate="no">
      {/* mask layers */}
      <div className="layer-one" />
      <div className="layer-two" />
      <div className="layer-three" />
      <div className="layer-four" />
      <div className="layer-five" />
      <div className="layer-six" />

      {/* timeline lines */}
      <div className="line original" />
      <div className="line second" />
      <div className="line third" />
      <div className="line fourth" />

      {/* calendar grid */}
      {Array.from({ length: 31 }, (_, i) => (
        <span key={`n${i+1}`} className={`grid-number num${i+1}`}>{i+1}</span>
      ))}
      {Array.from({ length: 31 }, (_, i) => (
        <span key={`d${i+1}`} className={`grid-dashed dashed{str(i+1).zfill(2)}`} />
      ))}
    </div>
  );
};

export default IOULPage;
