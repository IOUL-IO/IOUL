"use client";

import React, { useEffect, useRef } from "react";
import "./styles.css";

export default function Page() {
  const pageRef = useRef<HTMLDivElement>(null);

  // FADE-IN on first mousemove + CHAT-HOVER logic
  useEffect(() => {
    const page = pageRef.current!;
    page.style.opacity = "0";
    page.style.transition = "opacity 0.7s ease";
    let faded = false;

    const fadeOnFirstMove = () => {
      if (!faded) {
        page.style.opacity = "1";
        faded = true;
        document.removeEventListener("mousemove", fadeOnFirstMove);
      }
    };
    document.addEventListener("mousemove", fadeOnFirstMove);

    const chat = document.getElementById("chatText");
    if (chat) {
      chat.style.pointerEvents = "none";
      chat.style.zIndex = "-1";
      let chatShown = false;
      const hoverArea = document.querySelector(".hover-area") as HTMLElement;

      const onMouse = (e: MouseEvent) => {
        if (!chatShown && faded && hoverArea) {
          const r = hoverArea.getBoundingClientRect();
          if (
            e.clientX >= r.left &&
            e.clientX <= r.right &&
            e.clientY >= r.top &&
            e.clientY <= r.bottom
          ) {
            chat.style.opacity = "1";
            chat.style.pointerEvents = "auto";
            chat.style.zIndex = "10";
            chatShown = true;
          }
        }
      };
      document.addEventListener("mousemove", onMouse);

      return () => {
        document.removeEventListener("mousemove", fadeOnFirstMove);
        document.removeEventListener("mousemove", onMouse);
      };
    }

    return () => {
      document.removeEventListener("mousemove", fadeOnFirstMove);
    };
  }, []);

  // SLIDE logic (stages 0→1→2→1→0)
  useEffect(() => {
    const FWD_MIN = 94,
      FWD_MAX = 100; // forward trigger (right edge)
    const REV_MIN = 32.43,
      REV_MAX = 36; // reverse trigger (left edge)
    const TOP_MIN = 28.5,
      TOP_MAX = 84; // vertical bounds
    const DIST = 60,
      GAP = 10; // horizontal shift in vw
    const DUR = 600,
      STAGGER = 0; // transition durations

    // unit converters
    const vw = () => window.innerWidth / 100;
    const vh = () => window.innerHeight / 100;
    const toVw = (px: number) => px / vw();
    const toVh = (px: number) => px / vh();

    const container = pageRef.current!;

    // collect all the “items” and “centers”
    const itemEls = [
      ...container.querySelectorAll<HTMLElement>(".item-text"),
      ...container.querySelectorAll<HTMLElement>(".item-line"),
    ];
    const centerEls = [
      ...container.querySelectorAll<HTMLElement>(".center-text"),
      ...container.querySelectorAll<HTMLElement>(".center-line"),
    ];

    // cache each element’s baseLeftVw
    ;[...itemEls, ...centerEls].forEach((el) => {
      if (!el.dataset.baseLeftVw) {
        const leftPx = parseFloat(getComputedStyle(el).left) || 0;
        el.dataset.baseLeftVw = String(toVw(leftPx));
      }
    });

    let itemStage = 0;
    let centerStage = 0;
    let animating = false;

    // if you expand “account” later, keep this
    const getAccountSlid = () => {
      const acc = container.querySelector<HTMLElement>(".account-text");
      return acc?.dataset.slid === "true";
    };

    function move(els: HTMLElement[], offset: number) {
      els.forEach((el) => {
        const base = parseFloat(el.dataset.baseLeftVw || "0");
        el.style.transition = `left ${DUR}ms ease`;
        el.style.left = base + offset + "vw";
      });
    }

    function toStage1() {
      animating = true;
      move(itemEls, -DIST);
      setTimeout(() => {
        animating = false;
        itemStage = 1;
      }, DUR);
    }
    function toStage2() {
      animating = true;
      move(itemEls, -2 * DIST - GAP);
      move(centerEls, -DIST - GAP);
      setTimeout(() => {
        animating = false;
        itemStage = 2;
        centerStage = 1;
      }, DUR + STAGGER);
    }
    function backToStage1() {
      animating = true;
      move(centerEls, 0);
      move(itemEls, -DIST);
      setTimeout(() => {
        animating = false;
        itemStage = 1;
        centerStage = 0;
      }, DUR + STAGGER);
    }
    function backToStage0() {
      animating = true;
      move(itemEls, 0);
      setTimeout(() => {
        animating = false;
        itemStage = 0;
      }, DUR);
    }

    const onClick = (e: MouseEvent) => {
      if (animating) return;
      const xVw = toVw(e.clientX),
        yVh = toVh(e.clientY);
      const inFwd =
        xVw >= FWD_MIN && xVw <= FWD_MAX && yVh >= TOP_MIN && yVh <= TOP_MAX;
      const inRev =
        xVw >= REV_MIN && xVw <= REV_MAX && yVh >= TOP_MIN && yVh <= TOP_MAX;

      if (inFwd) {
        if (getAccountSlid()) return;
        if (itemStage === 0) {
          toStage1();
          e.stopPropagation();
        } else if (itemStage === 1 && centerStage === 0) {
          toStage2();
          e.stopPropagation();
        }
      } else if (inRev) {
        if (centerStage === 1) {
          backToStage1();
          e.stopPropagation();
        } else if (itemStage === 1 && centerStage === 0) {
          backToStage0();
          e.stopPropagation();
        }
      }
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  return (
    <>
      <p style={{ display: "none" }} lang="en">
        This page is already in English. No translation is needed.
      </p>

      <div className="layer-one"></div>
      <div className="layer-two"></div>
      <div className="layer-three"></div>

      <div ref={pageRef} className="page-content">
        {/* full JSX content as shared previously */}
      </div>

      <div className="slide-trigger-reverse"></div>
      <div className="slide-trigger"></div>
    </>
  );
}
