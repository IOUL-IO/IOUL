'use client';
import React, { useEffect, useRef } from 'react';

/**
 * IOUL Login Page – rock‑solid TSX (≈320 lines).
 *
 * Fix summary:
 *   • .util-line: pointer-events:auto + z-index:10000 (inline & !important)
 *   • .layer-one / .layer-two: pointer-events:none !important (inline)
 *   • No external CSS patch required; keep your legacy CSS bundle.
 *   • Console logs confirm click path.
 */

export default function Page() {
  /* -------------------------- refs -------------------------- */
  const rootRef = useRef<HTMLDivElement>(null);

  /* ------------------------ helpers ------------------------ */
  const fadeInEls = (els: Iterable<HTMLElement>) =>
    Array.from(els).forEach((el) => {
      el.classList.remove('hidden');
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

  /* ------------------- stage & intro logic ------------------ */
  let phase = 0; // 0 intro, 1 lines faded, 2 login ready
  let step = 0;  // 0 login, 1 util, 2 account, 3 help

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    /* element refs scoped to root */
    const body = document.body;
    const loginEls = root.querySelectorAll<HTMLElement>(
      '.username, .password, .login-line, .login-line-second'
    );
    const accountWrap = root.querySelector<HTMLElement>('.account-wrapper');
    const helpWrap = root.querySelector<HTMLElement>('.help-wrapper');

    /* helper functions */
    const setStage = (s: string) => {
      body.classList.remove(
        'stage-intro',
        'stage-login',
        'stage-util-pre',
        'stage-util',
        'stage-account',
        'stage-help'
      );
      body.classList.add(s);
    };

    const vw = () => window.innerWidth;
    const vh = () => window.innerHeight;
    const inLoginZone = (x: number, y: number) =>
      x >= vw() * 0.085 &&
      x <= vw() * 0.91 &&
      y >= vh() * 0.46 &&
      y <= vh() * 0.7;

    /* intro pointer handler */
    function introPointer(e: PointerEvent | TouchEvent) {
      const { clientX: x, clientY: y } =
        'touches' in e ? e.touches[0] : (e as PointerEvent);

      if (phase === 0) {
        body.classList.add('fade-in-trigger');
        phase = 1;
        return;
      }

      if (phase === 1 && inLoginZone(x, y)) {
        fadeInEls(loginEls);
        phase = 2;
        window.removeEventListener('pointermove', introPointer);
        window.removeEventListener('touchstart', introPointer);
      }
    }

    window.addEventListener('pointermove', introPointer, { passive: true });
    window.addEventListener('touchstart', introPointer, { passive: true });

    /* back‑tap (left gutter) */
    const backTap = (ev: MouseEvent) => {
      const { clientX: x, clientY: y } = ev;
      const backZone =
        x <= vw() * 0.0637 && y >= vh() * 0.285 && y <= vh() * 0.84;
      if (!backZone) return;

      if (step === 1) {
        // util -> login
        setStage('stage-util-pre');
        setTimeout(() => {
          body.classList.remove('stage-util-pre');
          setStage('stage-login');
          fadeInEls(loginEls);
          step = 0;
        }, 700);
      } else if (step === 2) {
        // account -> util
        accountWrap?.classList.remove('active');
        setStage('stage-util');
        step = 1;
      } else if (step === 3) {
        // help -> util
        helpWrap?.classList.remove('active');
        setStage('stage-util');
        step = 1;
      }
    };

    document.addEventListener('click', backTap, true);

    /* cleanup */
    return () => {
      window.removeEventListener('pointermove', introPointer);
      window.removeEventListener('touchstart', introPointer);
      document.removeEventListener('click', backTap, true);
    };
  }, []);

  /* ----------------------- handlers ------------------------ */
  const handleUtilClick: React.MouseEventHandler<HTMLDivElement> = () => {
    console.log('util-line clicked');
    if (step !== 0) return;

    const root = rootRef.current;
    if (!root) return;

    const loginEls = root.querySelectorAll<HTMLElement>(
      '.username, .password, .login-line, .login-line-second'
    );
    const openText = root.querySelector<HTMLElement>('.open-text');
    const helpText = root.querySelector<HTMLElement>('.help-text');

    fadeInEls(loginEls);
    openText && fadeInEls([openText]);
    helpText && fadeInEls([helpText]);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        document.body.classList.add('stage-util');
      });
    });

    step = 1;
  };

  const handleOpenClick: React.MouseEventHandler<HTMLSpanElement> = () => {
    if (step !== 1) return;
    document.body.classList.add('stage-account');
    document.querySelector('.account-wrapper')?.classList.add('active');
    step = 2;
  };

  const handleHelpClick: React.MouseEventHandler<HTMLSpanElement> = () => {
    if (step !== 1) return;
    document.body.classList.add('stage-help');
    document.querySelector('.help-wrapper')?.classList.add('active');
    step = 3;
  };

  /* ------------------------- render ------------------------ */
  return (
    <>
      {/* Inline global overrides – highest precedence */}
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
        {/* static decorative lines */}
        <div className="line original" />
        <div className="line second" />
        <div className="line third" />
        <div className="line fourth" />
        <div className="line fifth" />
        <div className="line sixth" />

        {/* util trigger bar */}
        <div
          className="util-line"
          style={{ height: '1px' }}
          role="button"
          aria-label="Utility trigger"
          onClick={handleUtilClick}
        />

        {/* login texts */}
        <span className="login-text username hidden">USERnAME</span>
        <span className="login-text password hidden">PASSWORD</span>

        {/* util choices */}
        <span
          className="login-text open-text hidden"
          role="button"
          onClick={handleOpenClick}
        >
          OPEn AccOUnT
        </span>
        <span
          className="login-text help-text hidden"
          role="button"
          onClick={handleHelpClick}
        >
          HELP REQUEST
        </span>

        {/* login entry lines */}
        <div className="line login-line hidden" />
        <div className="line login-line-second hidden" />

        {/* account wrapper */}
        <div className="account-wrapper">
          <span className="account-text account-email">E-MA1L ADDRESS</span>
          <span className="account-text account-username">YOUR USERnAME</span>
          <span className="account-text account-sign-password">
            YOUR PASSWORD
          </span>
          <span className="account-text account-repeat-password">
            REDO PASSWORD
          </span>
          <div className="account-line account-line1" />
          <div className="account-line account-line2" />
          <div className="account-line account-line3" />
          <div className="account-line account-line4" />
        </div>

        {/* help wrapper */}
        <div className="help-wrapper">
          <span className="help-text-area email">YOUR EMA1L</span>
          <span className="help-text-area sendlink">SEnD L1nK</span>
          <div className="help-line" />
        </div>

        {/* transparent overlays */}
        <div className="layer-one" />
        <div className="layer-two" />
      </div>
    </>
  );
}