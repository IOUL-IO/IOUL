"use client";
import "./styles.css";
import React, { useEffect, useRef } from "react";

const IOULPage: React.FC = () => {
  /* ───────────────── edge-click full-screen toggle ───────────────── */
  useEffect(() => {
    document.body.classList.add("non-fullscreen");            // start zoomed-out

    const onFsChange = () => {
      if (document.fullscreenElement)
        document.body.classList.remove("non-fullscreen");      // zoom-in
      else
        document.body.classList.add("non-fullscreen");         // zoom-out
    };
    document.addEventListener("fullscreenchange", onFsChange);

    const EDGE = 11;
    const onClick = (e: MouseEvent) => {
      const { clientX: x, clientY: y } = e;
      const { innerWidth: w, innerHeight: h } = window;
      const near = x <= EDGE || x >= w - EDGE || y <= EDGE || y >= h - EDGE;
      if (!near) return;

      if (document.fullscreenElement)
        document.exitFullscreen().catch(() => {});
      else
        document.documentElement.requestFullscreen().catch(() => {});
    };
    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("fullscreenchange", onFsChange);
      document.removeEventListener("click", onClick);
    };
  }, []);

  /* ───────────────── calendar grid scroll (3 pages) ───────────────── */
  const idxRef = useRef(0);
  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const els = document.querySelectorAll<HTMLElement>(
        ".grid-number, .grid-dashed"
      );
      if (!els.length) return;

      const dir = e.deltaY > 0 ? 1 : -1;
      idxRef.current = Math.max(0, Math.min(2, idxRef.current + dir));
      const offset = -55.5 * idxRef.current; // vh
      els.forEach((el) => {
        el.style.transition = "transform 0.7s ease";
        el.style.transform = `translateY(${offset}vh)`;
      });
    };
    window.addEventListener("wheel", onWheel, { passive: false });
    return () => window.removeEventListener("wheel", onWheel);
  }, []);

  /* ─────────────────────────── render ─────────────────────────────── */
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

      {/* calendar numbers 1-31 */}
      <span className="grid-number num1">1</span><span className="grid-number num2">2</span><span className="grid-number num3">3</span><span className="grid-number num4">4</span><span className="grid-number num5">5</span><span className="grid-number num6">6</span><span className="grid-number num7">7</span><span className="grid-number num8">8</span><span className="grid-number num9">9</span><span className="grid-number num10">10</span><span className="grid-number num11">11</span><span className="grid-number num12">12</span><span className="grid-number num13">13</span><span className="grid-number num14">14</span><span className="grid-number num15">15</span><span className="grid-number num16">16</span><span className="grid-number num17">17</span><span className="grid-number num18">18</span><span className="grid-number num19">19</span><span className="grid-number num20">20</span><span className="grid-number num21">21</span><span className="grid-number num22">22</span><span className="grid-number num23">23</span><span className="grid-number num24">24</span><span className="grid-number num25">25</span><span className="grid-number num26">26</span><span className="grid-number num27">27</span><span className="grid-number num28">28</span><span className="grid-number num29">29</span><span className="grid-number num30">30</span><span className="grid-number num31">31</span>

      {/* dashed rows 01-31 */}
      <span className="grid-dashed dashed01" /><span className="grid-dashed dashed02" /><span className="grid-dashed dashed03" /><span className="grid-dashed dashed04" /><span className="grid-dashed dashed05" /><span className="grid-dashed dashed06" /><span className="grid-dashed dashed07" /><span className="grid-dashed dashed08" /><span className="grid-dashed dashed09" /><span className="grid-dashed dashed10" /><span className="grid-dashed dashed11" /><span className="grid-dashed dashed12" /><span className="grid-dashed dashed13" /><span className="grid-dashed dashed14" /><span className="grid-dashed dashed15" /><span className="grid-dashed dashed16" /><span className="grid-dashed dashed17" /><span className="grid-dashed dashed18" /><span className="grid-dashed dashed19" /><span className="grid-dashed dashed20" /><span className="grid-dashed dashed21" /><span className="grid-dashed dashed22" /><span className="grid-dashed dashed23" /><span className="grid-dashed dashed24" /><span className="grid-dashed dashed25" /><span className="grid-dashed dashed26" /><span className="grid-dashed dashed27" /><span className="grid-dashed dashed28" /><span className="grid-dashed dashed29" /><span className="grid-dashed dashed30" /><span className="grid-dashed dashed31" />
    </div>
  );
};

export default IOULPage;
