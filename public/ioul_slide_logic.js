// Legacy slide logic for IOUL page
document.addEventListener("DOMContentLoaded", () => {
  const FWD_MIN = 94, FWD_MAX = 100;
  const REV_MIN = 32.43, REV_MAX = 36;
  const TOP_MIN = 28.5, TOP_MAX = 84;
  const DIST = 60, GAP = 10, DUR = 600;
  const vw = () => window.innerWidth / 100;
  const vh = () => window.innerHeight / 100;
  const toVw = px => px / vw();
  const itemEls = Array.from(document.querySelectorAll(".item-text, .item-line"));
  const centerEls = Array.from(document.querySelectorAll(".center-text, .center-line"));
  [...itemEls, ...centerEls].forEach(el => {
    if (!el.dataset.baseLeftVw) {
      const leftPx = parseFloat(getComputedStyle(el).left) || 0;
      el.dataset.baseLeftVw = toVw(leftPx);
    }
  });
  let itemStage = 0, centerStage = 0, animating = false, clickCount = 0;
  function move(els, offset) {
    els.forEach(el => {
      const base = parseFloat(el.dataset.baseLeftVw);
      el.style.transition = `left ${DUR}ms ease`;
      el.style.left = (base + offset) + "vw";
    });
  }
  function toStage1() { animating=true; move(itemEls, -DIST); setTimeout(()=>{animating=false; itemStage=1;}, DUR); }
  function toStage2() { animating=true; move(itemEls, -2*DIST-GAP); move(centerEls, -DIST-GAP); setTimeout(()=>{animating=false; itemStage=2; centerStage=1;}, DUR); }
  function backToStage1() { animating=true; move(centerEls,0); move(itemEls,-DIST); setTimeout(()=>{animating=false; itemStage=1; centerStage=0;}, DUR); }
  function backToStage0() { animating=true; move(itemEls,0); setTimeout(()=>{animating=false; itemStage=0; centerStage=0;}, DUR); }
  document.addEventListener("click", e => {
    if (animating) return;
    const x = toVw(e.clientX), y = e.clientY / vh();
    const inFwd = x>=FWD_MIN && x<=FWD_MAX && y>=TOP_MIN && y<=TOP_MAX;
    const inRev = x>=REV_MIN && x<=REV_MAX && y>=TOP_MIN && y<=TOP_MAX;
    if (inFwd) {
      if (clickCount % 4 === 0) toStage1();
      else if (clickCount % 4 === 1) toStage2();
      else if (clickCount % 4 === 2) backToStage1();
      else if (clickCount % 4 === 3) backToStage0();
      clickCount++;
      e.stopPropagation();
    } else if (inRev) {
      if (centerStage===1) backToStage1();
      else if (itemStage===1 && centerStage===0) backToStage0();
      e.stopPropagation();
    }
  }, true);
});
