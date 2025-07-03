export const metadata = {
  title: `IOUL`,
};

export default function Page() {
  return (
    <>
      <style dangerouslySetInnerHTML={ __html: `@font-face{
  font-family:'Distill Expanded';
  src:url('font.woff2') format('woff2'),
      url('font.woff')  format('woff');
  font-weight:normal;
  font-style:normal;
}

/* —— Reset —— */
*{margin:0;padding:0;box-sizing:border-box;}

body.non-fullscreen{
  background:#ffffff;
  min-height:100vh;
  min-width:100vw;
  overflow:hidden;
}

/* —— Fixed masking layers —— */
.layer-one{
  position:fixed;top:0;left:0;width:6.37vw;height:100vh;
  background:#ffffff;z-index:100;pointer-events:none;
}
.layer-two{
  position:fixed;top:0;left:28.87vw;width:calc(36vw - 28.87vw);height:100vh;
  background:#ffffff;z-index:100;pointer-events:none;
}
.layer-three{
  position:fixed;top:0;left:94.17vw;width:calc(100vw - 94.17vw);height:100vh;
  background:#ffffff;z-index:100;pointer-events:none;
}
.layer-four{
  position:fixed;top:28.5vh;left:36vw;width:61vw;height:55.5vh;
  background:#ffffff;z-index:2;pointer-events:none;
}
.layer-five{
  position:fixed;top:0;left:36vw;width:58.7vw;height:28.4vh;
  background:#ffffff;pointer-events:none;
}
.layer-six{
  position:fixed;top:84.7vh;left:36vw;width:58.7vw;height:15.3vh;
  background:#ffffff;pointer-events:none;
}

/* —— Guide lines —— */
.line{
  position:absolute;height:1px;background:rgba(172,172,172,0.84);
}
.original{top:12.5vh;left:6.38vw;width:22.48vw;}
.second  {top:28.5vh;left:6.38vw;width:18.68vw;}
.third   {top:84vh;left:6.38vw;width:22.48vw;}
.fourth  {top:12.5vh;left:36vw;width:57.8vw;z-index:101;}
.fifth   {top:28.5vh;left:36vw;width:57.8vw;z-index:101;}
.sixth   {top:84vh;left:36vw;width:57.8vw;z-index:101;}

/* Util line kept for future interactions */
.util-line{
  position:absolute;top:28.5vh;left:26.06vw;width:2.8vw;height:1px;
  background:rgba(172,172,172,0.84);z-index:101;
}
` } />
      <main dangerouslySetInnerHTML={ __html: `
<!-- Fixed layout layers -->
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
</script>
` } />
    </>
  );
}
