"use client";
import "./styles.css";

import React, { useEffect, useRef } from "react";

const IOULPage: React.FC = () => {
  // Add fullscreen body class
  useEffect(() => {
    document.body.classList.add("non-fullscreen");
  }, []);

  // Edge fullscreen toggle
  useEffect(() => {
    const EDGE = 11;
    const clickEdge = (e: MouseEvent) => {
      const { clientX: x, clientY: y } = e;
      const { innerWidth: w, innerHeight: h } = window;
      const onEdge = x <= EDGE || x >= w - EDGE || y <= EDGE || y >= h - EDGE;
      if (!onEdge) return;
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(() => {});
      } else {
        document.exitFullscreen().catch(() => {});
      }
    };
    const fsChange = () =>
      document.body.classList.toggle("non-fullscreen", !document.fullscreenElement);

    document.addEventListener("click", clickEdge);
    document.addEventListener("fullscreenchange", fsChange);
    return () => {
      document.removeEventListener("click", clickEdge);
      document.removeEventListener("fullscreenchange", fsChange);
    };
  }, []);

  // Scroll logic on single wrapper instead of individual cells
  const wrapperRef = useRef<HTMLDivElement>(null);
  const scrollIndex = useRef(0); // 0..2

  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const wrap = wrapperRef.current;
      if (!wrap) return;

      const clamp = (v: number, min: number, max: number) =>
        Math.min(Math.max(v, min), max);
      const dir = e.deltaY > 0 ? 1 : -1;
      scrollIndex.current = clamp(scrollIndex.current + dir, 0, 2);
      const offset = -55.5 * scrollIndex.current; // vh
      wrap.style.transition = "transform 0.7s ease";
      wrap.style.transform = `translateY(${offset}vh)`;
    };
    window.addEventListener("wheel", onWheel, { passive: false });
    return () => window.removeEventListener("wheel", onWheel);
  }, []);

  return (
    <div className="non-fullscreen" translate="no">
      {/* mask layers */}
      <div className="layer-one" />
      <div className="layer-two" />
      <div className="layer-three" />
      <div className="layer-four" />
      <div className="layer-five" />
      <div className="layer-six" />

      {/* timeline + calendar */}
      <div className="other-content">
        {/* timeline guides */}
        <div className="line original" />
        <div className="line second" />
        <div className="line util-line" />
        <div className="line third" />
        <div className="line fourth" />

        {/* calendar wrapper */}
        <div className="calendar-wrapper" ref={wrapperRef}>
          {/* 1‑31 numbers */}
          {Array.from({ length: 31 }, (_, i) => (
            <span
              key={`num${i + 1}`}
              className={`grid-number num${i + 1}`}
              style={{ display: "inline-block" }}
            >
              {i + 1}
            </span>
          ))}

          {/* dashed rows */}
          {Array.from({ length: 31 }, (_, i) => (
            <span
              key={`dash${i + 1}`}
              className={`grid-dashed dashed${String(i + 1).padStart(2, "0")}`}
              style={{ display: "inline-block" }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default IOULPage;