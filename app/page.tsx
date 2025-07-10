// @ts-nocheck
"use client";
import React, { useEffect } from "react";

export default function Page() {
  useEffect(() => {
    /* minimal util-line click pointer fix only */

    const utilLine = document.querySelector(".line.util-line");
    if (utilLine) utilLine.style.pointerEvents = "auto";
    document.querySelectorAll(".layer-one, .layer-two")
      .forEach(el => (el as HTMLElement).style.pointerEvents = "none");

    let step = 0;
    const loginEls = document.querySelectorAll(".username, .password, .login-line, .login-line-second");
    const fadeIn = els => els.forEach(el => { el.classList.remove("hidden"); el.classList.add("visible"); });

    document.addEventListener("click", ev => {
      const hit = (ev.target as HTMLElement).closest(".util-line");
      if (hit && step === 0) {
        fadeIn(loginEls);
        document.body.classList.add("stage-util");
        step = 1;
      }
    });

    function toggleFullScreen() {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(()=>{});
      } else {
        document.exitFullscreen().catch(()=>{});
      }
    }

    document.addEventListener("click", ev => {
      const { clientX:x, clientY:y } = ev;
      if (x<=11 || x>=innerWidth-11 || y<=11 || y>=innerHeight-11) {
        toggleFullScreen();
      }
    });
  }, []);

  return (
    <>
      <div className="line util-line"></div>
      <span className="login-text username hidden">USERnAME</span>
      <span className="login-text password hidden">PASSWORD</span>
      <div className="line login-line hidden"></div>
      <div className="line login-line-second hidden"></div>
      <span className="login-text open-text hidden">OPEn AccOUnT</span>
      <span className="login-text help-text hidden">HELP REQUEST</span>
    </>
  );
}
