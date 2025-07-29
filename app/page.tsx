"use client";
import './styles.css';


import React, { useEffect } from 'react';

export default function Page() {
  useEffect(() => {
    // ==== Edge-triggered full‑screen toggle (revised 2025‑07‑29) ====
const EDGE_MARGIN_PX = Math.max(
  16 * window.devicePixelRatio,
  0.01 * Math.min(window.innerWidth, window.innerHeight)
);

function isNearEdge(x: number, y: number) {
  const { innerWidth: w, innerHeight: h } = window;
  const m = EDGE_MARGIN_PX;
  return x <= m || x >= w - m || y <= m || y >= h - m;
}

async function toggleFullScreen() {
  try {
    if (!document.fullscreenElement) {
      const el: any = document.documentElement;
      if (el.requestFullscreen) {
        await el.requestFullscreen();
      } else if (el.webkitRequestFullscreen) {
        el.webkitRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        await document.exitFullscreen();
      } else if ((document as any).webkitExitFullscreen) {
        (document as any).webkitExitFullscreen();
      }
    }
  } catch (err) {
    console.error('Fullscreen toggle failed:', err);
  }
}

function onPointerUp(ev: PointerEvent) {
  if (isNearEdge(ev.clientX, ev.clientY)) {
    toggleFullScreen();
  }
}

function onFsChange() {
  document.body.classList.toggle('non-fullscreen', !document.fullscreenElement);
}

document.addEventListener('pointerup', onPointerUp, { passive: true });
document.addEventListener('fullscreenchange', onFsChange);
onFsChange(); // initialise state
    return () => {

    
      document.removeEventListener('pointerup', onPointerUp);
      document.removeEventListener('fullscreenchange', onFsChange);
    };
  }, []);

  return (
    <>
      {/* Fixed white mask layers */}
      <div className="layer-one" />
      <div className="layer-two" />
      <div className="layer-three" />
      <div className="layer-four" />
      <div className="layer-five" />
      <div className="layer-six" />

      {/* All visible UI sits inside page-content */}
      <div className="page-content">
        {/* Primary guideline lines */}
        <div className="line original" />
        <div className="line second" />
        <div className="line third" />
        <div className="line fourth" />
        <div className="line fifth" />
        <div className="line sixth" />
        <div className="line util-line" />

        {/* Labels */}
        <span className="custom-text" style={{ position: 'absolute', top: '35.4vh', left: '6.41vw' }}>1OUL ADD-OnS</span>
        <span className="custom-text" style={{ position: 'absolute', top: '41.6vh', left: '6.41vw' }}>UT1L ADD-OnS</span>
        <span className="custom-text" style={{ position: 'absolute', top: '53vh',   left: '6.41vw' }}>cREATE ADD-On</span>
        <span className="custom-text" style={{ position: 'absolute', top: '59.2vh', left: '6.41vw' }}>UPDATE ADD-On</span>

        {/* Counters */}
        <span className="custom-text right-flow" style={{ position: 'absolute', top: '35.4vh', left: '28.41vw' }}>0</span>
        <span className="custom-text right-flow" style={{ position: 'absolute', top: '41.6vh', left: '28.41vw' }}>0</span>
        <span className="custom-text right-flow" style={{ position: 'absolute', top: '53vh',   left: '28.41vw' }}>0</span>
        <span className="custom-text right-flow" style={{ position: 'absolute', top: '59.2vh', left: '28.41vw' }}>0</span>

        {/* Divider line */}
        <div className="custom-line" />

        {/* Column 1 (36 vw) */}
        <span className="custom-text content-text" style={{ position: 'absolute', top: '35.4vh', left: '36vw' }}>LATEST:</span>
        <span className="custom-text content-text" style={{ position: 'absolute', top: '41.6vh', left: '36vw' }}>LEAgUE:</span>

        {/* Column 2 counters */}
        <span className="custom-text content-text right-flow" style={{ position: 'absolute', top: '35.4vh', left: '49.7vw' }}>0</span>
        <span className="custom-text content-text right-flow" style={{ position: 'absolute', top: '41.6vh', left: '49.7vw' }}>0</span>

        {/* Column 3 labels */}
        <span className="custom-text content-text" style={{ position: 'absolute', top: '35.4vh', left: '58.7vw' }}>PER1OD:</span>
        <span className="custom-text content-text" style={{ position: 'absolute', top: '41.6vh', left: '58.7vw' }}>F1LTER:</span>

        {/* Column 4 counters */}
        <span className="custom-text content-text right-flow" style={{ position: 'absolute', top: '35.4vh', left: '71vw' }}>0</span>
        <span className="custom-text content-text right-flow" style={{ position: 'absolute', top: '41.6vh', left: '71vw' }}>0</span>

        {/* Column 5 labels */}
        <span className="custom-text content-text" style={{ position: 'absolute', top: '35.4vh', left: '79vw' }}>cATALOg:</span>
        <span className="custom-text content-text" style={{ position: 'absolute', top: '41.6vh', left: '79vw' }}>LOOK UP:</span>
        <span className="custom-text content-text" style={{ position: 'absolute', top: '53vh',   left: '79vw' }}>AO:</span>
        <span className="custom-text content-text" style={{ position: 'absolute', top: '59.2vh', left: '79vw' }}>AO:</span>
        <span className="custom-text content-text" style={{ position: 'absolute', top: '65.4vh', left: '79vw' }}>AO:</span>
        <span className="custom-text content-text" style={{ position: 'absolute', top: '71.6vh', left: '79vw' }}>AO:</span>

        {/* Column 6 counters */}
        <span className="custom-text content-text right-flow" style={{ position: 'absolute', top: '35.4vh', left: '93.4vw' }}>0</span>
        <span className="custom-text content-text right-flow" style={{ position: 'absolute', top: '41.6vh', left: '93.4vw' }}>0</span>
        <span className="custom-text content-text right-flow" style={{ position: 'absolute', top: '53vh',   left: '93.4vw' }}>0</span>
        <span className="custom-text content-text right-flow" style={{ position: 'absolute', top: '59.2vh', left: '93.4vw' }}>0</span>
        <span className="custom-text content-text right-flow" style={{ position: 'absolute', top: '65.4vh', left: '93.4vw' }}>0</span>
        <span className="custom-text content-text right-flow" style={{ position: 'absolute', top: '71.6vh', left: '93.4vw' }}>0</span>

        {/* Horizontal guide lines */}
        <div className="content-line content-line-one" style={{ position: 'absolute', top: '47.8vh', left: '36vw', width: '36vw', height: '1px', background: 'rgba(230,230,230,0.28)' }} />
        <div className="content-line content-line-two" style={{ position: 'absolute', top: '47.8vh', left: '79vw', width: '14.8vw', height: '1px', background: 'rgba(230,230,230,0.28)' }} />
      </div>
    </>
  );
}