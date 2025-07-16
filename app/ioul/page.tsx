
"use client";

import React, { useEffect, useState, useRef } from 'react';
import Head from 'next/head';

const IOULPage: React.FC = () => {
  // Ensure consistent tab title
  useEffect(() => {
    document.title = 'IOUL';
  }, []);

  // Utility toggles: 0=baseline,1=mail,2=calendar
  const [state, setState] = useState(0);
  const [showMail, setShowMail] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [showLines, setShowLines] = useState(true);

  useEffect(() => {
    if (state === 0) {
      setShowMail(false);
      setShowCalendar(false);
      setShowLines(true);
    } else if (state === 1) {
      setShowMail(true);
      setShowCalendar(false);
      setShowLines(true);
    } else {
      setShowMail(false);
      setShowCalendar(true);
      setShowLines(false);
    }
  }, [state]);

  const handleUtilLineClick = () => {
    setState(prev => (prev + 1) % 3);
  };

  // Refs for elements
  const chatTextRef = useRef<HTMLSpanElement>(null);
  const accountContainerRef = useRef<HTMLDivElement>(null);
  const headingContainerRef = useRef<HTMLDivElement>(null);
  const menuItemsRef = useRef<HTMLDivElement>(null);
  const communityZeroRef = useRef<HTMLDivElement>(null);
  const accountTextsRef = useRef<HTMLDivElement>(null);
  const accountLineRef = useRef<HTMLDivElement>(null);
  const itemTextsRef = useRef<HTMLDivElement>(null);
  const itemLinesRef = useRef<HTMLDivElement>(null);
  const centerTextsRef = useRef<HTMLDivElement>(null);
  const centerLinesRef = useRef<HTMLDivElement>(null);

  // Edge-click handler for slide/fade interactions
  useEffect(() => {
    const handleEdgeClick = (event: MouseEvent) => {
      if (!(event.target instanceof HTMLElement)) return;
      const x = (event.clientX / window.innerWidth) * 100;
      const y = (event.clientY / window.innerHeight) * 100;

      // 1) Chat -> Account + Heading
      const chatVisible = chatTextRef.current?.style.opacity === '1';
      const acctSlid = accountContainerRef.current?.style.transform === 'translateX(6.41vw)';
      if (chatVisible && x >= 0 && x <= 6.37 && y >= 28.5 && y <= 84) {
        chatTextRef.current!.style.transition = 'opacity 0.2s ease';
        chatTextRef.current!.style.opacity = '0';
        accountContainerRef.current!.style.transition = 'transform 0.5s ease';
        headingContainerRef.current!.style.transition = 'transform 0.5s ease';
        accountContainerRef.current!.style.transform = 'translateX(6.41vw)';
        headingContainerRef.current!.style.transform = 'translateX(6.41vw)';
        return;
      }
      if (acctSlid && x >= 28.86 && x <= 32.43 && y >= 28.5 && y <= 84) {
        accountContainerRef.current!.style.transform = 'translateX(0)';
        headingContainerRef.current!.style.transform = 'translateX(0)';
        setTimeout(() => {
          chatTextRef.current!.style.opacity = '1';
        }, 500);
        return;
      }

      // 2) Chat -> Menu Items -> Community
      const menuSlid1 = menuItemsRef.current?.style.transform === 'translateX(-22.59vw)';
      const commSlid = communityZeroRef.current?.style.transform === 'translateX(6.41vw)';
      if (chatVisible && x >= 28.86 && x <= 32.43 && y >= 28.5 && y <= 84) {
        chatTextRef.current!.style.opacity = '0';
        menuItemsRef.current!.style.transition = 'transform 0.5s ease';
        menuItemsRef.current!.style.transform = 'translateX(-22.59vw)';
        return;
      }
      if (menuSlid1 && x >= 0 && x <= 6.37 && y >= 28.5 && y <= 84) {
        menuItemsRef.current!.style.transform = 'translateX(0)';
        setTimeout(() => { chatTextRef.current!.style.opacity = '1'; }, 500);
        return;
      }
      if (menuSlid1 && x >= 28.86 && x <= 32.43 && y >= 28.5 && y <= 84) {
        menuItemsRef.current!.style.transform = 'translateX(-45.18vw)';
        communityZeroRef.current!.style.transition = 'transform 0.5s ease';
        communityZeroRef.current!.style.transform = 'translateX(6.41vw)';
        return;
      }
      if (commSlid && x >= 0 && x <= 6.37 && y >= 28.5 && y <= 84) {
        communityZeroRef.current!.style.transform = 'translateX(0)';
        menuItemsRef.current!.style.transform = 'translateX(-22.59vw)';
        return;
      }

      // 3) Account Texts & Line
      const acctTxt0 = accountTextsRef.current?.style.transform === 'translateX(0)';
      const acctTxt60 = accountTextsRef.current?.style.transform === 'translateX(60vw)';
      if (acctTxt0 && x >= 32.43 && x <= 36 && y >= 28.5 && y <= 84) {
        accountTextsRef.current!.style.transition = 'transform 0.5s ease';
        accountLineRef.current!.style.transition = 'transform 0.5s ease';
        accountTextsRef.current!.style.transform = 'translateX(60vw)';
        accountLineRef.current!.style.transform = 'translateX(60vw)';
        return;
      }
      if (acctTxt60 && x >= 94 && x <= 100 && y >= 28.5 && y <= 84) {
        accountTextsRef.current!.style.transform = 'translateX(0)';
        accountLineRef.current!.style.transform = 'translateX(0)';
        return;
      }

      // 4) Item Texts & Lines -> Center
      const itemTxt0 = itemTextsRef.current?.style.transform === 'translateX(0)';
      const itemTxt60 = itemTextsRef.current?.style.transform === 'translateX(-60vw)';
      const itemTxt130 = itemTextsRef.current?.style.transform === 'translateX(-130vw)';
      if (itemTxt0 && x >= 94 && x <= 100 && y >= 28.5 && y <= 84) {
        itemTextsRef.current!.style.transition = 'transform 0.5s ease';
        itemLinesRef.current!.style.transition = 'transform 0.5s ease';
        itemTextsRef.current!.style.transform = 'translateX(-60vw)';
        itemLinesRef.current!.style.transform = 'translateX(-60vw)';
        return;
      }
      if (itemTxt60 && x >= 0 && x <= 6.37 && y >= 28.5 && y <= 84) {
        itemTextsRef.current!.style.transform = 'translateX(0)';
        itemLinesRef.current!.style.transform = 'translateX(0)';
        return;
      }
      if (itemTxt60 && x >= 94 && x <= 100 && y >= 28.5 && y <= 84) {
        itemTextsRef.current!.style.transform = 'translateX(-130vw)';
        itemLinesRef.current!.style.transform = 'translateX(-130vw)';
        centerTextsRef.current!.style.transition = 'transform 0.5s ease';
        centerLinesRef.current!.style.transition = 'transform 0.5s ease';
        centerTextsRef.current!.style.transform = 'translateX(-60vw)';
        centerLinesRef.current!.style.transform = 'translateX(-60vw)';
        return;
      }
      if (itemTxt130 && x >= 0 && x <= 6.37 && y >= 28.5 && y <= 84) {
        centerTextsRef.current!.style.transform = 'translateX(0)';
        centerLinesRef.current!.style.transform = 'translateX(0)';
        itemTextsRef.current!.style.transform = 'translateX(-60vw)';
        itemLinesRef.current!.style.transform = 'translateX(-60vw)';
        return;
      }
    };

    document.addEventListener('click', handleEdgeClick);
    return () => document.removeEventListener('click', handleEdgeClick);
  }, []);

  return (
    <>
      <Head><title>IOUL</title></Head>
      <div className="non-fullscreen" translate="no">
        <p style={{ display: 'none' }} lang="en">
          This page is already in English. No translation is needed.
        </p>

        <div className="layer-one" />
        <div className="layer-two" />
        <div className="layer-three" />

        <div className="page-content">
          {/* Menu Items */}
          <div className="menu-items" ref={menuItemsRef}>
            <span className="custom-text menu-item" style={{ top: '36.1vh', left: '29vw' }}>OnL1nE ASSETS:</span>
            <span className="custom-text menu-item" style={{ top: '43.2vh', left: '29vw' }}>L1nKUP cEnTER:</span>
            <span className="custom-text menu-item" style={{ top: '50.3vh', left: '29vw' }}>DEL1VERY L1nE:</span>
            <span className="custom-text menu-item" style={{ top: '57.4vh', left: '29vw' }}>1nTERnAL Un1T:</span>
          </div>

          <div className="layer-four" />

          {/* Utility line and toggles */}
          <div className="other-content">
            <div className="line util-line" onClick={handleUtilLineClick} style={{ cursor: 'pointer' }} />
            <div className="line mail-line"
                 style={{
                   position: 'absolute', top: '47.8vh', left: '36vw',
                   width: '57.8vw', height: '1px', backgroundColor: 'rgba(230,230,230,0.28)',
                   opacity: showMail ? 1 : 0, pointerEvents: showMail ? 'auto' : 'none',
                   transition: 'opacity 0.3s ease', zIndex: 1
                 }}
            />
            {/* other static lines */}
          </div>

          {/* Calendar Grid */}
          <div className="calendar-numbers"
               style={{
                 opacity: showCalendar ? 1 : 0, pointerEvents: showCalendar ? 'auto' : 'none',
                 transition: 'opacity 0.3s ease'
               }}>
            {/* grid-number spans */}
          </div>
          <div className="calendar-dashed"
               style={{
                 opacity: showLines ? 1 : 0, pointerEvents: showLines ? 'auto' : 'none',
                 transition: 'opacity 0.3s ease'
               }}>
            {/* grid-dashed spans */}
          </div>

          {/* Chat hover area */}
          <div className="hover-area"
               style={{
                 position: 'absolute', top: '28.5vh', left: '6.4vw',
                 width: '22.46vw', height: '55.5vh', zIndex: 2
               }}
               onMouseEnter={() => chatTextRef.current!.style.opacity = '1'}
               onMouseLeave={() => chatTextRef.current!.style.opacity = '0'}
          />
          <span className="chat-text" ref={chatTextRef}
                style={{
                  position: 'absolute', top: '50vh', left: '10vw',
                  opacity: 0, transition: 'opacity 0.3s ease', zIndex: 3
                }}>
            cHAT . . .
          </span>

          {/* Containers for sliding sections */}
          <div className="account-container" ref={accountContainerRef} style={{ transform: 'translateX(0)' }} />
          <div className="heading-container" ref={headingContainerRef} style={{ transform: 'translateX(0)' }} />
          <div className="community-zero" ref={communityZeroRef} style={{ transform: 'translateX(0)' }} />
          <div className="account-texts" ref={accountTextsRef} style={{ transform: 'translateX(0)' }} />
          <div className="account-line" ref={accountLineRef} style={{ transform: 'translateX(0)' }} />
          <div className="item-texts" ref={itemTextsRef} style={{ transform: 'translateX(0)' }} />
          <div className="item-lines" ref={itemLinesRef} style={{ transform: 'translateX(0)' }} />
          <div className="center-texts" ref={centerTextsRef} style={{ transform: 'translateX(0)' }} />
          <div className="center-lines" ref={centerLinesRef} style={{ transform: 'translateX(0)' }} />
        </div>

        <div className="layer-five" />
        <div className="layer-six" />
      </div>
    </>
  );
};

export default IOULPage;
