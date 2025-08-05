'use client';

import React, { useCallback } from 'react';
import './styles.css';

export default function CalendarPage() {
  /** Toggles the browser’s native fullscreen mode */
  const toggleFullScreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  }, []);

  return (
    <div className="calendar-container">
      {/* util‑line layers 1‑6 */}
      <header className="util-line">
        {[1, 2, 3, 4, 5, 6].map((n) => (
          <div key={n} className={\`layer layer-\${n}\`}>
            Layer {n}
          </div>
        ))}
        <button
          className="fullscreen-toggle"
          onClick={toggleFullScreen}
          aria-label="Toggle Fullscreen"
        >
          ⛶
        </button>
      </header>

      {/* calendar grid: rows 1‑6 × 7 days */}
      <main className="calendar-scroll">
        <section className="calendar-grid">
          {Array.from({ length: 42 }).map((_, i) => (
            <div key={i} className="cell" />
          ))}
        </section>
      </main>
    </div>
  );
}