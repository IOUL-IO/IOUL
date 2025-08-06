"use client";
import "./styles.css";
import React, { useEffect, useRef } from "react";

/**
 * IOUL calendar page
 * – calendar grid must scroll under masks 5-6
 * – original timeline line 4 stays on top
 */

const IOULPage: React.FC = () => {
  /* ── edge-click full-screen toggle ───────────────────────────── */
  useEffect(() => {
    const EDGE = 11; // px from any edge
    const onClick = (e: MouseEvent) => {
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
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  /* ── 3-page vertical scroll for the grid ─────────────────────── */
  const idxRef = useRef(0); // 0-2
  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const els = document.querySelectorAll<HTMLElement>(
        ".grid-number, .grid-dashed"
      );
      if (!els.length) return;

      const dir = e.deltaY > 0 ? 1 : -1;
      idxRef.current = Math.max(0, Math.min(2, idxRef.current + dir));
      const offset = -55.5 * idxRef.current; // vh units

      els.forEach((el) => {
        el.style.transition = "transform 0.7s ease";
        el.style.transform = `translateY(${offset}vh)`;
      });
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    return () => window.removeEventListener("wheel", onWheel);
  }, []);

  return (
    <div translate="no">
      {/* ── masks ───────────────────────────────────────────────── */}
      <div className="layer-one" />
      <div className="layer-two" />
      <div className="layer-three" />
      <div className="layer-four" />
      <div className="layer-five" />
      <div className="layer-six" />

      {/* ── timeline lines (1-4) ───────────────────────────────── */}
      <div className="line original" />
      <div className="line second" />
      <div className="line third" />
      <div className="line fourth" />

      {/* ── calendar grid ──────────────────────────────────────── */}
      {Array.from({ length: 31 }, (_, i) => (
        <span key={`n${i + 1}`} className={`grid-number num${i + 1}`}>
          {i + 1}
        </span>
      ))}
      {Array.from({ length: 31 }, (_, i) => (
        <span
          key={`d${i + 1}`}
          className={`grid-dashed dashed${String(i + 1).padStart(2, "0")}`}
        />
      ))}
    </div>
  );
};

export default IOULPage;
