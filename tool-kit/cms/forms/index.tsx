import Head from 'next/head';
import styles from './styles.module.css';

export default function IoulIoToolKitCmsForms() {
  return (
    <>
      <Head dangerouslySetInnerHTML={ { __html: `<meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>IOUL</title>
  <link rel="icon" href="favicon.png" type="image/png" />
  <link rel="stylesheet" href="styles.css" />` } } />
      <main className={{styles.container}}>
        <div dangerouslySetInnerHTML={{ __html: `<!-- Fixed layout layers -->
  <div class="layer-one"></div>
  <div class="layer-two"></div>
  <div class="layer-three"></div>
  <div class="layer-four"></div>
  <div class="layer-five"></div>
  <div class="layer-six"></div>

  <!-- Primary guide lines -->
  <div class="line original"></div>
  <div class="line second"></div>
  <div class="line third"></div>
  <div class="line fourth"></div>
  <div class="line fifth"></div>
  <div class="line sixth"></div>

  <!-- Util line (click‑to‑toggle reserved for future use) -->
  <div class="line util-line"></div>

<script>
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
</script>` }} />
      </main>
    </>
  );
}
