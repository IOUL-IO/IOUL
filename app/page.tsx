"use client";
import React, { useEffect, useRef } from "react";

export default function LoginPage() {
  const loginElsRef = useRef<NodeListOf<HTMLElement>>();
  const utilLineRef = useRef<HTMLElement | null>(null);
  const openTextRef = useRef<HTMLElement | null>(null);
  const helpTextRef = useRef<HTMLElement | null>(null);
  const accountWrapRef = useRef<HTMLElement | null>(null);
  const helpWrapRef = useRef<HTMLElement | null>(null);
  
  useEffect(() => {
    // assign refs
    loginElsRef.current = document.querySelectorAll(
      ".username, .password, .login-line, .login-line-second"
    );
    utilLineRef.current = document.querySelector(".util-line");
    openTextRef.current = document.querySelector(".open-text");
    helpTextRef.current = document.querySelector(".help-text");
    accountWrapRef.current = document.querySelector(".account-wrapper");
    helpWrapRef.current = document.querySelector(".help-wrapper");
    
    // fade helper
    const fadeInEls = (els: NodeListOf<HTMLElement>) =>
      els.forEach((el) => el.classList.replace("hidden", "visible"));
    const fadeOutEls = (els: NodeListOf<HTMLElement>) =>
      Promise.all(
        Array.from(els).map(
          (el) =>
            new Promise((res) => {
              if (!el.classList.contains("visible")) return res(null);
              const onEnd = (e: TransitionEvent) => {
                if (e.propertyName === "opacity") {
                  el.removeEventListener("transitionend", onEnd);
                  res(null);
                }
              };
              el.addEventListener("transitionend", onEnd);
              el.classList.replace("visible", "hidden");
            })
        )
      );

    // stage logic
    let phase = 0;
    const inLoginZone = (x: number, y: number) => {
      const vw = innerWidth,
        vh = innerHeight;
      return x >= vw * 0.0641 && x <= vw * 0.2886 && y >= vh * 0.285 && y <= vh * 0.84;
    };

    const initialPointer = (e: PointerEvent | TouchEvent) => {
      const p = "touches" in e ? e.touches[0] : (e as PointerEvent);
      const x = p.clientX,
        y = p.clientY;
      if (phase === 0) {
        document.body.classList.add("fade-in-trigger");
        phase = 1;
        return;
      }
      if (phase === 1 && inLoginZone(x, y)) {
        fadeInEls(loginElsRef.current!);
        phase = 2;
        window.removeEventListener("pointermove", initialPointer as any);
        window.removeEventListener("touchstart", initialPointer as any);
      }
    };

    window.addEventListener("pointermove", initialPointer as any, { passive: true });
    window.addEventListener("touchstart", initialPointer as any, { passive: true });

    // inactivity
    let step = 0;
    let inactivityTimer: ReturnType<typeof setTimeout>;
    let loginElsHidden = false;
    const resetInactivityTimer = () => {
      clearTimeout(inactivityTimer);
      if (step !== 0) return;
      inactivityTimer = setTimeout(async () => {
        if (step === 0) {
          await fadeOutEls(loginElsRef.current!);
          loginElsHidden = true;
        }
      }, 20000);
    };
    ["mousemove", "mousedown", "keydown", "touchstart"].forEach((evt) =>
      window.addEventListener(evt, resetInactivityTimer, { passive: true })
    );
    window.addEventListener(
      "pointermove",
      (ev) => {
        if (step !== 0 || !loginElsHidden) return;
        const x = (ev as PointerEvent).clientX,
          y = (ev as PointerEvent).clientY;
        if (inLoginZone(x, y)) {
          fadeInEls(loginElsRef.current!);
          loginElsHidden = false;
          resetInactivityTimer();
        }
      },
      { passive: true }
    );
    resetInactivityTimer();

    // util click
    utilLineRef.current?.addEventListener("click", () => {
      if (step !== 0) return;
      document.body.classList.add("stage-util-pre");
      fadeInEls(loginElsRef.current!);
      step = 1;
      setTimeout(() => {
        fadeInEls(
          document.querySelectorAll<HTMLElement>(".open-text, .help-text")
        );
        document.body.classList.remove("stage-util-pre");
        document.body.classList.add("stage-util");
      }, 700);
    });

    // open/account
    openTextRef.current?.addEventListener("click", () => {
      if (step !== 1) return;
      accountWrapRef.current!.classList.add("active");
      document.body.classList.add("stage-account");
      step = 2;
    });

    helpTextRef.current?.addEventListener("click", () => {
      if (step !== 1) return;
      helpWrapRef.current!.classList.add("active");
      document.body.classList.add("stage-help");
      step = 3;
    });

    // back tap
    document.addEventListener("click", async (e) => {
      const x = (e as MouseEvent).clientX,
        y = (e as MouseEvent).clientY;
      const vw = innerWidth,
        vh = innerHeight;
      const backZone = x <= vw * 0.0637 && y >= vh * 0.285 && y <= vh * 0.84;
      if (!backZone) return;
      if (step === 1) {
        document.body.classList.add("stage-util-pre");
        setTimeout(() => {
          fadeOutEls(
            document.querySelectorAll<HTMLElement>(".open-text, .help-text")
          );
          document.body.classList.remove("stage-util-pre");
          document.body.classList.add("stage-login");
          fadeInEls(loginElsRef.current!);
          step = 0;
        }, 700);
      } else if (step === 2) {
        accountWrapRef.current!.classList.remove("active");
        document.body.classList.add("stage-util");
        step = 1;
      } else if (step === 3) {
        helpWrapRef.current!.classList.remove("active");
        document.body.classList.add("stage-util");
        step = 1;
      }
    });

    // editable logic
    const editableSel = ".username, .password, .account-text, .help-text-area";
    function findEditable(ev: MouseEvent) {
      let el = (ev.target as HTMLElement).closest(editableSel) as HTMLElement;
      if (!el) {
        const alt = document.elementFromPoint(ev.clientX, ev.clientY) as HTMLElement;
        if (alt) el = alt.closest(editableSel) as HTMLElement;
      }
      return el;
    }
    document.addEventListener(
      "pointerdown",
      (ev) => {
        const el = findEditable(ev);
        if (!el) return;
        if (/send\s*l1nk/i.test(el.textContent!) || el.classList.contains("sendlink")) return;
        ev.preventDefault();
        el.dataset.placeholder = el.textContent!;
        el.textContent = "";
        el.contentEditable = "true";
        el.focus({ preventScroll: true });
      },
      true
    );

    document.addEventListener(
      "focusout",
      (ev) => {
        const el = ev.target as HTMLElement;
        if (!el.matches(editableSel) || el.contentEditable !== "true") return;
        if (!el.textContent?.trim()) {
          el.textContent = el.dataset.placeholder || "";
          el.contentEditable = "false";
        }
      },
      true
    );

    // edge fullscreen toggle
    function toggleFullScreen() {
      if (!document.fullscreenElement) document.documentElement.requestFullscreen().catch(() => {});
      else document.exitFullscreen().catch(() => {});
    }
    document.addEventListener("click", (ev) => {
      const { clientX: x, clientY: y } = ev as MouseEvent;
      if (x <= 11 || x >= innerWidth - 11 || y <= 11 || y >= innerHeight - 11) toggleFullScreen();
    });
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

      {/* Login lines */}
      <div className="line login-line hidden" />
      <div className="line login-line-second hidden" />

      {/* Account wrapper */}
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
