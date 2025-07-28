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

    /* ===== Helper functions ===== */
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

    /* ===== Stage management ===== */
    function setStage(name: string) {
      body.classList.remove(
        "stage-login",
        "stage-util",
        "stage-account",
        "stage-help"
      );
      body.classList.add(name);
    }

    /* ===== Initial hover logic (unchanged) ===== */
    let phase = 0; // 0: waiting for first pointer -> lines fade. 1: waiting for login zone hover
    function inLoginZone(x: number, y: number) {
      const vw = window.innerWidth,
        vh = window.innerHeight;
      return (
        x >= vw * 0.0641 &&
        x <= vw * 0.2886 &&
        y >= vh * 0.285 &&
        y <= vh * 0.84
      );
    }

// --- Cross‑device first interaction trigger (2025‑07‑28) ---
const triggerFirstInteraction = () => {
  if (phase !== 0) return;
  body.classList.add("fade-in-trigger");
  phase = 1;
};

window.addEventListener("pointerdown", triggerFirstInteraction, { passive: true });
window.addEventListener("mousemove", triggerFirstInteraction, { passive: true });
window.addEventListener("keydown", triggerFirstInteraction, { passive: true });
    const initialPointer = (e: PointerEvent | TouchEvent) => {
      const p =
        e instanceof TouchEvent ? e.touches[0] : (e as PointerEvent);
      const { clientX: x, clientY: y } = p;

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
    };
    window.addEventListener("pointermove", initialPointer, {
      passive: true,
    });
    window.addEventListener("touchstart", initialPointer, {
      passive: true,
    });

    /* ===== Sequential logic ===== */
    let step = 0;
    const loginFadeTimeout = 20000; // 20 seconds
    let inactivityTimer: number;
    let loginElsHidden = false;

    function resetInactivityTimer() {
      clearTimeout(inactivityTimer);
      if (step !== 0) return;
      inactivityTimer = window.setTimeout(() => {
        if (step === 0) {
          fadeOutEls(loginEls).then(() => {
            loginElsHidden = true;
          });
        }
      }, loginFadeTimeout);
    }

    ["mousemove", "mousedown", "keydown", "touchstart"].forEach((evt) => {
      window.addEventListener(evt, resetInactivityTimer, {
        passive: true,
      });
    });

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

    utilLine.addEventListener("click", () => {
      if (step !== 0) return;
      fadeInEls(loginEls);
      fadeInEls([openText, helpText]);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setStage("stage-util");
        });
      });
      step = 1;
    });

    openText.addEventListener("click", () => {
      if (step !== 1) return;
      accountWrap.classList.add("active");
      setStage("stage-account");
      step = 2;
    });

    helpText.addEventListener("click", () => {
      if (step !== 1) return;
      helpWrap.classList.add("active");
      setStage("stage-help");
      step = 3;
    });

    document.addEventListener("click", (e) => {
      const { clientX: x, clientY: y } = e as MouseEvent;
      const vw = window.innerWidth,
        vh = window.innerHeight;
      const backZone =
        x <= vw * 0.0637 && y >= vh * 0.285 && y <= vh * 0.84;
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
        accountWrap.classList.remove("active");
        setStage("stage-util");
        step = 1;
      } else if (step === 3) {
        helpWrap.classList.remove("active");
        setStage("stage-util");
        step = 1;
      }
    });

    /* ===== Editable text logic (unchanged) ===== */
    const editableSel =
      ".username, .password, .account-text, .help-text-area";
    function findEditable(ev: PointerEvent) {
      let el = (ev.target as Element).closest(editableSel);
      if (!el) {
        const alt = document.elementFromPoint(
          ev.clientX,
          ev.clientY
        );
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
        if (
          !el.matches ||
          !el.matches(editableSel) ||
          !el.isContentEditable
        )
          return;
        if (el.textContent?.trim() === "") {
          el.textContent = el.dataset.placeholder || "";
          el.removeAttribute("contenteditable");
        }
      },
      true
    );

    /* ===== Edge-click fullscreen toggle ===== */
    function toggleFullScreen() {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(() => {});
      } else {
        document.exitFullscreen().catch(() => {});
      }
    }
    document.addEventListener("click", (ev: MouseEvent) => {
      const x = ev.clientX,
        y = ev.clientY;
      if (
        x <= 11 ||
        x >= window.innerWidth - 11 ||
        y <= 11 ||
        y >= window.innerHeight - 11
      ) {
        toggleFullScreen();
      }
    });

    /* ==== Cleanup on unmount ==== */
    return () => {

window.removeEventListener("pointerdown", triggerFirstInteraction);
            window.removeEventListener("mousemove", triggerFirstInteraction);
window.removeEventListener("keydown", triggerFirstInteraction);
      window.removeEventListener("pointermove", initialPointer);
      window.removeEventListener("touchstart", initialPointer);
      ["mousemove", "mousedown", "keydown", "touchstart"].forEach((evt) => {
        window.removeEventListener(evt, resetInactivityTimer as any);
      });
      document
        .querySelector<HTMLElement>(".util-line")
        ?.removeEventListener("click", () => {});
      openText.removeEventListener("click", () => {});
      helpText.removeEventListener("click", () => {});
      document.removeEventListener("click", () => {});
      document.removeEventListener("pointerdown", () => {});
      document.removeEventListener("focusout", () => {});
      document.removeEventListener("click", () => {});
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
      <span className="login-text open-text hidden">
        OPEn AccOUnT
      </span>
      <span className="login-text help-text hidden">
        HELP REQUEST
      </span>

      {/* Login entry lines */}
      <div className="line login-line hidden" />
      <div className="line login-line-second hidden" />

      {/* Account creation wrapper */}
      <div className="account-wrapper">
        <span className="account-text account-email">
          E-MA1L ADDRESS
        </span>
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

      {/* Help wrapper */}
      <div className="help-wrapper">
        <span className="help-text-area email">YOUR EMA1L</span>
        <span className="help-text-area sendlink">
          SEnD L1nK
        </span>
        <div className="help-line" />
      </div>

      {/* Masking layers */}
      <div className="layer-one" />
      <div className="layer-two" />
    </>
  );
};

export default Page;
