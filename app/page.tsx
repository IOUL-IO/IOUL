"use client";
import { useEffect } from "react";
import Head from "next/head";

export default function LoginPage() {
  useEffect(() => {
    const loginEls = document.querySelectorAll(
      ".username, .password, .login-line, .login-line-second"
    );
    const utilLine = document.querySelector(".util-line")!;
    const openText = document.querySelector(".open-text")!;
    const helpText = document.querySelector(".help-text")!;
    const accountWrap = document.querySelector(".account-wrapper")!;
    const helpWrap = document.querySelector(".help-wrapper")!;
    const body = document.body;

    function fadeIn(els) {
      els.forEach(el => el.classList.replace("hidden", "visible"));
    }
    function fadeOut(els) {
      return Promise.all(
        Array.from(els).map(el =>
          new Promise(res => {
            if (!el.classList.contains("visible")) return res();
            const onEnd = e => {
              if (e.propertyName === "opacity") {
                el.removeEventListener("transitionend", onEnd);
                res();
              }
            };
            el.addEventListener("transitionend", onEnd);
            el.classList.replace("visible", "hidden");
          })
        )
      );
    }

    function setStage(stage) {
      body.classList.remove(
        "stage-login",
        "stage-util",
        "stage-account",
        "stage-help",
        "stage-util-pre"
      );
      body.classList.add(stage);
    }

    let phase = 0;
    function inLoginZone(x, y) {
      const vw = window.innerWidth, vh = window.innerHeight;
      return x >= vw * 0.0641 && x <= vw * 0.2886 && y >= vh * 0.285 && y <= vh * 0.84;
    }
    function initialHandler(e) {
      const p = e.touches ? e.touches[0] : e;
      const x = p.clientX, y = p.clientY;
      if (phase === 0) {
        body.classList.add("fade-in-trigger");
        phase = 1;
        return;
      }
      if (phase === 1 && inLoginZone(x, y)) {
        fadeIn(loginEls);
        phase = 2;
        window.removeEventListener("pointermove", initialHandler);
        window.removeEventListener("touchstart", initialHandler);
      }
    }
    window.addEventListener("pointermove", initialHandler, { passive: true });
    window.addEventListener("touchstart", initialHandler, { passive: true });

    let step = 0, loginHidden = false, timer;
    function resetTimer() {
      clearTimeout(timer);
      if (step !== 0) return;
      timer = setTimeout(() => {
        if (step === 0) fadeOut(loginEls).then(() => (loginHidden = true));
      }, 20000);
    }
    ["mousemove", "mousedown", "keydown", "touchstart"].forEach(evt =>
      window.addEventListener(evt, resetTimer, { passive: true })
    );
    window.addEventListener("pointermove", ev => {
      if (step !== 0 || !loginHidden) return;
      const x = ev.clientX, y = ev.clientY;
      if (inLoginZone(x, y)) {
        fadeIn(loginEls);
        loginHidden = false;
        resetTimer();
      }
    }, { passive: true });
    resetTimer();

    utilLine.addEventListener("click", () => {
      if (step !== 0) return;
      setStage("stage-util-pre");
      fadeIn(loginEls);
      step = 1;
      setTimeout(() => {
        fadeIn(document.querySelectorAll(".open-text, .help-text"));
        setStage("stage-util");
      }, 700);
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

    document.addEventListener("click", e => {
      const x = e.clientX, y = e.clientY;
      const vw = window.innerWidth, vh = window.innerHeight;
      if (x > vw * 0.0637 || y < vh * 0.285 || y > vh * 0.84) return;
      if (step === 1) {
        setStage("stage-util-pre");
        setTimeout(() => {
          fadeOut(document.querySelectorAll(".open-text, .help-text"));
          setStage("stage-login");
          fadeIn(loginEls);
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

    document.addEventListener("pointerdown", ev => {
      const target = ev.target.closest(
        ".username, .password, .account-text, .help-text-area"
      );
      if (!target) return;
      ev.preventDefault();
      target.dataset.placeholder = target.textContent || "";
      target.textContent = "";
      target.contentEditable = "true";
      target.focus({ preventScroll: true });
    }, true);
    document.addEventListener("focusout", ev => {
      const el = ev.target;
      if (el.contentEditable === "true" && !el.textContent.trim()) {
        el.textContent = el.dataset.placeholder || "";
        el.contentEditable = "false";
      }
    }, true);

    document.addEventListener("click", ev => {
      const x = ev.clientX, y = ev.clientY;
      const w = window.innerWidth, h = window.innerHeight;
      if (x <= 11 || x >= w - 11 || y <= 11 || y >= h - 11) {
        if (!document.fullscreenElement) document.documentElement.requestFullscreen();
        else document.exitFullscreen();
      }
    });
  }, []);

  return (
    <>
      <Head>
        <link rel="stylesheet" href="/IOUL-login/styles.css" />
      </Head>

      <div className="login-container">
        <div className="line original" />
        <div className="line second" />
        <div className="line third" />
        <div className="line fourth" />
        <div className="line fifth" />
        <div className="line sixth" />
        <div className="line util-line" />

        <span className="login-text username hidden">USERnAME</span>
        <span className="login-text password hidden">PASSWORD</span>
        <span className="login-text open-text hidden">OPEn AccOUnT</span>
        <span className="login-text help-text hidden">HELP REQUEST</span>

        <div className="line login-line hidden" />
        <div className="line login-line-second hidden" />

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

        <div className="help-wrapper">
          <span className="help-text-area email">YOUR EMA1L</span>
          <span className="help-text-area sendlink">SEnD L1nK</span>
          <div className="help-line" />
        </div>

        <div className="layer-one" />
        <div className="layer-two" />
      </div>
    </>
  );
}
