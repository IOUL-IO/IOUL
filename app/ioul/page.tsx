"use client";
import React, { useState } from "react";
import "./styles.css"; // ensure this file is alongside

// element interfaces
interface Elem {
  top: string;
  left: number;
  className: string;
  text: string;
}
interface LineElem {
  top: string;
  left: number;
  width: number;
  className: string;
}

// DATA ARRAYS
const itemTexts: Elem[] = [
  { top: '35.4vh', left: 96.0, className: 'item-text', text: '1ncOME' },
  { top: '41.6vh', left: 96.0, className: 'item-text', text: 'cL1EnT' },
  { top: '35.4vh', left: 109.0, className: 'item-text right-flow', text: '0' },
  { top: '41.6vh', left: 109.0, className: 'item-text right-flow', text: '0' },
  { top: '35.4vh', left: 118.0, className: 'item-text', text: 'T1cKETS' },
  { top: '41.6vh', left: 118.0, className: 'item-text', text: '1nQU1RY' },
  { top: '35.4vh', left: 131.0, className: 'item-text right-flow', text: '0' },
  { top: '41.6vh', left: 131.0, className: 'item-text right-flow', text: '0' },
  { top: '35.4vh', left: 139.0, className: 'item-text', text: 'OnL1nE' },
  { top: '41.6vh', left: 139.0, className: 'item-text', text: 'JO1nED' },
  { top: '35.4vh', left: 153.4, className: 'item-text right-flow', text: '0' },
  { top: '41.6vh', left: 153.4, className: 'item-text right-flow', text: '0' },
  { top: '53vh',  left: 139.0, className: 'item-text', text: 'JOBLOg' },
  { top: '59.2vh', left: 139.0, className: 'item-text', text: 'H1R1ngS' },
  { top: '65.4vh', left: 139.0, className: 'item-text', text: 'ORDERS' },
  { top: '71.6vh', left: 139.0, className: 'item-text', text: '1nV1TES' },
  { top: '53vh',  left: 153.4, className: 'item-text right-flow', text: '0' },
  { top: '59.2vh', left: 153.4, className: 'item-text right-flow', text: '0' },
  { top: '65.4vh', left: 153.4, className: 'item-text right-flow', text: '0' },
  { top: '71.6vh', left: 153.4, className: 'item-text right-flow', text: '0' },
  { top: '53vh',  left: 96.0, className: 'item-text', text: 'cL1cKS' },
  { top: '59.2vh', left: 96.0, className: 'item-text', text: 'LEADS' },
  { top: '53vh',  left: 109.0, className: 'item-text right-flow', text: '0' },
  { top: '59.2vh', left: 109.0, className: 'item-text right-flow', text: '0' },
  { top: '53vh',  left: 118.0, className: 'item-text', text: 'AD cTR' },
  { top: '59.2vh', left: 118.0, className: 'item-text', text: 'AD cPc' },
  { top: '53vh',  left: 131.0, className: 'item-text right-flow', text: '0' },
  { top: '59.2vh', left: 131.0, className: 'item-text right-flow', text: '0' },
];

const centerTexts: Elem[] = [
  { top: '35.4vh', left: 106.0, className: 'center-text', text: 'UPDATES' },
  { top: '41.6vh', left: 106.0, className: 'center-text', text: 'cATALOg' },
  { top: '35.4vh', left: 119.0, className: 'center-text right-flow', text: '0' },
  { top: '41.6vh', left: 119.0, className: 'center-text right-flow', text: '0' },
  { top: '35.4vh', left: 128.0, className: 'center-text', text: 'T1cKETS' },
  { top: '41.6vh', left: 128.0, className: 'center-text', text: 'cOnTAcT' },
  { top: '35.4vh', left: 141.0, className: 'center-text right-flow', text: '0' },
  { top: '41.6vh', left: 141.0, className: 'center-text right-flow', text: '0' },
  { top: '35.4vh', left: 149.0, className: 'center-text', text: 'gET APP' },
  { top: '41.6vh', left: 149.0, className: 'center-text', text: 'AP1-LOg' },
  { top: '35.4vh', left: 163.4, className: 'center-text right-flow', text: '0' },
  { top: '41.6vh', left: 163.4, className: 'center-text right-flow', text: '0' },
  { top: '53vh',   left: 149.0, className: 'center-text', text: 'LOg 0.01' },
  { top: '59.2vh', left: 149.0, className: 'center-text', text: 'LOg 0.02' },
  { top: '65.4vh', left: 149.0, className: 'center-text', text: 'LOg 0.03' },
  { top: '71.6vh', left: 149.0, className: 'center-text', text: 'LOg 0.04' },
  { top: '53vh',   left: 163.4, className: 'center-text right-flow', text: '0' },
  { top: '59.2vh', left: 163.4, className: 'center-text right-flow', text: '0' },
  { top: '65.4vh', left: 163.4, className: 'center-text right-flow', text: '0' },
  { top: '71.6vh', left: 163.4, className: 'center-text right-flow', text: '0' },
  { top: '53vh',   left: 106.0, className: 'center-text', text: 'LATEST' },
  { top: '59.2vh', left: 106.0, className: 'center-text', text: 'V1RALS' },
  { top: '53vh',   left: 119.0, className: 'center-text right-flow', text: '0' },
  { top: '59.2vh', left: 119.0, className: 'center-text right-flow', text: '0' },
  { top: '53vh',   left: 128.0, className: 'center-text', text: 'cAREERS' },
  { top: '59.2vh', left: 128.0, className: 'center-text', text: 'ARcH1VE' },
  { top: '53vh',   left: 141.0, className: 'center-text right-flow', text: '0' },
  { top: '59.2vh', left: 141.0, className: 'center-text right-flow', text: '0' },
];

