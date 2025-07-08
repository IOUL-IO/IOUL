"use client";
import React, { useEffect } from 'react';
import parse from 'html-react-parser';

const htmlString = `
  <!-- Fixed white mask layers -->
  <div class="layer-one"></div>
  <div class="layer-two"></div>
  <div class="layer-three"></div>
  <div class="layer-four"></div>
  <div class="layer-five"></div>
  <div class="layer-six"></div>

  <!-- All visible UI sits inside page-content -->
  <div class="page-content">
    <!-- Primary guideline lines -->
    <div class="line original"></div>
    <div class="line second"></div>
    <div class="line third"></div>
    <div class="line fourth"></div>
    <div class="line fifth"></div>
    <div class="line sixth"></div>
    <div class="line util-line"></div>

    <!-- Job items -->
    <span class="custom-text job-item" style="position:absolute; top:35.4vh; left:6.41vw;">JOB LOg</span>
    <span class="custom-text job-item" style="position:absolute; top:41.6vh; left:6.41vw;">APPL1ED</span>
    <span class="custom-text job-item" style="position:absolute; top:53vh; left:6.41vw;">QUAL1FY</span>
    <span class="custom-text job-item" style="position:absolute; top:59.2vh; left:6.41vw;">1n1T1ATE</span>
    <span class="custom-text right-flow job-item" style="position:absolute; top:35.4vh; left:28.41vw;">0</span>
    <span class="custom-text right-flow job-item" style="position:absolute; top:41.6vh; left:28.41vw;">0</span>
    <span class="custom-text right-flow job-item" style="position:absolute; top:53vh; left:28.41vw;">0</span>
    <span class="custom-text right-flow job-item" style="position:absolute; top:59.2vh; left:28.41vw;">0</span>

    <!-- Divider line -->
    <div class="custom-line job-item"></div>

    <!-- Item lines -->
    <div class="job-line job-line-one" style="position:absolute; top:47.8vh; left:36vw; width:36vw;"></div>
    <div class="job-line job-line-two" style="position:absolute; top:47.8vh; left:79vw; width:14.8vw;"></div>

    <!-- Center/freelance lines -->
    <div class="freelance-line freelance-line-one" style="position:absolute; top:47.8vh; left:106.0vw; width:36vw;"></div>
    <div class="freelance-line freelance-line-two" style="position:absolute; top:47.8vh; left:149.0vw; width:14.8vw;"></div>
  </div>
`;

export default function Page() {
  useEffect(() => {
    // Edge-trigger fullscreen toggle
    const EDGE_MARGIN = 11;
    const handleFullscreenClick = (event: MouseEvent) => {
      const { clientX: x, clientY: y } = event;
      const { innerWidth: w, innerHeight: h } = window;
      const nearEdge =
        x <= EDGE_MARGIN || x >= w - EDGE_MARGIN || y <= EDGE_MARGIN || y >= h - EDGE_MARGIN;
      if (nearEdge && !document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(() => {});
      }
    };
    document.addEventListener('click', handleFullscreenClick);

    // Page click handlers for animations
    const FWD_MIN = 94, FWD_MAX = 100, REV_MIN = 32.43, REV_MAX = 36, TOP_MIN = 28.5, TOP_MAX = 84;
    const DIST = 60, GAP = 10, DUR = 600, STAGGER = 0;
    const toVw = (px: number) => px / (window.innerWidth / 100);
    const toVh = (px: number) => px / (window.innerHeight / 100);

    const jobEls = Array.from(document.querySelectorAll<HTMLElement>('.job-item, .job-line'));
    const freelanceEls = Array.from(document.querySelectorAll<HTMLElement>('.freelance-line'));

    jobEls.forEach(el => {
      const leftPx = parseFloat(getComputedStyle(el).left) || 0;
      el.dataset.baseLeftVw = toVw(leftPx).toString();
    });

    let animating = false, jobStage = 0, freelanceStage = 0, jobShifted = false;

    const getAccountSlid = () => document.querySelector<HTMLElement>('.account-text')?.dataset.slid === 'true';

    const move = (els: HTMLElement[], offset: number) => {
      els.forEach(el => {
        const base = parseFloat(el.dataset.baseLeftVw || '0');
        el.style.transition = \`left \${DUR}ms ease\`;
        el.style.left = \`\${base + offset}vw\`;
      });
    };

    const toStage1 = () => { /* ... similar to earlier logic ... */ };
    const toStage2 = () => { /* ... */ };
    const backToStage1 = () => { /* ... */ };
    const backToStage0 = () => { /* ... */ };

    const handlePageClick = (e: MouseEvent) => { /* ... */ };
    document.addEventListener('click', handlePageClick, true);

    const HIDE_LEFT_VW = 35.97;
    const updateClip = () => { /* ... */ };
    updateClip();
    window.addEventListener('resize', updateClip);

    return () => {
      document.removeEventListener('click', handleFullscreenClick);
      document.removeEventListener('click', handlePageClick, true);
      window.removeEventListener('resize', updateClip);
    };
  }, []);

  return <div>{parse(htmlString)}</div>;
}
