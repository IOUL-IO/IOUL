"use client";
import React, { useEffect } from 'react';

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
          const { innerWidth: w, innerHeight: h } = window;
          const top = h*0.35, bottom = h*0.55, left = w*0.35, right = w*0.65;
          return x >= left && x <= right && y >= top && y <= bottom;
      }
      function initialPointer(p){
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
      window.addEventListener('pointermove', initialPointer);
      window.addEventListener('touchstart', initialPointer);
    
      /* ===== Utility text hover ===== */
      utilLine.addEventListener('mouseenter', () => {
        fadeInEls([openText, helpText]);
      });
      utilLine.addEventListener('mouseleave', () => {
        fadeOutEls([openText, helpText]);
      });
    
      /* ===== Utility text click ===== */
      openText.addEventListener('click', () => {
        fadeOutEls(loginEls);
        setStage('stage-account');
        fadeInEls(accountWrap.querySelectorAll('*'));
      });
    
      helpText.addEventListener('click', () => {
        fadeOutEls(loginEls);
        setStage('stage-help');
        fadeInEls(helpWrap.querySelectorAll('*'));
      });
    
      /* ===== Editable text zones ===== */
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
        }
        el.removeAttribute('contenteditable');
        delete el.dataset.placeholder;
      });
    
      /* ===== Fullscreen toggle on corner click ===== */
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
    <main>
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
    </main>
  );
}
