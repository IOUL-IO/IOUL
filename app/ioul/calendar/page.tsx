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

  const idx = useRef(0);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(()=>{
    const wh=(e:WheelEvent)=>{
      e.preventDefault();
      const dir = e.deltaY>0?1:-1;
      idx.current = Math.min(Math.max(idx.current+dir,0),2);
      const offset=-55.5*idx.current; // vh
      if(wrapperRef.current){
        wrapperRef.current.style.top = offset+"vh";
      }
    };
    window.addEventListener("wheel",wh,{passive:false});
    return()=>window.removeEventListener("wheel",wh);
  },[]);

  return (
    <div className="non-fullscreen" translate="no">
      <div className="layer-one"/><div className="layer-two"/><div className="layer-three"/>
      <div className="layer-four"/>

      <div className="other-content">
        <div className="line original"/><div className="line second"/><div className="line util-line"/>
        <div className="line third"/><div className="line fourth"/>

        {/* grid wrapper moves vertically */}
        <div ref={wrapperRef} className="grid-wrapper">
          {Array.from({length:31},(_,i)=>(<span key={i} className={`grid-number num${i+1}`}>{i+1}</span>))}
          {Array.from({length:31},(_,i)=>(<span key={`d${i}`} className={`grid-dashed dashed${String(i+1).padStart(2,"0")}`}/>))}
        </div>
      </div>

      <div className="layer-five"/><div className="layer-six"/>
    </div>
  );
};

export default IOULPage;