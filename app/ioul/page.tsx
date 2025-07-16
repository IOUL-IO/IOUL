
"use client";

import React, { useEffect, useState, useRef } from 'react';

const IOULPage: React.FC = () => {
  // Ensure consistent tab title
  useEffect(() => {
    document.title = 'IOUL';
  }, []);

  // State for calendar & mail toggles
  const [state, setState] = useState(0); // 0 = baseline, 1 = mail, 2 = calendar
  const [showMail, setShowMail] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [showLines, setShowLines] = useState(true);

  // Handle cycling through util-line clicks
  const handleUtilLineClick = () => {
    setState(prev => (prev + 1) % 3);
  };

  useEffect(() => {
    if (state === 0) {
      setShowMail(false);
      setShowCalendar(false);
      setShowLines(true);
    } else if (state === 1) {
      setShowMail(true);
      setShowCalendar(false);
      setShowLines(true);
    } else {
      setShowMail(false);
      setShowCalendar(true);
      setShowLines(false);
    }
  }, [state]);

  // Chat hover handlers
  const chatTextRef = useRef<HTMLSpanElement>(null);

  // Menu state & handlers
  const [currentMenu, setCurrentMenu] = useState<string | null>(null);
  const openOnlineAssets = () => {/* existing logic */};
  const openLinkupCenter = () => {/* existing logic */};
  const openDeliveryLine = () => {/* existing logic */};
  const openInternalUnit = () => {/* existing logic */};
  const handleMenuClick = (menuId: string, openFn: () => void) => {
    if (currentMenu === menuId) {
      // close logic
    } else {
      if (currentMenu) {
        // close then open
        setTimeout(() => openFn(), 300);
      } else {
        openFn();
      }
      setCurrentMenu(menuId);
    }
  };

  return (
    <div className="non-fullscreen" translate="no">
      <p style={{ display: 'none' }} lang="en">
        This page is already in English. No translation is needed.
      </p>

      <div className="layer-one" />
      <div className="layer-two" />
      <div className="layer-three" />

      <div className="page-content">
        {/* Menu Items */}
        <div className="menu-items">
          <span
            className="custom-text menu-item"
            id="online-assets"
            style={{ top: '36.1vh', left: '29vw' }}
            onClick={() => handleMenuClick('online-assets', openOnlineAssets)}
          >
            OnL1nE ASSETS:
          </span>
          <span
            className="custom-text menu-item"
            id="linkup-center"
            style={{ top: '43.2vh', left: '29vw' }}
            onClick={() => handleMenuClick('linkup-center', openLinkupCenter)}
          >
            L1nKUP cEnTER:
          </span>
          <span
            className="custom-text menu-item"
            id="delivery-line"
            style={{ top: '50.3vh', left: '29vw' }}
            onClick={() => handleMenuClick('delivery-line', openDeliveryLine)}
          >
            DEL1VERY L1nE:
          </span>
          <span
            className="custom-text menu-item"
            id="internal-unit"
            style={{ top: '57.4vh', left: '29vw' }}
            onClick={() => handleMenuClick('internal-unit', openInternalUnit)}
          >
            1nTERnAL Un1T:
          </span>
        </div>

        <div className="layer-four" />

        {/* Utility line and toggles */}
        <div className="other-content">
          <div className="line util-line" onClick={handleUtilLineClick} style={{ cursor: 'pointer' }} />
          <div
            className="line mail-line"
            style={{
              position: 'absolute',
              top: '47.8vh',
              left: '36vw',
              width: '57.8vw',
              height: '1px',
              backgroundColor: 'rgba(230,230,230,0.28)',
              opacity: showMail ? 1 : 0,
              transition: 'opacity 0.3s ease',
              zIndex: 1,
            }}
          />
          {/* other lines */}
        </div>

        {/* Calendar grid */}
        <div
          className="calendar-numbers"
          style={{
            opacity: showCalendar ? 1 : 0,
            pointerEvents: showCalendar ? 'auto' : 'none',
            transition: 'opacity 0.3s ease',
          }}
        >
          {/* grid-number spans */}
        </div>
        <div
          className="calendar-dashed"
          style={{
            opacity: showLines ? 1 : 0,
            pointerEvents: showLines ? 'auto' : 'none',
            transition: 'opacity 0.3s ease',
          }}
        >
          {/* grid-dashed spans */}
        </div>

        {/* Hover area for chat-text */}
        <div
          className="hover-area"
          style={{
            position: 'absolute',
            top: '28.5vh',
            left: '6.4vw',
            width: '22.46vw',
            height: '55.5vh',
            zIndex: 2,
          }}
          onMouseEnter={() => chatTextRef.current?.style.setProperty('opacity', '1')}
          onMouseLeave={() => chatTextRef.current?.style.setProperty('opacity', '0')}
        />
        <span
          className="chat-text"
          ref={chatTextRef}
          style={{
            position: 'absolute',
            top: '50vh',
            left: '10vw',
            opacity: 0,
            transition: 'opacity 0.3s ease',
            zIndex: 3,
          }}
        >
          cHAT . . .
        </span>

        {/* Existing slide-triggers and containers unchanged */}
      </div>

      <div className="layer-five" />
      <div className="layer-six" />
    </div>
);

export default IOULPage;
