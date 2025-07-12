\"use client\";
import React, { useEffect } from 'react';

const PageScripts: React.FC = () => {
  useEffect(() => {
    // ===== Fade-in on first mouse move =====
    const pageContent = document.querySelector<HTMLElement>('.page-content');
    let pageFadedIn = false;
    const fadeInPage = () => {
      if (pageContent) {
        pageContent.style.opacity = '1';
        pageFadedIn = true;
      }
    };
    const onFirstMouseMove = () => {
      if (!pageFadedIn) fadeInPage();
      document.removeEventListener('mousemove', onFirstMouseMove);
    };
    document.addEventListener('mousemove', onFirstMouseMove);

    // ===== Fullscreen toggle on edge click =====
    const EDGE_MARGIN = 11;
    const onEdgeClick = (event: MouseEvent) => {
      const { clientX: x, clientY: y } = event;
      const { innerWidth: width, innerHeight: height } = window;
      if (
        !document.fullscreenElement &&
        (x <= EDGE_MARGIN ||
         x >= width - EDGE_MARGIN ||
         y <= EDGE_MARGIN ||
         y >= height - EDGE_MARGIN)
      ) {
        document.documentElement.requestFullscreen?.();
      }
    };
    document.addEventListener('click', onEdgeClick);

    // ===== Chat reveal & activation =====
    let slideState: 'none' | 'community' | 'menu' | 'heading' | 'account' = 'none';
    const chatText = document.getElementById('chatText') as HTMLElement | null;
    if (chatText) {
      chatText.style.pointerEvents = 'none';
      chatText.style.zIndex = '-1';
    }
    let chatShownOnce = false;
    const hoverArea = document.querySelector<HTMLElement>('.hover-area');
    const onChatHover = (event: MouseEvent) => {
      if (!chatShownOnce && pageFadedIn && hoverArea && chatText) {
        const rect = hoverArea.getBoundingClientRect();
        if (
          event.clientX >= rect.left &&
          event.clientX <= rect.right &&
          event.clientY >= rect.top &&
          event.clientY <= rect.bottom
        ) {
          chatText.style.opacity = '1';
          chatText.style.pointerEvents = 'auto';
          chatText.style.zIndex = '10';
          chatShownOnce = true;
        }
      }
    };
    document.addEventListener('mousemove', onChatHover);
    const onChatClick = (event: MouseEvent) => {
      event.stopPropagation();
      if (!chatText) return;
      const chatInput = document.createElement('input');
      chatInput.type = 'text';
      chatInput.classList.add('chat-input');
      chatInput.id = 'chatText';
      chatText.replaceWith(chatInput);
      chatInput.focus();
    };
    chatText?.addEventListener('click', onChatClick);

    // ===== Submenu helpers =====
    // (existing code unchanged)

    // ===== Global slide-down handlers =====
    // (existing code unchanged)

    // ===== Calendar scroll behavior =====
    // (existing code unchanged)

    // ===== Slide-down submenu & new-text helpers =====
    // (existing code unchanged)

    // ===== util-line toggle (mail/calendar/lines) =====
    const utilLines = Array.from(document.querySelectorAll<HTMLElement>('.util-line'));
    const mailEls = Array.from(document.querySelectorAll<HTMLElement>('.mail-text, .mail-line'));
    const calendarEls = Array.from(document.querySelectorAll<HTMLElement>('.grid-number, .grid-dashed'));
    const specialLines = Array.from(document.querySelectorAll<HTMLElement>('.line.fifth, .line.sixth'));
    // initial hide (avoid flash)
    mailEls.forEach(el => { el.classList.add('hidden'); el.style.opacity = '0'; });
    calendarEls.forEach(el => el.classList.add('hidden'));
    specialLines.forEach(el => el.classList.remove('hidden'));

    let stateView = 0;
    const updateView = () => {
      if (stateView === 0) {
        mailEls.forEach(el => { el.classList.add('hidden'); el.style.opacity = '0'; });
        calendarEls.forEach(el => el.classList.add('hidden'));
        specialLines.forEach(el => el.classList.remove('hidden'));
      } else if (stateView === 1) {
        mailEls.forEach(el => { el.classList.remove('hidden'); el.style.opacity = '1'; });
        calendarEls.forEach(el => el.classList.add('hidden'));
        specialLines.forEach(el => el.classList.remove('hidden'));
      } else {
        mailEls.forEach(el => { el.classList.add('hidden'); el.style.opacity = '0'; });
        calendarEls.forEach(el => el.classList.remove('hidden'));
        specialLines.forEach(el => el.classList.add('hidden'));
      }
    };
    const utilHandlers: ((this: HTMLElement, ev: Event) => any)[] = [];
    utilLines.forEach(line => {
      const handler = () => {
        stateView = (stateView + 1) % 3;
        updateView();
      };
      utilHandlers.push(handler);
      line.addEventListener('click', handler);
    });

    // ===== Account-slide logic =====
    const HIDE_MIN   =  6.37, HIDE_MAX   = 28.86;
    const TOP_MIN    = 28.5,  TOP_MAX    = 84;
    const CLICK_MIN  = 32.43, CLICK_MAX  = 36;
    const REVERSE_MIN= 94,    REVERSE_MAX=100;
    const DISTANCE   = 60,    DURATION   = 700;
    const pxToVw = (px: number) => px / (window.innerWidth / 100);
    const pxToVh = (px: number) => px / (window.innerHeight / 100);

    const accountEls: HTMLElement[] = [
      ...Array.from(document.querySelectorAll<HTMLElement>('.account-text')),
      ...Array.from(document.querySelectorAll<HTMLElement>('.account-line'))
    ];
    accountEls.forEach(el => {
      if (!el.dataset.baseLeftVw) {
        const leftPx = parseFloat(getComputedStyle(el).left) || 0;
        el.dataset.baseLeftVw = pxToVw(leftPx).toString();
      }
      el.dataset.slid = 'false';
    });
    const updateVisibility = () => {
      accountEls.forEach(el => {
        const rect = el.getBoundingClientRect();
        const l = pxToVw(rect.left), t = pxToVh(rect.top);
        const hide = l >= HIDE_MIN && l < HIDE_MAX && t >= TOP_MIN && t <= TOP_MAX;
        el.style.opacity = hide ? '0' : '';
        el.style.pointerEvents = hide ? 'none' : '';
      });
    };
    updateVisibility();
    window.addEventListener('resize', updateVisibility);
    let sliding = false;
    const slideOnce = () => {
      if (sliding || accountEls[0].dataset.slid === 'true') return;
      sliding = true;
      accountEls.forEach(el => {
        el.style.opacity = '';
        el.style.pointerEvents = '';
        el.style.transition = `left ${DURATION}ms ease`;
        const base = parseFloat(el.dataset.baseLeftVw!);
        el.style.left = `${base + DISTANCE}vw`;
        el.dataset.slid = 'true';
      });
      setTimeout(() => { updateVisibility(); sliding = false; }, DURATION);
    };
    const slideBack = () => {
      if (sliding || accountEls[0].dataset.slid !== 'true') return;
      sliding = true;
      accountEls.forEach(el => {
        const base = parseFloat(el.dataset.baseLeftVw!);
        el.style.transition = `left ${DURATION}ms ease`;
        el.style.left = `${base}vw`;
        el.dataset.slid = 'false';
      });
      setTimeout(() => { updateVisibility(); sliding = false; }, DURATION);
    };
    const clickHandler = (e: MouseEvent) => {
      const xVw = pxToVw(e.clientX), yVh = pxToVh(e.clientY);
      if (xVw >= CLICK_MIN && xVw <= CLICK_MAX) slideOnce();
      else if (xVw >= REVERSE_MIN && xVw <= REVERSE_MAX && yVh >= TOP_MIN && yVh <= TOP_MAX) slideBack();
    };
    document.addEventListener('click', clickHandler);
    const slideTriggers = Array.from(document.querySelectorAll<HTMLElement>('.slide-trigger, .slide-triggers, .slide-container'));
    const triggerHandlers: ((this: HTMLElement, ev: Event) => any)[] = [];
    slideTriggers.forEach(el => {
      const handler = (ev: Event) => { ev.stopPropagation(); slideOnce(); };
      triggerHandlers.push(handler);
      el.addEventListener('click', handler);
    });

    // ===== Updated staggered-gap logic =====
    const FWD_MIN = 80;
    const REV_MIN = 160;
    const GAP = 8;
    const STAGGER = 24;
    const toArrayNodes = (nodes: NodeListOf<Element>) => Array.from(nodes) as HTMLElement[];

    const applyStagger = (els: HTMLElement[], start: number) => {
      els.forEach((el, i) => {
        const offset = start + i * (GAP + STAGGER);
        el.style.setProperty('--stagger-offset', `${offset}px`);
      });
    };

    applyStagger(toArrayNodes(document.querySelectorAll('.item-text')), FWD_MIN);
    applyStagger(toArrayNodes(document.querySelectorAll('.item-line')), FWD_MIN);
    applyStagger(toArrayNodes(document.querySelectorAll('.center-text')), REV_MIN);
    applyStagger(toArrayNodes(document.querySelectorAll('.center-line')), REV_MIN);

    // ===== Cleanup all listeners on unmount =====
    return () => {  
      document.removeEventListener('mousemove', onFirstMouseMove);
      document.removeEventListener('click', onEdgeClick);
      document.removeEventListener('mousemove', onChatHover);
      chatText?.removeEventListener('click', onChatClick);
      // submenu cleanup as needed
      window.removeEventListener('resize', updateVisibility);
      utilLines.forEach((line, idx) => line.removeEventListener('click', utilHandlers[idx]));
      document.removeEventListener('click', clickHandler);
      slideTriggers.forEach((el, idx) => el.removeEventListener('click', triggerHandlers[idx]));
    };
  }, []);

  return (
    <>
      {/* ...existing JSX markup unchanged... */}
    </>
  );
};

export default PageScripts;
