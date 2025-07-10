
// @ts-nocheck
"use client";
import React, { useEffect, useRef } from "react";

export default function Page() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    /* ===== Element groups ===== */
    const loginEls    = container.querySelectorAll(".username, .password, .login-line, .login-line-second");
    const utilLine    = container.querySelector(".util-line") as HTMLElement | null;
    const openText    = container.querySelector(".open-text");
    const helpText    = container.querySelector(".help-text");
    const accountWrap = container.querySelector(".account-wrapper");
    const helpWrap    = container.querySelector(".help-wrapper");
    const layers      = container.querySelectorAll(".layer-one, .layer-two");
    const body        = document.body;

    /* Ensure clickability */
    if (utilLine) utilLine.style.pointerEvents = "auto";
    layers.forEach(l => (l as HTMLElement).style.pointerEvents = "none");

    /* ===== Helper functions ===== */
    const fadeInEls = (els: NodeListOf<Element> | ArrayLike<Element>) =>
      Array.from(els).forEach(el => {
        el.classList.remove("hidden");
        void (el as HTMLElement).offsetWidth;
        el.classList.add("visible");
      });

    const fadeOutEls = (els: NodeListOf<Element> | ArrayLike<Element>) =>
      Promise.all(
        Array.from(els).map(
          el =>
            new Promise<void>(res => {
              if (!el.classList.contains("visible")) {
                res();
                return;
              }
              const end = (e: any) => {
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
      body.classList.remove("stage-login", "stage-util", "stage-account", "stage-help", "stage-util-pre");
      body.classList.add(name);
    };

    /* ===== Initial hover logic ===== */
    let phase = 0; // 0: waiting for first pointer -> lines fade. 1: waiting for login zone hover
    const inLoginZone = (x: number, y: number) => {
      const vw = innerWidth;
      const vh = innerHeight;
      return x >= vw * 0.0641 && x <= vw * 0.2886 && y >= vh * 0.285 && y <= vh * 0.84;
    };
    const initialPointer = (e: any) => {
      const p = e.touches ? e.touches[0] : e;
      const { clientX: x, clientY: y } = p;

      if (phase === 0) {
        body.classList.add("fade-in-trigger"); // lines & util fade in
        phase = 1;
        return;
      }
      if (phase === 1 && inLoginZone(x, y)) {
        fadeInEls(loginEls); // login group fade in
        phase = 2;
        window.removeEventListener("pointermove", initialPointer);
        window.removeEventListener("touchstart", initialPointer);
      }
    };
    window.addEventListener("pointermove", initialPointer, { passive: true });
    window.addEventListener("touchstart", initialPointer, { passive: true });

    /* ===== Sequential logic ===== */
    let step = 0;
    /* ===== util-line click ===== */
    utilLine?.addEventListener("click", () => {
      if (step !== 0) return;
      fadeInEls(loginEls);
      if (openText) fadeInEls([openText]);
      if (helpText) fadeInEls([helpText]);
      requestAnimationFrame(() => requestAnimationFrame(() => setStage("stage-util")));
      step = 1;
    });

    openText?.addEventListener("click", () => {
      if (step !== 1) return;
      accountWrap?.classList.add("active");
      setStage("stage-account");
      step = 2;
    });

    helpText?.addEventListener("click", () => {
      if (step !== 1) return;
      helpWrap?.classList.add("active");
      setStage("stage-help");
      step = 3;
    });

    /* ===== Cleanup ===== */
    return () => {
      window.removeEventListener("pointermove", initialPointer);
      window.removeEventListener("touchstart", initialPointer);
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
    </div>
  );
}
