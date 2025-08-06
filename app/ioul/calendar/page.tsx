"use client";
import "./styles.css";
import React, { useEffect, useRef } from "react";

/**
 * IOULPage  • 2025‑08‑06
 * --------------------------------------------------
 * • Removes ALL data‑util logic.
 * • Deletes original timeline lines 5 & 6.
 * • Keeps util‑line (mini helper line).
 * • Calendar grid (numbers + dashed rows) is always
 *   visible, scrollable and layered:
 *       layer‑four  (z‑index 2)
 *         < calendar grid (z‑index 3)
 *         < layer‑five / layer‑six (z‑index 4)
 *         < timeline line‑4 (z‑index 120)
 * --------------------------------------------------
 */

const IOULPage: React.FC = () => {
  /* 1 ▸ mark non‑fullscreen view */
  useEffect(() => {
    document.body.classList.add("non-fullscreen");
  }, []);

  /* 2 ▸ edge‑click full‑screen toggle (unchanged) */
  useEffect(() => {
    const EDGE = 11; // px
    const handleClick = (e: MouseEvent) => {
      const { clientX: x, clientY: y } = e;
      const { innerWidth: w, innerHeight: h } = window;
      const nearEdge =
        x <= EDGE || x >= w - EDGE || y <= EDGE || y >= h - EDGE;
      if (!nearEdge) return;

      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(() => {});
      } else {
        document.exitFullscreen().catch(() => {});
      }
    };

    const onFsChange = () => {
      document.body.classList.toggle(
        "non-fullscreen",
        !document.fullscreenElement
      );
    };

    document.addEventListener("click", handleClick);
    document.addEventListener("fullscreenchange", onFsChange);
    return () => {
      document.removeEventListener("click", handleClick);
      document.removeEventListener("fullscreenchange", onFsChange);
    };
  }, []);

  /* 3 ▸ calendar grid vertical scroll (3 pages) */
  const scrollIdxRef = useRef(0);
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const els = Array.from(
        document.querySelectorAll<HTMLElement>(".grid-number, .grid-dashed")
      );
      if (!els.length) return;

      const clamp = (v: number, min: number, max: number) =>
        Math.min(Math.max(v, min), max);

      const dir = e.deltaY > 0 ? 1 : -1;
      scrollIdxRef.current = clamp(scrollIdxRef.current + dir, 0, 2);
      const offset = -55.5 * scrollIdxRef.current; // vh units

      els.forEach((el) => {
        el.style.transition = "transform 0.7s ease";
        el.style.transform = `translateY(${offset}vh)`;
      });
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, []);

  /* 4 ▸ render */
  return (
    <div className="non-fullscreen" translate="no">
      {/* mask layers */}
      <div className="layer-one" />
      <div className="layer-two" />
      <div className="layer-three" />
      <div className="layer-four" />
      <div className="layer-five" />
      <div className="layer-six" />

      {/* main content */}
      <div className="other-content">
        {/* timeline lines (lines 5‑6 removed) */}
        <div className="line original" />
        <div className="line second" />
        <div className="line util-line" />
        <div className="line third" />
        <div className="line fourth" />

        {/* calendar grid numbers 1‑31 */}
        {Array.from({ length: 31 }, (_, i) => (
          <span
            key={`num${i + 1}`}
            className={`grid-number num${i + 1}`}
            style={{ display: "inline-block" }}
          >
            {i + 1}
          </span>
        ))}

        {/* dashed grid rows 01‑31 */}
        {Array.from({ length: 31 }, (_, i) => (
          <span
            key={`dash${i + 1}`}
            className={`grid-dashed dashed${String(i + 1).padStart(2, "0")}`}
            style={{ display: "inline-block" }}
          />
        ))}
      </div>
    </div>
  );
};

export default IOULPage;