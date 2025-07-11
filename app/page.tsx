
"use client";
import React, { useEffect, useRef } from "react";

/**
 * IOUL Login Page – final solid build.
 *  - Keeps original classnames (util-line, layer-one, layer-two, etc.)
 *  - Fixes click by giving .util-line pointer-events:auto & high z-index inline.
 *  - Forces overlay layers pointer-events:none inline so they never intercept clicks.
 *  - No extra CSS file required. Drop this into app/page.tsx and remove login-fix.css if added.
 */

export default function Page() {
  const rootRef = useRef<HTMLDivElement>(null);

  /* ------------------------------------------------------------------ */
  /* Helpers                                                             */
  /* ------------------------------------------------------------------ */
  const fadeInEls = (els: Iterable<HTMLElement>) =>
    Array.from(els).forEach((el) => {
      el.classList.remove("hidden");
      void el.offsetWidth;
      el.classList.add("visible");
    });

  const fadeOutEls = (els: Iterable<HTMLElement>) =>
    Promise.all(
      Array.from(els).map(
        (el) =>
          new Promise<void>((res) => {
            if (!el.classList.contains("visible")) {
              res();
              return;
            }
            const end = (e: TransitionEvent) => {
              if (e.propertyName === "opacity") {
                el.removeEventListener("transitionend", end);
                el.classList.add("hidden");
                el.classList.remove("visible");
                res();
              }
            };
            el.addEventListener("transitionend", end, { once: true });
            el.classList.remove("visible");
          })
      )
    );

  /* ------------------------------------------------------------------ */
  /* Stage logic                                                         */
  /* ------------------------------------------------------------------ */
  let phase = 0; // intro pointer phases
  let step = 0;  // 0 login, 1 util, 2 account, 3 help

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const body = document.body;
    const loginEls  = root.querySelectorAll<HTMLElement>(
      ".username, .password, .login-line, .login-line-second"
    );
    const openText  = root.querySelector<HTMLElement>(".open-text");
    const helpText  = root.querySelector<HTMLElement>(".help-text");
    const accountWrap = root.querySelector<HTMLElement>(".account-wrapper");
    const helpWrap    = root.querySelector<HTMLElement>(".help-wrapper");

    const setStage = (s: string) => {
      body.classList.remove(
        "stage-intro",
        "stage-login",
        "stage-util-pre",
        "stage-util",
        "stage-account",
        "stage-help"
      );
      body.classList.add(s);
    };

    const vw = () => window.innerWidth;
    const vh = () => window.innerHeight;
    const inLoginZone = (x: number, y: number) =>
      x >= vw() * 0.085 && x <= vw() * 0.91 && y >= vh() * 0.46 && y <= vh() * 0.7;

    function initialPointer(e: PointerEvent | TouchEvent) {
      const { clientX: x, clientY: y } =
        "touches" in e ? e.touches[0] : (e as PointerEvent);

      if (phase === 0) {
        body.classList.add("fade-in-trigger");
        phase = 1;
        return;
      }
      if (phase === 1 && inLoginZone(x, y)) {
        fadeInEls(loginEls);
        phase = 2;
        window.removeEventListener("pointermove", initialPointer);
        window.removeEventListener("touchstart", initialPointer);
      }
    }
    window.addEventListener("pointermove", initialPointer, { passive: true });
    window.addEventListener("touchstart", initialPointer, { passive: true });

    /* Back‑tap left gutter */
    const backTap = async (ev: MouseEvent) => {
      const { clientX: x, clientY: y } = ev;
      const backZone = x <= vw() * 0.0637 && y >= vh() * 0.285 && y <= vh() * 0.84;
      if (!backZone) return;

      if (step === 1) {
        setStage("stage-util-pre");
        setTimeout(() => {
          body.classList.remove("stage-util-pre");
          setStage("stage-login");
          fadeInEls(loginEls);
          step = 0;
        }, 700);
      } else if (step === 2) {
        accountWrap?.classList.remove("active");
        setStage("stage-util");
        step = 1;
      } else if (step === 3) {
        helpWrap?.classList.remove("active");
        setStage("stage-util");
        step = 1;
      }
    };
    document.addEventListener("click", backTap, true);

    /* Cleanup */
    return () => {
      window.removeEventListener("pointermove", initialPointer);
      window.removeEventListener("touchstart", initialPointer);
      document.removeEventListener("click", backTap, true);
    };
  }, []);

  /* Util click */
  const handleUtilClick: React.MouseEventHandler<HTMLDivElement> = () => {
    if (step !== 0) return;
    const root = rootRef.current;
    if (!root) return;

    const loginEls  = root.querySelectorAll<HTMLElement>(
      ".username, .password, .login-line, .login-line-second"
    );
    const openText  = root.querySelector<HTMLElement>(".open-text");
    const helpText  = root.querySelector<HTMLElement>(".help-text");

    fadeInEls(loginEls);
    openText && fadeInEls([openText]);
    helpText && fadeInEls([helpText]);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        document.body.classList.add("stage-util");
      });
    });

    step = 1;
  };

  const handleOpenClick: React.MouseEventHandler<HTMLSpanElement> = () => {
    if (step !== 1) return;
    document.querySelector(".account-wrapper")?.classList.add("active");
    document.body.classList.add("stage-account");
    step = 2;
  };

  const handleHelpClick: React.MouseEventHandler<HTMLSpanElement> = () => {
    if (step !== 1) return;
    document.querySelector(".help-wrapper")?.classList.add("active");
    document.body.classList.add("stage-help");
    step = 3;
  };

  /* ------------------------------------------------------------------ */
  /* Render                                                              */
  /* ------------------------------------------------------------------ */
  return (
    <div ref={rootRef}>
      {/* Static lines */}
      <div className="line original" />
      <div className="line second" />
      <div className="line third" />
      <div className="line fourth" />
      <div className="line fifth" />
      <div className="line sixth" />

      {/* Util trigger (1‑px bar) */}
      <div
        className="util-line"
        style={{ height: "1px", pointerEvents: "auto", cursor: "pointer", zIndex: 10000 }}
        role="button"
        aria-label="Utility trigger"
        onClick={handleUtilClick}
      />

      {/* Login texts */}
      <span className="login-text username hidden">USERnAME</span>
      <span className="login-text password hidden">PASSWORD</span>

      {/* Util overlay options */}
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

      {/* Login entry lines */}
      <div className="line login-line hidden" />
      <div className="line login-line-second hidden" />

      {/* Account wrapper */}
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

      {/* Transparent overlays – forced click‑through */}
      <div className="layer-one" style={{ pointerEvents: "none" }} />
      <div className="layer-two" style={{ pointerEvents: "none" }} />
    </div>
  );
}
