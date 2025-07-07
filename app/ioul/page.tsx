"use client";
import React, { useEffect } from 'react';

export default function Page() {
  useEffect(() => {
    const itemEls = Array.from(document.querySelectorAll<HTMLElement>('.item-text, .item-line'));
    const centerEls = Array.from(document.querySelectorAll<HTMLElement>('.center-text, .center-line'));
    const accountEls = Array.from(document.querySelectorAll<HTMLElement>('.account-text'));
    const allEls = [...itemEls, ...centerEls, ...accountEls];

    allEls.forEach(el => {
      if (!el.dataset.baseLeft) {
        el.dataset.baseLeft = el.style.left;
      }
    });

    let stage = 0;
    let directionUp = true;
    const DIST = 29;
    const DURATION = 700;

    function updatePositions() {
      allEls.forEach(el => {
        const base = parseFloat(el.dataset.baseLeft!);
        el.style.transition = `left ${DURATION}ms ease`;
        el.style.left = `${base - stage * DIST}vw`;
      });
    }

    function onClick(e: MouseEvent) {
      const vw = (e.clientX / window.innerWidth) * 100;
      if (vw >= 94 && vw <= 100) {
        if (stage === 0) { stage = 1; directionUp = true; }
        else if (stage === 1) { stage = directionUp ? 2 : 0; }
        else if (stage === 2) { stage = 1; directionUp = false; }
        updatePositions();
      } else if (vw >= 0 && vw <= 6) {
        if (stage === 0) { stage = 1; directionUp = false; }
        else if (stage === 1) { stage = directionUp ? 0 : 2; }
        else if (stage === 2) { stage = 1; directionUp = true; }
        updatePositions();
      }
    }

    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  return (
    <div className="page-content">
      <div dangerouslySetInnerHTML={ __html: `
<p style="display:none" lang="en">This page is already in English. No translation is needed.</p>

  <div class="layer-one"></div>
  <div class="layer-two"></div>
  <div class="layer-three"></div>

  <div class="page-content">
    <div class="menu-items">
      <span class="custom-text menu-item" style="top:36.1vh; left:29vw;" id="online-assets">
        OnL1nE ASSETS:
      </span>
      <span class="custom-text menu-item" style="top:43.2vh; left:29vw;" id="linkup-center">
        L1nKUP cEnTER:
      </span>
      <span class="custom-text menu-item" style="top:50.3vh; left:29vw;" id="delivery-line">
        DEL1VERY L1nE:
      </span>
      <span class="custom-text menu-item" style="top:57.4vh; left:29vw;" id="internal-unit">
        1nTERnAL Un1T:
      </span>
    </div>

    <div class="layer-four"></div>

    <div class="community-items-container" style="position: absolute; z-index: 1;">
      <span style="position: absolute; top:35.4vh; left:35.41vw; z-index:1; font-family:'Distill Expanded', sans-serif; color:#111111; letter-spacing:0.28vw; font-size:0.47rem; text-shadow:0.001rem 0.001rem 0 #717171, -0.001rem -0.001rem 0 #717171; transition: left 0.7s ease; line-height:1.6; overflow: visible;">
        cOMMUn1T1ES
      </span>
      <span style="position: absolute; top:41.6vh; left:35.41vw; z-index:1; font-family:'Distill Expanded', sans-serif; color:#111111; letter-spacing:0.28vw; font-size:0.47rem; text-shadow:0.001rem 0.001rem 0 #717171, -0.001rem -0.001rem 0 #717171; transition: left 0.7s ease; line-height:1.6; overflow: visible;">
        OUR L1BRARY
      </span>
      <span style="position: absolute; top:53vh; left:35.41vw; z-index:1; font-family:'Distill Expanded', sans-serif; color:#111111; letter-spacing:0.28vw; font-size:0.47rem; text-shadow:0.001rem 0.001rem 0 #717171, -0.001rem -0.001rem 0 #717171; transition: left 0.7s ease; line-height:1.6; overflow: visible;">
        ADD-On SHOP
      </span>
      <span style="position: absolute; top:59.2vh; left:35.41vw; z-index:1; font-family:'Distill Expanded', sans-serif; color:#111111; letter-spacing:0.28vw; font-size:0.47rem; text-shadow:0.001rem 0.001rem 0 #717171, -0.001rem -0.001rem 0 #717171; transition: left 0.7s ease; line-height:1.6; overflow: visible;">
        1OUL cEnTER
      </span>
      <div class="custom-line" style="position: absolute; top:47.8vh; left:35.41vw; width:22.48vw; height:1px; background-color:rgba(230,230,230,0.28); transition: left 0.7s ease, transform 0.7s ease; z-index:1;"></div>
    </div>

    <div class="zero-items-container" style="position: absolute; z-index: 1;">
      <span class="right-flow" style="position: absolute; top:35.4vh; left:57.4vw; z-index:1; font-family:'Distill Expanded', sans-serif; color:#111111; letter-spacing:0.28vw; font-size:0.47rem; text-shadow:0.001rem 0.001rem 0 #717171, -0.001rem -0.001rem 0 #717171; transition: left 0.7s ease; line-height:1.6; overflow: visible;">0</span>
      <span class="right-flow" style="position: absolute; top:41.6vh; left:57.4vw; z-index:1; font-family:'Distill Expanded', sans-serif; color:#111111; letter-spacing:0.28vw; font-size:0.47rem; text-shadow:0.001rem 0.001rem 0 #717171, -0.001rem -0.001rem 0 #717171; transition: left 0.7s ease; line-height:1.6; overflow: visible;">0</span>
      <span class="right-flow" style="position: absolute; top:53vh; left:57.4vw; z-index:1; font-family:'Distill Expanded', sans-serif; color:#111111; letter-spacing:0.28vw; font-size:0.47rem; text-shadow:0.001rem 0.001rem 0 #717171, -0.001rem -0.001rem 0 #717171; transition: left 0.7s ease; line-height:1.6; overflow: visible;">0</span>
      <span class="right-flow" style="position: absolute; top:59.2vh; left:57.4vw; z-index:1; font-family:'Distill Expanded', sans-serif; color:#111111; letter-spacing:0.28vw; font-size:0.47rem; text-shadow:0.001rem 0.001rem 0 #717171, -0.001rem -0.001rem 0 #717171; transition: left 0.7s ease; line-height:1.6; overflow: visible;">0</span>
    </div>

    <div class="other-content">
      <div class="line original"></div>
      <div class="line second"></div>
      <div class="line util-line"></div>
      <div class="line third"></div>
      <div class="line fourth"></div>
    <div class="line fifth"></div>
      <div class="line mail-line" style="position:absolute; top:47.8vh; left:36vw; width:57.8vw; height:1px; background-color:rgba(230,230,230,0.28); opacity:0; transition: opacity 0.3s ease; z-index:1;"></div>
    <div class="line sixth"></div>


      <div class="slide-container">
        <span class="account-text" style="position:absolute; top:35.4vh; left:-24.00vw;">AccOUnT&nbsp;nAME</span>
        <span class="account-text" style="position:absolute; top:35.4vh; left:26.00vw;">L1nK&nbsp;UP</span>
        <span class="account-text right-flow" style="position:absolute; top:35.4vh; left:33.19vw;">0</span>
        <span class="account-text" style="position:absolute; top:77vh; left:-24.00vw; color:#111111;">. . .</span>
        <div class="line account-line" style="position:absolute; top:41.6vh; left:-24.00vw; width:57.8vw; height:1px; background-color: rgba(230, 230, 230, 0.28); z-index:1;"></div>
      </div>
<!-- Item lines -->
<div class="item-line item-line-one" style="position:absolute; top:47.8vh; left:96vw; width:36vw;"></div>
<div class="item-line item-line-two" style="position:absolute; top:47.8vh; left:139vw; width:14.8vw;"></div>


    <!-- Center lines -->
    <div class="center-line center-line-one" style="position:absolute; top:47.8vh; left:106.0vw; width:36vw;"></div>
    <div class="center-line center-line-two" style="position:absolute; top:47.8vh; left:149.0vw; width:14.8vw;"></div>

    <!-- Center texts -->
    <span class="center-text" style="position:absolute; top:35.4vh; left:106.0vw;">UPDATES</span>
    <span class="center-text" style="position:absolute; top:41.6vh; left:106.0vw;">cATALOg</span>

    <span class="center-text right-flow" style="position:absolute; top:35.4vh; left:119.0vw;">0</span>
    <span class="center-text right-flow" style="position:absolute; top:41.6vh; left:119.0vw;">0</span>

    <span class="center-text" style="position:absolute; top:35.4vh; left:128.0vw;">T1cKETS</span>
    <span class="center-text" style="position:absolute; top:41.6vh; left:128.0vw;">cOnTAcT</span>

    <span class="center-text right-flow" style="position:absolute; top:35.4vh; left:141.0vw;">0</span>
    <span class="center-text right-flow" style="position:absolute; top:41.6vh; left:141.0vw;">0</span>

    <span class="center-text" style="position:absolute; top:35.4vh; left:149.0vw;">gET APP</span>
    <span class="center-text" style="position:absolute; top:41.6vh; left:149.0vw;">AP1-LOg</span>

    <span class="center-text right-flow" style="position:absolute; top:35.4vh; left:163.4vw;">0</span>
    <span class="center-text right-flow" style="position:absolute; top:41.6vh; left:163.4vw;">0</span>

    <span class="center-text" style="position:absolute; top:53vh; left:149.0vw;">LOg 0.01</span>
    <span class="center-text" style="position:absolute; top:59.2vh; left:149.0vw;">LOg 0.02</span>
    <span class="center-text" style="position:absolute; top:65.4vh; left:149.0vw;">LOg 0.03</span>
    <span class="center-text" style="position:absolute; top:71.6vh; left:149.0vw;">LOg 0.04</span>

    <span class="center-text right-flow" style="position:absolute; top:53vh; left:163.4vw;">0</span>
    <span class="center-text right-flow" style="position:absolute; top:59.2vh; left:163.4vw;">0</span>
    <span class="center-text right-flow" style="position:absolute; top:65.4vh; left:163.4vw;">0</span>
    <span class="center-text right-flow" style="position:absolute; top:71.6vh; left:163.4vw;">0</span>

    <span class="center-text" style="position:absolute; top:53vh; left:106.0vw;">LATEST</span>
    <span class="center-text" style="position:absolute; top:59.2vh; left:106.0vw;">V1RALS</span>

    <span class="center-text right-flow" style="position:absolute; top:53vh; left:119.0vw;">0</span>
    <span class="center-text right-flow" style="position:absolute; top:59.2vh; left:119.0vw;">0</span>

    <span class="center-text" style="position:absolute; top:53vh; left:128.0vw;">cAREERS</span>
    <span class="center-text" style="position:absolute; top:59.2vh; left:128.0vw;">ARcH1VE</span>

    <span class="center-text right-flow" style="position:absolute; top:53vh; left:141.0vw;">0</span>
    <span class="center-text right-flow" style="position:absolute; top:59.2vh; left:141.0vw;">0</span>


<!-- Item texts -->
<span class="item-text" style="position:absolute; top:35.4vh; left:96vw;">1ncOME</span>
<span class="item-text" style="position:absolute; top:41.6vh; left:96vw;">cL1EnT</span>

<span class="item-text right-flow" style="position:absolute; top:35.4vh; left:109vw;">0</span>
<span class="item-text right-flow" style="position:absolute; top:41.6vh; left:109vw;">0</span>

<span class="item-text" style="position:absolute; top:35.4vh; left:118vw;">T1cKETS</span>
<span class="item-text" style="position:absolute; top:41.6vh; left:118vw;">1nQU1RY</span>

<span class="item-text right-flow" style="position:absolute; top:35.4vh; left:131vw;">0</span>
<span class="item-text right-flow" style="position:absolute; top:41.6vh; left:131vw;">0</span>

<span class="item-text" style="position:absolute; top:35.4vh; left:139vw;">OnL1nE</span>
<span class="item-text" style="position:absolute; top:41.6vh; left:139vw;">JO1nED</span>

<span class="item-text right-flow" style="position:absolute; top:35.4vh; left:153.4vw;">0</span>
<span class="item-text right-flow" style="position:absolute; top:41.6vh; left:153.4vw;">0</span>

<span class="item-text" style="position:absolute; top:53vh; left:139vw;">JOBLOg</span>
<span class="item-text" style="position:absolute; top:59.2vh; left:139vw;">H1R1ngS</span>
<span class="item-text" style="position:absolute; top:65.4vh; left:139vw;">ORDERS</span>
<span class="item-text" style="position:absolute; top:71.6vh; left:139vw;">1nV1TES</span>

<span class="item-text right-flow" style="position:absolute; top:53vh; left:153.4vw;">0</span>
<span class="item-text right-flow" style="position:absolute; top:59.2vh; left:153.4vw;">0</span>
<span class="item-text right-flow" style="position:absolute; top:65.4vh; left:153.4vw;">0</span>
<span class="item-text right-flow" style="position:absolute; top:71.6vh; left:153.4vw;">0</span>

<span class="item-text" style="position:absolute; top:53vh; left:96vw;">cL1cKS</span>
<span class="item-text" style="position:absolute; top:59.2vh; left:96vw;">LEADS</span>

<span class="item-text right-flow" style="position:absolute; top:53vh; left:109vw;">0</span>
<span class="item-text right-flow" style="position:absolute; top:59.2vh; left:109vw;">0</span>

<span class="item-text" style="position:absolute; top:53vh; left:118vw;">AD cTR</span>
<span class="item-text" style="position:absolute; top:59.2vh; left:118vw;">AD cPc</span>

<span class="item-text right-flow" style="position:absolute; top:53vh; left:131vw;">0</span>
<span class="item-text right-flow" style="position:absolute; top:59.2vh; left:131vw;">0</span>


      <div class="hover-area"></div>
      <span class="chat-text" id="chatText">cHAT . . .</span>
      <span class="mail-text" style="position:absolute; top:35.4vh; left:36vw; z-index:1; font-family:'Distill Expanded',sans-serif; color:#111111; letter-spacing:0.28vw; font-size:0.47rem; text-shadow:0.001rem 0.001rem 0 #717171, -0.001rem -0.001rem 0 #717171; opacity:0; transition: opacity 0.3s ease;">TO:</span>
      <span class="mail-text" style="position:absolute; top:41.6vh; left:36vw; z-index:1; font-family:'Distill Expanded',sans-serif; color:#111111; letter-spacing:0.28vw; font-size:0.47rem; text-shadow:0.001rem 0.001rem 0 #717171, -0.001rem -0.001rem 0 #717171; opacity:0; transition: opacity 0.3s ease;">SUBJEcT:</span>
      <span class="mail-text" style="position:absolute; top:35.4vh; left:89vw; z-index:1; font-family:'Distill Expanded',sans-serif; color:#111111; letter-spacing:0.28vw; font-size:0.47rem; text-shadow:0.001rem 0.001rem 0 #717171, -0.001rem -0.001rem 0 #717171; opacity:0; transition: opacity 0.3s ease;">cc</span>
      <span class="mail-text" style="position:absolute; top:35.4vh; left:91.9vw; z-index:1; font-family:'Distill Expanded',sans-serif; color:#111111; letter-spacing:0.28vw; font-size:0.47rem; text-shadow:0.001rem 0.001rem 0 #717171, -0.001rem -0.001rem 0 #717171; opacity:0; transition: opacity 0.3s ease;">Bcc</span>
      <span class="mail-text" style="position:absolute; top:41.6vh; left:91.1vw; z-index:1; font-family:'Distill Expanded',sans-serif; color:#111111; letter-spacing:0.28vw; font-size:0.47rem; text-shadow:0.001rem 0.001rem 0 #717171, -0.001rem -0.001rem 0 #717171; opacity:0; transition: opacity 0.3s ease;">SEnD</span>


      <span class="grid-number num1">1</span>
      <span class="grid-number num2">2</span>
      <span class="grid-number num3">3</span>
      <span class="grid-number num4">4</span>
      <span class="grid-number num5">5</span>
      <span class="grid-number num6">6</span>
      <span class="grid-number num7">7</span>
      <span class="grid-number num8">8</span>
      <span class="grid-number num9">9</span>
      <span class="grid-number num10">10</span>
      <span class="grid-number num11">11</span>
      <span class="grid-number num12">12</span>
      <span class="grid-number num13">13</span>
      <span class="grid-number num14">14</span>
      <span class="grid-number num15">15</span>
      <span class="grid-number num16">16</span>

      <span class="grid-number num17">17</span>
      <span class="grid-number num18">18</span>
      <span class="grid-number num19">19</span>
      <span class="grid-number num20">20</span>
      <span class="grid-number num21">21</span>
      <span class="grid-number num22">22</span>
      <span class="grid-number num23">23</span>
      <span class="grid-number num24">24</span>
      <span class="grid-number num25">25</span>
      <span class="grid-number num26">26</span>
      <span class="grid-number num27">27</span>
      <span class="grid-number num28">28</span>
      <span class="grid-number num29">29</span>
      <span class="grid-number num30">30</span>
      <span class="grid-number num31">31</span>

      <span class="grid-dashed dashed01"></span>
      <span class="grid-dashed dashed02"></span>
      <span class="grid-dashed dashed03"></span>
      <span class="grid-dashed dashed04"></span>
      <span class="grid-dashed dashed05"></span>
      <span class="grid-dashed dashed06"></span>
      <span class="grid-dashed dashed07"></span>
      <span class="grid-dashed dashed08"></span>
      <span class="grid-dashed dashed09"></span>
      <span class="grid-dashed dashed10"></span>
      <span class="grid-dashed dashed11"></span>
      <span class="grid-dashed dashed12"></span>
      <span class="grid-dashed dashed13"></span>
      <span class="grid-dashed dashed14"></span>
      <span class="grid-dashed dashed15"></span>
      <span class="grid-dashed dashed16"></span>

      <span class="grid-dashed dashed17"></span>
      <span class="grid-dashed dashed18"></span>
      <span class="grid-dashed dashed19"></span>
      <span class="grid-dashed dashed20"></span>
      <span class="grid-dashed dashed21"></span>
      <span class="grid-dashed dashed22"></span>
      <span class="grid-dashed dashed23"></span>
      <span class="grid-dashed dashed24"></span>
      <span class="grid-dashed dashed25"></span>
      <span class="grid-dashed dashed26"></span>
      <span class="grid-dashed dashed27"></span>
      <span class="grid-dashed dashed28"></span>
      <span class="grid-dashed dashed29"></span>
      <span class="grid-dashed dashed30"></span>
      <span class="grid-dashed dashed31"></span>

      <div class="heading-container" style="top:35.4vh; left:6.41vw; transform:translateX(-49vw);" data-offset="-49" data-slide-group="heading">
        <span class="custom-text heading-flow">AccOUnT</span>
      </div>
      <div class="heading-container" style="top:41.6vh; left:6.41vw; transform:translateX(-49vw);" data-offset="-49" data-slide-group="heading">
        <span class="custom-text heading-flow">AcT1V1TY</span>
      </div>
      <div class="heading-container" style="top:53vh; left:6.41vw; transform:translateX(-49vw);" data-offset="-49" data-slide-group="heading">
        <span class="custom-text heading-flow">cHATLOg</span>
      </div>
      <div class="heading-container" style="top:59.2vh; left:6.41vw; transform:translateX(-49vw);" data-offset="-49" data-slide-group="heading">
        <span class="custom-text heading-flow">cLAnLOg</span>
      </div>

      <div class="account-container" style="top:35.4vh; left:29.11vw; transform:translateX(-49vw);" data-offset="-49" data-slide-group="account">
        <span class="custom-text right-flow" style="position:absolute; right:0;">0</span>
      </div>
      <div class="account-container" style="top:41.6vh; left:29.11vw; transform:translateX(-49vw);" data-offset="-49" data-slide-group="account">
        <span class="custom-text right-flow" style="position:absolute; right:0;">0</span>
      </div>
      <div class="account-container" style="top:53vh; left:29.11vw; transform:translateX(-49vw);" data-offset="-49" data-slide-group="account">
        <span class="custom-text right-flow" style="position:absolute; right:0;">0</span>
      </div>
      <div class="account-container" style="top:59.2vh; left:29.11vw; transform:translateX(-49vw);" data-offset="-49" data-slide-group="account">
        <span class="custom-text right-flow" style="position:absolute; right:0;">0</span>
      </div>

      <div class="custom-line" style="left: -42.59vw;"></div>

      <div class="layer-five"></div>
      <div class="layer-six"></div>
    </div>
  </div>

  <div class="slide-triggers">
    <div class="slide-trigger"></div>
    <div class="slide-trigger-reverse"></div>
  </div>

  <script>


    const pageContent = document.querySelector('.page-content');
    let pageFadedIn = false;
    function fadeInPage() {
      pageContent.style.opacity = '1';
      pageFadedIn = true;
    }
    document.addEventListener('mousemove', function onFirstMouseMove() {
      if (!pageFadedIn) { fadeInPage(); }
      document.removeEventListener('mousemove', onFirstMouseMove);
    });
    const EDGE_MARGIN = 11;
    document.addEventListener('click', (event) => {
      const { clientX: x, clientY: y } = event;
      const { innerWidth: width, innerHeight: height } = window;
      if (!document.fullscreenElement &&
          (x <= EDGE_MARGIN || x >= width - EDGE_MARGIN ||
           y <= EDGE_MARGIN || y >= height - EDGE_MARGIN)) {
        document.documentElement.requestFullscreen();
      }
    });

    let slideState = "none";
    const chatText = document.getElementById('chatText');
    chatText.style.pointerEvents = 'none';
    chatText.style.zIndex = '-1';
    let chatShownOnce = false;
    const hoverArea = document.querySelector('.hover-area');
    document.addEventListener('mousemove', (event) => {
      if (!chatShownOnce && pageFadedIn) {
        const rect = hoverArea.getBoundingClientRect();
        if (event.clientX >= rect.left && event.clientX <= rect.right &&
            event.clientY >= rect.top && event.clientY <= rect.bottom) {
          chatText.style.opacity = '1';
          chatText.style.pointerEvents = 'auto';
          chatText.style.zIndex = '10';
          chatShownOnce = true;
        }
      }
    });
    chatText.addEventListener('click', (event) => {
      event.stopPropagation();
      const chatInput = document.createElement('input');
      chatInput.type = 'text';
      chatInput.classList.add('chat-input');
      chatInput.id = 'chatText';
      chatText.replaceWith(chatInput);
      chatInput.focus();
    });

    let currentMenu = null;
    function quickRemoveSubmenu() {
      const newTexts = document.querySelectorAll('.new-text');
      newTexts.forEach(span => {
        span.style.transition = 'opacity 0.1s ease';
        span.classList.remove('visible');
      });
      setTimeout(() => {
        newTexts.forEach(span => span.remove());
        currentMenu = null;
      }, 100);
      document.getElementById("linkup-center").classList.remove("slide-down");
      document.getElementById("delivery-line").classList.remove("slide-down");
      document.getElementById("internal-unit").classList.remove("slide-down");
    }
    function closeSubmenu() {
      const newTexts = document.querySelectorAll('.new-text');
      newTexts.forEach(span => {
        span.style.transition = 'opacity 0.3s ease';
        span.classList.remove('visible');
      });
      setTimeout(() => {
        newTexts.forEach(span => span.remove());
        currentMenu = null;
      }, 300);
      document.getElementById("linkup-center").classList.remove("slide-down");
      document.getElementById("delivery-line").classList.remove("slide-down");
      document.getElementById("internal-unit").classList.remove("slide-down");
    }
    function forceCloseSubmenuThen(fn) {
      if (currentMenu !== null) {
        quickRemoveSubmenu();
        setTimeout(fn, 100);
      } else {
        fn();
      }
    }

    document.addEventListener('click', (event) => {
      if (event.target.closest('.menu-item') || event.target.closest('.chat-text')) return;
      const vwUnit = window.innerWidth / 100;
      const vhUnit = window.innerHeight / 100;
      const leftMin = 0;
      const leftMax = 6.37 * vwUnit;
      const yMin = 28.5 * vhUnit;
      const yMax = 84 * vhUnit;
      if (event.clientX >= leftMin && event.clientX <= leftMax &&
          event.clientY >= yMin && event.clientY <= yMax) {
        event.stopPropagation();
        forceCloseSubmenuThen(() => {
          if (slideState === "community") {
            document.querySelectorAll('.menu-items .menu-item').forEach(el => {
              if (!el.dataset.originalLeft) { el.dataset.originalLeft = el.style.left; }
              el.style.transition = "left 0.7s ease";
              let currentLeft = parseFloat(el.style.left);
              el.style.left = (currentLeft + 29) + "vw";
            });
            document.querySelectorAll('.community-items-container *:not(.custom-line)').forEach(el => {
              if (!el.dataset.originalLeft) { el.dataset.originalLeft = el.style.left; }
              el.style.transition = "left 0.7s ease";
              let currentLeft = parseFloat(el.style.left);
              el.style.left = (currentLeft + 29) + "vw";
            });
            document.querySelectorAll('.community-items-container .custom-line').forEach(el => {
              if (el.dataset.originalLeft) {
                el.style.transition = "left 0.7s ease";
                el.style.left = el.dataset.originalLeft;
              }
            });
            document.querySelectorAll('.zero-items-container *').forEach(el => {
              if (!el.dataset.originalLeft) { el.dataset.originalLeft = el.style.left; }
              el.style.transition = "left 0.7s ease";
              let currentLeft = parseFloat(el.style.left);
              el.style.left = (currentLeft + 29) + "vw";
            });
            slideState = "menu";
            return;
          } else if (slideState === "menu") {
            document.querySelectorAll('.menu-items .menu-item').forEach(el => {
              el.style.transition = "transform 0.7s ease";
              el.style.transform = "translateX(0)";
            });
            document.querySelector('.menu-items').classList.remove('raised');
            const chatTextEl = document.getElementById('chatText');
            if (chatTextEl) {
              setTimeout(() => {
    if (slideState !== "none") return;
    chatTextEl.style.transition = "opacity 0.7s ease";
                chatTextEl.style.opacity = "1";
              }, 700);
            }
            slideState = "none";
          } else if (slideState === "heading" || slideState === "account") {
            document.querySelectorAll('.heading-container[data-slide-group="heading"]').forEach(box => {
              box.style.transform = \
      ` } />
    </div>
  );
}
