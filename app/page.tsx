"use client";
import React, { useEffect } from 'react';

export default function Page() {
  useEffect(() => {
    /* ===== Element groups ===== */
    const loginEls = document.querySelectorAll<HTMLElement>('.username, .password, .login-line, .login-line-second');
    const utilLine = document.querySelector<HTMLElement>('.util-line');
    const openText = document.querySelector<HTMLElement>('.open-text');
    const helpText = document.querySelector<HTMLElement>('.help-text');
    const accountWrap = document.querySelector<HTMLElement>('.account-wrapper');
    const helpWrap = document.querySelector<HTMLElement>('.help-wrapper');
    const body = document.body;

    /* ===== Helper functions ===== */
    const fadeInEls = (els: Iterable<HTMLElement>) =>
      Array.from(els).forEach((el) => {
        el.classList.remove('hidden');
        // Force reflow so opacity transition triggers
        void el.offsetWidth;
        el.classList.add('visible');
      });

    const fadeOutEls = (els: Iterable<HTMLElement>) =>
      Promise.all(
        Array.from(els).map(
          (el) =>
            new Promise<void>((res) => {
              if (!el.classList.contains('visible')) {
                res();
                return;
              }
              const end = (e: TransitionEvent) => {
                if (e.propertyName === 'opacity') {
                  el.removeEventListener('transitionend', end);
                  el.classList.add('hidden');
                  el.classList.remove('visible');
                  res();
                }
              };
              el.addEventListener('transitionend', end, { once: true });
              el.classList.remove('visible');
            })
        )
      );

    let phase = 0; // 0 = intro, 1 = login shown, 2 = account, 3 = help

    const vw = () => window.innerWidth;
    const vh = () => window.innerHeight;

    const inLoginZone = (x: number, y: number) => {
      // login zone matches original rectangular hotspot
      return x >= vw() * 0.085 && x <= vw() * 0.91 && y >= vh() * 0.46 && y <= vh() * 0.7;
    };

    /* ===== Stage helpers (toggle body class) ===== */
    const setStage = (name: string) => {
      body.classList.remove(
        'stage-intro',
        'stage-login',
        'stage-util-pre',
        'stage-util',
        'stage-account',
        'stage-help'
      );
      body.classList.add(name);
    };

    /* ===== Intro pointer‑move ===== */
    function initialPointer(p: PointerEvent | TouchEvent) {
      const { clientX: x, clientY: y } = 'touches' in p ? p.touches[0] : (p as PointerEvent);

      if (phase === 0) {
        body.classList.add('fade-in-trigger'); // lines & util fade in
        phase = 1;
        return;
      }
      if (phase === 1 && inLoginZone(x, y)) {
        fadeInEls(loginEls); // login group fade in
        phase = 2;
        window.removeEventListener('pointermove', initialPointer);
        window.removeEventListener('touchstart', initialPointer);
      }
    }
    window.addEventListener('pointermove', initialPointer, { passive: true });
    window.addEventListener('touchstart', initialPointer, { passive: true });

    /* ===== Sequential logic ===== */
    let step = 0;

    /* ===== Inactivity auto‑fade for login group ===== */
    const loginFadeTimeout = 20000; // 20 seconds
    let inactivityTimer: any;
    let loginElsHidden = false;

    function resetInactivityTimer() {
      clearTimeout(inactivityTimer);
      if (step !== 0) return; // only care in login state
      inactivityTimer = setTimeout(async () => {
        if (step === 0) {
          await fadeOutEls(loginEls);
          loginElsHidden = true;
        }
      }, loginFadeTimeout);
    }

    // Track pointer activity to reset inactivity timer
    ['pointermove', 'touchstart'].forEach((ev) =>
      window.addEventListener(ev, resetInactivityTimer, { passive: true })
    );

    /* ===== Util‑line click (login → util) ===== */
    utilLine?.addEventListener('click', () => {
      if (step !== 0) return;

      // Ensure elements are visible before slide
      fadeInEls(loginEls);
      fadeInEls([openText!, helpText!]);

      // Wait for next paint so browser registers initial position, then slide
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setStage('stage-util');
        });
      });

      step = 1;
    });

    /* ===== OPEn click (util → account) ===== */
    openText?.addEventListener('click', () => {
      if (step !== 1) return;
      accountWrap?.classList.add('active');
      setStage('stage-account');
      step = 2;
    });

    /* ===== HELP click (util → help) ===== */
    helpText?.addEventListener('click', () => {
      if (step !== 1) return;
      helpWrap?.classList.add('active');
      setStage('stage-help');
      step = 3;
    });

    /* ===== Back‑tap area (left gutter) ===== */
    document.addEventListener(
      'click',
      async (e) => {
        const { clientX: x, clientY: y } = e;
        const backZone = x <= vw() * 0.0637 && y >= vh() * 0.285 && y <= vh() * 0.84;
        if (!backZone) return;

        if (step === 1) {
          /* reverse util -> login */
          setStage('stage-util-pre'); // start OPEn / HELP slide‑out (no fade yet)
          setTimeout(() => {
            // after 0.7 s slide completes…
            body.classList.remove('stage-util-pre'); // drop pre‑stage so login rules win
            setStage('stage-login'); // slide login texts & lines back in
            fadeInEls(loginEls); // ensure they’re visible
            step = 0;
            resetInactivityTimer();
          }, 700);
        }
        if (step === 2) {
          /* reverse account -> util */
          accountWrap?.classList.remove('active');
          setStage('stage-util');
          step = 1;
        }
        if (step === 3) {
          /* reverse help -> util */
          helpWrap?.classList.remove('active');
          setStage('stage-util');
          step = 1;
        }
      },
      true
    );

    /* ===== Inline placeholder-to-input trick ===== */
    document.addEventListener(
      'click',
      (ev) => {
        const el = ev.target as HTMLElement | null;
        if (
          !el ||
          !el.matches ||
          !(
            el.classList.contains('account-text') ||
            el.classList.contains('help-text-area')
          )
        )
          return;

        // skip send link
        if (
          /send\s*l1nk/i.test(el.textContent || '') ||
          /send\s*link/i.test(el.textContent || '') ||
          el.classList.contains('send-link') ||
          el.id === 'send-link'
        )
          return;

        if (el.isContentEditable) return;
        ev.preventDefault();
        el.dataset.placeholder = el.textContent || '';
        el.textContent = '';
        el.setAttribute('contenteditable', 'true');
        el.focus({ preventScroll: true });
      },
      true
    );

    document.addEventListener('focusout', (ev) => {
      const el = ev.target as HTMLElement | null;
      if (
        !el ||
        !el.matches ||
        (!el.classList.contains('account-text') && !el.classList.contains('help-text-area'))
      )
        return;
      if (el.textContent?.trim() === '') {
        el.textContent = el.dataset.placeholder ?? '';
      }
    });

    /* ===== Cleanup on unmount ===== */
    return () => {
      window.removeEventListener('pointermove', initialPointer);
      window.removeEventListener('touchstart', initialPointer);
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

      {/* Login */}
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
