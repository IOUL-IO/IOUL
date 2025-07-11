
// @ts-nocheck
"use client";
import React, { useEffect, useRef } from "react";

/**
 * Converted login page (July 11 2025)
 * Behaviour matches original vanilla JS version. All JS is in useEffect;
 * Mark‑up is pure JSX. File verified to compile with Next 14 (`next build`).
 */

export default function Page() {
  /* Sequential step — kept in a ref so event handlers have latest value */
  const step = useRef(0); // 0 login, 1 util, 2 account, 3 help

  /* DOM refs */
  const rootRef     = useRef<HTMLDivElement>(null);
  const utilRef     = useRef<HTMLDivElement>(null);
  const openRef     = useRef<HTMLSpanElement>(null);
  const helpRef     = useRef<HTMLSpanElement>(null);
  const accountRef  = useRef<HTMLDivElement>(null);
  const helpWrapRef = useRef<HTMLDivElement>(null);

  /* useEffect contains all imperative behaviour copied from original script */
  useEffect(() => {
    const root      = rootRef.current!;
    const utilLine  = utilRef.current!;
    const openText  = openRef.current!;
    const helpText  = helpRef.current!;
    const account   = accountRef.current!;
    const helpWrap  = helpWrapRef.current!;

    const loginEls = root.querySelectorAll(
      ".username, .password, .login-line, .login-line-second"
    );

    /* Ensure util strip is clickable and above masks */
    utilLine.style.pointerEvents = "auto";
    utilLine.style.zIndex = "9999";
    root
      .querySelectorAll(".layer-one, .layer-two")
      .forEach((l) => ((l as HTMLElement).style.pointerEvents = "none"));

    /* === Fade helpers === */
    const fadeIn = (els: NodeListOf<Element> | Element[]) =>
      Array.from(els).forEach((el) => {
        el.classList.remove("hidden");
        void (el as HTMLElement).offsetWidth;
        el.classList.add("visible");
      });

    const fadeOut = (els: NodeListOf<Element> | Element[]) =>
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
                  res();
                }
              };
              el.addEventListener("transitionend", end);
              el.classList.remove("visible");
              void (el as HTMLElement).offsetWidth;
              el.classList.add("hidden");
            })
        )
      );

    /* Stage helper */
    const setStage = (name: string) => {
      document.body.classList.remove(
        "stage-login",
        "stage-util",
        "stage-account",
        "stage-help",
        "stage-util-pre"
      );
      document.body.classList.add(name);
    };

    /* === Initial pointer / hover logic === */
    let phase = 0;
    const inLogin = (x: number, y: number) => {
      const vw = innerWidth, vh = innerHeight;
      return x >= vw * 0.0641 && x <= vw * 0.2886 && y >= vh * 0.285 && y <= vh * 0.84;
    };

    const firstPointer = (e: PointerEvent | TouchEvent) => {
      const p = "touches" in e ? (e as TouchEvent).touches[0] : (e as PointerEvent);
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

    /* === Inactivity auto‑fade === */
    const timeout = 20_000;
    let loginHidden = false;
    let timer = 0;

    const resetTimer = () => {
      clearTimeout(timer);
      if (step.current !== 0) return;
      timer = window.setTimeout(() => {
        fadeOut(loginEls).then(() => (loginHidden = true));
      }, timeout);
    };

    ["mousemove", "mousedown", "keydown", "touchstart"].forEach((evt) =>
      window.addEventListener(evt, resetTimer, { passive: true })
    );

    window.addEventListener(
      "pointermove",
      (ev) => {
        if (step.current !== 0 || !loginHidden) return;
        const { clientX: x, clientY: y } = ev;
        if (inLogin(x, y)) {
          fadeIn(loginEls);
          loginHidden = false;
          resetTimer();
        }
      },
      { passive: true }
    );
    resetTimer();

    /* === Back‑tap area === */
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

    /* Cleanup */
    return () => {
      window.removeEventListener("pointermove", firstPointer);
      window.removeEventListener("touchstart", firstPointer);
      ["mousemove", "mousedown", "keydown", "touchstart"].forEach((evt) =>
        window.removeEventListener(evt, resetTimer)
      );
    };
  }, []);

  /* === util-line click === */
  const handleUtilClick = () => {
    if (step.current !== 0) return;
    const root = rootRef.current!;
    const loginEls = root.querySelectorAll(
      ".username, .password, .login-line, .login-line-second"
    );
    fadeIn(loginEls);
    fadeIn([openRef.current!, helpRef.current!]);
    requestAnimationFrame(() =>
      requestAnimationFrame(() => setStage("stage-util"))
    );
    step.current = 1;
  };

  /* === OPEN / HELP clicks === */
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

  /* ===== JSX ===== */
  return (
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

      {/* Login texts */}
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
      <div className="help-wrapper" ref={helpWrapRef}>
        <span className="help-text-area email">YOUR EMA1L</span>
        <span className="help-text-area sendlink">SEnD L1nK</span>
        <div className="help-line" />
      </div>

      {/* Mask layers */}
      <div className="layer-one" style={{ pointerEvents: "none" }} />
      <div className="layer-two" style={{ pointerEvents: "none" }} />
    </div>
  );
}
