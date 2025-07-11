
// @ts-nocheck
"use client";
import React, { useRef, useEffect } from "react";

export default function Page() {
  const step = useRef(0); // 0 login, 1 util, 2 account, 3 help

  const rootRef = useRef<HTMLDivElement>(null);
  const utilRef = useRef<HTMLDivElement>(null);
  const openRef = useRef<HTMLSpanElement>(null);
  const helpRef = useRef<HTMLSpanElement>(null);
  const accountRef = useRef<HTMLDivElement>(null);
  const helpWrapRef = useRef<HTMLDivElement>(null);

  const fadeIn = (els) => {
    Array.from(els).forEach((el) => {
      el.classList.remove("hidden");
      void el.offsetWidth;
      el.classList.add("visible");
    });
  };

  const setStage = (s) => {
    document.body.classList.remove(
      "stage-login",
      "stage-util",
      "stage-account",
      "stage-help",
      "stage-util-pre"
    );
    document.body.classList.add(s);
  };

  useEffect(() => {
    const root = rootRef.current!;
    const util = utilRef.current!;
    const open = openRef.current!;
    const help = helpRef.current!;
    const account = accountRef.current!;
    const helpWrap = helpWrapRef.current!;
    const loginEls = root.querySelectorAll(
      ".username, .password, .login-line, .login-line-second"
    );

    util.style.pointerEvents = "auto";
    util.style.zIndex = "9999";
    root.querySelectorAll(".layer-one, .layer-two").forEach((l) => {
      l.style.pointerEvents = "none";
    });

    let phase = 0;
    const inLogin = (x, y) => {
      const vw = innerWidth,
        vh = innerHeight;
      return x >= vw * 0.0641 && x <= vw * 0.2886 && y >= vh * 0.285 && y <= vh * 0.84;
    };

    const firstPointer = (e) => {
      const p = "touches" in e ? e.touches[0] : e;
      const { clientX: x, clientY: y } = p;

      if (phase === 0) {
        document.body.classList.add("fade-in-trigger");
        phase = 1;
        return;
      }
      if (phase === 1 && inLogin(x, y)) {
        fadeIn(loginEls);
        console.log("[init] login group faded in");
        phase = 2;
        window.removeEventListener("pointermove", firstPointer);
        window.removeEventListener("touchstart", firstPointer);
      }
    };
    window.addEventListener("pointermove", firstPointer, { passive: true });
    window.addEventListener("touchstart", firstPointer, { passive: true });

    document.addEventListener("click", (e) => {
      const vw = innerWidth,
        vh = innerHeight;
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
      }
    });
  }, []);

  const handleUtilClick = () => {
    console.log("[util] handler fired");
    if (step.current !== 0) return;
    fadeIn(
      rootRef.current!.querySelectorAll(
        ".username, .password, .login-line, .login-line-second"
      )
    );
    fadeIn([openRef.current!, helpRef.current!]);
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        console.log("[util] adding stage-util to <body>");
        setStage("stage-util");
      })
    );
    step.current = 1;
  };

  return (
    <div ref={rootRef}>
      <div className="line util-line" ref={utilRef} onClick={handleUtilClick} />
      {/* minimal markup for test */}
      <span className="login-text username hidden">USER</span>
      <span className="login-text password hidden">PASS</span>
      <span className="login-text open-text hidden" ref={openRef}>
        OPEN
      </span>
      <span className="login-text help-text hidden" ref={helpRef}>
        HELP
      </span>
      <div className="line login-line hidden" />
      <div className="line login-line-second hidden" />
      <div className="account-wrapper" ref={accountRef} />
      <div className="help-wrapper" ref={helpWrapRef} />
      <div className="layer-one" />
      <div className="layer-two" />
    </div>
  );
}
