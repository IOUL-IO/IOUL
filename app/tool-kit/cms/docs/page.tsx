"use client";
import './styles.css';


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
        document.documentElement.requestFullscreen();
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

        <span
          className="custom-text"
          style={{ position: 'absolute', top: '35.4vh', left: '6.41vw' }}
        >
          FOnT:
        </span>
        <span
          className="custom-text"
          style={{ position: 'absolute', top: '41.6vh', left: '6.41vw' }}
        >
          LOOK:
        </span>

        <span
          className="custom-text"
          style={{ position: 'absolute', top: '53vh', left: '6.41vw' }}
        >
          Lg: 0
        </span>
        <span
          className="custom-text"
          style={{ position: 'absolute', top: '53vh', left: '10.71vw' }}
        >
          Pg: 0
        </span>

        <span
          className="custom-text"
          style={{ position: 'absolute', top: '59.2vh', left: '6.41vw' }}
        >
          DP: 0
        </span>
        <span
          className="custom-text"
          style={{ position: 'absolute', top: '59.2vh', left: '10.71vw' }}
        >
          DT: 0
        </span>

        <span
          className="custom-text right-flow"
          style={{ position: 'absolute', top: '35.4vh', left: '28.41vw' }}
        >
          0
        </span>
        <span
          className="custom-text right-flow"
          style={{ position: 'absolute', top: '41.6vh', left: '28.41vw' }}
        >
          0
        </span>
        <span
          className="custom-text right-flow icon-align"
          style={{ position: 'absolute', top: '53vh', left: '28.41vw' }}
        >
          <svg
            width="0.5rem"
            height="0.5rem"
            viewBox="0 0 8 8"
            shapeRendering="crispEdges"
            style={{ display: 'block' }}
          >
            <rect x="0" y="0" width="8" height="1" fill="#111" />
            <rect x="0" y="7" width="7" height="1" fill="#111" />
          </svg>
        </span>
        <span
          className="custom-text right-flow icon-bullet"
          style={{ position: 'absolute', top: '59.2vh', left: '28.41vw' }}
        >
          <svg
            width="0.5rem"
            height="0.5rem"
            viewBox="0 0 8 8"
            shapeRendering="crispEdges"
            style={{ display: 'block' }}
          >
            <rect x="0" y="0" width="2.5" height="1" fill="#111" />
            <rect x="4" y="0" width="4" height="1" fill="#111" />
            <rect x="0" y="6" width="2.5" height="1" fill="#111" />
            <rect x="4" y="6" width="4" height="1" fill="#111" />
          </svg>
        </span>

        {/* Divider line that used to slide with the containers */}
        <div className="custom-line" />
      </div>
    </div>
  );
}