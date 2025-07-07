
    "use client";
    import React, { useEffect } from 'react';

    export default function Page() {
      
    useEffect(() => {
      const HIDE_MIN = 6.37, HIDE_MAX = 28.86;
      const TOP_MIN = 28.5, TOP_MAX = 84;
      const CLICK_MIN = 32.43, CLICK_MAX = 36;
      const REVERSE_MIN = 94, REVERSE_MAX = 100;
      const DURATION = 700;

      const pxToVw = px => px / (window.innerWidth / 100);
      const pxToVh = px => px / (window.innerHeight / 100);

      const selectors = '.item-text, .item-line, .center-text, .center-line, .account-text, .account-line';
      const targets = Array.from(document.querySelectorAll(selectors)).filter(Boolean);

      targets.forEach(el => {
        const leftPx = parseFloat(getComputedStyle(el).left) || 0;
        el.dataset.baseLeftVw = pxToVw(leftPx);
      });

      function updateVisibility() {
        targets.forEach(el => {
          const l = parseFloat(el.style.left) || parseFloat(el.dataset.baseLeftVw) || 0;
          const t = pxToVh(parseFloat(getComputedStyle(el).top) || 0);
          const hide = l >= HIDE_MIN && l < HIDE_MAX && t >= TOP_MIN && t <= TOP_MAX;
          el.style.opacity = hide ? '0' : '';
          el.style.pointerEvents = hide ? 'none' : '';
        });
      }

      let sliding = false;

      function slideOnce() {
        if (sliding || targets[0].dataset.slid === 'true') return;
        sliding = true;
        targets.forEach(el => {
          const base = parseFloat(el.dataset.baseLeftVw);
          const offset = el.classList.contains('right-flow') ? base + 14 : base - 14;
          el.style.transition = `left ${DURATION}ms ease`;
          el.style.left = offset + 'vw';
          el.dataset.slid = 'true';
        });
        setTimeout(() => { updateVisibility(); sliding = false; }, DURATION);
      }

      function slideBack() {
        if (sliding || targets[0].dataset.slid !== 'true') return;
        sliding = true;
        targets.forEach(el => {
          const base = parseFloat(el.dataset.baseLeftVw);
          el.style.transition = `left ${DURATION}ms ease`;
          el.style.left = base + 'vw';
          delete el.dataset.slid;
        });
        setTimeout(() => { updateVisibility(); sliding = false; }, DURATION);
      }

      updateVisibility();
      window.addEventListener('resize', updateVisibility);
      document.querySelectorAll('.slide-trigger').forEach(el => el.addEventListener('click', e => { e.stopPropagation(); slideOnce(); }));
      document.querySelectorAll('.slide-trigger-reverse').forEach(el => el.addEventListener('click', e => { e.stopPropagation(); slideBack(); }));
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

  













` } } />
      );
    }
