import { useEffect, useState } from 'react';
import './style.css';

enum Stage {
  Initial = 'initial',
  ChatVisible = 'chat',
  Heading = 'heading',
  Menu = 'menu',
  Community = 'community',
  Zero = 'zero',
  Account = 'account',
  Item = 'item',
  Center = 'center'
}

const IOULPage = () => {
  const [stage, setStage] = useState<Stage>(Stage.Initial);

  // Lock title
  useEffect(() => {
    document.title = 'IOUL';
  }, []);

  // Handlers for click zones
  const handleLeftClick = () => {
    switch (stage) {
      case Stage.Initial:
        setStage(Stage.Heading);
        break;
      case Stage.ChatVisible:
        setStage(Stage.Heading);
        break;
      case Stage.Heading:
        setStage(Stage.Initial);
        break;
      case Stage.Menu:
        setStage(Stage.Heading);
        break;
      case Stage.Community:
        setStage(Stage.Menu);
        break;
      // ... add inverse transitions
      default:
        setStage(Stage.Initial);
    }
  };

  const handleRightClick = () => {
    switch (stage) {
      case Stage.Initial:
        setStage(Stage.ChatVisible);
        break;
      case Stage.ChatVisible:
        setStage(Stage.Menu);
        break;
      case Stage.Menu:
        setStage(Stage.Community);
        break;
      // ... continue forward transitions
      default:
        setStage(Stage.Initial);
    }
  };

  return (
    <div className="ioul-page" data-stage={stage}>
      <div className="layer-one" />
      <div className="layer-two" />
      <div className="layer-three" />

      <div className="page-content">
        {/* ... all your spans and divs ... */}

        <div className="hover-area" />
        <span className="chat-text">cHAT . . .</span>

        <div className="slide-triggers">
          <div className="slide-trigger" onClick={handleLeftClick} />
          <div className="slide-trigger-reverse" onClick={handleRightClick} />
        </div>
      </div>
    </div>
  );
};

export default IOULPage;
