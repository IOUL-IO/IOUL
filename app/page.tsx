"use client";
import React, { useEffect } from 'react';

export default function Page() {
  useEffect(() => {
    /* ===== Element groups ===== */
    const loginEls = document.querySelectorAll('.username, .password, .login-line, .login-line-second');
    const utilLine = document.querySelector('.util-line');
    const openText = document.querySelector('.open-text');
    const helpText = document.querySelector('.help-text');
    const accountWrap = document.querySelector('.account-wrapper');
    const helpWrap = document.querySelector('.help-wrapper');
    const body = document.body;

    /* ===== Helper functions ===== */
    const fadeInEls = (els: NodeListOf<Element>) => {
      els.forEach(el => {
        el.classList.remove('hidden');
        void (el as HTMLElement).offsetWidth;
        el.classList.add('visible');
      });
    };
    const fadeOutEls = (els: NodeListOf<Element>) =>
      Promise.all(Array.from(els).map(el => new Promise<void>(res => {
        if (!el.classList.contains('visible')) { res(); return; }
        const end = (e: TransitionEvent) => {
          if (e.propertyName === 'opacity') {
            el.removeEventListener('transitionend', end);
            res();
          }
        };
        el.addEventListener('transitionend', end);
        el.classList.remove('visible');
        void (el as HTMLElement).offsetWidth;
        el.classList.add('hidden');
      })));

    /* ===== Stage management ===== */
    function setStage(name: string) {
      body.classList.remove('stage-login','stage-util','stage-account','stage-help');
      body.classList.add(name);
    }

    /* ===== Initial hover logic ===== */
    let phase = 0;
    function inLoginZone(x: number, y: number) {
      const vw = window.innerWidth, vh = window.innerHeight;
      return x >= vw * 0.0641 && x <= vw * 0.2886 && y >= vh * 0.285 && y <= vh * 0.84;
    }
    function initialPointer(e: PointerEvent | TouchEvent) {
      const p = (e as TouchEvent).touches ? (e as TouchEvent).touches[0] : (e as PointerEvent);
      const x = p.clientX, y = p.clientY;
      if (phase === 0) {
        document.body.classList.add('fade-in-trigger');
        phase = 1;
        return;
      }
      if (phase === 1 && inLoginZone(x, y)) {
        fadeInEls(loginEls);
        phase = 2;
        window.removeEventListener('pointermove', initialPointer);
        window.removeEventListener('touchstart', initialPointer);
      }
    }
    window.addEventListener('pointermove', initialPointer, { passive: true });
    window.addEventListener('touchstart', initialPointer, { passive: true });

    /* ===== Sequential logic ===== */
    let step = 0;
    const loginFadeTimeout = 20000; // 20 seconds
    let inactivityTimer: number;
    let loginElsHidden = false;

    function resetInactivityTimer() {
      clearTimeout(inactivityTimer);
      if (step !== 0) return;
      inactivityTimer = window.setTimeout(() => {
        if (step === 0) {
          fadeOutEls(loginEls).then(() => { loginElsHidden = true; });
        }
      }, loginFadeTimeout);
    }

    ['mousemove','mousedown','keydown','touchstart'].forEach(evt =>
      window.addEventListener(evt, resetInactivityTimer, { passive: true })
    );

    window.addEventListener('pointermove', (ev: PointerEvent) => {
      if (step !== 0 || !loginElsHidden) return;
      const x = ev.clientX, y = ev.clientY;
      if (inLoginZone(x, y)) {
        fadeInEls(loginEls);
        loginElsHidden = false;
        resetInactivityTimer();
      }
    }, { passive: true });

    resetInactivityTimer();

    /* ===== Click handlers ===== */
    utilLine?.addEventListener('click', () => {
      if (step !== 0) return;
      setStage('stage-util');
      step = 1;
    });

    openText?.addEventListener('click', () => {
      if (step !== 1) return;
      accountWrap?.classList.add('active');
      setStage('stage-account');
      step = 2;
    });

    helpText?.addEventListener('click', () => {
      if (step !== 1) return;
      helpWrap?.classList.add('active');
      setStage('stage-help');
      step = 3;
    });

    /* ===== Back‑tap area ===== */
    document.addEventListener('click', (e: MouseEvent) => {
      const x = e.clientX, y = e.clientY;
      const vw = window.innerWidth, vh = window.innerHeight;
      const backZone = x <= vw * 0.0637 && y >= vh * 0.285 && y <= vh * 0.84;
      if (!backZone) return;
      if (step === 1) {
        setStage('stage-util-pre');
        setTimeout(() => {
          body.classList.remove('stage-util-pre');
          setStage('stage-login');
          fadeInEls(loginEls);
          step = 0;
        }, 700);
      } else if (step === 2) {
        accountWrap?.classList.remove('active');
        setStage('stage-util');
        step = 1;
      } else if (step === 3) {
        helpWrap?.classList.remove('active');
        setStage('stage-util');
        step = 1;
      }
    });

    /* ===== Editable text logic ===== */
    const editableSel = '.username, .password, .account-text, .help-text-area';
    function findEditable(ev: any): HTMLElement | null {
      let el = (ev.target as HTMLElement).closest(editableSel) as HTMLElement;
      if (!el) {
        const alt = document.elementFromPoint(ev.clientX, ev.clientY);
        if (alt) el = (alt as HTMLElement).closest(editableSel) as HTMLElement;
      }
      return el;
    }

    document.addEventListener('pointerdown', (ev: PointerEvent) => {
      const el = findEditable(ev);
      if (!el) return;
      if (/send\s*l1nk/i.test(el.textContent || '') || el.classList.contains('send-link') || el.id === 'send-link') return;
      if (el.isContentEditable) return;
      ev.preventDefault();
      el.dataset.placeholder = el.textContent || '';
      el.textContent = '';
      el.setAttribute('contenteditable', 'true');
      el.focus({ preventScroll: true });
    }, true);

    document.addEventListener('focusout', (ev: FocusEvent) => {
      const el = ev.target as HTMLElement;
      if (!el || !el.matches(editableSel) || !el.isContentEditable) return;
      if (el.textContent?.trim() === '') {
        el.textContent = el.dataset.placeholder || '';
        el.removeAttribute('contenteditable');
      }
    }, true);

    /* ===== Fullscreen toggle ===== */
    function toggleFullScreen() {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(() => {});
      } else {
        document.exitFullscreen().catch(() => {});
      }
    }
    document.addEventListener('click', (ev: MouseEvent) => {
      const x = ev.clientX, y = ev.clientY;
      if (x <= 11 || x >= window.innerWidth - 11 || y <= 11 || y >= window.innerHeight - 11) {
        toggleFullScreen();
      }
    });
  }, []);

  return (
    <>
      <div className="line original" />
      <div className="line second" />
      <div className="line third" />
      <div className="line fourth" />
      <div className="line fifth" />
      <div className="line sixth" />
      <div className="line util-line" />

      <span className="login-text username hidden">USERnAME</span>
      <span className="login-text password hidden">PASSWORD</span>

      <span className="login-text open-text hidden">OPEn AccOUnT</span>
      <span className="login-text help-text hidden">HELP REQUEST</span>

      <div className="line login-line hidden" />
      <div className="line login-line-second hidden" />

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

      <div className="help-wrapper">
        <span className="help-text-area email">YOUR EMA1L</span>
        <span className="help-text-area sendlink">SEnD L1nK</span>
        <div className="help-line" />
      </div>

      <div className="layer-one" />
      <div className="layer-two" />
    </>
);
}
