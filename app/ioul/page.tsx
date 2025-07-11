// app/ioul/page.tsx
"use client";

import React, { useEffect } from 'react';
import './styles.css';

const IoulPage: React.FC = () => {
  useEffect(() => {
    // ===== Fade-in on first mouse move =====
    const pageContent = document.querySelector<HTMLElement>('.page-content');
    let pageFadedIn = false;
    const fadeInPage = () => {
      if (pageContent) {
        pageContent.style.opacity = '1';
        pageFadedIn = true;
      }
    };
    const onFirstMouseMove = () => {
      if (!pageFadedIn) fadeInPage();
      document.removeEventListener('mousemove', onFirstMouseMove);
    };
    document.addEventListener('mousemove', onFirstMouseMove);

    // ===== Edge-to-fullscreen click =====
    const EDGE_MARGIN = 11;
    const onEdgeClick = (event: MouseEvent) => {
      const { clientX: x, clientY: y } = event;
      const { innerWidth: width, innerHeight: height } = window;
      if (!document.fullscreenElement &&
          (x <= EDGE_MARGIN || x >= width - EDGE_MARGIN ||
           y <= EDGE_MARGIN || y >= height - EDGE_MARGIN)) {
        document.documentElement.requestFullscreen();
      }
    };
    document.addEventListener('click', onEdgeClick);

    // ===== Chat hover & click =====
    const chatText = document.getElementById('chatText');
    if (chatText) {
      chatText.style.pointerEvents = 'none';
      chatText.style.zIndex = '-1';
    }
    let chatShownOnce = false;
    const hoverArea = document.querySelector<HTMLElement>('.hover-area');
    const onChatHover = (event: MouseEvent) => {
      if (!chatShownOnce && pageFadedIn && hoverArea && chatText) {
        const rect = hoverArea.getBoundingClientRect();
        if (
          event.clientX >= rect.left &&
          event.clientX <= rect.right &&
          event.clientY >= rect.top &&
          event.clientY <= rect.bottom
        ) {
          chatText.style.opacity = '1';
          chatText.style.pointerEvents = 'auto';
          chatText.style.zIndex = '10';
          chatShownOnce = true;
        }
      }
    };
    document.addEventListener('mousemove', onChatHover);

    const onChatClick = (event: MouseEvent) => {
      event.stopPropagation();
      if (!chatText) return;
      const chatInput = document.createElement('input');
      chatInput.type = 'text';
      chatInput.classList.add('chat-input');
      chatInput.id = 'chatText';
      chatText.replaceWith(chatInput);
      chatInput.focus();
    };
    chatText?.addEventListener('click', onChatClick);

    // ===== Cleanup on unmount =====
    return () => {
      document.removeEventListener('mousemove', onFirstMouseMove);
      document.removeEventListener('click', onEdgeClick);
      document.removeEventListener('mousemove', onChatHover);
      chatText?.removeEventListener('click', onChatClick);
    };
  }, []);

  return (
    <>
      <div className="layer-one" />
      <div className="layer-two" />
      <div className="layer-three" />

      <div className="page-content">
        {/* Your converted index.html markup should go here */}
      </div>

      <div className="slide-triggers">
        <div className="slide-trigger" />
        <div className="slide-trigger-reverse" />
      </div>
    </>
  );
};

export default IoulPage;
