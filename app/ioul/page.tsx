"use client";

import React, { useEffect, useState, useRef } from 'react';

const IOULPage: React.FC = () => {
  // State machines for zones
  const [slideState, setSlideState] = useState<'none'|'heading'|'menu'|'community'>('none');
  const [accountStage, setAccountStage] = useState<'none'|'account'>('none');
  const [itemStage, setItemStage] = useState<'none'|'items'|'center'>('none');

  // Refs to elements
  const chatTextRef = useRef<HTMLSpanElement|null>(null);
  const headingRef = useRef<HTMLDivElement|null>(null);
  const menuRef = useRef<HTMLDivElement|null>(null);
  const communityRef = useRef<HTMLDivElement|null>(null);
  const zeroRef = useRef<HTMLDivElement|null>(null);
  const accountRef = useRef<HTMLDivElement|null>(null);
  const itemRef = useRef<HTMLDivElement|null>(null);
  const centerRef = useRef<HTMLDivElement|null>(null);

  // Unified click-zone handler
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      const vx = e.clientX / (window.innerWidth / 100);
      const vy = e.clientY / (window.innerHeight / 100);

      // Zone 1: left edge 0–6.37vw
      if (vx >= 0 && vx <= 6.37 && vy >= 28.5 && vy <= 84) {
        if (slideState === 'none') {
          chatTextRef.current?.style.transition = 'opacity 0.3s';
          chatTextRef.current!.style.opacity = '0';
          headingRef.current?.style.transform = 'translateX(0)';
          setSlideState('heading');
        } else if (slideState === 'heading') {
          headingRef.current?.style.transform = '';
          chatTextRef.current!.style.opacity = '1';
          setSlideState('none');
        } else if (slideState === 'menu') {
          menuRef.current?.style.transform = '';
          setSlideState('none');
        } else if (slideState === 'community') {
          communityRef.current?.style.transform = '';
          zeroRef.current?.style.transform = '';
          setSlideState('menu');
        }
      }
      // Zone 2: right-of-menu 28.86–32.43vw
      else if (vx >= 28.86 && vx <= 32.43 && vy >= 28.5 && vy <= 84) {
        if (slideState === 'none') {
          menuRef.current?.style.transform = 'translateX(-29vw)';
          setSlideState('menu');
        } else if (slideState === 'menu') {
          communityRef.current?.style.transform = 'translateX(-29vw)';
          zeroRef.current?.style.transform = 'translateX(-29vw)';
          setSlideState('community');
        } else if (slideState === 'community') {
          communityRef.current?.style.transform = '';
          zeroRef.current?.style.transform = '';
          menuRef.current?.style.transform = '';
          setSlideState('none');
        } else if (slideState === 'heading') {
          headingRef.current?.style.transform = '';
          chatTextRef.current!.style.opacity = '1';
          setSlideState('none');
        }
      }
      // Zone 3: account zone 32.43–36vw
      else if (vx >= 32.43 && vx <= 36 && vy >= 28.5 && vy <= 84) {
        if (accountStage === 'none') {
          accountRef.current?.classList.add('visible');
          setAccountStage('account');
        } else {
          accountRef.current?.classList.remove('visible');
          setAccountStage('none');
        }
      }
      // Zone 4: item/center zone 94–100vw
      else if (vx >= 94 && vx <= 100 && vy >= 28.5 && vy <= 84) {
        if (itemStage === 'none') {
          itemRef.current?.classList.add('visible');
          setItemStage('items');
        } else if (itemStage === 'items') {
          centerRef.current?.classList.add('visible');
          setItemStage('center');
        } else {
          itemRef.current?.classList.remove('visible');
          centerRef.current?.classList.remove('visible');
          setItemStage('none');
        }
      }
    }

    document.addEventListener('click', handleClick, true);
    return () => document.removeEventListener('click', handleClick, true);
  }, [slideState, accountStage, itemStage]);

  return (
    <div className="non-fullscreen" translate="no">
      {/* Paste your existing JSX markup below */}
      {/* ... */}
    </div>
  );
};

export default IOULPage;
