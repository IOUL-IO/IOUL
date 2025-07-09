// app/page.tsx
"use client";
import { useEffect } from "react";
import Head from "next/head";

export default function LoginPage() {
  useEffect(() => {
    // Dynamic root font-size to keep rem scaling without CSS html rules
    function updateRootFont() {
      const width = window.innerWidth;
      const scale = width < 1900 ? (width / 1900) : 1;
      document.documentElement.style.fontSize = `${scale * 100}%`;
    }
    updateRootFont();
    window.addEventListener("resize", updateRootFont);

    // Existing slide and fade logic...
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

    // Clean up resize listener
    return () => {
      window.removeEventListener("resize", updateRootFont);
    };
  }, []);

  return (
    <>
      <Head>
        <link rel="stylesheet" href="/IOUL-login/styles.css" />
      </Head>
      <div className="login-container">
        {/* ... your existing login JSX here ... */}
      </div>
    </>
  );
}
