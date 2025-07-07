
    "use client";
    import React, { useEffect } from 'react';

    export default function Page() {
      useEffect(() => {
        // TODO: any JS init from legacy project can be ported here
      }, []);
      return (
        <div dangerouslySetInnerHTML={ { __html: `<p style="display:none" lang="en">This page is already in English. No translation is needed.</p>

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
              box.style.transform = \`translateX(\${box.dataset.offset}vw)\`;
            });
            document.querySelectorAll('.account-container[data-slide-group="account"]').forEach(box => {
              box.style.transform = \`translateX(\${box.dataset.offset}vw)\`;
            });
            document.querySelectorAll('.other-content > .custom-text:not(.menu-item)').forEach(el => {
              if (el.dataset.originalLeft) { el.style.left = el.dataset.originalLeft; }
            });
            document.querySelectorAll('.other-content > .custom-line').forEach(el => {
              if (el.dataset.originalLeft) {
                el.style.transition = "left 0.7s ease";
                el.style.left = el.dataset.originalLeft;
              }
            });
            const chatTextEl = document.getElementById('chatText');
            if (chatTextEl) {
              setTimeout(() => {
    if (slideState !== "none") return;
    chatTextEl.style.transition = "opacity 0.7s ease";
                chatTextEl.style.opacity = "1";
              }, 700);
            }
            slideState = "none";
          } else if (slideState === "none") {
            const chatTextEl = document.getElementById('chatText');
            if (chatTextEl) {
              chatTextEl.style.transition = "opacity 0.1s ease";
              chatTextEl.style.opacity = "0";
              setTimeout(() => {
                document.querySelectorAll('.other-content > .custom-text:not(.menu-item)').forEach(el => {
                  if (!el.dataset.originalLeft) { el.dataset.originalLeft = el.style.left; }
                  let original = parseFloat(el.dataset.originalLeft);
                  el.style.transition = "left 0.7s ease";
                  el.style.left = (original + 49) + "vw";
                });
                document.querySelectorAll('.other-content > .custom-line').forEach(el => {
                  if (!el.dataset.originalLeft) { el.dataset.originalLeft = el.style.left; }
                  let originalLine = parseFloat(el.dataset.originalLeft);
                  el.style.transition = "left 0.7s ease";
                  el.style.left = (originalLine + 49) + "vw";
                });
                document.querySelectorAll('.heading-container[data-slide-group="heading"]').forEach(box => {
                  box.style.transform = "translateX(0)";
                });
                document.querySelectorAll('.account-container[data-slide-group="account"]').forEach(box => {
                  box.style.transform = "translateX(0)";
                });
              }, 110);
            }
            slideState = "heading";
          }
        });
      }
    }, true);

    document.addEventListener('click', (event) => {
      if (event.target.closest('.menu-item') || event.target.closest('.chat-text') || event.target.closest('.chat-input')) return;
      const vwUnit = window.innerWidth / 100;
      const vhUnit = window.innerHeight / 100;
      const leftMin = 28.86 * vwUnit;
      const leftMax = 32.43 * vwUnit;
      const yMin = 28.5 * vhUnit;
      const yMax = 84 * vhUnit;
      if (event.clientX >= leftMin && event.clientX <= leftMax &&
          event.clientY >= yMin && event.clientY <= yMax) {
        event.stopPropagation();
        forceCloseSubmenuThen(() => {
          if (slideState === "menu") {
            document.querySelectorAll('.menu-items .menu-item').forEach(el => {
              if (!el.dataset.originalLeft) { el.dataset.originalLeft = el.style.left; }
              el.style.transition = "left 0.7s ease";
              let currentLeft = parseFloat(el.style.left);
              el.style.left = (currentLeft - 29) + "vw";
            });
            document.querySelectorAll('.community-items-container *').forEach(el => {
              if (!el.dataset.originalLeft) { el.dataset.originalLeft = el.style.left; }
              el.style.transition = "left 0.7s ease";
              let currentLeft = parseFloat(el.style.left);
              el.style.left = (currentLeft - 29) + "vw";
            });
            document.querySelectorAll('.zero-items-container *').forEach(el => {
              if (!el.dataset.originalLeft) { el.dataset.originalLeft = el.style.left; }
              el.style.transition = "left 0.7s ease";
              let currentLeft = parseFloat(el.style.left);
              el.style.left = (currentLeft - 29) + "vw";
            });
            slideState = "community";
          } else if (slideState === "heading" || slideState === "account") {
            document.querySelectorAll('.heading-container[data-slide-group="heading"]').forEach(box => {
              box.style.transform = \`translateX(\${box.dataset.offset}vw)\`;
            });
            document.querySelectorAll('.account-container[data-slide-group="account"]').forEach(box => {
              box.style.transform = \`translateX(\${box.dataset.offset}vw)\`;
            });
            document.querySelectorAll('.other-content > .custom-text:not(.menu-item)').forEach(el => {
              if (el.dataset.originalLeft) { el.style.left = el.dataset.originalLeft; }
            });
            document.querySelectorAll('.other-content > .custom-line').forEach(el => {
              if (el.dataset.originalLeft) {
                el.style.transition = "left 0.7s ease";
                el.style.left = el.dataset.originalLeft;
              }
            });
            const chatTextEl = document.getElementById('chatText');
            if (chatTextEl) {
              setTimeout(() => {
    if (slideState !== "none") return;
    chatTextEl.style.transition = "opacity 0.7s ease";
                chatTextEl.style.opacity = "1";
              }, 700);
            }
            slideState = "none";
          } else if (slideState === "none") {
            const chatTextEl = document.getElementById('chatText');
            if (chatTextEl) {
              chatTextEl.style.transition = "opacity 0.1s ease";
              chatTextEl.style.opacity = "0";
              setTimeout(() => {
                document.querySelectorAll('.menu-items .menu-item').forEach(el => {
                  if (!el.dataset.originalLeft) { el.dataset.originalLeft = el.style.left; }
                  el.style.transition = "transform 0.7s ease";
                  el.style.transform = "translateX(-22.59vw)";
                });
                setTimeout(() => {
                  document.querySelector('.menu-items').classList.add('raised');
                }, 700);
              }, 110);
            }
            slideState = "menu";
          }
        });
      }
    }, true);

    // Calendar scroll behavior
    let isScrolling = false;
    let scrollTimeout;
    let isFirstScroll = true;
    let isSecondScroll = false;

    const numbers1to16 = document.querySelectorAll('.grid-number.num1, .grid-number.num2, .grid-number.num3, .grid-number.num4, .grid-number.num5, .grid-number.num6, .grid-number.num7, .grid-number.num8, .grid-number.num9, .grid-number.num10, .grid-number.num11, .grid-number.num12, .grid-number.num13, .grid-number.num14, .grid-number.num15, .grid-number.num16');
    const numbers17to31 = document.querySelectorAll('.grid-number.num17, .grid-number.num18, .grid-number.num19, .grid-number.num20, .grid-number.num21, .grid-number.num22, .grid-number.num23, .grid-number.num24, .grid-number.num25, .grid-number.num26, .grid-number.num27, .grid-number.num28, .grid-number.num29, .grid-number.num30, .grid-number.num31');
    const dashed1to16 = document.querySelectorAll('.grid-dashed.dashed01, .grid-dashed.dashed02, .grid-dashed.dashed03, .grid-dashed.dashed04, .grid-dashed.dashed05, .grid-dashed.dashed06, .grid-dashed.dashed07, .grid-dashed.dashed08, .grid-dashed.dashed09, .grid-dashed.dashed10, .grid-dashed.dashed11, .grid-dashed.dashed12, .grid-dashed.dashed13, .grid-dashed.dashed14, .grid-dashed.dashed15, .grid-dashed.dashed16');
    const dashed17to31 = document.querySelectorAll('.grid-dashed.dashed17, .grid-dashed.dashed18, .grid-dashed.dashed19, .grid-dashed.dashed20, .grid-dashed.dashed21, .grid-dashed.dashed22, .grid-dashed.dashed23, .grid-dashed.dashed24, .grid-dashed.dashed25, .grid-dashed.dashed26, .grid-dashed.dashed27, .grid-dashed.dashed28, .grid-dashed.dashed29, .grid-dashed.dashed30, .grid-dashed.dashed31');

    // Create a scroll area div
    const scrollArea = document.createElement('div');
    scrollArea.style.position = 'absolute';
    scrollArea.style.top = '28.5vh';
    scrollArea.style.left = '36vw';
    scrollArea.style.width = '58vw';
    scrollArea.style.height = '55.5vh';
    scrollArea.style.zIndex = '5';
    scrollArea.style.pointerEvents = 'auto';
    scrollArea.style.cursor = 'default';
    document.querySelector('.other-content').appendChild(scrollArea);
    // Mail-text fade-in on hover
    let mailShownOnce = false;
    scrollArea.addEventListener('mousemove', () => {
      if (!mailShownOnce) {
        document.querySelectorAll('.mail-text, .mail-line').forEach(el => el.style.opacity = '1');
        mailShownOnce = true;
      }
    });

    scrollArea.addEventListener('wheel', (e) => {
      e.preventDefault();

      if (isScrolling) return;
      isScrolling = true;

      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        isScrolling = false;
      }, 700);

      // Create a wrapper for all elements to move as one unit
      const allElements = [...numbers1to16, ...numbers17to31, ...dashed1to16, ...dashed17to31];

      // Set transition timing for all elements at once
      requestAnimationFrame(() => {
        allElements.forEach(el => {
          el.style.transition = 'transform 0.7s ease';
        });

        // Apply transform in the next frame to ensure all transitions start together
        requestAnimationFrame(() => {
          if (e.deltaY > 0) { // Scrolling down
            if (!isSecondScroll) {
              // First scroll down - move everything up
              allElements.forEach(el => {
                el.style.transform = 'translateY(-55.5vh)';
              });
              isSecondScroll = true;
            } else {
              // Second scroll down - move everything up again
              allElements.forEach(el => {
                el.style.transform = 'translateY(-111vh)';
              });
              isSecondScroll = false;
            }
          } else { // Scrolling up
            const currentTransform = allElements[0]?.style.transform || '';
            const currentY = currentTransform.includes('translate') ? 
              currentTransform.match(/translateY\(([^)]+)\)/)?.[1] || '0' : '0';

            if (currentY === '-111vh') {
              // If we're at the bottom (29-31), scroll up to middle (17-28)
              allElements.forEach(el => {
                el.style.transform = 'translateY(-55.5vh)';
              });
              isSecondScroll = true;
            } else if (currentY === '-55.5vh') {
              // If we're in the middle (17-28), scroll up to top (1-16)
              allElements.forEach(el => {
                el.style.transform = 'translateY(0)';
              });
              isSecondScroll = false;
            }
          }
        });
      });

      isFirstScroll = false;
    }, { passive: false });

    function slideDownSiblings(clickedId) {
      let menuItems = Array.from(document.querySelectorAll('.menu-items .menu-item'));
      let clickedIndex = menuItems.findIndex(el => el.id === clickedId);
      for (let i = clickedIndex + 1; i < menuItems.length; i++) {
        menuItems[i].classList.remove("menu-slide", "slide-down");
        menuItems[i].style.transform = "";
        menuItems[i].style.transition = "";
        void menuItems[i].offsetHeight;
        menuItems[i].classList.add("menu-slide");
      }
      requestAnimationFrame(() => {
        for (let i = clickedIndex + 1; i < menuItems.length; i++) {
          menuItems[i].classList.add("slide-down");
        }
      });
    }
    function addNewText(text, topVH, leftVW) {
      // Prevent submenu fade-in if menu is not visible
      if (slideState !== "menu") { return; }
      const span = document.createElement("span");
      span.className = "custom-text new-text";
      span.style.top = topVH + "vh";
      span.style.left = leftVW + "vw";
      span.textContent = text;
      document.querySelector(".other-content").appendChild(span);
      setTimeout(() => {
        span.classList.add("visible");
      }, 10);
    }
    function openOnlineAssets()   { slideDownSiblings("online-assets"); setTimeout(()=>{ addNewText("- cMS",40.1,6.4); addNewText("- LMS",44.1,6.4); },700); }
    function openLinkupCenter()   { slideDownSiblings("linkup-center"); setTimeout(()=>{ addNewText("- cOM",47.2,6.4); addNewText("- JOB",51.2,6.4); addNewText("- HR",55.2,6.4); },700); }
    function openDeliveryLine()   { slideDownSiblings("delivery-line"); setTimeout(()=>{ addNewText("- cRM",54.3,6.4); addNewText("- OPS",58.3,6.4); },700); }
    function openInternalUnit()   { slideDownSiblings("internal-unit"); setTimeout(()=>{ addNewText("- 1nV",61.4,6.4); addNewText("- FMS",65.4,6.4); addNewText("- 1T",69.4,6.4); },700); }

    document.getElementById("online-assets").addEventListener("click", e => { e.stopPropagation(); if(currentMenu==="online-assets")closeSubmenu(); else{ if(currentMenu){ closeSubmenu(); setTimeout(()=>{openOnlineAssets(); currentMenu="online-assets";},300);} else{ openOnlineAssets(); currentMenu="online-assets"; } } });
    document.getElementById("linkup-center").addEventListener("click", e => { e.stopPropagation(); if(currentMenu==="linkup-center")closeSubmenu(); else{ if(currentMenu){ closeSubmenu(); setTimeout(()=>{openLinkupCenter(); currentMenu="linkup-center";},300);} else{ openLinkupCenter(); currentMenu="linkup-center"; } } });
    document.getElementById("delivery-line").addEventListener("click", e => { e.stopPropagation(); if(currentMenu==="delivery-line")closeSubmenu(); else{ if(currentMenu){ closeSubmenu(); setTimeout(()=>{openDeliveryLine(); currentMenu="delivery-line";},300);} else{ openDeliveryLine(); currentMenu="delivery-line"; } } });
    document.getElementById("internal-unit").addEventListener("click", e => { e.stopPropagation(); if(currentMenu==="internal-unit")closeSubmenu(); else{ if(currentMenu){ closeSubmenu(); setTimeout(()=>{openInternalUnit(); currentMenu="internal-unit";},300);} else{ openInternalUnit(); currentMenu="internal-unit"; } } });
  </script>


<script>
document.addEventListener('DOMContentLoaded', () => {
  const utilLines = document.querySelectorAll('.util-line');
  const mailEls = document.querySelectorAll('.mail-text, .mail-line');
  const calendarEls = document.querySelectorAll('.grid-number, .grid-dashed');
  const specialLines = document.querySelectorAll('.line.fifth, .line.sixth');

  // Initial visibility: hide mail & calendar, show lines 5 & 6
  mailEls.forEach(el => el.classList.add('hidden'));
  calendarEls.forEach(el => el.classList.add('hidden'));
  specialLines.forEach(el => el.classList.remove('hidden'));

  let state = 0; // 0 = baseline (lines visible, others hidden)

  const updateView = () => {
  if (state === 0) { // baseline
    mailEls.forEach(el => { el.classList.add('hidden'); el.style.opacity = '0'; });
    calendarEls.forEach(el => el.classList.add('hidden'));
    specialLines.forEach(el => el.classList.remove('hidden'));
  } else if (state === 1) { // show mail on first toggle
    mailEls.forEach(el => { el.classList.remove('hidden'); el.style.opacity = '1'; });
    calendarEls.forEach(el => { el.classList.add('hidden'); });
    specialLines.forEach(el => el.classList.remove('hidden'));
  } else if (state === 2) { // show calendar, hide lines 5&6
    mailEls.forEach(el => { el.classList.add('hidden'); el.style.opacity = '0'; });
    calendarEls.forEach(el => el.classList.remove('hidden'));
    specialLines.forEach(el => el.classList.add('hidden'));
  }
};

  utilLines.forEach(line => {
    line.addEventListener('click', () => {
      state = (state + 1) % 3; // cycle 0 → 1 → 2 → 0 ...
      updateView();
    });
  });
});
</script>


<script>
document.addEventListener('DOMContentLoaded', () => {
  const HIDE_MIN   =  6.37, HIDE_MAX   = 28.86;
  const TOP_MIN    = 28.5,  TOP_MAX    = 84;
  const CLICK_MIN  = 32.43, CLICK_MAX  = 36;
  const REVERSE_MIN= 94,    REVERSE_MAX=100;
  const DISTANCE   = 60,    DURATION   = 700;

  const pxToVw = px => px/(window.innerWidth  /100);
  const pxToVh = px => px/(window.innerHeight /100);

  const targets = [
    ...document.querySelectorAll('.account-text'),
    document.querySelector('.account-line')
  ].filter(Boolean);

  targets.forEach(el => {
    if (!el.dataset.baseLeftVw) {
      const leftPx = parseFloat(getComputedStyle(el).left) || 0;
      el.dataset.baseLeftVw = pxToVw(leftPx);
    }
  });

  function updateVisibility() {
    targets.forEach(el => {
      const r = el.getBoundingClientRect();
      const l = pxToVw(r.left), t = pxToVh(r.top);
      const hide = l >= HIDE_MIN && l < HIDE_MAX && t >= TOP_MIN && t <= TOP_MAX;
      el.style.opacity       = hide ? '0' : '';
      el.style.pointerEvents = hide ? 'none' : '';
    });
  }
  updateVisibility();
  window.addEventListener('resize', updateVisibility);

  let sliding = false;

  function slideOnce() {
    if (sliding || targets[0].dataset.slid==='true') return;
    sliding = true;

    targets.forEach(el => {
      el.style.opacity       = '';
      el.style.pointerEvents = '';
    });

    targets.forEach(el => {
      const base = parseFloat(el.dataset.baseLeftVw);
      el.style.transition = \`left \${DURATION}ms ease\`;
      el.style.left       = (base + DISTANCE) + 'vw';
      el.dataset.slid     = 'true';
    });

    setTimeout(() => {
      updateVisibility();
      sliding = false;
    }, DURATION);
  }

  function slideBack() {
    if (sliding || targets[0].dataset.slid!=='true') return;
    sliding = true;
    targets.forEach(el => {
      const base = parseFloat(el.dataset.baseLeftVw);
      el.style.transition = \`left \${DURATION}ms ease\`;
      el.style.left       = base + 'vw';
      delete el.dataset.slid;
    });
    setTimeout(() => {
      updateVisibility();
      sliding = false;
    }, DURATION);
  }

  document.addEventListener('click', e => {
    const vw = pxToVw(e.clientX), vh = pxToVh(e.clientY);
    if (vw>=CLICK_MIN && vw<=CLICK_MAX) {
      slideOnce();
    } else if (vw>=REVERSE_MIN && vw<=REVERSE_MAX
            && vh>=TOP_MIN     && vh<=TOP_MAX) {
      slideBack();
    }
  });

  document.querySelectorAll('.slide-trigger, .slide-triggers, .slide-container')
    .forEach(el => el.addEventListener('click', e => {
      e.stopPropagation();
      slideOnce();
    }));
  document.querySelectorAll('.slide-trigger-reverse')
    .forEach(el => el.addEventListener('click', e => {
      e.stopPropagation();
      slideBack();
    }));
});
</script>


<script>
/* --- Updated staggered gap logic injected by ChatGPT on 2025‑06‑02 --- */
document.addEventListener('DOMContentLoaded', () => {
  const FWD_MIN = 94,  FWD_MAX = 100;   // forward trigger (right edge)
  const REV_MIN = 32.43, REV_MAX = 36;  // reverse trigger (left edge)
  const TOP_MIN = 28.5, TOP_MAX = 84;   // vertical bounds
  const DIST    = 60;
const GAP = 10;                   // horizontal shift in vw
  const DUR     = 600;                  // transition duration in ms
  const STAGGER = 0;                  // delay between outgoing and incoming groups in ms

  // Helper unit conversions
  const vw = () => window.innerWidth / 100;
  const vh = () => window.innerHeight / 100;
  const toVw = px => px / vw();
  const toVh = px => px / vh();

  // Groups
  const itemEls   = [...document.querySelectorAll('.item-text'),  ...document.querySelectorAll('.item-line')];
  const centerEls = [...document.querySelectorAll('.center-text'),...document.querySelectorAll('.center-line')];

  // Cache base positions
  [...itemEls, ...centerEls].forEach(el => {
    if (!el.dataset.baseLeftVw) {
      const leftPx = parseFloat(getComputedStyle(el).left) || 0;
      el.dataset.baseLeftVw = toVw(leftPx);
    }
  });

  // Stage flags
  let itemStage   = 0;  // 0 = hidden, 1 = visible (left column), 2 = shifted left / clipped
  let centerStage = 0;  // 0 = hidden, 1 = visible (center column)
  let animating   = false;

  // External dependency: account slide logic (unchanged)
  const getAccountSlid = () => {
    const acc = document.querySelector('.account-text');
    return acc && acc.dataset.slid === 'true';
  };

  // Reusable animator
  function move(els, offset) {
    els.forEach(el => {
      const base = parseFloat(el.dataset.baseLeftVw);
      el.style.transition = \`left \${DUR}ms ease\`;
      el.style.left       = (base + offset) + 'vw';
    });
  }

  /* ---------------- Forward (→) transitions ---------------- */
  function toStage1() { // show items
    animating = true;
    move(itemEls, -DIST);
    setTimeout(() => { animating = false; itemStage = 1; }, DUR);
  }

  function toStage2() {
    animating = true;
    move(itemEls, -2 * DIST - GAP);
    move(centerEls, -DIST - GAP);
    setTimeout(() => {
      animating   = false;
      itemStage   = 2;
      centerStage = 1;
    }, DUR + STAGGER);
  }

  /* ---------------- Reverse (←) transitions ---------------- */
  function backToStage1() { // hide center, restore items with stagger
    animating = true;
    move(centerEls, 0);                              // center leaves first
    move(itemEls, -DIST); // items return after delay
    setTimeout(() => { animating=false; itemStage=1; centerStage=0; }, DUR + STAGGER);
  }

  function backToStage0() { // hide items
    animating = true;
    move(itemEls, 0);
    setTimeout(() => { animating=false; itemStage=0; }, DUR);
  }

  /* ---------------- Click handling ---------------- */
  document.addEventListener('click', e => {
    if (animating) return;

    const xVw = toVw(e.clientX);
    const yVh = toVh(e.clientY);
    const inFwd = xVw >= FWD_MIN && xVw <= FWD_MAX && yVh >= TOP_MIN && yVh <= TOP_MAX;
    const inRev = xVw >= REV_MIN && xVw <= REV_MAX && yVh >= TOP_MIN && yVh <= TOP_MAX;

    if (inFwd) {
      if (getAccountSlid()) return;             // hand off to account logic
      if (itemStage === 0) {
        toStage1(); e.stopPropagation();
      } else if (itemStage === 1 && centerStage === 0) {
        toStage2(); e.stopPropagation();
      }
    } else if (inRev) {
      if (centerStage === 1) {
        backToStage1(); e.stopPropagation();
      } else if (itemStage === 1 && centerStage === 0) {
        backToStage0(); e.stopPropagation();
      }
    }
  }, true);
});
</script>


<script>
/* ---- Item clipping script injected by ChatGPT on 2025‑05‑29 (v3) ---- */
document.addEventListener('DOMContentLoaded', () => {
  const HIDE_LEFT_VW = 28.86; // Updated threshold
  const TOP_MIN_VH   = 28.5;  // Vertical bounds
  const TOP_MAX_VH   = 84;

  const items = [
    ...document.querySelectorAll('.item-text'),
    ...document.querySelectorAll('.item-line')
  ];

  const toVw = px => px / (window.innerWidth  / 100);
  const toVh = px => px / (window.innerHeight / 100);

  function update() {
    items.forEach(el => {
      const rect = el.getBoundingClientRect();
      const l = toVw(rect.left);
      const t = toVh(rect.top);
      const hide = l < HIDE_LEFT_VW && t >= TOP_MIN_VH && t <= TOP_MAX_VH;
      el.style.opacity       = hide ? '0' : '';
      el.style.pointerEvents = hide ? 'none' : '';
    });
  }

  function loop() {
    update();
    requestAnimationFrame(loop);
  }
  loop();

  window.addEventListener('resize', update);
});
</script>

` } } />
      );
    }
