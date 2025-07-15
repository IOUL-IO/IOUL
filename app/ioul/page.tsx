"use client";

import React, { useEffect, useState, useRef } from 'react';

const IOULPage: React.FC = () => {
  const [currentMenu, setCurrentMenu] = useState<string | null>(null);
  const [slideState, setSlideState] = useState("none");
  const [itemStage, setItemStage] = useState(false);
  const [centerStage, setCenterStage] = useState(false);
  const [pageFadedIn, setPageFadedIn] = useState(false);
  const [showMail, setShowMail] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [showLines, setShowLines] = useState(true);

  const [isSecondScroll, setIsSecondScroll] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);

  const numbers1to16Ref = useRef<NodeListOf<HTMLElement> | null>(null);
  const numbers17to31Ref = useRef<NodeListOf<HTMLElement> | null>(null);
  const dashed1to16Ref = useRef<NodeListOf<HTMLElement> | null>(null);
  const dashed17to31Ref = useRef<NodeListOf<HTMLElement> | null>(null);

  const chatTextRef = useRef<HTMLSpanElement | null>(null);
  const hoverAreaRef = useRef<HTMLDivElement | null>(null);
  const pageContentRef = useRef<HTMLDivElement | null>(null);

  // 1) Ref initialization — runs once
  useEffect(() => {
    numbers1to16Ref.current = document.querySelectorAll(
      '.grid-number.num1, .grid-number.num2, .grid-number.num3, .grid-number.num4, .grid-number.num5, .grid-number.num6, .grid-number.num7, .grid-number.num8, .grid-number.num9, .grid-number.num10, .grid-number.num11, .grid-number.num12, .grid-number.num13, .grid-number.num14, .grid-number.num15, .grid-number.num16'
    );
    numbers17to31Ref.current = document.querySelectorAll(
      '.grid-number.num17, .grid-number.num18, .grid-number.num19, .grid-number.num20, .grid-number.num21, .grid-number.num22, .grid-number.num23, .grid-number.num24, .grid-number.num25, .grid-number.num26, .grid-number.num27, .grid-number.num28, .grid-number.num29, .grid-number.num30, .grid-number.num31'
    );
    dashed1to16Ref.current = document.querySelectorAll(
      '.grid-dashed.dashed1, .grid-dashed.dashed2, .grid-dashed.dashed3, .grid-dashed.dashed4, .grid-dashed.dashed5, .grid-dashed.dashed6, .grid-dashed.dashed7, .grid-dashed.dashed8, .grid-dashed.dashed9, .grid-dashed.dashed10, .grid-dashed.dashed11, .grid-dashed.dashed12, .grid-dashed.dashed13, .grid-dashed.dashed14, .grid-dashed.dashed15, .grid-dashed.dashed16'
    );
    dashed17to31Ref.current = document.querySelectorAll(
      '.grid-dashed.dashed17, .grid-dashed.dashed18, .grid-dashed.dashed19, .grid-dashed.dashed20, .grid-dashed.dashed21, .grid-dashed.dashed22, .grid-dashed.dashed23, .grid-dashed.dashed24, .grid-dashed.dashed25, .grid-dashed.dashed26, .grid-dashed.dashed27, .grid-dashed.dashed28, .grid-dashed.dashed29, .grid-dashed.dashed30, .grid-dashed.dashed31'
    );
  }, []);

  // 2) Scroll-area setup — runs when scrolling state changes
  useEffect(() => {
    const scrollArea = document.createElement('div');
    scrollArea.style.position = 'absolute';
    scrollArea.style.top = '28.5vh';
    scrollArea.style.left = '36vw';
    scrollArea.style.width = '58vw';
    scrollArea.style.height = '55.5vh';
    scrollArea.style.zIndex = '5';
    document.querySelector('.other-content')!.appendChild(scrollArea);

    function onWheel(e: WheelEvent) {
      e.preventDefault();
      if (isScrolling) return;
      setIsScrolling(true);
      setTimeout(() => setIsScrolling(false), 700);

      const nums1 = numbers1to16Ref.current || [];
      const nums2 = numbers17to31Ref.current || [];
      const das1 = dashed1to16Ref.current || [];
      const das2 = dashed17to31Ref.current || [];
      const all = [...nums1, ...nums2, ...das1, ...das2];
      all.forEach(el => el.style.transition = 'transform 0.7s ease');

      if (e.deltaY > 0) {
        if (!isSecondScroll) {
          all.forEach(el => el.style.transform = 'translateY(-55.5vh)');
          setIsSecondScroll(true);
        } else {
          all.forEach(el => el.style.transform = 'translateY(-111vh)');
          setIsSecondScroll(false);
        }
      } else {
        const match = all[0]?.style.transform.match(/translateY\(([-\d.]+)vh\)/);
        const y = match ? parseFloat(match[1]) : 0;
        if (y === -111) {
          all.forEach(el => el.style.transform = 'translateY(-55.5vh)');
          setIsSecondScroll(true);
        } else if (y === -55.5) {
          all.forEach(el => el.style.transform = 'translateY(0)');
          setIsSecondScroll(false);
        }
      }
    }

    scrollArea.addEventListener('wheel', onWheel, { passive: false });
    return () => {
      scrollArea.removeEventListener('wheel', onWheel);
      scrollArea.remove();
    };
  }, [isScrolling, isSecondScroll]);

  // 3) Left-edge clicks — only slideState matters
  useEffect(() => {
    const handleLeftClick = (event: MouseEvent) => {
      if (event.target.closest('.menu-item') || event.target.closest('.chat-text')) return;
      const { clientX: x, clientY: y } = event;
      const { innerWidth: w, innerHeight: h } = window;
      const vw = w / 100, vh = h / 100;
      if (x >= 0 && x <= 6.37 * vw && y >= 28.5 * vh && y <= 84 * vh) {
        event.stopPropagation();
        forceCloseSubmenuThen(() => {
          // community → menu → none → heading logic
        });
      }
    };
    document.addEventListener('click', handleLeftClick, true);
    return () => document.removeEventListener('click', handleLeftClick, true);
  }, [slideState]);

  // 4) Right-edge clicks — only slideState matters
  useEffect(() => {
    const handleRightClick = (event: MouseEvent) => {
      if (event.target.closest('.menu-item') || event.target.closest('.chat-text')) return;
      const { clientX: x, clientY: y } = event;
      const { innerWidth: w, innerHeight: h } = window;
      const vw = w / 100, vh = h / 100;
      if (x >= 28.86 * vw && x <= 32.43 * vw && y >= 28.5 * vh && y <= 84 * vh) {
        event.stopPropagation();
        forceCloseSubmenuThen(() => {
          // menu → community → none → heading logic
        });
      }
    };
    document.addEventListener('click', handleRightClick, true);
    return () => document.removeEventListener('click', handleRightClick, true);
  }, [slideState]);

  // 5) Item-line clicks — only itemStage matters
  useEffect(() => {
    const handleItemClick = () => setItemStage(prev => !prev);
    const els = document.querySelectorAll('.item-line');
    els.forEach(el => el.addEventListener('click', handleItemClick));
    return () => els.forEach(el => el.removeEventListener('click', handleItemClick));
  }, [itemStage]);

  // 6) Center-line clicks — only centerStage matters
  useEffect(() => {
    const handleCenterClick = () => setCenterStage(prev => !prev);
    const els = document.querySelectorAll('.center-line');
    els.forEach(el => el.addEventListener('click', handleCenterClick));
    return () => els.forEach(el => el.removeEventListener('click', handleCenterClick));
  }, [centerStage]);

  // ...any other handlers remain unchanged...

  return (
    <div className="non-fullscreen" translate="no">
      {/* ...your existing JSX markup unchanged... */}
    </div>
  );
};

export default IOULPage;
