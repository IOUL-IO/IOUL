"use client";

import React, { useEffect, useState, useRef } from 'react';

const IOULPage: React.FC = () => {
  // States for zones
  const [slideState, setSlideState] = useState<'none'|'menu'|'community'>('none');
  const [accountStage, setAccountStage] = useState<'none'|'account'>('none');
  const [itemStage, setItemStage] = useState<'none'|'items'|'center'>('none');

  const chatTextRef = useRef<HTMLSpanElement|null>(null);
  const headingRef = useRef<HTMLDivElement|null>(null);
  const menuItemsRef = useRef<HTMLDivElement|null>(null);
  const communityRef = useRef<HTMLDivElement|null>(null);
  const zeroRef = useRef<HTMLDivElement|null>(null);
  const accountTextsRef = useRef<NodeListOf<HTMLElement>|null>(null);
  const itemTextsRef = useRef<NodeListOf<HTMLElement>|null>(null);
  const centerTextsRef = useRef<NodeListOf<HTMLElement>|null>(null);

  // Unified click handler
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      const x = e.clientX / (window.innerWidth/100);
      const y = e.clientY / (window.innerHeight/100);
      // Left zone: 0–6.37vw
      if (x>=0 && x<=6.37 && y>=28.5 && y<=84) {
        // Left-edge logic
        if (slideState==='none') {
          // fade out chatText, slide heading/account right
          chatTextRef.current?.style.transition='opacity 0.3s';
          chatTextRef.current!.style.opacity='0';
          headingRef.current?.style.transform='translateX(0)';
          setSlideState('menu');
        } else if (slideState==='menu') {
          // inverse
          menuItemsRef.current?.style.transform='translateX(0)';
          setSlideState('none');
        } else if (slideState==='community') {
          communityRef.current?.style.transform='translateX(0)';
          zeroRef.current?.style.transform='translateX(0)';
          setSlideState('menu');
        }
      }
      // Right zone for menu/community: 28.86–32.43vw
      else if (x>=28.86 && x<=32.43 && y>=28.5 && y<=84) {
        if (slideState==='none') {
          menuItemsRef.current?.style.transform='translateX(0)';
          setSlideState('menu');
        } else if (slideState==='menu') {
          communityRef.current?.style.transform='translateX(0)';
          zeroRef.current?.style.transform='translateX(0)';
          setSlideState('community');
        } else if (slideState==='community') {
          chatTextRef.current?.style.opacity='1';
          setSlideState('none');
        }
      }
      // Account zone: 32.43–36vw
      else if (x>=32.43 && x<=36 && y>=28.5 && y<=84) {
        if (accountStage==='none') {
          document.querySelectorAll('.account-text, .account-line')
            .forEach(el => el.classList.add('visible'));
          setAccountStage('account');
        } else {
          document.querySelectorAll('.account-text, .account-line')
            .forEach(el => el.classList.remove('visible'));
          setAccountStage('none');
        }
      }
      // Item/Center zone: 94–100vw
      else if (x>=94 && x<=100 && y>=28.5 && y<=84) {
        if (itemStage==='none') {
          document.querySelectorAll('.item-text, .item-line')
            .forEach(el => el.classList.add('visible'));
          setItemStage('items');
        } else if (itemStage==='items') {
          document.querySelectorAll('.center-text, .center-line')
            .forEach(el => el.classList.add('visible'));
          setItemStage('center');
        } else {
          document.querySelectorAll('.item-text, .item-line, .center-text, .center-line')
            .forEach(el => el.classList.remove('visible'));
          setItemStage('none');
        }
      }
    }

    document.addEventListener('click', handleClick, true);
    return () => document.removeEventListener('click', handleClick, true);
  }, [slideState, accountStage, itemStage]);

  return (
    <div className="non-fullscreen" translate="no">
      {/* Existing JSX: layers, menu-items, community-items, zero-items, account-texts, item-texts, center-texts, etc. */}
      <span ref={chatTextRef} className="chat-text">CHAT...</span>
      <div ref={headingRef} className="heading-container" />
      <div ref={menuItemsRef} className="menu-items" />
      <div ref={communityRef} className="community-items-container" />
      <div ref={zeroRef} className="zero-items-container" />
      {/* ... other elements ... */}
      <div className="account-texts">...</div>
      <div className="account-line">...</div>
      <div className="item-texts">...</div>
      <div className="item-lines">...</div>
      <div className="center-texts">...</div>
      <div className="center-lines">...</div>
    </div>
  );
};

export default IOULPage;
