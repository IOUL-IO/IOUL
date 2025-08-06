"use client";
import "./styles.css";
import React, { useEffect, useRef } from "react";

const IOULPage: React.FC = () => {
  /* Edge‑click fullscreen */
  useEffect(() => {
    const EDGE = 11;
    const onClick = (e: MouseEvent) => {
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
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  
/* non‑fullscreen class toggle */
useEffect(() => {
  document.body.classList.add("non-fullscreen");
  const onFs = () => {
    if (document.fullscreenElement)
      document.body.classList.remove("non-fullscreen");
    else
      document.body.classList.add("non-fullscreen");
  };
  document.addEventListener("fullscreenchange", onFs);
  return () => document.removeEventListener("fullscreenchange", onFs);
}, []);


  /* Calendar grid scroll */
  const idxRef = useRef(0);
  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const els = document.querySelectorAll<HTMLElement>(".grid-number, .grid-dashed");
      if (!els.length) return;
      const dir = e.deltaY > 0 ? 1 : -1;
      idxRef.current = Math.max(0, Math.min(2, idxRef.current + dir));
      const offset = -55.5 * idxRef.current;
      els.forEach(el => {
        el.style.transition = "transform 0.7s ease";
        el.style.transform = `translateY(${offset}vh)`;
      });
    };
    window.addEventListener("wheel", onWheel, { passive: false });
    return () => window.removeEventListener("wheel", onWheel);
  }, []);

  return (
    <div translate="no">
      {/* mask layers */}
      <div className="layer-one" />
      <div className="layer-two" />
      <div className="layer-three" />
      <div className="layer-four" />
      <div className="layer-five" />
      <div className="layer-six" />

      {/* timeline lines */}
      <div className="line original" />
      <div className="line second" />
      <div className="line util-line" />
      <div className="line fourth" />
      <div className="line third" />

      {/* calendar grid */}
      {Array.from({ length: 31 }, (_, i) => (
        <span key={`n${i + 1}`} className={`grid-number num${i + 1}`}>
          {i + 1}
        </span>
      ))}
      {Array.from({ length: 31 }, (_, i) => (
        <span key={`d${i + 1}`} className={`grid-dashed dashed${String(i + 1).padStart(2, "0")}`} />
      ))}
    </div>
  );
};

export default IOULPage;
