'use client';
import { useState } from 'react';
import './styles.css';

export default function IoulPage() {
  // Slide state: 'menu', 'center', 'account'
  const [slideState, setSlideState] = useState<'menu'|'center'|'account'>('center');
  const slideOnce  = () => setSlideState('menu');
  const slideBack  = () => setSlideState('center');
  const slideAgain = () => setSlideState('account');

  // Util state: 'default' → 'mail' → 'calendar'
  const [utilState, setUtilState] = useState<'default'|'mail'|'calendar'>('default');
  const toggleUtil = () => {
    setUtilState(s =>
      s === 'default'  ? 'mail'    :
      s === 'mail'     ? 'calendar':
                         'default'
    );
  };

  // Submenu control
  const menuIds = ['online-assets','linkup-center','delivery-line','internal-unit'] as const;
  const [openMenu, setOpenMenu] = useState<string|null>(null);
  const toggleMenu = (id: string) => {
    setOpenMenu(curr => curr === id ? null : id);
  };

  return (
    <div className="ioul-wrapper">
      {/* --- Slide triggers --- */}
      <div
        className="slide-trigger"
        onClick={slideOnce}
        style={{ cursor:'pointer' }}
      >▶</div>

      <div
        className="slide-trigger-reverse"
        onClick={slideBack}
        style={{ cursor:'pointer' }}
      >◀</div>

      {/* --- Your animated layers --- */}
      <div className={`layer-one ${
        slideState==='menu'?'slide-left':''} ${
        slideState==='account'?'slide-right':''}`}>
        {/* ... */}
      </div>
      <div className={`heading-container ${
        slideState==='account'?'slide-in':''}`}>
        <div className="custom-line"></div>
      </div>
      <div className={`account-container ${
        slideState==='account'?'slide-in':''}`}>
        <span className="account-texts">…</span>
        <div className="account-lines">…</div>
      </div>

      {/* --- Items group (menu slide) --- */}
      <div className="other-content">
        <div className="item-texts"></div>
        <div className="item-lines"></div>
      </div>

      {/* --- Util line toggle --- */}
      <div
        className="util-line"
        onClick={toggleUtil}
        style={{ cursor:'pointer' }}
      >
        {utilState==='default' && <>≡</>}
        {utilState==='mail'    && <div className="mail-texts">…</div>}
        {utilState==='calendar'&& <div className="calendar-grid">…</div>}
      </div>

      {/* --- Menu with submenus --- */}
      <ul className="menu-items">
        {menuIds.map(id => (
          <li
            key={id}
            id={id}
            className={`menu-item${openMenu===id?' slide-down':''}`}
            onClick={() => toggleMenu(id)}
          >
            {id}
            {openMenu===id && (
              <ul className="submenu">
                <li>Sub-item 1</li>
                <li>Sub-item 2</li>
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