const accountTexts: Elem[] = [
  { top: '35.4vh', left: -24.0, className: 'account-text', text: 'AccOUnT nAME' },
  { top: '35.4vh', left:  26.0, className: 'account-text', text: 'L1nK UP' },
  { top: '35.4vh', left:  33.19, className: 'account-text right-flow', text: '0' },
  { top: '77vh',   left: -24.0, className: 'account-text', text: '. . .' },
];

const itemLines: LineElem[] = [
  { top: '47.8vh', left: 96.0, className: 'item-line item-line-one', width: 36.0 },
  { top: '47.8vh', left: 139.0, className: 'item-line item-line-two', width: 14.8 },
];
const centerLines: LineElem[] = [
  { top: '47.8vh', left: 106.0, className: 'center-line center-line-one', width: 36.0 },
  { top: '47.8vh', left: 149.0, className: 'center-line center-line-two', width: 14.8 },
];

// COMPONENT
export default function IOULPage() {
  const [stage, setStage] = useState(0);
  const handleClick = () => setStage((s) => (s + 1) % 4);
  const offsetVW = (group: 'item' | 'center' | 'account') => {
    if (stage === 0) return 0;
    if (stage === 1 || stage === 3) {
      if (group === 'item' || group === 'account') return -60;
      return 0;
    }
    // stage === 2
    if (group === 'item' || group === 'account') return -120;
    return -60;
  };

  return (
    <div
      className="ioul-container"
      style={{ position: "relative", width: "100vw", height: "100vh", overflow: "hidden" }}
      onClick={handleClick}
    >
      {/* Item Texts */}
      {itemTexts.map((e, i) => (
        <span
          key={i}
          className={e.className}
          style={{
            position: "absolute",
            top: e.top,
            left: \`\${e.left + offsetVW("item")}vw\`,
            transition: "left 0.7s ease",
            lineHeight: 1.6,
            overflow: "visible",
          }}
        >
          {e.text}
        </span>
      ))}
      {/* Center Texts */}
      {centerTexts.map((e, i) => (
        <span
          key={i}
          className={e.className}
          style={{
            position: "absolute",
            top: e.top,
            left: \`\${e.left + offsetVW("center")}vw\`,
            transition: "left 0.7s ease",
            lineHeight: 1.6,
            overflow: "visible",
          }}
        >
          {e.text}
        </span>
      ))}
      {/* Account Texts */}
      {accountTexts.map((e, i) => (
        <span
          key={i}
          className={e.className}
          style={{
            position: "absolute",
            top: e.top,
            left: \`\${e.left + offsetVW("account")}vw\`,
            transition: "left 0.7s ease",
            lineHeight: 1.6,
            overflow: "visible",
          }}
        >
          {e.text}
        </span>
      ))}
      {/* Item Lines */}
      {itemLines.map((e, i) => (
        <div
          key={i}
          className={e.className}
          style={{
            position: "absolute",
            top: e.top,
            left: \`\${e.left + offsetVW("item")}vw\`,
            width: \`\${e.width}vw\`,
            height: "0.2vh",
            background: "currentColor",
            transition: "left 0.7s ease",
            zIndex: 1,
          }}
        />
      ))}
      {/* Center Lines */}
      {centerLines.map((e, i) => (
        <div
          key={i}
          className={e.className}
          style={{
            position: "absolute",
            top: e.top,
            left: \`\${e.left + offsetVW("center")}vw\`,
            width: \`\${e.width}vw\`,
            height: "0.2vh",
            background: "currentColor",
            transition: "left 0.7s ease",
            zIndex: 1,
          }}
        />
      ))}
      {/* Additional Elements */}
      <div className="hover-area" />
      <span id="chatText" className="chat-text">cHAT . . .</span>
    </div>
  );
}
