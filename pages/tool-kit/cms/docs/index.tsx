
    import Head from 'next/head';
    import Script from 'next/script';
    import { useEffect } from 'react';

    export default function Page() {
      return (
        <>
          <Head>
            <title>IOUL</title>
            <meta charset="utf-8"/><meta content="width=device-width, initial-scale=1.0" name="viewport"/><link href="/tool-kit/cms/docs/favicon.png" rel="icon" type="image/png"/><link href="/tool-kit/cms/docs/styles.css" rel="stylesheet"/>
          </Head>
          <div dangerouslySetInnerHTML={ { __html: `
 Fixed white mask layers 
<div class="layer-one"></div>
<div class="layer-two"></div>
<div class="layer-three"></div>
<div class="layer-four"></div>
<div class="layer-five"></div>
<div class="layer-six"></div>
 All visible UI sits inside page‑content 
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
<span class="custom-text" style="position:absolute; top:53vh; left:6.41vw;">Lg: 0</span>
<span class="custom-text" style="position:absolute; top:53vh; left:10.71vw;">Pg: 0</span>
<span class="custom-text" style="position:absolute; top:59.2vh; left:6.41vw;">DP: 0</span>
<span class="custom-text" style="position:absolute; top:59.2vh; left:10.71vw;">DT: 0</span>
<span class="custom-text right-flow" style="position:absolute; top:35.4vh; left:28.41vw;">0</span>
<span class="custom-text right-flow" style="position:absolute; top:41.6vh; left:28.41vw;">0</span>
<span class="custom-text right-flow icon-align" style="position:absolute; top: 53vh; left:28.41vw;"><svg height="0.5rem" shape-rendering="crispEdges" style="display:block" viewbox="0 0 8 8" width="0.5rem"><rect fill="#111" height="1" width="8" x="0" y="0"></rect><rect fill="#111" height="1" width="7" x="0" y="7"></rect></svg></span>
<span class="custom-text right-flow icon-bullet" style="position:absolute; top:59.2vh; left:28.41vw;"><svg height="0.5rem" shape-rendering="crispEdges" style="display:block" viewbox="0 0 8 8" width="0.5rem"><rect fill="#111" height="1" width="2.5" x="0" y="0"></rect><rect fill="#111" height="1" width="4" x="4" y="0"></rect><rect fill="#111" height="1" width="2.5" x="0" y="6"></rect><rect fill="#111" height="1" width="4" x="4" y="6"></rect></svg></span>
<!-- Divider line that used to slide with the containers -->
<div class="custom-line"></div>
</div>
 Full‑screen trigger (click near any screen edge) 

` } } />

      <Script id="inline-script-0" strategy="afterInteractive">{`

const EDGE_MARGIN = 11; // px from any edge
document.addEventListener('click', ({clientX:x, clientY:y}) => {
  const {innerWidth:w, innerHeight:h} = window;
  const nearEdge = (x <= EDGE_MARGIN || x >= w - EDGE_MARGIN ||
                    y <= EDGE_MARGIN || y >= h - EDGE_MARGIN);
  if (nearEdge && !document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  }
});

`}</Script>
        </>
      );
    }
