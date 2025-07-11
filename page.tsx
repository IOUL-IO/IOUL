// @ts-nocheck
"use client";
import React, { useEffect, useRef } from "react";

export default function Page() {
  /* === Refs === */
  const step     = useRef(0); // 0 login, 1 util, 2 account, 3 help
  const wrap     = useRef<HTMLDivElement>(null);
  const utilLine = useRef<HTMLDivElement>(null);
  const openTxt  = useRef<HTMLSpanElement>(null);
  const helpTxt  = useRef<HTMLSpanElement>(null);
  const accountW = useRef<HTMLDivElement>(null);
  const helpW    = useRef<HTMLDivElement>(null);

  /* === useEffect: hook up all legacy behaviour === */
  useEffect(() => {
    const body = document.body;
    const loginEls = wrap.current!.querySelectorAll(
      ".username, .password, .login-line, .login-line-second"
    );

    /* --- guarantee util-line clickability --- */
    const utilEl = utilLine.current!;
    utilEl.style.pointerEvents = "auto";
    utilEl.style.zIndex = "9999";
    wrap.current!
      .querySelectorAll(".layer-one, .layer-two")
      .forEach((l) => ((l as HTMLElement).style.pointerEvents = "none"));

    /* --- fade helpers --- */
    const fadeIn = (els: NodeListOf<Element>|Element[]) =>
      Array.from(els).forEach((el) => {
        el.classList.remove("hidden");
        void (el as HTMLElement).offsetWidth;
        el.classList.add("visible");
      });

    const fadeOut = (els: NodeListOf<Element>|Element[]) =>
      Promise.all(
        Array.from(els).map(
          (el) =>
            new Promise<void>((res) => {
              if (!el.classList.contains("visible")) {res();return;}
              const end = (e:TransitionEvent)=>{
                if(e.propertyName==="opacity"){
                  el.removeEventListener("transitionend", end);
                  res();
                }
              };
              el.addEventListener("transitionend", end);
              el.classList.remove("visible");
              void (el as HTMLElement).offsetWidth;
              el.classList.add("hidden");
            })
        )
      );

    /* --- setStage helper --- */
    const setStage = (s:string)=>{
      body.classList.remove(
        "stage-login","stage-util","stage-account","stage-help","stage-util-pre"
      );
      body.classList.add(s);
    };

    /* === Initial pointer logic === */
    let phase = 0;
    const inLoginZone = (x:number,y:number)=>{
      const vw = innerWidth, vh = innerHeight;
      return x>=vw*0.0641 && x<=vw*0.2886 && y>=vh*0.285 && y<=vh*0.84;
    };
    const firstPointer = (e:PointerEvent|TouchEvent)=>{
      const p = "touches" in e ? (e as TouchEvent).touches[0] : (e as PointerEvent);
      const {clientX:x, clientY:y} = p;
      if(phase===0){
        body.classList.add("fade-in-trigger");
        phase=1;
        return;
      }
      if(phase===1 && inLoginZone(x,y)){
        fadeIn(loginEls);
        phase=2;
        window.removeEventListener("pointermove",firstPointer);
        window.removeEventListener("touchstart",firstPointer);
      }
    };
    window.addEventListener("pointermove",firstPointer,{passive:true});
    window.addEventListener("touchstart",firstPointer,{passive:true});

    /* === Inactivity auto-fade === */
    const loginFadeTimeout = 20000;
    let hidden=false;
    let timer:number;
    const resetTimer=()=>{
      clearTimeout(timer);
      if(step.current!==0) return;
      timer = window.setTimeout(()=>{
        if(step.current===0){
          fadeOut(loginEls).then(()=> hidden=true);
        }
      }, loginFadeTimeout);
    };
    ["mousemove","mousedown","keydown","touchstart"].forEach(evt=>
      window.addEventListener(evt,resetTimer,{passive:true})
    );
    window.addEventListener("pointermove",(ev)=>{
      if(step.current!==0 || !hidden) return;
      const {clientX:x, clientY:y}=ev;
      if(inLoginZone(x,y)){
        fadeIn(loginEls);
        hidden=false;
        resetTimer();
      }
    },{passive:true});
    resetTimer();

    /* === Back‑tap to reverse === */
    document.addEventListener("click",(e)=>{
      const {clientX:x, clientY:y}=e;
      const vw=innerWidth, vh=innerHeight;
      const back=x<=vw*0.0637 && y>=vh*0.285 && y<=vh*0.84;
      if(!back) return;
      if(step.current===1){
        setStage("stage-util-pre");
        setTimeout(()=>{
          body.classList.remove("stage-util-pre");
          setStage("stage-login");
          fadeIn(loginEls);
          step.current=0;
        },700);
      }else if(step.current===2){
        accountW.current!.classList.remove("active");
        setStage("stage-util");
        step.current=1;
      }else if(step.current===3){
        helpW.current!.classList.remove("active");
        setStage("stage-util");
        step.current=1;
      }
    });

    /* cleanup */
    return ()=>{
      window.removeEventListener("pointermove",firstPointer);
      window.removeEventListener("touchstart",firstPointer);
      ["mousemove","mousedown","keydown","touchstart"].forEach(evt=>
        window.removeEventListener(evt,resetTimer)
      );
    };
  }, []);

  /* === util-line click (React handler) === */
  const onUtilClick = ()=>{
    if(step.current!==0) return;
    const body=document.body;
    // show login els + util texts
    const loginEls = wrap.current!.querySelectorAll(
      ".username, .password, .login-line, .login-line-second"
    );
    loginEls.forEach(el=>{
      el.classList.remove("hidden");
      void (el as HTMLElement).offsetWidth;
      el.classList.add("visible");
    });
    openTxt.current!.classList.remove("hidden");
    helpTxt.current!.classList.remove("hidden");

    // trigger stage
    requestAnimationFrame(()=>requestAnimationFrame(()=>body.classList.add("stage-util")));
    step.current=1;
  };

  return (
    <div ref={wrap}>
      {/* lines */}
      <div className="line original"/>
      <div className="line second"/>
      <div className="line third"/>
      <div className="line fourth"/>
      <div className="line fifth"/>
      <div className="line sixth"/>
      <div className="line util-line" ref={utilLine} onClick={onUtilClick}
           style={{pointerEvents:"auto",zIndex:9999}}/>

      {/* login */}
      <span className="login-text username hidden">USERnAME</span>
      <span className="login-text password hidden">PASSWORD</span>

      {/* util */}
      <span className="login-text open-text hidden" ref={openTxt}>OPEn AccOUnT</span>
      <span className="login-text help-text hidden" ref={helpTxt}>HELP REQUEST</span>

      {/* login entry lines */}
      <div className="line login-line hidden"/>
      <div className="line login-line-second hidden"/>

      {/* account */}
      <div className="account-wrapper" ref={accountW}>
        <span className="account-text account-email">E-MA1L ADDRESS</span>
        <span className="account-text account-username">YOUR USERnAME</span>
        <span className="account-text account-sign-password">YOUR PASSWORD</span>
        <span className="account-text account-repeat-password">REDO PASSWORD</span>
        <div className="account-line account-line1"/>
        <div className="account-line account-line2"/>
        <div className="account-line account-line3"/>
        <div className="account-line account-line4"/>
      </div>

      {/* help */}
      <div className="help-wrapper" ref={helpW}>
        <span className="help-text-area email">YOUR EMA1L</span>
        <span className="help-text-area sendlink">SEnD L1nK</span>
        <div className="help-line"/>
      </div>

      {/* masks */}
      <div className="layer-one" style={{pointerEvents:"none"}}/>
      <div className="layer-two" style={{pointerEvents:"none"}}/>
    </div>
  );
}
