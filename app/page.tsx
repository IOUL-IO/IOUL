// @ts-nocheck
"use client";
import React, { useEffect } from "react";

export default function Page() {
  useEffect(() => {
/* ===== Element groups ===== */
const loginEls    = document.querySelectorAll('.username, .password, .login-line, .login-line-second');
const utilLine    = document.querySelector('.util-line');
const openText    = document.querySelector('.open-text');
const helpText    = document.querySelector('.help-text');
const accountWrap = document.querySelector('.account-wrapper');
const helpWrap    = document.querySelector('.help-wrapper');
const body        = document.body;

/* ===== Helper functions ===== */
const fadeInEls = (els) => els.forEach(el => {
  el.classList.remove('hidden');
  void el.offsetWidth; // force reflow so opacity transition triggers
  el.classList.add('visible');
});
const fadeOutEls = (els) => Promise.all(Array.from(els).map(el => new Promise(res => {
  if (!el.classList.contains('visible')) { res(); return; }
  const end = (e) => {
    if (e.propertyName === 'opacity') {
      el.removeEventListener('transitionend', end);
      res();
    }
  };
  el.addEventListener('transitionend', end);
  el.classList.remove('visible');
  void el.offsetWidth;
  el.classList.add('hidden');
})));

/* ===== Stage management ===== */
function setStage(name:string){
  body.classList.remove('stage-login','stage-util','stage-account','stage-help','stage-util-pre');
  body.classList.add(name);
}

/* ===== Initial hover logic ===== */
let phase = 0; // 0: wait first pointer, 1: wait hover login zone
function inLoginZone(x:number,y:number){
    const vw=innerWidth, vh=innerHeight;
    return x>=vw*0.0641 && x<=vw*0.2886 && y>=vh*0.285 && y<=vh*0.84;
}
function initialPointer(p:PointerEvent|TouchEvent){
    const evt = 'clientX' in p ? p : p.touches[0];
    const x = (evt as any).clientX;
    const y = (evt as any).clientY;

    if(phase===0){
        document.body.classList.add('fade-in-trigger');
        phase=1;
        return;
    }
    if(phase===1 && inLoginZone(x,y)){
        fadeInEls(loginEls);
        phase=2;
        window.removeEventListener('pointermove',initialPointer);
        window.removeEventListener('touchstart',initialPointer);
    }
}
window.addEventListener('pointermove', initialPointer, {passive:true});
window.addEventListener('touchstart', initialPointer, {passive:true});

/* ===== Sequential logic ===== */
let step = 0;      // 0: login, 1: util, 2: account/help
let loginElsHidden = false;

/* ===== Inactivity auto‑fade for login group ===== */
const loginFadeTimeout = 20000;
let inactivityTimer:number;
function resetInactivityTimer(){
  clearTimeout(inactivityTimer);
  if(step !== 0) return;
  inactivityTimer = window.setTimeout(()=>{
    if(step===0){
      fadeOutEls(loginEls).then(()=>{ loginElsHidden = true; });
    }
  }, loginFadeTimeout);
}
['pointermove','touchstart','keydown'].forEach(evt=>{
  window.addEventListener(evt, resetInactivityTimer, {passive:true});
});
resetInactivityTimer();

/* ===== Util toggle ===== */
window.addEventListener('pointermove', (ev:PointerEvent)=>{
  if(step!==0) return;
  const {clientX:x, clientY:y}=ev;
  const vw=innerWidth, vh=innerHeight;
  const utilZone = x>=vw*0.2886 && x<=vw*0.51 && y>=vh*0.285 && y<=vh*0.84;
  if(utilZone){
    setStage('stage-util');
    step=1;
    if(loginElsHidden){
      fadeInEls(loginEls);
      loginElsHidden=false;
    }
  }
});

/* ===== Util line click => toggle help/open buttons ===== */
utilLine?.addEventListener('click', () => {
  if(step!==1) return;
  setStage('stage-util');
});

/* ===== Open account flow ===== */
openText?.addEventListener('click', () => {
  if(step!==1) return;
  setStage('stage-account');
  step=2;
});
helpText?.addEventListener('click', () => {
  if(step!==1) return;
  setStage('stage-help');
  step=2;
});

/* ===== Back‑tap area ===== */
document.addEventListener('click', async (e:MouseEvent)=>{
  const {clientX:x, clientY:y}=e;
  const vw=innerWidth, vh=innerHeight;
  const backZone = x<=vw*0.0637 && y>=vh*0.285 && y<=vh*0.84;
  if(!backZone) return;

  if(step===1){
    /* util -> login */
    setStage('stage-util-pre');
    setTimeout(()=>{
      body.classList.remove('stage-util-pre');
      step=0;
      setStage('stage-login');
      resetInactivityTimer();
    }, 700);
  } else if(step===2){
    /* account/help -> util */
    setStage('stage-util');
    step=1;
  }
});

/* ===== Form focus handling ===== */
document.addEventListener('pointerdown', (ev)=>{
  const t = ev.target as HTMLElement;
  if(accountWrap?.contains(t)){
    setStage('stage-account-focus');
  } else if(helpWrap?.contains(t)){
    setStage('stage-help-focus');
  }
});
document.addEventListener('focusout', (ev)=>{
  if(step===2){
    setStage(step===2 && body.classList.contains('stage-account-focus') ? 'stage-account' : 'stage-help');
  }
});

/* ===== Prevent accidental nav while focused ===== */
document.addEventListener('click', (ev)=>{
  const t = ev.target as HTMLElement;
  if(body.classList.contains('stage-account-focus') && !accountWrap?.contains(t)){
    ev.preventDefault(); ev.stopPropagation();
  }
  if(body.classList.contains('stage-help-focus') && !helpWrap?.contains(t)){
    ev.preventDefault(); ev.stopPropagation();
  }
});

    return () => {
      /* Basic cleanup */
      window.removeEventListener("pointermove", initialPointer as any);
      window.removeEventListener("touchstart", initialPointer as any);
    };
  }, []);

  return (
    <>
      {/* Static lines */}
      <div className="line original" />
      <div className="line second" />
      <div className="line third" />
      <div className="line fourth" />
      <div className="line fifth" />
      <div className="line sixth" />
      <div className="line util-line" />

      {/* Login texts */}
      <span className="login-text username hidden">USERnAME</span>
      <span className="login-text password hidden">PASSWORD</span>

      {/* Util texts */}
      <span className="login-text open-text hidden">OPEn AccOUnT</span>
      <span className="login-text help-text hidden">HELP REQUEST</span>

      {/* Login entry lines */}
      <div className="line login-line hidden" />
      <div className="line login-line-second hidden" />

      {/* Account creation wrapper */}
      <div className="account-wrapper">
        <span className="account-text account-email">E-MA1L ADDRESS</span>
        <span className="account-text account-username">YOUR USERnAME</span>
        <span className="account-text account-sign-password">YOUR PASSWORD</span>
        <span className="account-text account-repeat-password">REDO PASSWORD</span>
        <div className="account-line account-line1" />
        <div className="account-line account-line2" />
        <div className="account-line account-line3" />
        <div className="account-line account-line4" />
      </div>

      {/* Help wrapper */}
      <div className="help-wrapper">
        <span className="help-text-area email">YOUR EMA1L</span>
        <span className="help-text-area sendlink">SEnD L1nK</span>
        <div className="help-line" />
      </div>

      {/* Masking layers */}
      <div className="layer-one" />
      <div className="layer-two" />

    </>
  );
}
