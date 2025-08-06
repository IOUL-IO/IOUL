"use client";
import './styles.css';
import React, { useEffect } from 'react';

export default function Page() {
  /* ─ edge‑trigger full‑screen toggle ─ */
  useEffect(() => {
    const EDGE = 11; // px from each edge
    const handler = (e: MouseEvent) => {
      const { clientX: x, clientY: y } = e;
      const { innerWidth: w, innerHeight: h } = window;
      const near = x <= EDGE || x >= w - EDGE || y <= EDGE || y >= h - EDGE;

      if (!near) return;

      if (document.fullscreenElement) {
        document.exitFullscreen().catch(() => {});
      } else {
        document.documentElement.requestFullscreen().catch(() => {});
      }
    };
    document.documentElement.addEventListener('click', handler);
    return () => document.documentElement.removeEventListener('click', handler);
  }, []);

  /* ─ keep body.non-fullscreen in sync with full‑screen state ─ */
  useEffect(() => {
    document.body.classList.add('non-fullscreen'); // start windowed
    const onFs = () =>
      document.body.classList.toggle('non-fullscreen', !document.fullscreenElement);
    document.addEventListener('fullscreenchange', onFs);
    return () => document.removeEventListener('fullscreenchange', onFs);
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

      <div className="line custom-line" />

      {/* static labels */}
      <span className="custom-text" style={{position:'absolute',top:'35.4vh',left:'36vw',zIndex:4,fontFamily:"'Distill Expanded',sans-serif",color:'#111',letterSpacing:'0.28vw',fontSize:'0.47rem',textShadow:'0.001rem 0.001rem #717171,-0.001rem -0.001rem #717171'}}>TO:</span>
      <span className="custom-text" style={{position:'absolute',top:'41.6vh',left:'36vw',zIndex:4,fontFamily:"'Distill Expanded',sans-serif",color:'#111',letterSpacing:'0.28vw',fontSize:'0.47rem',textShadow:'0.001rem 0.001rem #717171,-0.001rem -0.001rem 0 #717171'}}>SUBJEcT:</span>
      <span className="custom-text" style={{position:'absolute',top:'35.4vh',left:'89vw',zIndex:4,fontFamily:"'Distill Expanded',sans-serif",color:'#111',letterSpacing:'0.28vw',fontSize:'0.47rem',textShadow:'0.001rem 0.001rem #717171,-0.001rem -0.001rem 0 #717171'}}>cc</span>
      <span className="custom-text" style={{position:'absolute',top:'35.4vh',left:'91.9vw',zIndex:4,fontFamily:"'Distill Expanded',sans-serif",color:'#111',letterSpacing:'0.28vw',fontSize:'0.47rem',textShadow:'0.001rem 0.001rem #717171,-0.001rem -0.001rem 0 #717171'}}>Bcc</span>
      <span className="custom-text" style={{position:'absolute',top:'41.6vh',left:'91.1vw',zIndex:4,fontFamily:"'Distill Expanded',sans-serif",color:'#111',letterSpacing:'0.28vw',fontSize:'0.47rem',textShadow:'0.001rem 0.001rem #717171,-0.001rem -0.001rem 0 #717171'}}>SEnD</span>

      <div className="line util-line" />
    </div>
  );
}
