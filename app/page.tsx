// @ts-nocheck
"use client";
import React, { useEffect } from "react";

export default function Page() {
  useEffect(() => {
    /* =====================================================
       ELEMENTS & POINTER‑EVENT FIXES
    ====================================================== */
    const loginEls    = document.querySelectorAll(
      ".username, .password, .login-line, .login-line-second"
    );
    const openText    = document.querySelector(".open-text");
    const helpText    = document.querySelector(".help-text");
    const accountWrap = document.querySelector(".account-wrapper");
    const helpWrap    = document.querySelector(".help-wrapper");
    const utilLine    = document.querySelector(".line.util-line");
    const layers      = document.querySelectorAll(".layer-one, .layer-two");
    const body        = document.body;

    // Make the util strip clickable & overlays pass‑through
    utilLine && ((utilLine as HTMLElement).style.pointerEvents = "auto");
    layers.forEach(l => ((l as HTMLElement).style.pointerEvents = "none"));

    /* =====================================================
       SMALL HELPERS
    ====================================================== */
    const fadeInEls = (els: NodeListOf<HTMLElement> | HTMLElement[]) =>
      els.forEach(el => {
        if (!el) return;
        el.classList.remove("hidden");
        void el.offsetWidth;
        el.classList.add("visible");
      });

    const fadeOutEls = (els: NodeListOf<HTMLElement> | HTMLElement[]) =>
      Promise.all(
        Array.from(els).map(
          el =>
            new Promise<void>(res => {
              if (!el || !el.classList.contains("visible")) {
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

    /* =====================================================
       INITIAL HOVER – REVEAL LOGIN GROUP
    ====================================================== */
    let phase = 0; // 0 fade‑in lines, 1 wait hover, 2 done
    const inLogin = (x: number, y: number) => {
      const vw = innerWidth,
        vh = innerHeight;
      return (
        x >= vw * 0.0641 &&
        x <= vw * 0.2886 &&
        y >= vh * 0.285 &&
        y <= vh * 0.84
      );
    };

    const firstPointer = (e: PointerEvent | TouchEvent) => {
      const p: any = "touches" in e ? (e as TouchEvent).touches[0] : e;
      const { clientX: x, clientY: y } = p;

      if (phase === 0) {
        body.classList.add("fade-in-trigger");
        phase = 1;
        return;
      }
      if (phase === 1 && inLogin(x, y)) {
        fadeInEls(loginEls);
        phase = 2;
        window.removeEventListener("pointermove", firstPointer as any);
        window.removeEventListener("touchstart", firstPointer as any);
      }
    };

    window.addEventListener("pointermove", firstPointer as any, {
      passive: true,
    });
    window.addEventListener("touchstart", firstPointer as any, {
      passive: true,
    });

    /* =====================================================
       LOGIN AUTO‑HIDE / SHOW
    ====================================================== */
    let step = 0; // 0 login, 1 util, 2 account, 3 help
    let loginHidden = false;
    const idleMs = 20000;
    let idleT: any;

    const resetIdle = () => {
      clearTimeout(idleT);
      if (step) return;
      idleT = setTimeout(() => {
        if (!step) fadeOutEls(loginEls).then(() => (loginHidden = true));
      }, idleMs);
    };

    ["pointermove", "touchstart", "keydown", "mousedown"].forEach(evt =>
      window.addEventListener(evt, resetIdle, { passive: true })
    );
    resetIdle();

    window.addEventListener(
      "pointermove",
      ev => {
        if (step || !loginHidden) return;
        const { clientX: x, clientY: y } = ev;
        if (inLogin(x, y)) {
          fadeInEls(loginEls);
          loginHidden = false;
          resetIdle();
        }
      },
      { passive: true }
    );

    /* =====================================================
       UTIL-STRIP CLICK → STAGE UTIL
       const handleUtilClick = (ev: Event) => {
         const hit = (ev.target as HTMLElement).closest(".util-line, .util-hitbox");
         if (!hit || step) return;
    ====================================================== */
      if (!hit || step) return;

      fadeInEls(loginEls);
      fadeInEls([openText as any, helpText as any]);

      requestAnimationFrame(() =>
        requestAnimationFrame(() => setStage("stage-util"))
      );
      step = 1;
       };
       document.addEventListener('click', handleUtilClick);
       document.querySelector('.util-hitbox')?.addEventListener('click', handleUtilClick);

    /* =====================================================
       OPEN / HELP BUTTONS
    ====================================================== */
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

    /* =====================================================
       BACK‑TAP AREA (6 % LEFT STRIP)
    ====================================================== */
    document.addEventListener("click", e => {
      const { clientX: x, clientY: y } = e;
      const vw = innerWidth,
        vh = innerHeight;
      const back = x <= vw * 0.0637 && y >= vh * 0.285 && y <= vh * 0.84;
      if (!back) return;

      if (step === 1) {
        setStage("stage-util-pre");
        setTimeout(() => {
          body.classList.remove("stage-util-pre");
          setStage("stage-login");
          fadeInEls(loginEls);
          step = 0;
          resetIdle();
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
    });

    /* =====================================================
       EDITABLE TEXT LOGIC
    ====================================================== */
    const editSel = ".username, .password, .account-text, .help-text-area";

    document.addEventListener(
      "pointerdown",
      ev => {
        let el = (ev.target as HTMLElement).closest(editSel);
        if (!el) {
          const alt = document.elementFromPoint(ev.clientX, ev.clientY) as
            | HTMLElement
            | null;
          if (alt) el = alt.closest(editSel);
        }
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
        (el as any).dataset.placeholder = el.textContent;
        el.textContent = "";
        el.setAttribute("contenteditable", "true");
        el.focus({ preventScroll: true });
      },
      true
    );

    document.addEventListener(
      "focusout",
      ev => {
        const el = ev.target as HTMLElement;
        if (!el || !el.matches(editSel) || !el.isContentEditable) return;
        if ((el.textContent || "").trim() === "") {
          el.textContent = (el as any).dataset.placeholder || "";
          el.removeAttribute("contenteditable");
        }
      },
      true
    );

    /* =====================================================
       EDGE‑CLICK FULLSCREEN TOGGLE
    ====================================================== */
    const toggleFull = () => {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(() => {});
      } else {
        document.exitFullscreen().catch(() => {});
      }
    };

    document.addEventListener("click", ev => {
      const { clientX: x, clientY: y } = ev;
      if (x <= 11 || x >= innerWidth - 11 || y <= 11 || y >= innerHeight - 11) {
        toggleFull();
      }
    });
  }, []);

  /* =====================================================
     JSX MARKUP (UNCHANGED)
  ====================================================== */
  return (
    <>
      <div className="line original"></div>
      <div className="line second"></div>
      <div className="line third"></div>
      <div className="line fourth"></div>
      <div className="line fifth"></div>
      <div className="line sixth"></div>
      <div className="line util-line"></div>

      <span className="login-text username hidden">USERnAME</span>
      <span className="login-text password hidden">PASSWORD</span>

      <span className="login-text open-text hidden">OPEn AccOUnT</span>
      <span className="login-text help-text hidden">HELP REQUEST</span>

      <div className="line login-line hidden"></div>
      <div className="line login-line-second hidden"></div>

      <div className="account-wrapper">
        <span className="account-text account-email">E-MA1L ADDRESS</span>
        <span className="account-text account-username">YOUR USERnAME</span>
        <span className="account-text account-sign-password">YOUR PASSWORD</span>
        <span className="account-text account-repeat-password">REDO PASSWORD</span>
        <div className="account-line account-line1"></div>
        <div className="account-line account-line2"></div>
        <div className="account-line account-line3"></div>
        <div className="account-line account-line4"></div>
      </div>

      <div className="help-wrapper">
        <span className="help-text-area email">YOUR EMA1L</span>
        <span className="help-text-area sendlink">SEnD L1nK</span>
        <div className="help-line"></div>
      </div>

      <div className="layer-one"></div>
      <div className="layer-two"></div>
    </>
  );
}
