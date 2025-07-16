
import { useEffect, useState } from 'react';
import './styles.css';

type Stage =
  | 'initial'
  | 'accountHeading'
  | 'menu'
  | 'communityZero'
  | 'accountTexts'
  | 'itemTexts1'
  | 'centerTexts';

const IOULPage = () => {
  const [stage, setStage] = useState<Stage>('initial');
  const [hovered, setHovered] = useState(false);

  // Lock document title
  useEffect(() => {
    document.title = 'IOUL';
  }, []);

  // Helpers to compute styles
  const headingStyle = {
    transform: stage === 'accountHeading' ? 'translateX(6.41vw)' : 'translateX(0)',
    transition: 'transform 0.7s ease',
  };
  const accountContainersStyle = {
    transform: stage === 'accountHeading' ? 'translateX(6.41vw)' : 'translateX(0)',
    transition: 'transform 0.7s ease',
  };
  const menuItemsStyle = {
    transform:
      stage === 'menu'
        ? 'translateX(6.41vw)'
        : stage === 'communityZero'
        ? 'translateX(-22.59vw)'
        : 'translateX(0)',
    transition: 'transform 0.7s ease',
  };
  const communityZeroStyle = {
    transform: stage === 'communityZero' ? 'translateX(6.41vw)' : 'translateX(0)',
    transition: 'transform 0.7s ease',
  };
  const accountTextsStyle = {
    transform: stage === 'accountTexts' ? 'translateX(60vw)' : 'translateX(0)',
    transition: 'transform 0.7s ease',
  };
  const itemTextsStyle = {
    transform:
      stage === 'itemTexts1'
        ? 'translateX(-60vw)'
        : stage === 'centerTexts'
        ? 'translateX(-130vw)'
        : 'translateX(0)',
    transition: 'transform 0.7s ease',
  };
  const centerTextsStyle = {
    transform: stage === 'centerTexts' ? 'translateX(60vw)' : 'translateX(0)',
    transition: 'transform 0.7s ease',
  };

  // Click zones handlers
  const onLeftClick = () => {
    switch (stage) {
      case 'initial':
        setStage('accountHeading');
        break;
      case 'menu':
        setStage('initial');
        break;
      case 'communityZero':
        setStage('menu');
        break;
      case 'itemTexts1':
        setStage('accountTexts');
        break;
      case 'centerTexts':
        setStage('itemTexts1');
        break;
      default:
        setStage('initial');
    }
  };
  const onRightClick = () => {
    switch (stage) {
      case 'initial':
        setStage('menu');
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
        setStage('initial');
        break;
      case 'initial':
        setStage('itemTexts1');
        break;
      case 'itemTexts1':
        setStage('centerTexts');
        break;
      case 'centerTexts':
        setStage('initial');
        break;
      default:
        setStage('initial');
    }
  };

  return (
    <div className="ioul-page" onMouseLeave={() => setHovered(false)}>
      <div
        className="hover-area"
        onMouseEnter={() => {
          if (stage === 'initial') setHovered(true);
        }}
      />
      <span
        className="chat-text"
        style={{
          opacity: hovered && stage === 'initial' ? 1 : 0,
          transition: 'opacity 0.6s ease',
        }}
      >
        cHAT . . .
      </span>

      <div className="heading-container" style={headingStyle}>
        {/* heading spans */}
      </div>
      <div className="account-containers" style={accountContainersStyle}>
        {/* account container spans */}
      </div>

      <div className="menu-items" style={menuItemsStyle}>
        {/* menu item spans */}
      </div>
      <div className="community-items-container" style={communityZeroStyle}>
        {/* community + zero spans */}
      </div>

      <div className="account-texts" style={accountTextsStyle}>
        {/* account-text and account-line spans */}
      </div>
      <div className="item-texts" style={itemTextsStyle}>
        {/* item-texts and item-lines */}
      </div>
      <div className="center-texts" style={centerTextsStyle}>
        {/* center-texts and center-lines */}
      </div>

      <div
        className="click-zone left-zone"
        style={{ left: '0vw', width: '6.37vw' }}
        onClick={onLeftClick}
      />
      <div
        className="click-zone right-zone"
        style={{ left: '28.86vw', width: '3.57vw' }}
        onClick={onRightClick}
      />
    </div>
  );
};

export default IOULPage;
