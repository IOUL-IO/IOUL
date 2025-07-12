"use client";
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
    let currentMenu: string | null = null;
    const quickRemoveSubmenu = () => {
      document.querySelectorAll<HTMLElement>('.new-text').forEach(span => {
        span.style.transition = 'opacity 0.1s ease';
        span.classList.remove('visible');
      });
      setTimeout(() => {
        document.querySelectorAll<HTMLElement>('.new-text').forEach(span => span.remove());
        currentMenu = null;
      }, 100);
      ['linkup-center','delivery-line','internal-unit'].forEach(id => {
        document.getElementById(id)?.classList.remove('slide-down');
      });
    };
    const closeSubmenu = () => {
      document.querySelectorAll<HTMLElement>('.new-text').forEach(span => {
        span.style.transition = 'opacity 0.3s ease';
        span.classList.remove('visible');
      });
      setTimeout(() => {
        document.querySelectorAll<HTMLElement>('.new-text').forEach(span => span.remove());
        currentMenu = null;
      }, 300);
      ['linkup-center','delivery-line','internal-unit'].forEach(id => {
        document.getElementById(id)?.classList.remove('slide-down');
      });
    };
    const forceCloseSubmenuThen = (fn: () => void) => {
      if (currentMenu !== null) {
        quickRemoveSubmenu();
        setTimeout(fn, 100);
      } else {
        fn();
      }
    };

    // ===== Click outside handlers for sliding logic =====
    const onGlobalClick1 = (event: MouseEvent) => {
      if (event.target instanceof Element &&
          (event.target.closest('.menu-item') ||
           event.target.closest('.chat-text'))
      ) return;
      const vw = window.innerWidth / 100;
      const vh = window.innerHeight / 100;
      const leftMin = 0, leftMax = 6.37 * vw, yMin = 28.5 * vh, yMax = 84 * vh;
      if (
        event.clientX >= leftMin &&
        event.clientX <= leftMax &&
        event.clientY >= yMin &&
        event.clientY <= yMax
      ) {
        event.stopPropagation();
        forceCloseSubmenuThen(() => {
          if (slideState === 'community') {
            document.querySelectorAll<HTMLElement>('.menu-items .menu-item').forEach(el => {
              if (!el.dataset.originalLeft) el.dataset.originalLeft = el.style.left;
              el.style.transition = 'left 0.7s ease';
              el.style.left =`${parseFloat(el.style.left) + 29}vw`;
            });
            document.querySelectorAll<HTMLElement>(
              '.community-items-container *:not(.custom-line)'
            ).forEach(el => {
              if (!el.dataset.originalLeft) el.dataset.originalLeft = el.style.left;
              el.style.transition = 'left 0.7s ease';
              el.style.left =`${parseFloat(el.style.left) + 29}vw`;
            });
            document.querySelectorAll<HTMLElement>('.community-items-container .custom-line').forEach(el => {
              if (el.dataset.originalLeft) {
                el.style.transition = 'left 0.7s ease';
                el.style.left = el.dataset.originalLeft!;
              }
            });
            document.querySelectorAll<HTMLElement>('.zero-items-container *').forEach(el => {
              if (!el.dataset.originalLeft) el.dataset.originalLeft = el.style.left;
              el.style.transition = 'left 0.7s ease';
              el.style.left =`${parseFloat(el.style.left) + 29}vw`;
            });
            slideState = 'menu';
            return;
          } else if (slideState === 'menu') {
            document.querySelectorAll<HTMLElement>('.menu-items .menu-item').forEach(el => {
              el.style.transition = 'transform 0.7s ease';
              el.style.transform = 'translateX(0)';
            });
            document.querySelector('.menu-items')?.classList.remove('raised');
            const ct = document.getElementById('chatText');
            if (ct) {
              setTimeout(() => {
                if (slideState !== 'none') return;
                ct.style.transition = 'opacity 0.7s ease';
                ct.style.opacity = '1';
              }, 700);
            }
            slideState = 'none';
          } else if (['heading','account'].includes(slideState)) {
            document
              .querySelectorAll<HTMLElement>('[data-slide-group="heading"]')
              .forEach(el => { el.style.transform = `translateX(${el.dataset.offset}vw)`; });
            document
              .querySelectorAll<HTMLElement>('[data-slide-group="account"]')
              .forEach(el => { el.style.transform = `translateX(${el.dataset.offset}vw)`; });
            document.querySelectorAll<HTMLElement>('.other-content > .custom-text:not(.menu-item)')
              .forEach(el => { if (el.dataset.originalLeft) el.style.left = el.dataset.originalLeft; });
            document.querySelectorAll<HTMLElement>('.other-content > .custom-line')
              .forEach(el => {
                if (el.dataset.originalLeft) {
                  el.style.transition = 'left 0.7s ease';
                  el.style.left = el.dataset.originalLeft!;
                }
              });
            const ct = document.getElementById('chatText');
            if (ct) {
              setTimeout(() => {
                if (slideState !== 'none') return;
                ct.style.transition = 'opacity 0.7s ease';
                ct.style.opacity = '1';
              }, 700);
            }
            slideState = 'none';
          } else if (slideState === 'none') {
            const ct = document.getElementById('chatText');
            if (ct) {
              ct.style.transition = 'opacity 0.1s ease';
              ct.style.opacity = '0';
              setTimeout(() => {
                document.querySelectorAll<HTMLElement>('.other-content > .custom-text:not(.menu-item)')
                  .forEach(el => {
                    if (!el.dataset.originalLeft) el.dataset.originalLeft = el.style.left;
                    el.style.transition = 'left 0.7s ease';
                    el.style.left =`${parseFloat(el.dataset.originalLeft!)+49}vw`;
                  });
                document.querySelectorAll<HTMLElement>('.other-content > .custom-line')
                  .forEach(el => {
                    if (!el.dataset.originalLeft) el.dataset.originalLeft = el.style.left;
                    el.style.transition = 'left 0.7s ease';
                    el.style.left =`${parseFloat(el.dataset.originalLeft!)+49}vw`;
                  });
                document.querySelectorAll<HTMLElement>('[data-slide-group="heading"]')
                  .forEach(el => el.style.transform = 'translateX(0)');
                document.querySelectorAll<HTMLElement>('[data-slide-group="account"]')
                  .forEach(el => el.style.transform = 'translateX(0)');
              }, 110);
            }
            slideState = 'heading';
          }
        });
      }
    };
    document.addEventListener('click', onGlobalClick1, true);

    const onGlobalClick2 = (event: MouseEvent) => {
      if (
        event.target instanceof Element &&
        (event.target.closest('.menu-item') ||
         event.target.closest('.chat-text') ||
         event.target.closest('.chat-input'))
      ) return;
      const vw = window.innerWidth / 100;
      const vh = window.innerHeight / 100;
      const leftMin = 28.86 * vw, leftMax = 32.43 * vw;
      const yMin = 28.5 * vh, yMax = 84 * vh;
      if (
        event.clientX >= leftMin &&
        event.clientX <= leftMax &&
        event.clientY >= yMin &&
        event.clientY <= yMax
      ) {
        event.stopPropagation();
        forceCloseSubmenuThen(() => {
          if (slideState === 'menu') {
            document.querySelectorAll<HTMLElement>('.menu-items .menu-item').forEach(el => {
              if (!el.dataset.originalLeft) el.dataset.originalLeft = el.style.left;
              el.style.transition = 'left 0.7s ease';
              el.style.left =`${parseFloat(el.style.left) - 29}vw`;
            });
            document.querySelectorAll<HTMLElement>('.community-items-container *').forEach(el => {
              if (!el.dataset.originalLeft) el.dataset.originalLeft = el.style.left;
              el.style.transition = 'left 0.7s ease';
              el.style.left =`${parseFloat(el.style.left) - 29}vw`;
            });
            document.querySelectorAll<HTMLElement>('.zero-items-container *').forEach(el => {
              if (!el.dataset.originalLeft) el.dataset.originalLeft = el.style.left;
              el.style.transition = 'left 0.7s ease';
              el.style.left =`${parseFloat(el.style.left) - 29}vw`;
            });
            slideState = 'community';
          } else if (['heading','account'].includes(slideState)) {
            document
              .querySelectorAll<HTMLElement>('[data-slide-group="heading"]')
              .forEach(el => { el.style.transform = `translateX(${el.dataset.offset}vw)`; });
            document
              .querySelectorAll<HTMLElement>('[data-slide-group="account"]')
              .forEach(el => { el.style.transform = `translateX(${el.dataset.offset}vw)`; });
            document.querySelectorAll<HTMLElement>('.other-content > .custom-text:not(.menu-item)')
              .forEach(el => { if (el.dataset.originalLeft) el.style.left = el.dataset.originalLeft; });
            document.querySelectorAll<HTMLElement>('.other-content > .custom-line')
              .forEach(el => {
                if (el.dataset.originalLeft) {
                  el.style.transition = 'left 0.7s ease';
                  el.style.left = el.dataset.originalLeft!;
                }
              });
            const ct = document.getElementById('chatText');
            if (ct) {
              setTimeout(() => {
                if (slideState !== 'none') return;
                ct.style.transition = 'opacity 0.7s ease';
                ct.style.opacity = '1';
              }, 700);
            }
            slideState = 'none';
          } else if (slideState === 'none') {
            const ct = document.getElementById('chatText');
            if (ct) {
              ct.style.transition = 'opacity 0.1s ease';
              ct.style.opacity = '0';
              setTimeout(() => {
                document.querySelectorAll<HTMLElement>('.menu-items .menu-item').forEach(el => {
                  if (!el.dataset.originalLeft) el.dataset.originalLeft = el.style.left;
                  el.style.transition = 'transform 0.7s ease';
                  el.style.transform = 'translateX(-22.59vw)';
                });
                setTimeout(() => document.querySelector('.menu-items')?.classList.add('raised'), 700);
              }, 110);
            }
            slideState = 'menu';
          }
        });
      }
    };
    document.addEventListener('click', onGlobalClick2, true);

    // ===== Calendar scroll behavior =====
    let isScrolling = false;
    let scrollTimeout: number;
    let isSecondScroll = false;

    const nums1to16 = Array.from(document.querySelectorAll<HTMLElement>(
      '.grid-number.num1, .grid-number.num2, .grid-number.num3, .grid-number.num4, .grid-number.num5, .grid-number.num6, .grid-number.num7, .grid-number.num8, .grid-number.num9, .grid-number.num10, .grid-number.num11, .grid-number.num12, .grid-number.num13, .grid-number.num14, .grid-number.num15, .grid-number.num16'
    ));
    const nums17to31 = Array.from(document.querySelectorAll<HTMLElement>(
      '.grid-number.num17, .grid-number.num18, .grid-number.num19, .grid-number.num20, .grid-number.num21, .grid-number.num22, .grid-number.num23, .grid-number.num24, .grid-number.num25, .grid-number.num26, .grid-number.num27, .grid-number.num28, .grid-number.num29, .grid-number.num30, .grid-number.num31'
    ));
    const dash1to16 = Array.from(document.querySelectorAll<HTMLElement>(
      '.grid-dashed.dashed01, .grid-dashed.dashed02, .grid-dashed.dashed03, .grid-dashed.dashed04, .grid-dashed.dashed05, .grid-dashed.dashed06, .grid-dashed.dashed07, .grid-dashed.dashed08, .grid-dashed.dashed09, .grid-dashed.dashed10, .grid-dashed.dashed11, .grid-dashed.dashed12, .grid-dashed.dashed13, .grid-dashed.dashed14, .grid-dashed.dashed15, .grid-dashed.dashed16'
    ));
    const dash17to31 = Array.from(document.querySelectorAll<HTMLElement>(
      '.grid-dashed.dashed17, .grid-dashed.dashed18, .grid-dashed.dashed19, .grid-dashed.dashed20, .grid-dashed.dashed21, .grid-dashed.dashed22, .grid-dashed.dashed23, .grid-dashed.dashed24, .grid-dashed.dashed25, .grid-dashed.dashed26, .grid-dashed.dashed27, .grid-dashed.dashed28, .grid-dashed.dashed29, .grid-dashed.dashed30, .grid-dashed.dashed31'
    ));

    // create scroll area
    const scrollArea = document.createElement('div');
    Object.assign(scrollArea.style, {
      position: 'absolute',
      top: '28.5vh',
      left: '36vw',
      width: '58vw',
      height: '55.5vh',
      zIndex: '5',
      pointerEvents: 'auto',
      cursor: 'default'
    });
    document.querySelector('.other-content')?.appendChild(scrollArea);

    let mailShownOnce = false;
    scrollArea.addEventListener('mousemove', () => {
      if (!mailShownOnce) {
        document.querySelectorAll<HTMLElement>('.mail-text, .mail-line')
          .forEach(el => el.style.opacity = '1');
        mailShownOnce = true;
      }
    });

    scrollArea.addEventListener('wheel', (e: WheelEvent) => {
      e.preventDefault();
      if (isScrolling) return;
      isScrolling = true;
      clearTimeout(scrollTimeout);
      scrollTimeout = window.setTimeout(() => { isScrolling = false; }, 700);

      const allEls = [...nums1to16, ...nums17to31, ...dash1to16, ...dash17to31];
      requestAnimationFrame(() => {
        allEls.forEach(el => el.style.transition = 'transform 0.7s ease');
        requestAnimationFrame(() => {
          if (e.deltaY > 0) {
            if (!isSecondScroll) {
              allEls.forEach(el => el.style.transform = 'translateY(-55.5vh)');
              isSecondScroll = true;
            } else {
              allEls.forEach(el => el.style.transform = 'translateY(-111vh)');
              isSecondScroll = false;
            }
          } else {
            const current = allEls[0]?.style.transform || '';
            const match = current.match(/translateY\((-?[\d.]+)vh\)/);
            const y = match ? parseFloat(match[1]) : 0;
            if (y === -111) {
              allEls.forEach(el => el.style.transform = 'translateY(-55.5vh)');
              isSecondScroll = true;
            } else if (y === -55.5) {
              allEls.forEach(el => el.style.transform = 'translateY(0)');
              isSecondScroll = false;
            }
          }
        });
      });
    }, { passive: false });

    // ===== Slide-down submenu & new-text helpers =====
    const slideDownSiblings = (clickedId: string) => {
      const items = Array.from(document.querySelectorAll<HTMLElement>('.menu-items .menu-item'));
      const idx = items.findIndex(el => el.id === clickedId);
      items.slice(idx+1).forEach(el => {
        el.classList.remove('menu-slide','slide-down');
        el.style.transform = '';
        el.style.transition = '';
        void el.offsetHeight;
        el.classList.add('slide-down');
      });
      requestAnimationFrame(() => {
        items.slice(idx+1).forEach(el => el.classList.add('slide-down'));
      });
    };
    const addNewText = (text: string, topVH: number, leftVW: number) => {
      if (slideState !== 'menu') return;
      const span = document.createElement('span');
      span.className = 'custom-text new-text';
      span.style.top =`${topVH}vh`;
      span.style.left =`${leftVW}vw`;
      span.textContent = text;
      document.querySelector('.other-content')?.appendChild(span);
      setTimeout(() => span.classList.add('visible'), 10);
    };
    const openOnlineAssets = () => {
      slideDownSiblings('online-assets');
      setTimeout(() => {
        addNewText('- cMS', 40.1, 6.4);
        addNewText('- LMS', 44.1, 6.4);
      }, 700);
      currentMenu = 'online-assets';
    };
    const openLinkupCenter = () => {
      slideDownSiblings('linkup-center');
      setTimeout(() => {
        addNewText('- cOM', 47.2, 6.4);
        addNewText('- JOB', 51.2, 6.4);
        addNewText('- HR', 55.2, 6.4);
      }, 700);
      currentMenu = 'linkup-center';
    };
    const openDeliveryLine = () => {
      slideDownSiblings('delivery-line');
      setTimeout(() => {
        addNewText('- cRM', 54.3, 6.4);
        addNewText('- OPS', 58.3, 6.4);
      }, 700);
      currentMenu = 'delivery-line';
    };
    const openInternalUnit = () => {
      slideDownSiblings('internal-unit');
      setTimeout(() => {
        addNewText('- 1nV', 61.4, 6.4);
        addNewText('- FMS', 65.4, 6.4);
        addNewText('- 1T', 69.4, 6.4);
      }, 700);
      currentMenu = 'internal-unit';
    };

    document.getElementById('online-assets')?.addEventListener('click', e => { e.stopPropagation(); currentMenu==='online-assets' ? closeSubmenu() : openOnlineAssets(); });
    document.getElementById('linkup-center')?.addEventListener('click', e => { e.stopPropagation(); currentMenu==='linkup-center' ? closeSubmenu() : openLinkupCenter(); });
    document.getElementById('delivery-line')?.addEventListener('click', e => { e.stopPropagation(); currentMenu==='delivery-line' ? closeSubmenu() : openDeliveryLine(); });
    document.getElementById('internal-unit')?.addEventListener('click', e => { e.stopPropagation(); currentMenu==='internal-unit' ? closeSubmenu() : openInternalUnit(); });

    
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
    // ===== Slide trigger handlers =====
