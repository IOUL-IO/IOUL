
"use client";
import React, { useEffect, useRef } from 'react';

const Page: React.FC = () => {
  const pageContentRef = useRef<HTMLDivElement>(null);
  const hoverAreaRef = useRef<HTMLDivElement>(null);
  const chatTextRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    // Legacy JS initialization logic ported here

    const pageContent = pageContentRef.current!;
    let pageFadedIn = false;
    function fadeInPage() {
      pageContent.style.opacity = '1';
      pageFadedIn = true;
    }
    function onFirstMouseMove() {
      if (!pageFadedIn) { fadeInPage(); }
      document.removeEventListener('mousemove', onFirstMouseMove);
    }
    document.addEventListener('mousemove', onFirstMouseMove);

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

    // Chat hover logic
    const chatText = chatTextRef.current!;
    chatText.style.pointerEvents = 'none';
    chatText.style.zIndex = '-1';
    let chatShownOnce = false;
    const hoverArea = hoverAreaRef.current!;
    const onMouseMove = (event: MouseEvent) => {
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
    };
    document.addEventListener('mousemove', onMouseMove);

    chatText.addEventListener('click', (event) => {
      event.stopPropagation();
      const chatInput = document.createElement('input');
      chatInput.type = 'text';
      chatInput.classList.add('chat-input');
      chatInput.id = 'chatText';
      chatText.replaceWith(chatInput);
      chatInput.focus();
    });

    // Additional JS logic for sliding menus, calendar scrolling, etc... (port all event listeners as above)

    return () => {
      document.removeEventListener('mousemove', onFirstMouseMove);
      document.removeEventListener('mousemove', onMouseMove);
      // remove other listeners if necessary
    };
  }, []);

  return (
    <div ref={pageContentRef} className="page-wrapper" style={{ opacity: 0 }}>
      <p style={{ display: 'none' }} lang="en">
        This page is already in English. No translation is needed.
      </p>

      <div className="layer-one" />
      <div className="layer-two" />
      <div className="layer-three" />

      <div className="page-content">
        <div className="menu-items">
          <span
            className="custom-text menu-item"
            style={{ top: '36.1vh', left: '29vw' }}
            id="online-assets"
            ref={hoverAreaRef}
          >
            OnL1nE ASSETS:
          </span>
          {/* ... convert remaining spans and divs similarly to JSX ... */}
        </div>

        <div className="layer-four" />

        <div className="community-items-container" style={{ position: 'absolute', zIndex: 1 }}>
          <span style={{
            position: 'absolute',
            top: '35.4vh',
            left: '35.41vw',
            zIndex: 1,
            fontFamily: 'Distill Expanded, sans-serif',
            color: '#111111',
            letterSpacing: '0.28vw',
            fontSize: '0.47rem',
            textShadow: '0.001rem 0.001rem 0 #717171, -0.001rem -0.001rem 0 #717171',
            transition: 'left 0.7s ease',
            lineHeight: 1.6,
            overflow: 'visible',
          }}>
            cOMMUn1T1ES
          </span>
          {/* ... continue converting all HTML to JSX elements, replacing class with className, inline styles as objects ... */}
        </div>

        {/* ... full translation of remaining markup ... */}

        <div className="slide-triggers">
          <div className="slide-trigger" />
          <div className="slide-trigger-reverse" />
        </div>
      </div>
    </div>
  );
};

export default Page;
