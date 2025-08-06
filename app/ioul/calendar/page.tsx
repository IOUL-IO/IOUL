"use client";
import "./styles.css";
import React, { useEffect, useRef } from "react";

/**
 * IOUL Calendar • deploy‑safe
 *  - No data‑util logic
 *  - Lines kept: original, second, util‑line, third, fourth
 *  - DOM order puts layer‑five/six AFTER the grid
 */

const IOULPage: React.FC = () => {
  useEffect(() => {
    document.body.classList.add("non-fullscreen");
    return () => document.body.classList.remove("non-fullscreen");
  }, []);

  // Edge click toggles fullscreen
  useEffect(() => {
    const EDGE = 11;
    const onClick = (e: MouseEvent) => {
      const { clientX: x, clientY: y } = e;
      const { innerWidth: w, innerHeight: h } = window;
      const nearEdge = x <= EDGE || x >= w - EDGE || y <= EDGE || y >= h - EDGE;
      if (!nearEdge) return;
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(() => {});
      } else {
        document.exitFullscreen().catch(() => {});
      }
    };
    const onFs = () => {
      document.body.classList.toggle("non-fullscreen", !document.fullscreenElement);
    };
    document.addEventListener("click", onClick);
    document.addEventListener("fullscreenchange", onFs);
    return () => {
      document.removeEventListener("click", onClick);
      document.removeEventListener("fullscreenchange", onFs);
    };
  }, []);

  // Scroll the calendar grid (3 pages)
  const scrollIdxRef = useRef(0);
  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const els = Array.from(document.querySelectorAll<HTMLElement>(".grid-number, .grid-dashed"));
      if (!els.length) return;
      const clamp = (v: number, mn: number, mx: number) => Math.min(Math.max(v, mn), mx);
      const dir = e.deltaY > 0 ? 1 : -1;
      scrollIdxRef.current = clamp(scrollIdxRef.current + dir, 0, 2);
      const offset = -55.5 * scrollIdxRef.current;
      els.forEach((el) => {
        el.style.transition = "transform 0.7s ease";
        el.style.transform = `translateY(${offset}vh)`;
      });
    };
    window.addEventListener("wheel", onWheel, { passive: false });
    return () => window.removeEventListener("wheel", onWheel);
  }, []);

  return (
    <div className="non-fullscreen" translate="no">
      {/* fixed side stripes */}
      <div className="layer-one" />
      <div className="layer-two" />
      <div className="layer-three" />

      {/* stage */}
      <div className="layer-four" />

      {/* content */}
      <div className="other-content">
        <div className="line original" />
        <div className="line second" />
        <div className="line util-line" />
        <div className="line third" />
        <div className="line fourth" />

        {Array.from({ length: 31 }, (_, i) => (
          <span key={`n${i+1}`} className={`grid-number num${i+1}`}>{i+1}</span>
        ))}
        {Array.from({ length: 31 }, (_, i) => (
          <span key={`d${i+1}`} className={`grid-dashed dashed${String(i+1).padStart(2,"0")}`} />
        ))}
      </div>

      {/* overlay masks AFTER content so they paint on top */}
      <div className="layer-five" />
      <div className="layer-six" />
    </div>
  );
};

export default IOULPage;