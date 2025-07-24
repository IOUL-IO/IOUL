import Head from 'next/head';
"use client";
import React, { useEffect } from "react";

export default function Page() {
  useEffect(() => {
    // Full-screen click-to-fullscreen logic
    const EDGE = 11;
    const handler = ({ clientX: x, clientY: y }: MouseEvent) => {
      const { innerWidth: w, innerHeight: h } = window;
      if (
        (x <= EDGE || x >= w - EDGE || y <= EDGE || y >= h - EDGE) &&
        !document.fullscreenElement
      ) {
        document.documentElement.requestFullscreen();
      }
    };
    document.addEventListener("click", handler);

    // Cleanup
    return (<Head>
  <link rel="stylesheet" href="/IOUL-login/tool-kit/lms/styles.css" />
</Head>) => {
      document.removeEventListener("click", handler);
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

        {/* Top labels and counters */}
        <span className="custom-text" style={{ position: 'absolute', top: '35.4vh', left: '6.41vw' }}>1n1T1ATE LOg</span>
        <span className="custom-text" style={{ position: 'absolute', top: '41.6vh', left: '6.41vw' }}>OUTL1nE LOg</span>
        <span className="custom-text" style={{ position: 'absolute', top: '53vh',   left: '6.41vw' }}>cLUB LOg</span>
        <span className="custom-text" style={{ position: 'absolute', top: '59.2vh', left: '6.41vw' }}>JUnK LOg</span>

        <span className="custom-text right-flow" style={{ position: 'absolute', top: '35.4vh', left: '28.41vw' }}>0</span>
        <span className="custom-text right-flow" style={{ position: 'absolute', top: '41.6vh', left: '28.41vw' }}>0</span>
        <span className="custom-text right-flow" style={{ position: 'absolute', top: '53vh',   left: '28.41vw' }}>0</span>
        <span className="custom-text right-flow" style={{ position: 'absolute', top: '59.2vh', left: '28.41vw' }}>0</span>

        {/* Divider line */}
        <div className="custom-line" />

        {/* Column 1: actions */}
        <span className="custom-text content-text" style={{ position: 'absolute', top: '35.4vh', left: '36vw' }}>OPEn FOLDER:</span>
        <span className="custom-text content-text" style={{ position: 'absolute', top: '41.6vh', left: '36vw' }}>LOOK UP F1LE:</span>

        {/* Column 4: counters */}
        <span className="custom-text content-text right-flow" style={{ position: 'absolute', top: '35.4vh', left: '71vw' }}>0</span>
        <span className="custom-text content-text right-flow" style={{ position: 'absolute', top: '41.6vh', left: '71vw' }}>0</span>

        {/* Column 5: labels */}
        <span className="custom-text content-text" style={{ position: 'absolute', top: '35.4vh', left: '79vw' }}>1nQU1RY:</span>
        <span className="custom-text content-text" style={{ position: 'absolute', top: '41.6vh', left: '79vw' }}>REPORT:</span>
        <span className="custom-text content-text" style={{ position: 'absolute', top: '53vh',   left: '79vw' }}>cLASS</span>
        <span className="custom-text content-text" style={{ position: 'absolute', top: '59.2vh', left: '79vw' }}>1-QU1Z</span>
        <span className="custom-text content-text" style={{ position: 'absolute', top: '65.4vh', left: '79vw' }}>TESTS</span>
        <span className="custom-text content-text" style={{ position: 'absolute', top: '71.6vh', left: '79vw' }}>ESSAY</span>

        {/* Column 6: counters */}
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