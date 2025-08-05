"use client";
import './styles.css';


import React, { useEffect } from 'react';

export default function Page() {
  useEffect(() => {
    // Edge-trigger fullscreen toggle
    const EDGE = 11; // px from each edge
    const handler = (event: MouseEvent) => {
      const { clientX: x, clientY: y } = event as MouseEvent;
      const { innerWidth: w, innerHeight: h } = window;
      if (
        !document.fullscreenElement &&
        (x <= EDGE || x >= w - EDGE || y <= EDGE || y >= h - EDGE)
      ) {
        document.documentElement.requestFullscreen().catch(() => {});
      }
    };

    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, []);

  return (
    <div>
      {/* Fixed layout layers */}
      <div className="layer-one" />
      <div className="layer-two" />
      <div className="layer-three" />
      <div className="layer-four" />
      <div className="layer-five" />
      <div className="layer-six" />

      {/* Primary guide lines */}
      <div className="line original" />
      <div className="line second" />
      <div className="line third" />
      <div className="line fourth" />
      <div className="line fifth" />
      <div className="line sixth" />
      
      <div className="line mail-line" style={{ position: 'absolute', top: '47.8vh', left: '36vw', width: '57.8vw', height: '1px', backgroundColor: 'rgba(230,230,230,0.28)', zIndex: 1 }} />

        <span className="mail-text" style={{position:'absolute',top:'35.4vh',left:'36vw',zIndex:2,fontFamily:"'Distill Expanded',sans-serif",color:'#111111',letterSpacing:'0.28vw',fontSize:'0.47rem',textShadow:'0.001rem 0.001rem 0 #717171,-0.001rem -0.001rem 0 #717171',}}>TO:</span>
        <span className="mail-text" style={{position:'absolute',top:'41.6vh',left:'36vw',zIndex:2,fontFamily:"'Distill Expanded',sans-serif",color:'#111111',letterSpacing:'0.28vw',fontSize:'0.47rem',textShadow:'0.001rem 0.001rem 0 #717171,-0.001rem -0.001rem 0 #717171',}}>SUBJEcT:</span>
        <span className="mail-text" style={{position:'absolute',top:'35.4vh',left:'89vw',zIndex:2,fontFamily:"'Distill Expanded',sans-serif",color:'#111111',letterSpacing:'0.28vw',fontSize:'0.47rem',textShadow:'0.001rem 0.001rem 0 #717171,-0.001rem -0.001rem 0 #717171',}}>cc</span>
        <span className="mail-text" style={{position:'absolute',top:'35.4vh',left:'91.9vw',zIndex:2,fontFamily:"'Distill Expanded',sans-serif",color:'#111111',letterSpacing:'0.28vw',fontSize:'0.47rem',textShadow:'0.001rem 0.001rem 0 #717171,-0.001rem -0.001rem 0 #717171',}}>Bcc</span>
        <span className="mail-text" style={{position:'absolute',top:'41.6vh',left:'91.1vw',zIndex:2,fontFamily:"'Distill Expanded',sans-serif",color:'#111111',letterSpacing:'0.28vw',fontSize:'0.47rem',textShadow:'0.001rem 0.001rem 0 #717171,-0.001rem -0.001rem 0 #717171',}}>SEnD</span>

      
      <div className="line util-line" />
    </div>
  );
}
