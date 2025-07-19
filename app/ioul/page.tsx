
'use client';
import { useState, useEffect, useRef } from 'react';

/**
 * Three‑group slider following user spec (2025‑07‑19):
 *
 *   Stage 0  none     – all three groups are off‑screen (initial)
 *   Stage 1  account  – account/heading group visible
 *   Stage 2  item     – item group visible (account hidden)
 *   Stage 3  center   – center group visible; item slid further left & clipped
 *
 *  ⬅︎ (inverse) path:  none ← account ← item ← center
 *  ⮕ (forward) path:  none → item → center
 *                      account → none
 *
 * Rules:
 *   • Account only slides when item & center are off‑screen.
 *   • Forward from account simply hides account (back to none).
 *   • Forward from none shows item.
 *   • Forward from item shows center (item keeps sliding & gets clipped).
 *   • Inverse always steps back one stage.
 */

type Stage = 'none' | 'account' | 'item' | 'center';

const DUR = 600;                      // ms
const OFF_X = '-49vw';
const ITEM_CLIP_X = '-28.86vw';
const VISIBLE_X = '0';

const useQueryAll = (selector: string) => {
  const ref = useRef<NodeListOf<HTMLElement> | null>(null);
  useEffect(() => { ref.current = document.querySelectorAll<HTMLElement>(selector); }, []);
  return ref;
};

export default function IOULPage() {
  /* Refs for the three groups */
  const accountRef = useQueryAll('.account-container[data-slide-group="account"], .custom-line[data-slide-group="heading"]');
  const itemRef    = useQueryAll('.item-text, .item-line');
  const centerRef  = useQueryAll('.center-text, .center-line');

  const [stage, setStage] = useState<Stage>('none');

  /* Set transforms whenever stage changes */
  useEffect(() => {
    const setX = (els: NodeListOf<HTMLElement> | null, x: string) => {
      if (!els) return;
      els.forEach(el => {
        el.style.transition = `transform ${DUR}ms ease`;
        el.style.transform  = `translateX(${x})`;
      });
    };

    setX(accountRef.current, stage === 'account' ? VISIBLE_X : OFF_X);

    setX(itemRef.current,
         stage === 'item'   ? VISIBLE_X :
         stage === 'center' ? ITEM_CLIP_X : OFF_X);

    setX(centerRef.current, stage === 'center' ? VISIBLE_X : OFF_X);
  }, [stage, accountRef, itemRef, centerRef]);

  /* Trigger handlers */
  const forward = () => {
    setStage(prev => {
      switch (prev) {
        case 'none':    return 'item';
        case 'account': return 'none';
        case 'item':    return 'center';
        default:        return prev; // center has no forward step
      }
    });
  };

  const inverse = () => {
    setStage(prev => {
      switch (prev) {
        case 'account': return 'none';
        case 'item':    return 'none';
        case 'center':  return 'item';
        case 'none':    return 'account';
        default:        return prev;
      }
    });
  };

  /* --- JSX skeleton showing structure only --- */
  return (
    <div className="non-fullscreen" translate="no">

      {/* Controls (replace with your actual icons / click areas) */}
      <button onClick={inverse} className="inverse-trigger">⟵</button>
      <button onClick={forward} className="forward-trigger">⟶</button>

      {/* Account / heading block */}
      <div className="account-container" data-slide-group="account">
        {/* ...account headings... */}
      </div>
      <div
        className="custom-line" data-slide-group="heading"
        style={{
          position:'absolute', top:'47.8vh', left:'6.41vw',
          width:'22.48vw', height:'1px',
          backgroundColor:'rgba(230,230,230,0.28)',
          transform:`translateX(${OFF_X})`,
          transition:`transform ${DUR}ms ease`, zIndex:1
        }}
      />

      {/* Clipping wrapper for items */}
      <div
        className="item-wrapper"
        style={{
          position:'absolute', left:'6.41vw', top:'55vh',
          width:'28.86vw', overflow:'hidden'
        }}
      >
        <div className="item-text">Item&nbsp;1</div>
        <div className="item-text">Item&nbsp;2</div>
        <div className="item-line" style={{height:'1px',background:'rgba(230,230,230,0.28)'}} />
      </div>

      {/* Center group */}
      <div className="center-container">
        <div className="center-text">Center&nbsp;A</div>
        <div className="center-line" style={{height:'1px',background:'rgba(230,230,230,0.28)'}} />
      </div>
    </div>
  );
}
