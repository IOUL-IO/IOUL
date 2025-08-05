'use client';

import './styles.css';
import React, { useEffect } from 'react';

export default function Page() {
  /* Edge‑trigger fullscreen toggle (unchanged) */
  useEffect(() => {
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

  /* Generate calendar cells: 1‑31 numbered, rest blank */
  const cells = Array.from({ length: 42 }, (_, i) =>
    i < 31 ? (i + 1).toString() : ''
  );

  return (
    <div>
      {/* Fixed masking layers (unchanged) */}
      <div className="layer-one" />
      <div className="layer-two" />
      <div className="layer-three" />
      <div className="layer-four" />
      <div className="layer-five" />
      <div className="layer-six" />

      {/* Primary guide lines (1‑4) */}
      <div className="line original" />
      <div className="line second" />
      <div className="line third" />
      <div className="line fourth" />

      {/* Util guide line */}
      <div className="line util-line" />

      {/* -------- Scrollable Calendar Grid -------- */}
      <main className="calendar-scroll">
        <section className="calendar-grid">
          {cells.map((label, i) => (
            <div key={i} className="cell">
              {label}
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}