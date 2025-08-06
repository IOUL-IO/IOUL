"use client";
import "./styles.css";

import React, { useEffect, useRef } from "react";

const IOULPage: React.FC = () => {
  useEffect(()=>document.body.classList.add("non-fullscreen"),[]);

  useEffect(()=>{
    const EDGE=11;
    const click=(e:MouseEvent)=>{
      const {clientX:x,clientY:y}=e,{innerWidth:w,innerHeight:h}=window;
      if(x>EDGE&&x<w-EDGE&&y>EDGE&&y<h-EDGE) return;
      (!document.fullscreenElement?document.documentElement.requestFullscreen():document.exitFullscreen()).catch(()=>{});
    };
    const fs=()=>document.body.classList.toggle("non-fullscreen",!document.fullscreenElement);
    document.addEventListener("click",click);document.addEventListener("fullscreenchange",fs);
    return()=>{document.removeEventListener("click",click);document.removeEventListener("fullscreenchange",fs);};
  },[]);

  const idx=useRef(0);
  useEffect(()=>{
    const wh=(e:WheelEvent)=>{
      e.preventDefault();
      const els=document.querySelectorAll<HTMLElement>(".grid-number,.grid-dashed");
      if(!els.length) return;
      idx.current=Math.min(Math.max(idx.current+(e.deltaY>0?1:-1),0),2);
      const off=-55.5*idx.current;
      els.forEach(el=>{el.style.transform=`translateY(${off}vh)`;});
    };
    window.addEventListener("wheel",wh,{passive:false});
    return()=>window.removeEventListener("wheel",wh);
  },[]);

  return (
    <div className="non-fullscreen" translate="no">
      {/* fixed vertical stripes */}
      <div className="layer-one"/><div className="layer-two"/><div className="layer-three"/>

      {/* layer‑four (middle mask) */}
      <div className="layer-four"/>

      {/* content: grid + lines */}
      <div className="other-content">
        <div className="line original"/><div className="line second"/><div className="line util-line"/>
        <div className="line third"/><div className="line fourth"/>

        {Array.from({length:31},(_,i)=>(<span key={i} className={`grid-number num${i+1}`} style={{display:"inline-block"}}>{i+1}</span>))}
        {Array.from({length:31},(_,i)=>(<span key={`d${i}`} className={`grid-dashed dashed${String(i+1).padStart(2,"0")}`} style={{display:"inline-block"}}/>))}
      </div>

      {/* top & bottom masks so they paint *after* grid */}
      <div className="layer-five"/><div className="layer-six"/>
    </div>
  );
};

export default IOULPage;