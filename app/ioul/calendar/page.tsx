'use client';
import './styles.css';
import React, { useEffect, useRef } from 'react';

export default function Page() {
  /* ---------- Full‑screen edge toggle ---------- */
  useEffect(() => {
    const EDGE = 11; // px from browser edge
    const handler = (e) => {
      const { clientX: x, clientY: y } = e;
      const { innerWidth: w, innerHeight: h } = window;
      if (!document.fullscreenElement &&
          (x <= EDGE || x >= w - EDGE || y <= EDGE || y >= h - EDGE)) {
        document.documentElement.requestFullscreen().catch(() => {});
      }
    };
    window.addEventListener('click', handler);
    return () => window.removeEventListener('click', handler);
  }, []);

  /* ---------- Two‑step vertical scroll ---------- */
  const scrolling = useRef(false);
  const second = useRef(false);

  useEffect(() => {
    const handleWheel = (e) => {
      e.preventDefault();                 // keep window from scrolling
      if (scrolling.current) return;      // debounce
      scrolling.current = true;
      setTimeout(() => (scrolling.current = false), 700);

      const els = Array.from(
        document.querySelectorAll('.grid-number, .grid-dashed')
      );
      els.forEach(el => (el.style.transition = 'transform 0.7s ease'));

      // three positions: 0 ► −55.5vh ► −111vh
      if (e.deltaY > 0) {
        if (!second.current) {
          els.forEach(el => (el.style.transform = 'translateY(-55.5vh)'));
          second.current = true;
        } else {
          els.forEach(el => (el.style.transform = 'translateY(-111vh)'));
        }
      } else {
        const yMatch = els[0]?.style.transform.match(/([-\\d.]+)vh/);
        const y = yMatch ? yMatch[1] : '0';
        if (y === '-111') {
          els.forEach(el => (el.style.transform = 'translateY(-55.5vh)'));
        } else if (y === '-55.5') {
          els.forEach(el => (el.style.transform = 'translateY(0)'));
          second.current = false;
        }
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, []);

  /* ---------- Calendar markup (numbers + dashed rules) ---------- */
  const numbers = Array.from({ length: 31 }, (_, i) => i + 1);

  return (
    <div className="stage">
      {/* Guide lines 1‑4 & util‑line (line 5‑6 removed) */}
      <div className="line original" />
      <div className="line second" />
      <div className="line third" />
      <div className="line fourth" />
      <div className="line util-line" />

      {/* Calendar grid numbers */}
      {numbers.map(n => (
        <span key={n} className={`grid-number num${n}`}>{n}</span>
      ))}

      {/* Horizontal dashed rules */}
      {numbers.map(n => (
        <span key={n} className={`grid-dashed dashed${String(n).padStart(2,'0')}`} />
      ))}
    </div>
  );
}