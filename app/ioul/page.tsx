"use client";

import React, { useEffect, useState, useRef, useCallback } from 'react';
import Head from 'next/head';

const IOULPage: React.FC = () => {
  // ─── util-line toggle state (0: none, 1: mail, 2: calendar) ───
  const [utilState, setUtilState] = useState(0);

  // ─── cycle 0→1→2→0 on each click ───
  const handleUtilLineClick = useCallback(() => {
    setUtilState(s => (s + 1) % 3);
  }, []);

  // ─── ensure document title stays constant ───
  useEffect(() => {
    document.title = 'IOUL';
  }, []);

  // ─── apply visibility/opacities whenever utilState changes ───
  useEffect(() => {
    // mail elements
    const mailEls = document.querySelectorAll<HTMLElement>('.mail-text');
    const mailLine = document.querySelector<HTMLElement>('.mail-line');
    mailEls.forEach(el => {
      el.style.opacity = utilState === 1 ? '1' : '0';
      el.style.pointerEvents = utilState === 1 ? 'auto' : 'none';
    });
    if (mailLine) {
      mailLine.style.opacity = utilState === 1 ? '1' : '0';
      mailLine.style.pointerEvents = utilState === 1 ? 'auto' : 'none';
    }

    // calendar grid elements
    const gridEls = document.querySelectorAll<HTMLElement>('.grid-number, .grid-dashed');
    gridEls.forEach(el => {
      el.style.opacity = utilState === 2 ? '1' : '0';
      el.style.pointerEvents = utilState === 2 ? 'auto' : 'none';
    });
  }, [utilState]);

  // ─── attach click listener to the util-line element ───
  useEffect(() => {
    const util = document.querySelector<HTMLElement>('.util-line');
    util?.addEventListener('click', handleUtilLineClick);
    return () => {
      util?.removeEventListener('click', handleUtilLineClick);
    };
  }, [handleUtilLineClick]);

  return (
    <>
      <Head>
        <title>IOUL</title>
      </Head>
      <div className="non-fullscreen" translate="no">
        {/* … keep all your existing markup here … */}

        {/* Example structure: */}
        <div className="util-line" />
        <div className="mail-line" style={{ opacity: 0, pointerEvents: 'none' }} />
        <div className="mail-text" style={{ opacity: 0, pointerEvents: 'none' }}>
          {/* mail text content */}
        </div>

        <div className="grid-container other-content">
          {/* calendar dashed lines */}
          {[...Array(31)].map((_, i) => (
            <div key={`dashed-${i}`} className="grid-dashed" />
          ))}
          {/* calendar numbers */}
          {[...Array(31)].map((_, i) => (
            <div key={`num-${i}`} className="grid-number">
              {i + 1}
            </div>
          ))}
        </div>

        <div className="hover-area" />
        <div className="chat-text">
          {/* chat content */}
        </div>

        {/* … rest of your page … */}
      </div>
    </>
  );
};

export default IOULPage;
