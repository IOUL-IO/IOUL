"use client";

import React, { useEffect } from 'react';

const PageScripts: React.FC = () => {
  useEffect(() => {
    // Fade-in on first mouse move
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

    // Fullscreen toggle on edge click
    const EDGE_MARGIN = 11;
    const onEdgeClick = (event: MouseEvent) => {
      const { clientX: x, clientY: y } = event;
      const { innerWidth: width, innerHeight: height } = window;
      if (
        !document.fullscreenElement &&
        (x <= EDGE_MARGIN ||
         x >= width - EDGE_MARGIN ||
         y <= EDGE_MARGIN ||
         y >= height - EDGE_MARGIN)
      ) {
        document.documentElement.requestFullscreen?.();
      }
    };
    document.addEventListener('click', onEdgeClick);

    // Cleanup on unmount
    return () => {
      document.removeEventListener('mousemove', onFirstMouseMove);
      document.removeEventListener('click', onEdgeClick);
    };
  }, []);

  return (
    <>
      <div className="layer-one" />
      <div className="layer-two" />
      <div className="layer-three" />

      <div className="page-content">
        {/* ... full JSX markup here ... */}
      </div>

      <div className="slide-triggers">
        <div className="slide-trigger" />
        <div className="slide-trigger-reverse" />
      </div>
    </>
  );
};

export default PageScripts;
