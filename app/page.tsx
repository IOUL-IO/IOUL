
// @ts-nocheck
"use client";
import React, { useEffect, useRef } from "react";

export default function Page() {
  const containerRef = useRef<HTMLDivElement>(null);
  const openTextRef = useRef<HTMLSpanElement>(null);
  const helpTextRef = useRef<HTMLSpanElement>(null);
  const accountWrapperRef = useRef<HTMLDivElement>(null);
  const helpWrapperRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const body = document.body;
    const loginEls = containerRef.current!.querySelectorAll(
      ".username, .password, .login-line, .login-line-second"
    );

    const fadeIn = (els: NodeListOf<Element> | Element[]) =>
      Array.from(els).forEach(el => {
        el.classList.remove("hidden");
        void (el as HTMLElement).offsetWidth;
        el.classList.add("visible");
      });

    const setStage = (s: string) => {
      body.classList.remove(
        "stage-login",
        "stage-util",
        "stage-account",
        "stage-help",
        "stage-util-pre"
      );
      body.classList.add(s);
    };

    /* Show lines & util on first pointer */
    let phase = 0;
    const inLogin = (x: number, y: number) => {
      const vw = innerWidth, vh = innerHeight;
      return x >= vw*0.0641 && x <= vw*0.2886 && y >= vh*0.285 && y <= vh*0.84;
    };
    const firstMove = (e: PointerEvent | TouchEvent) => {
      const p = "touches" in e ? (e as TouchEvent).touches[0] : (e as PointerEvent);
      const {clientX:x, clientY:y}=p;

      if(phase===0){
        body.classList.add("fade-in-trigger");
        phase=1;
        return;
      }
      if(phase===1 && inLogin(x,y)){
        fadeIn(loginEls);
        phase=2;
        window.removeEventListener("pointermove",firstMove);
        window.removeEventListener("touchstart",firstMove);
      }
    };
    window.addEventListener("pointermove",firstMove,{passive:true});
    window.addEventListener("touchstart",firstMove,{passive:true});

  }, []);

  const handleUtilClick = () =>{
    const body = document.body;
    const loginEls = containerRef.current!.querySelectorAll(
      ".username, .password, .login-line, .login-line-second"
    );
    fadeIn([...loginEls, openTextRef.current!, helpTextRef.current!]);
    requestAnimationFrame(()=>requestAnimationFrame(()=>setStage("stage-util")));

    function fadeIn(els:Element[]|NodeListOf<Element>){
      Array.from(els).forEach(el=>{
        el.classList.remove("hidden");
        void (el as HTMLElement).offsetWidth;
        el.classList.add("visible");
      });
    }
    function setStage(s:string){
      body.classList.remove("stage-login","stage-util-pre","stage-account","stage-help","stage-util");
      body.classList.add(s);
    }
  };

  return (
    <div ref={containerRef}>
      <div className="line original"/>
      <div className="line second"/>
      <div className="line third"/>
      <div className="line fourth"/>
      <div className="line fifth"/>
      <div className="line sixth"/>
      <div className="line util-line" onClick={handleUtilClick}/>

      <span className="login-text username hidden">USERnAME</span>
      <span className="login-text password hidden">PASSWORD</span>

      <span className="login-text open-text hidden" ref={openTextRef}>OPEn AccOUnT</span>
      <span className="login-text help-text hidden" ref={helpTextRef}>HELP REQUEST</span>

      <div className="line login-line hidden"/>
      <div className="line login-line-second hidden"/>

      <div className="account-wrapper" ref={accountWrapperRef}>
        <span className="account-text account-email">E-MA1L ADDRESS</span>
        <span className="account-text account-username">YOUR USERnAME</span>
        <span className="account-text account-sign-password">YOUR PASSWORD</span>
        <span className="account-text account-repeat-password">REDO PASSWORD</span>
        <div className="account-line account-line1"/>
        <div className="account-line account-line2"/>
        <div className="account-line account-line3"/>
        <div className="account-line account-line4"/>
      </div>

      <div className="help-wrapper" ref={helpWrapperRef}>
        <span className="help-text-area email">YOUR EMA1L</span>
        <span className="help-text-area sendlink">SEnD L1nK</span>
        <div className="help-line"/>
      </div>

      <div className="layer-one"/>
      <div className="layer-two"/>
    </div>
  );
}
