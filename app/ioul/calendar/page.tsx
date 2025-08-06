"use client";
import "./styles.css";

import React, { useEffect, useRef } from "react";

// ─────────────────────────────────────────────────────────────────────────────
//  IOULPage (cleaned)
//  - Removes deprecated data-util logic
//  - Removes original timeline lines 5 & 6
//  - Keeps calendar grid above layer‑four but under layer‑five / layer‑six
//  - Preserves full‑screen edge‑click toggle & calendar scroll
// ─────────────────────────────────────────────────────────────────────────────

const IOULPage: React.FC = () => {
  // 1. Ensure body styles for non‑fullscreen view
  useEffect(() => {
    document.body.classList.add("non-fullscreen");
    return () => document.body.classList.remove("non-fullscreen");
  }, []);

  // 2. Edge‑click full‑screen toggle
  useEffect(() => {
    const EDGE_MARGIN = 11; // px from each edge
    const handleClick = (e: MouseEvent) => {
      const { clientX: x, clientY: y } = e;
      const { innerWidth: w, innerHeight: h } = window;
      const nearEdge =
        x <= EDGE_MARGIN ||
        x >= w - EDGE_MARGIN ||
        y <= EDGE_MARGIN ||
        y >= h - EDGE_MARGIN;
      if (!nearEdge) return;

      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(() => {});
      } else {
        document.exitFullscreen().catch(() => {});
      }
    };

    const onFsChange = () => {
      document.body.classList.toggle("non-fullscreen", !document.fullscreenElement);
    };

    document.addEventListener("click", handleClick);
    document.addEventListener("fullscreenchange", onFsChange);
    return () => {
      document.removeEventListener("click", handleClick);
      document.removeEventListener("fullscreenchange", onFsChange);
    };
  }, []);

  // 3. Calendar grid scroll (3 vertical pages)
  const scrollIdxRef = useRef(0); // 0, 1, 2
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

  // 4. Render layout
  return (
    <div className="non-fullscreen" translate="no">
      {/* mask layers */}
      <div className="layer-one" />
      <div className="layer-two" />
      <div className="layer-three" />
      <div className="layer-four" />
      <div className="layer-five" />
      <div className="layer-six" />

      {/* content */}
      <div className="other-content">
        {/* timeline lines (1‑4 + util) */}
        <div className="line original" />
        <div className="line second" />
        <div className="line third" />
        <div className="line util-line" />
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