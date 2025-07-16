import React, { useState } from 'react';
import '../../../public/IOUL-login/ioul/styles.css';

export const metadata = { title: 'IOUL' };

export default function IOULPage() {
  const [accountHeadingOpen, setAccountHeadingOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [communityOpen, setCommunityOpen] = useState(false);
  const [accountTextsOpen, setAccountTextsOpen] = useState(false);
  const [itemStage1Open, setItemStage1Open] = useState(false);
  const [itemStage2Open, setItemStage2Open] = useState(false);
  const [centerOpen, setCenterOpen] = useState(false);

  const fadeOutChat = () => {
    const chat = document.querySelector('.chat-text');
    chat?.classList.remove('fade-in');
    chat?.classList.add('fade-out');
  };
  const fadeInChat = () => {
    const chat = document.querySelector('.chat-text');
    chat?.classList.remove('fade-out');
    chat?.classList.add('fade-in');
  };

  const handleZoneClick = (zone: string) => {
    switch (zone) {
      case 'chat-out':
        if (!accountHeadingOpen && !menuOpen) {
          fadeOutChat();
          const acc = document.querySelector('.account-heading');
          acc?.setAttribute('style', '--tx: 6.41vw');
          acc?.classList.add('slide-in');
          setAccountHeadingOpen(true);
        }
        break;
      case 'chat-in':
        if (accountHeadingOpen) {
          const acc = document.querySelector('.account-heading');
          acc?.classList.remove('slide-in');
          fadeInChat();
          setAccountHeadingOpen(false);
        }
        break;
      case 'menu-open':
        if (!menuOpen && !accountHeadingOpen) {
          fadeOutChat();
          const menu = document.querySelector('.menu-items');
          menu?.setAttribute('style', '--tx: -22.45vw');
          menu?.classList.add('slide-in');
          setMenuOpen(true);
        }
        break;
      case 'menu-back':
        if (menuOpen && !communityOpen) {
          const menu = document.querySelector('.menu-items');
          menu?.classList.remove('slide-in');
          fadeInChat();
          setMenuOpen(false);
        }
        break;
      case 'community-open':
        if (menuOpen && !communityOpen) {
          const menu = document.querySelector('.menu-items');
          menu?.setAttribute('style', '--tx: -44.59vw');
          menu?.classList.add('slide-in');
          const com = document.querySelector('.community-zero-container');
          com?.setAttribute('style', '--tx: 6.41vw');
          com?.classList.add('slide-in');
          setCommunityOpen(true);
        }
        break;
      case 'community-back':
        if (communityOpen) {
          const com = document.querySelector('.community-zero-container');
          com?.classList.remove('slide-in');
          const menu = document.querySelector('.menu-items');
          menu?.setAttribute('style', '--tx: -22.45vw');
          menu?.classList.add('slide-in');
          setCommunityOpen(false);
        }
        break;
      case 'account-texts-open':
        if (!accountTextsOpen) {
          const at = document.querySelector('.account-texts, .account-line');
          at?.setAttribute('style', '--tx: 60vw');
          at?.classList.add('slide-in');
          setAccountTextsOpen(true);
        }
        break;
      case 'account-texts-back':
        if (accountTextsOpen) {
          const at = document.querySelector('.account-texts, .account-line');
          at?.classList.remove('slide-in');
          setAccountTextsOpen(false);
        }
        break;
      case 'item-stage1-open':
        if (!itemStage1Open && !itemStage2Open) {
          const it = document.querySelector('.item-texts, .item-lines');
          it?.setAttribute('style', '--tx: -60vw');
          it?.classList.add('slide-in');
          setItemStage1Open(true);
        }
        break;
      case 'item-stage1-back':
        if (itemStage1Open && !itemStage2Open) {
          const it = document.querySelector('.item-texts, .item-lines');
          it?.classList.remove('slide-in');
          setItemStage1Open(false);
        }
        break;
      case 'item-stage2-open':
        if (itemStage1Open && !itemStage2Open) {
          const it = document.querySelector('.item-texts, .item-lines');
          it?.setAttribute('style', '--tx: -130vw');
          it?.classList.add('slide-in');
          const ct = document.querySelector('.center-texts, .center-lines');
          ct?.setAttribute('style', '--tx: -60vw');
          ct?.classList.add('slide-in');
          setItemStage2Open(true);
          setCenterOpen(true);
        }
        break;
      case 'center-back':
        if (centerOpen) {
          const ct = document.querySelector('.center-texts, .center-lines');
          ct?.classList.remove('slide-in');
          const it = document.querySelector('.item-texts, .item-lines');
          it?.setAttribute('style', '--tx: -60vw');
          it?.classList.add('slide-in');
          setCenterOpen(false);
          setItemStage2Open(false);
        }
        break;
      default:
        break;
    }
  };

  return (
    <div className="ioul-page-container" style={{ position: 'relative' }}>
      <div className="click-area-chat-out" onClick={() => handleZoneClick('chat-out')} />
      <div className="click-area-chat-in" onClick={() => handleZoneClick('chat-in')} />
      <div className="click-area-menu" onClick={() => handleZoneClick('menu-open')} />
      <div className="click-area-menu-back" onClick={() => handleZoneClick('menu-back')} />
      <div className="click-area-community" onClick={() => handleZoneClick('community-open')} />
      <div className="click-area-community-back" onClick={() => handleZoneClick('community-back')} />
      <div className="click-area-account-texts" onClick={() => handleZoneClick('account-texts-open')} />
      <div className="click-area-item-texts" onClick={() => handleZoneClick(itemStage1Open ? (itemStage2Open ? 'item-stage2-open' : 'item-stage1-open') : 'item-stage1-open')} />
      <div className="click-area-center" onClick={() => handleZoneClick('center-back')} />

      {/* Existing page content */}
    </div>
  );
}
