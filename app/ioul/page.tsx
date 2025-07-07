"use client";

import React, { useEffect } from "react";
import "./globals.css";

export default function IOULPage() {
  useEffect(() => {
    // Fade in
    const pageContent = document.querySelector<HTMLElement>(".page-content");
    if (pageContent) pageContent.style.opacity = "1";

    const FWD_MIN = 94, FWD_MAX = 100;
    const TOP_MIN = 28.5, TOP_MAX = 84;
    const DIST = 60, GAP = 10, DUR = 600;

    const toVw = (px: number) => px / (window.innerWidth / 100);
    const toVh = (px: number) => px / (window.innerHeight / 100);

    const itemEls = Array.from(document.querySelectorAll<HTMLElement>(".item-text, .item-line"));
    const centerEls = Array.from(document.querySelectorAll<HTMLElement>(".center-text, .center-line"));
    const accountEls = Array.from(document.querySelectorAll<HTMLElement>(".account-text, .account-line"));

    [...itemEls, ...centerEls, ...accountEls].forEach(el => {
      const leftPx = parseFloat(getComputedStyle(el).left) || 0;
      el.dataset.baseLeftVw = String(toVw(leftPx));
    });

    let stage = 0;
    let animating = false;

    function moveGroup(els: HTMLElement[], offset: number) {
      els.forEach(el => {
        const base = parseFloat(el.dataset.baseLeftVw!);
        el.style.transition = `left ${DUR}ms ease`;
        el.style.left = `${base + offset}vw`;
      });
    }

    function handleForward() {
      if (animating) return;
      animating = true;
      stage = (stage + 1) % 3; // 0,1,2

      switch (stage) {
        case 1:
          moveGroup(itemEls, -DIST);
          break;
        case 2:
          moveGroup(itemEls, -2 * DIST - GAP);
          moveGroup(centerEls, -DIST - GAP);
          break;
        default:
          moveGroup(itemEls, 0);
          moveGroup(centerEls, 0);
          break;
      }

      setTimeout(() => { animating = false; }, DUR);
    }

    document.addEventListener("click", (e) => {
      const xVw = toVw(e.clientX);
      const yVh = toVh(e.clientY);
      if (xVw >= FWD_MIN && xVw <= FWD_MAX && yVh >= TOP_MIN && yVh <= TOP_MAX) {
        handleForward();
        e.stopPropagation();
      }
    }, true);
  }, []);

  return (
    <>
      <div className="layer-one" />
      <div className="layer-two" />
      <div className="layer-three" />

      <div className="page-content">
        {/* existing structure */}
        <div className="slide-container">
          {/* account */}
          {/* item-lines */}
          {/* center-lines */}
          {/* center-texts */}
          {/* item-texts */}
        </div>
      </div>
    </>
  );
}
