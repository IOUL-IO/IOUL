// @ts-nocheck
"use client";
import React, { useEffect, useRef } from "react";

export default function Page() {
  const containerRef = useRef<HTMLDivElement>(null);
  const openTextRef  = useRef<HTMLSpanElement>(null);
  const helpTextRef  = useRef<HTMLSpanElement>(null);
  const accountRef   = useRef<HTMLDivElement>(null);
  const helpRef      = useRef<HTMLDivElement>(null);

  /* Stage tracker kept in a mutable ref */
  const stage = useRef<0|1|2|3>(0); // 0 login, 1 util, 2 account, 3 help

  /* Helper: fade elements */
  const fadeIn = (els: Element[] | NodeListOf<Element>) =>
    Array.from(els).forEach((el) => {
      el.classList.remove("hidden");
      void (el as HTMLElement).offsetWidth;
      el.classList.add("visible");
    });

  /* Helper: set stage class on <body> */
  const setStage = (name:string) =>{
    document.body.classList.remove(
      "stage-login",
      "stage-util",
      "stage-account",
      "stage-help",
      "stage-util-pre"
    );
    document.body.classList.add(name);
  };

  /* util‑line click */
  const handleUtilClick = () =>{
    if(stage.current!==0) return;

    const loginEls = containerRef.current!.querySelectorAll(
      ".username, .password, .login-line, .login-line-second"
    );
    fadeIn(loginEls);
    fadeIn([openTextRef.current!, helpTextRef.current!]);

    /* Double rAF ensures browser registers starting positions */
    requestAnimationFrame(()=>requestAnimationFrame(()=>setStage("stage-util")));
    stage.current = 1;
  };

  /* OPEN / HELP handlers */
  const handleOpen = () =>{
    if(stage.current!==1) return;
    accountRef.current!.classList.add("active");
    setStage("stage-account");
    stage.current = 2;
  };
  const handleHelp = () =>{
    if(stage.current!==1) return;
    helpRef.current!.classList.add("active");
    setStage("stage-help");
    stage.current = 3;
  };

  /* Ensure util‑line clickable & masks non-blocking on mount */
  useEffect(()=>{
    const util = containerRef.current!.querySelector(".util-line") as HTMLElement;
    util.style.pointerEvents = "auto";
    util.style.zIndex = "9999";
    containerRef.current!.querySelectorAll(".layer-one, .layer-two")
      .forEach(el=>((el as HTMLElement).style.pointerEvents="none"));
  },[]);

  return (
    <div ref={containerRef}>
      {/* Static lines */}
      <div className="line original"/>
      <div className="line second"/>
      <div className="line third"/>
      <div className="line fourth"/>
      <div className="line fifth"/>
      <div className="line sixth"/>
      <div className="line util-line" onClick={handleUtilClick}/>

      {/* Login */}
      <span className="login-text username hidden">USERnAME</span>
      <span className="login-text password hidden">PASSWORD</span>

      {/* Util texts */}
      <span className="login-text open-text hidden" ref={openTextRef} onClick={handleOpen}>OPEn AccOUnT</span>
      <span className="login-text help-text hidden" ref={helpTextRef} onClick={handleHelp}>HELP REQUEST</span>

      {/* Login entry lines */}
      <div className="line login-line hidden"/>
      <div className="line login-line-second hidden"/>

      {/* Account section */}
      <div className="account-wrapper" ref={accountRef}>
        <span className="account-text account-email">E-MA1L ADDRESS</span>
        <span className="account-text account-username">YOUR USERnAME</span>
        <span className="account-text account-sign-password">YOUR PASSWORD</span>
        <span className="account-text account-repeat-password">REDO PASSWORD</span>
        <div className="account-line account-line1"/>
        <div className="account-line account-line2"/>
        <div className="account-line account-line3"/>
        <div className="account-line account-line4"/>
      </div>

      {/* Help section */}
      <div className="help-wrapper" ref={helpRef}>
        <span className="help-text-area email">YOUR EMA1L</span>
        <span className="help-text-area sendlink">SEnD L1nK</span>
        <div className="help-line"/>
      </div>

      {/* Masks */}
      <div className="layer-one"/>
      <div className="layer-two"/>
    </div>
  );
}
