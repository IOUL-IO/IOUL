'use client';
import React, { useEffect } from 'react';

export default function Page() {
  useEffect(() => {
    const legacyScript = `
const EDGE_MARGIN = 11; // px from any edge
document.addEventListener('click', ({clientX:x, clientY:y}) => {
  const {innerWidth:w, innerHeight:h} = window;
  const nearEdge = (x <= EDGE_MARGIN || x >= w - EDGE_MARGIN ||
                    y <= EDGE_MARGIN || y >= h - EDGE_MARGIN);
  if (nearEdge && !document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  }
});
`;
    // eslint-disable-next-line no-new-func
    new Function(legacyScript)();
  }, []);
  return (
    <div dangerouslySetInnerHTML={ { __html: `

  <!-- Fixed white mask layers -->
  <div className="layer-one"></div>
  <div className="layer-two"></div>
  <div className="layer-three"></div>
  <div className="layer-four"></div>
  <div className="layer-five"></div>
  <div className="layer-six"></div>

  <!-- All visible UI sits inside page‑content -->
  <div className="page-content">

    <!-- Primary guideline lines -->
    <div className="line original"></div>
    <div className="line second"></div>
    <div className="line third"></div>
    <div className="line fourth"></div>
    <div className="line fifth"></div>
    <div className="line sixth"></div>

    <div className="line util-line"></div>

    <span className="custom-text" style="position:absolute; top:35.4vh; left:6.41vw;">FOnT:</span>
    <span className="custom-text" style="position:absolute; top:41.6vh; left:6.41vw;">LOOK:</span>

    <span className="custom-text" style="position:absolute; top:53vh; left:6.41vw;">cL: <svg width="0.5rem" height="0.5rem" viewBox="0 0 8 8" shape-rendering="crispEdges" style="display:inline-block;vertical-align:middle"><rect x="0" y="0" width="8" height="1" fill="#111"/><rect x="0" y="7" width="7" height="1" fill="#111"/></svg></span>
    <span className="custom-text" style="position:absolute; top:53vh; left:10.71vw;">cc: <svg width="0.5rem" height="0.5rem" viewBox="0 0 8 8" shape-rendering="crispEdges" style="display:inline-block;vertical-align:middle"><rect x="0" y="0" width="1.3" height="1.3" fill="#111"/><rect x="2" y="0" width="1.3" height="1.3" fill="#111"/><rect x="4" y="0" width="1.3" height="1.3" fill="#111"/><rect x="6" y="0" width="1.3" height="1.3" fill="#111"/><rect x="0" y="7" width="1.3" height="1.3" fill="#111"/><rect x="2" y="7" width="1.3" height="1.3" fill="#111"/><rect x="4" y="7" width="1.3" height="1.3" fill="#111"/><rect x="6" y="7" width="1.3" height="1.3" fill="#111"/></svg></span>

    <span className="custom-text" style="position:absolute; top:59.2vh; left:6.41vw;">cJ: <svg width="0.5rem" height="0.5rem" viewBox="0 0 8 8" shape-rendering="crispEdges" style="display:inline-block;vertical-align:middle"><rect x="0" y="0" width="8" height="1" fill="#111"/><rect x="0" y="7" width="8" height="1" fill="#111"/><rect x="0" y="0" width="1" height="2" fill="#111"/><rect x="0" y="6" width="1" height="2" fill="#111"/><rect x="7" y="0" width="1" height="2" fill="#111"/><rect x="7" y="6" width="1" height="2" fill="#111"/></svg></span>
    <span className="custom-text" style="position:absolute; top:59.2vh; left:10.71vw;">cT: <svg width="0.5rem" height="0.5rem" viewBox="0 0 8 8" shape-rendering="crispEdges" style="display:inline-block;vertical-align:middle"><rect x="0" y="0" width="8" height="1" fill="#111"/><rect x="0" y="7" width="8" height="1" fill="#111"/></svg></span>

    <span className="custom-text right-flow" style="position:absolute; top:35.4vh; left:28.41vw;">0</span>
    <span className="custom-text right-flow" style="position:absolute; top:41.6vh; left:28.41vw;">0</span>
    <span className="custom-text right-flow icon-align" style="position:absolute; top: 53vh; left:28.41vw;">0</span>
    <span className="custom-text right-flow icon-bullet" style="position:absolute; top:59.2vh; left:28.41vw;">0</span>

    <!-- Divider line that used to slide with the containers -->
    <div className="custom-line"></div>
    <!-- Grid overlay (10 × 20) -->
    <div className="grid-overlay"></div>


</div>

<!-- Full‑screen trigger (click near any screen edge) -->

` } } />
  );
}
