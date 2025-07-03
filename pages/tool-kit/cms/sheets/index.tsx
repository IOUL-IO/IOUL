import Head from 'next/head';
export default function Page() {
  return (
    <>
      <Head>
        <title>IOUL</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href="/tool-kit/cms/sheets/styles.css" />
      </Head>
      <main dangerouslySetInnerHTML={{ __html: `
<!-- Fixed white mask layers -->
<div class="layer-one"></div>
<div class="layer-two"></div>
<div class="layer-three"></div>
<div class="layer-four"></div>
<div class="layer-five"></div>
<div class="layer-six"></div>
<!-- All visible UI sits inside page‑content -->
<div class="page-content">
<!-- Primary guideline lines -->
<div class="line original"></div>
<div class="line second"></div>
<div class="line third"></div>
<div class="line fourth"></div>
<div class="line fifth"></div>
<div class="line sixth"></div>
<div class="line util-line"></div>
<span class="custom-text" style="position:absolute; top:35.4vh; left:6.41vw;">FOnT:</span>
<span class="custom-text" style="position:absolute; top:41.6vh; left:6.41vw;">LOOK:</span>
<span class="custom-text" style="position:absolute; top:53vh; left:6.41vw;">cL: <svg height="0.5rem" shape-rendering="crispEdges" style="display:inline-block;vertical-align:middle" viewbox="0 0 8 8" width="0.5rem"><rect fill="#111" height="1" width="8" x="0" y="0"></rect><rect fill="#111" height="1" width="7" x="0" y="7"></rect></svg></span>
<span class="custom-text" style="position:absolute; top:53vh; left:10.71vw;">cc: <svg height="0.5rem" shape-rendering="crispEdges" style="display:inline-block;vertical-align:middle" viewbox="0 0 8 8" width="0.5rem"><rect fill="#111" height="1.3" width="1.3" x="0" y="0"></rect><rect fill="#111" height="1.3" width="1.3" x="2" y="0"></rect><rect fill="#111" height="1.3" width="1.3" x="4" y="0"></rect><rect fill="#111" height="1.3" width="1.3" x="6" y="0"></rect><rect fill="#111" height="1.3" width="1.3" x="0" y="7"></rect><rect fill="#111" height="1.3" width="1.3" x="2" y="7"></rect><rect fill="#111" height="1.3" width="1.3" x="4" y="7"></rect><rect fill="#111" height="1.3" width="1.3" x="6" y="7"></rect></svg></span>
<span class="custom-text" style="position:absolute; top:59.2vh; left:6.41vw;">cJ: <svg height="0.5rem" shape-rendering="crispEdges" style="display:inline-block;vertical-align:middle" viewbox="0 0 8 8" width="0.5rem"><rect fill="#111" height="1" width="8" x="0" y="0"></rect><rect fill="#111" height="1" width="8" x="0" y="7"></rect><rect fill="#111" height="2" width="1" x="0" y="0"></rect><rect fill="#111" height="2" width="1" x="0" y="6"></rect><rect fill="#111" height="2" width="1" x="7" y="0"></rect><rect fill="#111" height="2" width="1" x="7" y="6"></rect></svg></span>
<span class="custom-text" style="position:absolute; top:59.2vh; left:10.71vw;">cT: <svg height="0.5rem" shape-rendering="crispEdges" style="display:inline-block;vertical-align:middle" viewbox="0 0 8 8" width="0.5rem"><rect fill="#111" height="1" width="8" x="0" y="0"></rect><rect fill="#111" height="1" width="8" x="0" y="7"></rect></svg></span>
<span class="custom-text right-flow" style="position:absolute; top:35.4vh; left:28.41vw;">0</span>
<span class="custom-text right-flow" style="position:absolute; top:41.6vh; left:28.41vw;">0</span>
<span class="custom-text right-flow icon-align" style="position:absolute; top: 53vh; left:28.41vw;">0</span>
<span class="custom-text right-flow icon-bullet" style="position:absolute; top:59.2vh; left:28.41vw;">0</span>
<!-- Divider line that used to slide with the containers -->
<div class="custom-line"></div>
<!-- Grid overlay (10 × 20) -->
<div class="grid-overlay"></div>
</div>
<!-- Full‑screen trigger (click near any screen edge) -->
<script>
const EDGE_MARGIN = 11; // px from any edge
document.addEventListener('click', ({clientX:x, clientY:y}) => {
  const {innerWidth:w, innerHeight:h} = window;
  const nearEdge = (x <= EDGE_MARGIN || x >= w - EDGE_MARGIN ||
                    y <= EDGE_MARGIN || y >= h - EDGE_MARGIN);
  if (nearEdge && !document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  }
});
</script>
` }} />
    </>
  );
}
