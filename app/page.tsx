"use client";
import React, { useEffect } from "react";

/**
 * This is a near‑verbatim TypeScript translation of the inline <script>
 * that shipped with the original login HTML.  All event wiring, timing,
 * helper fns, CSS‑class choreography, etc. are preserved so the runtime
 * behaviour (including the login‑zone hover, util‑line slide sequence,
 * account/help panels, auto‑fade, back‑tap, fullscreen corners, editable
 * placeholders…) stays pixel‑identical to the original.
 *
 * Only differences:
 *   • Code now lives inside a React useEffect (runs after mount)
 *   • A few non‑null assertions (!) / type‑casts remove TS errors
 *   • Helper fns are typed (Iterable<Element>) so `classList`
 *     and `offsetWidth` are recognised by the TS compiler.
 */
export default function Page() {
  useEffect(() => {
    /* ===== Element groups ===== */
    const loginEls = document.querySelectorAll<HTMLElement>(
      ".username, .password, .login-line, .login-line-second"
    );
    const utilLine = document.querySelector<HTMLElement>(".util-line")!;
    const openText = document.querySelector<HTMLElement>(".open-text")!;
    const helpText = document.querySelector<HTMLElement>(".help-text")!;
    const accountWrap = document.querySelector<HTMLElement>(".account-wrapper")!;
    const helpWrap = document.querySelector<HTMLElement>(".help-wrapper")!;
    const body = document.body;

    /* ===== Helper functions ===== */
    const fadeInEls = (els: Iterable<Element>) => {
      for (const n of els) {
        const el = n as HTMLElement;
        el.classList.remove("hidden");
        void el.offsetWidth; // reflow → fire transition
        el.classList.add("visible");
      }
    };

    const fadeOutEls = (els: Iterable<Element>) =>
      Promise.all(
        Array.from(els, n => {
          const el = n as HTMLElement;
          return new Promise<void>(res => {
            if (!el.classList.contains("visible")) {
              res();
              return;
            }
            const end = (e: Event) => {
              if ((e as TransitionEvent).propertyName === "opacity") {
                el.removeEventListener("transitionend", end);
                res();
              }
            };
            el.addEventListener("transitionend", end);
            el.classList.remove("visible");
            void el.offsetWidth;
            el.classList.add("hidden");
          });
        })
      );

    /* ===== Stage management ===== */
    const setStage = (name: string) => {
      body.classList.remove("stage-login", "stage-util", "stage-account", "stage-help");
      body.classList.add(name);
    };

    /* ===== Initial pointer logic ===== */
    let phase = 0; // 0: waiting initial pointer, 1: waiting hover‑in, 2: login shown
    const inLoginZone = (x: number, y: number) => {
      const vw = innerWidth,
        vh = innerHeight;
      // ratios are from the original ZIP (≈ 6.41% etc.)
      return x >= vw * 0.0641 && x <= vw * 0.2886 && y >= vh * 0.285 && y <= vh * 0.84;
    };

    const initialPointer = (ev: PointerEvent | TouchEvent) => {
      const p =
        "touches" in ev && ev.touches.length ? ev.touches[0] : (ev as PointerEvent);
      const { clientX: x, clientY: y } = p;

      if (phase === 0) {
        body.classList.add("fade-in-trigger"); // util + base lines fade‑in
        phase = 1;
        return;
      }
      if (phase === 1 && inLoginZone(x, y)) {
        fadeInEls(loginEls); // login group fade‑in
        phase = 2;
        window.removeEventListener("pointermove", initialPointer as EventListener);
        window.removeEventListener("touchstart", initialPointer as EventListener);
      }
    };

    window.addEventListener("pointermove", initialPointer as EventListener);
    window.addEventListener("touchstart", initialPointer as EventListener);

    /* ===== Util‑line → slide sequence ===== */
    let step = 0; // 0: util idle, 1: util shown, 2: account, 3: help
    utilLine.addEventListener("click", () => {
      if (step !== 0) return;

      // Bring everything to visible first
      fadeInEls(loginEls);
      fadeInEls([openText, helpText]);

      // Let browser commit current position, then trigger stage change
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setStage("stage-util"));
      });

      step = 1;
    });

    /* ===== Account / Help clicks ===== */
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

    /* ===== Back‑tap (click outside) ===== */
    document.addEventListener("click", ev => {
      if (ev.target !== document.body && !(ev.target as HTMLElement).classList.contains("layer-two"))
        return;

      if (step === 2) {
        accountWrap.classList.remove("active");
        setStage("stage-util");
        step = 1;
      } else if (step === 3) {
        helpWrap.classList.remove("active");
        setStage("stage-util");
        step = 1;
      }
    });

    /* ===== Editable text zones ===== */
    const editableSel =
      ".username, .password, .account-text, .help-text-area";
    const findEditable = (ev: PointerEvent): HTMLElement | null => {
      let el = (ev.target as HTMLElement).closest(editableSel);
      if (!el) {
        const alt = document.elementFromPoint(ev.clientX, ev.clientY) as HTMLElement | null;
        if (alt) el = alt.closest(editableSel);
      }
      return el;
    };

    document.addEventListener(
      "pointerdown",
      ev => {
        const el = findEditable(ev as PointerEvent);
        if (!el) return;

        // skip SEND LINK area
        if (
          /send\s*l1nk/i.test(el.textContent || "") ||
          /send\s*link/i.test(el.textContent || "") ||
          el.classList.contains("send-link") ||
          el.id === "send-link"
        )
          return;

        if (el.isContentEditable) return;
        ev.preventDefault();

        (el as any).dataset.placeholder = el.textContent || "";
        el.textContent = "";
        el.setAttribute("contenteditable", "true");
        el.focus({ preventScroll: true });
      },
      true
    );

    document.addEventListener("focusout", ev => {
      const el = ev.target as HTMLElement;
      if (!el || !el.matches(editableSel) || !el.isContentEditable) return;
      if (el.textContent?.trim() === "") {
        el.textContent = (el as any).dataset.placeholder || "";
      }
      el.removeAttribute("contenteditable");
      delete (el as any).dataset.placeholder;
    });

    /* ===== Inactivity auto‑fade (login group) ===== */
    const loginFadeTimeout = 20000; // 20 s
    let loginFadeTimer: number;

    const resetLoginFade = () => {
      clearTimeout(loginFadeTimer);
      loginFadeTimer = window.setTimeout(() => {
        if (step === 0) fadeOutEls(loginEls);
      }, loginFadeTimeout);
    };
    window.addEventListener("pointermove", resetLoginFade);
    window.addEventListener("keydown", resetLoginFade);
    resetLoginFade();

    /* ===== Full‑screen toggle on corner clicks ===== */
    const toggleFullScreen = () => {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(() => {});
      } else {
        document.exitFullscreen().catch(() => {});
      }
    };

    document.addEventListener("click", ev => {
      const { clientX: x, clientY: y } = ev;
      if (x <= 11 || x >= innerWidth - 11 || y <= 11 || y >= innerHeight - 11) {
        toggleFullScreen();
      }
    });

    /* == clean‑up on unmount == */
    return () => {
      // (Listeners could be removed here if this page were ever unmounted)
    };
  }, []);

  /* === STATIC MARK‑UP (unchanged) === */
  return (
    <main>
      {/* Static lines */}
      <div className="line original"></div>
      <div className="line second"></div>
      <div className="line third"></div>
      <div className="line fourth"></div>
      <div className="line fifth"></div>
      <div className="line sixth"></div>
      <div className="line util-line"></div>

      {/* Login */}
      <span className="login-text username hidden">USERnAME</span>
      <span className="login-text password hidden">PASSWORD</span>

      {/* Util texts */}
      <span className="login-text open-text hidden">OPEn AccOUnT</span>
      <span className="login-text help-text hidden">HELP REQUEST</span>

      {/* Login entry lines */}
      <div className="line login-line hidden"></div>
      <div className="line login-line-second hidden"></div>

      {/* Account creation wrapper */}
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

      {/* Help wrapper */}
      <div className="help-wrapper">
        <span className="help-text-area email">YOUR EMA1L</span>
        <span className="help-text-area sendlink">SEnD L1nK</span>
        <div className="help-line"></div>
      </div>

      {/* Masking layers */}
      <div className="layer-one"></div>
      <div className="layer-two"></div>
    </main>
  );
}