const forwardTriggers = Array.from(document.querySelectorAll<HTMLElement>('.slide-trigger'));
const reverseTriggers = Array.from(document.querySelectorAll<HTMLElement>('.slide-trigger-reverse'));
forwardTriggers.forEach(el => el.addEventListener('click', ev => { ev.stopPropagation(); slideOnce(); }));
reverseTriggers.forEach(el => el.addEventListener('click', ev => { ev.stopPropagation(); slideBack(); }));
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
      document.removeEventListener('click', onGlobalClick1, true);
      document.removeEventListener('click', onGlobalClick2, true);
      document.removeEventListener('resize', updateVisibility);
      utilLines.forEach(line => line.replaceWith(line.cloneNode(true) as HTMLElement));
      // (and any others if you track them separately)
    };
  }, []);

 return (
    <>
      <div className="layer-one" />
      <div className="layer-two" />
      <div className="layer-three" />

      <div className="page-content">
        <div className="menu-items">
          <span id="online-assets" className="custom-text menu-item" style={{ top: "36.1vh", left: "29vw" }}>
            OnL1nE ASSETS:
          </span>
          <span id="linkup-center" className="custom-text menu-item" style={{ top: "43.2vh", left: "29vw" }}>
            L1nKUP cEnTER:
          </span>
          <span id="delivery-line" className="custom-text menu-item" style={{ top: "50.3vh", left: "29vw" }}>
            DEL1VERY L1nE:
          </span>
          <span id="internal-unit" className="custom-text menu-item" style={{ top: "57.4vh", left: "29vw" }}>
            1nTERnAL Un1T:
          </span>
        </div>


      <div className="layer-four" />

      <div className="community-items-container" style={{ position: "absolute", zIndex: 1 }}>
        <span className="custom-text" style={{ position: "absolute", top: "35.4vh", left: "35.41vw", zIndex: 1, fontFamily: "'Distill Expanded', sans-serif", color: "#111111", letterSpacing: "0.28vw", fontSize: "0.47rem", textShadow: "0.001rem 0.001rem 0 #717171, -0.001rem -0.001rem 0 #717171", transition: "left 0.7s ease", lineHeight: 1.6, overflow: "visible" }}>cOMMUn1T1ES</span>
        <span className="custom-text" style={{ position: "absolute", top: "41.6vh", left: "35.41vw", zIndex: 1, fontFamily: "'Distill Expanded', sans-serif", color: "#111111", letterSpacing: "0.28vw", fontSize: "0.47rem", textShadow: "0.001rem 0.001rem 0 #717171, -0.001rem -0.001rem 0 #717171", transition: "left 0.7s ease", lineHeight: 1.6, overflow: "visible" }}>OUR L1BRARY</span>
        <span className="custom-text" style={{ position: "absolute", top: "53vh", left: "35.41vw", zIndex: 1, fontFamily: "'Distill Expanded', sans-serif", color: "#111111", letterSpacing: "0.28vw", fontSize: "0.47rem", textShadow: "0.001rem 0.001rem 0 #717171, -0.001rem -0.001rem 0 #717171", transition: "left 0.7s ease", lineHeight: 1.6, overflow: "visible" }}>ADD-On SHOP</span>
        <span className="custom-text" style={{ position: "absolute", top: "59.2vh", left: "35.41vw", zIndex: 1, fontFamily: "'Distill Expanded', sans-serif", color: "#111111", letterSpacing: "0.28vw", fontSize: "0.47rem", textShadow: "0.001rem 0.001rem 0 #717171, -0.001rem -0.001rem 0 #717171", transition: "left 0.7s ease", lineHeight: 1.6, overflow: "visible" }}>1OUL cEnTER</span>
        <div className="custom-line" style={{ position: "absolute", top: "47.8vh", left: "35.41vw", width: "22.48vw", height: "1px", backgroundColor: "rgba(230,230,230,0.28)", transition: "left 0.7s ease, transform 0.7s ease", zIndex: 1 }} />
      </div>

      <div
        className="zero-items-container"
        style={{ position: "absolute", zIndex: 1 }}
      >
        <span className="right-flow" style={{ position: "absolute", top: "35.4vh", left: "57.4vw", zIndex: 1, fontFamily: "'Distill Expanded', sans-serif", color: "#111111", letterSpacing: "0.28vw", fontSize: "0.47rem", textShadow: "0.001rem 0.001rem 0 #717171, -0.001rem -0.001rem 0 #717171", transition: "left 0.7s ease", lineHeight: 1.6, overflow: "visible" }}>0</span>
        <span className="right-flow" style={{ position: "absolute", top: "41.6vh", left: "57.4vw", zIndex: 1, fontFamily: "'Distill Expanded', sans-serif", color: "#111111", letterSpacing: "0.28vw", fontSize: "0.47rem", textShadow: "0.001rem 0.001rem 0 #717171, -0.001rem -0.001rem 0 #717171", transition: "left 0.7s ease", lineHeight: 1.6, overflow: "visible" }}>0</span>
        <span className="right-flow" style={{ position: "absolute", top: "53vh", left: "57.4vw", zIndex: 1, fontFamily: "'Distill Expanded', sans-serif", color: "#111111", letterSpacing: "0.28vw", fontSize: "0.47rem", textShadow: "0.001rem 0.001rem 0 #717171, -0.001rem -0.001rem 0 #717171", transition: "left 0.7s ease", lineHeight: 1.6, overflow: "visible" }}>0</span>
        <span className="right-flow" style={{ position: "absolute", top: "59.2vh", left: "57.4vw", zIndex: 1, fontFamily: "'Distill Expanded', sans-serif", color: "#111111", letterSpacing: "0.28vw", fontSize: "0.47rem", textShadow: "0.001rem 0.001rem 0 #717171, -0.001rem -0.001rem 0 #717171", transition: "left 0.7s ease", lineHeight: 1.6, overflow: "visible" }}>0</span>
      </div>

      <div className="other-content">
        <div className="line original" />
        <div className="line second" />
        <div className="line util-line" />
        <div className="line third" />
        <div className="line fourth" />
        <div className="line fifth" />
        <div
          className="line mail-line"
          style={{ position: "absolute", top: "47.8vh", left: "36vw", width: "57.8vw", height: "1px", backgroundColor: "rgba(230,230,230,0.28)", opacity: 0, transition: "opacity 0.3s ease", zIndex: 1 }}
        />
        <div className="line sixth" />
      </div>

      <div className="slide-container">
        <span className="account-text" style={{ position: "absolute", top: "35.4vh", left: "-24.00vw" }}>AccOUnT nAME</span>
        <span className="account-text" style={{ position: "absolute", top: "35.4vh", left: "26.00vw" }}>L1nK UP</span>
        <span className="account-text right-flow" style={{ position: "absolute", top: "35.4vh", left: "33.19vw" }}>0</span>
        <span className="account-text" style={{ position: "absolute", top: "77vh", left: "-24.00vw", color: "#111111" }}>. . .</span>
      <div className="line account-line" style={{ position: "absolute", top: "41.6vh", left: "-24.00vw", width: "57.8vw", height: "1px", backgroundColor: "rgba(230,230,230,0.28)", zIndex: 1 }} />
    </div>

    <div className="item-line item-line-one" style={{ position: "absolute", top: "47.8vh", left: "96vw", width: "36vw" }} />
    <div className="item-line item-line-two" style={{ position: "absolute", top: "47.8vh", left: "139vw", width: "14.8vw" }} />

    <div className="center-line center-line-one" style={{ position: "absolute", top: "47.8vh", left: "106.0vw", width: "36vw" }} />
    <div className="center-line center-line-two" style={{ position: "absolute", top: "47.8vh", left: "149.0vw", width: "14.8vw" }} />
        

      <span className="center-text"             style={{ position: "absolute", top: "35.4vh", left: "106.0vw" }}>UPDATES</span>
      <span className="center-text"             style={{ position: "absolute", top: "41.6vh", left: "106.0vw" }}>cATALOg</span>
        
      <span className="center-text right-flow"  style={{ position: "absolute", top: "35.4vh", left: "119.0vw" }}>0</span>
      <span className="center-text right-flow"  style={{ position: "absolute", top: "41.6vh", left: "119.0vw" }}>0</span>
        
      <span className="center-text"             style={{ position: "absolute", top: "35.4vh", left: "128.0vw" }}>T1cKETS</span>
      <span className="center-text"             style={{ position: "absolute", top: "41.6vh", left: "128.0vw" }}>cOnTAcT</span>
        
      <span className="center-text right-flow"  style={{ position: "absolute", top: "35.4vh", left: "141.0vw" }}>0</span>
      <span className="center-text right-flow"  style={{ position: "absolute", top: "41.6vh", left: "141.0vw" }}>0</span>
        
      <span className="center-text"             style={{ position: "absolute", top: "35.4vh", left: "149.0vw" }}>gET APP</span>
      <span className="center-text"             style={{ position: "absolute", top: "41.6vh", left: "149.0vw" }}>AP1-LOg</span>
        
      <span className="center-text right-flow"  style={{ position: "absolute", top: "35.4vh", left: "163.4vw" }}>0</span>
      <span className="center-text right-flow"  style={{ position: "absolute", top: "41.6vh", left: "163.4vw" }}>0</span>
        
      <span className="center-text"             style={{ position: "absolute", top: "53vh",   left: "149.0vw" }}>LOg 0.01</span>
      <span className="center-text"             style={{ position: "absolute", top: "59.2vh", left: "149.0vw" }}>LOg 0.02</span>
      <span className="center-text"             style={{ position: "absolute", top: "65.4vh", left: "149.0vw" }}>LOg 0.03</span>
      <span className="center-text"             style={{ position: "absolute", top: "71.6vh", left: "149.0vw" }}>LOg 0.04</span>
        
      <span className="center-text right-flow"  style={{ position: "absolute", top: "53vh",   left: "163.4vw" }}>0</span>
      <span className="center-text right-flow"  style={{ position: "absolute", top: "59.2vh", left: "163.4vw" }}>0</span>
      <span className="center-text right-flow"  style={{ position: "absolute", top: "65.4vh", left: "163.4vw" }}>0</span>
      <span className="center-text right-flow"  style={{ position: "absolute", top: "71.6vh", left: "163.4vw" }}>0</span>
        
      <span className="center-text"             style={{ position: "absolute", top: "53vh",   left: "106.0vw" }}>LATEST</span>
      <span className="center-text"             style={{ position: "absolute", top: "59.2vh", left: "106.0vw" }}>V1RALS</span>
        
      <span className="center-text right-flow"  style={{ position: "absolute", top: "53vh",   left: "119.0vw" }}>0</span>
      <span className="center-text right-flow"  style={{ position: "absolute", top: "59.2vh", left: "119.0vw" }}>0</span>
        
      <span className="center-text"             style={{ position: "absolute", top: "53vh",   left: "128.0vw" }}>cAREERS</span>
      <span className="center-text"             style={{ position: "absolute", top: "59.2vh", left: "128.0vw" }}>ARcH1VE</span>
        
      <span className="center-text right-flow"  style={{ position: "absolute", top: "53vh",   left: "141.0vw" }}>0</span>
      <span className="center-text right-flow"  style={{ position: "absolute", top: "59.2vh", left: "141.0vw" }}>0</span>


      <span className="item-text"            style={{ position: "absolute", top: "35.4vh", left: "96vw"  }}>1ncOME</span>
      <span className="item-text"            style={{ position: "absolute", top: "41.6vh", left: "96vw"  }}>cL1EnT</span>
        
      <span className="item-text right-flow" style={{ position: "absolute", top: "35.4vh", left: "109vw" }}>0</span>
      <span className="item-text right-flow" style={{ position: "absolute", top: "41.6vh", left: "109vw" }}>0</span>
        
      <span className="item-text"            style={{ position: "absolute", top: "35.4vh", left: "118vw" }}>T1cKETS</span>
      <span className="item-text"            style={{ position: "absolute", top: "41.6vh", left: "118vw" }}>1nQU1RY</span>
        
      <span className="item-text right-flow" style={{ position: "absolute", top: "35.4vh", left: "131vw" }}>0</span>
      <span className="item-text right-flow" style={{ position: "absolute", top: "41.6vh", left: "131vw" }}>0</span>
        
      <span className="item-text"            style={{ position: "absolute", top: "35.4vh", left: "139vw" }}>OnL1nE</span>
      <span className="item-text"            style={{ position: "absolute", top: "41.6vh", left: "139vw" }}>JO1nED</span>
        
      <span className="item-text right-flow" style={{ position: "absolute", top: "35.4vh", left: "153.4vw" }}>0</span>
      <span className="item-text right-flow" style={{ position: "absolute", top: "41.6vh", left: "153.4vw" }}>0</span>
        
      <span className="item-text"            style={{ position: "absolute", top: "53vh",   left: "139vw" }}>JOBLOg</span>
      <span className="item-text"            style={{ position: "absolute", top: "59.2vh", left: "139vw" }}>H1R1ngS</span>
      <span className="item-text"            style={{ position: "absolute", top: "65.4vh", left: "139vw" }}>ORDERS</span>
      <span className="item-text"            style={{ position: "absolute", top: "71.6vh", left: "139vw" }}>1nV1TES</span>
        
      <span className="item-text right-flow" style={{ position: "absolute", top: "53vh",   left: "153.4vw" }}>0</span>
      <span className="item-text right-flow" style={{ position: "absolute", top: "59.2vh", left: "153.4vw" }}>0</span>
      <span className="item-text right-flow" style={{ position: "absolute", top: "65.4vh", left: "153.4vw" }}>0</span>
      <span className="item-text right-flow" style={{ position: "absolute", top: "71.6vh", left: "153.4vw" }}>0</span>
        
      <span className="item-text"            style={{ position: "absolute", top: "53vh",   left: "96vw"  }}>cL1cKS</span>
      <span className="item-text"            style={{ position: "absolute", top: "59.2vh", left: "96vw"  }}>LEADS</span>
        
      <span className="item-text right-flow" style={{ position: "absolute", top: "53vh",   left: "109vw" }}>0</span>
      <span className="item-text right-flow" style={{ position: "absolute", top: "59.2vh", left: "109vw" }}>0</span>
        
      <span className="item-text"            style={{ position: "absolute", top: "53vh",   left: "118vw" }}>AD cTR</span>
      <span className="item-text"            style={{ position: "absolute", top: "59.2vh", left: "118vw" }}>AD cPc</span>
        
      <span className="item-text right-flow" style={{ position: "absolute", top: "53vh",   left: "131vw" }}>0</span>
      <span className="item-text right-flow" style={{ position: "absolute", top: "59.2vh", left: "131vw" }}>0</span>

    <div className="hover-area" />
      <span className="chat-text" id="chatText">cHAT . . .</span>
      <span className="mail-text" style={{ position: "absolute", top: "35.4vh", left: "36vw",  zIndex: 1, fontFamily: "'Distill Expanded',sans-serif", color: "#111111", letterSpacing: "0.28vw", fontSize: "0.47rem", textShadow: "0.001rem 0.001rem 0 #717171, -0.001rem -0.001rem 0 #717171", opacity: 0, transition: "opacity 0.3s ease" }}>TO:</span>
      <span className="mail-text" style={{ position: "absolute", top: "41.6vh", left: "36vw",  zIndex: 1, fontFamily: "'Distill Expanded',sans-serif", color: "#111111", letterSpacing: "0.28vw", fontSize: "0.47rem", textShadow: "0.001rem 0.001rem 0 #717171, -0.001rem -0.001rem 0 #717171", opacity: 0, transition: "opacity 0.3s ease" }}>SUBJEcT:</span>
      <span className="mail-text" style={{ position: "absolute", top: "35.4vh", left: "89vw",   zIndex: 1, fontFamily: "'Distill Expanded',sans-serif", color: "#111111", letterSpacing: "0.28vw", fontSize: "0.47rem", textShadow: "0.001rem 0.001rem 0 #717171, -0.001rem -0.001rem 0 #717171", opacity: 0, transition: "opacity 0.3s ease" }}>cc</span>
      <span className="mail-text" style={{ position: "absolute", top: "35.4vh", left: "91.9vw", zIndex: 1, fontFamily: "'Distill Expanded',sans-serif", color: "#111111", letterSpacing: "0.28vw", fontSize: "0.47rem", textShadow: "0.001rem 0.001rem 0 #717171, -0.001rem -0.001rem 0 #717171", opacity: 0, transition: "opacity 0.3s ease" }}>Bcc</span>
      <span className="mail-text" style={{ position: "absolute", top: "41.6vh", left: "91.1vw", zIndex: 1, fontFamily: "'Distill Expanded',sans-serif", color: "#111111", letterSpacing: "0.28vw", fontSize: "0.47rem", textShadow: "0.001rem 0.001rem 0 #717171, -0.001rem -0.001rem 0 #717171", opacity: 0, transition: "opacity 0.3s ease" }}>SEnD</span>
    </div> 
      
    <span className="grid-number num1">1</span>
    <span className="grid-number num2">2</span>
    <span className="grid-number num3">3</span>
    <span className="grid-number num4">4</span>
    <span className="grid-number num5">5</span>
    <span className="grid-number num6">6</span>
    <span className="grid-number num7">7</span>
    <span className="grid-number num8">8</span>
    <span className="grid-number num9">9</span>
    <span className="grid-number num10">10</span>
    <span className="grid-number num11">11</span>
    <span className="grid-number num12">12</span>
    <span className="grid-number num13">13</span>
    <span className="grid-number num14">14</span>
    <span className="grid-number num15">15</span>
    <span className="grid-number num16">16</span>
    <span className="grid-number num17">17</span>
    <span className="grid-number num18">18</span>
    <span className="grid-number num19">19</span>
    <span className="grid-number num20">20</span>
    <span className="grid-number num21">21</span>
    <span className="grid-number num22">22</span>
    <span className="grid-number num23">23</span>
    <span className="grid-number num24">24</span>
    <span className="grid-number num25">25</span>
    <span className="grid-number num26">26</span>
    <span className="grid-number num27">27</span>
    <span className="grid-number num28">28</span>
    <span className="grid-number num29">29</span>
    <span className="grid-number num30">30</span>
    <span className="grid-number num31">31</span>

    <span className="grid-dashed dashed01" />
    <span className="grid-dashed dashed02" />
    <span className="grid-dashed dashed03" />
    <span className="grid-dashed dashed04" />
    <span className="grid-dashed dashed05" />
    <span className="grid-dashed dashed06" />
    <span className="grid-dashed dashed07" />
    <span className="grid-dashed dashed08" />
    <span className="grid-dashed dashed09" />
    <span className="grid-dashed dashed10" />
    <span className="grid-dashed dashed11" />
    <span className="grid-dashed dashed12" />
    <span className="grid-dashed dashed13" />
    <span className="grid-dashed dashed14" />
    <span className="grid-dashed dashed15" />
    <span className="grid-dashed dashed16" />
    <span className="grid-dashed dashed17" />
    <span className="grid-dashed dashed18" />
    <span className="grid-dashed dashed19" />
    <span className="grid-dashed dashed20" />
    <span className="grid-dashed dashed21" />
    <span className="grid-dashed dashed22" />
    <span className="grid-dashed dashed23" />
    <span className="grid-dashed dashed24" />
    <span className="grid-dashed dashed25" />
    <span className="grid-dashed dashed26" />
    <span className="grid-dashed dashed27" />
    <span className="grid-dashed dashed28" />
    <span className="grid-dashed dashed29" />
    <span className="grid-dashed dashed30" />
    <span className="grid-dashed dashed31" />

    <div className="heading-container" style={{ top: "35.4vh", left: "6.41vw", transform: "translateX(-49vw)" }} data-offset="-49" data-slide-group="heading"><span className="custom-text heading-flow">AccOUnT</span></div>
    <div className="heading-container" style={{ top: "41.6vh", left: "6.41vw", transform: "translateX(-49vw)" }} data-offset="-49" data-slide-group="heading"><span className="custom-text heading-flow">AcT1V1TY</span></div>
    <div className="heading-container" style={{ top: "53vh",   left: "6.41vw", transform: "translateX(-49vw)" }} data-offset="-49" data-slide-group="heading"><span className="custom-text heading-flow">cHATLOg</span></div>
    <div className="heading-container" style={{ top: "59.2vh", left: "6.41vw", transform: "translateX(-49vw)" }} data-offset="-49" data-slide-group="heading"><span className="custom-text heading-flow">cLAnLOg</span></div>

    <div className="account-container" style={{ top: "35.4vh", left: "29.11vw", transform: "translateX(-49vw)" }} data-offset="-49" data-slide-group="account"><span className="custom-text right-flow" style={{ position: "absolute", right: 0 }}>0</span></div>
    <div className="account-container" style={{ top: "41.6vh", left: "29.11vw", transform: "translateX(-49vw)" }} data-offset="-49" data-slide-group="account"><span className="custom-text right-flow" style={{ position: "absolute", right: 0 }}>0</span></div>
    <div className="account-container" style={{ top: "53vh",   left: "29.11vw", transform: "translateX(-49vw)" }} data-offset="-49" data-slide-group="account"><span className="custom-text right-flow" style={{ position: "absolute", right: 0 }}>0</span></div>
    <div className="account-container" style={{ top: "59.2vh", left: "29.11vw", transform: "translateX(-49vw)" }} data-offset="-49" data-slide-group="account"><span className="custom-text right-flow" style={{ position: "absolute", right: 0 }}>0</span></div>

     <div className="custom-line" style={{ left: "-42.59vw" }} />
     <div className="layer-five" />
     <div className="layer-six" />

    <div className="slide-triggers">
      <div className="slide-trigger" />
      <div className="slide-trigger-reverse" />
    </div>
  </>
  );
};

export default PageScripts;
