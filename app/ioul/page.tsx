"use client";

import React, { useEffect, useState, useCallback } from 'react';
import Head from 'next/head';

const IOULPage: React.FC = () => {
  const [state, setState] = useState<number>(0);
  const showMail = state === 1;
  const showCalendar = state === 2;
  const showLines = state !== 2;

  // Cycle through 0 -> 1 -> 2 -> 0
  const handleUtilLineClick = useCallback(() => {
    setState(prev => (prev + 1) % 3);
  }, []);

  // Lock tab title
  useEffect(() => {
    document.title = 'IOUL';
  }, []);

  return (
    <>
      <Head>
        <title>IOUL</title>
      </Head>
      <div className="non-fullscreen" translate="no">
        {/* util-line */}
        <div className="line util-line" onClick={handleUtilLineClick} />

        {/* mail-line */}
        <div
          className="mail-line"
          style={{
            opacity: showMail ? 1 : 0,
            pointerEvents: showMail ? 'auto' : 'none',
            transition: 'none'
          }}
        />

        {/* mail-text(s) */}
        <div
          className="mail-text"
          style={{
            opacity: showMail ? 1 : 0,
            pointerEvents: showMail ? 'auto' : 'none',
            transition: 'none'
          }}
        >
          {/* your mail text content */}
        </div>

        {/* layers 5 & 6 */}
        <div
          className="layer-five"
          style={{
            opacity: showLines ? 1 : 0,
            pointerEvents: showLines ? 'auto' : 'none',
            transition: 'none'
          }}
        >
          {/* layer five content */}
        </div>
        <div
          className="layer-six"
          style={{
            opacity: showLines ? 1 : 0,
            pointerEvents: showLines ? 'auto' : 'none',
            transition: 'none'
          }}
        >
          {/* layer six content */}
        </div>

        {/* calendar grid */}
        <div className="grid-container other-content">
          {/* dashed lines */}
          {[...Array(31)].map((_, i) => {
            const visible = showCalendar && i < 16;
            return (
              <div
                key={`dashed-${i}`}
                className="grid-dashed"
                style={{
                  opacity: visible ? 1 : 0,
                  pointerEvents: visible ? 'auto' : 'none',
                  transition: 'none'
                }}
              />
            );
          })}
          {/* numbers */}
          {[...Array(31)].map((_, i) => {
            const visible = showCalendar && i < 16;
            return (
              <div
                key={`num-${i}`}
                className="grid-number"
                style={{
                  opacity: visible ? 1 : 0,
                  pointerEvents: visible ? 'auto' : 'none',
                  transition: 'none'
                }}
              >
                {i + 1}
              </div>
            );
          })}
        </div>

        {/* chat hover */}
        <div className="hover-area" />
        <div className="chat-text">
          {/* chat content */}
        </div>
      </div>
    </>
  );
};

export default IOULPage;
