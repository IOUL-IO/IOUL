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
      void el.offsetWidth; // force reflow before adding hidden
      el.classList.add('hidden');
    })));
    
      /* ===== Stage management ===== */
      function setStage(name){
        body.classList.remove('stage-login','stage-util','stage-account','stage-help');
        body.classList.add(name);
      }
    
      /* ===== Initial hover logic (unchanged) ===== */
      let phase = 0; // 0: waiting for first pointer -> lines fade. 1: waiting for login zone hover
      function inLoginZone(x,y){
          const vw=innerWidth, vh=innerHeight;
          return x>=vw*0.0641 && x<=vw*0.2886 && y>=vh*0.285 && y<=vh*0.84;
      }
      function initialPointer(e){
          const p=e.touches?e.touches[0]:e;
          const {clientX:x, clientY:y}=p;
    
          if(phase===0){
              document.body.classList.add('fade-in-trigger'); // lines & util fade in
              phase=1;
              return;
          }
          if(phase===1 && inLoginZone(x,y)){
              fadeInEls(loginEls);                            // login group fade in
              phase=2;
              window.removeEventListener('pointermove',initialPointer);
              window.removeEventListener('touchstart',initialPointer);
          }
      }
      window.addEventListener('pointermove', initialPointer, {passive:true});
      window.addEventListener('touchstart', initialPointer, {passive:true});
    
      /* ===== Sequential logic ===== */
      let step = 0;
      /* ===== Inactivity auto‑fade for login group ===== */
      const loginFadeTimeout = 20000; // 20 seconds
      let inactivityTimer;
      let loginElsHidden = false;
    
      function resetInactivityTimer(){
        clearTimeout(inactivityTimer);
        if(step !== 0) return; // only care in login state
        inactivityTimer = setTimeout(()=>{
          if(step === 0){
            fadeOutEls(loginEls).then(()=>{ loginElsHidden = true; });
          }
        }, loginFadeTimeout);
      }
    
      /* monitor generic user activity to reset timer */
      ['mousemove','mousedown','keydown','touchstart'].forEach(evt=>{
        window.addEventListener(evt, resetInactivityTimer, {passive:true});
      });
    
      /* hover to bring login back when hidden */
      window.addEventListener('pointermove', (ev)=>{
        if(step !== 0 || !loginElsHidden) return;
        const {clientX:x, clientY:y} = ev;
        if(inLoginZone(x,y)){
          fadeInEls(loginEls);
          loginElsHidden = false;
          resetInactivityTimer();
        }
      }, {passive:true});
    
      // start the timer initially
      resetInactivityTimer();
     // 0: login, 1: util, 2: account, 3: help
    
    
    
    
    utilLine.addEventListener('click', () => {
        if(step!==0) return;
    
        // Ensure elements are visible before slide
        fadeInEls(loginEls);
        fadeInEls([openText, helpText]);
    
        // Wait for next paint so browser registers initial position, then slide
        requestAnimationFrame(() => {
            requestAnimationFrame(()=>{
                setStage('stage-util');
            });
        });
    
        step = 1;
    });
    
    
    
    
      openText.addEventListener('click', () => {
          if(step!==1) return;
          accountWrap.classList.add('active');
          setStage('stage-account');
          step=2;
      });
    
      helpText.addEventListener('click', () => {
          if(step!==1) return;
          helpWrap.classList.add('active');
          setStage('stage-help');
          step=3;
      });
    
      /* ===== Back‑tap area ===== */
      document.addEventListener('click', async (e)=>{
          const {clientX:x, clientY:y}=e;
          const vw=innerWidth, vh=innerHeight;
          const backZone = x<=vw*0.0637 && y>=vh*0.285 && y<=vh*0.84;
          if(!backZone) return;
    
    
          if(step===1){
    /* reverse util -> login */
    setStage('stage-util-pre');                // start OPEn / HELP slide‑out (no fade yet)
    setTimeout(() => {                         // after 0.7 s slide completes…
      body.classList.remove('stage-util-pre'); // drop pre‑stage so login rules win
      setStage('stage-login');                 // slide login texts & lines back in
      fadeInEls(loginEls);                     // ensure they’re visible
      step = 0;
    }, 700);
    
          }else if(step===2){         /* account -> util */
              accountWrap.classList.remove('active');
              setStage('stage-util');
              step=1;
          }else if(step===3){         /* help -> util */
              helpWrap.classList.remove('active');
              setStage('stage-util');
              step=1;
          }
      });
    
      /* ===== Editable text logic (unchanged) ===== */
      const editableSel = '.username, .password, .account-text, .help-text-area';
      function findEditable(ev){
        let el = ev.target.closest(editableSel);
        if(!el){
          const alt = document.elementFromPoint(ev.clientX, ev.clientY);
          if(alt) el = alt.closest(editableSel);
        }
        return el;
      }
    
      document.addEventListener('pointerdown', (ev)=>{
        const el = findEditable(ev);
        if(!el) return;
    
        // skip send link
        if(/send\s*l1nk/i.test(el.textContent) || /send\s*link/i.test(el.textContent) ||
           el.classList.contains('send-link') || el.id === 'send-link') return;
    
        if(el.isContentEditable) return;
        ev.preventDefault();
        el.dataset.placeholder = el.textContent;
        el.textContent = '';
        el.setAttribute('contenteditable','true');
        el.focus({preventScroll:true});
      }, true);
    
      document.addEventListener('focusout', (ev)=>{
        const el = ev.target;
        if(!el || !el.matches || !el.matches(editableSel) || !el.isContentEditable) return;
        if(el.textContent.trim()===''){
          el.textContent = el.dataset.placeholder || '';
          el.removeAttribute('contenteditable');
        }
      }, true);
    
      /* ===== Edge‑click fullscreen toggle ===== */
      function toggleFullScreen(){
        if(!document.fullscreenElement){
          document.documentElement.requestFullscreen().catch(()=>{});
        }else{
          document.exitFullscreen().catch(()=>{});
        }
      }
      document.addEventListener('click', (ev) => {
        const x = ev.clientX, y = ev.clientY;
        if (x <= 11 || x >= innerWidth - 11 || y <= 11 || y >= innerHeight - 11) {
          toggleFullScreen();
        }
      });
  }, []);

  return (
    <>
      {/* Static lines */}
        <div className="line original"></div>
        <div className="line second"></div>
        <div className="line third"></div>
        <div className="line fourth"></div>
        <div className="line fifth"></div>
        <div className="line sixth"></div>
        <div className="line util-line"></div>
      
        {/* Login */}
        <span className="login-text username hidden">USERnAME</span>
        <span className="login-text password hidden">PASSWORD</span>
      
        {/* Util texts */}
        <span className="login-text open-text hidden">OPEn AccOUnT</span>
        <span className="login-text help-text hidden">HELP REQUEST</span>
      
        {/* Login entry lines */}
        <div className="line login-line hidden"></div>
        <div className="line login-line-second hidden"></div>
      
        {/* Account creation wrapper */}
        <div className="account-wrapper">
          <span className="account-text account-email">E-MA1L ADDRESS</span>
          <span className="account-text account-username">YOUR USERnAME</span>
          <span className="account-text account-sign-password">YOUR PASSWORD</span>
          <span className="account-text account-repeat-password">REDO PASSWORD</span>
          <div className="account-line account-line1"></div>
          <div className="account-line account-line2"></div>
          <div className="account-line account-line3"></div>
          <div className="account-line account-line4"></div>
        </div>
      
        {/* Help wrapper */}
        <div className="help-wrapper">
          <span className="help-text-area email">YOUR EMA1L</span>
          <span className="help-text-area sendlink">SEnD L1nK</span>
          <div className="help-line"></div>
        </div>
      
        {/* Masking layers */}
        <div className="layer-one"></div>
        <div className="layer-two"></div>
    </>
  );
}
