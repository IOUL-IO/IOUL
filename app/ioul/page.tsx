"use client";
import React, { useEffect } from 'react';
import './styles.css';

export default function Page() {
  useEffect(() => {
    // Legacy sliding logic
    const runSliding = () => {
      const FWD_MIN = 94, FWD_MAX = 100;
      const REV_MIN = 32.43, REV_MAX = 36;
      const TOP_MIN = 28.5, TOP_MAX = 84;
      const DIST = 60, GAP = 10, DUR = 600;

      const vw = () => window.innerWidth / 100;
      const vh = () => window.innerHeight / 100;
      const toVw = px => px / vw();

      const itemEls = Array.from(document.querySelectorAll('.item-text, .item-line'));
      const centerEls = Array.from(document.querySelectorAll('.center-text, .center-line'));

      [...itemEls, ...centerEls].forEach(el => {
        if (!el.dataset.baseLeftVw) {
          const leftPx = parseFloat(getComputedStyle(el).left) || 0;
          el.dataset.baseLeftVw = toVw(leftPx);
        }
      });

      let itemStage = 0, centerStage = 0, animating = false;
      function move(els, offset) {
        els.forEach(el => {
          const base = parseFloat(el.dataset.baseLeftVw);
          el.style.transition = `left ${DUR}ms ease`;
          el.style.left = (base + offset) + 'vw';
        });
      }
      function toStage1() { animating = true; move(itemEls, -DIST); setTimeout(() => { animating = false; itemStage = 1; }, DUR); }
      function toStage2() { animating = true; move(itemEls, -2 * DIST - GAP); move(centerEls, -DIST - GAP); setTimeout(() => { animating = false; itemStage = 2; centerStage = 1; }, DUR); }
      function backToStage1() { animating = true; move(centerEls, 0); move(itemEls, -DIST); setTimeout(() => { animating = false; itemStage = 1; centerStage = 0; }, DUR); }
      function backToStage0() { animating = true; move(itemEls, 0); setTimeout(() => { animating = false; itemStage = 0; }, DUR); }

      document.addEventListener('click', e => {
        if (animating) return;
        const xVw = toVw(e.clientX), yVh = e.clientY / vh();
        const inFwd = xVw >= FWD_MIN && xVw <= FWD_MAX && yVh >= TOP_MIN && yVh <= TOP_MAX;
        const inRev = xVw >= REV_MIN && xVw <= REV_MAX && yVh >= TOP_MIN && yVh <= TOP_MAX;
        if (inFwd) {
          if (itemStage === 0) toStage1();
          else if (itemStage === 1 && centerStage === 0) toStage2();
          else if (itemStage === 2) backToStage1();
          else if (itemStage === 1) backToStage0();
          e.stopPropagation();
        } else if (inRev) {
          if (centerStage === 1) backToStage1();
          else if (itemStage === 1 && centerStage === 0) backToStage0();
          e.stopPropagation();
        }
      }, true);
    };
    runSliding();
  }, []);

  return (
    <div>
      <p lang="en" style='{ display: "none" }'>This page is already in English. No translation is needed.</p>
      
      
      <div className="layer-one"></div>
      
      
      <div className="layer-two"></div>
      
      
      <div className="layer-three"></div>
      
      
      <div className="page-content">
      <div className="menu-items">
      <span className="custom-text menu-item" id="online-assets" style='{ top: "36.1vh", left: "29vw" }'>
              OnL1nE ASSETS:
            </span>
      <span className="custom-text menu-item" id="linkup-center" style='{ top: "43.2vh", left: "29vw" }'>
              L1nKUP cEnTER:
            </span>
      <span className="custom-text menu-item" id="delivery-line" style='{ top: "50.3vh", left: "29vw" }'>
              DEL1VERY L1nE:
            </span>
      <span className="custom-text menu-item" id="internal-unit" style='{ top: "57.4vh", left: "29vw" }'>
              1nTERnAL Un1T:
            </span>
      </div>
      <div className="layer-four"></div>
      <div className="community-items-container" style='{ position: "absolute", zIndex: "1" }'>
      <span style="{ position: &quot;absolute&quot;, top: &quot;35.4vh&quot;, left: &quot;35.41vw&quot;, zIndex: &quot;1&quot;, fontFamily: &quot;'Distill Expanded', sans-serif&quot;, color: &quot;#111111&quot;, letterSpacing: &quot;0.28vw&quot;, fontSize: &quot;0.47rem&quot;, textShadow: &quot;0.001rem 0.001rem 0 #717171, -0.001rem -0.001rem 0 #717171&quot;, transition: &quot;left 0.7s ease&quot;, lineHeight: &quot;1.6&quot;, overflow: &quot;visible&quot; }">
              cOMMUn1T1ES
            </span>
      <span style="{ position: &quot;absolute&quot;, top: &quot;41.6vh&quot;, left: &quot;35.41vw&quot;, zIndex: &quot;1&quot;, fontFamily: &quot;'Distill Expanded', sans-serif&quot;, color: &quot;#111111&quot;, letterSpacing: &quot;0.28vw&quot;, fontSize: &quot;0.47rem&quot;, textShadow: &quot;0.001rem 0.001rem 0 #717171, -0.001rem -0.001rem 0 #717171&quot;, transition: &quot;left 0.7s ease&quot;, lineHeight: &quot;1.6&quot;, overflow: &quot;visible&quot; }">
              OUR L1BRARY
            </span>
      <span style="{ position: &quot;absolute&quot;, top: &quot;53vh&quot;, left: &quot;35.41vw&quot;, zIndex: &quot;1&quot;, fontFamily: &quot;'Distill Expanded', sans-serif&quot;, color: &quot;#111111&quot;, letterSpacing: &quot;0.28vw&quot;, fontSize: &quot;0.47rem&quot;, textShadow: &quot;0.001rem 0.001rem 0 #717171, -0.001rem -0.001rem 0 #717171&quot;, transition: &quot;left 0.7s ease&quot;, lineHeight: &quot;1.6&quot;, overflow: &quot;visible&quot; }">
              ADD-On SHOP
            </span>
      <span style="{ position: &quot;absolute&quot;, top: &quot;59.2vh&quot;, left: &quot;35.41vw&quot;, zIndex: &quot;1&quot;, fontFamily: &quot;'Distill Expanded', sans-serif&quot;, color: &quot;#111111&quot;, letterSpacing: &quot;0.28vw&quot;, fontSize: &quot;0.47rem&quot;, textShadow: &quot;0.001rem 0.001rem 0 #717171, -0.001rem -0.001rem 0 #717171&quot;, transition: &quot;left 0.7s ease&quot;, lineHeight: &quot;1.6&quot;, overflow: &quot;visible&quot; }">
              1OUL cEnTER
            </span>
      <div className="custom-line" style='{ position: "absolute", top: "47.8vh", left: "35.41vw", width: "22.48vw", height: "1px", backgroundColor: "rgba(230,230,230,0.28)", transition: "left 0.7s ease, transform 0.7s ease", zIndex: "1" }'></div>
      </div>
      <div className="zero-items-container" style='{ position: "absolute", zIndex: "1" }'>
      <span className="right-flow" style="{ position: &quot;absolute&quot;, top: &quot;35.4vh&quot;, left: &quot;57.4vw&quot;, zIndex: &quot;1&quot;, fontFamily: &quot;'Distill Expanded', sans-serif&quot;, color: &quot;#111111&quot;, letterSpacing: &quot;0.28vw&quot;, fontSize: &quot;0.47rem&quot;, textShadow: &quot;0.001rem 0.001rem 0 #717171, -0.001rem -0.001rem 0 #717171&quot;, transition: &quot;left 0.7s ease&quot;, lineHeight: &quot;1.6&quot;, overflow: &quot;visible&quot; }">0</span>
      <span className="right-flow" style="{ position: &quot;absolute&quot;, top: &quot;41.6vh&quot;, left: &quot;57.4vw&quot;, zIndex: &quot;1&quot;, fontFamily: &quot;'Distill Expanded', sans-serif&quot;, color: &quot;#111111&quot;, letterSpacing: &quot;0.28vw&quot;, fontSize: &quot;0.47rem&quot;, textShadow: &quot;0.001rem 0.001rem 0 #717171, -0.001rem -0.001rem 0 #717171&quot;, transition: &quot;left 0.7s ease&quot;, lineHeight: &quot;1.6&quot;, overflow: &quot;visible&quot; }">0</span>
      <span className="right-flow" style="{ position: &quot;absolute&quot;, top: &quot;53vh&quot;, left: &quot;57.4vw&quot;, zIndex: &quot;1&quot;, fontFamily: &quot;'Distill Expanded', sans-serif&quot;, color: &quot;#111111&quot;, letterSpacing: &quot;0.28vw&quot;, fontSize: &quot;0.47rem&quot;, textShadow: &quot;0.001rem 0.001rem 0 #717171, -0.001rem -0.001rem 0 #717171&quot;, transition: &quot;left 0.7s ease&quot;, lineHeight: &quot;1.6&quot;, overflow: &quot;visible&quot; }">0</span>
      <span className="right-flow" style="{ position: &quot;absolute&quot;, top: &quot;59.2vh&quot;, left: &quot;57.4vw&quot;, zIndex: &quot;1&quot;, fontFamily: &quot;'Distill Expanded', sans-serif&quot;, color: &quot;#111111&quot;, letterSpacing: &quot;0.28vw&quot;, fontSize: &quot;0.47rem&quot;, textShadow: &quot;0.001rem 0.001rem 0 #717171, -0.001rem -0.001rem 0 #717171&quot;, transition: &quot;left 0.7s ease&quot;, lineHeight: &quot;1.6&quot;, overflow: &quot;visible&quot; }">0</span>
      </div>
      <div className="other-content">
      <div className="line original"></div>
      <div className="line second"></div>
      <div className="line util-line"></div>
      <div className="line third"></div>
      <div className="line fourth"></div>
      <div className="line fifth"></div>
      <div className="line mail-line" style='{ position: "absolute", top: "47.8vh", left: "36vw", width: "57.8vw", height: "1px", backgroundColor: "rgba(230,230,230,0.28)", opacity: "0", transition: "opacity 0.3s ease", zIndex: "1" }'></div>
      <div className="line sixth"></div>
      <div className="slide-container">
      <span className="account-text" style='{ position: "absolute", top: "35.4vh", left: "-24.00vw" }'>AccOUnT nAME</span>
      <span className="account-text" style='{ position: "absolute", top: "35.4vh", left: "26.00vw" }'>L1nK UP</span>
      <span className="account-text right-flow" style='{ position: "absolute", top: "35.4vh", left: "33.19vw" }'>0</span>
      <span className="account-text" style='{ position: "absolute", top: "77vh", left: "-24.00vw", color: "#111111" }'>. . .</span>
      <div className="line account-line" style='{ position: "absolute", top: "41.6vh", left: "-24.00vw", width: "57.8vw", height: "1px", backgroundColor: "rgba(230, 230, 230, 0.28)", zIndex: "1" }'></div>
      </div>
      <!-- Item lines -->
      <div className="item-line item-line-one" style='{ position: "absolute", top: "47.8vh", left: "96vw", width: "36vw" }'></div>
      <div className="item-line item-line-two" style='{ position: "absolute", top: "47.8vh", left: "139vw", width: "14.8vw" }'></div>
      <!-- Center lines -->
      <div className="center-line center-line-one" style='{ position: "absolute", top: "47.8vh", left: "106.0vw", width: "36vw" }'></div>
      <div className="center-line center-line-two" style='{ position: "absolute", top: "47.8vh", left: "149.0vw", width: "14.8vw" }'></div>
      <!-- Center texts -->
      <span className="center-text" style='{ position: "absolute", top: "35.4vh", left: "106.0vw" }'>UPDATES</span>
      <span className="center-text" style='{ position: "absolute", top: "41.6vh", left: "106.0vw" }'>cATALOg</span>
      <span className="center-text right-flow" style='{ position: "absolute", top: "35.4vh", left: "119.0vw" }'>0</span>
      <span className="center-text right-flow" style='{ position: "absolute", top: "41.6vh", left: "119.0vw" }'>0</span>
      <span className="center-text" style='{ position: "absolute", top: "35.4vh", left: "128.0vw" }'>T1cKETS</span>
      <span className="center-text" style='{ position: "absolute", top: "41.6vh", left: "128.0vw" }'>cOnTAcT</span>
      <span className="center-text right-flow" style='{ position: "absolute", top: "35.4vh", left: "141.0vw" }'>0</span>
      <span className="center-text right-flow" style='{ position: "absolute", top: "41.6vh", left: "141.0vw" }'>0</span>
      <span className="center-text" style='{ position: "absolute", top: "35.4vh", left: "149.0vw" }'>gET APP</span>
      <span className="center-text" style='{ position: "absolute", top: "41.6vh", left: "149.0vw" }'>AP1-LOg</span>
      <span className="center-text right-flow" style='{ position: "absolute", top: "35.4vh", left: "163.4vw" }'>0</span>
      <span className="center-text right-flow" style='{ position: "absolute", top: "41.6vh", left: "163.4vw" }'>0</span>
      <span className="center-text" style='{ position: "absolute", top: "53vh", left: "149.0vw" }'>LOg 0.01</span>
      <span className="center-text" style='{ position: "absolute", top: "59.2vh", left: "149.0vw" }'>LOg 0.02</span>
      <span className="center-text" style='{ position: "absolute", top: "65.4vh", left: "149.0vw" }'>LOg 0.03</span>
      <span className="center-text" style='{ position: "absolute", top: "71.6vh", left: "149.0vw" }'>LOg 0.04</span>
      <span className="center-text right-flow" style='{ position: "absolute", top: "53vh", left: "163.4vw" }'>0</span>
      <span className="center-text right-flow" style='{ position: "absolute", top: "59.2vh", left: "163.4vw" }'>0</span>
      <span className="center-text right-flow" style='{ position: "absolute", top: "65.4vh", left: "163.4vw" }'>0</span>
      <span className="center-text right-flow" style='{ position: "absolute", top: "71.6vh", left: "163.4vw" }'>0</span>
      <span className="center-text" style='{ position: "absolute", top: "53vh", left: "106.0vw" }'>LATEST</span>
      <span className="center-text" style='{ position: "absolute", top: "59.2vh", left: "106.0vw" }'>V1RALS</span>
      <span className="center-text right-flow" style='{ position: "absolute", top: "53vh", left: "119.0vw" }'>0</span>
      <span className="center-text right-flow" style='{ position: "absolute", top: "59.2vh", left: "119.0vw" }'>0</span>
      <span className="center-text" style='{ position: "absolute", top: "53vh", left: "128.0vw" }'>cAREERS</span>
      <span className="center-text" style='{ position: "absolute", top: "59.2vh", left: "128.0vw" }'>ARcH1VE</span>
      <span className="center-text right-flow" style='{ position: "absolute", top: "53vh", left: "141.0vw" }'>0</span>
      <span className="center-text right-flow" style='{ position: "absolute", top: "59.2vh", left: "141.0vw" }'>0</span>
      <!-- Item texts -->
      <span className="item-text" style='{ position: "absolute", top: "35.4vh", left: "96vw" }'>1ncOME</span>
      <span className="item-text" style='{ position: "absolute", top: "41.6vh", left: "96vw" }'>cL1EnT</span>
      <span className="item-text right-flow" style='{ position: "absolute", top: "35.4vh", left: "109vw" }'>0</span>
      <span className="item-text right-flow" style='{ position: "absolute", top: "41.6vh", left: "109vw" }'>0</span>
      <span className="item-text" style='{ position: "absolute", top: "35.4vh", left: "118vw" }'>T1cKETS</span>
      <span className="item-text" style='{ position: "absolute", top: "41.6vh", left: "118vw" }'>1nQU1RY</span>
      <span className="item-text right-flow" style='{ position: "absolute", top: "35.4vh", left: "131vw" }'>0</span>
      <span className="item-text right-flow" style='{ position: "absolute", top: "41.6vh", left: "131vw" }'>0</span>
      <span className="item-text" style='{ position: "absolute", top: "35.4vh", left: "139vw" }'>OnL1nE</span>
      <span className="item-text" style='{ position: "absolute", top: "41.6vh", left: "139vw" }'>JO1nED</span>
      <span className="item-text right-flow" style='{ position: "absolute", top: "35.4vh", left: "153.4vw" }'>0</span>
      <span className="item-text right-flow" style='{ position: "absolute", top: "41.6vh", left: "153.4vw" }'>0</span>
      <span className="item-text" style='{ position: "absolute", top: "53vh", left: "139vw" }'>JOBLOg</span>
      <span className="item-text" style='{ position: "absolute", top: "59.2vh", left: "139vw" }'>H1R1ngS</span>
      <span className="item-text" style='{ position: "absolute", top: "65.4vh", left: "139vw" }'>ORDERS</span>
      <span className="item-text" style='{ position: "absolute", top: "71.6vh", left: "139vw" }'>1nV1TES</span>
      <span className="item-text right-flow" style='{ position: "absolute", top: "53vh", left: "153.4vw" }'>0</span>
      <span className="item-text right-flow" style='{ position: "absolute", top: "59.2vh", left: "153.4vw" }'>0</span>
      <span className="item-text right-flow" style='{ position: "absolute", top: "65.4vh", left: "153.4vw" }'>0</span>
      <span className="item-text right-flow" style='{ position: "absolute", top: "71.6vh", left: "153.4vw" }'>0</span>
      <span className="item-text" style='{ position: "absolute", top: "53vh", left: "96vw" }'>cL1cKS</span>
      <span className="item-text" style='{ position: "absolute", top: "59.2vh", left: "96vw" }'>LEADS</span>
      <span className="item-text right-flow" style='{ position: "absolute", top: "53vh", left: "109vw" }'>0</span>
      <span className="item-text right-flow" style='{ position: "absolute", top: "59.2vh", left: "109vw" }'>0</span>
      <span className="item-text" style='{ position: "absolute", top: "53vh", left: "118vw" }'>AD cTR</span>
      <span className="item-text" style='{ position: "absolute", top: "59.2vh", left: "118vw" }'>AD cPc</span>
      <span className="item-text right-flow" style='{ position: "absolute", top: "53vh", left: "131vw" }'>0</span>
      <span className="item-text right-flow" style='{ position: "absolute", top: "59.2vh", left: "131vw" }'>0</span>
      <div className="hover-area"></div>
      <span className="chat-text" id="chatText">cHAT . . .</span>
      <span className="mail-text" style="{ position: &quot;absolute&quot;, top: &quot;35.4vh&quot;, left: &quot;36vw&quot;, zIndex: &quot;1&quot;, fontFamily: &quot;'Distill Expanded',sans-serif&quot;, color: &quot;#111111&quot;, letterSpacing: &quot;0.28vw&quot;, fontSize: &quot;0.47rem&quot;, textShadow: &quot;0.001rem 0.001rem 0 #717171, -0.001rem -0.001rem 0 #717171&quot;, opacity: &quot;0&quot;, transition: &quot;opacity 0.3s ease&quot; }">TO:</span>
      <span className="mail-text" style="{ position: &quot;absolute&quot;, top: &quot;41.6vh&quot;, left: &quot;36vw&quot;, zIndex: &quot;1&quot;, fontFamily: &quot;'Distill Expanded',sans-serif&quot;, color: &quot;#111111&quot;, letterSpacing: &quot;0.28vw&quot;, fontSize: &quot;0.47rem&quot;, textShadow: &quot;0.001rem 0.001rem 0 #717171, -0.001rem -0.001rem 0 #717171&quot;, opacity: &quot;0&quot;, transition: &quot;opacity 0.3s ease&quot; }">SUBJEcT:</span>
      <span className="mail-text" style="{ position: &quot;absolute&quot;, top: &quot;35.4vh&quot;, left: &quot;89vw&quot;, zIndex: &quot;1&quot;, fontFamily: &quot;'Distill Expanded',sans-serif&quot;, color: &quot;#111111&quot;, letterSpacing: &quot;0.28vw&quot;, fontSize: &quot;0.47rem&quot;, textShadow: &quot;0.001rem 0.001rem 0 #717171, -0.001rem -0.001rem 0 #717171&quot;, opacity: &quot;0&quot;, transition: &quot;opacity 0.3s ease&quot; }">cc</span>
      <span className="mail-text" style="{ position: &quot;absolute&quot;, top: &quot;35.4vh&quot;, left: &quot;91.9vw&quot;, zIndex: &quot;1&quot;, fontFamily: &quot;'Distill Expanded',sans-serif&quot;, color: &quot;#111111&quot;, letterSpacing: &quot;0.28vw&quot;, fontSize: &quot;0.47rem&quot;, textShadow: &quot;0.001rem 0.001rem 0 #717171, -0.001rem -0.001rem 0 #717171&quot;, opacity: &quot;0&quot;, transition: &quot;opacity 0.3s ease&quot; }">Bcc</span>
      <span className="mail-text" style="{ position: &quot;absolute&quot;, top: &quot;41.6vh&quot;, left: &quot;91.1vw&quot;, zIndex: &quot;1&quot;, fontFamily: &quot;'Distill Expanded',sans-serif&quot;, color: &quot;#111111&quot;, letterSpacing: &quot;0.28vw&quot;, fontSize: &quot;0.47rem&quot;, textShadow: &quot;0.001rem 0.001rem 0 #717171, -0.001rem -0.001rem 0 #717171&quot;, opacity: &quot;0&quot;, transition: &quot;opacity 0.3s ease&quot; }">SEnD</span>
      <span className="grid-number num1">1</span>
      <span className="grid-number num2">2</span>
      <span className="grid-number num3">3</span>
      <span className="grid-number num4">4</span>
      <span className="grid-number num5">5</span>
      <span className="grid-number num6">6</span>
      <span className="grid-number num7">7</span>
      <span className="grid-number num8">8</span>
      <span className="grid-number num9">9</span>
      <span className="grid-number num10">10</span>
      <span className="grid-number num11">11</span>
      <span className="grid-number num12">12</span>
      <span className="grid-number num13">13</span>
      <span className="grid-number num14">14</span>
      <span className="grid-number num15">15</span>
      <span className="grid-number num16">16</span>
      <span className="grid-number num17">17</span>
      <span className="grid-number num18">18</span>
      <span className="grid-number num19">19</span>
      <span className="grid-number num20">20</span>
      <span className="grid-number num21">21</span>
      <span className="grid-number num22">22</span>
      <span className="grid-number num23">23</span>
      <span className="grid-number num24">24</span>
      <span className="grid-number num25">25</span>
      <span className="grid-number num26">26</span>
      <span className="grid-number num27">27</span>
      <span className="grid-number num28">28</span>
      <span className="grid-number num29">29</span>
      <span className="grid-number num30">30</span>
      <span className="grid-number num31">31</span>
      <span className="grid-dashed dashed01"></span>
      <span className="grid-dashed dashed02"></span>
      <span className="grid-dashed dashed03"></span>
      <span className="grid-dashed dashed04"></span>
      <span className="grid-dashed dashed05"></span>
      <span className="grid-dashed dashed06"></span>
      <span className="grid-dashed dashed07"></span>
      <span className="grid-dashed dashed08"></span>
      <span className="grid-dashed dashed09"></span>
      <span className="grid-dashed dashed10"></span>
      <span className="grid-dashed dashed11"></span>
      <span className="grid-dashed dashed12"></span>
      <span className="grid-dashed dashed13"></span>
      <span className="grid-dashed dashed14"></span>
      <span className="grid-dashed dashed15"></span>
      <span className="grid-dashed dashed16"></span>
      <span className="grid-dashed dashed17"></span>
      <span className="grid-dashed dashed18"></span>
      <span className="grid-dashed dashed19"></span>
      <span className="grid-dashed dashed20"></span>
      <span className="grid-dashed dashed21"></span>
      <span className="grid-dashed dashed22"></span>
      <span className="grid-dashed dashed23"></span>
      <span className="grid-dashed dashed24"></span>
      <span className="grid-dashed dashed25"></span>
      <span className="grid-dashed dashed26"></span>
      <span className="grid-dashed dashed27"></span>
      <span className="grid-dashed dashed28"></span>
      <span className="grid-dashed dashed29"></span>
      <span className="grid-dashed dashed30"></span>
      <span className="grid-dashed dashed31"></span>
      <div className="heading-container" data-offset="-49" data-slide-group="heading" style='{ top: "35.4vh", left: "6.41vw", transform: "translateX(-49vw)" }'>
      <span className="custom-text heading-flow">AccOUnT</span>
      </div>
      <div className="heading-container" data-offset="-49" data-slide-group="heading" style='{ top: "41.6vh", left: "6.41vw", transform: "translateX(-49vw)" }'>
      <span className="custom-text heading-flow">AcT1V1TY</span>
      </div>
      <div className="heading-container" data-offset="-49" data-slide-group="heading" style='{ top: "53vh", left: "6.41vw", transform: "translateX(-49vw)" }'>
      <span className="custom-text heading-flow">cHATLOg</span>
      </div>
      <div className="heading-container" data-offset="-49" data-slide-group="heading" style='{ top: "59.2vh", left: "6.41vw", transform: "translateX(-49vw)" }'>
      <span className="custom-text heading-flow">cLAnLOg</span>
      </div>
      <div className="account-container" data-offset="-49" data-slide-group="account" style='{ top: "35.4vh", left: "29.11vw", transform: "translateX(-49vw)" }'>
      <span className="custom-text right-flow" style='{ position: "absolute", right: "0" }'>0</span>
      </div>
      <div className="account-container" data-offset="-49" data-slide-group="account" style='{ top: "41.6vh", left: "29.11vw", transform: "translateX(-49vw)" }'>
      <span className="custom-text right-flow" style='{ position: "absolute", right: "0" }'>0</span>
      </div>
      <div className="account-container" data-offset="-49" data-slide-group="account" style='{ top: "53vh", left: "29.11vw", transform: "translateX(-49vw)" }'>
      <span className="custom-text right-flow" style='{ position: "absolute", right: "0" }'>0</span>
      </div>
      <div className="account-container" data-offset="-49" data-slide-group="account" style='{ top: "59.2vh", left: "29.11vw", transform: "translateX(-49vw)" }'>
      <span className="custom-text right-flow" style='{ position: "absolute", right: "0" }'>0</span>
      </div>
      <div className="custom-line" style='{ left: "-42.59vw" }'></div>
      <div className="layer-five"></div>
      <div className="layer-six"></div>
      </div>
      </div>
      
      
      <div className="slide-triggers">
      <div className="slide-trigger"></div>
      <div className="slide-trigger-reverse"></div>
      </div>
      
      
      
      
      
      
      
      
      
      
      
      
    </div>
  );
}
