"use client";

import React, { useEffect, useState, useRef } from "react";

const IOULPage: React.FC = () => {
  // ---------- state & refs ----------
  const [itemStage, setItemStage] = useState(0);
  const [centerStage, setCenterStage] = useState(0);
  const [animating, setAnimating] = useState(false);

  const itemElsRef   = useRef<NodeListOf<HTMLElement> | null>(null);
  const centerElsRef = useRef<NodeListOf<HTMLElement> | null>(null);

  // ---------- constants ----------
  const DIST    = 60;  // vw to move each column
  const GAP     = 10;  // vw gap between item + centre columns
  const DUR     = 600; // ms   animation duration
  const STAGGER = 0;   // ms   extra delay for stagger (currently 0)

  // ---------- helpers ----------
  const vw   = () => window.innerWidth / 100;
  const toVw = (px: number) => px / vw();

  // ---------- NEW: collect sliding groups once ----------
  useEffect(() => {
    itemElsRef.current   = document.querySelectorAll<HTMLElement>(
      ".item-text, .item-line"
    );
    centerElsRef.current = document.querySelectorAll<HTMLElement>(
      ".center-text, .center-line"
    );

    const allEls = [
      ...Array.from(itemElsRef.current),
      ...Array.from(centerElsRef.current),
    ];

    // Record starting left position (in vw) so move() can be relative
    allEls.forEach((el) => {
      if (!el.dataset.baseLeftVw) {
        const leftPx = parseFloat(getComputedStyle(el).left) || 0;
        el.dataset.baseLeftVw = toVw(leftPx).toString();
      }
    });
  }, []); // ← runs once after mount

  // ---------- safe move helper ----------
  const move = (els: NodeListOf<HTMLElement> | null, offsetVw: number) => {
    if (!els) return;
    els.forEach((el) => {
      const base = parseFloat(el.dataset.baseLeftVw || "0");
      el.style.transition = `left ${DUR}ms ease`;
      el.style.left = `${base + offsetVw}vw`;
    });
  };

  // ---------- stage transitions ----------
  const toStage1 = () => {
    if (animating) return;
    setAnimating(true);
    move(itemElsRef.current, -DIST);
    setTimeout(() => {
      setItemStage(1);
      setAnimating(false);
    }, DUR);
  };

  const toStage2 = () => {
    if (animating) return;
    setAnimating(true);
    move(itemElsRef.current, -2 * DIST - GAP);
    move(centerElsRef.current, -DIST - GAP);
    setTimeout(() => {
      setItemStage(2);
      setCenterStage(1);
      setAnimating(false);
    }, DUR + STAGGER);
  };

  const backToStage1 = () => {
    if (animating) return;
    setAnimating(true);
    move(centerElsRef.current, 0);
    move(itemElsRef.current, -DIST);
    setTimeout(() => {
      setCenterStage(0);
      setItemStage(1);
      setAnimating(false);
    }, DUR + STAGGER);
  };

  const backToStage0 = () => {
    if (animating) return;
    setAnimating(true);
    move(itemElsRef.current, 0);
    setTimeout(() => {
      setItemStage(0);
      setAnimating(false);
    }, DUR);
  };

  // ---------- click‑zone handler ----------
  useEffect(() => {
    const FWD_MIN = 94,
      FWD_MAX = 100,
      REV_MIN = 32.43,
      REV_MAX = 36,
      TOP_MIN = 28.5,
      TOP_MAX = 84;

    function handleClick(e: MouseEvent) {
      const xVw = (e.clientX / window.innerWidth) * 100;
      const yVh = (e.clientY / window.innerHeight) * 100;

      const inFwd =
        xVw >= FWD_MIN && xVw <= FWD_MAX && yVh >= TOP_MIN && yVh <= TOP_MAX;
      const inRev =
        xVw >= REV_MIN && xVw <= REV_MAX && yVh >= TOP_MIN && yVh <= TOP_MAX;

      if (inFwd) {
        if (itemStage === 0) toStage1();
        else if (itemStage === 1 && centerStage === 0) toStage2();
      } else if (inRev) {
        if (centerStage === 1) backToStage1();
        else if (itemStage === 1 && centerStage === 0) backToStage0();
      }
    }

    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, [itemStage, centerStage]);

  /* ---------- render ---------- */
  return (
    <main className="page">
      {/* account column */}
      <section className="account-column">
        <div className="account-text">Account&nbsp;1</div>
        <div className="account-line" />
        <div className="account-text">Account&nbsp;2</div>
        <div className="account-line" />
        {/* … more accounts … */}
      </section>

      {/* item column */}
      <section className="item-column">
        <div className="item-text">Item&nbsp;A</div>
        <div className="item-line" />
        <div className="item-text">Item&nbsp;B</div>
        <div className="item-line" />
        {/* … more items … */}
      </section>

      {/* centre column */}
      <section className="center-column">
        <div className="center-text">Centre&nbsp;X</div>
        <div className="center-line" />
        <div className="center-text">Centre&nbsp;Y</div>
        <div className="center-line" />
        {/* … more centres … */}
      </section>
    </main>
  );
};

export default IOULPage;