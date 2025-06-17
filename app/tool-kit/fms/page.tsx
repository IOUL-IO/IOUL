
    import Head from 'next/head';

    export default function Page() {
      return (
        <>
          <Head>
            <title>IOUL</title>
            <link rel="icon" href="/favicon.png" type="image/png" />
            <link rel="stylesheet" href="/tool-kit/fms/styles.css" />
          </Head>
          <div dangerouslySetInnerHTML={ { __html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>IOUL</title>
  <link rel="icon" href="favicon.png" type="image/png" />
  <link rel="stylesheet" href="styles.css" />
</head>
<body class="non-fullscreen">

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

    <span class="custom-text" style="position:absolute; top:35.4vh; left:6.41vw;">VEnTURE</span>
    <span class="custom-text" style="position:absolute; top:41.6vh; left:6.41vw;">AccOUnT</span>
    <span class="custom-text" style="position:absolute; top:53vh; left:6.41vw;">cHARgE</span>
    <span class="custom-text" style="position:absolute; top:59.2vh; left:6.41vw;">LEDgER</span>

    <span class="custom-text right-flow" style="position:absolute; top:35.4vh; left:28.41vw;">0</span>
    <span class="custom-text right-flow" style="position:absolute; top:41.6vh; left:28.41vw;">0</span>
    <span class="custom-text right-flow" style="position:absolute; top:53vh; left:28.41vw;">0</span>
    <span class="custom-text right-flow" style="position:absolute; top:59.2vh; left:28.41vw;">0</span>

    <!-- Divider line that used to slide with the containers -->
    <div class="custom-line"></div>

<!-- Column 1 (36 vw) -->
<span class="custom-text content-text" style="position:absolute; top:35.4vh; left:36vw;">1ncOME:</span>
<span class="custom-text content-text" style="position:absolute; top:41.6vh; left:36vw;">cL1EnT:</span>

<span class="custom-text content-text right-flow" style="position:absolute; top:35.4vh; left:49.7vw;">0</span>
<span class="custom-text content-text right-flow" style="position:absolute; top:41.6vh; left:49.7vw;">0</span>

<span class="custom-text content-text" style="position:absolute; top:35.4vh; left:58.7vw;">PER1OD:</span>
<span class="custom-text content-text" style="position:absolute; top:41.6vh; left:58.7vw;">F1LTER:</span>

<!-- Column 4 (71 vw) – right-flow counters -->
<span class="custom-text content-text right-flow" style="position:absolute; top:35.4vh; left:71vw;">0</span>
<span class="custom-text content-text right-flow" style="position:absolute; top:41.6vh; left:71vw;">0</span>

<!-- Column 5 (79 vw) -->
<span class="custom-text content-text" style="position:absolute; top:35.4vh; left:79vw;">D1SPUTE:</span>
<span class="custom-text content-text" style="position:absolute; top:41.6vh; left:79vw;">OngO1ng:</span>

<span class="custom-text content-text" style="position:absolute; top:53vh;   left:79vw;">ARR</span>
<span class="custom-text content-text" style="position:absolute; top:59.2vh; left:79vw;">cLV</span>
<span class="custom-text content-text" style="position:absolute; top:65.4vh; left:79vw;">ARU</span>
<span class="custom-text content-text" style="position:absolute; top:71.6vh; left:79vw;">cP1</span>

<!-- Column 6 (93.4 vw) – right-flow counters -->
<span class="custom-text content-text right-flow" style="position:absolute; top:35.4vh; left:93.4vw;">0</span>
<span class="custom-text content-text right-flow" style="position:absolute; top:41.6vh; left:93.4vw;">0</span>
    <span class="custom-text content-text right-flow" style="position:absolute; top:53vh; left:93.4vw;">0</span>
    <span class="custom-text content-text right-flow" style="position:absolute; top:59.2vh; left:93.4vw;">0</span>
<span class="custom-text content-text right-flow" style="position:absolute; top:65.4vh; left:93.4vw;">0</span>
<span class="custom-text content-text right-flow" style="position:absolute; top:71.6vh; left:93.4vw;">0</span>

<!-- Horizontal guide lines -->
<div class="content-line content-line-one"
     style="position:absolute; top:47.8vh; left:36vw; width:36vw; height:1px; background:rgba(230,230,230,0.28);"></div>

<div class="content-line content-line-two"
     style="position:absolute; top:47.8vh; left:79vw; width:14.8vw; height:1px; background:rgba(230,230,230,0.28);"></div>

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
</body>
</html>
` } } />
        </>
      );
    }
