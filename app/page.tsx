export const metadata = {
  title: `IOUL`,
};

export default function Page() {
  return (
    <>
      <style dangerouslySetInnerHTML={ __html: `@font-face {
  font-family: 'Distill Expanded';
  src: url('font.woff2') format('woff2'),
       url('font.woff') format('woff');
  font-weight: normal;
  font-style: normal;
}

/* ===== Reset & Base ===== */
*{margin:0;padding:0;box-sizing:border-box;}

:root{
  --username-line-top:38.9vh;
  --password-line-top:47vh;
  --line-gap:2.8vh;
  --slide-dist:22.59vw;            /* primary horizontal shift */
}

body.non-fullscreen{background:#fff;min-height:100vh;min-width:100vw;overflow:hidden;}
body.non-fullscreen .username{top:35.17vh;}
body.non-fullscreen .password{top:43.17vh;}

body.fade-in-trigger{background:#fff;}

/* ===== Lines ===== */
.line:not(.login-line):not(.login-line-second){
  opacity:0;transition:opacity .5s ease-in-out;
}
body.fade-in-trigger .line:not(.login-line):not(.login-line-second){
  opacity:1;
}

.login-line,
.login-line-second,
.login-text{opacity:0;transition:opacity .5s ease-in-out;}

.login-text,
.login-line,
.login-line-second{
  transition:transform .7s ease-in-out, opacity .5s ease-in-out;
}

/* ===== Generic Visibility Helpers ===== */
.visible{opacity:1 !important;transition:transform 0.7s ease-in-out, opacity .5s ease-in-out;}
.hidden {opacity:0 !important;transition:transform 0.7s ease-in-out, opacity .5s ease-in-out;pointer-events:none;}

/* ===== Static Geometry ===== */
.line{position:absolute;height:1px;background:rgba(172,172,172,.84)}
.original{top:12.5vh;left:6.38vw;width:22.48vw;}
.second  {top:28.5vh;left:6.38vw;width:18.68vw;}
.third   {top:84vh; left:6.38vw;width:22.48vw;}
.fourth  {top:12.5vh;left:36vw; width:57.8vw;}
.fifth   {top:28.5vh;left:36vw; width:57.8vw;}
.sixth   {top:84vh; left:36vw; width:57.8vw;}

.line.util-line{top:28.5vh;left:26.06vw;width:2.8vw;z-index:1;}

.login-text{
  position:absolute;font-family:'Distill Expanded',sans-serif;color:#111;
  letter-spacing:.28vw;font-size:.47rem;left:6.41vw;
  text-shadow:.001rem .001rem 0 #717171,-.001rem -.001rem 0 #717171;
}

.username{top:calc(var(--username-line-top) - var(--line-gap));}
.password{top:calc(var(--password-line-top) - var(--line-gap));}

.login-line,
.login-line-second{
  position:absolute;left:6.4vw;width:22.48vw;height:1px;
  background:rgba(230,230,230,.28);
}
.login-line {top:var(--username-line-top);}
.login-line-second{top:var(--password-line-top);}

/* ===== Utility Texts (OPEn / HELP) ===== */
.open-text,
.help-text{
  transition: transform 0.7s ease, opacity 0.3s ease;
  position:absolute;top:35.17vh;                 /* overwritten for help later */
  font-family:'Distill Expanded',sans-serif;
  color:#111;letter-spacing:.28vw;font-size:.47rem;
  text-shadow:.001rem .001rem 0 #717171,-.001rem -.001rem 0 #717171;
  left:29vw;                                     /* parked behind layer-two */
  opacity:0;/* start hidden */                                     /* start fully transparent */
  transition:transform .7s ease,opacity .3s ease;
}
.help-text{top:43.17vh;}

/* Hover brighten when visible */
.open-text.visible:hover,
.help-text.visible:hover{opacity:1 !important;}

/* ===== Layers ===== */
.layer-one{
  position:fixed;top:0;left:0;width:6.37vw;height:100vh;background:#fff;z-index:100;
}
.layer-two{
  position:fixed;top:0;left:28.87vw;width:calc(36vw - 28.87vw);height:100vh;background:#fff;z-index:100;
}

/* ===== Account & Help Wrappers ===== */
.account-wrapper,
.help-wrapper{
  position:fixed;top:0;left:29vw;
  width:22.48vw;height:100vh;
  clip-path: inset(0 100% 0 0);     /* hide anything >36vw */
  transition:left .7s ease,clip-path .7s ease;
  z-index:5;pointer-events:none;
}
.account-wrapper.active,
.help-wrapper.active{
  left:6.41vw;clip-path: inset(0);pointer-events:auto;
}

/* ===== Account specific ===== */
.account-text{
  position:absolute;left:0;font-family:'Distill Expanded',sans-serif;color:#111;
  letter-spacing:.34vw;font-size:.46rem;line-height:1.2;padding:.1rem 0;
  text-shadow:.001rem .001rem 0 #717171,-.001rem -.001rem 0 #717171;
}
.account-text.account-email          {top:35.2vh;}
.account-text.account-username       {top:43.3vh;}
.account-text.account-sign-password  {top:51.4vh;}
.account-text.account-repeat-password{top:59.5vh;}

.account-line{position:absolute;left:0;width:22.48vw;height:1px;background:rgba(230,230,230,.28);}
.account-line.account-line1{top:38.9vh;}
.account-line.account-line2{top:47vh;}
.account-line.account-line3{top:55.1vh;}
.account-line.account-line4{top:63.2vh;}

/* ===== Help specific ===== */
.help-text-area{
  position:absolute;font-family:'Distill Expanded',sans-serif;color:#111;
  letter-spacing:.34vw;font-size:.47rem;white-space:nowrap;
  text-shadow:.001rem .001rem 0 #717171,-.001rem -.001rem 0 #717171;
}
.help-text-area.email   {left:0;top:35.17vh;}
.help-text-area.sendlink{left:15.77vw;top:35.17vh;opacity:.7;transition:opacity .3s ease;}
.help-text-area.sendlink:hover{opacity:1;}
.help-line{position:absolute;top:38.9vh;left:0;width:22.48vw;height:1px;background:rgba(230,230,230,.28);}

/* ========= Dynamic Stage‑based Sliding ======== */

/* LOGIN (default) – everything parked */
body.stage-login .username,
body.stage-login .password,
body.stage-login .login-line,
body.stage-login .login-line-second{transform:translateX(0);}
body.stage-login .open-text,
body.stage-login .help-text{transform:translateX(0);}

/* UTIL (OPEn / HELP visible) */
body.stage-util .username,
body.stage-util .password,
body.stage-util .login-line,
body.stage-util .login-line-second,
body.stage-account .username,
body.stage-account .password,
body.stage-account .login-line,
body.stage-account .login-line-second,
body.stage-help .username,
body.stage-help .password,
body.stage-help .login-line,
body.stage-help .login-line-second{
  transform:translateX(calc(-1 * var(--slide-dist)));
}

body.stage-util .open-text,
body.stage-util .help-text{transform:translateX(calc(-1 * var(--slide-dist)));opacity:.7 !important;}

/* ACCOUNT / HELP detail layers */
body.stage-account .open-text,
body.stage-account .help-text,
body.stage-help .open-text,
body.stage-help .help-text{
  transform:translateX(calc(-2 * var(--slide-dist)));opacity:.7 !important;
}

/* Pointer brightening in any stage */
body.stage-util .open-text:hover,
body.stage-util .help-text:hover,
body.stage-account .open-text:hover,
body.stage-account .help-text:hover,
body.stage-help .open-text:hover,
body.stage-help .help-text:hover{opacity:1 !important;}

/* Ensure wrappers fade in/out only by position */
body.stage-login .account-wrapper,
body.stage-login .help-wrapper{pointer-events:none;}


}


/* Disable clicks on util texts when parked behind layer‑two */
body.stage-login .open-text,
body.stage-login .help-text{
  pointer-events:none;
}
body.stage-util .open-text,
body.stage-util .help-text,
body.stage-account .open-text,
body.stage-account .help-text,
body.stage-help .open-text,
body.stage-help .help-text{
  pointer-events:auto;
}


.login-text,
.login-line,
.login-line-second{
  will-change: transform;
}


@media (min-width: 1900px){
  .login-text,
  .open-text,
  .help-text,
  .username,
  .password,
  .account-text,
  .help-text-area{
    font-size: 0.56rem !important;
    letter-spacing: 0.36vw !important;
  }
}


/* Ensure smooth slide for login group */
.username,
.password,
.login-line,
.login-line-second{
  transition: transform 0.7s ease-in-out, opacity 0.5s ease-in-out !important;
  will-change: transform;
}


/* ===== Two‑phase util slide: login first ===== */
body.stage-util-pre .username,
body.stage-util-pre .password,
body.stage-util-pre .login-line,
body.stage-util-pre .login-line-second{
  transform:translateX(calc(-1 * var(--slide-dist)));
}
body.stage-util-pre .open-text,
body.stage-util-pre .help-text{
  transform:translateX(0);
}


/* === Override (2025‑06‑20): Remove hover opacity change; keep OPEn / HELP at full opacity === */
body.stage-util .open-text,
body.stage-util .help-text,
body.stage-account .open-text,
body.stage-account .help-text,
body.stage-help .open-text,
body.stage-help .help-text{
  opacity: 1 !important;
}

.open-text.visible:hover,
.help-text.visible:hover,
body.stage-util .open-text:hover,
body.stage-util .help-text:hover,
body.stage-account .open-text:hover,
body.stage-account .help-text:hover,
body.stage-help .open-text:hover,
body.stage-help .help-text:hover{
  opacity: 1 !important;
}

/* === (2025-06-20) Clip OPEn / HELP text so anything beyond 36vw is hidden === */
body.stage-login .open-text,
body.stage-login .help-text,
body.stage-util-pre .open-text,
body.stage-util-pre .help-text{
  width: calc(36vw - 29vw); /* match the visible strip between 29vw and 36vw */
  overflow: hidden;
}

body.stage-util .open-text,
body.stage-util .help-text,
body.stage-account .open-text,
body.stage-account .help-text,
body.stage-help .open-text,
body.stage-help .help-text{
  width: 22.48vw;           /* restore full width once texts are slid into view */
  overflow: visible;
}

/* === (2025-06-20) Keep OPEn / HELP on one line === */
body.stage-login .open-text,
body.stage-login .help-text,
body.stage-util-pre .open-text,
body.stage-util-pre .help-text,
body.stage-util .open-text,
body.stage-util .help-text,
body.stage-account .open-text,
body.stage-account .help-text,
body.stage-help .open-text,
body.stage-help .help-text{
  white-space: nowrap;
}


/* === (2025-06-24) Keep OPEn/HELP fully masked behind layer‑two until slide completes === */
body.stage-util .open-text,
body.stage-util .help-text{
  /* Narrow width equals visible gap (29vw → 36vw) so nothing peeks past 36vw while sliding */
  width: calc(36vw - 29vw);
  overflow: hidden;
  /* Jump to full width after the 0.7s transform finishes */
  animation: utilExpandWidth 0s 0.7s forwards;
}

@keyframes utilExpandWidth{
  to{
    width: 22.48vw;
    overflow: visible;
  }
}


/* === (2025-06-24b) Dynamic width reveal for util texts === */
body.stage-util .open-text,
body.stage-util .help-text{
  /* Start in 29→36 vw gap so nothing peeks past 36vw */
  width: calc(36vw - 29vw);
  overflow: hidden;
  animation: utilRevealWidth 0.7s ease forwards;
}

body.stage-util-pre .open-text,
body.stage-util-pre .help-text{
  /* When sliding OUT we start at full width and shrink to stay hidden */
  width: 22.48vw;
  overflow: hidden;
  animation: utilRevealWidth 0.7s ease reverse forwards;
}

@keyframes utilRevealWidth{
  0%{
    width: calc(36vw - 29vw);
  }
  100%{
    width: 22.48vw;
    overflow: visible;
  }
}


/* === (2025-06-24c) Hard mask: guarantee OPEn / HELP never peek past 36vw === */
.layer-two::after{
  content:'';
  position:fixed;
  top:0;
  left:36vw;
  width:calc(100vw - 36vw);
  height:100vh;
  background:#fff;
  pointer-events:none;
  z-index:101; /* sits above util texts */
}

/* Reset util text width & remove reveal animation so they stay intact while sliding */
body.stage-util .open-text,
body.stage-util-pre .open-text,
body.stage-util .help-text,
body.stage-util-pre .help-text{
  width:22.48vw !important;
  overflow:visible !important;
  animation:none !important;
}


/* === (2025‑06‑24d) Refined narrow masks for OPEn / HELP only === */
/* Remove the full‑height curtain from 24c by overriding it */
.layer-two::after{
  all: unset;  /* wipe previous rules */
}

/* Two slim, fixed strips exactly where the util texts travel */
.layer-two::before,
.layer-two::after{
  content:'';
  position:fixed;
  left:36vw;                     /* starts exactly at the 36 vw edge */
  width:calc(100vw - 36vw);      /* cover everything to the right */
  pointer-events:none;
  background:#fff;               /* match page background */
  z-index:101;                   /* sit just above util texts */
}

/* Top strip — covers OPEn AccOUnT line (center ~35 vh) */
.layer-two::before{
  top:calc(35.17vh - 2.5vh);     /* a little above the baseline */
  height:5vh;                    /* tall enough to mask ascenders */
}

/* Bottom strip — covers HELP REQUEST line (center ~43 vh) */
.layer-two::after{
  top:calc(43.17vh - 2.5vh);
  height:5vh;
}
` } />
      <main dangerouslySetInnerHTML={ __html: `
<!-- Static lines -->
<div class="line original"></div>
<div class="line second"></div>
<div class="line third"></div>
<div class="line fourth"></div>
<div class="line fifth"></div>
<div class="line sixth"></div>
<div class="line util-line"></div>
<!-- Login -->
<span class="login-text username hidden">USERnAME</span>
<span class="login-text password hidden">PASSWORD</span>
<!-- Util texts -->
<span class="login-text open-text hidden">OPEn AccOUnT</span>
<span class="login-text help-text hidden">HELP REQUEST</span>
<!-- Login entry lines -->
<div class="line login-line hidden"></div>
<div class="line login-line-second hidden"></div>
<!-- Account creation wrapper -->
<div class="account-wrapper">
<span class="account-text account-email">E-MA1L ADDRESS</span>
<span class="account-text account-username">YOUR USERnAME</span>
<span class="account-text account-sign-password">YOUR PASSWORD</span>
<span class="account-text account-repeat-password">REDO PASSWORD</span>
<div class="account-line account-line1"></div>
<div class="account-line account-line2"></div>
<div class="account-line account-line3"></div>
<div class="account-line account-line4"></div>
</div>
<!-- Help wrapper -->
<div class="help-wrapper">
<span class="help-text-area email">YOUR EMA1L</span>
<span class="help-text-area sendlink">SEnD L1nK</span>
<div class="help-line"></div>
</div>
<!-- Masking layers -->
<div class="layer-one"></div>
<div class="layer-two"></div>
<script>
document.addEventListener('DOMContentLoaded', () => {
  /* ===== Element groups ===== */
  const loginEls    = document.querySelectorAll('.username, .password, .login-line, .login-line-second');
  const utilLine    = document.querySelector('.util-line');
  const openText    = document.querySelector('.open-text');
  const helpText    = document.querySelector('.help-text');
  const accountWrap = document.querySelector('.account-wrapper');
  const helpWrap    = document.querySelector('.help-wrapper');
  const body        = document.body;

  /* ===== Helper functions ===== */
  const fadeInEls  = (els) => els.forEach(el => { el.classList.remove('hidden'); el.classList.add('visible'); });
  const fadeOutEls = (els) => Promise.all(Array.from(els).map(el => new Promise(res => {
      if (!el.classList.contains('visible')) { res(); return; }
      const end = (e)=>{ if(e.propertyName==='opacity'){ el.removeEventListener('transitionend', end); res(); } };
      el.addEventListener('transitionend', end);
      el.classList.add('hidden'); el.classList.remove('visible');
  })));

  /* ===== Stage management ===== */
  function setStage(name){
    body.classList.remove('stage-login','stage-util','stage-account','stage-help');
    body.classList.add(name);
  }

  /* ===== Initial hover logic (unchanged) ===== */
  let phase = 0; // 0: waiting for first pointer -> lines fade. 1: waiting for login zone hover
  function inLoginZone(x,y){
      const vw=innerWidth, vh=innerHeight;
      return x>=vw*0.0641 && x<=vw*0.2886 && y>=vh*0.285 && y<=vh*0.84;
  }
  function initialPointer(e){
      const p=e.touches?e.touches[0]:e;
      const {clientX:x, clientY:y}=p;

      if(phase===0){
          document.body.classList.add('fade-in-trigger'); // lines & util fade in
          phase=1;
          return;
      }
      if(phase===1 && inLoginZone(x,y)){
          fadeInEls(loginEls);                            // login group fade in
          phase=2;
          window.removeEventListener('pointermove',initialPointer);
          window.removeEventListener('touchstart',initialPointer);
      }
  }
  window.addEventListener('pointermove', initialPointer, {passive:true});
  window.addEventListener('touchstart', initialPointer, {passive:true});

  /* ===== Sequential logic ===== */
  let step = 0;
  /* ===== Inactivity auto‑fade for login group ===== */
  const loginFadeTimeout = 20000; // 20 seconds
  let inactivityTimer;
  let loginElsHidden = false;

  function resetInactivityTimer(){
    clearTimeout(inactivityTimer);
    if(step !== 0) return; // only care in login state
    inactivityTimer = setTimeout(()=>{
      if(step === 0){
        fadeOutEls(loginEls).then(()=>{ loginElsHidden = true; });
      }
    }, loginFadeTimeout);
  }

  /* monitor generic user activity to reset timer */
  ['mousemove','mousedown','keydown','touchstart'].forEach(evt=>{
    window.addEventListener(evt, resetInactivityTimer, {passive:true});
  });

  /* hover to bring login back when hidden */
  window.addEventListener('pointermove', (ev)=>{
    if(step !== 0 || !loginElsHidden) return;
    const {clientX:x, clientY:y} = ev;
    if(inLoginZone(x,y)){
      fadeInEls(loginEls);
      loginElsHidden = false;
      resetInactivityTimer();
    }
  }, {passive:true});

  // start the timer initially
  resetInactivityTimer();
 // 0: login, 1: util, 2: account, 3: help

  
  
  utilLine.addEventListener('click', () => {
      if(step!==0) return;
      /* Phase 1: slide login items left */
      setStage('stage-util-pre');
      fadeInEls(loginEls);
      step = 1;
      /* Phase 2 after slide completes */
      setTimeout(() => {
          fadeInEls([openText, helpText]);
          body.classList.remove('stage-util-pre'); // remove pre-stage so util rules win
          setStage('stage-util');
      }, 700);
  });



  openText.addEventListener('click', () => {
      if(step!==1) return;
      accountWrap.classList.add('active');
      setStage('stage-account');
      step=2;
  });

  helpText.addEventListener('click', () => {
      if(step!==1) return;
      helpWrap.classList.add('active');
      setStage('stage-help');
      step=3;
  });

  /* ===== Back‑tap area ===== */
  document.addEventListener('click', async (e)=>{
      const {clientX:x, clientY:y}=e;
      const vw=innerWidth, vh=innerHeight;
      const backZone = x<=vw*0.0637 && y>=vh*0.285 && y<=vh*0.84;
      if(!backZone) return;

      
      if(step===1){
/* reverse util -> login */
setStage('stage-util-pre');                // start OPEn / HELP slide‑out (no fade yet)
setTimeout(() => {                         // after 0.7 s slide completes…
  fadeOutEls([openText, helpText]);        // …fade OPEn / HELP away
  body.classList.remove('stage-util-pre'); // drop pre‑stage so login rules win
  setStage('stage-login');                 // slide login texts & lines back in
  fadeInEls(loginEls);                     // ensure they’re visible
  step = 0;
}, 700);

      }else if(step===2){         /* account -> util */
          accountWrap.classList.remove('active');
          setStage('stage-util');
          step=1;
      }else if(step===3){         /* help -> util */
          helpWrap.classList.remove('active');
          setStage('stage-util');
          step=1;
      }
  });

  /* ===== Editable text logic (unchanged) ===== */
  const editableSel = '.username, .password, .account-text, .help-text-area';
  function findEditable(ev){
    let el = ev.target.closest(editableSel);
    if(!el){
      const alt = document.elementFromPoint(ev.clientX, ev.clientY);
      if(alt) el = alt.closest(editableSel);
    }
    return el;
  }

  document.addEventListener('pointerdown', (ev)=>{
    const el = findEditable(ev);
    if(!el) return;

    // skip send link
    if(/send\\s*l1nk/i.test(el.textContent) || /send\\s*link/i.test(el.textContent) ||
       el.classList.contains('send-link') || el.id === 'send-link') return;

    if(el.isContentEditable) return;
    ev.preventDefault();
    el.dataset.placeholder = el.textContent;
    el.textContent = '';
    el.setAttribute('contenteditable','true');
    el.focus({preventScroll:true});
  }, true);

  document.addEventListener('focusout', (ev)=>{
    const el = ev.target;
    if(!el || !el.matches || !el.matches(editableSel) || !el.isContentEditable) return;
    if(el.textContent.trim()===''){
      el.textContent = el.dataset.placeholder || '';
      el.removeAttribute('contenteditable');
    }
  }, true);

  /* ===== Edge‑click fullscreen toggle ===== */
  function toggleFullScreen(){
    if(!document.fullscreenElement){
      document.documentElement.requestFullscreen().catch(()=>{});
    }else{
      document.exitFullscreen().catch(()=>{});
    }
  }
  document.addEventListener('click', (ev) => {
    const x = ev.clientX, y = ev.clientY;
    if (x <= 11 || x >= innerWidth - 11 || y <= 11 || y >= innerHeight - 11) {
      toggleFullScreen();
    }
  });
});
</script>
` } />
    </>
  );
}
