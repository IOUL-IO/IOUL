
'use client';
import React, { useEffect, useRef } from 'react';

/**
 * IOUL Login Page – “can’t‑miss” util trigger.
 * Adds a 20‑px tall invisible hotspot above the original 1‑px util line
 * so the click is captured even if the thin line is covered or not pixel‑perfect.
 * Original CSS stays; hotspot has higher z‑index & pointer‑events:auto.
 */

export default function Page() {
  const rootRef = useRef<HTMLDivElement>(null);

  /* ---------- helper to fade‑in ---------- */
  const fadeIn = (els: Iterable<HTMLElement>) =>
    Array.from(els).forEach(el => {
      el.classList.remove('hidden');
      void el.offsetWidth;
      el.classList.add('visible');
    });

  /* ---------- stage / intro logic ---------- */
  let phase = 0;
  let step  = 0;

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const body = document.body;
    const loginEls = root.querySelectorAll<HTMLElement>(
      '.username, .password, .login-line, .login-line-second'
    );

    const vw = () => window.innerWidth;
    const vh = () => window.innerHeight;
    const inLoginZone = (x:number,y:number)=>
      x>=vw()*0.085 && x<=vw()*0.91 && y>=vh()*0.46 && y<=vh()*0.7;

    function introPointer(e:PointerEvent|TouchEvent){
      const {clientX:x,clientY:y} = 'touches' in e ? e.touches[0] : (e as PointerEvent);
      if(phase===0){
        body.classList.add('fade-in-trigger');
        phase=1;
        return;
      }
      if(phase===1 && inLoginZone(x,y)){
        fadeIn(loginEls);
        phase=2;
        window.removeEventListener('pointermove',introPointer);
        window.removeEventListener('touchstart',introPointer);
      }
    }
    window.addEventListener('pointermove',introPointer,{passive:true});
    window.addEventListener('touchstart',introPointer,{passive:true});

    return ()=>{
      window.removeEventListener('pointermove',introPointer);
      window.removeEventListener('touchstart',introPointer);
    };
  },[]);

  /* ---------- click handlers ---------- */
  const triggerUtil = () => {
    if(step!==0) return;
    console.log('HOTSPOT CLICKED');
    document.body.classList.add('stage-util');
    step = 1;
  };

  return (
    <>
      {/* Inline overrides */}
      <style jsx global>{`
        /* Hotspot: bigger than old util-line, always clickable */
        .util-hotspot{
          position:absolute;
          left:8.5vw;
          top:46vh;                     /* align with original util line */
          width:82.5vw;
          height:20px;                  /* generous click area */
          background:transparent;
          pointer-events:auto !important;
          z-index:10000 !important;
          cursor:pointer;
        }
        /* Make sure overlays never trap clicks */
        .layer-one,.layer-two{pointer-events:none!important;}
      `}</style>

      <div ref={rootRef} style={{position:'relative'}}>
        {/* original static lines */}
        <div className="line original"/>
        <div className="line second"/>
        <div className="line third"/>
        <div className="line fourth"/>
        <div className="line fifth"/>
        <div className="line sixth"/>

        {/* Invisible but thick hotspot */}
        <div className="util-hotspot" onClick={triggerUtil}/>

        {/* original 1‑px util line remains for visuals */}
        <div className="util-line"/>

        {/* login texts */}
        <span className="login-text username hidden">USERnAME</span>
        <span className="login-text password hidden">PASSWORD</span>

        {/* util texts */}
        <span className="login-text open-text hidden">OPEn AccOUnT</span>
        <span className="login-text help-text hidden">HELP REQUEST</span>

        {/* login entry lines */}
        <div className="line login-line hidden"/>
        <div className="line login-line-second hidden"/>

        {/* account wrapper */}
        <div className="account-wrapper">
          <span className="account-text account-email">E-MA1L ADDRESS</span>
          <span className="account-text account-username">YOUR USERnAME</span>
          <span className="account-text account-sign-password">YOUR PASSWORD</span>
          <span className="account-text account-repeat-password">REDO PASSWORD</span>
          <div className="account-line account-line1"/>
          <div className="account-line account-line2"/>
          <div className="account-line account-line3"/>
          <div className="account-line account-line4"/>
        </div>

        {/* help wrapper */}
        <div className="help-wrapper">
          <span className="help-text-area email">YOUR EMA1L</span>
          <span className="help-text-area sendlink">SEnD L1nK</span>
          <div className="help-line"/>
        </div>

        {/* transparent overlays */}
        <div className="layer-one"/>
        <div className="layer-two"/>
      </div>
    </>
  );
}
