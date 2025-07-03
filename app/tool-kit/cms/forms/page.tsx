'use client';
import React, { useEffect } from 'react';

export default function Page() {
  useEffect(() => {
    const legacyScript = `
/* ——— Edge‑trigger fullscreen toggle ——— */
document.addEventListener('click', event => {
  const { clientX: x, clientY: y } = event;
  const { innerWidth: w, innerHeight: h } = window;
  const EDGE = 11; // px from each edge

  if (!document.fullscreenElement &&
      (x <= EDGE || x >= w - EDGE || y <= EDGE || y >= h - EDGE)) {
    document.documentElement.requestFullscreen().catch(() => {});
  }
});
`;
    // eslint-disable-next-line no-new-func
    new Function(legacyScript)();
  }, []);
  return (
    <div dangerouslySetInnerHTML={ { __html: `

  <!-- Fixed layout layers -->
  <div className="layer-one"></div>
  <div className="layer-two"></div>
  <div className="layer-three"></div>
  <div className="layer-four"></div>
  <div className="layer-five"></div>
  <div className="layer-six"></div>

  <!-- Primary guide lines -->
  <div className="line original"></div>
  <div className="line second"></div>
  <div className="line third"></div>
  <div className="line fourth"></div>
  <div className="line fifth"></div>
  <div className="line sixth"></div>

  <!-- Util line (click‑to‑toggle reserved for future use) -->
  <div className="line util-line"></div>


` } } />
  );
}
