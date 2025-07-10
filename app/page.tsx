// @ts-nocheck
"use client";
import React, { useEffect } from "react";

/**
 * Login page rewritten as fully‑typed TSX rather than
 * injecting raw HTML with dangerouslySetInnerHTML.
 * 2025‑07‑10
 */
export default function Page() {
  useEffect(() => {
    /* ===== Element groups ===== */
    const loginEls = document.querySelectorAll<HTMLElement>(
      ".username, .password, .login-line, .login-line-second"
    );
    const utilLine = document.querySelector<HTMLElement>(".util-line");
    const openText = document.querySelector<HTMLElement>(".open-text");
    const helpText = document.querySelector<HTMLElement>(".help-text");
    const accountWrap = document.querySelector<HTMLElement>(".account-wrapper");
    const helpWrap = document.querySelector<HTMLElement>(".help-wrapper");

    /* ===== Helper functions ===== */
    const fadeInEls = (els: NodeListOf<HTMLElement>) =>
      els.forEach((el) => {
        el.classList.remove("hidden");
        void el.offsetWidth; // trigger reflow
        el.classList.add("visible");
      });

    const fadeOutEls = (els: NodeListOf<HTMLElement>) =>
      els.forEach((el) => {
        el.classList.add("hidden");
        el.classList.remove("visible");
      });

    /* ===== Opening animation ===== */
    let phase = 0; // 0: wait for first pointer -> lines fade, 1: wait login zone hover
    function inLoginZone(x: number, y: number) {
      const vw = window.innerWidth,
        vh = window.innerHeight;
      return x >= vw * 0.0641 && x <= vw * 0.2886 && y >= vh * 0.285 && y <= vh * 0.84;
    }

    function initialPointer(e: PointerEvent | TouchEvent) {
      const p = "touches" in e ? e.touches[0] : (e as PointerEvent);
      const { clientX: x, clientY: y } = p;
      if (phase === 0) {
        document.body.classList.add("fade-in-trigger");
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

    /* ===== Full‑screen toggle near edges (consistent with other pages) ===== */
    function toggleFullScreen() {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(() => {});
      } else {
        document.exitFullscreen().catch(() => {});
      }
    }
    const EDGE = 11;
    function edgeClick(e: MouseEvent) {
      const { clientX: x, clientY: y } = e;
      if (x <= EDGE || x >= innerWidth - EDGE || y <= EDGE || y >= innerHeight - EDGE) {
        toggleFullScreen();
      }
    }
    document.addEventListener("click", edgeClick);

    /* ===== Cleanup ===== */
    return () => {
      window.removeEventListener("pointermove", initialPointer);
      window.removeEventListener("touchstart", initialPointer);
      document.removeEventListener("click", edgeClick);
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

      {/* Login texts */}
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
