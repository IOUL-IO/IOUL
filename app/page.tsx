
'use client';
import React, { useEffect, useRef } from 'react';

/**
 * Login page – faithful port of the legacy HTML/JS.
 * Key differences from previous attempts:
 *   • Pointer‑trigger zone uses the original coordinates (6.41–28.86 vw, 28.5–84 vh).
 *   • No guesswork on util‑line position; CSS remains untouched.
 *   • Overlays (.layer‑one / .layer‑two) forced to pointer‑events:none so they never intercept.
 */

export default function Page() {
  const rootRef = useRef<HTMLDivElement>(null);

  /* ───────────── Helpers ───────────── */
  const fadeInEls = (els: Iterable<HTMLElement>) =>
    Array.from(els).forEach((el) => {
      el.classList.remove('hidden');
      // Force reflow
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

  /* ───────────── Intro & stage logic ───────────── */
  let phase = 0; // 0 intro, 1 waiting login hover, 2 ready
  let step = 0; // 0 login, 1 util, 2 account, 3 help

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    /* Element refs */
    const loginEls = root.querySelectorAll<HTMLElement>(
      '.username, .password, .login-line, .login-line-second'
    );
    const utilLine = root.querySelector<HTMLElement>('.util-line');
    const openText = root.querySelector<HTMLElement>('.open-text');
    const helpText = root.querySelector<HTMLElement>('.help-text');
    const accountWrap = root.querySelector<HTMLElement>('.account-wrapper');
    const helpWrap = root.querySelector<HTMLElement>('.help-wrapper');
    const body = document.body;

    /* Stage helper */
    const setStage = (name: string) => {
      body.classList.remove(
        'stage-login',
        'stage-util',
        'stage-account',
        'stage-help',
        'stage-util-pre'
      );
      body.classList.add(name);
    };

    /* in-login‑zone detection (original numbers) */
    const inLoginZone = (x: number, y: number) => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      return (
        x >= vw * 0.0641 &&
        x <= vw * 0.2886 &&
        y >= vh * 0.285 &&
        y <= vh * 0.84
      );
    };

    /* Initial pointer handler */
    function initialPointer(ev: PointerEvent | TouchEvent) {
      const p = 'touches' in ev ? ev.touches[0] : (ev as PointerEvent);
      const { clientX: x, clientY: y } = p;
      if (phase === 0) {
        body.classList.add('fade-in-trigger'); // fade static lines + util
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

    /* Util‑line click */
    const utilClick = () => {
      if (step !== 0) return;

      // Ensure elements visible
      fadeInEls(loginEls);
      openText && fadeInEls([openText]);
      helpText && fadeInEls([helpText]);

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setStage('stage-util');
        });
      });

      step = 1;
    };
    utilLine?.addEventListener('click', utilClick);

    /* OPEn / HELP clicks */
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

    /* Back‑tap (left gutter) */
    const backTap = (e: MouseEvent) => {
      const { clientX: x, clientY: y } = e;
      const vw = window.innerWidth;
      const vh = window.innerHeight;
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
    };
    document.addEventListener('click', backTap, true);

    /* Cleanup */
    return () => {
      window.removeEventListener('pointermove', initialPointer);
      window.removeEventListener('touchstart', initialPointer);
      utilLine?.removeEventListener('click', utilClick);
      document.removeEventListener('click', backTap, true);
    };
  }, []);

  /* ───────────── Render ───────────── */
  return (
    <>
      {/* Force overlays to be click‑through */}
      <style jsx global>{`
        .layer-one,
        .layer-two {
          pointer-events: none !important;
        }
        /* Make sure util-line is clickable above its default z-index */
        .util-line {
          pointer-events: auto !important;
          z-index: 10 !important;
          cursor: pointer;
        }
      `}</style>

      <div ref={rootRef}>
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
          <span className="account-text account-repeat-password">
            REDO PASSWORD
          </span>
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
      </div>
    </>
  );
}
