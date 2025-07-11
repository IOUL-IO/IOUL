'use client';
import React, { useEffect, useRef } from 'react';

/**
 * IOUL Login Page – React port (exact legacy behaviour)
 *
 * Key fixes
 * ----------
 * 1. Trigger div now has TWO classes: "line util-line" so it inherits the
 *    original CSS width / position (2.8 vw × 1 px at 46 vh).
 * 2. Transparent overlay masks (.layer-one / .layer-two) are forced
 *    `pointer-events:none !important;` so they can never eat the click.
 *
 * No extra hotspots, no external CSS file required.  All classes, keyframes,
 * and helper functions are unchanged from the legacy inline script.
 */

export default function Page() {
  const rootRef = useRef<HTMLDivElement>(null);

  /* --------------------------------- helpers -------------------------------- */
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

  /* --------------------------- stage / intro logic -------------------------- */
  let phase = 0; // 0 intro, 1 lines faded, 2 login ready
  let step  = 0; // 0 login, 1 util, 2 account, 3 help

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const body = document.body;
    const loginEls = root.querySelectorAll<HTMLElement>(
      '.username, .password, .login-line, .login-line-second'
    );
    const accountWrap = root.querySelector<HTMLElement>('.account-wrapper');
    const helpWrap    = root.querySelector<HTMLElement>('.help-wrapper');

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
      x >= vw() * 0.085 && x <= vw() * 0.91 && y >= vh() * 0.46 && y <= vh() * 0.7;

    /* intro pointer */
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

    return () => {
      window.removeEventListener('pointermove', introPointer);
      window.removeEventListener('touchstart', introPointer);
      document.removeEventListener('click', backTap, true);
    };
  }, []);

  /* ---------------------------- util click ---------------------------- */
  const triggerUtil = () => {
    if (step !== 0) return;
    console.log('util-line clicked');
    document.body.classList.add('stage-util');
    step = 1;
  };

  const triggerOpen = () => {
    if (step !== 1) return;
    document.body.classList.add('stage-account');
    document.querySelector('.account-wrapper')?.classList.add('active');
    step = 2;
  };

  const triggerHelp = () => {
    if (step !== 1) return;
    document.body.classList.add('stage-help');
    document.querySelector('.help-wrapper')?.classList.add('active');
    step = 3;
  };

  /* ------------------------------ render ----------------------------- */
  return (
    <>
      {/* inline overrides – top of cascade */}
      <style jsx global>{`
        .layer-one,
        .layer-two {
          pointer-events: none !important;
        }
      `}</style>

      <div ref={rootRef}>
        {/* decorative lines */}
        <div className="line original" />
        <div className="line second" />
        <div className="line third" />
        <div className="line fourth" />
        <div className="line fifth" />
        <div className="line sixth" />

        {/* util trigger – now with BOTH classes */}
        <div
          className="line util-line"
          role="button"
          aria-label="Utility trigger"
          onClick={triggerUtil}
        />

        {/* login texts */}
        <span className="login-text username hidden">USERnAME</span>
        <span className="login-text password hidden">PASSWORD</span>

        {/* util choices */}
        <span
          className="login-text open-text hidden"
          role="button"
          onClick={triggerOpen}
        >
          OPEn AccOUnT
        </span>
        <span
          className="login-text help-text hidden"
          role="button"
          onClick={triggerHelp}
        >
          HELP REQUEST
        </span>

        {/* login entry lines */}
        <div className="line login-line hidden" />
        <div className="line login-line-second hidden" />

        {/* account wrapper */}
        <div className="account-wrapper">
          <span className="account-text account-email">E-MA1L ADDRESS</span>
          <span className="account-text account-username">
            YOUR USERnAME
          </span>
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