
"use client";
import React, { useEffect, useRef } from "react";

export default function Page() {
  const rootRef = useRef<HTMLDivElement>(null);

  /* ------------------ helpers ------------------ */
  const fadeInEls = (els: Iterable<HTMLElement>) =>
    Array.from(els).forEach((el) => {
      el.classList.remove("hidden");
      void el.offsetWidth;
      el.classList.add("visible");
    });

  let phase = 0;
  let step  = 0;

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const body = document.body;
    const loginEls = root.querySelectorAll<HTMLElement>(
      ".username, .password, .login-line, .login-line-second"
    );

    const vw = () => window.innerWidth;
    const vh = () => window.innerHeight;
    const inLoginZone = (x:number,y:number)=>
      x>=vw()*0.085&&x<=vw()*0.91&&y>=vh()*0.46&&y<=vh()*0.7;

    function initialPointer(e:PointerEvent|TouchEvent){
      const {clientX:x,clientY:y} =
        "touches" in e ? e.touches[0] : (e as PointerEvent);

      if(phase===0){
        body.classList.add("fade-in-trigger");
        phase=1;
        return;
      }
      if(phase===1 && inLoginZone(x,y)){
        fadeInEls(loginEls);
        phase=2;
        window.removeEventListener("pointermove",initialPointer);
        window.removeEventListener("touchstart",initialPointer);
      }
    }
    window.addEventListener("pointermove",initialPointer,{passive:true});
    window.addEventListener("touchstart",initialPointer,{passive:true});

    return ()=>{
      window.removeEventListener("pointermove",initialPointer);
      window.removeEventListener("touchstart",initialPointer);
    }
  },[]);

  const handleUtilClick: React.MouseEventHandler<HTMLDivElement> = () =>{
    console.log("util-line clicked");
    if(step!==0) return;
    document.body.classList.add("stage-util");
    step=1;
  };

  const handleOpenClick: React.MouseEventHandler<HTMLSpanElement> = () =>{
    if(step!==1) return;
    document.body.classList.add("stage-account");
    document.querySelector(".account-wrapper")?.classList.add("active");
    step=2;
  };

  const handleHelpClick: React.MouseEventHandler<HTMLSpanElement> = () =>{
    if(step!==1) return;
    document.body.classList.add("stage-help");
    document.querySelector(".help-wrapper")?.classList.add("active");
    step=3;
  };

  return (
    <>
      {/* CSS overrides to guarantee clickability */}
      <style jsx global>{`
        .util-line {
          pointer-events: auto !important;
          z-index: 10000 !important;
          cursor: pointer !important;
        }
        .layer-one,
        .layer-two {
          pointer-events: none !important;
        }
      `}</style>

      <div ref={rootRef}>
        {/* static lines */}
        <div className="line original" />
        <div className="line second" />
        <div className="line third" />
        <div className="line fourth" />
        <div className="line fifth" />
        <div className="line sixth" />

        {/* trigger */}
        <div
          className="util-line"
          style={{ height:"1px" }}
          role="button"
          aria-label="Utility trigger"
          onClick={handleUtilClick}
        />

        {/* login texts */}
        <span className="login-text username hidden">USERnAME</span>
        <span className="login-text password hidden">PASSWORD</span>

        {/* util texts */}
        <span className="login-text open-text hidden" role="button" onClick={handleOpenClick}>OPEn AccOUnT</span>
        <span className="login-text help-text hidden" role="button" onClick={handleHelpClick}>HELP REQUEST</span>

        {/* login entry lines */}
        <div className="line login-line hidden"/>
        <div className="line login-line-second hidden"/>

        {/* account and help wrappers */}
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

        <div className="help-wrapper">
          <span className="help-text-area email">YOUR EMA1L</span>
          <span className="help-text-area sendlink">SEnD L1nK</span>
          <div className="help-line"/>
        </div>

        {/* overlay layers */}
        <div className="layer-one"/>
        <div className="layer-two"/>
      </div>
    </>
  );
}
