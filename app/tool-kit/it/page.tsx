import Head from 'next/head';
"use client";
import React, { useEffect } from 'react';

export default function Page() {
  useEffect(() => {
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
    return (<Head>
  <link rel="stylesheet" href="/IOUL-login/tool-kit/it/styles.css" />
</Head>) => document.removeEventListener('click', handler);
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

        {/* Labels */}
        <span className="custom-text" style={{ position: 'absolute', top: '35.4vh', left: '6.41vw' }}>1DEnT1TY LOg</span>
        <span className="custom-text" style={{ position: 'absolute', top: '41.6vh', left: '6.41vw' }}>COnTROL PAD</span>
        <span className="custom-text" style={{ position: 'absolute', top: '53vh', left: '6.41vw' }}>DATA DEPOT</span>
        <span className="custom-text" style={{ position: 'absolute', top: '59.2vh', left: '6.41vw' }}>DEV1cE LOg</span>

        {/* Counters */}
        <span className="custom-text right-flow" style={{ position: 'absolute', top: '35.4vh', left: '28.41vw' }}>0</span>
        <span className="custom-text right-flow" style={{ position: 'absolute', top: '41.6vh', left: '28.41vw' }}>0</span>
        <span className="custom-text right-flow" style={{ position: 'absolute', top: '53vh', left: '28.41vw' }}>0</span>
        <span className="custom-text right-flow" style={{ position: 'absolute', top: '59.2vh', left: '28.41vw' }}>0</span>

        {/* Divider */}
        <div className="custom-line" />

        {/* Column 1 */}
        <span className="custom-text content-text" style={{ position: 'absolute', top: '35.4vh', left: '36vw' }}>LOOK UP:</span>
        <span className="custom-text content-text" style={{ position: 'absolute', top: '41.6vh', left: '36vw' }}>AcT1VE:</span>
        <span className="custom-text content-text right-flow" style={{ position: 'absolute', top: '35.4vh', left: '49.7vw' }}>0</span>
        <span className="custom-text content-text right-flow" style={{ position: 'absolute', top: '41.6vh', left: '49.7vw' }}>0</span>

        {/* Column 2 */}
        <span className="custom-text content-text" style={{ position: 'absolute', top: '35.4vh', left: '58.7vw' }}>PER1OD:</span>
        <span className="custom-text content-text" style={{ position: 'absolute', top: '41.6vh', left: '58.7vw' }}>F1LTER:</span>

        {/* Column 4 Counters */}
        <span className="custom-text content-text right-flow" style={{ position: 'absolute', top: '35.4vh', left: '71vw' }}>0</span>
        <span className="custom-text content-text right-flow" style={{ position: 'absolute', top: '41.6vh', left: '71vw' }}>0</span>

        {/* Column 5 */}
        <span className="custom-text content-text" style={{ position: 'absolute', top: '35.4vh', left: '79vw' }}>ALERTS</span>
        <span className="custom-text content-text" style={{ position: 'absolute', top: '41.6vh', left: '79vw' }}>REPORT</span>
        <span className="custom-text content-text" style={{ position: 'absolute', top: '53vh', left: '79vw' }}>HD:</span>
        <span className="custom-text content-text" style={{ position: 'absolute', top: '59.2vh', left: '79vw' }}>HD:</span>
        <span className="custom-text content-text" style={{ position: 'absolute', top: '65.4vh', left: '79vw' }}>HD:</span>
        <span className="custom-text content-text" style={{ position: 'absolute', top: '71.6vh', left: '79vw' }}>HD:</span>

        {/* Column 6 Counters */}
        <span className="custom-text content-text right-flow" style={{ position: 'absolute', top: '35.4vh', left: '93.4vw' }}>0</span>
        <span className="custom-text content-text right-flow" style={{ position: 'absolute', top: '41.6vh', left: '93.4vw' }}>0</span>
        <span className="custom-text content-text right-flow" style={{ position: 'absolute', top: '53vh', left: '93.4vw' }}>0</span>
        <span className="custom-text content-text right-flow" style={{ position: 'absolute', top: '59.2vh', left: '93.4vw' }}>0</span>
        <span className="custom-text content-text right-flow" style={{ position: 'absolute', top: '65.4vh', left: '93.4vw' }}>0</span>
        <span className="custom-text content-text right-flow" style={{ position: 'absolute', top: '71.6vh', left: '93.4vw' }}>0</span>

        {/* Horizontal guide lines */}
        <div className="content-line content-line-one" style={{ position: 'absolute', top: '47.8vh', left: '36vw', width: '36vw', height: '1px', background: 'rgba(230,230,230,0.28)' }} />
        <div className="content-line content-line-two" style={{ position: 'absolute', top: '47.8vh', left: '79vw', width: '14.8vw', height: '1px', background: 'rgba(230,230,230,0.28)' }} />
      </div>
    </div>
  );
}