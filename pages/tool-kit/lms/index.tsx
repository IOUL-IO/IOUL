import Head from 'next/head';
export default function Page() {
  return (
    <>
      <Head>
        <title>IOUL</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href="/tool-kit/lms/styles.css" />
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
<span class="custom-text" style="position:absolute; top:35.4vh; left:6.41vw;">1n1T1ATE LOg</span>
<span class="custom-text" style="position:absolute; top:41.6vh; left:6.41vw;">OUTL1nE LOg</span>
<span class="custom-text" style="position:absolute; top:53vh; left:6.41vw;">cLUB LOg</span>
<span class="custom-text" style="position:absolute; top:59.2vh; left:6.41vw;">JUnK LOg</span>
<span class="custom-text right-flow" style="position:absolute; top:35.4vh; left:28.41vw;">0</span>
<span class="custom-text right-flow" style="position:absolute; top:41.6vh; left:28.41vw;">0</span>
<span class="custom-text right-flow" style="position:absolute; top:53vh; left:28.41vw;">0</span>
<span class="custom-text right-flow" style="position:absolute; top:59.2vh; left:28.41vw;">0</span>
<!-- Divider line that used to slide with the containers -->
<div class="custom-line"></div>
<!-- Column 1 (36 vw) -->
<span class="custom-text content-text" style="position:absolute; top:35.4vh; left:36vw;">OPEn FOLDER:</span>
<span class="custom-text content-text" style="position:absolute; top:41.6vh; left:36vw;">LOOK UP F1LE:</span>
<!-- Column 4 (71 vw) – right-flow counters -->
<span class="custom-text content-text right-flow" style="position:absolute; top:35.4vh; left:71vw;">0</span>
<span class="custom-text content-text right-flow" style="position:absolute; top:41.6vh; left:71vw;">0</span>
<!-- Column 5 (79 vw) -->
<span class="custom-text content-text" style="position:absolute; top:35.4vh; left:79vw;">1nQU1RY:</span>
<span class="custom-text content-text" style="position:absolute; top:41.6vh; left:79vw;">REPORT:</span>
<span class="custom-text content-text" style="position:absolute; top:53vh;   left:79vw;">cLASS</span>
<span class="custom-text content-text" style="position:absolute; top:59.2vh; left:79vw;">1-QU1Z</span>
<span class="custom-text content-text" style="position:absolute; top:65.4vh; left:79vw;">TESTS</span>
<span class="custom-text content-text" style="position:absolute; top:71.6vh; left:79vw;">ESSAY</span>
<!-- Column 6 (93.4 vw) – right-flow counters -->
<span class="custom-text content-text right-flow" style="position:absolute; top:35.4vh; left:93.4vw;">0</span>
<span class="custom-text content-text right-flow" style="position:absolute; top:41.6vh; left:93.4vw;">0</span>
<span class="custom-text content-text right-flow" style="position:absolute; top:53vh; left:93.4vw;">0</span>
<span class="custom-text content-text right-flow" style="position:absolute; top:59.2vh; left:93.4vw;">0</span>
<span class="custom-text content-text right-flow" style="position:absolute; top:65.4vh; left:93.4vw;">0</span>
<span class="custom-text content-text right-flow" style="position:absolute; top:71.6vh; left:93.4vw;">0</span>
<!-- Horizontal guide lines -->
<div class="content-line content-line-one" style="position:absolute; top:47.8vh; left:36vw; width:36vw; height:1px; background:rgba(230,230,230,0.28);"></div>
<div class="content-line content-line-two" style="position:absolute; top:47.8vh; left:79vw; width:14.8vw; height:1px; background:rgba(230,230,230,0.28);"></div>
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
