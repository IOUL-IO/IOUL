
// @ts-nocheck
"use client";
import React, { useRef, useEffect } from "react";

/**
 * Login page – full TSX conversion
 * July 11 2025
 * Matches all behaviours of the original HTML+script version.
 * File length safeguard: 285 lines (keep >270 so we know it isn’t truncated).
 */

export default function Page() {
  /* ========= Refs ========= */
  const rootRef     = useRef<HTMLDivElement>(null);
  const utilRef     = useRef<HTMLDivElement>(null);
  const openRef     = useRef<HTMLSpanElement>(null);
  const helpRef     = useRef<HTMLSpanElement>(null);
  const accountRef  = useRef<HTMLDivElement>(null);
  const helpWrapRef = useRef<HTMLDivElement>(null);

  /* Sequential state (matches original script) */
  const step = useRef(0); // 0 login, 1 util, 2 account, 3 help

  /* ========= Helper functions available everywhere ========= */
  const fadeIn = (els: Element[] | NodeListOf<Element>) => {
    Array.from(els).forEach((el) => {
      el.classList.remove("hidden");
      // Force reflow so transition runs
      void (el as HTMLElement).offsetWidth;
      el.classList.add("visible");
    });
  };

  const setStage = (s: string) => {
    document.body.classList.remove(
      "stage-login",
      "stage-util",
      "stage-account",
      "stage-help",
      "stage-util-pre"
    );
    document.body.classList.add(s);
  };

  /* ========= useEffect ========= */
  useEffect(() => {
    /* DOM shortcuts */
    const root      = rootRef.current!;
    const utilLine  = utilRef.current!;
    const openText  = openRef.current!;
    const helpText  = helpRef.current!;
    const account   = accountRef.current!;
    const helpWrap  = helpWrapRef.current!;
    const loginEls  = root.querySelectorAll(
      ".username, .password, .login-line, .login-line-second"
    );

    /* ----- Clickability / z‑index fixes ----- */
    utilLine.style.pointerEvents = "auto";
    utilLine.style.zIndex        = "9999";
    root
      .querySelectorAll(".layer-one, .layer-two")
      .forEach((l) => ((l as HTMLElement).style.pointerEvents = "none"));

    /* ----- Initial hover logic (unchanged) ----- */
    let phase = 0; // 0 wait first pointer, 1 wait login zone, 2 done
    const inLogin = (x: number, y: number) => {
      const vw = innerWidth, vh = innerHeight;
      return (
        x >= vw * 0.0641 &&
        x <= vw * 0.2886 &&
        y >= vh * 0.285 &&
        y <= vh * 0.84
      );
    };

    const firstPointer = (e: PointerEvent | TouchEvent) => {
      const p =
        "touches" in e ? (e as TouchEvent).touches[0] : (e as PointerEvent);
      const { clientX: x, clientY: y } = p;

      if (phase === 0) {
        document.body.classList.add("fade-in-trigger");
        phase = 1;
        return;
      }
      if (phase === 1 && inLogin(x, y)) {
        fadeIn(loginEls);
        phase = 2;
        window.removeEventListener("pointermove", firstPointer);
        window.removeEventListener("touchstart", firstPointer);
      }
    };
    window.addEventListener("pointermove", firstPointer, { passive: true });
    window.addEventListener("touchstart", firstPointer, { passive: true });

    /* ----- Inactivity auto‑fade (unchanged) ----- */
    const timeout = 20_000;
    let hidden = false;
    let timer = 0;
    const resetTimer = () => {
      clearTimeout(timer);
      if (step.current !== 0) return;
      timer = window.setTimeout(() => {
        Array.from(loginEls).forEach((el) => {
          el.classList.remove("visible");
          void (el as HTMLElement).offsetWidth;
          el.classList.add("hidden");
        });
        hidden = true;
      }, timeout);
    };
    ["mousemove", "mousedown", "keydown", "touchstart"].forEach((evt) =>
      window.addEventListener(evt, resetTimer, { passive: true })
    );

    window.addEventListener(
      "pointermove",
      (ev) => {
        if (step.current !== 0 || !hidden) return;
        const { clientX: x, clientY: y } = ev;
        if (inLogin(x, y)) {
          fadeIn(loginEls);
          hidden = false;
          resetTimer();
        }
      },
      { passive: true }
    );
    resetTimer();

    /* ----- Back‑tap area logic ----- */
    document.addEventListener("click", (e) => {
      const vw = innerWidth, vh = innerHeight;
      const { clientX: x, clientY: y } = e;
      const back = x <= vw * 0.0637 && y >= vh * 0.285 && y <= vh * 0.84;
      if (!back) return;

      if (step.current === 1) {
        setStage("stage-util-pre");
        setTimeout(() => {
          document.body.classList.remove("stage-util-pre");
          setStage("stage-login");
          fadeIn(loginEls);
          step.current = 0;
        }, 700);
      } else if (step.current === 2) {
        account.classList.remove("active");
        setStage("stage-util");
        step.current = 1;
      } else if (step.current === 3) {
        helpWrap.classList.remove("active");
        setStage("stage-util");
        step.current = 1;
      }
    });

    return () => {
      window.removeEventListener("pointermove", firstPointer);
      window.removeEventListener("touchstart", firstPointer);
      ["mousemove", "mousedown", "keydown", "touchstart"].forEach((evt) =>
        window.removeEventListener(evt, resetTimer)
      );
    };
  }, []);

  /* ========= Click handlers ========= */
  const handleUtilClick = () => {
    if (step.current !== 0) return;

    const root = rootRef.current!;
    const loginEls = root.querySelectorAll(
      ".username, .password, .login-line, .login-line-second"
    );

    // Ensure login group is visible for slide‑out animation
    fadeIn(loginEls);
    // Bring in OPEN / HELP text so CSS can slide them in
    fadeIn([openRef.current!, helpRef.current!]);

    // Next paint → add stage-util to <body>
    requestAnimationFrame(() =>
      requestAnimationFrame(() => setStage("stage-util"))
    );

    step.current = 1;
  };

  const handleOpenClick = () => {
    if (step.current !== 1) return;
    accountRef.current!.classList.add("active");
    setStage("stage-account");
    step.current = 2;
  };

  const handleHelpClick = () => {
    if (step.current !== 1) return;
    helpWrapRef.current!.classList.add("active");
    setStage("stage-help");
    step.current = 3;
  };

  /* ========= JSX Mark‑up ========= */
  return (
    <>
      <div ref={rootRef}>
        {/* Static lines */}
        <div className="line original" />
        <div className="line second" />
        <div className="line third" />
        <div className="line fourth" />
        <div className="line fifth" />
        <div className="line sixth" />
        <div
          className="line util-line"
          ref={utilRef}
          style={{ pointerEvents: "auto", zIndex: 9999 }}
          onClick={handleUtilClick}
        />

        {/* Login group */}
        <span className="login-text username hidden">USERnAME</span>
        <span className="login-text password hidden">PASSWORD</span>

        {/* Util texts */}
        <span
          className="login-text open-text hidden"
          ref={openRef}
          onClick={handleOpenClick}
        >
          OPEn AccOUnT
        </span>
        <span
          className="login-text help-text hidden"
          ref={helpRef}
          onClick={handleHelpClick}
        >
          HELP REQUEST
        </span>

        {/* Login entry lines */}
        <div className="line login-line hidden" />
        <div className="line login-line-second hidden" />

        {/* Account wrapper */}
        <div className="account-wrapper" ref={accountRef}>
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

        {/* Help wrapper */}
        <div className="help-wrapper" ref={helpWrapRef}>
          <span className="help-text-area email">YOUR EMA1L</span>
          <span className="help-text-area sendlink">SEnD L1nK</span>
          <div className="help-line" />
        </div>

        {/* Masks */}
        <div className="layer-one" style={{ pointerEvents: "none" }} />
        <div className="layer-two" style={{ pointerEvents: "none" }} />
      </div>
    </>
  );
}
