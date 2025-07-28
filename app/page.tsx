
"use client";
import './styles.css';

import React, { useEffect } from "react";

const Page: React.FC = () => {
  useEffect(() => {
    /* ===== Element groups ===== */
    const loginEls = Array.from(
      document.querySelectorAll<HTMLElement>(
        ".username, .password, .login-line, .login-line-second"
      )
    );
    const utilLine = document.querySelector<HTMLElement>(".util-line")!;
    const openText = document.querySelector<HTMLElement>(".open-text")!;
    const helpText = document.querySelector<HTMLElement>(".help-text")!;
    const accountWrap = document.querySelector<HTMLElement>(
      ".account-wrapper"
    )!;
    const helpWrap = document.querySelector<HTMLElement>(".help-wrapper")!;
    const body = document.body;

    /* ===== Visibility helpers ===== */
    const fadeInEls = (els: HTMLElement[]) =>
      els.forEach((el) => {
        el.classList.remove("hidden");
        void el.offsetWidth; // force reflow so opacity transition triggers
        el.classList.add("visible");
      });
    const fadeOutEls = (els: HTMLElement[]) =>
      Promise.all(
        els.map(
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
              void el.offsetWidth;
              el.classList.add("hidden");
            })
        )
      );

    /* ===== Initial fade‑in logic ===== */
    let phase = 0; // 0 = waiting for first interaction
    const triggerInitialFade = () => {
      if (phase !== 0) return;
      body.classList.add("fade-in-trigger");
      phase = 1;
    };

    // Comprehensive set of events so we always catch at least one:
    ["pointermove", "mousemove", "pointerover", "mouseover", "touchstart"].forEach(
      (evt) =>
        window.addEventListener(
          evt,
          triggerInitialFade,
          {
            passive: true,
            once: true, // auto‑remove after it fires
          }
        )
    );

    /* ===== Helper for login zone detection ===== */
    function inLoginZone(x: number, y: number) {
      const vw = window.innerWidth,
        vh = window.innerHeight;
      return (
        x >= vw * 0.064 && x <= vw * 0.289 && y >= vh * 0.285 && y <= vh * 0.84
      );
    }

    /* ===== Sequential UI flow ===== */
    let step = 0; // 0 login-fade, 1 util, 2 account, 3 help

    // Fade out login els after inactivity – re‑instate on hover back in zone
    const loginFadeTimeout = 20000;
    let inactivityTimer: number;
    let loginElsHidden = false;
    function resetInactivityTimer() {
      clearTimeout(inactivityTimer);
      if (step !== 0) return;
      inactivityTimer = window.setTimeout(() => {
        if (step === 0) {
          fadeOutEls(loginEls).then(() => (loginElsHidden = true));
        }
      }, loginFadeTimeout);
    }
    ["mousemove", "mousedown", "keydown", "touchstart"].forEach((evt) =>
      window.addEventListener(evt, resetInactivityTimer, { passive: true })
    );

    window.addEventListener(
      "pointermove",
      (ev: PointerEvent) => {
        if (step !== 0 || !loginElsHidden) return;
        const { clientX: x, clientY: y } = ev;
        if (inLoginZone(x, y)) {
          fadeInEls(loginEls);
          loginElsHidden = false;
          resetInactivityTimer();
        }
      },
      { passive: true }
    );
    resetInactivityTimer();

    /* ===== Click handlers for util -> account/help ===== */
    utilLine.addEventListener("click", () => {
      if (step !== 0) return;
      fadeInEls([...loginEls, openText, helpText]);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          body.classList.add("stage-util");
        });
      });
      step = 1;
    });

    openText.addEventListener("click", () => {
      if (step !== 1) return;
      accountWrap.classList.add("active");
      body.classList.add("stage-account");
      step = 2;
    });

    helpText.addEventListener("click", () => {
      if (step !== 1) return;
      helpWrap.classList.add("active");
      body.classList.add("stage-help");
      step = 3;
    });

    // Back‑zone click (left gutter)
    document.addEventListener("click", (e) => {
      const { clientX: x, clientY: y } = e as MouseEvent;
      const vw = window.innerWidth,
        vh = window.innerHeight;
      const backZone = x <= vw * 0.064 && y >= vh * 0.285 && y <= vh * 0.84;
      if (!backZone) return;
      if (step === 1) {
        body.classList.remove("stage-util");
        step = 0;
        fadeInEls(loginEls);
      } else if (step === 2) {
        accountWrap.classList.remove("active");
        body.classList.remove("stage-account");
        body.classList.add("stage-util");
        step = 1;
      } else if (step === 3) {
        helpWrap.classList.remove("active");
        body.classList.remove("stage-help");
        body.classList.add("stage-util");
        step = 1;
      }
    });

    /* ===== Editable text behaviour (unchanged) ===== */
    const editableSel =
      ".username, .password, .account-text, .help-text-area";
    function findEditable(ev: PointerEvent | MouseEvent) {
      let el = (ev.target as Element).closest(editableSel);
      if (!el) {
        const alt = document.elementFromPoint(ev.clientX, ev.clientY);
        if (alt) el = alt.closest(editableSel);
      }
      return el as HTMLElement | null;
    }
    document.addEventListener(
      "pointerdown",
      (ev: PointerEvent) => {
        const el = findEditable(ev);
        if (!el) return;
        if (
          /send\s*l1nk/i.test(el.textContent || "") ||
          /send\s*link/i.test(el.textContent || "") ||
          el.classList.contains("send-link") ||
          el.id === "send-link"
        )
          return;
        if (el.isContentEditable) return;
        ev.preventDefault();
        el.dataset.placeholder = el.textContent || "";
        el.textContent = "";
        el.setAttribute("contenteditable", "true");
        el.focus({ preventScroll: true });
      },
      true
    );
    document.addEventListener(
      "focusout",
      (ev: FocusEvent) => {
        const el = ev.target as HTMLElement;
        if (!el.matches || !el.matches(editableSel) || !el.isContentEditable)
          return;
        if (el.textContent?.trim() === "") {
          el.textContent = el.dataset.placeholder || "";
          el.removeAttribute("contenteditable");
        }
      },
      true
    );

    /* ===== Edge‑click full‑screen toggle ===== */
    function toggleFullScreen() {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(() => {});
      } else {
        document.exitFullscreen().catch(() => {});
      }
    }
    document.addEventListener("click", (ev: MouseEvent) => {
      const { clientX: x, clientY: y } = ev;
      if (
        x <= 11 ||
        x >= window.innerWidth - 11 ||
        y <= 11 ||
        y >= window.innerHeight - 11
      ) {
        toggleFullScreen();
      }
    });

    /* ===== Cleanup ===== */
    return () => {
      clearTimeout(inactivityTimer);
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
    </>
  );
};

export default Page;
