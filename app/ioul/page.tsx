"use client";

import React, { useEffect, useState, useCallback } from 'react';

const IOULPage: React.FC = () => {
  const [state, setState] = useState(0); // 0: base, 1: mail, 2: calendar

  // Lock title
  useEffect(() => { document.title = 'IOUL'; }, []);

  // Handle util-line clicks
  const handleUtilLineClick = useCallback(() => {
    setState(prev => (prev + 1) % 3);
  }, []);

  // Determine visibilities
  const showMail = state === 1;
  const showCalendar = state === 2;
  const showLines = state !== 2;

  return (
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

      {/* mail-text */}
      <div
        className="mail-text"
        style={{
          opacity: showMail ? 1 : 0,
          pointerEvents: showMail ? 'auto' : 'none',
          transition: 'none'
        }}
      >
        {/* mail content */}
      </div>

      {/* layer-five */}
      <div
        className="layer-five"
        style={{
          opacity: showLines ? 1 : 0,
          pointerEvents: showLines ? 'auto' : 'none',
          transition: 'none'
        }}
      >
        {/* layer-five content */}
      </div>

      {/* layer-six */}
      <div
        className="layer-six"
        style={{
          opacity: showLines ? 1 : 0,
          pointerEvents: showLines ? 'auto' : 'none',
          transition: 'none'
        }}
      >
        {/* layer-six content */}
      </div>

      {/* calendar grid dashed */}
      <div className="grid-container other-content">
        {[...Array(31)].map((_, i) => (
          <div
            key={'dashed-' + i}
            className="grid-dashed"
            style={{
              opacity: showCalendar ? 1 : 0,
              pointerEvents: showCalendar ? 'auto' : 'none',
              transition: 'none'
            }}
          />
        ))}
        {[...Array(31)].map((_, i) => (
          <div
            key={'num-' + i}
            className="grid-number"
            style={{
              opacity: showCalendar ? 1 : 0,
              pointerEvents: showCalendar ? 'auto' : 'none',
              transition: 'none'
            }}
          >
            {i+1}
          </div>
        ))}
      </div>

      {/* hover-area */}
      <div className="hover-area" />

      {/* chat-text */}
      <div className="chat-text">
        {/* chat content */}
      </div>
    </div>
  );
};

export default IOULPage;
