
    "use client";
    import React, { useEffect } from 'react';

    export default function Page() {
      useEffect(() => {
        // TODO: any JS init from legacy project can be ported here
      }, []);
      return (
        <div dangerouslySetInnerHTML={ { __html: `

  <!-- Fixed white mask layers -->
  <div class="layer-one"></div>
  <div class="layer-two"></div>
  <div class="layer-three"></div>
  <div class="layer-four"></div>
  <style>
    /* Job page stacking context fix (July 4, 2025) */
    .layer-two, .layer-three {
      z-index: 200 !important;  /* masks above everything */
    }
    /* Put sliding text/lines below mask */
    .job-item, .job-text, .job-line,
    .freelance-text, .freelance-line,
    .job-line, .freelance-line {
      z-index: 10 !important;
    }
    /* Keep zero 0s visible even over other sliding items but still under masks */
    .zero-items-container { 
      overflow: visible !important; 
      z-index: 15 !important; 
    }
  </style>

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

    <span class="custom-text job-item" style="position:absolute; top:35.4vh; left:6.41vw;">JOB LOg</span>
    <span class="custom-text job-item" style="position:absolute; top:41.6vh; left:6.41vw;">APPL1ED</span>
    <span class="custom-text job-item" style="position:absolute; top:53vh; left:6.41vw;">QUAL1FY</span>
    <span class="custom-text job-item" style="position:absolute; top:59.2vh; left:6.41vw;">1n1T1ATE</span>

    <span class="custom-text right-flow job-item" style="position:absolute; top:35.4vh; left:28.41vw;">0</span>
    <span class="custom-text right-flow job-item" style="position:absolute; top:41.6vh; left:28.41vw;">0</span>
    <span class="custom-text right-flow job-item" style="position:absolute; top:53vh; left:28.41vw;">0</span>
    <span class="custom-text right-flow job-item" style="position:absolute; top:59.2vh; left:28.41vw;">0</span>

    <!-- Divider line that used to slide with the containers -->
    <div class="custom-line job-item"></div>


<!-- Item lines -->
<div class="job-line job-line-one" style="position:absolute; top:47.8vh; left:36vw; width:36vw;"></div>
<div class="job-line job-line-two" style="position:absolute; top:47.8vh; left:79vw; width:14.8vw;"></div>


    <!-- Center lines -->
    <div class="freelance-line freelance-line-one" style="position:absolute; top:47.8vh; left:106.0vw; width:36vw;"></div>
    <div class="freelance-line freelance-line-two" style="position:absolute; top:47.8vh; left:149.0vw; width:14.8vw;"></div>

    <!-- Center texts -->
    <span class="freelance-text" style="position:absolute; top:35.4vh; left:106.0vw;">LOOK UP:</span>
    <span class="freelance-text" style="position:absolute; top:41.6vh; left:106.0vw;">JOB LOg:</span>

    <span class="freelance-text right-flow" style="position:absolute; top:35.4vh; left:119.7vw;">0</span>
    <span class="freelance-text right-flow" style="position:absolute; top:41.6vh; left:119.7vw;">0</span>

    <span class="freelance-text" style="position:absolute; top:35.4vh; left:128.0vw;">PER1OD:</span>
    <span class="freelance-text" style="position:absolute; top:41.6vh; left:128.0vw;">F1LTER:</span>

    <span class="freelance-text right-flow" style="position:absolute; top:35.4vh; left:141.0vw;">0</span>
    <span class="freelance-text right-flow" style="position:absolute; top:41.6vh; left:141.0vw;">0</span>

    <span class="freelance-text" style="position:absolute; top:35.4vh; left:149.0vw;">RAT1ngS</span>
    <span class="freelance-text" style="position:absolute; top:41.6vh; left:149.0vw;">REcE1PT</span>

    <span class="freelance-text right-flow" style="position:absolute; top:35.4vh; left:163.4vw;">0</span>
    <span class="freelance-text right-flow" style="position:absolute; top:41.6vh; left:163.4vw;">0</span>

    <span class="freelance-text" style="position:absolute; top:53vh; left:149.0vw;">OR:</span>
    <span class="freelance-text" style="position:absolute; top:59.2vh; left:149.0vw;">OR:</span>
    <span class="freelance-text" style="position:absolute; top:65.4vh; left:149.0vw;">OR:</span>
    <span class="freelance-text" style="position:absolute; top:71.6vh; left:149.0vw;">OR:</span>

    <span class="freelance-text right-flow" style="position:absolute; top:53vh; left:163.4vw;">0</span>
    <span class="freelance-text right-flow" style="position:absolute; top:59.2vh; left:163.4vw;">0</span>
    <span class="freelance-text right-flow" style="position:absolute; top:65.4vh; left:163.4vw;">0</span>
    <span class="freelance-text right-flow" style="position:absolute; top:71.6vh; left:163.4vw;">0</span>

    <span class="freelance-text" style="position:absolute; top:53vh; left:106.0vw;">JSR</span>
    <span class="freelance-text" style="position:absolute; top:59.2vh; left:106.0vw;">OcR</span>

    <span class="freelance-text right-flow" style="position:absolute; top:53vh; left:119.7vw;">0</span>
    <span class="freelance-text right-flow" style="position:absolute; top:59.2vh; left:119.7vw;">0</span>

    <span class="freelance-text" style="position:absolute; top:53vh; left:128.0vw;">TTR</span>
    <span class="freelance-text" style="position:absolute; top:59.2vh; left:128.0vw;">APc</span>

    <span class="freelance-text right-flow" style="position:absolute; top:53vh; left:141.0vw;">0</span>
    <span class="freelance-text right-flow" style="position:absolute; top:59.2vh; left:141.0vw;">0</span>  


<!-- Item texts -->
<span class="job-text" style="position:absolute; top:35.4vh; left:36vw;">LOOK UP:</span>
<span class="job-text" style="position:absolute; top:41.6vh; left:36vw;">OPT FOR:</span>

<span class="job-text right-flow" style="position:absolute; top:35.4vh; left:49.7vw;">0</span>
<span class="job-text right-flow" style="position:absolute; top:41.6vh; left:49.7vw;">0</span>

<span class="job-text" style="position:absolute; top:35.4vh; left:58vw;">PER1OD:</span>
<span class="job-text" style="position:absolute; top:41.6vh; left:58vw;">F1LTER:</span>

<span class="job-text right-flow" style="position:absolute; top:35.4vh; left:71vw;">0</span>
<span class="job-text right-flow" style="position:absolute; top:41.6vh; left:71vw;">0</span>

<span class="job-text" style="position:absolute; top:35.4vh; left:79vw;">AcT1VE</span>
<span class="job-text" style="position:absolute; top:41.6vh; left:79vw;">JO1nED</span>

<span class="job-text right-flow" style="position:absolute; top:35.4vh; left:93.4vw;">0</span>
<span class="job-text right-flow" style="position:absolute; top:41.6vh; left:93.4vw;">0</span>

<span class="job-text" style="position:absolute; top:53vh; left:79vw;">JA:</span>
<span class="job-text" style="position:absolute; top:59.2vh; left:79vw;">JA:</span>
<span class="job-text" style="position:absolute; top:65.4vh; left:79vw;">JA:</span>
<span class="job-text" style="position:absolute; top:71.6vh; left:79vw;">JL:</span>

<span class="job-text right-flow" style="position:absolute; top:53vh; left:93.4vw;">0</span>
<span class="job-text right-flow" style="position:absolute; top:59.2vh; left:93.4vw;">0</span>
<span class="job-text right-flow" style="position:absolute; top:65.4vh; left:93.4vw;">0</span>
<span class="job-text right-flow" style="position:absolute; top:71.6vh; left:93.4vw;">0</span>

<span class="job-text" style="position:absolute; top:53vh; left:36vw;">APW</span>
<span class="job-text" style="position:absolute; top:59.2vh; left:36vw;">AOR</span>

<span class="job-text right-flow" style="position:absolute; top:53vh; left:49.7vw;">0</span>
<span class="job-text right-flow" style="position:absolute; top:59.2vh; left:49.7vw;">0</span>

<span class="job-text" style="position:absolute; top:53vh; left:58.7vw;">A1R</span>
<span class="job-text" style="position:absolute; top:59.2vh; left:58.7vw;">AT1</span>

<span class="job-text right-flow" style="position:absolute; top:53vh; left:71vw;">0</span>
<span class="job-text right-flow" style="position:absolute; top:59.2vh; left:71vw;">0</span>  


<!-- === Community & Zero items (added 2025‑06‑11) === -->
<div class="freelance-items-container" style="position:absolute; z-index:1;">
  <!-- labels -->
  <span class="custom-text" style="position:absolute; top:35.4vh; left:35.41vw;">OFFER LOg</span>
  <span class="custom-text" style="position:absolute; top:41.6vh; left:35.41vw;">ORDER LOg</span>
  <span class="custom-text" style="position:absolute; top:53vh;  left:35.41vw;">HELP LOg</span>
  <span class="custom-text" style="position:absolute; top:59.2vh; left:35.41vw;">JUnK LOg</span>

  <!-- horizontal divider -->
  <div class="custom-line"
       style="position:absolute; top:47.8vh; left:35.41vw;
              width:22.48vw; height:1px; background:rgba(230,230,230,0.28);">
  </div>
</div>

<div class="zero-items-container" style="position:absolute; z-index:1;">
  <span class="custom-text right-flow" style="position:absolute; top:35.4vh; left:57.4vw;">0</span>
  <span class="custom-text right-flow" style="position:absolute; top:41.6vh; left:57.4vw;">0</span>
  <span class="custom-text right-flow" style="position:absolute; top:53vh;  left:57.4vw;">0</span>
  <span class="custom-text right-flow" style="position:absolute; top:59.2vh; left:57.4vw;">0</span>
</div>
<script>
/* --- Updated staggered gap logic injected by ChatGPT on 2025‑06‑02 --- */
document.addEventListener('DOMContentLoaded', () => {
  const FWD_MIN = 94,  FWD_MAX = 100;   // forward trigger (right edge)
  const REV_MIN = 32.43, REV_MAX = 36;  // reverse trigger (left edge)
  const TOP_MIN = 28.5, TOP_MAX = 84;   // vertical bounds
  const DIST    = 60;
const GAP = 10;                   // horizontal shift in vw
  const DUR     = 600;                  // transition duration in ms
  const STAGGER = 0;                  // delay between outgoing and incoming groups in ms

  // Helper unit conversions
  const vw = () => window.innerWidth / 100;
  const vh = () => window.innerHeight / 100;
  const toVw = px => px / vw();
  const toVh = px => px / vh();

  // Groups
  const jobEls   = [    ...document.querySelectorAll('.job-text'),
    ...document.querySelectorAll('.job-line') ];
  const freelanceEls = [...document.querySelectorAll('.freelance-text'), ...document.querySelectorAll('.freelance-line')];

  // Cache base positions
  [...jobEls, ...freelanceEls].forEach(el => {
    if (!el.dataset.baseLeftVw) {
      const leftPx = parseFloat(getComputedStyle(el).left) || 0;
      el.dataset.baseLeftVw = toVw(leftPx);
    }
  });

  // Stage flags
  let jobStage   = 1;  // 0 = hidden, 1 = visible (left column), 2 = shifted left / clipped
  let jobShifted = false; /* --- JobShift patch 2025-06-11 --- */
  let freelanceStage = 0;  // 0 = hidden, 1 = visible (center column)
  let animating   = false;

  // External dependency: account slide logic (unchanged)
  const getAccountSlid = () => {
    const acc = document.querySelector('.account-text');
    return acc && acc.dataset.slid === 'true';
  };

  // Reusable animator
  function move(els, offset) {
    els.forEach(el => {
      const base = parseFloat(el.dataset.baseLeftVw);
      el.style.transition = \`left \${DUR}ms ease\`;
      el.style.left       = (base + offset) + 'vw';
    });
  }

  /* ---------------- Forward (→) transitions ---------------- */
  function toStage1() { // show items
    animating = true;
    move(jobEls, -DIST);
    jobShifted = true; /* --- JobShift patch 2025-06-11 --- */
    setTimeout(() => { animating = false; jobStage = 1; }, DUR);
  }

  function toStage2() { // shift items further + reveal center with stagger
    animating = true;
    move(jobEls, -DIST - GAP);                       // items out first
    jobShifted = true; /* --- JobShift patch 2025-06-11 --- */
    move(freelanceEls, -DIST - GAP); // center follows
    setTimeout(() => { animating=false; jobStage=2; freelanceStage=1; }, DUR + STAGGER);
  }

  /* ---------------- Reverse (←) transitions ---------------- */
  function backToStage1() { // hide center, restore items with stagger
    animating = true;
    move(freelanceEls, 0);                              // center leaves first
    move(jobEls, 0); // items return after delay
    setTimeout(() => { animating=false; jobStage=1; freelanceStage=0; jobShifted=false; /* --- JobShift patch --- */ }, DUR + STAGGER);
  }

  function backToStage0() { // hide items
    animating = true;
    move(jobEls, 0);
    setTimeout(() => { animating=false; jobStage=0; jobShifted=false; /* --- JobShift patch --- */ }, DUR);
  }

  /* ---------------- Click handling ---------------- */
  document.addEventListener('click', e => {
    if (animating) return;

    const xVw = toVw(e.clientX);
    const yVh = toVh(e.clientY);
    const inFwd = xVw >= FWD_MIN && xVw <= FWD_MAX && yVh >= TOP_MIN && yVh <= TOP_MAX;
    const inRev = xVw >= REV_MIN && xVw <= REV_MAX && yVh >= TOP_MIN && yVh <= TOP_MAX;

    if (inFwd) {
      if (getAccountSlid()) return;             // hand off to account logic
      if (jobStage === 0) {
        toStage1(); e.stopPropagation();
      } else if (jobStage === 1 && freelanceStage === 0) {
        toStage2(); e.stopPropagation();
      }
    } else if (inRev) {
      if (freelanceStage === 1) {
        backToStage1(); e.stopPropagation();
      } else if (jobStage === 1 && freelanceStage === 0 && jobShifted) { /* --- JobShift patch --- */
        backToStage0(); e.stopPropagation();
      }
    }
  }, true);
});
  /* --- JobShift patch 2025-06-11 --- */
</script>
<script>
/* ---- Item clipping script injected by ChatGPT on 2025‑05‑29 (v3) ---- */
document.addEventListener('DOMContentLoaded', () => {
  const HIDE_LEFT_VW = 28.86; // Updated threshold
  const TOP_MIN_VH   = 28.5;  // Vertical bounds
  const TOP_MAX_VH   = 84;

  const items = [    ...document.querySelectorAll('.job-text'),
    ...document.querySelectorAll('.job-line') ];

  const toVw = px => px / (window.innerWidth  / 100);
  const toVh = px => px / (window.innerHeight / 100);

  function update() {
    items.forEach(el => {
      // Skip divider lines so they stay visible throughout the slide
      if (el.classList.contains('job-line') || el.classList.contains('freelance-line')) return;
      const rect = el.getBoundingClientRect();
      const l = toVw(rect.left);
      const t = toVh(rect.top);
      const hide = l < HIDE_LEFT_VW && t >= TOP_MIN_VH && t <= TOP_MAX_VH;
      el.style.opacity       = hide ? '0' : '';
      el.style.pointerEvents = hide ? 'none' : '';
    });
  }

  function loop() {
    update();
    requestAnimationFrame(loop);
  }
  loop();

  window.addEventListener('resize', update);
});
  /* --- JobShift patch 2025-06-11 --- */
</script>
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
  /* --- JobShift patch 2025-06-11 --- */
</script>
<!-- Invisible click areas for ledger/community slide -->
<div id="ledger-trigger-area" style="position:fixed; left:28.86vw; top:28.5vh; width:3.57vw; height:55.5vh; z-index:200; background:rgba(0,0,0,0);"></div>
<div id="ledger-reset-area" style="position:fixed; left:0; top:28.5vh; width:6.37vw; height:55.5vh; z-index:200; background:rgba(0,0,0,0);"></div>
<script>
// Ledger & Community slide logic v1
(function(){
    const ledgerItems = document.querySelectorAll('.job-item');
    const communityContainer = document.querySelector('.freelance-items-container');
    const zeroContainer = document.querySelector('.zero-items-container');
    const triggerArea = document.getElementById('ledger-trigger-area');
    const resetArea = document.getElementById('ledger-reset-area');
    let slid = false;

    function slideOut(){
        ledgerItems.forEach(el => el.classList.add('slide-left-40'));
        if(communityContainer) communityContainer.classList.add('slide-left-29');
        if(zeroContainer) zeroContainer.classList.add('slide-left-29');
        slid = true;
    }

    function slideBack(){
        ledgerItems.forEach(el => el.classList.remove('slide-left-40'));
        if(communityContainer) communityContainer.classList.remove('slide-left-29');
        if(zeroContainer) zeroContainer.classList.remove('slide-left-29');
        slid = false;
    }

    if(triggerArea){
        triggerArea.addEventListener('click', (e) => {
            e.stopPropagation();
            if(!slid) slideOut();
        });
    }
    if(resetArea){
        resetArea.addEventListener('click', (e) => {
            e.stopPropagation();
            if(slid) slideBack();
        });
    }
})();
  /* --- JobShift patch 2025-06-11 --- */
</script>
` } } />
      );
    }
