"use client";

import React, { useEffect, useState, useRef } from 'react';

const IOULPage: React.FC = () => {
  // === State hooks for toggles and sliding logic ===
  const [showMail, setShowMail] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [chatVisible, setChatVisible] = useState(false);
  const [accountVisible, setAccountVisible] = useState(false);
  const [menuStage, setMenuStage] = useState(0); // 0: none, 1: items, 2: community, etc.
  const [accountStage, setAccountStage] = useState(0); // stages for account-texts
  const [itemStage, setItemStage] = useState(0); // stages for item-texts
  const [centerStage, setCenterStage] = useState(0); // stages for center-texts

  // === Refs for DOM elements ===
  const hoverAreaRef = useRef<HTMLDivElement>(null);
  const chatTextRef = useRef<HTMLSpanElement>(null);

  // === Helpers ===
  const updateVisibility = () => {
    // ... your existing visibility logic for layers 4-6 ...
  };

  // === 1) Resize listener & visibility update ===
  useEffect(() => {
    window.addEventListener('resize', updateVisibility);
    updateVisibility();
    return () => {
      window.removeEventListener('resize', updateVisibility);
    };
  }, []);

  // === 2) Lock the document title ===
  useEffect(() => {
    document.title = "IOUL";
  }, []);

  // === 3) Fade-in chat-text on hover ===
  useEffect(() => {
    const hoverEl = hoverAreaRef.current;
    const chatEl = chatTextRef.current;
    if (!hoverEl || !chatEl) return;
    const onEnter = () => {
      chatEl.style.transition = 'opacity 0.3s ease';
      chatEl.style.opacity = '1';
    };
    hoverEl.addEventListener('mouseenter', onEnter);
    return () => {
      hoverEl.removeEventListener('mouseenter', onEnter);
    };
  }, []);

  // === 4) Util-line three-state toggle ===
  const handleUtilLineClick = () => {
    if (!showMail && !showCalendar) {
      setShowMail(true);
    } else if (showMail && !showCalendar) {
      setShowMail(false);
      setShowCalendar(true);
    } else {
      setShowCalendar(false);
    }
  };

  // === 5) Edge-zone click handlers for chat/account/menu ===
  const handleEdgeClick = (xPerc: number) => {
    // xPerc: click position in vw percentage (0-100)
    if (chatVisible && xPerc <= 6.37) {
      // hide chat, show account
      setChatVisible(false);
      setAccountVisible(true);
    } else if (accountVisible && xPerc >= 28.86 && xPerc <= 32.43) {
      // hide account, show chat
      setAccountVisible(false);
      setChatVisible(true);
    } else if (!chatVisible && !accountVisible && xPerc >= 28.86 && xPerc <= 32.43) {
      // show menu items
      setMenuStage(1);
    } else if (menuStage === 1 && xPerc <= 6.37) {
      setMenuStage(0);
      setChatVisible(true);
    } else if (menuStage === 1 && xPerc >= 28.86 && xPerc <= 32.43) {
      setMenuStage(2);
    } else if (menuStage === 2 && xPerc <= 6.37) {
      setMenuStage(1);
    }
    // ... expand for accountStage, itemStage, centerStage similarly ...
  };

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const vw = (e.clientX / window.innerWidth) * 100;
      const vh = (e.clientY / window.innerHeight) * 100;
      if (vh >= 28.5 && vh <= 84) {
        handleEdgeClick(vw);
      }
    };
    document.addEventListener('click', onClick);
    return () => {
      document.removeEventListener('click', onClick);
    };
  }, [chatVisible, accountVisible, menuStage]);

  return (
    <div className="non-fullscreen" translate="no">
      {/* Hover area and chat text */}
      <div className="hover-area" ref={hoverAreaRef} />
      <span className="chat-text" ref={chatTextRef} style={{ opacity: 0 }}>
        {/* your chat text content */}
      </span>

      {/* Util line */}
      <div
        className="line util-line"
        onClick={handleUtilLineClick}
        style={{ cursor: 'pointer' }}
      />

      {/* Other content - mail and calendar */}
      <div className={`other-content ${showMail ? 'show-mail' : ''} ${showCalendar ? 'show-calendar' : ''}`}>
        <div className="mail-line" />
        <div className="mail-text">{/* mail content */}</div>
        <div className="grid-container">
          {[...Array(31)].map((_, i) => (
            <div key={i} className="grid-number">{i + 1}</div>
          ))}
          {/* dashed lines */}
          <div className="grid-dashed" />
        </div>
      </div>

      {/* Add your account-heading, menu-items, account-texts/lines, item-texts/lines, center-texts/lines markup here with appropriate CSS for sliding */}
    </div>
  );
};

export default IOULPage;