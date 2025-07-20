'use client';

import React, { useEffect, useRef, useState } from 'react';

/**
 * Low‑level slide controller for three independent ribbons:
 *  • account  – unchanged from your original logic
 *  • items    – two‑step slide in/out
 *  • center   – piggy‑backs on the second step
 *
 * The state machine is:
 *    0  (items off, center off)
 *         ⇣   right‑edge click
 *    1  (items @ 36 vw, center off)
 *         ⇣   right‑edge click
 *    2  (items hidden < 6.41 vw, center @ 36 vw)
 *
 *    2  ⇣   left‑edge click
 *    1
 *    1  ⇣   left‑edge click
 *    0
 *
 * Only when stage === 0 can the account banner respond to the same
 * left‑edge click. That prevents the cross‑talk you’d been seeing.
 */

// ---------------------------------------------------------------------------
// constants
// ---------------------------------------------------------------------------
const DIST = 60;      // vw – first hop (items 96 → 36)
const GAP  = 10;      // vw – extra hop (stage 1 → stage 2)
const DUR  = 600;     // ms – animation duration
const HIDE_MIN = 6.41;
const HIDE_MAX = 28.86;

// small util
const toVw = (px: number) => (px / window.innerWidth) * 100;

// ---------------------------------------------------------------------------
// component
// ---------------------------------------------------------------------------
export default function IoulPage() {
  // Refs that hold the NodeLists
  const accountElsRef = useRef<NodeListOf<HTMLElement> | null>(null);
  const itemElsRef    = useRef<NodeListOf<HTMLElement> | null>(null);
  const centerElsRef  = useRef<NodeListOf<HTMLElement> | null>(null);

  // stage: 0 | 1 | 2  (see diagram above)
  const [stage, setStage] = useState<0 | 1 | 2>(0);
  const [accountSlid, setAccountSlid] = useState(false);

  // -------------------------------------------------------------------------
  //  gather elements & cache baseline positions once on mount
  // -------------------------------------------------------------------------
  useEffect(() => {
    accountElsRef.current = document.querySelectorAll<HTMLElement>('.account-text, .account-line');
    itemElsRef.current    = document.querySelectorAll<HTMLElement>('.item-text, .item-line');
    centerElsRef.current  = document.querySelectorAll<HTMLElement>('.center-text, .center-line');

    const stampBase = (els: NodeListOf<HTMLElement> | null) => {
      if (!els) return;
      els.forEach(el => {
        if (!el.dataset.baseLeftVw) {
          const leftPx = parseFloat(getComputedStyle(el).left) || 0;
          el.dataset.baseLeftVw = toVw(leftPx).toString();
        }
      });
    };

    stampBase(accountElsRef.current);
    stampBase(itemElsRef.current);
    stampBase(centerElsRef.current);
  }, []);

  // -------------------------------------------------------------------------
  //  helper to move a group by a relative offset (in vw)
  // -------------------------------------------------------------------------
  const move = (els: NodeListOf<HTMLElement> | null, offset: number) => {
    if (!els) return;
    els.forEach(el => {
      const base = parseFloat(el.style.left || el.dataset.baseLeftVw || '0');
      el.style.transition = `left ${DUR}ms ease`;
      el.style.left = `${base + offset}vw`;
    });
  };

  // -------------------------------------------------------------------------
  //  visibility mask for the items ribbon (runs each animation‑frame)
  // -------------------------------------------------------------------------
  useEffect(() => {
    let rafId: number;
    const loop = () => {
      const els = itemElsRef.current;
      if (els) {
        els.forEach(el => {
          const rect = el.getBoundingClientRect();
          const leftVw = toVw(rect.left);
          const hide = leftVw >= HIDE_MIN && leftVw < HIDE_MAX;
          el.style.opacity = hide ? '0' : '1';
          el.style.pointerEvents = hide ? 'none' : 'auto';
        });
      }
      rafId = requestAnimationFrame(loop);
    };
    rafId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafId);
  }, []);

  // -------------------------------------------------------------------------
  //  click handlers
  // -------------------------------------------------------------------------
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const vw = toVw(e.clientX);

      // ---------------------------------------------------------------------
      //  Right‑edge 94–100 vw  → forward
      // ---------------------------------------------------------------------
      if (vw >= 94) {
        if (stage === 0) {
          // 0 → 1  (items come in)
          move(itemElsRef.current, -DIST);
          setStage(1);
        } else if (stage === 1) {
          // 1 → 2  (items slide left & hide, centre comes in)
          move(itemElsRef.current, -(DIST + GAP));  // -70 vw
          move(centerElsRef.current, -(DIST + GAP)); // -70 vw
          setStage(2);
        }
        return;
      }

      // ---------------------------------------------------------------------
      //  Left‑edge 32.43–36 vw  → reverse
      // ---------------------------------------------------------------------
      if (vw >= 32.43 && vw <= 36) {
        if (stage === 2) {
          // 2 → 1  (centre leaves, items back to 36 vw)
          move(centerElsRef.current, DIST + GAP);  // +70
          move(itemElsRef.current, DIST + GAP);    // +70
          setStage(1);
          return;
        } else if (stage === 1) {
          // 1 → 0  (items off‑screen)
          move(itemElsRef.current, DIST);          // +60
          setStage(0);
          return;
        } else if (stage === 0) {
          // items + centre are reset → allow account banner
          if (!accountSlid) {
            move(accountElsRef.current, DIST);     // account slides in
            setAccountSlid(true);
          } else {
            move(accountElsRef.current, -DIST);    // account slides back
            setAccountSlid(false);
          }
        }
      }
    };

    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, [stage, accountSlid]);

  // -------------------------------------------------------------------------
  // The JSX of your page goes below.  This file only provides behaviour; it
  // does not alter your existing markup or styling.  Keep whatever you had in
  // place of the empty fragment.
  // -------------------------------------------------------------------------
  return <>{/* existing markup remains here */}</>;
}