"use client";
import React, { useEffect } from "react";

export default function Page() {
  useEffect(() => {
    // Identify this route for layout overrides
    document.documentElement.setAttribute("data-page", "jobs");
    // Ensure line 5 sits above layer‑five on the Jobs page only
    const style = document.createElement("style");
    style.id = "jobs-line5-fix";
    style.innerHTML = ":root[data-page='jobs'] .page-content .line.fifth { z-index: 541 !important; }";
    document.head.appendChild(style);
    // Full-screen toggle on edge click
    const EDGE = 11;
    const fullscreenHandler = ({ clientX: x, clientY: y }: MouseEvent) => {
      const { innerWidth: w, innerHeight: h } = window;
      const nearEdge =
        x <= EDGE || x >= w - EDGE || y <= EDGE || y >= h - EDGE;
      if (nearEdge && !document.fullscreenElement) {
        document.documentElement.requestFullscreen();
      }
    };
    document.addEventListener("click", fullscreenHandler);

    // Slide animation params
    const FWD_MIN = 94,
      FWD_MAX = 100;
    const REV_MIN = 32.43,
      REV_MAX = 36;
    const TOP_MIN = 28.5,
      TOP_MAX = 84;
    const DIST = 60,
      GAP = 10,
      DUR = 600,
      STAGGER = 0;
    const vw = () => window.innerWidth / 100;
    const vh = () => window.innerHeight / 100;
    const toVw = (px: number) => px / vw();
    const toVh = (px: number) => px / vh();

    const jobEls = Array.from(
      document.querySelectorAll<HTMLElement>(".job-text, .job-line")
    );
    const freelanceEls = Array.from(
      document.querySelectorAll<HTMLElement>(".freelance-text, .freelance-line")
    );

    // Cache base positions
    [...jobEls, ...freelanceEls].forEach((el) => {
      if (!el.dataset.baseLeftVw) {
        const leftPx = parseFloat(getComputedStyle(el).left) || 0;
        el.dataset.baseLeftVw = toVw(leftPx).toString();
      }
    });

    let animating = false;
    let jobStage = 1;
    let freelanceStage = 0;
    let jobShifted = false;

    const getAccountSlid = () =>
      document.querySelector<HTMLElement>(".account-text")
        ?.dataset.slid === "true";
    function move(els: HTMLElement[], offset: number) {
      els.forEach((el) => {
        const base = parseFloat(el.dataset.baseLeftVw || "0");
        el.style.transition = `left ${DUR}ms ease`;
        el.style.left = `${base + offset}vw`;
      });
    }
    function toStage1() {
      animating = true;
      move(jobEls, -DIST);
      jobShifted = true;
      setTimeout(() => {
        animating = false;
        jobStage = 1;
      }, DUR);
    }
    function toStage2() {
      animating = true;
      move(jobEls, -DIST - GAP);
      jobShifted = true;
      move(freelanceEls, -DIST - GAP);
      setTimeout(() => {
        animating = false;
        jobStage = 2;
        freelanceStage = 1;
      }, DUR + STAGGER);
    }
    function backToStage1() {
      animating = true;
      move(freelanceEls, 0);
      move(jobEls, 0);
      setTimeout(() => {
        animating = false;
        jobStage = 1;
        freelanceStage = 0;
        jobShifted = false;
      }, DUR + STAGGER);
    }
    function backToStage0() {
      animating = true;
      move(jobEls, 0);
      setTimeout(() => {
        animating = false;
        jobStage = 0;
        jobShifted = false;
      }, DUR);
    }

    const pageClickHandler = (e: MouseEvent) => {
      if (animating) return;
      const xVw = toVw(e.clientX);
      const yVh = toVh(e.clientY);
      const inFwd =
        xVw >= FWD_MIN && xVw <= FWD_MAX && yVh >= TOP_MIN && yVh <= TOP_MAX;
      const inRev =
        xVw >= REV_MIN && xVw <= REV_MAX && yVh >= TOP_MIN && yVh <= TOP_MAX;
      if (inFwd) {
        if (getAccountSlid()) return;
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
    };
    document.addEventListener("click", pageClickHandler, true);

    
    // Ledger & Community slide logic by region
    function slideOut() {
      document.querySelectorAll('.job-item').forEach(el => el.classList.add('slide-left-40'));
      document.querySelector('.freelance-items-container')?.classList.add('slide-left-29');
      document.querySelector('.zero-items-container')?.classList.add('slide-left-29');
    }
    function slideBack() {
      document.querySelectorAll('.job-item').forEach(el => el.classList.remove('slide-left-40'));
      document.querySelector('.freelance-items-container')?.classList.remove('slide-left-29');
      document.querySelector('.zero-items-container')?.classList.remove('slide-left-29');
    }
    const LEDGER_MIN = 28.86, LEDGER_MAX = 32.43;
    const BACK_MIN = 0, BACK_MAX = 6.37;
    let ledgerSlid = false;
    const ledgerClickHandler = (e: MouseEvent) => {
      const xVw = toVw(e.clientX);
      const yVh = toVh(e.clientY);
      if (yVh >= TOP_MIN && yVh <= TOP_MAX) {
        if (!ledgerSlid && xVw >= LEDGER_MIN && xVw <= LEDGER_MAX) {
          slideOut();
          ledgerSlid = true;
        } else if (ledgerSlid && xVw >= BACK_MIN && xVw <= BACK_MAX) {
          slideBack();
          ledgerSlid = false;
        }
      }
    };
    document.addEventListener('click', ledgerClickHandler, true);

    // Clipping logic
    const HIDE_LEFT_VW = 35.97;
    function updateClip() {
      jobEls.forEach((el) => {
        if (el.classList.contains("freelance-line")) return;
        const rect = el.getBoundingClientRect();
        const l = toVw(rect.left);
        const t = toVh(rect.top);
        const hide = l < HIDE_LEFT_VW && t >= TOP_MIN && t <= TOP_MAX;
        el.style.opacity = hide ? "0" : "";
        el.style.pointerEvents = hide ? "none" : "";
      });
    }
    updateClip();
    requestAnimationFrame(function loop() {
      updateClip();
      requestAnimationFrame(loop);
    });
    window.addEventListener("resize", updateClip);
    // Cleanup
    return () => {
            document.removeEventListener('click', ledgerClickHandler, true);
document.removeEventListener("click", fullscreenHandler);
      document.removeEventListener("click", pageClickHandler, true);
      window.removeEventListener("resize", updateClip);
      const styleEl = document.getElementById("jobs-line5-fix");
      if (styleEl && styleEl.parentNode) styleEl.parentNode.removeChild(styleEl);
      document.documentElement.removeAttribute("data-page");
    };
  }, []);

  return (
    <>
      {/* Fixed white mask layers */}
      <div className="layer-one" />
      <div className="layer-two" />
      <div className="layer-three" />
      <div className="layer-four" />
      <div className="layer-five" />
      <div className="layer-six" />

      {/* All visible UI sits inside page-content */}
      <div className="page-content">
        {/* Primary guideline lines */}
        <div className="line original" />
        <div className="line second" />
        <div className="line third" />
        <div className="line fourth" />
        <div className="line fifth" />
        <div className="line sixth" />
        <div className="line util-line" />

{/* Job items */}
<span className="custom-text job-item" style={{ position: 'absolute', top: '35.4vh', left: '6.41vw' }}>JOB LOg</span>
<span className="custom-text job-item" style={{ position: 'absolute', top: '41.6vh', left: '6.41vw' }}>APPL1ED</span>
<span className="custom-text job-item" style={{ position: 'absolute', top: '53vh',   left: '6.41vw' }}>QUAL1FY</span>
<span className="custom-text job-item" style={{ position: 'absolute', top: '59.2vh', left: '6.41vw' }}>1n1T1ATE</span>

{/* Job counters */}
<span className="custom-text right-flow job-item" style={{ position: 'absolute', top: '35.4vh', left: '28.41vw' }}>0</span>
<span className="custom-text right-flow job-item" style={{ position: 'absolute', top: '41.6vh', left: '28.41vw' }}>0</span>
<span className="custom-text right-flow job-item" style={{ position: 'absolute', top: '53vh',   left: '28.41vw' }}>0</span>
<span className="custom-text right-flow job-item" style={{ position: 'absolute', top: '59.2vh', left: '28.41vw' }}>0</span>

{/* Divider line */}
<div className="custom-line job-item" />

<div className="job-line job-line-one" style={{ position: 'absolute', top: '47.8vh', left: '36vw',  width: '36vw' }} />
<div className="job-line job-line-two" style={{ position: 'absolute', top: '47.8vh', left: '79vw',  width: '14.8vw' }} />

<div className="freelance-line freelance-line-one" style={{ position: 'absolute', top: '47.8vh', left: '106.0vw', width: '36vw' }} />
<div className="freelance-line freelance-line-two" style={{ position: 'absolute', top: '47.8vh', left: '149.0vw', width: '14.8vw' }} />

        
<span className="freelance-text" style={{ position: 'absolute', top: '35.4vh', left: '106.0vw' }}>LOOK UP:</span>
<span className="freelance-text" style={{ position: 'absolute', top: '41.6vh', left: '106.0vw' }}>JOB LOg:</span>
        
<span className="freelance-text right-flow" style={{ position: 'absolute', top: '35.4vh', left: '119.7vw' }}>0</span>
<span className="freelance-text right-flow" style={{ position: 'absolute', top: '41.6vh', left: '119.7vw' }}>0</span>
        
<span className="freelance-text" style={{ position: 'absolute', top: '35.4vh', left: '128.0vw' }}>PER1OD:</span>
<span className="freelance-text" style={{ position: 'absolute', top: '41.6vh', left: '128.0vw' }}>F1LTER:</span>
        
<span className="freelance-text right-flow" style={{ position: 'absolute', top: '35.4vh', left: '141.0vw' }}>0</span>
<span className="freelance-text right-flow" style={{ position: 'absolute', top: '41.6vh', left: '141.0vw' }}>0</span>
        
<span className="freelance-text" style={{ position: 'absolute', top: '35.4vh', left: '149.0vw' }}>RAT1ngS</span>
<span className="freelance-text" style={{ position: 'absolute', top: '41.6vh', left: '149.0vw' }}>REcE1PT</span>
        
<span className="freelance-text right-flow" style={{ position: 'absolute', top: '35.4vh', left: '163.4vw' }}>0</span>
<span className="freelance-text right-flow" style={{ position: 'absolute', top: '41.6vh', left: '163.4vw' }}>0</span>

        
<span className="freelance-text" style={{ position: 'absolute', top: '53vh', left: '149.0vw' }}>OR:</span>
<span className="freelance-text" style={{ position: 'absolute', top: '59.2vh', left: '149.0vw' }}>OR:</span>
<span className="freelance-text" style={{ position: 'absolute', top: '65.4vh', left: '149.0vw' }}>OR:</span>
<span className="freelance-text" style={{ position: 'absolute', top: '71.6vh', left: '149.0vw' }}>OR:</span>
        
<span className="freelance-text right-flow" style={{ position: 'absolute', top: '53vh', left: '163.4vw' }}>0</span>
<span className="freelance-text right-flow" style={{ position: 'absolute', top: '59.2vh', left: '163.4vw' }}>0</span>
<span className="freelance-text right-flow" style={{ position: 'absolute', top: '65.4vh', left: '163.4vw' }}>0</span>
<span className="freelance-text right-flow" style={{ position: 'absolute', top: '71.6vh', left: '163.4vw' }}>0</span>
        

<span className="freelance-text" style={{ position: 'absolute', top: '53vh', left: '106.0vw' }}>JSR</span>
<span className="freelance-text" style={{ position: 'absolute', top: '59.2vh', left: '106.0vw' }}>OcR</span>
        
<span className="freelance-text right-flow" style={{ position: 'absolute', top: '53vh', left: '119.7vw' }}>0</span>
<span className="freelance-text right-flow" style={{ position: 'absolute', top: '59.2vh', left: '119.7vw' }}>0</span>
        
<span className="freelance-text" style={{ position: 'absolute', top: '53vh', left: '128.0vw' }}>TTR</span>
<span className="freelance-text" style={{ position: 'absolute', top: '59.2vh', left: '128.0vw' }}>APc</span>
        
<span className="freelance-text right-flow" style={{ position: 'absolute', top: '53vh', left: '141.0vw' }}>0</span>
<span className="freelance-text right-flow" style={{ position: 'absolute', top: '59.2vh', left: '141.0vw' }}>0</span>

        
<span className="job-text" style={{ position: 'absolute', top: '35.4vh', left: '36vw' }}>LOOK UP:</span>
<span className="job-text" style={{ position: 'absolute', top: '41.6vh', left: '36vw' }}>OPT FOR:</span>
        
<span className="job-text right-flow" style={{ position: 'absolute', top: '35.4vh', left: '49.7vw' }}>0</span>
<span className="job-text right-flow" style={{ position: 'absolute', top: '41.6vh', left: '49.7vw' }}>0</span>
        
<span className="job-text" style={{ position: 'absolute', top: '35.4vh', left: '58vw' }}>PER1OD:</span>
<span className="job-text" style={{ position: 'absolute', top: '41.6vh', left: '58vw' }}>F1LTER:</span>
        
<span className="job-text right-flow" style={{ position: 'absolute', top: '35.4vh', left: '71vw' }}>0</span>
<span className="job-text right-flow" style={{ position: 'absolute', top: '41.6vh', left: '71vw' }}>0</span>
        
<span className="job-text" style={{ position: 'absolute', top: '35.4vh', left: '79vw' }}>AcT1VE</span>
<span className="job-text" style={{ position: 'absolute', top: '41.6vh', left: '79vw' }}>JO1nED</span>
        
<span className="job-text right-flow" style={{ position: 'absolute', top: '35.4vh', left: '93.4vw' }}>0</span>
<span className="job-text right-flow" style={{ position: 'absolute', top: '41.6vh', left: '93.4vw' }}>0</span>
        
<span className="job-text" style={{ position: 'absolute', top: '53vh', left: '79vw' }}>JA:</span>
<span className="job-text" style={{ position: 'absolute', top: '59.2vh', left: '79vw' }}>JA:</span>
<span className="job-text" style={{ position: 'absolute', top: '65.4vh', left: '79vw' }}>JA:</span>
<span className="job-text" style={{ position: 'absolute', top: '71.6vh', left: '79vw' }}>JL:</span>
        
<span className="job-text right-flow" style={{ position: 'absolute', top: '53vh', left: '93.4vw' }}>0</span>
<span className="job-text right-flow" style={{ position: 'absolute', top: '59.2vh', left: '93.4vw' }}>0</span>
<span className="job-text right-flow" style={{ position: 'absolute', top: '65.4vh', left: '93.4vw' }}>0</span>
<span className="job-text right-flow" style={{ position: 'absolute', top: '71.6vh', left: '93.4vw' }}>0</span>
        

<span className="job-text" style={{ position: 'absolute', top: '53vh',   left: '36vw' }}>APW</span>
<span className="job-text" style={{ position: 'absolute', top: '59.2vh', left: '36vw' }}>AOR</span>
        
<span className="job-text right-flow" style={{ position: 'absolute', top: '53vh',   left: '49.7vw' }}>0</span>
<span className="job-text right-flow" style={{ position: 'absolute', top: '59.2vh', left: '49.7vw' }}>0</span>
        
<span className="job-text" style={{ position: 'absolute', top: '53vh',   left: '58.7vw' }}>A1R</span>
<span className="job-text" style={{ position: 'absolute', top: '59.2vh', left: '58.7vw' }}>AT1</span>
        
<span className="job-text right-flow" style={{ position: 'absolute', top: '53vh',   left: '71vw' }}>0</span>
<span className="job-text right-flow" style={{ position: 'absolute', top: '59.2vh', left: '71vw' }}>0</span>


<div className="freelance-items-container" style={{ position: 'absolute', zIndex: 1 }}>
  <span className="custom-text" style={{ position: 'absolute', top: '35.4vh', left: '35.41vw' }}>OFFER LOg</span>
  <span className="custom-text" style={{ position: 'absolute', top: '41.6vh', left: '35.41vw' }}>ORDER LOg</span>
  <span className="custom-text" style={{ position: 'absolute', top: '53vh', left: '35.41vw' }}>HELP LOg</span>
  <span className="custom-text" style={{ position: 'absolute', top: '59.2vh', left: '35.41vw' }}>JUnK LOg</span>
  <div className="custom-line" style={{ position: 'absolute', top: '47.8vh', left: '35.41vw', width: '22.48vw', height: '1px', background: 'rgba(230,230,230,0.28)' }} />
</div>
<div className="zero-items-container" style={{ position: 'absolute', zIndex: 1 }}>
  <span className="custom-text right-flow" style={{ position: 'absolute', top: '35.4vh', left: '57.4vw' }}>0</span>
  <span className="custom-text right-flow" style={{ position: 'absolute', top: '41.6vh', left: '57.4vw' }}>0</span>
  <span className="custom-text right-flow" style={{ position: 'absolute', top: '53vh', left: '57.4vw' }}>0</span>
  <span className="custom-text right-flow" style={{ position: 'absolute', top: '59.2vh', left: '57.4vw' }}>0</span>
</div>


        {/* Full‐screen grid overlay */}      </div>
    </>
  );
}