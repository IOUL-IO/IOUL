
'use client';
import { useState, useEffect, useRef } from 'react';

/**
 * This version implements a **four‑state** slider:
 *
 *   none    – all groups are off‑screen (initial)
 *   account – account/heading group visible (triggered by ⬅︎ when others are off)
 *   item    – item texts & lines visible (1st ⮕)
 *   center  – center texts & lines visible, item slides further left & is clipped (2nd ⮕)
 *
 *  ⮕  (forwardTrigger) steps RIGHT through the list above.
 *  ⬅︎ (inverseTrigger) steps LEFT through the list above.
 *
 * Rules described by the user:
 *   • Account can only move when item & center are off‑screen.
 *   • Item slides in on 1st ⮕ ; slides further left (clipped) & shows center on 2nd ⮕.
 *   • At any point ⬅︎ only walks one step back.
 */

type SlideStage = 'none' | 'account' | 'item' | 'center';

const SLIDE_DURATION_MS = 600;      // keep everything in sync
const OFFSCREEN_X = '-49vw';
const ITEM_CLIPPED_X = '-28.86vw';
const VISIBLE_X = '0';

/** Convenience to set transform on every HTMLElement in a NodeList */
const setX = (nodes: NodeListOf<HTMLElement>, x: string) => {
  nodes.forEach(el => {
    el.style.transition = `transform ${SLIDE_DURATION_MS}ms ease`;
    el.style.transform  = `translateX(${x})`;
  });
};

export default function IOULPage() {
  const [stage, setStage] = useState<SlideStage>('none');

  const accountRef = useRef<NodeListOf<HTMLElement>>();
  const itemRef    = useRef<NodeListOf<HTMLElement>>();
  const centerRef  = useRef<NodeListOf<HTMLElement>>();

  // Grab the groups once after mount
  useEffect(() => {
    accountRef.current = document.querySelectorAll<HTMLElement>('.account-container[data-slide-group="account"], .custom-line[data-slide-group="heading"]');
    itemRef.current    = document.querySelectorAll<HTMLElement>('.item-text, .item-line');
    centerRef.current  = document.querySelectorAll<HTMLElement>('.center-text, .center-line');
  }, []);

  // Whenever stage changes, push transforms
  useEffect(() => {
    if (!accountRef.current || !itemRef.current || !centerRef.current) return;

    // ACCOUNT ------------------------------
    setX(
      accountRef.current,
      stage === 'account' ? VISIBLE_X : OFFSCREEN_X
    );

    // ITEM ---------------------------------
    setX(
      itemRef.current,
      stage === 'item'   ? VISIBLE_X
      : stage === 'center' ? ITEM_CLIPPED_X
      : OFFSCREEN_X
    );

    // CENTER -------------------------------
    setX(
      centerRef.current,
      stage === 'center' ? VISIBLE_X : OFFSCREEN_X
    );
  }, [stage]);

  /* ---------- trigger handlers ---------- */

  const handleForward = () => {
    setStage(prev => {
      switch (prev) {
        case 'none':    return 'item';    // 1st ⮕
        case 'item':    return 'center';  // 2nd ⮕
        case 'account': return 'none';    // account slides back
        default:        return prev;      // center → no further
      }
    });
  };

  const handleInverse = () => {
    setStage(prev => {
      switch (prev) {
        case 'none':    return 'account'; // ⬅︎ when all off shows account
        case 'account': return 'none';    // hide account
        case 'item':    return 'none';    // go back one step
        case 'center':  return 'item';    // go back one step
        default:        return prev;
      }
    });
  };

  /* ---------- JSX ---------- */
  return (
    <div className="non-fullscreen" translate="no">

      {/* --- Slider controls --- */}
      <button className="inverse-trigger" onClick={handleInverse}>⟵</button>
      <button className="forward-trigger" onClick={handleForward}>⟶</button>

      {/* --- Account / heading group --- */}
      <div className="account-container" data-slide-group="account">
        {/* account content */}
      </div>
      {/* underline */}
      <div
        className="custom-line"
        data-slide-group="heading"
        style={{
          position:'absolute',
          top:'47.8vh',
          left:'6.41vw',
          width:'22.48vw',
          height:'1px',
          backgroundColor:'rgba(230,230,230,0.28)',
          transform:`translateX(${OFFSCREEN_X})`,
          transition:`transform ${SLIDE_DURATION_MS}ms ease`,
          zIndex:1
        }}
      />

      {/* --- Item wrapper (clips at 28.86vw) --- */}
      <div
        className="item-wrapper"
        style={{
          position:'absolute',
          left:'6.41vw',
          top:'55vh',
          width:'28.86vw',
          overflow:'hidden'
        }}
      >
        <div className="item-text">Item Text A</div>
        <div className="item-text">Item Text B</div>
        <div className="item-line" style={{height:'1px',background:'rgba(230,230,230,0.28)'}} />
        {/* ... */}
      </div>

      {/* --- Center group (initially off) --- */}
      <div className="center-container">
        <div className="center-text">Center Text</div>
        <div className="center-line" style={{height:'1px',background:'rgba(230,230,230,0.28)'}} />
      </div>
    </div>
  );
}
