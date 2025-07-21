
import React, { useEffect, useRef, useState } from 'react';

/**
 * Calendar grid scroll component
 * - Stage 0 : rows 1‑16 in view (translateY 0)
 * - Stage 1 : rows 13‑28 in view (translateY -55.5vh)
 * - Stage 2 : rows 25‑31 in view (translateY -111vh)
 *
 * Mouse‑wheel ↓ moves one stage forward (until stage 2 – then no‑op)
 * Mouse‑wheel ↑ moves one stage back   (until stage 0 – then no‑op)
 *
 * NOTE: .calendar-grid elements must have `transition: transform 0.7s ease` in CSS.
 */
const CalendarGridScroller: React.FC = () => {
  /** 0 → 1 → 2 */
  const [gridStage, setGridStage] = useState<number>(0);
  const gridStageRef = useRef<number>(0);

  /** prevent rapid consecutive wheel events during animation */
  const [isScrolling, setIsScrolling] = useState<boolean>(false);
  const isScrollingRef = useRef<boolean>(false);

  const gridOffsets = [0, -55.5, -111]; // vh offsets that align with design

  useEffect(() => {
    gridStageRef.current = gridStage;
  }, [gridStage]);

  useEffect(() => {
    isScrollingRef.current = isScrolling;
  }, [isScrolling]);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      // Prevent page scroll
      e.preventDefault();

      if (isScrollingRef.current) return;

      let nextStage = gridStageRef.current;

      if (e.deltaY > 0 && nextStage < 2) {
        // wheel ↓ and not yet at last stage
        nextStage += 1;
      } else if (e.deltaY < 0 && nextStage > 0) {
        // wheel ↑ and not yet at first stage
        nextStage -= 1;
      } else {
        // either trying to scroll past ends – ignore
        return;
      }

      // Update state and apply transform
      setGridStage(nextStage);
      const translate = gridOffsets[nextStage];

      // Select all elements that should move (adjust selector to match your markup)
      const grids = document.querySelectorAll<HTMLElement>('.calendar-grid');
      grids.forEach(el => {
        el.style.transform = `translateY(${translate}vh)`;
      });

      // lock wheel events for the duration of the CSS animation (700 ms)
      setIsScrolling(true);
      setTimeout(() => setIsScrolling(false), 700);
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, []);

  // This component doesn’t render UI – it just wires the wheel logic.
  return null;
};

export default CalendarGridScroller;
