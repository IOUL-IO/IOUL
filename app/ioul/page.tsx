
"use client";

import React, { useEffect, useState, useRef } from 'react';
import Head from 'next/head';

const IOULPage: React.FC = () => {
  // Consistent tab title
  useEffect(() => {
    document.title = 'IOUL';
  }, []);

  // Utility toggles
  const [state, setState] = useState<number>(0); // 0=baseline,1=mail,2=calendar
  const [showMail, setShowMail] = useState<boolean>(false);
  const [showCalendar, setShowCalendar] = useState<boolean>(false);
  const [showLines, setShowLines] = useState<boolean>(true);

  useEffect(() => {
    if (state === 0) {
      setShowMail(false);
      setShowCalendar(false);
      setShowLines(true);
    } else if (state === 1) {
      setShowMail(true);
      setShowCalendar(false);
      setShowLines(false);
    } else {
      setShowMail(false);
      setShowCalendar(true);
      setShowLines(true);
    }
  }, [state]);

  const handleUtilLineClick = () => setState(prev => (prev + 1) % 3);

  // Refs for interactive elements
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

  // Slide/fade stage logic
  const [stage, setStage] = useState<'chat'|'heading'|'menu'|'community'|'accountTexts'|'itemFirst'|'center'>('chat');

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const xPct = (e.clientX / window.innerWidth) * 100;
      const yPct = (e.clientY / window.innerHeight) * 100;
      if (yPct < 28.5 || yPct > 84) return;

      switch (stage) {
        case 'chat':
          if (xPct <= 6.37) {
            chatTextRef.current!.style.opacity = '0';
            chatTextRef.current!.style.transition = 'opacity 0.2s ease';
            accountContainerRef.current!.style.transform = 'translateX(6.41vw)';
            headingContainerRef.current!.style.transform = 'translateX(6.41vw)';
            accountContainerRef.current!.style.transition = 'transform 0.5s ease';
            headingContainerRef.current!.style.transition = 'transform 0.5s ease';
            setStage('heading');
          } else if (xPct >= 28.86 && xPct <= 32.43) {
            chatTextRef.current!.style.opacity = '0';
            menuItemsRef.current!.style.transform = 'translateX(-22.59vw)';
            menuItemsRef.current!.style.transition = 'transform 0.5s ease';
            setStage('menu');
          } else if (xPct >= 32.43 && xPct <= 36) {
            accountTextsRef.current!.style.transform = 'translateX(60vw)';
            accountLineRef.current!.style.transform = 'translateX(60vw)';
            accountTextsRef.current!.style.transition = 'transform 0.5s ease';
            accountLineRef.current!.style.transition = 'transform 0.5s ease';
            setStage('accountTexts');
          } else if (xPct >= 94) {
            itemTextsRef.current!.style.transform = 'translateX(-60vw)';
            itemLinesRef.current!.style.transform = 'translateX(-60vw)';
            itemTextsRef.current!.style.transition = 'transform 0.5s ease';
            itemLinesRef.current!.style.transition = 'transform 0.5s ease';
            setStage('itemFirst');
          }
          break;
        case 'heading':
          if (xPct >= 28.86 && xPct <= 32.43) {
            accountContainerRef.current!.style.transform = 'translateX(0)';
            headingContainerRef.current!.style.transform = 'translateX(0)';
            setTimeout(() => chatTextRef.current!.style.opacity = '1', 500);
            setStage('chat');
          }
          break;
        case 'menu':
          if (xPct <= 6.37) {
            menuItemsRef.current!.style.transform = 'translateX(0)';
            setTimeout(() => chatTextRef.current!.style.opacity = '1', 500);
            setStage('chat');
          } else if (xPct >= 28.86 && xPct <= 32.43) {
            menuItemsRef.current!.style.transform = 'translateX(-45.18vw)';
            communityZeroRef.current!.style.transform = 'translateX(6.41vw)';
            communityZeroRef.current!.style.transition = 'transform 0.5s ease';
            setStage('community');
          }
          break;
        case 'community':
          if (xPct <= 6.37) {
            communityZeroRef.current!.style.transform = 'translateX(0)';
            menuItemsRef.current!.style.transform = 'translateX(-22.59vw)';
            setStage('menu');
          }
          break;
        case 'accountTexts':
          if (xPct >= 94) {
            accountTextsRef.current!.style.transform = 'translateX(0)';
            accountLineRef.current!.style.transform = 'translateX(0)';
            setStage('chat');
          }
          break;
        case 'itemFirst':
          if (xPct <= 6.37) {
            itemTextsRef.current!.style.transform = 'translateX(0)';
            itemLinesRef.current!.style.transform = 'translateX(0)';
            setStage('chat');
          } else if (xPct >= 94) {
            itemTextsRef.current!.style.transform = 'translateX(-130vw)';
            itemLinesRef.current!.style.transform = 'translateX(-130vw)';
            centerTextsRef.current!.style.transform = 'translateX(-60vw)';
            centerLinesRef.current!.style.transform = 'translateX(-60vw)';
            centerTextsRef.current!.style.transition = 'transform 0.5s ease';
            centerLinesRef.current!.style.transition = 'transform 0.5s ease';
            setStage('center');
          }
          break;
        case 'center':
          if (xPct <= 6.37) {
            centerTextsRef.current!.style.transform = 'translateX(0)';
            centerLinesRef.current!.style.transform = 'translateX(0)';
            itemTextsRef.current!.style.transform = 'translateX(-60vw)';
            itemLinesRef.current!.style.transform = 'translateX(-60vw)';
            setStage('itemFirst');
          }
          break;
      }
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, [stage]);

  return (
    <>
      <Head><title>IOUL</title></Head>
      <div className="non-fullscreen" translate="no">
        <p style={{ display: 'none' }} lang="en">This page is already in English.</p>
        <div className="layer-one" />
        <div className="layer-two" />
        <div className="layer-three" />

        <div className="page-content">
          {/* Menu Items */}
          <div className="menu-items" ref={menuItemsRef}>
            <span className="custom-text menu-item" style={{top:'36.1vh',left:'29vw'}}>OnL1nE ASSETS:</span>
            <span className="custom-text menu-item" style={{top:'43.2vh',left:'29vw'}}>L1nKUP cEnTER:</span>
            <span className="custom-text menu-item" style={{top:'50.3vh',left:'29vw'}}>DEL1VERY L1nE:</span>
            <span className="custom-text menu-item" style={{top:'57.4vh',left:'29vw'}}>1nTERnAL Un1T:</span>
          </div>

          <div className="layer-four" />

          {/* Utility line */}
          <div className="other-content">
            <div className="line util-line" onClick={handleUtilLineClick} style={{cursor:'pointer'}}/>
            <div className="line mail-line" style={{
              position:'absolute',top:'47.8vh',left:'36vw',
              width:'57.8vw',height:'1px',backgroundColor:'rgba(230,230,230,0.28)',
              opacity:showMail?1:0,pointerEvents:showMail?'auto':'none',
              transition:'opacity 0.3s ease',zIndex:1}}
            />
          </div>

          {/* Calendar */}
          <div className="calendar-numbers" style={{
            opacity:showCalendar?1:0,pointerEvents:showCalendar?'auto':'none',transition:'opacity 0.3s ease'}}>
            {/* grid-numbers */}
          </div>
          <div className="calendar-dashed" style={{
            opacity:showLines?1:0,pointerEvents:showLines?'auto':'none',transition:'opacity 0.3s ease'}}>
            {/* grid-dashed */}
          </div>

          {/* Chat hover */}
          <div className="hover-area" style={{
            position:'absolute',top:'28.5vh',left:'6.4vw',width:'22.46vw',height:'55.5vh',zIndex:2}}
               onMouseEnter={()=>chatTextRef.current!.style.opacity='1'}
               onMouseLeave={()=>chatTextRef.current!.style.opacity='0'}/>
          <span className="chat-text" ref={chatTextRef} style={{
            position:'absolute',top:'50vh',left:'10vw',opacity:0,transition:'opacity 0.3s ease',zIndex:3}}>
            cHAT . . .
          </span>

          {/* Containers */}
          <div className="account-container" ref={accountContainerRef} style={{transform:'translateX(0)'}}/>
          <div className="heading-container" ref={headingContainerRef} style={{transform:'translateX(0)'}}/>
          <div className="community-zero" ref={communityZeroRef} style={{transform:'translateX(0)'}}/>
          <div className="account-texts" ref={accountTextsRef} style={{transform:'translateX(0)'}}/>
          <div className="account-line" ref={accountLineRef} style={{transform:'translateX(0)'}}/>
          <div className="item-texts" ref={itemTextsRef} style={{transform:'translateX(0)'}}/>
          <div className="item-lines" ref={itemLinesRef} style={{transform:'translateX(0)'}}/>
          <div className="center-texts" ref={centerTextsRef} style={{transform:'translateX(0)'}}/>
          <div className="center-lines" ref={centerLinesRef} style={{transform:'translateX(0)'}}/>
        </div>

        <div className="layer-five" />
        <div className="layer-six" />
      </div>
    </>
  );
};

export default IOULPage;
