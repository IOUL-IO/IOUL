"use client";

import React, { useEffect, useState } from 'react';
import './styles.css';

// Stages for sliding
type Stage =
  | 'initial'
  | 'accountHeading'
  | 'menu'
  | 'communityZero'
  | 'accountTexts'
  | 'itemTexts'
  | 'centerTexts';

const IOULPage: React.FC = () => {
  const [stage, setStage] = useState<Stage>('initial');
  const [hovered, setHovered] = useState(false);

  // Lock title
  useEffect(() => {
    document.title = 'IOUL';
  }, []);

  // Style getters
  const getChatStyle = () => ({
    opacity: hovered && stage === 'initial' ? 1 : 0,
    transition: 'opacity 0.6s ease',
  });

  const getTransform = (current: Stage, translate: string) => ({
    transform: stage === current ? translate : 'translateX(0)',
    transition: 'transform 0.7s ease',
  });

  return (
    <div className="ioul-page">
      {/* Layers */}
      <div className="layer-one" />
      <div className="layer-two" />
      <div className="layer-three" />

      <div className="page-content">
        {/* Hover area */}
        <div
          className="hover-area"
          onMouseEnter={() => stage === 'initial' && setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        />
        <span className="chat-text" style={getChatStyle()}>
          cHAT . . .
        </span>

        {/* Heading & Account */}
        <div
          className="heading-container"
          style={getTransform('accountHeading', 'translateX(6.41vw)')}
        >
          {/* ... heading spans here ... */}
        </div>
        <div
          className="account-container" 
          style={getTransform('accountHeading', 'translateX(6.41vw)')}
        >
          {/* ... account spans here ... */}
        </div>

        {/* Menu */}
        <div
          className="menu-items"
          style={getTransform('menu', 'translateX(6.41vw)')}
        >
          {/* ... menu items here ... */}
        </div>

        {/* Community & Zero */}
        <div
          className="community-items-container"
          style={getTransform('communityZero', 'translateX(6.41vw)')}
        >
          {/* ... community spans here ... */}
        </div>
        <div
          className="zero-items-container"
          style={getTransform('communityZero', 'translateX(6.41vw)')}
        >
          {/* ... zero spans here ... */}
        </div>

        {/* Account Texts & Lines */}
        <div
          className="account-texts"
          style={getTransform('accountTexts', 'translateX(60vw)')}
        >
          {/* ... account-text & line spans ... */}
        </div>

        {/* Item Texts & Lines */}
        <div
          className="item-texts"
          style={getTransform('itemTexts', 'translateX(-60vw)')}
        >
          {/* ... item-texts & item-line spans ... */}
        </div>

        {/* Center Texts & Lines */}
        <div
          className="center-texts"
          style={getTransform('centerTexts', 'translateX(60vw)')}
        >
          {/* ... center-texts & center-line spans ... */}
        </div>

        {/* Slide triggers */}
        <div className="slide-triggers">
          <div
            className="slide-trigger"
            onClick={() => {
              // Left zone logic
              switch (stage) {
                case 'initial':
                  setStage('accountHeading');
                  setHovered(false);
                  break;
                case 'menu':
                  setStage('initial');
                  break;
                case 'communityZero':
                  setStage('menu');
                  break;
                case 'accountTexts':
                  setStage('initial');
                  break;
                case 'itemTexts':
                  setStage('accountTexts');
                  break;
                case 'centerTexts':
                  setStage('itemTexts');
                  break;
              }
            }}
          />
          <div
            className="slide-trigger-reverse"
            onClick={() => {
              // Right zone logic
              switch (stage) {
                case 'initial':
                  setStage('menu');
                  setHovered(false);
                  break;
                case 'accountHeading':
                  setStage('initial');
                  break;
                case 'menu':
                  setStage('communityZero');
                  break;
                case 'communityZero':
                  setStage('initial');
                  break;
                case 'initial':
                  setStage('accountTexts');
                  break;
                case 'accountTexts':
                  setStage('itemTexts');
                  break;
                case 'itemTexts':
                  setStage('centerTexts');
                  break;
                case 'centerTexts':
                  setStage('initial');
                  break;
              }
            }}
          />
        </div>
      </div>
      <div className="layer-four" />
      <div className="layer-five" />
      <div className="layer-six" />
    </div>
  );
};

export default IOULPage;
