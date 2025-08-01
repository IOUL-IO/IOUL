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

      <div className="line util-line" />
    </div>
  );
}
