"use client";
import "./styles.css";
import React, { useEffect, useRef } from "react";

const IOULPage: React.FC = () => {
  /* ─ Add/remove body.non-fullscreen for smooth transition ─ */
  useEffect(() => {
    document.body.classList.add("non-fullscreen");
    const onFsChange = () => {
      if (document.fullscreenElement) {
        document.body.classList.remove("non-fullscreen");
      } else {
        document.body.classList.add("non-fullscreen");
      }
    };
    document.addEventListener("fullscreenchange", onFsChange);
    return () => document.removeEventListener("fullscreenchange", onFsChange);
  }, []);

  /* ─ Edge‑click fullscreen toggle ─ */
  useEffect(() => {
    const EDGE = 11; // px from any edge
    const onClick = (e: MouseEvent) => {
      const near =
        e.clientX <= EDGE ||
        e.clientX >= window.innerWidth - EDGE ||
        e.clientY <= EDGE ||
        e.clientY >= window.innerHeight - EDGE;
      if (!near) return;
      if (document.fullscreenElement) {
        document.exitFullscreen().catch(() => {});
      } else {
        document.documentElement.requestFullscreen().catch(() => {});
      }
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  /* ─ Calendar grid scroll ─ */
  const idxRef = useRef(0);
  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const els = document.querySelectorAll<HTMLElement>(".grid-number, .grid-dashed");
      if (!els.length) return;
      const dir = e.deltaY > 0 ? 1 : -1;
      idxRef.current = Math.max(0, Math.min(2, idxRef.current + dir));
      const offset = -55.5 * idxRef.current;
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

      {/* calendar numbers 1‑31 */}
      <span className="grid-number num1">1</span>
      <span className="grid-number num2">2</span>
      <span className="grid-number num3">3</span>
      <span className="grid-number num4">4</span>
      <span className="grid-number num5">5</span>
      <span className="grid-number num6">6</span>
      <span className="grid-number num7">7</span>
      <span className="grid-number num8">8</span>
      <span className="grid-number num9">9</span>
      <span className="grid-number num10">10</span>
      <span className="grid-number num11">11</span>
      <span className="grid-number num12">12</span>
      <span className="grid-number num13">13</span>
      <span className="grid-number num14">14</span>
      <span className="grid-number num15">15</span>
      <span className="grid-number num16">16</span>
      <span className="grid-number num17">17</span>
      <span className="grid-number num18">18</span>
      <span className="grid-number num19">19</span>
      <span className="grid-number num20">20</span>
      <span className="grid-number num21">21</span>
      <span className="grid-number num22">22</span>
      <span className="grid-number num23">23</span>
      <span className="grid-number num24">24</span>
      <span className="grid-number num25">25</span>
      <span className="grid-number num26">26</span>
      <span className="grid-number num27">27</span>
      <span className="grid-number num28">28</span>
      <span className="grid-number num29">29</span>
      <span className="grid-number num30">30</span>
      <span className="grid-number num31">31</span>

      {/* dashed rows 01‑31 */}
      {Array.from({ length: 31 }, (_, i) => (
        <span key={`dash${i + 1}`} className={`grid-dashed dashed${String(i + 1).padStart(2, "0")}`} />
      ))}
    </div>
  );
};

export default IOULPage;
