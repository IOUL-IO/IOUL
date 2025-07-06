"use client";
import React, { useEffect, useRef } from 'react';
import './ioul.css'; // custom CSS for overflow clipping and animations

export default function Page() {
  const itemsRef = useRef<HTMLDivElement>(null);
  const centersRef = useRef<HTMLDivElement>(null);
  const mailRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const itemsContainer = itemsRef.current!;
    const centersContainer = centersRef.current!;
    const mailContainer = mailRef.current!;

    document.getElementById('slide-items')!.addEventListener('click', () => {
      itemsContainer.classList.toggle('slide-in-items');
    });

    document.getElementById('slide-centers')!.addEventListener('click', () => {
      centersContainer.classList.toggle('slide-in-centers');
      itemsContainer.classList.toggle('slide-items-under');
    });

    document.getElementById('inverse-slide')!.addEventListener('click', () => {
      centersContainer.classList.toggle('slide-in-centers');
      itemsContainer.classList.toggle('slide-in-items');
      itemsContainer.classList.toggle('slide-items-under');
    });

    document.getElementById('toggle-mail')!.addEventListener('click', () => {
      mailContainer.classList.toggle('mail-visible');
    });
  }, []);

  return (
    <div className="page-container">
      <div className="layer-one" />
      <div className="layer-two" />
      <div className="layer-three" />

      <div className="page-content">
        <button id="slide-items">Slide Items</button>
        <button id="slide-centers">Slide Centers</button>
        <button id="inverse-slide">Inverse Slide</button>
        <button id="toggle-mail">Toggle Mail</button>

        <div ref={itemsRef} className="items-group clipped">
          <div className="item-texts">
            <span className="item-text" style={{ position: 'absolute', top: '35.4vh', left: '96vw' }}>1ncOME</span>
            <span className="item-text" style={{ position: 'absolute', top: '41.6vh', left: '96vw' }}>cL1EnT</span>
            <span className="item-text right-flow" style={{ position: 'absolute', top: '35.4vh', left: '109vw' }}>0</span>
            <span className="item-text right-flow" style={{ position: 'absolute', top: '41.6vh', left: '109vw' }}>0</span>
            <span className="item-text" style={{ position: 'absolute', top: '35.4vh', left: '118vw' }}>T1cKETS</span>
            <span className="item-text" style={{ position: 'absolute', top: '41.6vh', left: '118vw' }}>1nQU1RY</span>
            <span className="item-text right-flow" style={{ position: 'absolute', top: '35.4vh', left: '131vw' }}>0</span>
            <span className="item-text right-flow" style={{ position: 'absolute', top: '41.6vh', left: '131vw' }}>0</span>
            <span className="item-text" style={{ position: 'absolute', top: '35.4vh', left: '139vw' }}>OnL1nE</span>
            <span className="item-text" style={{ position: 'absolute', top: '41.6vh', left: '139vw' }}>JO1nED</span>
            <span className="item-text right-flow" style={{ position: 'absolute', top: '35.4vh', left: '153.4vw' }}>0</span>
            <span className="item-text right-flow" style={{ position: 'absolute', top: '41.6vh', left: '153.4vw' }}>0</span>
          </div>
          <div className="item-lines">
            {/* replicate your line SVGs here */}
          </div>
        </div>

        <div ref={centersRef} className="centers-group clipped">
          <div className="center-texts">
            <span className="center-text" style={{ position: 'absolute', top: '35.4vh', left: '106.0vw' }}>UPDATES</span>
            <span className="center-text" style={{ position: 'absolute', top: '41.6vh', left: '106.0vw' }}>cATALOg</span>
            <span className="center-text right-flow" style={{ position: 'absolute', top: '35.4vh', left: '119.0vw' }}>0</span>
            <span className="center-text right-flow" style={{ position: 'absolute', top: '41.6vh', left: '119.0vw' }}>0</span>
            <span className="center-text" style={{ position: 'absolute', top: '35.4vh', left: '128.0vw' }}>T1cKETS</span>
            <span className="center-text" style={{ position: 'absolute', top: '41.6vh', left: '128.0vw' }}>cOnTAcT</span>
            <span className="center-text right-flow" style={{ position: 'absolute', top: '35.4vh', left: '141.0vw' }}>0</span>
            <span className="center-text right-flow" style={{ position: 'absolute', top: '41.6vh', left: '141.0vw' }}>0</span>
            <span className="center-text" style={{ position: 'absolute', top: '35.4vh', left: '149.0vw' }}>gET APP</span>
            <span className="center-text" style={{ position: 'absolute', top: '41.6vh', left: '149.0vw' }}>AP1-LOg</span>
            <span className="center-text right-flow" style={{ position: 'absolute', top: '35.4vh', left: '163.4vw' }}>0</span>
            <span className="center-text right-flow" style={{ position: 'absolute', top: '41.6vh', left: '163.4vw' }}>0</span>
          </div>
          <div className="center-lines">
            {/* replicate your center lines/SVGs */}
          </div>
        </div>

        <div ref={mailRef} className="mail-group">
          <span className="mail-text" style={{ position: 'absolute', top: '60vh', left: '30vw' }}>TO:</span>
          <span className="mail-text" style={{ position: 'absolute', top: '66vh', left: '30vw' }}>SUBJEcT:</span>
          <span className="mail-text" style={{ position: 'absolute', top: '72vh', left: '30vw' }}>cc</span>
          <span className="mail-text" style={{ position: 'absolute', top: '78vh', left: '30vw' }}>Bcc</span>
          <span className="mail-text" style={{ position: 'absolute', top: '84vh', left: '30vw' }}>SEnD</span>
        </div>

        <div className="calendar-grid">
          {Array.from({ length: 31 }, (_, i) => (
            <span key={i} className={`grid-number num${i+1}`}>{i+1}</span>
          ))}
        </div>
      </div>

      <div className="layer-four" />
      <div className="layer-three" />
    </div>
  );
}
