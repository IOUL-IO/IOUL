
"use client";

import React, { useEffect, useState, useRef } from 'react';
import Head from 'next/head';

const IOULPage: React.FC = () => {
  // 1) Consistent tab title
  useEffect(() => {
    document.title = 'IOUL';
  }, []);

  // 2) Calendar/mail toggles
  const [utilState, setUtilState] = useState<0|1|2>(0);
  const showMail = utilState === 1;
  const showCalendar = utilState === 2;
  const showLines = utilState !== 2;
  const cycleUtil = () => setUtilState(u => (u+1)%3 as 0|1|2);

  // 3) Hover chat
  const chatRef = useRef<HTMLSpanElement>(null);
  const onHover = (show: boolean) => {
    if(chatRef.current) chatRef.current.style.opacity = show ? '1' : '0';
  };

  // 4) Refs for sliding groups
  const accountRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const communityRef = useRef<HTMLDivElement>(null);
  const accountTextRef = useRef<HTMLDivElement>(null);
  const accountLineRef = useRef<HTMLDivElement>(null);
  const itemTextRef = useRef<HTMLDivElement>(null);
  const itemLineRef = useRef<HTMLDivElement>(null);
  const centerTextRef = useRef<HTMLDivElement>(null);
  const centerLineRef = useRef<HTMLDivElement>(null);

  // 5) Stage state
  type Stage = 'chat'|'account'|'menu'|'community'|'acctText'|'item1'|'center';
  const [stage, setStage] = useState<Stage>('chat');

  // 6) Edge-click logic
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const vw = window.innerWidth/100, vh=window.innerHeight/100;
      const x=e.clientX/vw, y=e.clientY/vh;
      if(y<28.5||y>84) return;
      // chat->account
      if(stage==='chat'&&x<=6.37){
        chatRef.current!.style.transition='opacity 0.2s';
        chatRef.current!.style.opacity='0';
        accountRef.current!.style.transition='transform 0.5s';
        headingRef.current!.style.transition='transform 0.5s';
        accountRef.current!.style.transform='translateX(6.41vw)';
        headingRef.current!.style.transform='translateX(6.41vw)';
        setStage('account');
      }
      // account->chat
      else if(stage==='account'&&x>=28.86&&x<=32.43){
        accountRef.current!.style.transform='translateX(0)';
        headingRef.current!.style.transform='translateX(0)';
        setTimeout(()=>{chatRef.current!.style.opacity='1'},500);
        setStage('chat');
      }
      // chat->menu
      else if(stage==='chat'&&x>=28.86&&x<=32.43){
        chatRef.current!.style.opacity='0';
        menuRef.current!.style.transition='transform 0.5s';
        menuRef.current!.style.transform='translateX(-22.59vw)';
        setStage('menu');
      }
      // menu->chat
      else if(stage==='menu'&&x<=6.37){
        menuRef.current!.style.transform='translateX(0)';
        setTimeout(()=>{chatRef.current!.style.opacity='1'},500);
        setStage('chat');
      }
      // menu->community
      else if(stage==='menu'&&x>=28.86&&x<=32.43){
        menuRef.current!.style.transform='translateX(-45.18vw)';
        communityRef.current!.style.transition='transform 0.5s';
        communityRef.current!.style.transform='translateX(6.41vw)';
        setStage('community');
      }
      // community->menu
      else if(stage==='community'&&x<=6.37){
        communityRef.current!.style.transform='translateX(0)';
        menuRef.current!.style.transform='translateX(-22.59vw)';
        setStage('menu');
      }
      // chat->acctText
      else if(stage==='chat'&&x>=32.43&&x<=36){
        accountTextRef.current!.style.transition='transform 0.5s';
        accountLineRef.current!.style.transition='transform 0.5s';
        accountTextRef.current!.style.transform='translateX(60vw)';
        accountLineRef.current!.style.transform='translateX(60vw)';
        setStage('acctText');
      }
      // acctText->chat
      else if(stage==='acctText'&&x>=94){
        accountTextRef.current!.style.transform='translateX(0)';
        accountLineRef.current!.style.transform='translateX(0)';
        setStage('chat');
      }
      // chat->item1
      else if(stage==='chat'&&x>=94){
        itemTextRef.current!.style.transition='transform 0.5s';
        itemLineRef.current!.style.transition='transform 0.5s';
        itemTextRef.current!.style.transform='translateX(-60vw)';
        itemLineRef.current!.style.transform='translateX(-60vw)';
        setStage('item1');
      }
      // item1->chat
      else if(stage==='item1'&&x<=6.37){
        itemTextRef.current!.style.transform='translateX(0)';
        itemLineRef.current!.style.transform='translateX(0)';
        setStage('chat');
      }
      // item1->center
      else if(stage==='item1'&&x>=94){
        itemTextRef.current!.style.transform='translateX(-130vw)';
        itemLineRef.current!.style.transform='translateX(-130vw)';
        centerTextRef.current!.style.transition='transform 0.5s';
        centerLineRef.current!.style.transition='transform 0.5s';
        centerTextRef.current!.style.transform='translateX(-60vw)';
        centerLineRef.current!.style.transform='translateX(-60vw)';
        setStage('center');
      }
      // center->item1
      else if(stage==='center'&&x<=6.37){
        centerTextRef.current!.style.transform='translateX(0)';
        centerLineRef.current!.style.transform='translateX(0)';
        itemTextRef.current!.style.transform='translateX(-60vw)';
        itemLineRef.current!.style.transform='translateX(-60vw)';
        setStage('item1');
      }
    };
    document.addEventListener('click',handler);
    return ()=>document.removeEventListener('click',handler);
  },[stage]);

  return (
    <>
      <Head><title>IOUL</title></Head>
      <div className="non-fullscreen" translate="no">
        <div className="layer-one" />
        <div className="layer-two" />
        <div className="layer-three" />

        <div className="page-content">
          {/* Menu */}
          <div className="menu-items" ref={menuRef}>
            <span id="online-assets" className="menu-item" style={{top:'36.1vh',left:'29vw'}} />
            <span id="linkup-center" className="menu-item" style={{top:'43.2vh',left:'29vw'}} />
            <span id="delivery-line" className="menu-item" style={{top:'50.3vh',left:'29vw'}} />
            <span id="internal-unit" className="menu-item" style={{top:'57.4vh',left:'29vw'}} />
          </div>
          {/* Layers */}
          <div className="layer-four" />
          {/* Util line */}
          <div className="other-content">
            <div className="line util-line" onClick={cycleUtil} />
            <div className="line mail-line" style={{opacity:showMail?1:0,pointerEvents:showMail?'auto':'none'}} />
          </div>
          {/* Calendar */}
          <div className="calendar-numbers" style={{opacity:showCalendar?1:0,pointerEvents:showCalendar?'auto':'none'}} />
          <div className="calendar-dashed" style={{opacity:showLines?1:0,pointerEvents:showLines?'auto':'none'}} />
          {/* Chat hover */}
          <div className="hover-area" onMouseEnter={()=>onHover(true)} onMouseLeave={()=>onHover(false)} />
          <span className="chat-text" ref={chatRef} style={{opacity:0}}>cHAT . . .</span>
          {/* Slide groups */}
          <div className="account-container" ref={accountRef} style={{transform:'translateX(0)'}} />
          <div className="heading-container" ref={headingRef} style={{transform:'translateX(0)'}} />
          <div className="community-container" ref={communityRef} style={{transform:'translateX(0)'}} />
          <div className="account-texts" ref={accountTextRef} style={{transform:'translateX(0)'}} />
          <div className="account-line" ref={accountLineRef} style={{transform:'translateX(0)'}} />
          <div className="item-texts" ref={itemTextRef} style={{transform:'translateX(0)'}} />
          <div className="item-lines" ref={itemLineRef} style={{transform:'translateX(0)'}} />
          <div className="center-texts" ref={centerTextRef} style={{transform:'translateX(0)'}} />
          <div className="center-lines" ref={centerLineRef} style={{transform:'translateX(0)'}} />
        </div>

        <div className="layer-five" />
        <div className="layer-six" />
      </div>
    </>
  );
};

export default IOULPage;
