
// @ts-nocheck
"use client";
import React, { useEffect, useRef } from "react";

export default function Page() {
  /* --- element refs --- */
  const wrapRef        = useRef<HTMLDivElement>(null);
  const utilLineRef    = useRef<HTMLDivElement>(null);
  const openTextRef    = useRef<HTMLSpanElement>(null);
  const helpTextRef    = useRef<HTMLSpanElement>(null);
  const accountWrapRef = useRef<HTMLDivElement>(null);
  const helpWrapRef    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const body = document.body;
    const loginEls = wrapRef.current!.querySelectorAll(
      ".username, .password, .login-line, .login-line-second"
    );

    /* ===== Helper: fade in/out ===== */
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

    /* ===== Stage management ===== */
    const setStage = (name: string) => {
      body.classList.remove(
        "stage-login",
        "stage-util",
        "stage-account",
        "stage-help",
        "stage-util-pre"
      );
      body.classList.add(name);
    };

    /* ===== Initial pointer detection ===== */
    let phase = 0; // 0 waiting first pointer, 1 waiting login zone
    const inLoginZone = (x: number, y: number) => {
      const vw = innerWidth,
        vh = innerHeight;
      return x >= vw * 0.0641 && x <= vw * 0.2886 && y >= vh * 0.285 && y <= vh * 0.84;
    };

    const initialPointer = (e: PointerEvent | TouchEvent) => {
      const p = "touches" in e ? (e as TouchEvent).touches[0] : (e as PointerEvent);
      const { clientX: x, clientY: y } = p;

      if (phase === 0) {
        body.classList.add("fade-in-trigger");
        phase = 1;
        return;
      }
      if (phase === 1 && inLoginZone(x, y)) {
        fadeIn(loginEls);
        phase = 2;
        window.removeEventListener("pointermove", initialPointer);
        window.removeEventListener("touchstart", initialPointer);
      }
    };
    window.addEventListener("pointermove", initialPointer, { passive: true });
    window.addEventListener("touchstart", initialPointer, { passive: true });

    /* ===== Inactivity auto-fade ===== */
    const loginFadeTimeout = 20000;
    let loginHidden = false;
    let fadeTimer: number;
    const resetTimer = () => {
      clearTimeout(fadeTimer);
      if (step.current !== 0) return;
      fadeTimer = window.setTimeout(() => {
        fadeOut(loginEls).then(() => (loginHidden = true));
      }, loginFadeTimeout);
    };
    ["mousemove", "mousedown", "keydown", "touchstart"].forEach((evt) =>
      window.addEventListener(evt, resetTimer, { passive: true })
    );

    window.addEventListener(
      "pointermove",
      (ev) => {
        if (step.current !== 0 || !loginHidden) return;
        const { clientX: x, clientY: y } = ev;
        if (inLoginZone(x, y)) {
          fadeIn(loginEls);
          loginHidden = false;
          resetTimer();
        }
      },
      { passive: true }
    );
    resetTimer();

    /* ===== Back-tap area ===== */
    document.addEventListener("click", (e) => {
      const { clientX: x, clientY: y } = e;
      const vw = innerWidth,
        vh = innerHeight;
      const back = x <= vw * 0.0637 && y >= vh * 0.285 && y <= vh * 0.84;
      if (!back) return;

      if (step.current === 1) {
        setStage("stage-util-pre");
        setTimeout(() => {
          body.classList.remove("stage-util-pre");
          setStage("stage-login");
          fadeIn(loginEls);
          step.current = 0;
        }, 700);
      } else if (step.current === 2) {
        accountWrapRef.current!.classList.remove("active");
        setStage("stage-util");
        step.current = 1;
      } else if (step.current === 3) {
        helpWrapRef.current!.classList.remove("active");
        setStage("stage-util");
        step.current = 1;
      }
    });

    /* Cleanup */
    return () => {
      window.removeEventListener("pointermove", initialPointer);
      window.removeEventListener("touchstart", initialPointer);
      ["mousemove", "mousedown", "keydown", "touchstart"].forEach((evt) =>
        window.removeEventListener(evt, resetTimer)
      );
    };
  }, []);

  /* ===== Sequential step tracker kept in ref so onClick sees latest ===== */
  const step = useRef(0); // 0 login, 1 util, 2 account, 3 help

  /* ===== util-line click ===== */
  const handleUtilClick = () => {
    if (step.current !== 0) return;
    const body = document.body;
    const loginEls = wrapRef.current!.querySelectorAll(
      ".username, .password, .login-line, .login-line-second"
    );
    // Ensure they’re visible so they can animate out
    loginEls.forEach((el) => {
      el.classList.remove("hidden");
      void (el as HTMLElement).offsetWidth;
      el.classList.add("visible");
    });
    openTextRef.current!.classList.remove("hidden");
    helpTextRef.current!.classList.remove("hidden");
    requestAnimationFrame(() => requestAnimationFrame(() => body.classList.add("stage-util")));
    step.current = 1;
  };

  return (
    <div ref={wrapRef}>
      {/* Lines */}
      <div className="line original" />
      <div className="line second" />
      <div className="line third" />
      <div className="line fourth" />
      <div className="line fifth" />
      <div className="line sixth" />
      <div
        className="line util-line"
        ref={utilLineRef}
        style={{ pointerEvents: "auto", zIndex: 9999 }}
        onClick={handleUtilClick}
      />

      {/* Login */}
      <span className="login-text username hidden">USERnAME</span>
      <span className="login-text password hidden">PASSWORD</span>

      {/* Util texts */}
      <span className="login-text open-text hidden" ref={openTextRef}>
        OPEn AccOUnT
      </span>
      <span className="login-text help-text hidden" ref={helpTextRef}>
        HELP REQUEST
      </span>

      {/* Login entry lines */}
      <div className="line login-line hidden" />
      <div className="line login-line-second hidden" />

      {/* Account creation */}
      <div className="account-wrapper" ref={accountWrapRef}>
        <span className="account-text account-email">E-MA1L ADDRESS</span>
        <span className="account-text account-username">YOUR USERnAME</span>
        <span className="account-text account-sign-password">YOUR PASSWORD</span>
        <span className="account-text account-repeat-password">REDO PASSWORD</span>
        <div className="account-line account-line1" />
        <div className="account-line account-line2" />
        <div className="account-line account-line3" />
        <div className="account-line account-line4" />
      </div>

      {/* Help */}
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
