'use client';

import React, { useEffect, useRef, useState } from 'react';

/**
 * Slide controller for three ribbons:
 * 1. Account banner – unchanged behaviour, but only allowed when items+center reset.
 * 2. Items ribbon    – two‑step slide in/out.
 * 3. Center ribbon   – appears on second forward click, leaves first on reverse.
 *
 * Stage diagram:
 *   stage 0  items off‑screen ≥ 96vw, center off‑screen ≥ 106vw
 *   stage 1  items at 36vw
 *   stage 2  items hidden (<6.41vw), center at 36vw
 */

const DIST = 60;          // vw – 1st hop
const GAP  = 10;          // vw – extra hop 1→2
const DUR  = 600;         // ms – animation duration
const HIDE_MIN = 6.41;
const HIDE_MAX = 28.86;

const toVw = (px: number) => (px / window.innerWidth) * 100;

export default function IoulPage() {
  const accountElsRef = useRef<NodeListOf<HTMLElement> | null>(null);
  const itemElsRef    = useRef<NodeListOf<HTMLElement> | null>(null);
  const centerElsRef  = useRef<NodeListOf<HTMLElement> | null>(null);

  const [stage, setStage] = useState<0 | 1 | 2>(0);
  const [accountSlid, setAccountSlid] = useState(false);

  // -------------------------------------------------------------------------
  // Collect element lists and stamp base positions
  // -------------------------------------------------------------------------
  useEffect(() => {
    accountElsRef.current = document.querySelectorAll<HTMLElement>('.account-text, .account-line');
    itemElsRef.current    = document.querySelectorAll<HTMLElement>('.item-text, .item-line');
    centerElsRef.current  = document.querySelectorAll<HTMLElement>('.center-text, .center-line');

    const stamp = (els: NodeListOf<HTMLElement> | null) => {
      if (!els) return;
      els.forEach(el => {
        if (!el.dataset.baseLeftVw) {
          const leftPx = parseFloat(getComputedStyle(el).left) || 0;
          el.dataset.baseLeftVw = toVw(leftPx).toString();
        }
      });
    };
    stamp(accountElsRef.current);
    stamp(itemElsRef.current);
    stamp(centerElsRef.current);
  }, []);

  // -------------------------------------------------------------------------
  // Move helper
  // -------------------------------------------------------------------------
  const move = (els: NodeListOf<HTMLElement> | null, offset: number) => {
    if (!els) return;
    els.forEach(el => {
      const base = parseFloat(el.dataset.baseLeftVw || '0');
      el.style.transition = `left ${DUR}ms ease`;
      el.style.left = `${base + offset}vw`;
    });
  };

  // -------------------------------------------------------------------------
  // Visibility mask for items ribbon
  // -------------------------------------------------------------------------
  useEffect(() => {
    let raf: number;
    const tick = () => {
      const els = itemElsRef.current;
      if (els) {
        els.forEach(el => {
          const rect = el.getBoundingClientRect();
          const l = toVw(rect.left);
          const hide = l >= HIDE_MIN && l < HIDE_MAX;
          el.style.opacity = hide ? '0' : '1';
          el.style.pointerEvents = hide ? 'none' : 'auto';
        });
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  // -------------------------------------------------------------------------
  // Global click listener
  // -------------------------------------------------------------------------
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const vw = toVw(e.clientX);

      // Right edge 94‑100vw  → forward
      if (vw >= 94) {
        if (stage === 0) {
          move(itemElsRef.current, -DIST);          // 0 → 1
          setStage(1);
        } else if (stage === 1) {
          move(itemElsRef.current, -(DIST + GAP));  // 1 → 2
          move(centerElsRef.current, -(DIST + GAP));
          setStage(2);
        }
        return;
      }

      // Left edge 32.43‑36vw  → reverse / account
      if (vw >= 32.43 && vw <= 36) {
        if (stage === 2) {
          move(centerElsRef.current, DIST + GAP);   // 2 → 1
          move(itemElsRef.current,  DIST + GAP);
          setStage(1);
          return;
        }
        if (stage === 1) {
          move(itemElsRef.current, DIST);           // 1 → 0
          setStage(0);
          return;
        }
        // stage === 0 → allow account toggle
        if (stage === 0) {
          if (!accountSlid) {
            move(accountElsRef.current, DIST);
            setAccountSlid(true);
          } else {
            move(accountElsRef.current, -DIST);
            setAccountSlid(false);
          }
        }
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [stage, accountSlid]);

  // -------------------------------------------------------------------------
  // Render – keep your existing markup inside the fragment
  // -------------------------------------------------------------------------
  return <>{/* existing page markup here */}</>;
}