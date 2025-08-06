
"use client";
import "./styles.css";
import React, { useEffect, useRef } from "react";

const IOULPage: React.FC = () => {
  /* ─ Edge-click fullscreen ─ */
  useEffect(() => {
    const EDGE = 11;
    const toggleFS = (e: MouseEvent) => {
      const { clientX: x, clientY: y } = e;
      const { innerWidth: w, innerHeight: h } = window;
      if (x > EDGE && x < w - EDGE && y > EDGE && y < h - EDGE) return;
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(() => {});
      } else {
        document.exitFullscreen().catch(() => {});
      }
    };
    document.addEventListener("click", toggleFS);
    return () => document.removeEventListener("click", toggleFS);
  }, []);

  /* ─ Inject timeline line‑4 directly into <body> to bypass every stacking context ─ */
  useEffect(() => {
    const line = document.createElement("div");
    line.id = "timeline-line4";
    Object.assign(line.style, {
      position: "fixed",
      top: "12.5vh",
      left: "36vw",
      width: "57.8vw",
      height: "1px",
      background: "rgba(172,172,172,0.84)",
      zIndex: "2147483647",
      pointerEvents: "none",
    });
    document.body.appendChild(line);
    return () => {
      document.body.removeChild(line);
    };
  }, []);

  /* ─ 3‑step scroll for calendar grid ─ */
  const idxRef = useRef(0);
  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const els = document.querySelectorAll<HTMLElement>(".grid-number, .grid-dashed");
      if (!els.length) return;
      idxRef.current = Math.max(0, Math.min(2, idxRef.current + (e.deltaY > 0 ? 1 : -1)));
      const offset = -55.5 * idxRef.current;
      els.forEach(el => {
        el.style.transition = "transform 0.7s ease";
        el.style.transform = `translateY(${offset}vh)`;
      });
    };
    window.addEventListener("wheel", onWheel, { passive: false });
    return () => window.removeEventListener("wheel", onWheel);
  }, []);

  /* ─ render masks, grid, and lines 1‑3 ─ */
  return (
    <div translate="no">
      {/* masks */}
      <div className="layer-one" />
      <div className="layer-two" />
      <div className="layer-three" />
      <div className="layer-four" />
      <div className="layer-five" />
      <div className="layer-six" />

      {/* timeline lines 1‑3 only (line‑4 handled via portal) */}
      <div className="line original" />
      <div className="line second" />
      <div className="line third" />

      {/* calendar grid */}
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
