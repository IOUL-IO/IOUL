"use client";
import "./styles.css";
import React, { useEffect, useRef } from "react";

const IOULPage: React.FC = () => {
  /* ───────── edge-click full-screen toggle + body.non-fullscreen ───────── */
  useEffect(() => {
    document.body.classList.add("non-fullscreen");        // start zoomed-out

    const onFsChange = () =>
      document.body.classList.toggle("non-fullscreen", !document.fullscreenElement);
    document.addEventListener("fullscreenchange", onFsChange);

    const EDGE = 11;
    const onEdgeClick = (e: MouseEvent) => {
      const { clientX: x, clientY: y } = e;
      const { innerWidth: w, innerHeight: h } = window;
      const near = x <= EDGE || x >= w - EDGE || y <= EDGE || y >= h - EDGE;
      if (!near) return;

      if (document.fullscreenElement)
        document.exitFullscreen().catch(() => {});
      else
        document.documentElement.requestFullscreen().catch(() => {});
    };
    document.documentElement.addEventListener("click", onEdgeClick);

    return () => {
      document.removeEventListener("fullscreenchange", onFsChange);
      document.documentElement.removeEventListener("click", onEdgeClick);
    };
  }, []);

  /* ───────── calendar grid scroll (3 pages) ───────── */
  const pageIdx = useRef(0);
  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const els = document.querySelectorAll<HTMLElement>(
        ".grid-number, .grid-dashed"
      );
      if (!els.length) return;

      const dir = e.deltaY > 0 ? 1 : -1;
      pageIdx.current = Math.max(0, Math.min(2, pageIdx.current + dir));
      const offset = -55.5 * pageIdx.current; // vh
      els.forEach((el) => {
        el.style.transition = "transform 0.7s ease";
        el.style.transform = `translateY(${offset}vh)`;
      });
    };
    window.addEventListener("wheel", onWheel, { passive: false });
    return () => window.removeEventListener("wheel", onWheel);
  }, []);

  /* ───────── render ───────── */
  return (
    <div translate="no">
      {/* masks */}
      <div className="layer-one" /><div className="layer-two" /><div className="layer-three" />
      <div className="layer-four" /><div className="layer-five" /><div className="layer-six" />

      {/* timeline lines */}
      <div className="line original" /><div className="line second" />
      <div className="line util-line" /><div className="line fourth" /><div className="line third" />

      {/* numbers 1-31 */}
      {[...Array(31)].map((_, i) => (
        <span key={i} className={`grid-number num${i + 1}`}>{i + 1}</span>
      ))}

      {/* dashed rows 01-31 */}
      {[...Array(31)].map((_, i) => (
        <span key={i + 100} className={`grid-dashed dashed${String(i + 1).padStart(2, "0")}`} />
      ))}
    </div>
  );
};
export default IOULPage;
