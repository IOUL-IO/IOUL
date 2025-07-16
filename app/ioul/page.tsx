"use client";

import React, { useEffect, useState, useCallback } from 'react';
import Head from 'next/head';

const IOULPage: React.FC = () => {
  const [utilState, setUtilState] = useState<number>(0);

  // cycle 0 → 1 → 2 → 0
  const handleUtilLineClick = useCallback(() => {
    setUtilState(prev => (prev + 1) % 3);
  }, []);

  // lock the tab title
  useEffect(() => {
    document.title = 'IOUL';
  }, []);

  // sync data-util on <html> for CSS
  useEffect(() => {
    document.documentElement.setAttribute('data-util', utilState.toString());
  }, [utilState]);

  return (
    <>
      <Head>
        <title>IOUL</title>
      </Head>
      <div className="non-fullscreen" translate="no">
        {/* ── Your existing page markup goes here ── */}

        {/* util-line (clickable) */}
        <div className="line util-line" onClick={handleUtilLineClick} />

        {/* mail elements */}
        <div className="mail-line" />
        <div className="mail-text">…your mail text…</div>

        {/* layers 5 & 6 */}
        <div className="layer-five">…layer 5 content…</div>
        <div className="layer-six">…layer 6 content…</div>

        {/* calendar grid */}
        <div className="grid-container other-content">
          {/* dashed lines */}
          {[...Array(31)].map((_, i) => (
            <div key={`dashed-${i}`} className="grid-dashed" />
          ))}
          {/* numbers */}
          {[...Array(31)].map((_, i) => (
            <div key={`num-${i}`} className="grid-number">
              {i + 1}
            </div>
          ))}
        </div>

        {/* chat hover area */}
        <div className="hover-area" />
        <div className="chat-text">…your chat content…</div>

        {/* ── rest of your page … ── */}
      </div>
    </>
  );
};

export default IOULPage;
