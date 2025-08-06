"use client";
import "./styles.css";
import React, { useEffect, useRef } from "react";

/**
 * IOULPage • Stacking fix 2025‑08‑06
 * ---------------------------------------------
 * • Reorders DOM so top/bottom mask strips
 *   (layer‑five & layer‑six) are rendered *after*
 *   the calendar grid container. Combined with a
 *   high z‑index this guarantees they sit above
 *   the grid even while the grid is transformed.
 * • No other logic changed.
 * ---------------------------------------------
 */

const IOULPage: React.FC = () => {
  /* 1 ▸ body flag */
  useEffect(() => {
    document.body.classList.add("non-fullscreen");
  }, []);

  /* 2 ▸ full‑screen toggle on edge click */
  useEffect(() => {
    const EDGE = 11;
    const handleClick = (e: MouseEvent) => {
      const { clientX: x, clientY: y } = e;
      const { innerWidth: w, innerHeight: h } = window;
      const near = x <= EDGE || x >= w - EDGE || y <= EDGE || y >= h - EDGE;
      if (!near) return;
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(() => {});
      } else {
        document.exitFullscreen().catch(() => {});
      }
    };
    const onFs = () =>
      document.body.classList.toggle("non-fullscreen", !document.fullscreenElement);
    document.addEventListener("click", handleClick);
    document.addEventListener("fullscreenchange", onFs);
    return () => {
      document.removeEventListener("click", handleClick);
      document.removeEventListener("fullscreenchange", onFs);
    };
  }, []);

  /* 3 ▸ grid scroll */
  const idxRef = useRef(0);
  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const els = Array.from(
        document.querySelectorAll<HTMLElement>(".grid-number, .grid-dashed")
      );
      if (!els.length) return;
      const clamp = (v: number, a: number, b: number) => Math.min(Math.max(v, a), b);
      idxRef.current = clamp(idxRef.current + (e.deltaY > 0 ? 1 : -1), 0, 2);
      const y = -55.5 * idxRef.current;
      els.forEach((el) => {
        el.style.transition = "transform 0.7s ease";
        el.style.transform = `translateY(${y}vh)`;
      });
    };
    window.addEventListener("wheel", onWheel, { passive: false });
    return () => window.removeEventListener("wheel", onWheel);
  }, []);

  /* 4 ▸ render */
  return (
    <div className="non-fullscreen" translate="no">
      {/* fixed side strips */}
      <div className="layer-one" />
      <div className="layer-two" />
      <div className="layer-three" />

      {/* stage rectangle */}
      <div className="layer-four" />

      {/* scrollable grid + timeline */}
      <div className="other-content">
        {/* lines */}
        <div className="line original" />
        <div className="line second" />
        <div className="line util-line" />
        <div className="line third" />
        <div className="line fourth" />

        {/* numbers */}
        {Array.from({ length: 31 }, (_, i) => (
          <span key={`n${i+1}`} className={`grid-number num${i+1}`}>
            {i + 1}
          </span>
        ))}

        {/* dashed rows */}
        {Array.from({ length: 31 }, (_, i) => (
          <span
            key={`d${i+1}`}
            className={`grid-dashed dashed${String(i+1).padStart(2,"0")}`}
          />
        ))}
      </div>

      {/* top & bottom white masks – AFTER grid for guaranteed cover */}
      <div className="layer-five" />
      <div className="layer-six" />
    </div>
  );
};

export default IOULPage;