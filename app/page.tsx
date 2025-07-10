// @ts-nocheck
"use client";
import React, { useEffect, useRef } from "react";

export default function Page() {
  const containerRef   = useRef<HTMLDivElement>(null);
  const utilLineRef    = useRef<HTMLDivElement>(null);
  const openTextRef    = useRef<HTMLSpanElement>(null);
  const helpTextRef    = useRef<HTMLSpanElement>(null);
  const accountWrapRef = useRef<HTMLDivElement>(null);
  const helpWrapRef    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    /* ===== Cached node groups ===== */
    const loginEls = containerRef.current!.querySelectorAll(
      ".username, .password, .login-line, .login-line-second"
    );
    const utilLine    = utilLineRef.current!;
    const openText    = openTextRef.current!;
    const helpText    = helpTextRef.current!;
    const accountWrap = accountWrapRef.current!;
    const helpWrap    = helpWrapRef.current!;
    const body        = document.body;

    /* --- GUARANTEE util strip receives clicks, masks do not --- */
    utilLine.style.pointerEvents = "auto";
    utilLine.style.zIndex        = "9999";           // float above mask layers
    containerRef.current!
      .querySelectorAll(".layer-one, .layer-two")
      .forEach((l) => ((l as HTMLElement).style.pointerEvents = "none"));

    /* ===== Helper: fade ===== */
    const fadeInEls = (els: NodeListOf<Element> | Element[]) =>
      Array.from(els).forEach((el) => {
        el.classList.remove("hidden");
        void (el as HTMLElement).offsetWidth;
        el.classList.add("visible");
      });

    const fadeOutEls = (els: NodeListOf<Element> | Element[]) =>
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

    /* ===== Stage helpers ===== */
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

    /* ===== First‑pointer / login fade‑in logic ===== */
    let phase = 0; // 0 waiting first pointer, 1 waiting login zone, 2 done
    const inLoginZone = (x: number, y: number) => {
      const vw = innerWidth,
        vh = innerHeight;
      return x >= vw * 0.0641 && x <= vw * 0.2886 && y >= vh * 0.285 && y <= vh * 0.84;
    };
    const firstPointer = (e: PointerEvent | TouchEvent) => {
      const p = "touches" in e ? (e as TouchEvent).touches[0] : (e as PointerEvent);
      const { clientX: x, clientY: y } = p;

      if (phase === 0) {
        body.classList.add("fade-in-trigger");
        phase = 1;
        return;
      }
      if (phase === 1 && inLoginZone(x, y)) {
        fadeInEls(loginEls);
        phase = 2;
        window.removeEventListener("pointermove", firstPointer);
        window.removeEventListener("touchstart", firstPointer);
      }
    };
    window.addEventListener("pointermove", firstPointer, { passive: true });
    window.addEventListener("touchstart", firstPointer, { passive: true });

    /* ===== Inactivity auto‑fade ===== */
    const loginFadeTimeout = 20000;
    let loginElsHidden = false;
    let inactivityTimer: number;

    const resetInactivity = () => {
      clearTimeout(inactivityTimer);
      inactivityTimer = window.setTimeout(() => {
        if (step.current === 0) fadeOutEls(loginEls).then(() => (loginElsHidden = true));
      }, loginFadeTimeout);
    };

    /* ===== Sequential step tracker ===== */
    const step = { current: 0 }; // 0 login, 1 util, 2 account, 3 help

    /* Monitor generic activity */
    ["mousemove", "mousedown", "keydown", "touchstart"].forEach((evt) =>
      window.addEventListener(evt, resetInactivity, { passive: true })
    );

    /* Hover brings login back if hidden */
    window.addEventListener(
      "pointermove",
      (ev) => {
        if (step.current !== 0 || !loginElsHidden) return;
        const { clientX: x, clientY: y } = ev;
        if (inLoginZone(x, y)) {
          fadeInEls(loginEls);
          loginElsHidden = false;
          resetInactivity();
        }
      },
      { passive: true }
    );
    resetInactivity();

    /* ===== Util strip click ===== */
    const onUtilClick = () => {
      if (step.current !== 0) return;
      fadeInEls(loginEls);
      fadeInEls([openText, helpText]);
      requestAnimationFrame(() =>
        requestAnimationFrame(() => setStage("stage-util"))
      );
      step.current = 1;
    };
    utilLine.addEventListener("click", onUtilClick);

    /* ===== OPEN / HELP clicks ===== */
    openText.addEventListener("click", () => {
      if (step.current !== 1) return;
      accountWrap.classList.add("active");
      setStage("stage-account");
      step.current = 2;
    });
    helpText.addEventListener("click", () => {
      if (step.current !== 1) return;
      helpWrap.classList.add("active");
      setStage("stage-help");
      step.current = 3;
    });

    /* ===== Back‑tap area ===== */
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
          fadeInEls(loginEls);
          step.current = 0;
        }, 700);
      } else if (step.current === 2) {
        accountWrap.classList.remove("active");
        setStage("stage-util");
        step.current = 1;
      } else if (step.current === 3) {
        helpWrap.classList.remove("active");
        setStage("stage-util");
        step.current = 1;
      }
    });

    /* ===== Cleanup ===== */
    return () => {
      utilLine.removeEventListener("click", onUtilClick);
      window.removeEventListener("pointermove", firstPointer);
      window.removeEventListener("touchstart", firstPointer);
      ["mousemove", "mousedown", "keydown", "touchstart"].forEach((evt) =>
        window.removeEventListener(evt, resetInactivity)
      );
    };
  }, []);

  return (
    <div ref={containerRef}>
      {/* Static lines */}
      <div className="line original" />
      <div className="line second" />
      <div className="line third" />
      <div className="line fourth" />
      <div className="line fifth" />
      <div className="line sixth" />
      <div className="line util-line" ref={utilLineRef} />

      {/* Login */}
      <span className="login-text username hidden">USERnAME</span>
      <span className="login-text password hidden">PASSWORD</span>

      {/* Util */}
      <span className="login-text open-text hidden" ref={openTextRef}>
        OPEn AccOUnT
      </span>
      <span className="login-text help-text hidden" ref={helpTextRef}>
        HELP REQUEST
      </span>

      {/* Login entry lines */}
      <div className="line login-line hidden" />
      <div className="line login-line-second hidden" />

      {/* Account */}
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
      <div className="layer-one" />
      <div className="layer-two" />
    </div>
  );
}
