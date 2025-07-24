import './styles.css';

"use client";
import React, { useEffect } from 'react';

export default function Page() {
  useEffect(() => {
    // Full-screen toggle on edge click
    const EDGE_MARGIN = 11; // px from any edge
    const handler = ({ clientX: x, clientY: y }: MouseEvent) => {
      const { innerWidth: w, innerHeight: h } = window;
      const nearEdge =
        x <= EDGE_MARGIN ||
        x >= w - EDGE_MARGIN ||
        y <= EDGE_MARGIN ||
        y >= h - EDGE_MARGIN;
      if (nearEdge && !document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(() => {});
      }
    };

    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, []);

  return (
    <div>
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

        {/* Upper-left labels */}
        <span className="custom-text" style={{ position: 'absolute', top: '35.4vh', left: '6.41vw' }}>
          VEnTURE
        </span>
        <span className="custom-text" style={{ position: 'absolute', top: '41.6vh', left: '6.41vw' }}>
          AccOUnT
        </span>
        <span className="custom-text" style={{ position: 'absolute', top: '53vh', left: '6.41vw' }}>
          cHARgE
        </span>
        <span className="custom-text" style={{ position: 'absolute', top: '59.2vh', left: '6.41vw' }}>
          LEDgER
        </span>

        {/* Upper-right counters */}
        <span className="custom-text right-flow" style={{ position: 'absolute', top: '35.4vh', left: '28.41vw' }}>
          0
        </span>
        <span className="custom-text right-flow" style={{ position: 'absolute', top: '41.6vh', left: '28.41vw' }}>
          0
        </span>
        <span className="custom-text right-flow" style={{ position: 'absolute', top: '53vh', left: '28.41vw' }}>
          0
        </span>
        <span className="custom-text right-flow" style={{ position: 'absolute', top: '59.2vh', left: '28.41vw' }}>
          0
        </span>

        {/* Divider line that used to slide with the containers */}
        <div className="custom-line" />

        {/* Column 1 (36 vw) labels and counters */}
        <span className="custom-text content-text" style={{ position: 'absolute', top: '35.4vh', left: '36vw' }}>
          1ncOME:
        </span>
        <span className="custom-text content-text" style={{ position: 'absolute', top: '41.6vh', left: '36vw' }}>
          cL1EnT:
        </span>
        <span className="custom-text content-text right-flow" style={{ position: 'absolute', top: '35.4vh', left: '49.7vw' }}>
          0
        </span>
        <span className="custom-text content-text right-flow" style={{ position: 'absolute', top: '41.6vh', left: '49.7vw' }}>
          0
        </span>

        {/* Column 2 (58.7 vw) labels */}
        <span className="custom-text content-text" style={{ position: 'absolute', top: '35.4vh', left: '58.7vw' }}>
          PER1OD:
        </span>
        <span className="custom-text content-text" style={{ position: 'absolute', top: '41.6vh', left: '58.7vw' }}>
          F1LTER:
        </span>

        {/* Column 4 (71 vw) – right-flow counters */}
        <span className="custom-text content-text right-flow" style={{ position: 'absolute', top: '35.4vh', left: '71vw' }}>
          0
        </span>
        <span className="custom-text content-text right-flow" style={{ position: 'absolute', top: '41.6vh', left: '71vw' }}>
          0
        </span>

        {/* Column 5 (79 vw) labels */}
        <span className="custom-text content-text" style={{ position: 'absolute', top: '35.4vh', left: '79vw' }}>
          D1SPUTE:
        </span>
        <span className="custom-text content-text" style={{ position: 'absolute', top: '41.6vh', left: '79vw' }}>
          OngO1ng:
        </span>
        <span className="custom-text content-text" style={{ position: 'absolute', top: '53vh', left: '79vw' }}>
          ARR
        </span>
        <span className="custom-text content-text" style={{ position: 'absolute', top: '59.2vh', left: '79vw' }}>
          cLV
        </span>
        <span className="custom-text content-text" style={{ position: 'absolute', top: '65.4vh', left: '79vw' }}>
          ARU
        </span>
        <span className="custom-text content-text" style={{ position: 'absolute', top: '71.6vh', left: '79vw' }}>
          cP1
        </span>

        {/* Column 6 (93.4 vw) – right-flow counters */}
        <span className="custom-text content-text right-flow" style={{ position: 'absolute', top: '35.4vh', left: '93.4vw' }}>
          0
        </span>
        <span className="custom-text content-text right-flow" style={{ position: 'absolute', top: '41.6vh', left: '93.4vw' }}>
          0
        </span>
        <span className="custom-text content-text right-flow" style={{ position: 'absolute', top: '53vh', left: '93.4vw' }}>
          0
        </span>
        <span className="custom-text content-text right-flow" style={{ position: 'absolute', top: '59.2vh', left: '93.4vw' }}>
          0
        </span>
        <span className="custom-text content-text right-flow" style={{ position: 'absolute', top: '65.4vh', left: '93.4vw' }}>
          0
        </span>
        <span className="custom-text content-text right-flow" style={{ position: 'absolute', top: '71.6vh', left: '93.4vw' }}>
          0
        </span>

        {/* Horizontal guide lines */}
        <div
          className="content-line content-line-one"
          style={{ position: 'absolute', top: '47.8vh', left: '36vw', width: '36vw', height: '1px', background: 'rgba(230,230,230,0.28)' }}
        />
        <div
          className="content-line content-line-two"
          style={{ position: 'absolute', top: '47.8vh', left: '79vw', width: '14.8vw', height: '1px', background: 'rgba(230,230,230,0.28)' }}
        />
      </div>
    </div>
  );
}
