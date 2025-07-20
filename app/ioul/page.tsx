"use client";

import React, { useEffect, useState, useRef, useCallback } from 'react';

const IOULPage: React.FC = () => {
  /* ------------------------------------------------------------------
   *  STATE & REFS
   * ------------------------------------------------------------------ */
  const [currentMenu, setCurrentMenu] = useState<string | null>(null);
  const [slideState, setSlideState] = useState<"none" | "heading" | "menu" | "community">("none");
  const [pageFadedIn, setPageFadedIn] = useState(false);
  const [chatVisible, setChatVisible] = useState(false);
  const [chatInitialized, setChatInitialized] = useState(false);

  const chatTextRef   = useRef<HTMLSpanElement | null>(null);
  const hoverAreaRef  = useRef<HTMLDivElement | null>(null);

  /*   Slide‑in KPI + Centre column logic
  ---------------------------------------------------------------------*/
  const itemElsRef   = useRef<NodeListOf<HTMLElement> | null>(null);  // .item‑text / .item‑line
  const centerElsRef = useRef<NodeListOf<HTMLElement> | null>(null);  // .center‑text / .center‑line

  const [itemStage,   setItemStage]   = useState<0 | 1 | 2>(0); // 0=hidden,1=visible,2=shifted
  const [centerStage, setCenterStage] = useState<0 | 1>(0);     // 0=hidden,1=visible
  const [animating,   setAnimating]   = useState(false);

  /*   Constants in vw/vh ------------------------------------------------ */
  const FWD_MIN   = 94,     FWD_MAX   = 100;   // forward trigger (right edge)
  const REV_MIN   = 32.43,  REV_MAX   = 36;    // reverse trigger (centre‑left strip)
  const TOP_MIN   = 28.5,   TOP_MAX   = 84;    // vertical bounds
  const DIST      = 60;                         // horizontal distance each slide
  const GAP       = 10;                         // extra overlap gap
  const DUR       = 600;                        // ms
  const STAGGER   = 0;

  /* ------------------------------------------------------------------ */
  /*  Collect KPI + Centre elements once after first paint              */
  /* ------------------------------------------------------------------ */
  useEffect(() => {
    itemElsRef.current   = document.querySelectorAll<HTMLElement>('.item-text, .item-line');
    centerElsRef.current = document.querySelectorAll<HTMLElement>('.center-text, .center-line');

    const vw = window.innerWidth / 100;
    [...(itemElsRef.current ?? []), ...(centerElsRef.current ?? [])].forEach(el => {
      // remember each element's *original* left value in vw
      if (!el.dataset.baseLeftVw) {
        const leftPx = parseFloat(getComputedStyle(el).left) || 0;
        el.dataset.baseLeftVw = (leftPx / vw).toString();
      }
    });
  }, []);

  /* ------------------------------------------------------------------ */
  /*  REUSABLE MOVE HELPER                                              */
  /* ------------------------------------------------------------------ */
  const move = (list: NodeListOf<HTMLElement> | null, offset: number) => {
    if (!list?.length) return;
    list.forEach(el => {
      const base = parseFloat(el.dataset.baseLeftVw || '0');
      el.style.transition = `left ${DUR}ms ease`;
      el.style.left = `${base + offset}vw`;
    });
  };

  /* ------------------------------------------------------------------ */
  /*  STAGE TRANSITIONS                                                 */
  /* ------------------------------------------------------------------ */
  const toStage1 = () => {
    if (animating) return;
    setAnimating(true);
    move(itemElsRef.current, -DIST);                   // KPI slides in to 36 vw
    setTimeout(() => { setItemStage(1); setAnimating(false); }, DUR);
  };

  const toStage2 = () => {
    if (animating) return;
    setAnimating(true);
    move(itemElsRef.current, -2 * DIST - GAP);         // KPI shifts left/clipped
    move(centerElsRef.current, -DIST - GAP);           // Centre slides in
    setTimeout(() => {
      setItemStage(2); setCenterStage(1); setAnimating(false);
    }, DUR + STAGGER);
  };

  const backToStage1 = () => {
    if (animating) return;
    setAnimating(true);
    move(centerElsRef.current, 0);                     // Centre retreats
    move(itemElsRef.current,   -DIST);                 // KPI returns to 36 vw
    setTimeout(() => {
      setCenterStage(0); setItemStage(1); setAnimating(false);
    }, DUR + STAGGER);
  };

  const backToStage0 = () => {
    if (animating) return;
    setAnimating(true);
    move(itemElsRef.current, 0);                       // KPI slides fully out
    setTimeout(() => { setItemStage(0); setAnimating(false); }, DUR);
  };

  /* ------------------------------------------------------------------ */
  /*  CLICK HANDLER FOR KPI / CENTRE TRIGGERS                           */
  /* ------------------------------------------------------------------ */
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const vwUnit = window.innerWidth / 100;
      const vhUnit = window.innerHeight / 100;
      const x  = e.clientX / vwUnit;
      const y  = e.clientY / vhUnit;

      const inFwd = x >= FWD_MIN && x <= FWD_MAX && y >= TOP_MIN && y <= TOP_MAX;
      const inRev = x >= REV_MIN && x <= REV_MAX && y >= TOP_MIN && y <= TOP_MAX;

      if (inFwd) {
        if (itemStage === 0)               toStage1();
        else if (itemStage === 1 && centerStage === 0) toStage2();
      } else if (inRev) {
        if (centerStage === 1)             backToStage1();
        else if (itemStage === 1 && centerStage === 0) backToStage0();
      }
    };
    document.addEventListener('click', handleClick, true);
    return () => document.removeEventListener('click', handleClick, true);
  }, [itemStage, centerStage, animating]);

  /* ------------------------------------------------------------------ */
  /*  CHAT‑TEXT HOVER LOGIC                                             */
  /* ------------------------------------------------------------------ */
  const SLIDE_DURATION = 700;
  const handleChatHover = useCallback(() => {
    if (!chatInitialized && slideState === "none") {
      setChatInitialized(true);
      setChatVisible(true);
    }
  }, [chatInitialized, slideState]);

  useEffect(() => {
    let t: ReturnType<typeof setTimeout> | null = null;
    if (slideState === "none") {
      if (chatInitialized) t = setTimeout(() => setChatVisible(true), SLIDE_DURATION);
    } else {
      setChatVisible(false);
    }
    return () => { if (t) clearTimeout(t); };
  }, [slideState, chatInitialized]);

  /* ==================================================================
   *  MARK‑UP  (identical to previous release – only functional 
   *           segments are shown here for brevity)
   * ================================================================== */
  return (
    <div className="non-fullscreen" translate="no">
      {/* ... full JSX markup here (unchanged) ... */}
      <div className="slide-triggers">
        <div className="slide-trigger" />          {/* forward (94‑100 vw) */}
        <div className="slide-trigger-reverse" />  {/* reverse (32.43‑36 vw) */}
      </div>
    </div>
  );
};

export default IOULPage;