'use client';

import React, { useEffect } from 'react';
import Head from 'next/head';

const HEAD_HTML = `
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>IOUL</title>
  <link rel="icon" href="favicon.png" type="image/png" />
  <link rel="stylesheet" href="styles.css" />
`;
const BODY_HTML = `

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


<!-- Full‑screen trigger (click near any screen edge) -->

<!-- Invisible click areas for ledger/community slide -->
<div id="ledger-trigger-area" style="position:fixed; left:28.86vw; top:28.5vh; width:3.57vw; height:55.5vh; z-index:200; background:rgba(0,0,0,0);"></div>
<div id="ledger-reset-area" style="position:fixed; left:0; top:28.5vh; width:6.37vw; height:55.5vh; z-index:200; background:rgba(0,0,0,0);"></div>

`;

export default function Page() {
  useEffect(() => {
    const FWD_MIN = 94, FWD_MAX = 100;
    const REV_MIN = 32.43, REV_MAX = 36;
    const TOP_MIN = 28.5, TOP_MAX = 84;
    const DIST = 60;
    const GAP = 10;
    const DUR = 600;

    const toVw = (px: number) => px / (window.innerWidth / 100);
    const toVh = (px: number) => px / (window.innerHeight / 100);

    function move(els: HTMLDivElement[], distance: number) {
      els.forEach(el => {
        el.style.transition = `transform ${DUR}ms ease`;
        el.style.transform = `translateX(${distance}vw)`;
      });
    }

    let jobStage = 0, freelanceStage = 0, jobShifted = false;
    const jobItems = Array.from(document.querySelectorAll('.job-item')) as HTMLDivElement[];
    const jobLines = Array.from(document.querySelectorAll('.job-line')) as HTMLDivElement[];
    const freelanceItems = Array.from(document.querySelectorAll('.freelance-text')) as HTMLDivElement[];
    const freelanceLines = Array.from(document.querySelectorAll('.freelance-line')) as HTMLDivElement[];

    function toStage1() {
      move(jobItems, -DIST);
      move(jobLines, -DIST);
      jobStage = 1;
      jobShifted = true;
    }

    function toStage2() {
      move(jobItems, -2 * DIST - GAP);
      move(jobLines, -2 * DIST - GAP);
      move(freelanceItems, -DIST);
      move(freelanceLines, -DIST);
      freelanceStage = 1;
    }

    function backToStage1() {
      move(freelanceItems, 0);
      move(freelanceLines, 0);
      freelanceStage = 0;
    }

    function backToStage0() {
      move(jobItems, 0);
      move(jobLines, 0);
      jobStage = 0;
      jobShifted = false;
    }

    function handler(e: MouseEvent) {
      const xVW = toVw(e.clientX);
      const yVH = toVh(e.clientY);
      const inFwd = xVW >= FWD_MIN && xVW <= FWD_MAX && yVH >= TOP_MIN && yVH <= TOP_MAX;
      const inRev = xVW >= REV_MIN && xVW <= REV_MAX && yVH >= TOP_MIN && yVH <= TOP_MAX;

      if (inFwd) {
        if (jobStage === 0) {
          toStage1();
          e.stopPropagation();
        } else if (jobStage === 1 && freelanceStage === 0) {
          toStage2();
          e.stopPropagation();
        }
      } else if (inRev) {
        if (freelanceStage === 1) {
          backToStage1();
          e.stopPropagation();
        } else if (jobStage === 1 && freelanceStage === 0 && jobShifted) {
          backToStage0();
          e.stopPropagation();
        }
      }
    }

    document.addEventListener('mousemove', handler, true);
    return () => {
      document.removeEventListener('mousemove', handler, true);
    };
  }, []);

  return (
    <>
      <Head dangerouslySetInnerHTML={ __html: HEAD_HTML } />
      <div dangerouslySetInnerHTML={ __html: BODY_HTML } />
    </>
  );
}
